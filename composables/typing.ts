const fetchQuoteURL = "https://dummyjson.com/quotes/random";
let cursor: HTMLElement;

export const createCursorElement = () => {
  cursor = document.createElement("div");
  cursor.setAttribute("id", "typing-cursor");
  cursor.setAttribute(
    "class",
    "rounded-full w-[4px] bg-black h-9 animate-flicker"
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

export const getNextQuote = async (isUppercase: boolean) => {
  try {
    const response = await fetch(fetchQuoteURL);
    const data = await response.json();
    console.log("quote", data.quote);
    const letterID =
      (isUppercase ? data.quote[0] : data.quote[0].toLowerCase()) + 0;

    setInitialCursor(letterID);
    return data.quote;
  } catch (error) {
    console.error("Error while fetching quote :", error);
  }
};
