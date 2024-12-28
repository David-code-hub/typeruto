//import lower level data
export {
  narutoQuotes,
  invalidKeys,
  letterClasses,
  ninjaSpeedRanks,
} from "./data";

import { ninjaSpeedRanks } from "./data";

let cursor: HTMLElement;

export const createCursorElement = () => {
  cursor = document.createElement("div");
  cursor.setAttribute("id", "typing-cursor");
  cursor.setAttribute(
    "class",
    "rounded-full w-[4px] absolute bg-orange-400 h-9 animate-flicker"
  );
};

export const setInitialCursor = (currentLetterID: string) => {
  setTimeout(() => {
    const letter = document.getElementById(currentLetterID);

    if (letter) {
      letter.insertBefore(cursor, letter.firstChild);
    } else console.error("Letter element not found :", letter);
  }, 100);
};

export const getRank = async (speed: number) => {
  if (ninjaSpeedRanks?.length) {
    const currentRank =
      speed >= 151
        ? ninjaSpeedRanks[6] //highest rank
        : ninjaSpeedRanks?.filter((rank: currentRank) => {
            const [min, max] = rank.speed.split("-");
            if (speed >= parseInt(min) && speed <= parseInt(max)) {
              return rank;
            }
          })[0];

    const currentNinja = getRankNinja(currentRank);
    return {
      rank: currentRank,
      ninja: currentNinja,
    };
  }
};

export const getRankNinja = (currentRank: currentRank) => {
  return currentRank.ninjas[Math.floor(Math.random() * 3)];
};
