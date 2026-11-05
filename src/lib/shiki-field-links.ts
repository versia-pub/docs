import type { Element, Text } from "hast";
import type { ShikiTransformer } from "shiki";

const metaValue = (raw: string, name: string) =>
    raw.match(new RegExp(`${name}="([^"]*)"`))?.[1];

/**
 * Reads fence metadata for code blocks:
 * - `title="..."` becomes a label on the block.
 * - `links="key=#anchor,..."`, added by `remark-spec`, turns top-level JSON keys into links.
 */
export function transformerFieldLinks(): ShikiTransformer {
    let links = new Map<string, string>();
    let topIndent: number | undefined;

    return {
        name: "versia:field-links",
        preprocess(code, options) {
            const raw = options.meta?.__raw ?? "";
            links = new Map(
                (metaValue(raw, "links") ?? "")
                    .split(",")
                    .filter(Boolean)
                    .map((entry): [string, string] => {
                        const at = entry.indexOf("=");
                        return [entry.slice(0, at), entry.slice(at + 1)];
                    }),
            );
            topIndent = code
                .split("\n")
                .find((line) => /^\s+"/.test(line))
                ?.match(/^\s+/)?.[0].length;
        },
        pre(node) {
            const title = metaValue(this.options.meta?.__raw ?? "", "title");
            if (title) {
                node.properties["data-title"] = title;
            }
        },
        line(node) {
            const firstToken = node.children[0] as Element | undefined;
            const first =
                (firstToken?.children[0] as Text | undefined)?.value ?? "";
            const indent = first.match(/^ */)?.[0].length ?? 0;
            if (indent > 0) {
                node.properties.style = `--indent:${indent}ch`;
            }
        },
        span(node, _line, col, _lineElement, token) {
            // Grammars split a key into `"`, the name and `"`, so the name follows the indent and a quote.
            const key = token.content;
            const href =
                topIndent !== undefined && col === topIndent + 1
                    ? links.get(key)
                    : undefined;
            if (!href) {
                return;
            }
            return {
                type: "element",
                tagName: "a",
                properties: { class: "field-key", href, "data-key": key },
                children: [node],
            };
        },
    };
}
