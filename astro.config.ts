import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { transformerNotationFocus } from "@shikijs/transformers";
import { defineConfig } from "astro/config";
import { codeThemeDark, codeThemeLight } from "./src/lib/code-themes";
import {
    rehypeHeadingSlugs,
    rehypeNormative,
    rehypeNotesBesideText,
} from "./src/lib/rehype-spec";
import { remarkSpec } from "./src/lib/remark-spec";
import { transformerFieldLinks } from "./src/lib/shiki-field-links";

const O = "./src/components/overrides";
const link = (label: string, path: string, ident = false) => ({
    label,
    link: path,
    ...(ident ? { attrs: { class: "ident" } } : {}),
});

export default defineConfig({
    site: "https://versia.pub",
    // Matches the current URLs, such as /entities/note.
    trailingSlash: "never",
    outDir: "./out",
    build: { format: "file" },
    // Moved pages. Fragments of the old URLs are not carried over.
    redirects: {
        "/api/basics": "/federation/versions",
        "/api/endpoints": "/federation/endpoints",
        "/philosophy/principles": "/principles",
        "/federation/validation": "/validation",
        "/federation/example": "/example",
    },
    markdown: {
        processor: unified({
            remarkPlugins: [remarkSpec],
            rehypePlugins: [
                rehypeHeadingSlugs,
                rehypeNormative,
                rehypeNotesBesideText,
            ],
        }),
        shikiConfig: {
            themes: { light: codeThemeLight, dark: codeThemeDark },
            defaultColor: false,
            transformers: [
                transformerNotationFocus({ matchAlgorithm: "v3" }),
                transformerFieldLinks(),
            ],
        },
    },
    integrations: [
        starlight({
            title: "Versia API Reference",
            titleDelimiter: "•",
            head: [
                {
                    tag: "meta",
                    attrs: {
                        name: "keywords",
                        content:
                            "federation, api, reference, documentation, versia",
                    },
                },
                {
                    tag: "meta",
                    attrs: {
                        property: "og:image",
                        content: "https://versia.pub/logo.webp",
                    },
                },
                {
                    tag: "meta",
                    attrs: { property: "og:image:alt", content: "Versia logo" },
                },
                {
                    tag: "script",
                    attrs: {
                        defer: true,
                        src: "/pl.js",
                        "data-domain": "versia.pub",
                        "data-api": "https://logs.cpluspatch.com/api/event",
                    },
                },
            ],
            routeMiddleware: "./src/lib/route-middleware.ts",
            favicon: "/favicon.png",
            expressiveCode: false,
            tableOfContents: false,
            markdown: { headingLinks: false },
            customCss: [
                "@fontsource-variable/source-serif-4/opsz.css",
                "@fontsource-variable/source-serif-4/wght-italic.css",
                "@fontsource-variable/jetbrains-mono/index.css",
                "./src/styles/tokens.css",
                "./src/styles/base.css",
                "./src/styles/code.css",
            ],
            components: {
                PageFrame: `${O}/PageFrame.astro`,
                Header: `${O}/Header.astro`,
                Sidebar: `${O}/Sidebar.astro`,
                ThemeSelect: `${O}/ThemeSelect.astro`,
                TwoColumnContent: `${O}/TwoColumnContent.astro`,
                ContentPanel: `${O}/ContentPanel.astro`,
                PageTitle: `${O}/PageTitle.astro`,
                MarkdownContent: `${O}/MarkdownContent.astro`,
                Footer: `${O}/Footer.astro`,
            },
            sidebar: [
                {
                    label: "Start",
                    items: [
                        link("Introduction", "/introduction"),
                        link("Principles", "/principles"),
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
                        link("Note", "/entities/note", true),
                        link("User", "/entities/user", true),
                        link("Follow", "/entities/follow", true),
                        link("FollowAccept", "/entities/follow-accept", true),
                        link("FollowReject", "/entities/follow-reject", true),
                        link("Unfollow", "/entities/unfollow", true),
                        link("Delete", "/entities/delete", true),
                        link(
                            "InstanceMetadata",
                            "/entities/instance-metadata",
                            true,
                        ),
                        link("Collection", "/structures/collection", true),
                        link(
                            "ContentFormat",
                            "/structures/content-format",
                            true,
                        ),
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
                        link("Delegation", "/extensions/delegation"),
                        link("Groups", "/extensions/groups"),
                        link(
                            "Instance Messaging",
                            "/extensions/instance-messaging",
                        ),
                        link(
                            "Interaction Controls",
                            "/extensions/interaction-controls",
                        ),
                        link("Likes", "/extensions/likes"),
                        link("Migration", "/extensions/migration"),
                        link("Polls", "/extensions/polls"),
                        link("Reactions", "/extensions/reactions"),
                        link("Reports", "/extensions/reports"),
                        link("Share", "/extensions/share"),
                        link("Vanity", "/extensions/vanity"),
                    ],
                },
                {
                    label: "Guides",
                    items: [
                        link("Signing requests", "/guides/signing-requests"),
                        link(
                            "Implementing a receiver",
                            "/guides/implementing-a-receiver",
                        ),
                    ],
                },
                {
                    label: "Project",
                    items: [
                        link("Changelog", "/changelog"),
                        link("SDKs", "/sdks"),
                    ],
                },
            ],
        }),
    ],
});
