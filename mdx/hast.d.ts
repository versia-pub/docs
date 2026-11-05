// The `export` makes this file a module, so that this extends hast's types
// instead of replacing them.
export {};

declare module "hast" {
    interface RootContentMap {
        mdxjsEsm: {
            type: "mdxjsEsm";
            value: string;
            data?: { estree?: unknown };
        };
    }
}
