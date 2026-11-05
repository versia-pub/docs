import type { ComponentProps } from "react";
import type { ResourceType } from "@/components/Resources";
import type { TeamMember } from "@/components/Team";

export const features: ResourceType[] = [
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

export const team: ComponentProps<typeof TeamMember>[] = [
    {
        name: "Jesse",
        bio: "Lead developer, spec design, UI design.",
        username: "CPlusPatch",
        avatarUrl: "https://avatars.githubusercontent.com/u/42910258?v=4",
        socials: [
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
        ],
    },
    {
        name: "April",
        bio: "Spec design, ActivityPub bridge, emotional support cat.",
        username: "aprl",
        avatarUrl: "https://avatars.githubusercontent.com/u/30842467?v=4",
        socials: [
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
        ],
    },
];
