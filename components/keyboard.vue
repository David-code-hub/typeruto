<template>
  <div class="w-full" id="keyboard-root">
    <div class="w-full">
      <!--show count down-->
      <div
        class="flex items-center justify-between rounded-lg w-full"
        :class="[
          isTyping ? 'duration-300 blur-none h-auto mb-7' : 'blur-3xl h-0',
        ]"
      >
        <span class="text-3xl rounded-lg font-bold text-green-300">
          {{ timerSeconds }}s
        </span>

        <div
          class="flex bg-slate-800 border border-slate-700 gap-2 rounded-lg items-center py-2 px-3"
        >
          <Icon
            :name="`simple-line-icons:lock${isCapsLock ? '' : '-open'}`"
            :class="[isCapsLock ? ' bg-green-300' : 'bg-gray-200']"
          />
          <div class="text-gray-400 text-sm">
            Caps
            <span class="capitalize">{{ isCapsLock ? "on" : "off" }} </span>
          </div>
        </div>
      </div>
      <!--show actions bar-->
      <div
        class="flex justify-between items-center w-full"
        :class="[
          !isTyping ? 'duration-300 blur-none h-auto mb-7' : 'blur-3xl h-0',
        ]"
      >
        <div class="flex gap-5 items-center text-md w-fit">
          <div class="flex items-center gap-1 text-gray-300">
            <span class="text-xl rounded-lg font-bold">
              {{ wordsPerMinute }}
              <span class="text-base text-gray-400 font-normal ml-1">Wpm</span>
            </span>
          </div>

          <!-- <div class="flex items-center gap-1 text-gray-300">
            <span class="text-xl font-semibold">
              0%
              <span class="text-base text-gray-400 font-normal ml-1"
                >Accuracy</span
              >
            </span>
          </div> -->

          <div class="flex items-center gap-1 text-gray-300">
            <span class="text-xl font-semibold">
              {{ mistakes }}

              <span class="text-base text-gray-400 font-normal ml-1"
                >Typo{{ mistakes > 1 || mistakes === 0 ? "s" : "" }}</span
              >
            </span>
          </div>
        </div>
        <div class="flex gap-3">
          <button
            @click="
              isUppercase = !isUppercase;
              changeTextCase();
            "
            class="text-sm duration-300 focus:outline-none focus:ring-1 focus:ring-green-300 active:bg-green-300 disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 bg-slate-800 text-gray-400 px-3 py-2 rounded-lg flex gap-1 items-center"
            :class="{ 'text-green-300': isUppercase }"
          >
            <Icon name="uil:font" class="size-4" />
            Uppercase
          </button>

          <button
            @click="handleGetNextQuote"
            :disabled="loading"
            class="text-sm duration-300 focus:outline-none focus:ring-1 focus:ring-green-300 active:bg-green-300 disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 bg-slate-800 text-gray-400 px-3 py-2 rounded-lg flex gap-1 items-center"
          >
            <Icon name="simple-line-icons:reload" class="size-4" />
            Reload
          </button>
        </div>
      </div>

      <!--show loader-->
      <div v-if="loading" class="w-full">
        <div class="text-center text-gray-400">
          <Icon
            name="svg-spinners:180-ring-with-bg"
            class="size-6 text-green-300"
          />
          <p>Fetching quote...</p>
        </div>
      </div>

      <!--show letters-->
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
const wordsTyped = ref("");
const wordCount = ref(0);
const remainingTime = ref(0);
const loading = ref(true);
const index = ref(0);
const mistakes = ref(0);
const wordsPerMinute = ref(0);
const isUppercase = ref(false);
const currentLetterID = computed(() => quote.value[index.value] + index.value);
const timerSeconds = ref(30);
const isTyping = ref(false);
const intervalID = ref<number | null | any>(null);
const isCapsLock = ref(false);

const calculateWPM = () => {
  const words = wordsTyped.value
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  wordCount.value = words.length;

  const elapsedTime = 30 - remainingTime.value;
  if (elapsedTime > 0) {
    wordsPerMinute.value = Math.floor((60 / elapsedTime) * wordCount.value);
  }
};

const handleTimerCountdown = () => {
  intervalID.value = setInterval(() => {
    timerSeconds.value -= 1;
    if (timerSeconds.value === 0) {
      clearInterval(intervalID.value);

      if (wordCount.value !== 0) calculateWPM();
      handleGetNextQuote();
      timerSeconds.value = 30;
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

const checkIsCapsLock = (event: KeyboardEvent) => {
  if (event.code === "CapsLock") {
    isCapsLock.value = event.getModifierState("CapsLock");
    return;
  }
};

const checkTyping = (event: KeyboardEvent) => {
  const splitQuoteByIndex = quote.value[index.value];
  const spanElement = document.getElementById(currentLetterID.value);
  if (event.code === "CapsLock") {
    isCapsLock.value = event.getModifierState("CapsLock");
    return;
  }

  if (
    quote.value[quote.value.length - 1] === event.key &&
    index.value === quote.value.length - 1
  ) {
    remainingTime.value = timerSeconds.value;
    isTyping.value = false;
    clearInterval(intervalID.value);
    calculateWPM();
    handleGetNextQuote();
    return;
  }

  if (event.code === "Backspace") {
    index.value = index.value === 0 ? index.value : (index.value -= 1);
    const spanElement = document.getElementById(currentLetterID.value);
    spanElement?.classList.remove(...letterClasses.isBackspace.remove);
    spanElement?.classList.add(...letterClasses.isBackspace.add);
    setInitialCursor(currentLetterID.value);
  } else if (splitQuoteByIndex === event.key) {
    // isCorrect
    // start counter user starts typing
    if (
      timerSeconds.value === 30 &&
      event.key === quote.value[0] &&
      index.value === 0
    ) {
      isTyping.value = true;
      mistakes.value = 0;
      wordsTyped.value = "";
      wordCount.value = 0;
      handleTimerCountdown();
    }
    spanElement?.classList.remove(...letterClasses.isCorrect.remove);
    spanElement?.classList.add(...letterClasses.isCorrect.add);
    index.value += 1;
    wordsTyped.value += event.key;
    setInitialCursor(currentLetterID.value);
  } else {
    // isInCorrect
    spanElement?.classList.remove(...letterClasses.isInCorrect.remove);
    spanElement?.classList.add(...letterClasses.isInCorrect.add);
    mistakes.value += 1;
    // index.value += 1;
    setInitialCursor(currentLetterID.value);
  }
};

const handleGetNextQuote = async () => {
  try {
    index.value = 0;
    loading.value = true;
    timerSeconds.value = 30;
    rawQuote.value = await getNextQuote(isUppercase.value);
    changeTextCase();
  } catch (error) {
    console.error("Error while fetching next quote :", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", checkTyping);
  window.addEventListener("keyup", checkIsCapsLock);
  createCursorElement();
  handleGetNextQuote();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", checkTyping);
  window.removeEventListener("keyup", checkIsCapsLock);
});
</script>
