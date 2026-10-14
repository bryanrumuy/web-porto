import type { CSSProperties } from "react";
import { PixelSprite } from "../components/PixelSprite";
import { BAT_A, BAT_B, COBWEB, RUNES, SPIDER, makeEmbers } from "./art";

const EMBERS = makeEmbers(14);
const MOTES = makeEmbers(22, 31);

function particleStyle(
  p: ReturnType<typeof makeEmbers>[number],
  size: number,
): CSSProperties {
  return {
    "--x": `${p.x}%`,
    "--y": `${p.y}%`,
    "--s": `${size}px`,
    "--dx": `${p.dx}px`,
    "--d": `${p.duration}s`,
    "--dl": `${p.delay}s`,
  } as CSSProperties;
}

// Viewport-tall sticky layer of rising embers. Takes no space in the flow.
export function Embers() {
  return (
    <div className="ember-layer" aria-hidden="true">
      {EMBERS.map((ember, i) => (
        <span
          key={i}
          className={`ember${ember.hot ? " ember-hot" : ""}`}
          style={particleStyle(ember, ember.size)}
        />
      ))}
    </div>
  );
}

// Slow dust motes drifting through the torchlight, on their own sticky layer.
export function Motes() {
  return (
    <div className="ember-layer" aria-hidden="true">
      {MOTES.map((mote, i) => (
        <span
          key={i}
          className={`mote${mote.hot ? " mote-lit" : ""}`}
          style={particleStyle(mote, mote.size / 2)}
        />
      ))}
    </div>
  );
}

// Two bats patrol a lane above the title, clear of all text.
export function Bat() {
  return (
    <div className="bat-lane" aria-hidden="true">
      {(["", "bat-late"] as const).map((variant) => (
        <div key={variant} className={`bat ${variant}`}>
          <div className="bat-bob">
            <PixelSprite sprite={BAT_A} scale={5} className="bat-a" />
            <PixelSprite sprite={BAT_B} scale={5} className="bat-b" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Spider({ variant }: { variant?: "slow" }) {
  return (
    <div
      className={`spider${variant ? ` spider-${variant}` : ""}`}
      aria-hidden="true"
    >
      <span className="spider-thread" />
      <span className="spider-body">
        <PixelSprite sprite={SPIDER} scale={4} />
      </span>
    </div>
  );
}

const RUNE_SPOTS = [
  { top: "12%", left: "3%", rune: 0, color: "#4de1ff", delay: 0 },
  { top: "34%", left: "93%", rune: 1, color: "#b79bff", delay: -1.4 },
  { top: "52%", left: "2%", rune: 2, color: "#ffc447", delay: -2.6 },
  { top: "70%", left: "94%", rune: 0, color: "#4de1ff", delay: -0.8 },
  { top: "86%", left: "4%", rune: 1, color: "#b79bff", delay: -3.2 },
] as const;

// Glowing runes carved in the wall. The layer drifts slower than the page (parallax).
export function WallRunes() {
  return (
    <div className="wall-layer" aria-hidden="true">
      {RUNE_SPOTS.map((spot, i) => (
        <span
          key={i}
          className="rune"
          style={
            {
              top: spot.top,
              left: spot.left,
              color: spot.color,
              "--dl": `${spot.delay}s`,
            } as CSSProperties
          }
        >
          <PixelSprite sprite={RUNES[spot.rune]} scale={6} />
        </span>
      ))}
    </div>
  );
}

export function Cobwebs() {
  return (
    <>
      <span className="cobweb cobweb-left" aria-hidden="true">
        <PixelSprite sprite={COBWEB} scale={8} />
      </span>
      <span className="cobweb cobweb-right" aria-hidden="true">
        <PixelSprite sprite={COBWEB} scale={8} />
      </span>
    </>
  );
}

// Floor mist: two soft layers sliding in opposite directions.
export function Mist() {
  return (
    <div className="mist" aria-hidden="true">
      <span className="mist-layer mist-back" />
      <span className="mist-layer mist-front" />
    </div>
  );
}
