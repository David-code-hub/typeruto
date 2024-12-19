<template>
  <div class="w-full" id="keyboard-root">
    <div class="w-full">
      <div
        class="flex items-center rounded-lg w-fit"
        :class="[
          isTyping ? 'duration-300 blur-none h-auto mb-7' : 'blur-2xl h-0',
        ]"
      >
        <div class="mr-2 flex items-center">
          <Icon name="simple-line-icons:clock" class="size-7" />
        </div>
        <span class="text-3xl rounded-lg font-bold"> {{ timerSeconds }}s </span>
      </div>

      <div
        class="flex justify-between items-center w-full"
        :class="[
          !isTyping ? 'duration-300 blur-none h-auto mb-7' : 'blur-2xl h-0',
        ]"
      >
        <div class="flex gap-3 items-center text-md w-fit">
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
          class="text-gray-400 flex letter-span"
          v-for="(letter, index) in quote"
          :key="letter + index"
          :id="letter + index"
        >
          <span :class="{ 'opacity-0': letter === ' ' }">
            {{ letter === " " ? "_" : letter }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const quote = ref(Array<string>());
const rawQuote = ref("");
const loading = ref(true);
const index = ref(0);
const mistakes = ref(0);
const isUppercase = ref(false);
const currentLetterID = computed(() => quote.value[index.value] + index.value);
const timerSeconds = ref(30);
const isTyping = ref(false);
let intervalID: number | any = null;

const handleTimerCountdown = () => {
  intervalID = setInterval(() => {
    timerSeconds.value -= 1;
    if (timerSeconds.value === 0) {
      clearInterval(intervalID);
      isTyping.value = false;
    }
  }, 1000);
};

const changeTextCase = () => {
  quote.value = isUppercase.value
    ? rawQuote.value.split("")
    : rawQuote.value.toLowerCase().split("");

  resetLetters();
};

const resetLetters = () => {
  index.value = 0;

  // reset classes on all letters
  const allLetters = document.querySelectorAll(".letter-span");
  allLetters.forEach((element) => {
    element.classList.remove(...letterClasses.isBackspace.remove);
    element.classList.add(...letterClasses.isBackspace.add);
  });

  setInitialCursor(currentLetterID.value);
};

const checkTyping = (event: KeyboardEvent) => {
  const splitQuoteByIndex = quote.value[index.value];
  const spanElement = document.getElementById(currentLetterID.value);

  if (event.code === "CapsLock") return;

  if (event.code === "Backspace") {
    index.value = index.value === 0 ? index.value : (index.value -= 1);
    const spanElement = document.getElementById(currentLetterID.value);
    spanElement?.classList.remove(...letterClasses.isBackspace.remove);
    spanElement?.classList.add(...letterClasses.isBackspace.add);
    setInitialCursor(currentLetterID.value);
  } else if (splitQuoteByIndex === event.key) {
    // isCorrect
    // start counter user starts typing
    if (timerSeconds.value === 30) {
      isTyping.value = true;
      handleTimerCountdown();
    }
    spanElement?.classList.remove(...letterClasses.isCorrect.remove);
    spanElement?.classList.add(...letterClasses.isCorrect.add);
    index.value += 1;
    setInitialCursor(currentLetterID.value);
  } else {
    // isInCorrect
    spanElement?.classList.remove(...letterClasses.isInCorrect.remove);
    spanElement?.classList.add(...letterClasses.isInCorrect.add);
    mistakes.value += 1;
    index.value += 1;
    setInitialCursor(currentLetterID.value);
  }
};

const handleGetNextQuote = async () => {
  index.value = 0;
  mistakes.value = 0;
  loading.value = true;

  rawQuote.value = await getNextQuote(isUppercase.value);

  changeTextCase();

  loading.value = false;
};

onMounted(() => {
  window.addEventListener("keydown", checkTyping);
  createCursorElement();
  handleGetNextQuote();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", checkTyping);
});
</script>
