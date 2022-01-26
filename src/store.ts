import words from "./data/5-letter-words.json";
import { createStore } from "solid-js/store";

export type LetterResult = "none" | "correct" | "elsewhere" | "unknown";

export interface Letter {
  value: string | null;
  result: LetterResult;
}

interface State {
  answer: string;
  guesses: string[];
  input: string[];
  length: number;
  gameState: "in-progress" | "won" | "lost";
}

export function createGameStore(answer: string) {
  const [store, setStore] = createStore<State>({
    answer,
    guesses: [],
    input: [],
    get length() {
      return this.answer?.length || 0;
    },
    get gameState() {
      if (this.guesses.includes(this.answer)) {
        return "won";
      }
      if (this.guesses.length >= 6) {
        return "lost";
      }
      return "in-progress";
    },
  });
  return [store, setStore] as const;
}

export type Store = ReturnType<typeof createGameStore>[0];
export type SetStore = ReturnType<typeof createGameStore>[0];

export function getAnswer() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

export function getResults(answer: null | string, guess: string): Letter[] {
  return guess.split("").map((v, i) => ({
    value: v,
    result:
      answer === null
        ? "unknown"
        : guess[i] === answer[i]
        ? "correct"
        : answer.includes(guess[i])
        ? "elsewhere"
        : "none",
  }));
}
