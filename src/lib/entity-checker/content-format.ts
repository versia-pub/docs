import type { FieldSpec } from "./types";

const href = (name: string) =>
    `/structures/content-format#contentformat-${name}`;

/**
 * The fields of a ContentFormat's values, as `/structures/content-format` lists them. They live
 * here because that sheet is on another page. `remark-spec` fails the build when the sheet and
 * this list disagree, and `format` holds what each field's description adds.
 */
export const CONTENT_FORMAT_FIELDS: FieldSpec[] = [
    {
        name: "content",
        type: "string",
        required: false,
        href: href("content"),
        fields: [],
    },
    {
        name: "url",
        type: "URI",
        required: false,
        href: href("url"),
        fields: [],
    },
    {
        name: "description",
        type: "string",
        required: false,
        href: href("description"),
        fields: [],
    },
    {
        name: "size",
        type: "number",
        numberType: "integer",
        required: false,
        href: href("size"),
        fields: [],
    },
    {
        name: "hash",
        type: "string",
        format: "sha256",
        required: false,
        href: href("hash"),
        fields: [],
    },
    {
        name: "thumbhash",
        type: "string",
        format: "base64",
        required: false,
        href: href("thumbhash"),
        fields: [],
    },
    {
        name: "width",
        type: "number",
        numberType: "integer",
        required: false,
        href: href("width"),
        fields: [],
    },
    {
        name: "height",
        type: "number",
        numberType: "integer",
        required: false,
        href: href("height"),
        fields: [],
    },
    {
        name: "fps",
        type: "number",
        numberType: "float",
        format: "non-negative",
        required: false,
        href: href("fps"),
        fields: [],
    },
    {
        name: "duration",
        type: "number",
        numberType: "float",
        format: "non-negative",
        required: false,
        href: href("duration"),
        fields: [],
    },
];

/** Where the rule that a value has exactly one of `content` and `url` is stated. */
export const CONTENT_FORMAT_HREF = "/structures/content-format";
