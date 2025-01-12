<template>
  <div class="bg-neutral-900 h-screen relative overflow-hidden">
    <div class="bg-orange-400 w-20 h-20 blur-[6em] absolute"></div>
    <div class="py-7 px-4 mb-0 w-full">
      <div class="max-w-screen-lg flex justify-between items-center mx-auto">
        <NuxtLink
          to="/"
          class="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-800 bg-clip-text text-transparent"
        >
          Typeruto
        </NuxtLink>
        <div class="flex flex-row items-center gap-1">
          <NuxtLink
            to="/rank-list"
            class="text-sm h-fit focus:outline-none focus:ring-1 focus:ring-orange-400 duration-300 hover:bg-neutral-800 px-3 py-1 rounded-full flex gap-1 items-center text-gray-200"
          >
            Rank List
          </NuxtLink>
          <a
            href="https://github.com/David-code-hub/typeruto"
            target="_blank"
            class="text-sm h-fit focus:outline-none focus:ring-1 focus:ring-orange-400 duration-300 hover:bg-neutral-800 px-3 py-1 rounded-full flex gap-1 items-center text-gray-200"
          >
            Github
          </a>
          <button
            class="text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 duration-300 hover:bg-neutral-800 p-2 rounded-full flex gap-1 items-center text-gray-200"
          >
            <Icon name="uil:sun" class="size-8" />
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-screen-lg px-4 flex flex-col items-center mx-auto">
      <NuxtPage></NuxtPage>
      <Attributions />
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
  title:
    "Typeruto - Improve Your Typing Skills Fast and rank up in the world of shinobi.",
  ogTitle:
    "Typeruto - Improve Your Typing Skills Fast and rank up in the world of shinobi.",
  description:
    "Typeruto - naruto,anime themed typing speed test. Find your rank based on your typing speed.",
  ogDescription:
    "Typeruto - naruto,anime themed typing speed test. Find your rank based on your typing speed.",
  googleSiteVerification: config.public.GOOGLE_SITE_VERIFICATION,
});
</script>
