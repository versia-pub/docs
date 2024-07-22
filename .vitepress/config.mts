import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Lysand Documentation",
    description: "Documentation for Lysand, a new federated protocol",
    vite: {
        plugins: [tailwindcss()],
    },
    vue: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => tag === "iconify-icon",
            },
        },
    },
    srcDir: "docs",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Specification", link: "/spec" },
            { text: "Objects", link: "/objects" },
            { text: "Security", link: "/security/api" },
            { text: "Extensions", link: "/extensions" },
        ],

        sidebar: [
            {
                text: "Specification",
                items: [
                    { text: "Spec", link: "/spec" },
                    { text: "Objects", link: "/objects" },
                ],
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
                items: [{ text: "Groups", link: "/groups" }],
            },
            {
                text: "Security",
                items: [
                    { text: "API", link: "/security/api" },
                    { text: "Keys", link: "/security/keys" },
                    { text: "Signing", link: "/security/signing" },
                ],
            },
            {
                text: "Objects",
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
                    { text: "Migration", link: "/extensions/migration" },
                    { text: "Vanity", link: "/extensions/vanity" },
                    {
                        text: "Interactivity",
                        link: "/extensions/interactivity",
                    },
                ],
            },
        ],

        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2023-present Gaspard Wierzbinski",
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/lysand-org/" },
        ],
        search: {
            provider: "local",
        },
        editLink: {
            pattern: "https://github.com/lysand-org/docs/edit/main/docs/:path",
        },
        externalLinkIcon: true,
        logo: "https://cdn.lysand.org/logo.webp",
    },
    lastUpdated: true,
    cleanUrls: true,
    titleTemplate: ":title · Lysand Docs",
    head: [["link", { rel: "icon", href: "/favicon.png", type: "image/png" }]],
    lang: "en-US",
});
