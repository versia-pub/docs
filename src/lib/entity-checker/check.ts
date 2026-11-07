import {
    domainProblem,
    extensionNameProblem,
    formatProblems,
    integerProblem,
    referenceProblem,
    timestampProblem,
    uriProblem,
} from "./formats.ts";
import { MEDIA_FIELDS } from "./media.ts";
import { childPath } from "./path.ts";
import type { EntitySchema, FieldSpec, Finding } from "./types.ts";

export interface CheckResult {
    /** What breaks a rule, so that a receiver would reject the entity. */
    problems: Finding[];
    /** What a receiver accepts, but is worth knowing. */
    notes: Finding[];
    /** The `type` of an entity that is not the one this checks, which is then not checked. */
    otherType?: string;
}

const UNKNOWN_FIELDS = "/validation#unknown-fields-and-types";
const OPTIONAL_FIELDS = "/json#optional-fields";

/** "a Note", "an Unsubscribe", but "a User". */
export const withArticle = (name: string) =>
    `${/^(?!Us)[AEIOU]/i.test(name) ? "an" : "a"} ${name}`;

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const describe = (value: unknown) => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "an array";
    if (typeof value === "object") return "an object";
    if (typeof value === "string") return "a string";
    if (typeof value === "number") return "a number";
    return `\`${String(value)}\``;
};

/** `"public" | "subscribers"` as its values, or nothing for any other type. */
const literals = (type: string) => {
    const parts = type.split("|").map((part) => part.trim());
    return parts.every((part) => /^"[^"]*"$/.test(part))
        ? parts.map((part) => part.slice(1, -1))
        : undefined;
};

/** Types that need no fields listed under them. Any other type is an object with its own fields. */
const SCALAR_TYPES = new Set([
    "string",
    "boolean",
    "number",
    "URI",
    "Domain",
    "RFC3339",
    "Reference",
    "RichText",
    "Media",
    "Extensions",
    "Category",
]);

/** The types a sheet uses that this checker does not know, so the build can say so. */
export const unknownTypes = (fields: FieldSpec[]): string[] =>
    fields.flatMap((field) => {
        const type = field.type?.replace(/\[\]$/, "");
        const own =
            type === undefined ||
            SCALAR_TYPES.has(type) ||
            literals(type) ||
            field.fields.length > 0
                ? []
                : [`${field.name}: ${field.type}`];
        return [...own, ...unknownTypes(field.fields)];
    });

export const checkEntity = (
    schema: EntitySchema,
    entity: unknown,
): CheckResult => {
    const problems: Finding[] = [];
    const notes: Finding[] = [];
    const problem = (path: string, href: string, message: string) =>
        problems.push({ path, href, message });

    const checkObject = (
        value: Record<string, unknown>,
        fields: FieldSpec[],
        path: string,
        owner: string,
    ) => {
        const known = new Map(fields.map((field) => [field.name, field]));
        for (const [key, child] of Object.entries(value)) {
            const field = known.get(key);
            const at = childPath(path, key);
            if (!field) {
                notes.push({
                    path: at,
                    href: UNKNOWN_FIELDS,
                    message: `is not a field of ${owner}, so it is ignored`,
                });
            } else if (child === null) {
                if (field.required) {
                    problem(
                        at,
                        field.href,
                        "is `null`, which counts as missing",
                    );
                } else {
                    notes.push({
                        path: at,
                        href: OPTIONAL_FIELDS,
                        message: "is `null`, the same as leaving it out",
                    });
                }
            } else {
                checkValue(child, field, field.type, at);
            }
        }
        for (const field of fields) {
            if (field.required && !(field.name in value)) {
                problem(childPath(path, field.name), field.href, "is missing");
            }
        }
    };

    const checkValue = (
        value: unknown,
        field: FieldSpec,
        type: string | undefined,
        path: string,
    ) => {
        const { href } = field;
        const expect = (wanted: string) =>
            problem(path, href, `is ${describe(value)}, not ${wanted}`);

        if (type?.endsWith("[]")) {
            if (!Array.isArray(value)) return expect("an array");
            value.forEach((item, index) => {
                checkValue(
                    item,
                    field,
                    type.slice(0, -2),
                    childPath(path, index),
                );
            });
            return;
        }

        const options = type ? literals(type) : undefined;
        if (options) {
            if (typeof value !== "string" || !options.includes(value)) {
                const shown =
                    typeof value === "string"
                        ? `\`"${value}"\``
                        : describe(value);
                problem(
                    path,
                    href,
                    `is ${shown}, not one of ${options.map((o) => `\`"${o}"\``).join(", ")}`,
                );
            }
            return;
        }

        const text = (check: (text: string) => string | undefined) => {
            if (typeof value !== "string") return expect("a string");
            const found = check(value);
            if (found) problem(path, href, found);
        };

        switch (type) {
            case "string":
            case "RichText":
                if (typeof value !== "string") return expect("a string");
                break;
            case "boolean":
                if (typeof value !== "boolean")
                    return expect("`true` or `false`");
                break;
            case "number": {
                if (typeof value !== "number") return expect("a number");
                if (field.numberType === "integer") {
                    const found = integerProblem(value);
                    if (found) problem(path, href, found);
                }
                break;
            }
            case "URI":
                return text(uriProblem);
            case "Domain":
                return text(domainProblem);
            case "RFC3339":
                return text(timestampProblem);
            case "Reference":
                return text(referenceProblem);
            case "Media":
                if (!isObject(value)) return expect("a Media object");
                return checkObject(value, MEDIA_FIELDS, path, "a Media");
            case "Extensions": {
                if (!isObject(value)) return expect("an object");
                for (const [key, data] of Object.entries(value)) {
                    const at = childPath(path, key);
                    const found = extensionNameProblem(key);
                    if (found) problem(at, "/extensions#naming", found);
                    // What is inside is up to each extension, but it is always an object.
                    if (!isObject(data)) {
                        problem(
                            at,
                            "/extensions#entityextension-extensions",
                            `is ${describe(data)}, not an object`,
                        );
                    }
                }
                return;
            }
            // An unknown category is treated as if it were left out, so no value is wrong.
            case "Category":
                return;
            default:
                if (field.fields.length > 0) {
                    if (!isObject(value)) return expect("an object");
                    return checkObject(
                        value,
                        field.fields,
                        path,
                        `\`${field.name}\``,
                    );
                }
                return;
        }

        const format = field.format && formatProblems[field.format]?.(value);
        if (format) problem(path, href, format);
    };

    if (!isObject(entity)) {
        problems.push({
            path: "",
            href: "/entities",
            message: `is ${describe(entity)}, not an object`,
        });
        return { problems, notes };
    }

    // Another type is another entity, with its own rules, so its fields mean nothing here.
    const { type: entityType } = entity;
    if (typeof entityType === "string" && entityType !== schema.type) {
        return { problems, notes, otherType: entityType };
    }
    checkObject(entity, schema.fields, "", withArticle(schema.name));
    return { problems, notes };
};
