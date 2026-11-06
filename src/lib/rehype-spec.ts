import { slugifyWithCounter } from "@sindresorhus/slugify";
import type { Element, ElementContent, Nodes, Root, RootContent } from "hast";
import { visit } from "unist-util-visit";

const text = (node: Nodes): string => {
    if (node.type === "text") {
        return node.value;
    }
    return "children" in node ? node.children.map(text).join("") : "";
};

/**
 * Astro's own slugs differ from the previous site's: "RFC3339" would become
 * `rfc3339`, not `rfc-3339`. Ids set here take priority and keep old links working.
 * That site numbered repeated h2 only, so an h3 must not shift an h2's number.
 */
export function rehypeHeadingSlugs() {
    return (tree: Root) => {
        const h2s: Element[] = [];
        const h3s: Element[] = [];
        const used = new Set<unknown>();

        visit(tree, "element", (node) => {
            if (node.properties.id) {
                used.add(node.properties.id);
            } else if (node.tagName === "h2") {
                h2s.push(node);
            } else if (node.tagName === "h3") {
                h3s.push(node);
            }
        });

        const slugH2 = slugifyWithCounter();
        for (const node of h2s) {
            node.properties.id = slugH2(text(node));
            used.add(node.properties.id);
        }

        const slugH3 = slugifyWithCounter();
        for (const node of h3s) {
            let id = slugH3(text(node));
            while (used.has(id)) {
                id = slugH3(text(node));
            }
            node.properties.id = id;
            used.add(id);
        }
    };
}

// The keywords the spec defines through BCP 14 on /introduction.
const NORMATIVE = /^(MUST|MUST NOT|SHOULD|SHOULD NOT|MAY)$/;

/** Marks bold BCP 14 keywords, so that they share one consistent style. */
export function rehypeNormative() {
    return (tree: Root) => {
        visit(tree, "element", (node) => {
            if (
                node.tagName === "strong" &&
                NORMATIVE.test(text(node).trim())
            ) {
                node.properties.className = ["normative"];
            }
        });
    };
}

// MDX components reach rehype as their own node type, which `hast` does not list.
const isNote = (node: RootContent): node is ElementContent =>
    (node.type as string) === "mdxJsxFlowElement" &&
    (node as unknown as { name: string }).name === "Note";

const isBlank = (node: RootContent): boolean =>
    node.type === "text" && node.value.trim() === "";

const NOTE_TARGETS = new Set(["p", "ul", "ol", "pre"]);

/**
 * A note floats into the margin from where it is in the source, so one written after its text
 * would start below that text. This moves it to before the text, in a wrapper that lets
 * `MarkdownContent` restore the reading order on screens with no margin.
 */
export function rehypeNotesBesideText() {
    return (tree: Root) => {
        const children: RootContent[] = [];

        for (const node of tree.children) {
            const previous = children.findLast((child) => !isBlank(child));

            if (
                isNote(node) &&
                previous?.type === "element" &&
                NOTE_TARGETS.has(previous.tagName)
            ) {
                const wrapper: Element = {
                    type: "element",
                    tagName: "div",
                    properties: { className: ["noted"] },
                    children: [node, previous],
                };
                children.splice(children.lastIndexOf(previous), 1, wrapper);
            } else {
                children.push(node);
            }
        }

        tree.children = children;
    };
}
