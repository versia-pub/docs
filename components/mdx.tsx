import clsx from "clsx";
import Link from "next/link";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Feedback } from "./Feedback";
import { Heading } from "./Heading";
import { Prose } from "./Prose";

export const a = Link;
// biome-ignore lint/performance/noBarrelFile: <explanation>
export { Button } from "./Button";
export { CodeGroup, Code as code, Pre as pre } from "./Code";

export function wrapper({ children }: { children: ReactNode }) {
    return (
        <article className="flex h-full flex-col pb-10 pt-16">
            <Prose className="flex-auto">{children}</Prose>
            <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
                <Feedback />
            </footer>
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

export function Note({ children }: { children: ReactNode }) {
    return (
        <div className="my-6 flex gap-2.5 rounded-md border border-brand-500/20 bg-brand-50/50 p-4 leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/5 dark:text-brand-200 dark:[--tw-prose-links-hover:theme(colors.brand.300)] dark:[--tw-prose-links:theme(colors.white)]">
            <InfoIcon className="mt-1 h-4 w-4 flex-none fill-brand-500 stroke-white dark:fill-brand-200/20 dark:stroke-brand-200" />
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

export function Properties({ children }: { children: ReactNode }) {
    return (
        <div className="my-6">
            <ul className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5">
                {children}
            </ul>
        </div>
    );
}

const numberTypeTooltips = {
    f64: "64-bit floating-point number",
    i64: "64-bit signed integer",
    u64: "64-bit unsigned integer",
};

export function Property({
    name,
    children,
    type,
    typeLink,
    numberType,
    required,
}: {
    name: string;
    children: ReactNode;
    type?: string;
    typeLink?: string;
    numberType?: "f64" | "i64" | "u64";
    required?: boolean;
}) {
    return (
        <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
            <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt className="sr-only">Name</dt>
                <dd>
                    <code>{name}</code>
                </dd>
                {required && (
                    <>
                        <dt className="sr-only">Required</dt>
                        <dd className="inline-flex items-center rounded-md bg-brand-50 px-2 py-0 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-500/10 dark:bg-brand-500/10 dark:text-brand-100 dark:ring-brand-200/20">
                            Required
                        </dd>
                    </>
                )}
                {numberType && (
                    <>
                        <dt className="sr-only">Type</dt>
                        <dd
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-500/10 dark:bg-blue-500/10 dark:text-blue-100 dark:ring-blue-200/20 hover:cursor-pointer"
                            title={numberTypeTooltips[numberType]}
                        >
                            {numberType}
                        </dd>
                    </>
                )}
                {type && (
                    <>
                        <dt className="sr-only">Type</dt>
                        <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                            {typeLink ? (
                                <Link href={typeLink}>{type}</Link>
                            ) : (
                                type
                            )}
                        </dd>
                    </>
                )}
                <dt className="sr-only">Description</dt>
                <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
                    {children}
                </dd>
            </dl>
        </li>
    );
}
