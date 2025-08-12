import type { CellState } from "~/types";

export function getCellStates(answer: string, word: string) {
  const answerLetters: (string | null)[] = answer.split("");
  const wordLetters: (string | null)[] = word.split("");
  const cellStates: CellState[] = [
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
  ];
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
