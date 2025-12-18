"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { type Section, SectionProvider } from "./SectionProvider";

export function Layout({
    children,
    allSections,
}: {
    children: ReactNode;
    allSections: Record<string, Section[]>;
}) {
    const pathname = usePathname();

    return (
        <SectionProvider sections={allSections[pathname] ?? []}>
            <div className="h-full lg:ml-72 xl:ml-80">
                <motion.header
                    layoutScroll={true}
                    className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex print:hidden"
                >
                    <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
                        <div className="hidden lg:flex">
                            <Link href="/" aria-label="Home">
                                <Logo className="h-6" />
                            </Link>
                        </div>
                        <Header />
                        <Navigation className="hidden lg:mt-10 lg:block" />
                    </div>
                </motion.header>
                <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
                    <main className="flex-auto">{children}</main>
                    <Footer />
                </div>
            </div>
        </SectionProvider>
    );
}
