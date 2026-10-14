"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

type Key = "up" | "down" | "left" | "right" | "a" | "b" | "select" | "start";

const KEY_MAP = new Map<string, Key>([
  ["ArrowUp", "up"],
  ["ArrowDown", "down"],
  ["ArrowLeft", "left"],
  ["ArrowRight", "right"],
  ["x", "a"],
  ["z", "b"],
]);

const MIN_PRESS_MS = 140;
const SPEAKER_SLOTS = Array.from({ length: 6 }, (_, i) => i);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
  );
}

/**
 * Decorative handheld controls. They animate when pressed with a pointer or
 * with the arrow keys / X / Z, and report the held key to the console via
 * `data-press` so the LCD scene can react. Purely visual: hidden from assistive
 * tech and never calls preventDefault, so normal keyboard use is untouched.
 */
export function ConsoleControls() {
  const [pressed, setPressed] = useState<Key | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const downAt = useRef(0);

  const press = useCallback((key: Key) => {
    clearTimeout(timer.current);
    downAt.current = Date.now();
    setPressed(key);
  }, []);

  const release = useCallback(() => {
    const wait = Math.max(0, MIN_PRESS_MS - (Date.now() - downAt.current));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPressed(null), wait);
  }, []);

  useEffect(() => {
    const consoleEl = rootRef.current?.closest(".gb-console");
    if (!consoleEl) return;
    if (pressed) consoleEl.setAttribute("data-press", pressed);
    else consoleEl.removeAttribute("data-press");
  }, [pressed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey)
        return;
      if (isTypingTarget(event.target)) return;
      const key =
        KEY_MAP.get(event.key) ?? KEY_MAP.get(event.key.toLowerCase());
      if (key) press(key);
    };
    const onKeyUp = () => release();
    const onPointerEnd = () => release();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      clearTimeout(timer.current);
    };
  }, [press, release]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-key]",
    );
    if (target) press(target.dataset.key as Key);
  };

  const down = (key: Key) => (pressed === key ? "true" : undefined);

  return (
    <div
      ref={rootRef}
      className="gb-controls"
      aria-hidden
      onPointerDown={handlePointerDown}
    >
      <div className="gb-dpad" data-key="right" data-dir={pressed ?? undefined}>
        <span className="gb-dpad-h" data-key="left" />
        <span className="gb-dpad-v" data-key="up" />
        <span className="gb-dpad-dot" data-key="down" />
      </div>

      <div className="gb-pills">
        <span
          className="gb-pill"
          data-key="select"
          data-down={down("select")}
        />
        <span className="gb-pill" data-key="start" data-down={down("start")} />
      </div>

      <div className="gb-ab">
        <span className="gb-btn gb-btn-b" data-key="b" data-down={down("b")}>
          B
        </span>
        <span className="gb-btn gb-btn-a" data-key="a" data-down={down("a")}>
          A
        </span>
      </div>

      <div className="gb-speaker">
        {SPEAKER_SLOTS.map((i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
