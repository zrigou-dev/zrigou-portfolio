// Splitting helpers for the entrance animations. Text stays real text, so crawlers and screen readers are unaffected.

/** Words that rise out of a mask when their parent (marked data-words) scrolls into view. */
export function SplitWords({ text, start = 0 }) {
  return text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="w" style={{ "--wi": start + index }}>
        <span>{word}</span>
      </span>{" "}
    </span>
  ));
}

/** Letters of a Latin brand name that rise one after another on load. */
export function SplitChars({ text, start = 0 }) {
  return [...text].map((char, index) => (
    <span key={index} className="char" style={{ "--ci": start + index }} aria-hidden="true">
      {char}
    </span>
  ));
}
