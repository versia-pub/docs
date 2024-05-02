<template>
    <div class="mt-20">
        <div class="max-w-3xl">
            <h1>Thank you!</h1>
            <p>
                The Lysand project is made possible by the hard work of our contributors. Here are some of the people
                who
                have helped make Lysand what it is today.
            </p>
        </div>
        <ul role="list"
            class="!mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 !list-none !pl-0">
            <li v-for="person in people" :key="person.name"
                class="bg-[var(--vp-c-bg-soft)] shadow rounded duration-200 !m-0 hover:ring-2 hover:scale-[101%] ring-[var(--vp-color-primary)] p-4">
                <img class="aspect-[3/2] w-full rounded object-cover ring-1 ring-white/5" :src="person.imageUrl"
                    :alt="`${person.name}'s avatar'`" />
                <h3 class="mt-6">{{ person.name }}</h3>
                <p class="!mt-3">
                    <span v-for="role in person.roles"
                        class="text-sm mr-2 last:mr-0 rounded bg-pink-700 text-pink-100 px-2 py-1">{{
                role }}</span>
                </p>
                <ul role="list" class="!mt-6 !flex !gap-6 !list-none !pl-0 flex-wrap">
                    <li v-for="social in person.socials" :key="social.name" class="!m-0">
                        <a :href="social.url" class="text-[var(--vp-color-primary)]" target="_blank" rel="noreferrer">
                            <iconify-icon :icon="social.icon" class="text-2xl" />
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
const people = [
    {
        name: "CPlusPatch",
        roles: ["Lead Developer", "UI Designer"],
        imageUrl: "https://avatars.githubusercontent.com/u/42910258?v=4",
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
                name: "Lysand",
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
        ],
    },
    {
        name: "April",
        roles: ["ActivityPub Bridge Developer"],
        imageUrl: "https://avatars.githubusercontent.com/u/30842467?v=4",
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
                name: "Lysand",
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
        ],
    },
];
</script>
