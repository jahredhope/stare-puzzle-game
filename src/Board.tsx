import { Component } from "solid-js";
import { getResults, Letter, Store } from "./store";

const Square: Component<Letter> = (props) => {
  return (
    <div class={`square ${props.value ? props.result : "empty"}`}>
      {props.value?.toUpperCase()}
    </div>
  );
};
const EmptySquare: Component = () => {
  return <Square value={null} result="unknown" />;
};
const Row: Component<{ row: Letter[] }> = (props) => {
  return (
    <div class="row">
      {props.row.map((v) => (
        <Square {...v} />
      ))}
    </div>
  );
};
const EmptyRow: Component = () => {
  return (
    <div class="row">
      {new Array(5).fill(null).map((v) => (
        <EmptySquare />
      ))}
    </div>
  );
};

function fill<T>(
  arr: T[] | Readonly<T[]>,
  length: number,
  value: T,
  _: number
): T[] {
  const res = [...arr];
  while (res.length < length) {
    res.push(value);
  }
  return res;
}

export const Board: Component<{ store: Store; shake: boolean }> = (props) => {
  return (
    <div class={`board ${props.shake ? "shake" : ""}`}>
      {props.store.guesses.map((g) => (
        <Row row={getResults(props.store.answer, g)} />
      ))}
      {props.store.gameState === "in-progress" && (
        <Row
          row={fill(
            props.store.input,
            props.store.length,
            null,
            props.store.input.length
          ).map((value) => ({
            value: value,
            result: "unknown",
          }))}
        />
      )}

      {props.store.gameState === "in-progress" && props.store.guesses.length < 5
        ? new Array(5 - props.store.guesses.length)
            .fill(new Array(5).fill(null))
            .map((r) => <EmptyRow />)
        : null}
    </div>
  );
};
