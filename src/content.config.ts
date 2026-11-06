import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";

export const collections = {
    docs: defineCollection({
        loader: docsLoader(),
        schema: docsSchema({
            extend: z.object({
                // Status line above the title, such as "Entity · Core".
                kind: z.string().optional(),
                // Name of the extension this page defines, such as "pub.versia:likes".
                extension: z
                    .string()
                    .regex(/^[a-z0-9.-]+:[a-z0-9_]+$/)
                    .optional(),
            }),
        }),
    }),
};
