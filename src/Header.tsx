import { Component, createSignal } from "solid-js";

const InfoIcon: Component<{ onClick: any }> = (props) => {
  return (
    <svg
      class="info-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      onClick={props.onClick}
    >
      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    </svg>
  );
};

const HelpPage: Component<{ hide: any }> = (props) => {
  return (
    <div class="help-page" onClick={props.hide}>
      <h2>Goal</h2>
      <p>The goal is to type the hidden word before you run out of guesses.</p>
      <p>Use the results from the previous guesses to guide you.</p>
      <p>
        If a letter is green, that means it's correct and in the right location.
      </p>
      <p>
        If a letter is yellow, that means it's correct and but in the wrong
        location.
      </p>
      <h2>Hint</h2>
      <p>
        Try starting with common vowels like "e" and "a", and common consonants
        like "s", "t" and "r".
      </p>
    </div>
  );
};

export const Header: Component = () => {
  const [showHelp, setShowHelp] = createSignal(false);
  return (
    <div class="header">
      <h1 class="heading">Stare</h1>
      <InfoIcon onClick={() => setShowHelp(!showHelp())} />
      {showHelp() ? <HelpPage hide={() => setShowHelp(false)} /> : null}
    </div>
  );
};
