import {
    transformerMetaHighlight,
    transformerNotationFocus,
    transformerNotationHighlight,
} from "@shikijs/transformers";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import * as acorn from "acorn";
import { toString as mdastToString } from "mdast-util-to-string";
import { mdxAnnotations } from "mdx-annotations";
import { createCssVariablesTheme, createHighlighter } from "shiki";
import { visit } from "unist-util-visit";

function rehypeParseCodeBlocks() {
    return (tree) => {
        // biome-ignore lint/style/useNamingConvention: <explanation>
        visit(tree, "element", (node, _nodeIndex, parentNode) => {
            if (node.tagName === "code" && node.properties.className) {
                parentNode.properties.language =
                    node.properties.className[0]?.replace(/^language-/, "");
            }
        });
    };
}

const myTheme = createCssVariablesTheme({
    name: "css-variables",
    variablePrefix: "--shiki-",
    variableDefaults: {},
    fontStyle: true,
});

const highlighter = await createHighlighter({
    langs: [
        "typescript",
        "javascript",
        "json",
        "css",
        "html",
        "json5",
        "jsonc",
        "bash",
        "php",
        "python",
    ],
    themes: [myTheme],
});

function rehypeShiki() {
    return async (tree) => {
        visit(tree, "element", (node) => {
            if (
                node.tagName === "pre" &&
                node.children[0]?.tagName === "code"
            ) {
                const codeNode = node.children[0];
                const textNode = codeNode.children[0];

                node.properties.code = textNode.value;

                if (node.properties.language) {
                    const html = highlighter.codeToHtml(textNode.value, {
                        lang: node.properties.language,
                        theme: myTheme,
                        transformers: [
                            transformerNotationFocus(),
                            transformerNotationHighlight(),
                            transformerMetaHighlight(),
                        ],
                    });

                    textNode.value = html;
                }
            }
        });
    };
}

function rehypeSlugify() {
    return (tree) => {
        const slugify = slugifyWithCounter();
        visit(tree, "element", (node) => {
            if (node.tagName === "h2" && !node.properties.id) {
                node.properties.id = slugify(mdastToString(node));
            }
        });
    };
}

function rehypeAddMDXExports(getExports) {
    return (tree) => {
        const exports = Object.entries(getExports(tree));

        for (const [name, value] of exports) {
            for (const node of tree.children) {
                if (
                    node.type === "mdxjsEsm" &&
                    new RegExp(`export\\s+const\\s+${name}\\s*=`).test(
                        node.value,
                    )
                ) {
                    return;
                }
            }

            const exportStr = `export const ${name} = ${value}`;

            tree.children.push({
                type: "mdxjsEsm",
                value: exportStr,
                data: {
                    estree: acorn.parse(exportStr, {
                        sourceType: "module",
                        ecmaVersion: "latest",
                    }),
                },
            });
        }
    };
}

function getSections(node) {
    const sections = [];

    for (const child of node.children ?? []) {
        if (child.type === "element" && child.tagName === "h2") {
            sections.push(`{
        title: ${JSON.stringify(mdastToString(child))},
        id: ${JSON.stringify(child.properties.id)},
        ...${child.properties.annotation}
      }`);
        } else if (child.children) {
            sections.push(...getSections(child));
        }
    }

    return sections;
}

export const rehypePlugins = [
    mdxAnnotations.rehype,
    rehypeParseCodeBlocks,
    rehypeShiki,
    rehypeSlugify,
    [
        rehypeAddMDXExports,
        (tree) => ({
            sections: `[${getSections(tree).join()}]`,
        }),
    ],
];