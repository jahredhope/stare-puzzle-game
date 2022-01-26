import { createSignal } from "solid-js";

/**
 * Stores a boolean that can be triggered on for a brief period of time
 * @param timeout Time in milliseconds to remain active
 */
export function createPulse(timeout: number) {
  const [get, set] = createSignal<boolean>(false);
  let timer = null;
  function pulse() {
    set(true);
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      timer = null;
      set(false);
    }, timeout);
  }
  return [get, pulse] as const;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const messages: Record<string, string[]> = {
  1: ["You must have cheated", "ummmm... okay, wow", "Lucky"],
  2: ["That was quick", "Only 2? Nice"],
  3: ["In in three? good job", "Straight to it, very impressive"],
  4: ["Very good guessing", "Better than most"],
  5: ["Good guessing", "Won with one to spare"],
  6: [
    "Just in the nick of time",
    "That was close",
    "You clutched victory from the jaws of defeat",
  ],
};
export function getSuccessMessage(guessCount: number) {
  return randomFromArray(messages[guessCount] || ["Good job"]);
}
