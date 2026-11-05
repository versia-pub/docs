import { fileURLToPath } from "node:url";
import nextMDX from "@next/mdx";

// Turbopack needs serializable loader options, so plugins are passed as paths.
// They must be absolute: the MDX loader resolves them from each page's folder.
/** @param {string} file */
const plugin = (file) =>
    fileURLToPath(new URL(`./mdx/${file}`, import.meta.url));

const withMDX = nextMDX({
    options: {
        remarkPlugins: [plugin("remark.mjs"), "remark-gfm"],
        rehypePlugins: [plugin("rehype.mjs")],
        recmaPlugins: [plugin("recma.mjs")],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    output: "export",
    agentRules: false,
    turbopack: {
        rules: {
            "*/mdx/search-data.mjs": {
                loaders: ["./mdx/search-loader.mjs"],
                as: "*.js",
            },
        },
    },
};

export default withMDX(nextConfig);
