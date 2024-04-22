import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Lysand Documentation",
    description: "Documentation for Lysand, a new federated protocol",
    srcDir: "docs",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Specification", link: "/spec" },
        ],

        sidebar: [
            {
                text: "Spec Details",
                items: [{ text: "Spec", link: "/spec" }],
            },
            {
                text: "Structures",
                items: [
                    {
                        text: "Content Format",
                        link: "/structures/content-format",
                    },
                    { text: "Custom Emoji", link: "/structures/custom-emoji" },
                    { text: "Collection", link: "/structures/collection" },
                ],
            },
            {
                text: "Groups",
                link: "/groups",
            },
            {
                text: "Cryptography",
                items: [
                    { text: "Keys", link: "/cryptography/keys" },
                    { text: "Signing", link: "/cryptography/signing" },
                ],
            },
            {
                text: "Objects",
                link: "/objects",
                items: [
                    {
                        text: "Publications",
                        link: "/objects/publications",
                        items: [
                            { text: "Note", link: "/objects/note" },
                            { text: "Patch", link: "/objects/patch" },
                        ],
                    },
                    {
                        text: "Actors",
                        link: "/objects/actors",
                        items: [{ text: "User", link: "/objects/user" }],
                    },
                    {
                        text: "Actions",
                        link: "/objects/actions",
                        items: [
                            { text: "Like", link: "/objects/like" },
                            { text: "Dislike", link: "/objects/dislike" },
                            { text: "Follow", link: "/objects/follow" },
                            {
                                text: "FollowAccept",
                                link: "/objects/follow-accept",
                            },
                            {
                                text: "FollowReject",
                                link: "/objects/follow-reject",
                            },
                            { text: "Announce", link: "/objects/announce" },
                            { text: "Undo", link: "/objects/undo" },
                        ],
                    },
                    {
                        text: "Server Metadata",
                        link: "/objects/server-metadata",
                    },
                ],
            },
            {
                text: "Federation",
                items: [
                    { text: "Endpoints", link: "/federation/endpoints" },
                    {
                        text: "User Discovery",
                        link: "/federation/user-discovery",
                    },
                    { text: "Server Actors", link: "/federation/server-actor" },
                ],
            },
            {
                text: "Extensions",
                link: "/extensions",
                items: [
                    {
                        text: "Custom Emojis",
                        link: "/extensions/custom-emojis",
                    },
                    {
                        text: "Microblogging",
                        link: "/extensions/microblogging",
                    },
                    { text: "Reactions", link: "/extensions/reactions" },
                    { text: "Polls", link: "/extensions/polls" },
                    { text: "Is Cat", link: "/extensions/is-cat" },
                    {
                        text: "Server Endorsements",
                        link: "/extensions/server-endorsement",
                    },
                    { text: "Events", link: "/extensions/events" },
                    { text: "Reports", link: "/extensions/reports" },
                    { text: "Vanity", link: "/extensions/vanity" },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/lysand-org/" },
        ],
        search: {
            provider: "local",
        },
        editLink: {
            pattern: "https://github.com/lysand-org/docs/edit/main/docs/:path",
        },
        logo: "/logo.png",
    },
    lastUpdated: true,
    cleanUrls: true,
    titleTemplate: ":title · Lysand 2.0 Docs",
    head: [["link", { rel: "icon", href: "/favicon.png", type: "image/png" }]],
    lang: "en-US",
});
