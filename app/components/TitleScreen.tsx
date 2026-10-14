"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import "./title-screen.css";
import { PixelSprite } from "./PixelSprite";
import { AVATAR } from "./sprites";

const STORAGE_KEY = "web-porto:intro-seen";

// The overlay is hidden on the server and for returning visitors: it only
// opens on the first visit of a browser session.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage blocked: the overlay simply will not return in this tab.
  }
  listeners.forEach((listener) => listener());
}

export function TitleScreen({ name }: { name: string }) {
  const seen = useSyncExternalStore(subscribe, hasSeenIntro, () => true);
  const startRef = useRef<HTMLButtonElement>(null);
  const isOpen = !seen;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const page = document.querySelector("main");
    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    startRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") markIntroSeen();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="title-screen-name"
      className="title-screen theme-dusk"
    >
      <div aria-hidden className="title-stars" />
      <div aria-hidden className="title-rain" />
      <div className="title-body">
        <PixelSprite sprite={AVATAR} scale={6} className="title-avatar" />
        <p className="title-kicker">Portfolio</p>
        <h2 id="title-screen-name" className="title-name">
          {name}
        </h2>
        <button
          ref={startRef}
          type="button"
          onClick={markIntroSeen}
          className="pixel-btn pixel-btn-solid title-start"
        >
          Press start
        </button>
        <p className="title-hint">Or press Esc to skip</p>
      </div>
    </div>
  );
}
