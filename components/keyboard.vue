<template>
  <div>
    <div>
      <div class="font-mono text-2xl">
        <span
          v-for="(letter, index) in quote.split('')"
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
const quote = "One day at a time";
const index = ref(0);

function checkTyping(event: KeyboardEvent) {
  const splitQuoteByIndex = quote.split("")[index.value];
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

onMounted(() => {
  window.addEventListener("keydown", checkTyping);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", checkTyping);
});
</script>
