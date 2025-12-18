"use client";

import { Icon } from "@iconify-icon/react";
import {
    type MotionValue,
    motion,
    useMotionTemplate,
    useMotionValue,
} from "framer-motion";
import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { GridPattern } from "./GridPattern";
import { Heading } from "./Heading";

export interface ResourceType {
    href?: string;
    name: string;
    description: string;
    icon: string;
    pattern?: Omit<
        ComponentPropsWithoutRef<typeof GridPattern>,
        "width" | "height" | "x"
    >;
}

const resources: ResourceType[] = [
    {
        href: "/entities",
        name: "Entities",
        description:
            "Learn how Entities work and how to use them to transmit federated data.",
        icon: "tabler:code-asterisk",
        pattern: {
            y: 16,
            squares: [
                [0, 1],
                [1, 3],
            ],
        },
    },
    {
        href: "/federation",
        name: "Federation",
        description:
            "Learn how to federate data across the Versia federation network.",
        icon: "tabler:building-bank",
        pattern: {
            y: -6,
            squares: [
                [-1, 2],
                [1, 3],
            ],
        },
    },
];

function ResourceIcon({ icon }: { icon: string }) {
    return (
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-brand-300/10 dark:group-hover:ring-brand-400">
            <Icon
                icon={icon}
                width="unset"
                className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-brand-300/10 dark:group-hover:stroke-brand-400"
            />
        </div>
    );
}

function ResourcePattern({
    mouseX,
    mouseY,
    ...gridProps
}: ResourceType["pattern"] & {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}) {
    const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="pointer-events-none">
            <div className="absolute inset-0 rounded-md transition duration-300 mask-[linear-gradient(white,transparent)] group-hover:opacity-50">
                <GridPattern
                    width={72}
                    height={56}
                    x="50%"
                    className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
                    {...gridProps}
                />
            </div>
            <motion.div
                className="absolute inset-0 rounded-md bg-linear-to-r from-brand-100 to-brand-50 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-brand-900/30 dark:to-brand-950/30"
                style={style}
            />
            <motion.div
                className="absolute inset-0 rounded-md opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
                style={style}
            >
                <GridPattern
                    width={72}
                    height={56}
                    x="50%"
                    className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
                    {...gridProps}
                />
            </motion.div>
        </div>
    );
}

export function Resource({ resource }: { resource: ResourceType }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            key={resource.href}
            onMouseMove={onMouseMove}
            className="group relative flex rounded-md bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
        >
            <ResourcePattern
                {...(resource.pattern ?? {
                    y: 0,
                    squares: [
                        [0, 1],
                        [1, 2],
                    ],
                })}
                mouseX={mouseX}
                mouseY={mouseY}
            />
            <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
            <div className="relative rounded-md px-4 pb-4 pt-16">
                <ResourceIcon icon={resource.icon} />
                <h3 className="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
                    {resource.href ? (
                        <Link href={resource.href}>
                            <span className="absolute inset-0 rounded-md" />
                            {resource.name}
                        </Link>
                    ) : (
                        resource.name
                    )}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {resource.description}
                </p>
            </div>
        </div>
    );
}

export function Resources() {
    return (
        <div className="my-16 xl:max-w-none">
            <Heading level={2} id="resources">
                Resources
            </Heading>
            <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
                {resources.map((resource) => (
                    <Resource key={resource.href} resource={resource} />
                ))}
            </div>
        </div>
    );
}
