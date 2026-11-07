/** A rule from the pages that a field's text has to follow, beyond its type. */
type FieldFormat = "id" | "sha256" | "base64" | "non-negative" | "media-type";

/** A field as its sheet lists it. `remark-spec` reads these from the page. */
export interface FieldSpec {
    name: string;
    /** As the sheet writes it, such as `Reference[]` or `"public" | "followers"`. */
    type?: string;
    required: boolean;
    numberType?: "float" | "integer";
    format?: FieldFormat;
    /** Where the field is described. */
    href: string;
    /** The fields of the object this field holds, listed under it on the sheet. */
    fields: FieldSpec[];
}

export interface EntitySchema {
    /** Such as "Follow". */
    name: string;
    /** The value of its `type` field. */
    type: string;
    /** Its own fields, then the ones it inherits. */
    fields: FieldSpec[];
}

/** Something the checker found, at a path such as `fields[0].key`, which is empty for the whole entity. */
export interface Finding {
    path: string;
    /** The field or rule it is about. */
    href: string;
    message: string;
}
