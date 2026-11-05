const MAX_RESULTS = 5;
const MAX_RESULTS_PER_PAGE = 2;

export type Result = {
    url: string;
    title: string;
    pageTitle?: string;
};

// The parts used of https://pagefind.app/docs/api/
interface Pagefind {
    search(query: string): Promise<{
        results: {
            data(): Promise<{
                meta: { title: string };
                sub_results: {
                    title: string;
                    url: string;
                    locations: number[];
                }[];
            }>;
        }[];
    }>;
}

/** Turns the URL of an exported file into the URL of its route. */
function toRoute(url: string) {
    return url.replace(/(\/index)?\.html(?=#|$)/, "") || "/";
}

export async function search(query: string): Promise<Result[]> {
    if (!query.trim()) {
        return [];
    }

    // Pagefind generates this file in the static export, after the Next.js
    // build, so the bundler must leave the import for the browser to resolve.
    const pagefind: Pagefind = await import(
        /* turbopackIgnore: true */ "/pagefind/pagefind.js" as string
    );
    const { results } = await pagefind.search(query);
    const pages = await Promise.all(
        results.slice(0, MAX_RESULTS).map((result) => result.data()),
    );

    return pages
        .flatMap((page) =>
            page.sub_results
                .toSorted((a, b) => b.locations.length - a.locations.length)
                .slice(0, MAX_RESULTS_PER_PAGE)
                .map((section) => ({
                    url: toRoute(section.url),
                    title: section.title,
                    pageTitle:
                        section.title === page.meta.title
                            ? undefined
                            : page.meta.title,
                })),
        )
        .slice(0, MAX_RESULTS);
}
