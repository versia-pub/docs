import { parse, printParseErrorCode } from "jsonc-parser";
import type { Code, Root } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import type { Node } from "unist";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { anchorPart, inheritedFieldHref, inheritedFields } from "./spec-fields";

type JsxElement = MdxJsxFlowElement | MdxJsxTextElement;

const isElement = (node: Node, name: string): node is JsxElement =>
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    (node as JsxElement).name === name;

const elementsIn = (tree: Node, name: string) => {
    const found: JsxElement[] = [];
    visit(tree, (node) => {
        if (isElement(node, name)) {
            found.push(node);
        }
    });
    return found;
};

const codeIn = (tree: Node) => {
    const found: Code[] = [];
    visit(tree, "code", (node: Code) => {
        found.push(node);
    });
    return found;
};

const attribute = (node: JsxElement, name: string) =>
    node.attributes.find(
        (a) => a.type === "mdxJsxAttribute" && a.name === name,
    );

const nameOf = (node: JsxElement) => {
    const value = attribute(node, "name")?.value;
    if (typeof value !== "string") {
        throw new Error(`<${node.name}> needs a plain string name`);
    }
    return value;
};

/** `required` and `required={true}` count, `required={false}` does not. */
const isRequired = (node: JsxElement) => {
    const found = attribute(node, "required");
    if (!found) {
        return false;
    }
    const { value } = found;
    return typeof value !== "object" || value?.value !== "false";
};

const setAnchor = (node: JsxElement, anchor: string) => {
    node.attributes.push({
        type: "mdxJsxAttribute",
        name: "anchor",
        value: anchor,
    });
};

const addLinks = (code: Code, links: string[]) => {
    code.meta = `${code.meta ?? ""} links="${links.join(",")}"`.trim();
};

/** Same anchors as the previous site's `Property`, which ignored nesting. Examples are not checked. */
const linkRow = (row: JsxElement) => {
    const links: string[] = [];
    for (const properties of elementsIn(row, "Properties")) {
        const prefix = anchorPart(nameOf(properties));
        for (const property of elementsIn(properties, "Property")) {
            const name = nameOf(property);
            const anchor = `${prefix}-${anchorPart(name)}`;
            setAnchor(property, anchor);
            links.push(`${name}=#${anchor}`);
        }
    }
    for (const col of elementsIn(row, "Col")) {
        if (attribute(col, "sticky")) {
            for (const code of codeIn(col)) {
                if (code.lang === "json" || code.lang === "jsonc") {
                    addLinks(code, links);
                }
            }
        }
    }
};

const checkExample = (
    code: Code,
    file: VFile,
    prefix: string,
    fields: { name: string; required: boolean }[],
    inherited: string[],
) => {
    const errors: { error: number; offset: number; length: number }[] = [];
    const data = parse(code.value, errors, { allowTrailingComma: false });
    const [first] = errors;
    if (first) {
        const line = code.value.slice(0, first.offset).split("\n").length;
        file.fail(
            `Example for ${prefix} is not valid JSON: ${printParseErrorCode(first.error)} at line ${line} of the block`,
            code,
        );
    }

    const keys = Object.keys(data);
    const known = new Set(fields.map((f) => f.name));
    const unknown = keys.filter(
        (k) => !(known.has(k) || inherited.includes(k)),
    );
    const missing = fields.filter((f) => f.required && !keys.includes(f.name));
    if (unknown.length > 0) {
        file.fail(
            `Example for ${prefix} has unlisted keys: ${unknown.join(", ")}`,
            code,
        );
    }
    if (missing.length > 0) {
        file.fail(
            `Example for ${prefix} lacks required fields: ${missing.map((f) => f.name).join(", ")}`,
            code,
        );
    }

    addLinks(code, [
        ...fields.map((f) => `${f.name}=#${prefix}-${anchorPart(f.name)}`),
        ...inherited
            .filter((k) => !known.has(k))
            .map((k) => `${k}=${inheritedFieldHref(k)}`),
    ]);
};

const linkEntity = (entity: JsxElement, file: VFile) => {
    const prefix = anchorPart(nameOf(entity));
    const fields: { name: string; required: boolean }[] = [];
    let hasInherited = false;

    const walk = (
        children: Node[],
        parentAnchor: string,
        topLevel: boolean,
    ) => {
        for (const child of children) {
            if (isElement(child, "Inherits")) {
                hasInherited = true;
            } else if (isElement(child, "Field")) {
                const name = nameOf(child);
                const anchor = `${parentAnchor}-${anchorPart(name)}`;
                setAnchor(child, anchor);
                if (topLevel) {
                    fields.push({ name, required: isRequired(child) });
                }
                walk(child.children, anchor, false);
            } else if (!isElement(child, "Example") && "children" in child) {
                walk(child.children as Node[], parentAnchor, topLevel);
            }
        }
    };
    walk((entity as JsxElement).children, prefix, true);

    const inherited = hasInherited ? inheritedFields.map((f) => f.name) : [];
    for (const example of elementsIn(entity, "Example")) {
        for (const code of codeIn(example)) {
            checkExample(code, file, prefix, fields, inherited);
        }
    }
};

/**
 * Gives each `Field` in an `Entity` its anchor, tells the example's code blocks
 * which keys can link to a field, and fails the build when an example and its
 * field list disagree.
 */
export function remarkSpec() {
    return (tree: Root, file: VFile) => {
        for (const row of elementsIn(tree, "Row")) {
            linkRow(row);
        }
        for (const entity of elementsIn(tree, "Entity")) {
            linkEntity(entity, file);
        }
    };
}
