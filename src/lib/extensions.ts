import { getCollection } from "astro:content";

export type Extension = {
    name: string;
    extension: string;
    description?: string;
    href: string;
};

/** Each extension page's frontmatter holds its ID, so a new page joins this list by itself. */
export const listExtensions = async (): Promise<Extension[]> =>
    (await getCollection("docs"))
        .flatMap(({ id, data }) =>
            data.extension
                ? [
                      {
                          name: data.title.replace(/ Extension$/, ""),
                          extension: data.extension,
                          description: data.description,
                          href: `/${id}`,
                      },
                  ]
                : [],
        )
        .sort((a, b) => a.name.localeCompare(b.name));
