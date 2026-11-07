import type { FieldSpec } from "./types.ts";

const href = (name: string) => `/structures/media#media-${name}`;

const field = (
    name: string,
    type: string,
    rest: Partial<FieldSpec> = {},
): FieldSpec => ({
    name,
    type,
    required: false,
    href: href(name),
    fields: [],
    ...rest,
});

/**
 * The fields of a Media structure, as `/structures/media` lists them. They live here because that
 * sheet is on another page. `remark-spec` fails the build when the sheet and this list disagree,
 * and `format` holds what each field's description adds.
 */
export const MEDIA_FIELDS: FieldSpec[] = [
    field("url", "URI", { required: true }),
    field("media_type", "string", { required: true, format: "media-type" }),
    field("description", "string"),
    field("size", "number", { numberType: "integer" }),
    field("hash", "string", { format: "sha256" }),
    field("thumbhash", "string", { format: "base64" }),
    field("width", "number", { numberType: "integer" }),
    field("height", "number", { numberType: "integer" }),
    field("duration", "number", {
        numberType: "float",
        format: "non-negative",
    }),
];
