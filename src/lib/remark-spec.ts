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

const checkExample = (
    code: Code,
    file: VFile,
    prefix: string,
    fields: { name: string; required: boolean }[],
    inherited: { name: string; required: boolean }[],
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
    const all = [...fields, ...inherited];
    const known = new Set(all.map((f) => f.name));
    const unknown = keys.filter((k) => !known.has(k));
    const missing = all.filter((f) => f.required && !keys.includes(f.name));
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
};

const ELIDED = "...";
const MEDIA_TYPE = /^[\w.+-]+\/[\w.+-]+$/;
const FORMAT_FIELDS = new Set([
    "content",
    "url",
    "description",
    "size",
    "hash",
    "thumbhash",
    "width",
    "height",
    "fps",
    "duration",
]);

/** Samples can write `...` on its own line to skip keys. */
const parseSample = (code: Code, file: VFile): unknown => {
    const source = code.value
        .replace(/^(\s*)\.\.\.,?\s*$/gm, `$1"${ELIDED}": true,`)
        .replace(new RegExp(`("${ELIDED}": true),(\\s*})`, "g"), "$1$2");
    const errors: { error: number; offset: number; length: number }[] = [];
    const data = parse(source, errors, { allowTrailingComma: false });
    const [first] = errors;
    if (first) {
        const line = source.slice(0, first.offset).split("\n").length;
        file.fail(
            `JSON sample is not valid: ${printParseErrorCode(first.error)} at line ${line} of the block`,
            code,
        );
    }
    return data;
};

const checkFormat = (
    mediaType: string,
    value: unknown,
    code: Code,
    file: VFile,
) => {
    const fail = (problem: string) =>
        file.fail(`ContentFormat "${mediaType}" ${problem}`, code);

    if (typeof value !== "object" || value === null) {
        return fail("is not an object");
    }
    const format = value as Record<string, unknown>;
    if (ELIDED in format) {
        return;
    }
    const unlisted = Object.keys(format).filter((k) => !FORMAT_FIELDS.has(k));
    if (unlisted.length > 0) {
        fail(`has unlisted keys: ${unlisted.join(", ")}`);
    }
    if ("content" in format === "url" in format) {
        fail("needs exactly one of content or url");
    }
    if (/^https?:\/\//.test(String(format.content))) {
        fail("has a URL in content, which belongs in url");
    }
};

const checkFormats = (value: unknown, code: Code, file: VFile) => {
    if (typeof value !== "object" || value === null) {
        return;
    }
    const entries = Object.entries(value).filter(([key]) => key !== ELIDED);
    const isFormat =
        !Array.isArray(value) &&
        entries.length > 0 &&
        entries.every(([key]) => MEDIA_TYPE.test(key));
    for (const [key, child] of entries) {
        if (isFormat) {
            checkFormat(key, child, code, file);
        } else {
            checkFormats(child, code, file);
        }
    }
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

    // A field the entity lists itself, such as an extension's `type`, wins over the inherited one.
    // Transient entities and InstanceMetadata have no `id`, and so no `updated_at`, as /entities says.
    const listed = new Set(fields.map((f) => f.name));
    const skipped = [...listed];
    if (attribute(entity, "transient") || attribute(entity, "idless")) {
        skipped.push("id", "updated_at");
    }
    const inherited = hasInherited
        ? inheritedFields.filter((f) => !skipped.includes(f.name))
        : [];
    for (const node of elementsIn(entity, "Inherits")) {
        node.attributes.push({
            type: "mdxJsxAttribute",
            name: "omit",
            value: skipped.join(","),
        });
    }

    const links = [
        ...fields.map((f) => `${f.name}=#${prefix}-${anchorPart(f.name)}`),
        ...inherited.map((f) => `${f.name}=${inheritedFieldHref(f.name)}`),
    ];
    for (const example of elementsIn(entity, "Example")) {
        const jsonBlocks = codeIn(example).filter(
            (code) => code.lang === "json" || code.lang === "jsonc",
        );
        for (const code of jsonBlocks) {
            if (!attribute(example, "unchecked")) {
                checkExample(code, file, prefix, fields, inherited);
            }
            addLinks(code, links);
        }
    }
};

/**
 * Gives each `Field` in an `Entity` or `Fields` sheet its anchor, tells the
 * example's JSON blocks which keys can link to a field, and fails the build
 * when an example and its field list disagree, or when any JSON block on the
 * page is invalid or holds an invalid ContentFormat.
 */
export function remarkSpec() {
    return (tree: Root, file: VFile) => {
        for (const code of codeIn(tree)) {
            if (code.lang === "json" || code.lang === "jsonc") {
                checkFormats(parseSample(code, file), code, file);
            }
        }
        for (const sheet of [
            ...elementsIn(tree, "Entity"),
            ...elementsIn(tree, "Fields"),
        ]) {
            linkEntity(sheet, file);
        }
    };
}
