import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

type Link = { href: string };
type Tree = { type: "link"; href: string } | { type: "group"; entries: Tree[] };

// Pages are built as `signatures.html` but served as `/signatures`, as on the previous site.
// Starlight formats its links from the build format, so they need correcting.
const clean = (link: Link) => {
    link.href = link.href.replace(/\.html(?=$|#)/, "");
};

const cleanTree = (entries: Tree[]) => {
    for (const entry of entries) {
        if (entry.type === "link") {
            clean(entry);
        } else {
            cleanTree(entry.entries);
        }
    }
};

export const onRequest = defineRouteMiddleware(({ locals }) => {
    const { head, sidebar, pagination } = locals.starlightRoute;
    for (const { attrs } of head) {
        for (const key of ["href", "content"] as const) {
            const value = attrs?.[key];
            if (
                typeof value === "string" &&
                value.startsWith("https://versia.pub/") &&
                attrs
            ) {
                attrs[key] = value
                    .replace(/\/index\.html$/, "/")
                    .replace(/\.html$/, "");
            }
        }
    }
    cleanTree(sidebar as Tree[]);
    if (pagination.prev) clean(pagination.prev);
    if (pagination.next) clean(pagination.next);
});
