export const invalidKeys = [
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "Tab",
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

let cursor: HTMLElement;

export const createCursorElement = () => {
  cursor = document.createElement("div");
  cursor.setAttribute("id", "typing-cursor");
  cursor.setAttribute(
    "class",
    "rounded-full w-[4px] bg-orange-400 h-9 animate-flicker"
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
