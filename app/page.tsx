import { Guide } from "@/components/Guides";
import { Resource, type ResourceType } from "@/components/Resources";
import { TeamMember } from "@/components/Team";
import { wrapper } from "@/components/mdx";
import fastlyLogo from "@/images/logos/fastly.svg";
import type { Metadata } from "next";
import Image from "next/image";
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
            name: "Tested in production :)",
            description:
                "We know it works well, because we use it in our own projects.",
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
                        useful applications. Formerly known as Lysand.
                    </p>
                </div>

                <h2>Made by developers</h2>

                <p className="lead">
                    Versia is designed and maintained by the developers of the
                    Versia Server, which uses Versia for federation. This
                    community could include you! Check out our{" "}
                    <a
                        href="https://github.com/versia-pub/server"
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

                <h2>Try it out</h2>

                <p className="lead">
                    Use the reference implementation,{" "}
                    <strong>Versia Server</strong>! It's a microblogging server
                    with a focus on feeling like current Fediverse platforms,
                    like Sharkey and Mastodon.
                </p>

                <Guide
                    name="Versia Server"
                    href="https://github.com/versia-pub/server"
                    description="The reference implementation of the Versia protocol."
                />

                <h2>Try a Versia instance</h2>

                <p className="lead">
                    If you want to try out Versia without setting up your own
                    instance, you can use one of the following public instances:
                </p>
                <ul>
                    <li>
                        <a
                            href="https://beta.versia.social"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <code>beta.versia.social</code>
                        </a>{" "}
                        (send an email to{" "}
                        <a
                            href={`mailto:aprl@versia.pub?subject=${encodeURIComponent("beta.versia.social Account Request")}&body=${encodeURIComponent("Hello, I would like to request an account on beta.versia.social.")}`}
                        >
                            <code>aprl@versia.pub</code>
                        </a>{" "}
                        for an account)
                    </li>
                </ul>

                <h2 id="team">People</h2>

                <p className="lead">
                    You can ask <code>Jesse</code> for help with anything
                    Versia-related, or if you just want to chat!
                </p>

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
                                url: "https://beta.versia.social/@jessew",
                            },
                            {
                                name: "Matrix",
                                icon: "simple-icons:matrix",
                                url: "https://matrix.to/#/@jesse:cpluspatch.dev",
                            },
                            {
                                name: "Signal",
                                icon: "simple-icons:signal",
                                url: "https://signal.me/#eu/Qw6gQXvEfcNrgEFgl-KjOBFiF6-3gWSSghgcpSj9dSedVFIPny5NYazioN5t7E24",
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
                                url: "https://beta.versia.social/@aprl",
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

                <h2 id="team">Thanks</h2>

                <p className="lead">
                    Thanks to{" "}
                    <a
                        href="https://fastly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Fastly
                    </a>{" "}
                    for supporting us with their resources!
                </p>

                <p>
                    <Image
                        src={fastlyLogo}
                        alt="Fastly logo"
                        height={144}
                        className="p-10 rounded-sm border border-zinc-900/10 dark:border-white/10"
                        unoptimized={true}
                    />
                </p>
            </>
        ),
    });
};

export default Page;
