import type { CellState } from "~/types";

export function getCellStates(answer: string, word: string) {
  const answerLetters: (string | null)[] = answer.split("");
  const wordLetters: (string | null)[] = word.split("");
  const cellStates: CellState[] = ["gray", "gray", "gray", "gray", "gray"];
  if (answer.length !== 5 || word.length !== 5) return cellStates;
  for (let i = 0; i < 5; i++) {
    if (
      wordLetters[i] &&
      answerLetters[i] &&
      wordLetters[i] === answerLetters[i]
    ) {
      cellStates[i] = "green";
      answerLetters[i] = null;
      wordLetters[i] = null;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (cellStates[i] === "green") continue;
    if (wordLetters[i] && answerLetters.includes(wordLetters[i])) {
      cellStates[i] = "yellow";
      answerLetters[answerLetters.indexOf(wordLetters[i])] = null;
      wordLetters[i] = null;
    }
  }
  return cellStates;
}

export function satisfyGuess(
  word: string,
  guess: string,
  cellStates: CellState[],
) {
  if (word.length !== 5 || guess.length !== 5) return false;

  let wordLetters: (string | null)[] = word.split("");
  let guessLetters: (string | null)[] = guess.split("");

  if (
    wordLetters.some(
      (letter, index) =>
        cellStates[index] === "green" &&
        letter &&
        guessLetters[index] &&
        letter !== guessLetters[index],
    )
  )
    return false;
  wordLetters = wordLetters.map((letter, index) =>
    cellStates[index] === "green" ? null : letter,
  );
  guessLetters = guessLetters.map((letter, index) =>
    cellStates[index] === "green" ? null : letter,
  );

  // Now all remaining cellStates with non-null letters should be yellow

  // Word should not contain gray letters
  if (
    wordLetters.some((letter) =>
      guessLetters.some(
        (guessLetter, index) =>
          guessLetter &&
          letter &&
          guessLetter === letter &&
          cellStates[index] === "gray",
      ),
    )
  )
    return false;

  // Word should not match yellow letters
  if (
    wordLetters.some(
      (letter, index) =>
        cellStates[index] === "yellow" &&
        letter &&
        guessLetters[index] &&
        letter === guessLetters[index],
    )
  )
    return false;

  // For each yellow letter, the count should be the same
  for (let i = 0; i < 5; i++) {
    if (cellStates[i] === "yellow") {
      const letter = guessLetters[i];
      if (
        letter &&
        guessLetters.filter((l) => l === letter).length !==
          wordLetters.filter((l) => l === letter).length
      )
        return false;
    }
  }

  // That should be it right?
  return true;
}
