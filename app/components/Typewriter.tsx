"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;

export function Typewriter({ words }: { words: readonly string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const doneTyping = !deleting && text === word;
    const doneDeleting = deleting && text === "";

    const delay = doneTyping ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS;
    const timer = setTimeout(() => {
      if (doneTyping) setDeleting(true);
      else if (doneDeleting) {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      } else {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1),
        );
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);

  return (
    <span aria-label={words.join(", ")}>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="caret" />
    </span>
  );
}
