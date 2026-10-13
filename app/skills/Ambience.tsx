import type { CSSProperties } from "react";
import { PixelSprite } from "../components/PixelSprite";
import { BAT_A, BAT_B, SPIDER, makeEmbers } from "./art";

const EMBERS = makeEmbers(14);

// Viewport-tall sticky layer of rising embers. Takes no space in the flow.
export function Embers() {
  return (
    <div className="ember-layer" aria-hidden="true">
      {EMBERS.map((ember, i) => (
        <span
          key={i}
          className={`ember${ember.hot ? " ember-hot" : ""}`}
          style={
            {
              "--x": `${ember.x}%`,
              "--y": `${ember.y}%`,
              "--s": `${ember.size}px`,
              "--dx": `${ember.dx}px`,
              "--d": `${ember.duration}s`,
              "--dl": `${ember.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

// A bat patrols a lane above the title, clear of all text.
export function Bat() {
  return (
    <div className="bat-lane" aria-hidden="true">
      <div className="bat">
        <div className="bat-bob">
          <PixelSprite sprite={BAT_A} scale={5} className="bat-a" />
          <PixelSprite sprite={BAT_B} scale={5} className="bat-b" />
        </div>
      </div>
    </div>
  );
}

export function Spider() {
  return (
    <div className="spider" aria-hidden="true">
      <span className="spider-thread" />
      <PixelSprite sprite={SPIDER} scale={4} />
    </div>
  );
}
