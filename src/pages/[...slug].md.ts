import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { listExtensions } from "../lib/extensions";
import { pageToMarkdown } from "../lib/markdown/page";

export const getStaticPaths = async () =>
    (await getCollection("docs"))
        .filter(({ id }) => id !== "404")
        .map((entry) => ({ params: { slug: entry.id }, props: { entry } }));

type Props = Awaited<ReturnType<typeof getStaticPaths>>[number]["props"];

export const GET: APIRoute = async ({ props }) => {
    const { entry } = props as Props;
    const markdown = await pageToMarkdown({
        source: entry.body ?? "",
        path: entry.filePath ?? entry.id,
        title: entry.data.title,
        description: entry.data.description,
        extension: entry.data.extension,
        extensions: await listExtensions(),
    });
    return new Response(markdown, {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
};
