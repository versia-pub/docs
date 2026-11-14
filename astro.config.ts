import process from "node:process";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { transformerNotationFocus } from "@shikijs/transformers";
import { defineConfig } from "astro/config";
import { codeThemeDark, codeThemeLight } from "./src/lib/code-themes.ts";
import {
    rehypeHeadingSlugs,
    rehypeNormative,
    rehypeNotesBesideText,
} from "./src/lib/rehype-spec.ts";
import { remarkSpec } from "./src/lib/remark-spec.ts";
import { transformerFieldLinks } from "./src/lib/shiki-field-links.ts";
import { sidebar } from "./src/lib/sidebar.ts";

/**
 * The Plausible site that visits count under, such as `versia.pub` or `dev.versia.pub`. Only the
 * deployments that should be counted set it, so local and preview builds load no analytics.
 */
const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;

const O = "./src/components/overrides";
export default defineConfig({
    site: "https://versia.pub",
    // Matches the current URLs, such as /entities/user.
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
        "/structures/content-format": "/structures/media",
        "/extensions/vanity": "/extensions/profile",
        "/entities/follow": "/entities/subscribe",
        "/entities/follow-accept": "/entities/subscribe-accept",
        "/entities/follow-reject": "/entities/subscribe-reject",
        "/entities/unfollow": "/entities/unsubscribe",
        "/entities/note": "/extensions/social",
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
                ...(plausibleDomain
                    ? [
                          {
                              tag: "script" as const,
                              attrs: {
                                  defer: true,
                                  src: "/pl.js",
                                  "data-domain": plausibleDomain,
                                  "data-api":
                                      "https://logs.cpluspatch.com/api/event",
                              },
                          },
                      ]
                    : []),
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
            sidebar,
        }),
    ],
});
