"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { PixelSprite } from "../components/PixelSprite";
import { COIN } from "../components/sprites";
import { ARROW_DOWN } from "./art";
import { MergedSprite } from "./MergedSprite";

const MAX_CREDITS = 99;
// Only real actions drop a coin: anything marked data-coin, or a button inside one.
const COIN_TRIGGER = "a[data-coin], [data-coin] button";
// The copy result arrives asynchronously in the status region, so poll it briefly.
const COPY_POLL_MS = 90;
const COPY_POLL_TRIES = 8;
const TONES = ["pink", "cyan", "amber", "violet"] as const;

type Piece = {
  dx: number;
  dy: number;
  tone: (typeof TONES)[number];
  big: boolean;
};
type Burst = { id: number; x: number; y: number };

// Confetti flies out in a ring, wide and narrow alternating, tilted upward.
const PIECES: readonly Piece[] = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const reach = i % 2 === 0 ? 112 : 68;
  return {
    dx: Math.round(Math.cos(angle) * reach),
    dy: Math.round(Math.sin(angle) * reach * 0.75 - 28),
    tone: TONES[i % TONES.length],
    big: i % 3 === 0,
  };
});

/** Cabinet body: server-rendered children plus a coin slot that reacts to the main actions. */
export function CoinCabinet({ children }: { children: ReactNode }) {
  const [drops, setDrops] = useState(0);
  const [burst, setBurst] = useState<Burst | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const burstCount = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const celebrateWhenCopied = (
    status: Element | null | undefined,
    x: number,
    y: number,
  ) => {
    window.clearTimeout(timer.current);
    let tries = 0;
    const poll = () => {
      if (status?.textContent?.includes("copied")) {
        burstCount.current += 1;
        setBurst({ id: burstCount.current, x, y });
      } else if (++tries < COPY_POLL_TRIES) {
        timer.current = window.setTimeout(poll, COPY_POLL_MS);
      }
    };
    timer.current = window.setTimeout(poll, COPY_POLL_MS);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const trigger = target.closest(COIN_TRIGGER);
    if (!trigger) return;
    setDrops((count) => count + 1);

    if (trigger instanceof HTMLButtonElement) {
      const body = event.currentTarget.getBoundingClientRect();
      const box = trigger.getBoundingClientRect();
      celebrateWhenCopied(
        trigger.closest("[data-coin]")?.querySelector('[role="status"]'),
        box.left + box.width / 2 - body.left,
        box.top + box.height / 2 - body.top,
      );
    }
  };

  return (
    // The click handler only observes clicks bubbling up from real links and buttons.
    <div className="cab-body" onClick={handleClick}>
      {children}
      <div className="cab-bay" aria-hidden>
        <span className="cab-bay-label blink-arrow">Insert coin</span>
        <div className="cab-hole">
          <MergedSprite sprite={ARROW_DOWN} scale={3} className="cab-arrow" />
          {drops > 0 && (
            <span key={drops} className="cab-fall">
              <PixelSprite sprite={COIN} scale={3} />
            </span>
          )}
          <span className="cab-plate">
            <span className="cab-slit" />
            {drops > 0 && <span key={drops} className="cab-glow" />}
          </span>
        </div>
        <span className="cab-bay-label">
          Credit{" "}
          <span key={drops} className="cab-credit">
            {String(Math.min(drops, MAX_CREDITS)).padStart(2, "0")}
          </span>
        </span>
      </div>
      {burst && (
        <div
          key={burst.id}
          className="cab-burst"
          aria-hidden
          style={{ left: burst.x, top: burst.y }}
        >
          {PIECES.map((piece, i) => (
            <span
              key={i}
              className={`conf conf-${piece.tone}${piece.big ? " conf-big" : ""}`}
              style={
                {
                  "--dx": `${piece.dx}px`,
                  "--dy": `${piece.dy}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
