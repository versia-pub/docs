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
                    label: "Learn",
                    items: [
                        link("Introduction", "/introduction"),
                        link("Principles", "/philosophy/principles"),
                        link("Entities", "/entities"),
                        link("JSON", "/json"),
                        link("Signatures", "/signatures"),
                        link("Security", "/security"),
                        link("Links", "/links"),
                    ],
                },
                {
                    label: "Federate",
                    items: [
                        link("Overview", "/federation"),
                        link("HTTP", "/federation/http"),
                        link("Discovery", "/federation/discovery"),
                        link("Validation", "/federation/validation"),
                        link("API basics", "/api/basics"),
                        link("Endpoints", "/api/endpoints"),
                        link("Example", "/federation/example"),
                    ],
                },
                {
                    label: "Entities",
                    items: [
                        link("Delete", "/entities/delete", true),
                        link("Follow", "/entities/follow", true),
                        link("FollowAccept", "/entities/follow-accept", true),
                        link("FollowReject", "/entities/follow-reject", true),
                        link(
                            "InstanceMetadata",
                            "/entities/instance-metadata",
                            true,
                        ),
                        link("Note", "/entities/note", true),
                        link("Unfollow", "/entities/unfollow", true),
                        link("User", "/entities/user", true),
                    ],
                },
                {
                    label: "Structures",
                    items: [
                        link("Collection", "/structures/collection", true),
                        link(
                            "ContentFormat",
                            "/structures/content-format",
                            true,
                        ),
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
                    label: "Project",
                    items: [
                        link("SDKs", "/sdks"),
                        link("Changelog", "/changelog"),
                    ],
                },
            ],
        }),
    ],
});
