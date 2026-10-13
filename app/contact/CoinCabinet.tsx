"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { PixelSprite } from "../components/PixelSprite";
import { COIN } from "../components/sprites";

const MAX_CREDITS = 99;
// Only real actions drop a coin: anything marked data-coin, or a button inside one.
const COIN_TRIGGER = "a[data-coin], [data-coin] button";

/** Cabinet body: server-rendered children plus a coin slot that reacts to the main actions. */
export function CoinCabinet({ children }: { children: ReactNode }) {
  const [drops, setDrops] = useState(0);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (target instanceof Element && target.closest(COIN_TRIGGER)) {
      setDrops((count) => count + 1);
    }
  };

  return (
    // The click handler only observes clicks bubbling up from real links and buttons.
    <div className="cab-body" onClick={handleClick}>
      {children}
      <div className="cab-bay" aria-hidden>
        <span className="cab-bay-label blink-arrow">Insert coin</span>
        <div className="cab-hole">
          {drops > 0 && (
            <span key={drops} className="cab-fall">
              <PixelSprite sprite={COIN} scale={3} />
            </span>
          )}
          <span className="cab-plate">
            <span className="cab-slit" />
          </span>
        </div>
        <span className="cab-bay-label">
          Credit {String(Math.min(drops, MAX_CREDITS)).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
