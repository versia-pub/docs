import * as fs from "node:fs";
import * as path from "node:path";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import glob from "fast-glob";
import { toString as mdastToString } from "mdast-util-to-string";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import { filter } from "unist-util-filter";
import { SKIP, visit } from "unist-util-visit";

const processor = remark().use(remarkMdx).use(extractSections);
const slugify = slugifyWithCounter();
const cache = new Map();

function isObjectExpression(node) {
    return (
        node.type === "mdxTextExpression" &&
        node.data?.estree?.body?.[0]?.expression?.type === "ObjectExpression"
    );
}

function excludeObjectExpressions(tree) {
    return filter(tree, (node) => !isObjectExpression(node));
}

function extractSections() {
    return (tree, { sections }) => {
        slugify.reset();

        visit(tree, (node) => {
            if (node.type === "heading" || node.type === "paragraph") {
                const content = mdastToString(excludeObjectExpressions(node));
                if (node.type === "heading" && node.depth <= 2) {
                    const hash = node.depth === 1 ? null : slugify(content);
                    sections.push([content, hash, []]);
                } else {
                    sections.at(-1)?.[2].push(content);
                }
                return SKIP;
            }
        });
    };
}

export default function searchLoader() {
    const appDir = path.resolve("./app");
    this.addContextDependency(appDir);

    const files = glob.sync("**/*.mdx", { cwd: appDir });
    const data = files.map((file) => {
        const url = `/${file.replace(/(^|\/)page\.mdx$/, "")}`;
        const mdx = fs.readFileSync(path.join(appDir, file), "utf8");

        let sections = [];

        if (cache.get(file)?.[0] === mdx) {
            sections = cache.get(file)[1];
        } else {
            const vfile = { value: mdx, sections };
            processor.runSync(processor.parse(vfile), vfile);
            cache.set(file, [mdx, sections]);
        }

        return { url, sections };
    });

    return `export default ${JSON.stringify(data)};`;
}
