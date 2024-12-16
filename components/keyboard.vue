<template>
  <div>
    <div>
      <div v-if="loading" class="w-full">
        <div class="text-center">
          <Icon name="svg-spinners:180-ring-with-bg" class="size-6" />
          <p>Fetching quote...</p>
        </div>
      </div>
      <div class="font-mono text-2xl" v-else>
        <span
          v-for="(letter, index) in quote.replace(' ', '_').split('')"
          :key="letter + index"
          :id="letter + index"
        >
          {{ letter }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const quote = ref("");
const loading = ref(false);
const index = ref(0);

function checkTyping(event: KeyboardEvent) {
  const splitQuoteByIndex = quote.value.split("")[index.value];
  const spanElement = document.getElementById(splitQuoteByIndex + index.value);

  if (splitQuoteByIndex === event.key) {
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
    quote.value = (await response.json()).quote;
    console.log("quote response :", quote.value);
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
