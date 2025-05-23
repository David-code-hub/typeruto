<template>
  <div class="w-full" id="keyboard-root">
    <div class="w-full">
      <!--show actions bar-->
      <div class="flex justify-between items-center w-full mb-7">
        <div class="flex gap-5 items-center text-md w-fit blur-none">
          <span
            class="text-3xl rounded-lg font-bold text-orange-400"
            :class="[!isTyping ? 'opacity-50' : 'opacity-100']"
          >
            {{ timerSeconds }}s
          </span>
        </div>
        <div class="flex gap-3">
          <div
            class="flex bg-slate-800 uppercase gap-2 rounded-lg items-center py-2 px-3"
          >
          <div class="h-[10px] w-[10px] rounded-full" 
         :class="isCapsLock ? 'animate-pulse bg-orange-400' : 'bg-slate-700'" 
          ></div>
            <!-- <Icon
              :name="`simple-line-icons:lock${isCapsLock ? '' : '-open'}`"
              :class="[isCapsLock ? ' bg-orange-400' : 'bg-gray-200']"
            /> -->
            <div class="text-gray-400 text-sm">
              Caps
              <span>{{ isCapsLock ? "on" : "off" }} </span>
            </div>
          </div>
        </div>
      </div>

      <!--show loader-->
      <div v-if="loading" class="w-full">
        <div class="text-center text-gray-400">
          <Icon
            name="svg-spinners:180-ring-with-bg"
            class="size-6 text-orange-400"
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
        <!--show character details-->
        <div class="w-full flex mt-10 text-white gap-2 justify-end">
          <img
            :src="`/images/characters/min/${
              rawQuote?.character?.split(' ')?.length || 0 > 1
                ? rawQuote?.character.split(' ')[0].toLowerCase()
                : rawQuote?.character?.toLowerCase()
            }-min.jpg`"
            class="h-9 w-9 rounded-full object-cover border border-white"
            :alt="`${rawQuote?.character} avatar`"
          />
          <div class="text-gray-300 font-normal text-sm">
            <p class="text-gray-400 font-normal text-xs">Said By</p>
            {{ rawQuote?.character || "undefined" }}
          </div>
        </div>
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
      to get next quote.
    </p>
  </div>
</template>

<script setup lang="ts">
const typingStore = useTypingStore();
const router = useRouter();
const rawQuote = ref<narutoQuote>();
const quote = ref<Array<string>>(narutoQuotes[0].quote.split(""));
const wordsTyped = ref<string>("");
const wordCount = ref<number>(0);
const remainingTime = ref<number>(0);
const loading = ref(true);
const index = ref<number>(0);
const mistakes = ref<number>(0);
const wordsPerMinute = ref<number>(0);
const currentLetterID = computed(
  (): string => quote.value[index.value] + index.value
);
const timerSeconds = ref<number>(30);
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
    typingStore.setWpm(wordsPerMinute.value);
  }
};

const handleTimerCountdown = () => {
  intervalID.value = setInterval(() => {
    timerSeconds.value -= 1;
    if (timerSeconds.value === 0) {
      clearInterval(intervalID.value);

      if (wordCount.value !== 0) calculateWPM();
      handleGetNextQuote();
      router.push({
        path: "/rank-results",
        // query: { wpm: wordsPerMinute.value },
      });
      timerSeconds.value = 30;
      isTyping.value = false;
    }
  }, 1000);
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

  if (event.key === "Enter") {
    handleGetNextQuote();
    return;
  }

  if (invalidKeys.includes(event.key)) return;

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

    router.push({
      path: "/rank-results",
      // query: { wpm: wordsPerMinute.value },
    });
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

const handleGetNextQuote = () => {
  try {
    index.value = 0;
    loading.value = true;
    timerSeconds.value = 30;
    rawQuote.value = narutoQuotes[Math.floor(Math.random() * 49)];
    //convert to lowercase
    quote.value = rawQuote.value.quote.split("").map(letter => letter.toLowerCase())
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
