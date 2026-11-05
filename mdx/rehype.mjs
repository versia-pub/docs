/** @import { Root, RootContent } from "hast" */
import { transformerNotationFocus } from "@shikijs/transformers";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import * as acorn from "acorn";
import { toString as mdastToString } from "mdast-util-to-string";
import { mdxAnnotations } from "mdx-annotations";
import { createHighlighter } from "shiki";
import { visit } from "unist-util-visit";

const highlighter = await createHighlighter({
    langs: ["typescript", "json", "html", "jsonc", "markdown", "bash", "http"],
    themes: [],
});

await highlighter.loadTheme("dark-plus");

// Replaces each code block's children with an `html` prop for the `pre`
// component to render, so that MDX doesn't turn every token into a React element.
function rehypeShiki() {
    /** @param {Root} tree */
    return (tree) => {
        visit(tree, "element", (node) => {
            const code = node.children[0];
            if (
                node.tagName !== "pre" ||
                code?.type !== "element" ||
                code.tagName !== "code" ||
                code.children[0]?.type !== "text"
            ) {
                return;
            }

            const [language] = /** @type {string[]} */ (
                code.properties.className ?? []
            );

            node.properties.html = highlighter.codeToHtml(
                code.children[0].value,
                {
                    lang: language?.replace(/^language-/, "") ?? "text",
                    theme: "dark-plus",
                    transformers: [
                        transformerNotationFocus({ matchAlgorithm: "v3" }),
                    ],
                },
            );
            node.children = [];
        });
    };
}

function rehypeSlugify() {
    /** @param {Root} tree */
    return (tree) => {
        const slugify = slugifyWithCounter();
        visit(tree, "element", (node) => {
            if (node.tagName === "h2" && !node.properties.id) {
                node.properties.id = slugify(mdastToString(node));
            }
        });
    };
}

/**
 * @param {{ children: RootContent[] }} node
 * @returns {{ title: string; id: string }[]}
 */
function getSections(node) {
    return node.children.flatMap((child) => {
        if (child.type === "element" && child.tagName === "h2") {
            return [
                {
                    title: mdastToString(child),
                    id: String(child.properties.id),
                },
            ];
        }

        return "children" in child ? getSections(child) : [];
    });
}

// Exports `sections` for the sidebar, unless the page already exports its own.
function rehypeExportSections() {
    /** @param {Root} tree */
    return (tree) => {
        const hasOwnExport = tree.children.some(
            (node) =>
                node.type === "mdxjsEsm" &&
                /export\s+const\s+sections\s*=/.test(node.value),
        );
        if (hasOwnExport) {
            return;
        }

        const value = `export const sections = ${JSON.stringify(getSections(tree))}`;
        tree.children.push({
            type: "mdxjsEsm",
            value,
            data: {
                estree: acorn.parse(value, {
                    sourceType: "module",
                    ecmaVersion: "latest",
                }),
            },
        });
    };
}

export default function rehypePlugin() {
    const transformers = [
        mdxAnnotations.rehype(),
        rehypeShiki(),
        rehypeSlugify(),
        rehypeExportSections(),
    ];

    /** @param {Root} tree */
    return (tree) => {
        for (const transformer of transformers) {
            transformer(tree);
        }
    };
}
