// Checks a built site for broken internal links and anchors, and for duplicate
// ids. Runs against the static export, so run `deno task build` first.
// Markdown pages must link to other Markdown pages, and their anchors are the
// ids of the matching HTML page.
import { globSync, readFileSync } from "node:fs";
import { relative } from "node:path";

const OUT_DIR = "out";

/** @param {string} html */
const getMain = (html) => html.match(/<main.*?<\/main>/s)?.[0] ?? "";

/** @param {string} html */
const getIds = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);

/** @type {Map<string, string>} */
const pages = new Map();

for (const file of globSync(`${OUT_DIR}/**/*.html`)) {
    const route = relative(OUT_DIR, file).replace(/\/?(index)?\.html$/, "");
    pages.set(`/${route}`, readFileSync(file, "utf8"));
}

/** @type {Map<string, string>} */
const markdown = new Map();

for (const file of globSync(`${OUT_DIR}/**/*.md`)) {
    markdown.set(`/${relative(OUT_DIR, file)}`, readFileSync(file, "utf8"));
}

/** @param {string} file */
const htmlRoute = (file) =>
    file.replace(/^\/index\.md$/, "/").replace(/\.md$/, "");

/** @type {string[]} */
const problems = [];
let checked = 0;

for (const [route, html] of pages) {
    const main = getMain(html);

    const ids = getIds(main);
    for (const id of new Set(
        ids.filter((other, i) => ids.indexOf(other) !== i),
    )) {
        problems.push(`${route}: duplicate id "${id}"`);
    }

    for (const [, href = ""] of main.matchAll(/href="((?:\/|#)[^"]*)"/g)) {
        const [address = "", fragment] = href.split("#");
        const path = address.split("?")[0] ?? "";
        const target = path === "" ? route : path.replace(/(.)\/$/, "$1");

        if (target.includes(".")) {
            continue;
        }

        checked++;
        const page = pages.get(target);
        if (page === undefined) {
            problems.push(`${route}: broken link to ${href}`);
        } else if (fragment && !getIds(page).includes(fragment)) {
            problems.push(`${route}: missing anchor in ${href}`);
        }
    }
}

for (const [file, text] of markdown) {
    for (const [, href = ""] of text.matchAll(/\]\(((?:\/|#)[^)\s]*)\)/g)) {
        const [address = "", fragment] = href.split("#");
        const target = address === "" ? file : address;

        checked++;
        if (!markdown.has(target)) {
            problems.push(
                `${file}: link to ${href}, which is not a Markdown page`,
            );
        } else if (
            fragment &&
            !getIds(getMain(pages.get(htmlRoute(target)) ?? "")).includes(
                fragment,
            )
        ) {
            problems.push(`${file}: missing anchor in ${href}`);
        }
    }
}

if (pages.size === 0) {
    problems.push(`no pages found in ${OUT_DIR}/, build the site first`);
} else if (checked === 0) {
    problems.push("no links found, so nothing was checked");
}

for (const problem of problems) {
    console.error(problem);
}
console.log(
    `Checked ${checked} links on ${pages.size + markdown.size} pages: ${problems.length} problems`,
);
process.exitCode = problems.length > 0 ? 1 : 0;
