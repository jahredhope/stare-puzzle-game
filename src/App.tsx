import { batch, Component } from "solid-js";
import allowedWords from "./data/5-letter-allowed-words.json";
import { Board } from "./Board";
import { Keyboard } from "./Keyboard";
import { createGameStore, getAnswer, Store } from "./store";
import { createPulse, getSuccessMessage } from "./utils";
import { Header } from "./Header";

function subscribeStoreToDocument(
  store: Store,
  { onRestart, onSubmit, onKey, onDelete }
) {
  document.addEventListener("keydown", (ev) => {
    const key = ev.key.toLowerCase();
    if (store.gameState !== "in-progress") {
      if (key === "enter") {
        onRestart();
        return;
      }
    }
    if (!store.answer) {
      return;
    }
    if (key === "enter") {
      onSubmit();
      return;
    }
    if (key === "backspace") {
      onDelete();
      return;
    }
    onKey(key);
  });
}

const App: Component = () => {
  const [getShake, startShake] = createPulse(500);
  const [store, setStore] = createGameStore(getAnswer());
  function onDelete() {
    setStore("input", (s) => s.slice(0, -1));
  }
  function onSubmit() {
    if (store.gameState !== "in-progress") {
      onRestart();
    }
    if (store.input.length !== store.length) {
      return;
    }
    const guess = store.input.join("");
    if (!allowedWords.includes(guess)) {
      startShake();
      return;
    }
    batch(() => {
      setStore("guesses", (v) => [...v, guess]);
      setStore("input", []);
    });
  }
  function onRestart() {
    setStore({
      answer: getAnswer(),
      input: [],
      guesses: [],
    });
  }
  function onKey(key: string) {
    if (store.input.length >= store.answer.length) {
      return;
    }
    if (!key.match(/^[a-z]$/)) {
      return;
    }
    setStore("input", (s) => [...s, key]);
  }
  subscribeStoreToDocument(store, { onDelete, onKey, onRestart, onSubmit });
  return (
    <div class="app">
      <Header />
      <Board store={store} shake={getShake()} />
      {store.gameState === "won" ? (
        <div>
          You won! <em>{getSuccessMessage(store.guesses.length)}</em> (
          {store.guesses.length} guesses)
        </div>
      ) : null}
      {store.gameState === "lost" ? (
        <div>
          You lost. <em>Better luck next time</em> (Answer: {store.answer})
        </div>
      ) : null}
      {store.gameState !== "in-progress" ? (
        <div>Press enter to restart.</div>
      ) : null}
      <Keyboard
        onPress={onKey}
        onBack={onDelete}
        onEnter={onSubmit}
        store={store}
      />
    </div>
  );
};

export default App;
