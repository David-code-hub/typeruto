<template>
  <div>
    <div>
      <div class="flex justify-between mb-7 items-center">
        <div>wpd:60 accuracy: 89%</div>
        <div>
          <button
            @click="getNextQuote"
            class="duration-300 hover:bg-gray-100 py-1 px-2 rounded-lg flex gap-1 items-center"
          >
            <Icon name="simple-line-icons:reload" class="size-5" />
            Reload
          </button>
        </div>
      </div>
      <div v-if="loading" class="w-full">
        <div class="text-center">
          <Icon name="svg-spinners:180-ring-with-bg" class="size-6" />
          <p>Fetching quote...</p>
        </div>
      </div>

      <div class="font-mono text-3xl break-words" v-else>
        <span
          class="text-gray-400"
          v-for="(letter, index) in quote"
          :key="letter + index"
          :id="letter + index"
        >
          {{ letter }}
        </span>
      </div>
    </div>
  </div>
  <div class="w-[3px] bg-black h-7 animate-pulse"></div>
</template>

<script setup lang="ts">
const quote = ref("");
const loading = ref(false);
const index = ref(0);

function checkTyping(event: KeyboardEvent) {
  const splitQuoteByIndex = quote.value[index.value];
  const spanElement = document.getElementById(splitQuoteByIndex + index.value);

  if (splitQuoteByIndex === "_" ? " " : splitQuoteByIndex === event.key) {
    spanElement?.classList.remove("text-red-700");
    spanElement?.classList.add("text-green-700");
    index.value += 1;
  } else {
    spanElement?.classList.remove("text-green-700");
    spanElement?.classList.add("text-red-700");
  }
}

async function getNextQuote() {
  try {
    loading.value = true;
    const response = await fetch("https://dummyjson.com/quotes/random");
    quote.value = (await response.json()).quote.replace(/ /g, "_").split("");
  } catch (error) {
    console.error("Error while fetching quote :", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  window.addEventListener("keydown", checkTyping);
  getNextQuote();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", checkTyping);
});
</script>
