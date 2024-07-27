import { Resource, type ResourceType } from "@/components/Resources";
import { wrapper } from "@/components/mdx";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
    title: "Lysand Documentation",
    description:
        "Introduction to the Lysand Protocol, a communication medium for federated applications, leveraging the HTTP stack.",
};

const Page: FC = () => {
    const resources: ResourceType[] = [
        {
            name: "JSON-based APIs",
            description: "Simple JSON objects are used to represent all data.",
            icon: "tabler:code-dots",
        },
        {
            name: "MIT licensed",
            description:
                "Lysand is licensed under the MIT License, which allows you to use it for any purpose.",
            icon: "tabler:license",
        },
        {
            name: "Built-in namespaced extensions",
            description:
                "Extensions for common use cases are built-in, such as custom emojis and reactions",
            icon: "tabler:puzzle",
        },
        {
            name: "Easy to implement",
            description:
                "Lysand is designed to be easy to implement in any language.",
            icon: "tabler:code",
        },
        {
            name: "Signed by default",
            description:
                "All requests are signed using advanced cryptographic algorithms.",
            icon: "tabler:shield-check",
        },
        {
            name: "No vendor lock-in",
            description:
                "Standardization is heavy and designed to break vendor lock-in.",
            icon: "tabler:database",
        },
        {
            name: "In-depth security docs",
            description:
                "Docs provide lots of information on how to program a secure server.",
            icon: "tabler:shield",
        },
        {
            name: "Official SDKs",
            description: "Official SDKs are available for TypeScript",
            icon: "tabler:plug",
        },
    ];

    return wrapper({
        children: (
            <>
                <div className="relative z-10 max-w-2xl lg:pt-6">
                    <h1 className="text-5xl font-semibold tracking-tight leading-3 text-brand-600 dark:text-brand-400">
                        Lysand
                    </h1>
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                        Federation, simpler
                    </h1>
                    <p className="mt-6 text-lg">
                        A simple, extensible federated protocol for building
                        useful applications.
                    </p>
                </div>

                <h2>Made by developers</h2>

                <p className="lead">
                    Lysand is designed and maintained by the developers of the
                    Lysand Server, which uses Lysand for federation. This
                    community could include you! Check out our{" "}
                    <a
                        href="https://github.com/lysand-org/lysand"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Git repository
                    </a>{" "}
                    to see how you can contribute.
                </p>

                <div className="not-prose mt-4 grid grid-cols-1 max-w-full gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
                    {resources.map((resource) => (
                        <Resource key={resource.name} resource={resource} />
                    ))}
                </div>
            </>
        ),
    });
};

export default Page;
