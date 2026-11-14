/**
 * The sidebar, in reading order. The site and `/index.md` both list the pages from it.
 *
 * @module
 */

/** A link to a page, by its path without an extension. */
type SidebarLink = {
    label: string;
    link: string;
    attrs?: { class: string };
};

/** A labelled group of links. */
export type SidebarGroup = { label: string; items: SidebarLink[] };

const link = (label: string, path: string, ident = false): SidebarLink => ({
    label,
    link: path,
    ...(ident ? { attrs: { class: "ident" } } : {}),
});

export const sidebar: SidebarGroup[] = [
    {
        label: "Start",
        items: [
            link("Introduction", "/introduction"),
            link("Principles", "/principles"),
            link("Other protocols", "/other-protocols"),
            link("Glossary", "/glossary"),
            link("Security", "/security"),
        ],
    },
    {
        label: "Foundations",
        items: [
            link("Entities", "/entities"),
            link("JSON", "/json"),
            link("Signatures", "/signatures"),
        ],
    },
    {
        label: "Federation",
        items: [
            link("Overview", "/federation"),
            link("Discovery", "/federation/discovery"),
            link("Versions", "/federation/versions"),
            link("HTTP", "/federation/http"),
            link("Endpoints", "/federation/endpoints"),
        ],
    },
    {
        label: "Entities and structures",
        items: [
            link("User", "/entities/user", true),
            link("Subscribe", "/entities/subscribe", true),
            link("SubscribeAccept", "/entities/subscribe-accept", true),
            link("SubscribeReject", "/entities/subscribe-reject", true),
            link("Unsubscribe", "/entities/unsubscribe", true),
            link("Delete", "/entities/delete", true),
            link("InstanceMetadata", "/entities/instance-metadata", true),
            link("Collection", "/structures/collection", true),
            link("Media", "/structures/media", true),
            link("RichText", "/structures/rich-text", true),
        ],
    },
    {
        label: "Interoperability",
        items: [
            link("Validation", "/validation"),
            link("Example", "/example"),
            link("Links", "/links"),
        ],
    },
    {
        label: "Extensions",
        items: [
            link("Overview", "/extensions"),
            link("Custom Emojis", "/extensions/custom-emojis"),
            link("Decorations", "/extensions/decorations"),
            link("Delegation", "/extensions/delegation"),
            link("Domain Handles", "/extensions/domain-handles"),
            link("Groups", "/extensions/groups"),
            link("Instance Messaging", "/extensions/instance-messaging"),
            link("Interaction Controls", "/extensions/interaction-controls"),
            link("Likes", "/extensions/likes"),
            link("Migration", "/extensions/migration"),
            link("Polls", "/extensions/polls"),
            link("Profile", "/extensions/profile"),
            link("Reactions", "/extensions/reactions"),
            link("Reports", "/extensions/reports"),
            link("Share", "/extensions/share"),
            link("Social", "/extensions/social"),
        ],
    },
    {
        label: "Guides",
        items: [
            link("Signing requests", "/guides/signing-requests"),
            link("Implementing a receiver", "/guides/implementing-a-receiver"),
        ],
    },
    {
        label: "Project",
        items: [link("Changelog", "/changelog"), link("SDKs", "/sdks")],
    },
];
