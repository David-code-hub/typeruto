const fetchQuoteURL = "https://dummyjson.com/quotes/random";

export const setInitialCursor = (currentLetterID: string) => {
  console.log("setinitialcursor():", currentLetterID);
  const cursor = document.getElementById("typing-cursor");
  const letter = document.getElementById(currentLetterID);

  if (cursor && letter) {
    letter.insertBefore(cursor, letter.firstChild);
  } else console.error("Cursor or letter element not found :", cursor, letter);
};

export async function getNextQuote() {
  try {
    const response = await fetch(fetchQuoteURL);
    const data = await response.json();
    const letterID = data.quote[0] + 0;

    // wait for dom to load elments needed for cursor
    setTimeout(() => {
      console.log("current letter id", letterID);
      setInitialCursor(letterID);
    }, 3000);
    return data.quote;
  } catch (error) {
    console.error("Error while fetching quote :", error);
  }
}
