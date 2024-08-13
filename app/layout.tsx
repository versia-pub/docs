import glob from "fast-glob";
import type { Metadata } from "next";

import { Layout } from "../components/Layout";
import type { Section } from "../components/SectionProvider";
import { Providers } from "./providers";

import "@/styles/tailwind.css";
import logo from "@/images/branding/logo.webp";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: {
        template: "%s • Lysand API Reference",
        default: "Lysand API Reference",
    },
    keywords: ["federation", "api", "reference", "documentation", "lysand"],
    metadataBase: new URL("https://dev.lysand.org"),
    openGraph: {
        type: "article",
        images: {
            url: logo.src,
            alt: "Lysand logo",
            height: logo.height,
            width: logo.width,
            type: "image/webp",
        },
    },
};

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const pages = await glob("**/*.mdx", { cwd: "app" });
    const allSectionsEntries = (await Promise.all(
        pages.map(async (filename) => [
            `/${filename.replace(/(^|\/)page\.mdx$/, "")}`,
            (await import(`./${filename}`)).sections,
        ]),
    )) as [string, Section[]][];
    const allSections = Object.fromEntries(allSectionsEntries);

    return (
        <html lang="en" className="h-full" suppressHydrationWarning={true}>
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />
            </head>
            <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
                <Providers>
                    <div className="w-full">
                        <Layout allSections={allSections}>{children}</Layout>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
