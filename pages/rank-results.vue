<template>
  <div class="mt-16 max-w-sm">
    <div
      class="grid grid-cols-3 gap-4 items-center bg-neutral-800 p-7 rounded-xl"
    >
      <div class="col-span-3 flex flex-row gap-3 items-center">
        <div class="" v-if="currentRank">
          <div class="overflow-hidden w-fit rounded-lg group">
            <img
              :src="`/images/characters/rank/${rankNinjaImage}.gif`"
              class="h-24 w-24 object-cover rounded-lg duration-300 group-hover:scale-125"
              :alt="`${currentRank.ninja} avatar`"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1 text-sm">
          <p class="font-semibold text-gray-300 text-lg">
            {{ currentRank.ninja }}
          </p>
          <p class="text-gray-400">
            <span> Rank : </span>
            <span class="font-semibold"> {{ currentRank.rank.rank }} </span>
          </p>
          <p class="text-gray-400">
            <span> WPM : </span>
            <span class="font-semibold"> {{ wpm }} </span>
          </p>
        </div>
      </div>
      <div class="col-span-3">
        <p class="text-gray-400 text-sm">
          {{ currentRank.rank.description }}
        </p>
      </div>
    </div>
    <p
      class="text-gray-400 text-md mt-12 flex items-center gap-2 justify-center"
    >
      Press
      <span
        class="border border-gray-400 bg-slate-800 rounded-lg px-2 py-1 text-sm font-mono w-fit flex items-center"
      >
        Enter
      </span>
      to go back.
    </p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const currentRank = ref({ rank: Object, ninja: String } as Object);
const rankNinjaImage = ref("");
const wpm = router?.currentRoute?.value?.query?.wpm;

onMounted(async () => {
  currentRank.value = await getRank(wpm);
  rankNinjaImage.value =
    currentRank.value?.ninja?.split(" ")?.length || 0 > 1
      ? currentRank.value?.ninja?.split(" ")[0].toLowerCase()
      : currentRank.value?.ninja?.toLowerCase();
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") router.push("/");
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", () => {});
});
</script>

<style lang="scss" scoped></style>
