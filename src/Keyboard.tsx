import { Component, createEffect, createSignal } from "solid-js";
import { getResults, LetterResult, Store } from "./store";

const layout = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  "BzxcvbnmE".split(""),
];

export const Keyboard: Component<{
  onPress: any;
  onEnter: any;
  onBack: any;
  store: Store;
}> = (props) => {
  const [value, setValue] = createSignal({});
  createEffect(() => {
    const knownValues: Record<string, LetterResult> = {};
    props.store.guesses.forEach((guess) =>
      getResults(props.store.answer, guess).forEach((res) => {
        if (res.result === "unknown") {
          return;
        }
        if (knownValues[res.value] === "correct") {
          return;
        }
        knownValues[res.value] = res.result;
      })
    );
    setValue(knownValues);
  });

  return (
    <div class="keyboard">
      {layout.map((r) => (
        <div class="keyboard-row">
          {r.map((k) =>
            k === "E" ? (
              <div class="keyboard-enter" onClick={props.onEnter}>
                Enter
              </div>
            ) : k === "B" ? (
              <div class="keyboard-back" onClick={props.onBack}>
                Back
              </div>
            ) : (
              <div
                class={`keyboard-key ${value()[k] || "unknown"}`}
                onClick={() => props.onPress(k)}
              >
                {k.toUpperCase()}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};
