import { Resource, type ResourceType } from "@/components/Resources";
import { TeamMember } from "@/components/Team";
import { wrapper } from "@/components/mdx";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
    title: "Versia Documentation",
    description:
        "Introduction to the Versia Protocol, a communication medium for federated applications, leveraging the HTTP stack.",
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
                "Versia is licensed under the MIT License, which allows you to use it for any purpose.",
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
                "Versia is designed to be easy to implement in any language.",
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
                        Versia
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
                    Versia is designed and maintained by the developers of the
                    Versia Server, which uses Versia for federation. This
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

                <h2>Team</h2>

                <div className="not-prose mt-4 grid grid-cols-1 max-w-full gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-3 dark:border-white/5">
                    <TeamMember
                        name="Jesse"
                        bio="Lead developer, spec design, UI design."
                        username="CPlusPatch"
                        avatarUrl="https://avatars.githubusercontent.com/u/42910258?v=4"
                        socials={[
                            {
                                name: "Website",
                                icon: "bx:link",
                                url: "https://cpluspatch.com",
                            },
                            {
                                name: "GitHub",
                                icon: "bxl:github",
                                url: "https://github.com/cpluspatch",
                            },
                            {
                                name: "Fediverse",
                                icon: "bxl:mastodon",
                                url: "https://mk.cpluspatch.com/@jessew",
                            },
                            {
                                name: "Versia",
                                icon: "bx:server",
                                url: "https://social.lysand.org/@jessew",
                            },
                            {
                                name: "Matrix",
                                icon: "simple-icons:matrix",
                                url: "https://matrix.to/#/@jesse:cpluspatch.dev",
                            },
                            {
                                name: "Signal",
                                icon: "simple-icons:signal",
                                url: "https://signal.me/#eu/mdX6iV0ayndNmJst43sNtlw3eFXgHSm7if4Y/mwYT1+qFDzl1PFAeroW+RpHGaRu",
                            },
                            {
                                name: "Email",
                                icon: "bx:bxs-envelope",
                                url: "mailto:contact@cpluspatch.com",
                            },
                        ]}
                    />
                    <TeamMember
                        name="April"
                        bio="Spec design, ActivityPub bridge, emotional support cat."
                        username="aprl"
                        avatarUrl="https://avatars.githubusercontent.com/u/30842467?v=4"
                        socials={[
                            {
                                name: "GitHub",
                                icon: "bxl:github",
                                url: "https://github.com/cutestnekoaqua",
                            },
                            {
                                name: "Fediverse",
                                icon: "bxl:mastodon",
                                url: "https://donotsta.re/april",
                            },
                            {
                                name: "Versia",
                                icon: "bx:server",
                                url: "https://social.lysand.org/@aprl",
                            },
                            {
                                name: "Matrix",
                                icon: "simple-icons:matrix",
                                url: "https://matrix.to/#/@aprl:uwu.is",
                            },
                            {
                                name: "Email",
                                icon: "bx:bxs-envelope",
                                url: "mailto:aprl@acab.dev",
                            },
                        ]}
                    />
                    <TeamMember
                        name="Anna"
                        username="devminer"
                        avatarUrl="https://i.imgur.com/grHNY7G.png"
                        bio="Golang SDK, spec design."
                        socials={[
                            {
                                name: "Website",
                                icon: "bx:link",
                                url: "https://devminer.xyz/",
                            },
                            {
                                name: "GitHub",
                                icon: "bxl:github",
                                url: "https://github.com/TheDevMinerTV",
                            },
                            {
                                name: "Matrix",
                                icon: "simple-icons:matrix",
                                url: "https://matrix.to/#/@devminer:devminer.xyz",
                            },
                        ]}
                    />
                </div>
            </>
        ),
    });
};

export default Page;
