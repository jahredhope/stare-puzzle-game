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
