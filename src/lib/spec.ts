export const CURRENT_VERSION = "Working Draft 6";
export const API_PREFIX = "/.versia/v0.6";

/** Where each named type is defined, so that type strings can link themselves. */
export const typeLinks: Record<string, string> = {
    Collection: "/structures/collection",
    ContentFormat: "/structures/content-format",
    CustomEmoji: "/extensions/custom-emojis#structure-definition",
    Domain: "/api/basics#domain",
    Entity: "/entities",
    Extensions: "/types#extensions",
    Reference: "/types#reference",
    RFC3339: "/types#rfc-3339",
    URI: "/types#uri",
    URICollection: "/structures/collection#uri-collection",
    UUID: "/types#uuid",
};
