/** Fields every entity inherits, documented on /entities. */
export const inheritedFields = [
    { name: "id", type: "string", required: true },
    { name: "type", type: "string", required: true },
    { name: "created_at", type: "RFC3339", required: true },
    { name: "updated_at", type: "RFC3339", required: false },
    { name: "$schema", type: "string", required: false },
    { name: "extensions", type: "Extensions", required: false },
];

/** Keeps the anchor format of the previous site, such as `note-is-sensitive`. */
export const anchorPart = (name: string) =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

export const inheritedFieldHref = (name: string) =>
    `/entities#entity-${anchorPart(name)}`;
