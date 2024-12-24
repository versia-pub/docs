"use client";

import Link from "next/link";
import { type ReactNode, createContext, useContext } from "react";

export const PropertyContext = createContext<{
    name: string;
}>({
    name: "",
});

export function Properties({
    children,
    name,
}: { children: ReactNode; name: string }) {
    return (
        <div className="my-6">
            <ul className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5">
                <PropertyContext.Provider value={{ name }}>
                    {children}
                </PropertyContext.Provider>
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
    const { name: contextName } = useContext(PropertyContext);

    const idFormat = (name: string) =>
        name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

    return (
        <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
            <dl
                id={`${idFormat(contextName)}-${idFormat(name)}`}
                className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
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
