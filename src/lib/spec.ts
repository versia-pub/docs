export const CURRENT_VERSION = "Working Draft 7";
export const API_PREFIX = "/.versia/v0.7";

/** Where each named type is defined, so that type strings can link themselves. */
export const typeLinks: Record<string, string> = {
    Collection: "/structures/collection",
    ContentFormat: "/structures/content-format",
    CustomEmoji: "/extensions/custom-emojis#structure-definition",
    Domain: "/api/basics#domain",
    Entity: "/entities",
    Extensions: "/extensions#entity-extension",
    Reference: "/entities#reference",
    ReferenceCollection: "/structures/collection#reference-collection",
    RFC3339: "https://datatracker.ietf.org/doc/html/rfc3339",
    URI: "https://datatracker.ietf.org/doc/html/rfc3986",
};
