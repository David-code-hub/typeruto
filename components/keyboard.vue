<template>
  <div>
    <div>
      <div class="flex justify-between mb-7 items-center">
        <div class="flex gap-3 text-sm">
          <div>
            <Icon name="simple-line-icons:speedometer" class="size-4" />
            Speed:

            <span class="text-black font-semibold"> 60wpm </span>
          </div>
          <div>
            Accuracy:
            <span class="text-green-600 font-semibold"> 89%</span>
          </div>
        </div>
        <div>
          <button
            @click="getNextQuote"
            class="text-sm duration-300 hover:bg-gray-100 py-1 px-2 rounded-lg flex gap-1 items-center"
          >
            <Icon name="simple-line-icons:reload" class="size-4" />
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

      <div class="font-mono flex flex-row text-3xl break-words" v-else>
        <span
          class="text-gray-400 flex"
          v-for="(letter, index) in quote"
          :key="letter + index"
          :id="letter + index"
        >
          {{ letter }}
        </span>
      </div>
    </div>
  </div>
  <div
    id="typing-cursor"
    class="rounded-full w-[4px] mx-1 bg-black h-9 animate-pulse"
  ></div>
</template>

<script setup lang="ts">
const quote = ref("");
const loading = ref(false);
const index = ref(0);
const currentLetterID = computed(() => quote.value[index.value] + index.value);

function checkTyping(event: KeyboardEvent) {
  const splitQuoteByIndex = quote.value[index.value];
  const spanElement = document.getElementById(currentLetterID.value);

  if (splitQuoteByIndex === "_" ? " " : splitQuoteByIndex === event.key) {
    spanElement?.classList.remove("text-red-700", "text-gray-400");
    spanElement?.classList.add("text-black");
    index.value += 1;
    setInitialCursor();
  } else {
    spanElement?.classList.remove("text-black");
    spanElement?.classList.add("text-red-700");
  }
}

async function getNextQuote() {
  index.value = 0;
  try {
    loading.value = true;
    const response = await fetch("https://dummyjson.com/quotes/random");
    quote.value = (await response.json()).quote.replace(/ /g, "_").split("");

    // wait for dom to load elments needed for cursor
    setTimeout(() => {
      setInitialCursor();
    }, 100);
  } catch (error) {
    console.error("Error while fetching quote :", error);
  } finally {
    loading.value = false;
  }
}

function setInitialCursor() {
  const cursor = document.getElementById("typing-cursor");
  const letter = document.getElementById(currentLetterID.value);
  console.log("current letter on cursor :", currentLetterID.value);
  if (cursor && letter) {
    console.log("inside set cursor");
    letter.insertBefore(cursor, letter.firstChild);
  } else console.error("Cursor or letter element not found :", cursor, letter);
}

onMounted(() => {
  window.addEventListener("keydown", checkTyping);
  getNextQuote();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", checkTyping);
});
</script>
