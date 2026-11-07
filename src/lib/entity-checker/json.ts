import {
    type Node,
    type ParseError,
    parseTree,
    printParseErrorCode,
} from "jsonc-parser";
import { childPath } from "./path.ts";
import type { Finding } from "./types.ts";

export interface ParsedJson {
    value: unknown;
    /** What breaks the rules on `/json`, which a parser that keeps the last duplicate hides. */
    problems: Finding[];
}

export interface NotJson {
    message: string;
    line: number;
    column: number;
}

const LONE_SURROGATE =
    /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
// U+FDD0 to U+FDEF, and the last two code points of every plane.
const NONCHARACTER = new RegExp(
    `[\\u{FDD0}-\\u{FDEF}${Array.from({ length: 17 }, (_, plane) => {
        const base = (plane * 0x10000 + 0xfffe).toString(16);
        const last = (plane * 0x10000 + 0xffff).toString(16);
        return `\\u{${base}}\\u{${last}}`;
    }).join("")}]`,
    "u",
);

const ENCODING = "/json#encoding";

const textProblem = (text: string) => {
    if (LONE_SURROGATE.test(text)) return "has a lone surrogate";
    if (NONCHARACTER.test(text)) return "has a noncharacter code point";
    return;
};

/** Reads JSON as an entity is sent: no comments and no trailing commas. */
export const readJson = (source: string): ParsedJson | NotJson => {
    const errors: ParseError[] = [];
    const tree = parseTree(source, errors, {
        disallowComments: true,
        allowTrailingComma: false,
    });
    const [first] = errors;
    if (first || !tree) {
        const offset = first?.offset ?? 0;
        const before = source.slice(0, offset).split("\n");
        return {
            // `PropertyNameExpected` as "Property name expected". Comments get their own words, as
            // the examples on these pages have them.
            message: !first
                ? "Nothing here"
                : printParseErrorCode(first.error) === "InvalidCommentToken"
                  ? "Comments are not allowed"
                  : printParseErrorCode(first.error)
                        .replace(/(?<=[a-z])(?=[A-Z])/g, " ")
                        .replace(/(?<= )[A-Z]/g, (letter) =>
                            letter.toLowerCase(),
                        ),
            line: before.length,
            column: (before.at(-1)?.length ?? 0) + 1,
        };
    }

    const problems: Finding[] = [];
    const add = (path: string, href: string, message: string) =>
        problems.push({ path, href, message });

    const read = (node: Node, path: string): unknown => {
        switch (node.type) {
            case "object": {
                const value: Record<string, unknown> = {};
                const seen = new Set<string>();
                for (const property of node.children ?? []) {
                    const [keyNode, valueNode] = property.children ?? [];
                    const key = String(keyNode?.value);
                    const at = childPath(path, key);
                    if (key === "") add(at, "/json#keys", "is an empty key");
                    if (seen.has(key))
                        add(at, "/json#keys", "is a duplicate key");
                    const keyText = textProblem(key);
                    if (keyText) add(at, ENCODING, `is a key that ${keyText}`);
                    seen.add(key);
                    value[key] = valueNode ? read(valueNode, at) : undefined;
                }
                return value;
            }
            case "array":
                return (node.children ?? []).map((child, index) =>
                    read(child, childPath(path, index)),
                );
            case "string": {
                const text = String(node.value);
                if (text.includes("\r\n")) {
                    add(path, ENCODING, "has a `\\r\\n` line break");
                }
                const problem = textProblem(text);
                if (problem) add(path, ENCODING, problem);
                return text;
            }
            default:
                return node.value;
        }
    };

    return { value: read(tree, ""), problems };
};
