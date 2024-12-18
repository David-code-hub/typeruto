<template>
  <div class="w-full">
    <div>
      <div class="flex justify-between mb-7 items-center">
        <div class="flex gap-3 items-center text-md">
          <div class="flex items-center gap-2">
            <Icon name="simple-line-icons:speedometer" class="size-5" />
            Speed:

            <span class="text-black font-semibold"> 60wpm </span>
          </div>
          <div>
            Accuracy:
            <span class="text-green-600 font-semibold"> 89%</span>
          </div>
          <div>
            Mistakes:
            <span class="text-red-600 font-semibold"> {{ mistakes }}</span>
          </div>
        </div>
        <div class="flex gap-1 items-center rounded-lg pl-2 py-0">
          <div class="mr-2 flex items-center gap-1">
            <Icon name="simple-line-icons:clock" class="size-5" />Time
          </div>
          <button
            class="p-1 rounded-lg hover:bg-gray-100 bg-gray-100 font-bold"
          >
            30s
          </button>
          <button class="p-1 rounded-lg hover:bg-gray-100">60s</button>
        </div>
        <div class="flex gap-3">
          <button
            @click="
              isUppercase = !isUppercase;
              changeTextCase();
            "
            class="text-sm duration-300 px-2 py-1 rounded-lg flex gap-1 items-center"
            :class="{ 'font-bold bg-gray-100': isUppercase }"
          >
            <span class="font-bold font-mono text-lg">A</span>
            Uppercase
          </button>

          <button
            @click="handleGetNextQuote"
            class="text-sm duration-300 hover:bg-gray-100 px-2 py-1 rounded-lg flex gap-1 items-center"
          >
            <Icon name="simple-line-icons:reload" class="size-6" />
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

      <div
        class="font-mono flex flex-row text-4xl break-words overflow-hidden flex-wrap"
        v-else
      >
        <span
          class="text-gray-400 flex"
          v-for="(letter, index) in quote"
          :key="letter + index"
          :id="letter + index"
        >
          {{ letter === " " ? "_" : letter }}
        </span>
      </div>
    </div>
  </div>
  <div
    id="typing-cursor"
    class="rounded-full w-[4px] bg-black h-9 animate-flicker"
  ></div>
</template>

<script setup lang="ts">
const quote = ref(Array<string>());
const rawQuote = ref(Array<string>());
const loading = ref(true);
const index = ref(0);
const mistakes = ref(0);
const isUppercase = ref(true);
const currentLetterID = computed(() => quote.value[index.value] + index.value);

const changeTextCase = () => {
  quote.value = isUppercase.value
    ? rawQuote.value
    : quote.value.map((letter: string) => letter.toLowerCase());
};

function checkTyping(event: KeyboardEvent) {
  const splitQuoteByIndex = quote.value[index.value];
  const spanElement = document.getElementById(currentLetterID.value);

  if (event.code === "Backspace") {
    index.value = index.value === 0 ? index.value : (index.value -= 1);
    const spanElement = document.getElementById(currentLetterID.value);
    spanElement?.classList.remove("text-black", "text-red-700");
    spanElement?.classList.add("text-gray-400");
    setInitialCursor(currentLetterID.value);
  } else if (splitQuoteByIndex === event.key) {
    spanElement?.classList.remove("text-red-700", "text-gray-400");
    spanElement?.classList.add("text-black");
    index.value += 1;
    setInitialCursor(currentLetterID.value);
  } else {
    spanElement?.classList.remove("text-black");
    spanElement?.classList.add("text-red-700");
    mistakes.value += 1;
  }
}

async function handleGetNextQuote() {
  index.value = 0;
  mistakes.value = 0;

  loading.value = true;
  console.log("next quote current letter :", currentLetterID.value);
  rawQuote.value = await getNextQuote();
  changeTextCase();
  loading.value = false;
  console.log("qoute after next quote :", quote.value);
}

onMounted(() => {
  window.addEventListener("keydown", checkTyping);
  handleGetNextQuote();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", checkTyping);
});
</script>
