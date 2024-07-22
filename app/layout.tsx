import glob from "fast-glob";
import type { Metadata } from "next";

import { Layout } from "../components/Layout";
import type { Section } from "../components/SectionProvider";
import { Providers } from "./providers";

import "@/styles/tailwind.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: {
        template: "%s - Protocol API Reference",
        default: "Protocol API Reference",
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
