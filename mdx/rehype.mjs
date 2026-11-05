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
    return (tree) => {
        visit(tree, "element", (node) => {
            const code = node.children[0];
            if (node.tagName !== "pre" || code?.tagName !== "code") {
                return;
            }

            node.properties.html = highlighter.codeToHtml(
                code.children[0].value,
                {
                    lang:
                        code.properties.className?.[0]?.replace(
                            /^language-/,
                            "",
                        ) ?? "text",
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
    return (tree) => {
        const slugify = slugifyWithCounter();
        visit(tree, "element", (node) => {
            if (node.tagName === "h2" && !node.properties.id) {
                node.properties.id = slugify(mdastToString(node));
            }
        });
    };
}

function getSections(node) {
    const sections = [];

    for (const child of node.children ?? []) {
        if (child.type === "element" && child.tagName === "h2") {
            sections.push({
                title: mdastToString(child),
                id: child.properties.id,
            });
        } else if (child.children) {
            sections.push(...getSections(child));
        }
    }

    return sections;
}

// Exports `sections` for the sidebar, unless the page already exports its own.
function rehypeExportSections() {
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

    return async (tree, file) => {
        for (const transformer of transformers) {
            await transformer(tree, file);
        }
    };
}
