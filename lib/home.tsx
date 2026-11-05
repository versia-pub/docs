import type { ComponentProps } from "react";
import {
    CodeDotsIcon,
    CodeIcon,
    DatabaseIcon,
    EnvelopeIcon,
    GithubIcon,
    LicenseIcon,
    LinkIcon,
    MastodonIcon,
    MatrixIcon,
    PlugIcon,
    PuzzleIcon,
    ServerIcon,
    ShieldCheckIcon,
    ShieldIcon,
    SignalIcon,
} from "@/components/icons";
import type { ResourceType } from "@/components/Resources";
import type { TeamMember } from "@/components/Team";

export const features: ResourceType[] = [
    {
        name: "JSON-based APIs",
        description: "Simple JSON objects are used to represent all data.",
        icon: <CodeDotsIcon />,
    },
    {
        name: "MIT licensed",
        description:
            "Versia is licensed under the MIT License, which allows you to use it for any purpose.",
        icon: <LicenseIcon />,
    },
    {
        name: "Built-in namespaced extensions",
        description:
            "Extensions for common use cases are built-in, such as custom emojis and reactions",
        icon: <PuzzleIcon />,
    },
    {
        name: "Easy to implement",
        description:
            "Versia is designed to be easy to implement in any language.",
        icon: <CodeIcon />,
    },
    {
        name: "Signed by default",
        description:
            "All requests are signed using advanced cryptographic algorithms.",
        icon: <ShieldCheckIcon />,
    },
    {
        name: "No vendor lock-in",
        description:
            "Standardization is heavy and designed to break vendor lock-in.",
        icon: <DatabaseIcon />,
    },
    {
        name: "Tested in production :)",
        description:
            "We know it works well, because we use it in our own projects.",
        icon: <ShieldIcon />,
    },
    {
        name: "Official SDKs",
        description: "Official SDKs are available for TypeScript",
        icon: <PlugIcon />,
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
                icon: <LinkIcon />,
                url: "https://cpluspatch.com",
            },
            {
                name: "GitHub",
                icon: <GithubIcon />,
                url: "https://github.com/cpluspatch",
            },
            {
                name: "Fediverse",
                icon: <MastodonIcon />,
                url: "https://mk.cpluspatch.com/@jessew",
            },
            {
                name: "Versia",
                icon: <ServerIcon />,
                url: "https://beta.versia.social/@jessew",
            },
            {
                name: "Matrix",
                icon: <MatrixIcon />,
                url: "https://matrix.to/#/@jesse:cpluspatch.dev",
            },
            {
                name: "Signal",
                icon: <SignalIcon />,
                url: "https://signal.me/#eu/Qw6gQXvEfcNrgEFgl-KjOBFiF6-3gWSSghgcpSj9dSedVFIPny5NYazioN5t7E24",
            },
            {
                name: "Email",
                icon: <EnvelopeIcon />,
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
                icon: <GithubIcon />,
                url: "https://github.com/cutestnekoaqua",
            },
            {
                name: "Fediverse",
                icon: <MastodonIcon />,
                url: "https://donotsta.re/april",
            },
            {
                name: "Versia",
                icon: <ServerIcon />,
                url: "https://beta.versia.social/@aprl",
            },
            {
                name: "Matrix",
                icon: <MatrixIcon />,
                url: "https://matrix.to/#/@aprl:uwu.is",
            },
            {
                name: "Email",
                icon: <EnvelopeIcon />,
                url: "mailto:aprl@acab.dev",
            },
        ],
    },
];
