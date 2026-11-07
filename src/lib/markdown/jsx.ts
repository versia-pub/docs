import type { RootContent } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

export type Jsx = MdxJsxFlowElement | MdxJsxTextElement;

/** The literals that pages can pass as `prop={...}`. */
type Estree = {
    type: string;
    value?: unknown;
    expression?: Estree;
    elements?: Estree[];
    body?: Estree[];
    properties?: { key: { name?: string; value?: string }; value: Estree }[];
};

const evaluate = (node: Estree): unknown => {
    switch (node.type) {
        case "Program":
            return evaluate(node.body?.[0] as Estree);
        case "ExpressionStatement":
            return evaluate(node.expression as Estree);
        case "Literal":
            return node.value;
        case "ArrayExpression":
            return node.elements?.map(evaluate);
        case "ObjectExpression":
            return Object.fromEntries(
                node.properties?.map((p) => [
                    p.key.name ?? p.key.value,
                    evaluate(p.value),
                ]) ?? [],
            );
        default:
            throw new Error(`Cannot read a ${node.type} in a component prop`);
    }
};

export const isJsx = (node: { type: string }): node is Jsx =>
    node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";

/** A prop's value, or `true` for a bare one such as `required`. */
export const prop = <T = string>(node: Jsx, name: string): T | undefined => {
    const found = node.attributes.find(
        (a) => a.type === "mdxJsxAttribute" && a.name === name,
    );
    if (!found) {
        return undefined;
    }
    const { value } = found;
    if (value === null || value === undefined) {
        return true as T;
    }
    return typeof value === "string"
        ? (value as T)
        : (evaluate(value.data?.estree as unknown as Estree) as T);
};

export const needed = <T = string>(node: Jsx, name: string): T => {
    const value = prop<T>(node, name);
    if (value === undefined) {
        throw new Error(`<${node.name}> needs ${name}`);
    }
    return value;
};

/** A component alone on one source line is parsed as a paragraph that holds it. */
export const unwrap = (nodes: RootContent[]) =>
    nodes.flatMap((node): RootContent[] => {
        if (node.type !== "paragraph") {
            return [node];
        }
        const kids = node.children.filter(
            (kid) => kid.type !== "text" || kid.value.trim() !== "",
        );
        return kids.length > 0 && kids.every(isJsx)
            ? (kids as unknown as RootContent[])
            : [node];
    });

/** Separates a component's `slot="..."` children from the rest. */
export const slotsOf = (node: Jsx) => {
    const main: RootContent[] = [];
    const slots: Record<string, Jsx> = {};
    for (const child of unwrap(node.children as RootContent[])) {
        const slot = isJsx(child) ? prop(child, "slot") : undefined;
        if (slot) {
            slots[slot] = child as Jsx;
        } else {
            main.push(child);
        }
    }
    return { main: { ...node, children: main } as Jsx, slots };
};
