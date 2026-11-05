declare module "mdx-annotations" {
    type Transformer = (tree: unknown) => void;

    export const mdxAnnotations: {
        remark: () => Transformer;
        rehype: () => Transformer;
        recma: () => Transformer;
    };
}

declare module "hast" {
    interface RootContentMap {
        mdxjsEsm: {
            type: "mdxjsEsm";
            value: string;
            data?: { estree?: unknown };
        };
    }
}
