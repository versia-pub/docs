import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { tagline } from "../lib/home.ts";
import { markdownHref } from "../lib/markdown/page.ts";
import { sidebar } from "../lib/sidebar.ts";

/** Every page's Markdown version, in sidebar order, so an agent can start here. */
export const GET: APIRoute = async () => {
    const pages = new Map(
        (await getCollection("docs")).map((entry) => [
            `/${entry.id}`,
            entry.data,
        ]),
    );
    const groups = sidebar.map((group) => {
        const lines = group.items.map(({ label, link }) => {
            const page = pages.get(link);
            if (!page) throw new Error(`No page for the sidebar link ${link}`);
            return `- [${label}](${markdownHref(link)}): ${page.description}`;
        });
        return `## ${group.label}\n\n${lines.join("\n")}`;
    });
    const markdown = ["# Versia", tagline, ...groups].join("\n\n");

    return new Response(`${markdown}\n`, {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
};
