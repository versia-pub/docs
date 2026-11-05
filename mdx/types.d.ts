declare module "mdx-annotations" {
    type Transformer = (tree: unknown) => void;

    export const mdxAnnotations: {
        remark: () => Transformer;
        rehype: () => Transformer;
        recma: () => Transformer;
    };
}
