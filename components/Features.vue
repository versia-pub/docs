<template>
    <div class="mt-12">
        <div class="max-w-3xl">
            <h1>Made by developers</h1>
            <p>
                Lysand is designed and maintained by the developers of the Lysand Server, which uses Lysand for
                federation. This community could include you! Check out our <a
                    href="https://github.com/lysand-org/lysand">Git repository</a> to see how you can contribute.
            </p>
        </div>

        <div
            class="!mt-8 grid items-start gap-x-6 gap-y-6 sm:mt-16 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-8">
            <div v-for="feature in features" :key="feature.name"
                class="flex flex-row h-32 p-5 items-center gap-x-4 bg-[var(--vp-c-bg-soft)] shadow rounded duration-200 hover:ring-2 hover:scale-[101%] ring-[var(--vp-color-primary)]">
                <div class="aspect-square flex items-center justify-center overflow-hidden rounded shrink-0 h-full">
                    <iconify-icon :icon="feature.icon" class="text-[var(--vp-color-primary)] text-5xl" />
                </div>
                <div class="text-pretty">
                    <h3 class="!text-base font-medium !mt-0">{{ feature.name }}</h3>
                    <p class="!mt-1 !mb-0 !text-sm">{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import "iconify-icon";
const features = [
    {
        name: "JSON-based APIs",
        description: "Simple JSON objects are used to represent all data.",
        icon: "bx:bx-code-alt",
    },
    {
        name: "MIT Licensed",
        description:
            "Lysand is licensed under the MIT License, which allows you to use it for any purpose.",
        icon: "bx:bx-shield",
    },
    {
        name: "Built-in namespaced extensions",
        description:
            "Extensions for common use cases are built-in, such as custom emojis and reactions",
        icon: "bx:bx-extension",
    },
    {
        name: "Easy to implement",
        description:
            "Lysand is designed to be easy to implement in any language.",
        icon: "bx:bx-code-block",
    },
    {
        name: "Secure by default",
        description:
            "All requests are signed using advanced cryptographic algorithms.",
        icon: "bx:bx-shield-alt",
    },
    {
        name: "No Mastodon Situation",
        description:
            "Standardization is heavy and designed to break vendor lock-in.",
        icon: "bx:bx-code-curly",
    },
    {
        name: "In-Depth Security Docs",
        description:
            "Docs provide lots of information on how to program a secure server.",
        icon: "bx:bx-shield-x",
    },
    {
        name: "TypeScript Types",
        description: "TypeScript types are provided for all objects.",
        icon: "bx:bx-code",
    },
];
</script>