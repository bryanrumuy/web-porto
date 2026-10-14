import type { CSSProperties, ReactNode } from "react";
import { rect } from "./SceneActors";
import { mergeRects } from "./svgMerge";

// Extra life for the hero city: neon signs, rain splashes, lightning, birds
// and a far-off second blimp. Same 320x180 pixel space as HeroScene.

const WIDTH = 320;
const STREET_TOP = 156;
const STREET_BOTTOM = 178;
const SPLASH_COUNT = 16;
const SIGN_MIN_HEIGHT = 36;
const SIGN_MIN_X = 120;
const SIGN_DARK = "#1a0d33";
const BIRD = "#1a0d33";
// Wing pixels for the two flap frames of a 5x3 bird.
const WINGS_UP = [
  [0, 0],
  [4, 0],
  [1, 1],
  [3, 1],
  [2, 2],
] as const;
const WINGS_DOWN = [
  [2, 0],
  [1, 1],
  [3, 1],
  [0, 2],
  [4, 2],
] as const;
const FLOCKS = [
  {
    y: 52,
    seconds: 46,
    delay: -10,
    reverse: false,
    birds: [
      [0, 0],
      [9, 4],
      [-8, 6],
    ],
  },
  {
    y: 74,
    seconds: 64,
    delay: -40,
    reverse: true,
    birds: [
      [0, 0],
      [8, -3],
    ],
  },
] as const;

type Tower = { x: number; w: number; h: number };

function seeded(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function delayed(seconds: number, duration?: number): CSSProperties {
  return {
    animationDelay: `${seconds}s`,
    ...(duration ? { animationDuration: `${duration}s` } : {}),
  };
}

// A blade sign sticking out of a wall: bracket, dark panel, glowing bars.
function bladeSign(tower: Tower, base: number, color: string): ReactNode[] {
  const x = tower.x - 7;
  const y = base - tower.h + 6;
  const bars = [2, 6, 10].map((dy, i) => (
    <g
      key={`blade-bar-${i}`}
      className="scene-flicker"
      style={delayed(-i * 1.7)}
    >
      {rect(`blade-bar-${i}`, x + 1, y + dy, 4, 2, color)}
    </g>
  ));
  return [
    rect("blade-halo", x - 2, y - 2, 10, 19, color, 0.18, "scene-glow"),
    rect("blade-bracket", x + 5, y + 1, 3, 1, "#2a1a4d"),
    rect("blade-panel", x, y, 6, 15, SIGN_DARK),
    ...bars,
  ];
}

// A rooftop billboard on two posts with a row of flickering neon dashes.
function roofSign(tower: Tower, base: number, color: string): ReactNode[] {
  const top = base - tower.h;
  const x = tower.x + 1;
  const w = Math.min(tower.w - 2, 16);
  const dashes = Array.from({ length: Math.floor((w - 2) / 3) }, (_, i) => (
    <g
      key={`roof-dash-${i}`}
      className="scene-flicker"
      style={delayed(-i * 0.9)}
    >
      {rect(`roof-dash-${i}`, x + 1 + i * 3, top - 7, 2, 2, color)}
    </g>
  ));
  return [
    rect("roof-halo", x - 2, top - 11, w + 4, 10, color, 0.16, "scene-glow"),
    rect("roof-post-a", x + 1, top - 4, 1, 4, "#2a1a4d"),
    rect("roof-post-b", x + w - 2, top - 4, 1, 4, "#2a1a4d"),
    rect("roof-board", x, top - 9, w, 5, SIGN_DARK),
    ...dashes,
  ];
}

// Picks two tall buildings on the right half of the skyline for neon signs.
export function signs(list: readonly Tower[], base: number): ReactNode[] {
  const tall = list.filter(
    (tower) =>
      tower.h >= SIGN_MIN_HEIGHT &&
      tower.x >= SIGN_MIN_X &&
      tower.x + tower.w < WIDTH - 12,
  );
  const blade = tall[0];
  const roof = tall.length > 1 ? tall[tall.length - 1] : undefined;
  return [
    ...(blade ? bladeSign(blade, base, "#ff4fd8") : []),
    ...(roof ? roofSign(roof, base, "#4de8f0") : []),
  ];
}

// Tiny rings where raindrops hit the street, each on its own beat.
export function splashes(): ReactNode[] {
  const random = seeded(77);
  return Array.from({ length: SPLASH_COUNT }, (_, i) => {
    const x = 4 + Math.floor(random() * (WIDTH - 8));
    const y = STREET_TOP + Math.floor(random() * (STREET_BOTTOM - STREET_TOP));
    return (
      <g
        key={`splash-${i}`}
        className="scene-splash"
        style={delayed(-random() * 2, 1.1 + random() * 1.4)}
      >
        {rect(`splash-${i}-l`, x - 1, y, 1, 1, "#cfe3ff")}
        {rect(`splash-${i}-r`, x + 1, y, 1, 1, "#cfe3ff")}
        {rect(`splash-${i}-t`, x, y - 1, 1, 1, "#cfe3ff")}
      </g>
    );
  });
}

// A fork of lightning that shows for a beat during the scene's flash.
export function bolt(): ReactNode {
  return (
    <path
      key="bolt"
      className="scene-bolt"
      fill="#f4eaff"
      d="M142 0h6l-7 22h5l-12 28h-3l6-20h-5z"
    />
  );
}

function wings(
  id: string,
  pixels: readonly (readonly [number, number])[],
): ReactNode[] {
  return mergeRects(
    pixels.map(([x, y]) => rect(`${id}-${x}-${y}`, x, y, 1, 1, BIRD)),
    id,
  );
}

export function birds(): ReactNode[] {
  return FLOCKS.map((flock, f) => {
    const style = {
      "--dur": `${flock.seconds}s`,
      "--delay": `${flock.delay}s`,
    } as CSSProperties;
    return (
      <g
        key={`flock-${f}`}
        className={`scene-bird${flock.reverse ? " scene-bird-rev" : ""}`}
        style={style}
      >
        {flock.birds.map(([dx, dy], b) => (
          <g
            key={`bird-${f}-${b}`}
            transform={`translate(${dx} ${flock.y + dy})`}
          >
            <g
              className="scene-frame-a"
              style={{
                animationDuration: "0.5s",
                animationDelay: `${-b * 0.17}s`,
              }}
            >
              {wings(`bird-${f}-${b}-u`, WINGS_UP)}
            </g>
            <g
              className="scene-frame-b"
              style={{
                animationDuration: "0.5s",
                animationDelay: `${-b * 0.17}s`,
              }}
            >
              {wings(`bird-${f}-${b}-d`, WINGS_DOWN)}
            </g>
          </g>
        ))}
      </g>
    );
  });
}

// A small, distant blimp crossing the other way.
export function farBlimp(): ReactNode {
  const halves = [5, 7, 8, 8, 7, 5];
  return (
    <g key="far-blimp" className="scene-blimp-far">
      <g transform="translate(0 40)">
        {halves.map((half, dy) =>
          rect(
            `far-blimp-${dy}`,
            8 - half,
            dy,
            half * 2,
            1,
            dy < 2 ? "#4a4a9a" : "#2f2f78",
          ),
        )}
        {rect("far-blimp-gondola", 6, 6, 4, 1, "#1b0f33")}
        {rect("far-blimp-fin", 0, 1, 2, 3, "#232360")}
        {rect("far-blimp-ad", 5, 2, 8, 2, "#4de8f0", 1, "scene-flicker")}
        {rect("far-blimp-beacon", 15, 2, 1, 1, "#ff3b5c", 1, "scene-twinkle")}
      </g>
    </g>
  );
}
