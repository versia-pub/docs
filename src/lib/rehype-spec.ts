import { slugifyWithCounter } from "@sindresorhus/slugify";
import type { Element, Nodes, Root } from "hast";
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

// The keywords the spec defines through RFC 2119 on /introduction.
const NORMATIVE = /^(must|must not|should|should not|may)$/i;

/** Marks bold RFC 2119 keywords, so that they share one consistent style. */
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
