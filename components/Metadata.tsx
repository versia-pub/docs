"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { motion } from "framer-motion";
import { type HTMLAttributes, type ReactNode, useState } from "react";

export function Badge({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={`inline-flex items-center justify-center rounded-md bg-brand-50 px-2 py-0 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-500/10 dark:bg-brand-500/10 dark:text-brand-100 dark:ring-brand-200/20 h-8${className ? ` ${className}` : ""}`}
            {...props}
        >
            {children}
        </span>
    );
}

// Collapsible, animate height
export function Changelog({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <dl className="rounded-sm border border-zinc-200 dark:border-zinc-800 py-2 px-4 dark:bg-white/2.5">
            <dt>
                <motion.button
                    className="grid grid-cols-[1fr_auto] items-center space-x-4 w-full"
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <h3 className="m-0 text-left">Changelog</h3>
                    <span className="ml-6 flex items-center">
                        {isOpen ? (
                            <Icon
                                icon="akar-icons:minus"
                                className="size-6"
                                aria-hidden="true"
                                width="unset"
                            />
                        ) : (
                            <Icon
                                icon="akar-icons:plus"
                                className="size-5"
                                aria-hidden="true"
                                width="unset"
                            />
                        )}
                    </span>
                </motion.button>
            </dt>
            <motion.dd
                initial="collapsed"
                animate={isOpen ? "open" : "collapsed"}
                variants={{
                    collapsed: { height: 0 },
                    open: { height: "auto" },
                }}
                className="overflow-hidden"
            >
                <ol className="grid gap-y-2 mt-4 list-disc mb-0">{children}</ol>
            </motion.dd>
        </dl>
    );
}

export function ChangelogItem({
    version,
    children,
}: {
    version: string;
    children: ReactNode;
}) {
    return (
        <li>
            <div className="grid grid-cols-[auto_1fr] items-center space-x-4 not-prose">
                <Badge>{version}</Badge>
                <span>{children}</span>
            </div>
        </li>
    );
}
