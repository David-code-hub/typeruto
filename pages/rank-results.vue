<template>
  <div class="mt-16 max-w-sm">
    <div
      class="grid grid-cols-3 gap-4 items-center bg-neutral-800 p-7 rounded-xl"
    >
      <div v-if="loading" class="w-full col-span-3">
        <div class="text-center text-gray-400">
          <Icon
            name="svg-spinners:180-ring-with-bg"
            class="size-6 text-orange-400"
          />
          <p>Calculating rank...</p>
        </div>
      </div>
      <div class="col-span-3 flex flex-row gap-3 items-center" v-if="!loading">
        <div class="">
          <div class="overflow-hidden w-fit rounded-lg group">
            <img
              :src="`/images/characters/${rankNinjaImage}.jpg`"
              class="h-24 w-24 object-cover rounded-lg duration-300 group-hover:scale-125"
              :alt="`${userCurrentRank?.ninja} avatar`"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1 text-sm">
          <p class="font-semibold text-gray-300 text-lg">
            {{ userCurrentRank?.ninja }}
          </p>
          <p class="text-gray-400">
            <span> Rank : </span>
            <span class="font-semibold">
              {{ userCurrentRank?.rank?.rank }}
            </span>
          </p>
          <p class="text-gray-400">
            <span> WPM : </span>
            <span class="font-semibold"> {{ wpm }} </span>
          </p>
        </div>
      </div>
      <div class="col-span-3" v-if="!loading">
        <p class="text-gray-400 text-sm">
          {{ userCurrentRank?.rank?.description }}
        </p>
      </div>
      <div class="col-span-3" v-if="!loading">
        <button
          class="text-sm duration-300 focus:outline-none focus:ring-1 focus:ring-orange-400 disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 bg-slate-800 text-gray-400 px-3 py-2 rounded-lg flex gap-1 items-center"
        >
          <Icon name="simple-line-icons:camera" class="size-4" />
          Take Screenshot
        </button>
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
const typingStore = useTypingStore();
const router = useRouter();
const userCurrentRank = ref<showUserCurrentRank>();
const rankNinjaImage = ref<string | undefined>();
const loading = ref(true);
const wpm = typingStore.wpm;

onMounted(async () => {
  setTimeout(async () => {
    userCurrentRank.value = await getRank(wpm);
    loading.value = false;
    const splitImageName = userCurrentRank.value?.ninja.split(" ") || [
      "naruto",
    ];
    rankNinjaImage.value =
      splitImageName?.length || 0 > 1
        ? splitImageName[0].toLowerCase()
        : userCurrentRank.value?.ninja?.toLowerCase();
  }, 1000);
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") router.push("/");
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", () => {});
});
</script>
