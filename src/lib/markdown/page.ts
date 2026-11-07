import type { Code, Paragraph, Root, RootContent } from "mdast";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Extension } from "../extensions";
import { remarkSpec } from "../remark-spec";
import { type Block, list, md } from "./build";
import { type Context, components, fieldItem } from "./components";
import { isJsx, type Jsx, unwrap } from "./jsx";

// Same parsing as the HTML pages, including the `omit` that `remark-spec` adds to `Inherits`.
const reader = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkSpec);

const writer = unified().use(remarkGfm).use(remarkStringify, {
    bullet: "-",
    emphasis: "*",
    fences: true,
    listItemIndent: "one",
    rule: "-",
});

/** Removes display-only notation, and the field links that `remark-spec` adds. */
const cleanCode = (node: Code): Code => ({
    ...node,
    value: node.value.replace(/[ \t]*(?:\/\/|#) \[!code [^\]]*\]/g, ""),
    meta: node.meta?.replace(/\s*links="[^"]*"/, "").trim() || null,
});

/** Converts sibling nodes. Prose passes through, and components become plain Markdown. */
const convertNodes = (nodes: RootContent[], context: Context): Block[] => {
    const out: Block[] = [];
    let fields: Jsx[] = [];
    const endFields = () => {
        out.push(...list(fields.map((field) => fieldItem(field, context))));
        fields = [];
    };

    for (const node of unwrap(nodes)) {
        if (isJsx(node) && node.name === "Field") {
            fields.push(node);
            continue;
        }
        endFields();
        if (isJsx(node)) {
            const component = components[node.name ?? ""];
            if (!component) {
                throw new Error(`No Markdown form for <${node.name}>`);
            }
            out.push(...component(node, context));
        } else if (node.type === "code") {
            out.push(cleanCode(node));
        } else if (
            node.type === "blockquote" ||
            node.type === "list" ||
            node.type === "listItem"
        ) {
            const children = convertNodes(node.children, context);
            out.push({ ...node, children } as Block);
        } else if (node.type !== "mdxjsEsm") {
            out.push(node as Block);
        }
    }
    endFields();
    return out;
};

/** Fails on any MDX left over, such as a component inside running text. */
const assertPlain = (root: Root) => {
    visit(root, (node) => {
        if (node.type.startsWith("mdx")) {
            throw new Error(`No Markdown form for ${node.type}`);
        }
    });
};

type Page = {
    source: string;
    path: string;
    title: string;
    description?: string;
    extension?: string;
    extensions: Extension[];
};

/** Turns a page's MDX into plain Markdown. */
export const pageToMarkdown = async (page: Page) => {
    const { source, path, title, description, extension, extensions } = page;
    const file = { value: source, path };
    const tree = (await reader.run(reader.parse(file), file)) as Root;

    const context: Context = {
        extensions,
        // A component on one line holds running text, not blocks.
        body: (node) =>
            node.type === "mdxJsxTextElement"
                ? [{ type: "paragraph", children: node.children } as Paragraph]
                : convertNodes(node.children as RootContent[], context),
    };
    const output: Root = {
        type: "root",
        children: [
            ...md(`# ${title}`),
            ...(description ? md(description) : []),
            ...(extension ? md(`Extension name: \`${extension}\``) : []),
            ...convertNodes(tree.children, context),
        ] as RootContent[],
    };
    assertPlain(output);
    return writer.stringify(output);
};
