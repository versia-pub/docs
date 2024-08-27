"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@iconify-icon/react";
import type { ReactNode } from "react";
import { Button } from "./Button";
import { navigation } from "./Navigation";

function PageLink({
    label,
    page,
    previous = false,
}: {
    label: string;
    page: { href: string; title: string };
    previous?: boolean;
}) {
    return (
        <>
            <Button
                href={page.href}
                aria-label={`${label}: ${page.title}`}
                variant="secondary"
                arrow={previous ? "left" : "right"}
            >
                {label}
            </Button>
            <Link
                href={page.href}
                tabIndex={-1}
                aria-hidden="true"
                className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            >
                {page.title}
            </Link>
        </>
    );
}

function PageNavigation() {
    const pathname = usePathname();
    const allPages = navigation.flatMap((group) => group.links);
    const currentPageIndex = allPages.findIndex(
        (page) => page.href === pathname,
    );

    if (currentPageIndex === -1) {
        return null;
    }

    const previousPage = allPages[currentPageIndex - 1];
    const nextPage = allPages[currentPageIndex + 1];

    if (!(previousPage || nextPage)) {
        return null;
    }

    return (
        <div className="flex">
            {previousPage && (
                <div className="flex flex-col items-start gap-3">
                    <PageLink
                        label="Previous"
                        page={previousPage}
                        previous={true}
                    />
                </div>
            )}
            {nextPage && (
                <div className="ml-auto flex flex-col items-end gap-3">
                    <PageLink label="Next" page={nextPage} />
                </div>
            )}
        </div>
    );
}

function SocialLink({
    href,
    icon,
    children,
}: {
    href: string;
    icon: string;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            className="group"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="sr-only">{children}</span>
            <Icon
                icon={icon}
                className="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500"
            />
        </Link>
    );
}

function SmallPrint() {
    return (
        <div className="flex flex-col items-center justify-between gap-5 border-t border-zinc-900/5 pt-8 sm:flex-row dark:border-white/5">
            <p className="text-xs text-zinc-600 dark:text-zinc-400 prose dark:prose-invert">
                &copy; Copyright {new Date().getFullYear()}. Licensed under{" "}
                <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    CC BY-SA 4.0
                </a>
                .
            </p>
            <div className="flex gap-4">
                <SocialLink
                    href="https://github.com/versia-pub"
                    icon="mdi:github"
                >
                    Find us on GitHub
                </SocialLink>
            </div>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
            <PageNavigation />
            <SmallPrint />
        </footer>
    );
}
