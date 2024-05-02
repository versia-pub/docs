<script setup lang="ts">
const currentNews = {
    id: "lysand3",
    title: "Lysand 3.0",
    description: "Lysand 3.0 is now available!",
};
</script>
<template>
    <div
        class="fixed inset-x-0 top-0 flex items-center h-10 gap-x-6 overflow-hidden bg-black px-4 py-2.5 sm:px-3.5 sm:before:flex-1 z-50">
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
            <p class="text-sm text-gray-50">
                <strong class="font-semibold">{{
                    currentNews.title
                }}</strong>&nbsp;•&nbsp;{{ currentNews.description }}
            </p>
        </div>
    </div>
</template>