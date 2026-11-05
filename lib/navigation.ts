export interface NavGroup {
    title: string;
    links: Array<{
        title: string;
        href: string;
    }>;
}

export const CURRENT_VERSION = "Working Draft 6";

export const navigation: NavGroup[] = [
    {
        title: "Guides",
        links: [
            { title: "Introduction", href: "/introduction" },
            { title: "SDKs", href: "/sdks" },
            { title: "Entities", href: "/entities" },
            { title: "JSON", href: "/json" },
            { title: "Signatures", href: "/signatures" },
            { title: "Security", href: "/security" },
            { title: "Federation", href: "/federation" },
            { title: "Links", href: "/links" },
            { title: "Extensions", href: "/extensions" },
        ],
    },
    {
        title: "Philosophy",
        links: [{ title: "Principles", href: "/philosophy/principles" }],
    },
    {
        title: "Federation",
        links: [
            { title: "HTTP", href: "/federation/http" },
            { title: "Validation", href: "/federation/validation" },
            { title: "Discovery", href: "/federation/discovery" },
            { title: "Example", href: "/federation/example" },
        ],
    },
    {
        title: "API",
        links: [
            { title: "Basics", href: "/api/basics" },
            { title: "Endpoints", href: "/api/endpoints" },
        ],
    },
    {
        title: "Structures",
        links: [
            { title: "ContentFormat", href: "/structures/content-format" },
            { title: "Collection", href: "/structures/collection" },
        ],
    },
    {
        title: "Entities",
        links: [
            { title: "Delete", href: "/entities/delete" },
            { title: "Follow", href: "/entities/follow" },
            { title: "FollowAccept", href: "/entities/follow-accept" },
            { title: "FollowReject", href: "/entities/follow-reject" },
            { title: "Note", href: "/entities/note" },
            { title: "InstanceMetadata", href: "/entities/instance-metadata" },
            { title: "Unfollow", href: "/entities/unfollow" },
            { title: "Users", href: "/entities/user" },
        ],
    },
    {
        title: "Extensions",
        links: [
            { title: "Custom Emojis", href: "/extensions/custom-emojis" },
            { title: "Delegation", href: "/extensions/delegation" },
            { title: "Groups", href: "/extensions/groups" },
            {
                title: "Instance Messaging",
                href: "/extensions/instance-messaging",
            },
            {
                title: "Interaction Controls",
                href: "/extensions/interaction-controls",
            },
            { title: "Likes", href: "/extensions/likes" },
            { title: "Migration", href: "/extensions/migration" },
            { title: "Polls", href: "/extensions/polls" },
            { title: "Reactions", href: "/extensions/reactions" },
            { title: "Reports", href: "/extensions/reports" },
            { title: "Share", href: "/extensions/share" },
            { title: "Vanity", href: "/extensions/vanity" },
        ],
    },
];
