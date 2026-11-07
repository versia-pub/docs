import { parse, printParseErrorCode } from "jsonc-parser";
import type { Code, Root } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import type { Node } from "unist";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { checkEntity, unknownTypes } from "./entity-checker/check.ts";
import { CONTENT_FORMAT_FIELDS } from "./entity-checker/content-format.ts";
import type { EntitySchema, FieldSpec } from "./entity-checker/types.ts";
import {
    anchorPart,
    inheritedFieldHref,
    inheritedFields,
} from "./spec-fields.ts";

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

/** A plain string, or a string in braces, such as `type={'"public" | "followers"'}`. */
const stringAttribute = (node: JsxElement, name: string) => {
    const value = attribute(node, name)?.value;
    if (typeof value === "string" || value === null || value === undefined) {
        return value ?? undefined;
    }
    const [statement] = value.data?.estree?.body ?? [];
    if (
        statement?.type === "ExpressionStatement" &&
        statement.expression.type === "Literal" &&
        typeof statement.expression.value === "string"
    ) {
        return statement.expression.value;
    }
    throw new Error(`<${node.name}> needs a plain string ${name}`);
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

/**
 * Where an example's keys stop following the field list, for the fields the sheet lists itself and
 * those nested under them, so a reader can match the two side by side. Inherited fields are left
 * out, as the sheet lists them on their own line.
 */
const orderProblems = (
    fields: FieldSpec[],
    value: unknown,
    path: string,
): string[] => {
    if (Array.isArray(value)) {
        return value.flatMap((item, index) =>
            orderProblems(fields, item, `${path}[${index}]`),
        );
    }
    if (typeof value !== "object" || value === null) return [];
    const names = fields.map((f) => f.name);
    const keys = Object.keys(value).filter((key) => names.includes(key));
    const listed = names.filter((name) => keys.includes(name));
    const own =
        keys.join() === listed.join()
            ? []
            : [
                  `${path || "top level"}: ${keys.join(", ")}, but the sheet lists ${listed.join(", ")}`,
              ];
    return [
        ...own,
        ...fields.flatMap((field) =>
            field.fields.length > 0
                ? orderProblems(
                      field.fields,
                      (value as Record<string, unknown>)[field.name],
                      path ? `${path}.${field.name}` : field.name,
                  )
                : [],
        ),
    ];
};

const checkExample = (
    code: Code,
    file: VFile,
    prefix: string,
    fields: FieldSpec[],
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
    const misordered = orderProblems(fields, data, "");
    if (misordered.length > 0) {
        file.fail(
            `Example for ${prefix} puts keys in another order than its field list:\n${misordered.map((m) => `  ${m}`).join("\n")}`,
            code,
        );
    }
};

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

const parseSample = (code: Code, file: VFile): unknown => {
    const source = code.value;
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
    const entries = Object.entries(value);
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

/** Fails the build when the ContentFormat sheet and the checker's copy of its fields disagree. */
const checkContentFormatSheet = (
    fields: FieldSpec[],
    sheet: JsxElement,
    file: VFile,
) => {
    const summary = (list: FieldSpec[]) =>
        list
            .map(
                (f) =>
                    `${f.name}:${f.type}:${f.numberType ?? ""}:${f.required}`,
            )
            .join(", ");
    if (summary(fields) !== summary(CONTENT_FORMAT_FIELDS)) {
        file.fail(
            `The ContentFormat sheet no longer matches CONTENT_FORMAT_FIELDS in src/lib/entity-checker/content-format.ts:\n  sheet:   ${summary(fields)}\n  checker: ${summary(CONTENT_FORMAT_FIELDS)}`,
            sheet,
        );
    }
};

/** Hands the entity's checker its fields and example, and fails the build if the example fails it. */
const addChecker = (
    entity: JsxElement,
    file: VFile,
    fields: FieldSpec[],
    inherited: FieldSpec[],
) => {
    const name = nameOf(entity);
    const type = stringAttribute(entity, "type");
    if (!type) {
        throw new Error(`<Entity name="${name}"> needs a type for its checker`);
    }
    const schema: EntitySchema = {
        name,
        type,
        fields: [...fields, ...inherited],
    };
    const unknown = unknownTypes(schema.fields);
    if (unknown.length > 0) {
        file.fail(
            `The checker for ${name} does not know these types: ${unknown.join(", ")}`,
            entity,
        );
    }

    const [code] = elementsIn(entity, "Example").flatMap((block) =>
        codeIn(block).filter((c) => c.lang === "json" || c.lang === "jsonc"),
    );
    if (!code) {
        file.fail(`The checker for ${name} needs a JSON example`, entity);
    }
    const parsed = parse(code.value, [], { allowTrailingComma: false });
    const { problems } = checkEntity(schema, parsed);
    if (problems.length > 0) {
        file.fail(
            `The example for ${name} fails its checker:\n${problems.map((p) => `  ${p.path || "(entity)"} ${p.message}`).join("\n")}`,
            code,
        );
    }

    entity.attributes.push(
        {
            type: "mdxJsxAttribute",
            name: "schema",
            value: JSON.stringify(schema),
        },
        {
            type: "mdxJsxAttribute",
            name: "sample",
            value: JSON.stringify(parsed, null, 4),
        },
    );
};

const linkEntity = (entity: JsxElement, file: VFile) => {
    const prefix = anchorPart(nameOf(entity));
    let hasInherited = false;

    const walk = (children: Node[], parentAnchor: string): FieldSpec[] => {
        const found: FieldSpec[] = [];
        for (const child of children) {
            if (isElement(child, "Inherits")) {
                hasInherited = true;
            } else if (isElement(child, "Field")) {
                const name = nameOf(child);
                const anchor = `${parentAnchor}-${anchorPart(name)}`;
                setAnchor(child, anchor);
                const numberType = stringAttribute(child, "numberType");
                found.push({
                    name,
                    type: stringAttribute(child, "type"),
                    required: isRequired(child),
                    ...(numberType === "float" || numberType === "integer"
                        ? { numberType }
                        : {}),
                    href: `#${anchor}`,
                    fields: walk(child.children, anchor),
                });
            } else if (!isElement(child, "Example") && "children" in child) {
                found.push(...walk(child.children as Node[], parentAnchor));
            }
        }
        return found;
    };
    const fields = walk((entity as JsxElement).children, prefix);

    if (entity.name === "Fields" && nameOf(entity) === "ContentFormat") {
        checkContentFormatSheet(fields, entity, file);
    }

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

    if (attribute(entity, "checker")) {
        addChecker(
            entity,
            file,
            fields,
            inherited.map((f) => ({
                ...f,
                href: inheritedFieldHref(f.name),
                fields: [],
            })),
        );
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
