import clsx from "clsx";
import Link from "next/link";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Heading } from "./Heading";
import { Prose } from "./Prose";

export const a = Link;
// biome-ignore lint/performance/noBarrelFile: <explanation>
export { Button } from "./Button";
export { CodeGroup, Code as code, Pre as pre } from "./Code";
export { Property, Properties } from "./Property";

export function wrapper({ children }: { children: ReactNode }) {
    return (
        <article className="flex h-full flex-col pb-10 pt-16 overflow-hidden text-wrap">
            <Prose className="flex-auto">{children}</Prose>
            {/* <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
                <Feedback />
            </footer> */}
        </article>
    );
}

export const h2 = function H2(
    props: Omit<ComponentPropsWithoutRef<typeof Heading>, "level">,
) {
    return <Heading level={2} {...props} />;
};

function InfoIcon(props: ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
            <circle cx="8" cy="8" r="8" strokeWidth="0" />
            <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.75 7.75h1.5v3.5"
            />
            <circle cx="8" cy="4" r=".5" fill="none" />
        </svg>
    );
}

function WarningIcon(props: ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v4"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17h.01"
            />
        </svg>
    );
}

export function Note({ children }: { children: ReactNode }) {
    return (
        <div className="my-6 flex gap-2.5 rounded-md border border-brand-500/20 bg-brand-50/50 p-4 leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/5 dark:text-brand-200 dark:[--tw-prose-links-hover:var(--color-brand-300)] dark:[--tw-prose-links:var(--color-white)]">
            <InfoIcon className="mt-1 h-4 w-4 flex-none fill-brand-500 stroke-white dark:fill-brand-200/20 dark:stroke-brand-200" />
            <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
                {children}
            </div>
        </div>
    );
}

export function Warning({ children }: { children: ReactNode }) {
    return (
        <div className="my-6 flex gap-2.5 rounded-md border border-yellow-500/20 bg-yellow-50/50 p-4 leading-6 text-yellow-900 dark:border-yellow-500/30 dark:bg-yellow-500/5 dark:text-yellow-200 dark:[--tw-prose-links-hover:theme(colors.yellow.300)] dark:[--tw-prose-links:theme(colors.white)]">
            <WarningIcon className="mt-1 h-4 w-4 flex-none fill-yellow-500 stroke-white dark:fill-yellow-200/20 dark:stroke-yellow-200" />
            <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
                {children}
            </div>
        </div>
    );
}

export function Row({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
            {children}
        </div>
    );
}

export function Col({
    children,
    sticky = false,
}: {
    children: ReactNode;
    sticky?: boolean;
}) {
    return (
        <div
            className={clsx(
                "[&>:first-child]:mt-0 [&>:last-child]:mb-0",
                sticky && "xl:sticky xl:top-24",
            )}
        >
            {children}
        </div>
    );
}
