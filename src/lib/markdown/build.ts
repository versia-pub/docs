import type {
    BlockContent,
    DefinitionContent,
    ListItem,
    Paragraph,
} from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

export type Block = BlockContent | DefinitionContent;

const parser = unified().use(remarkParse);

/** Parses a Markdown string, so that components can write their output as text. */
export const md = (source: string) => parser.parse(source).children as Block[];

/**
 * A list item that starts with `head`. If `body` starts with a paragraph, that
 * paragraph continues the same line.
 */
export const item = (head: string, body: Block[] = []): ListItem => {
    const line = md(head)[0] as Paragraph;
    const [first, ...rest] = body;
    const blocks =
        first?.type === "paragraph"
            ? [
                  {
                      ...line,
                      children: [
                          ...line.children,
                          { type: "text" as const, value: " " },
                          ...first.children,
                      ],
                  },
                  ...rest,
              ]
            : [line, ...body];
    // Blocks in a tight item would run together.
    return { type: "listItem", spread: blocks.length > 1, children: blocks };
};

/** A list of the given items, leaving out the falsy ones. Empty if none are left. */
export const list = (
    items: (ListItem | false | undefined)[],
    ordered = false,
): Block[] => {
    const children = items.filter((i) => i !== false && i !== undefined);
    if (children.length === 0) {
        return [];
    }
    return [
        {
            type: "list",
            ordered,
            spread: children.some((i) => i.spread),
            children,
        },
    ];
};
