import { defineStore } from "pinia";

export const useTypingStore = defineStore("typing", {
  state: () => ({
    wpm: 0,
  }),
  actions: {
    setWpm(new_wpm: number) {
      this.wpm = new_wpm;
    },
    cleanWpm() {
      this.wpm = 0;
    },
  },
});
