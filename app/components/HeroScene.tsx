import type { ReactNode } from "react";
import "./scene.css";
import { toRuns } from "./PixelSprite";
import { CLOUD, CLOUD_SMALL, PALM } from "./sceneArt";
import { blimp, cars, dogs, lamps, steam, walkers } from "./SceneActors";
import { SceneAvatar } from "./SceneAvatar";
import { birds, bolt, farBlimp, signs, splashes } from "./SceneExtras";
import { ScenePointer } from "./ScenePointer";
import { mergeRects } from "./svgMerge";
import type { Sprite } from "./sprites";

// Backdrop for the hub hero: a rainy dusk city drawn on a 320x180 pixel grid.
// Everything is generated from a fixed seed, so server and client markup match.

const WIDTH = 320;
const HEIGHT = 180;
const HORIZON = 118;
const GROUND = 146;
const SKY_BANDS = [
  [0, "#120a2e"],
  [30, "#1e1042"],
  [50, "#321456"],
  [68, "#5a1a64"],
  [82, "#8a2468"],
  [94, "#c03a5c"],
  [104, "#e8663e"],
  [112, "#ffa23a"],
] as const;
const LIGHTS = ["#ffc15a", "#ff9ec7", "#4de8f0"] as const;
const RAIN_PERIOD = 30;
const SIDEWALK = 10;
const WALK_FEET = 155;
const PAD = 12;

type Building = { x: number; w: number; h: number };

function seeded(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function skyline(
  random: () => number,
  minW: number,
  spanW: number,
  minH: number,
  spanH: number,
): Building[] {
  const buildings: Building[] = [];
  let x = 0;
  while (x < WIDTH) {
    const w = minW + Math.floor(random() * spanW);
    buildings.push({ x, w, h: minH + Math.floor(random() * spanH) });
    x += w;
  }
  return buildings;
}

function rect(
  key: string,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  opacity?: number,
  className?: string,
): ReactNode {
  return (
    <rect
      key={key}
      x={x}
      y={y}
      width={w}
      height={h}
      fill={fill}
      opacity={opacity}
      className={className}
    />
  );
}

function spriteRects(
  id: string,
  sprite: Sprite,
  x: number,
  y: number,
): ReactNode[] {
  return sprite.rows.flatMap((row, dy) =>
    toRuns(row).map((run) =>
      rect(
        `${id}-${dy}-${run.x}`,
        x + run.x,
        y + dy,
        run.length,
        1,
        sprite.palette[run.key],
      ),
    ),
  );
}

function sky(): ReactNode[] {
  const nodes: ReactNode[] = [];
  SKY_BANDS.forEach(([top, color], i) => {
    const bottom = i + 1 < SKY_BANDS.length ? SKY_BANDS[i + 1][0] : GROUND;
    nodes.push(rect(`band-${i}`, 0, top, WIDTH, bottom - top, color));
    if (i === 0) return;
    // Checker dither where two bands meet.
    const above = SKY_BANDS[i - 1][1];
    const upper: ReactNode[] = [];
    const lower: ReactNode[] = [];
    for (let x = 0; x < WIDTH; x += 2) {
      upper.push(rect(`dither-a-${i}-${x}`, x, top - 1, 1, 1, color));
      lower.push(rect(`dither-b-${i}-${x}`, x + 1, top, 1, 1, above));
    }
    nodes.push(
      ...mergeRects(upper, `da-${i}`),
      ...mergeRects(lower, `db-${i}`),
    );
  });
  return nodes;
}

function sun(): ReactNode[] {
  const centerX = 232;
  const centerY = 98;
  const radius = 24;
  const nodes: ReactNode[] = [];
  for (let y = centerY - radius; y <= centerY + radius; y++) {
    const dy = y - centerY;
    // Retro stripes: every fourth row below the middle is cut out.
    if (dy > 0 && dy % 4 >= 2) continue;
    const half = Math.floor(Math.sqrt(radius * radius - dy * dy));
    const color = dy < -10 ? "#fff0a0" : dy < 4 ? "#ffd36a" : "#ffb347";
    nodes.push(rect(`sun-${y}`, centerX - half, y, half * 2 + 1, 1, color));
  }
  return nodes;
}

function stars(random: () => number): ReactNode[] {
  return Array.from({ length: 46 }, (_, i) => (
    <rect
      key={`star-${i}`}
      x={Math.floor(random() * WIDTH)}
      y={Math.floor(random() * 62)}
      width={1}
      height={1}
      fill="#fff4e0"
      opacity={0.5 + random() * 0.5}
      className={i % 5 === 0 ? "scene-twinkle" : undefined}
    />
  ));
}

function windows(
  id: string,
  random: () => number,
  building: Building,
  base: number,
  litRate: number,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  for (let y = base - building.h + 5; y < base - 3; y += 4) {
    for (let x = building.x + 2; x < building.x + building.w - 2; x += 4) {
      if (random() > litRate) continue;
      const color = LIGHTS[Math.floor(random() * LIGHTS.length)];
      const roll = random();
      // A few windows twinkle, a few more switch off and on now and then.
      const className =
        roll < 0.08 ? "scene-twinkle" : roll < 0.2 ? "scene-toggle" : undefined;
      const style = className
        ? {
            animationDelay: `${-((x * 7 + y * 3) % 23)}s`,
            animationDuration:
              className === "scene-toggle"
                ? `${7 + ((x + y) % 9)}s`
                : undefined,
          }
        : undefined;
      nodes.push(
        <rect
          key={`${id}-w-${x}-${y}`}
          x={x}
          y={y}
          width={2}
          height={2}
          fill={color}
          className={className}
          style={style}
        />,
      );
    }
  }
  return nodes;
}

function buildings(
  id: string,
  random: () => number,
  list: readonly Building[],
  base: number,
  fill: string,
  litRate: number,
): ReactNode[] {
  return list.flatMap((building, i) => {
    const top = base - building.h;
    const nodes: ReactNode[] = [
      rect(`${id}-b-${i}`, building.x, top, building.w, building.h, fill),
      ...windows(`${id}-${i}`, random, building, base, litRate),
    ];
    if (random() < 0.35) {
      nodes.push(
        rect(
          `${id}-a-${i}`,
          building.x + Math.floor(building.w / 2),
          top - 7,
          1,
          7,
          fill,
        ),
      );
    }
    if (random() < 0.4) {
      // Neon trim along the roofline.
      const trim = LIGHTS[Math.floor(random() * LIGHTS.length)];
      nodes.push(
        rect(
          `${id}-n-${i}`,
          building.x,
          top,
          building.w,
          1,
          trim,
          0.9,
          "scene-flicker",
        ),
      );
    }
    return nodes;
  });
}

function street(): ReactNode[] {
  const nodes: ReactNode[] = [
    rect("walk", 0, GROUND, WIDTH, SIDEWALK, "#3a1c5e"),
    rect("walk-edge", 0, GROUND, WIDTH, 1, "#6a2f7a"),
    rect("walk-lip", 0, GROUND + SIDEWALK - 1, WIDTH, 1, "#2a1450"),
    rect(
      "road",
      0,
      GROUND + SIDEWALK,
      WIDTH,
      HEIGHT - GROUND - SIDEWALK,
      "#120a24",
    ),
  ];
  for (let x = 6; x < WIDTH; x += 16) {
    nodes.push(rect(`tile-${x}`, x, GROUND + 1, 1, SIDEWALK - 2, "#2a1450"));
  }
  for (let x = 4; x < WIDTH; x += 24) {
    nodes.push(rect(`lane-${x}`, x, 172, 12, 1, "#ffc15a", 0.7));
  }
  return nodes;
}

function rain(random: () => number): ReactNode[] {
  const bands = HEIGHT / RAIN_PERIOD;
  return Array.from({ length: bands * 9 }, (_, i) => {
    const band = Math.floor(i / 9);
    return rect(
      `rain-${i}`,
      Math.floor(random() * WIDTH),
      band * RAIN_PERIOD + Math.floor(random() * RAIN_PERIOD),
      1,
      3 + Math.floor(random() * 3),
      "#cfe3ff",
      0.35,
    );
  });
}

// Extra wall at both ends so the parallax shift never shows a gap.
function edgePad(
  list: readonly Building[],
  base: number,
  fill: string,
): ReactNode[] {
  const first = list[0];
  const last = list[list.length - 1];
  return [
    rect("pad-l", -PAD, base - first.h, PAD, first.h, fill),
    rect("pad-r", WIDTH, base - last.h, PAD, last.h, fill),
  ];
}

const random = seeded(2026);
const starNodes = mergeRects(stars(random), "stars");
const farList = skyline(random, 8, 10, 10, 18);
const farNodes = buildings("far", random, farList, HORIZON, "#2b1650", 0.18);
const nearList = skyline(random, 14, 12, 26, 26);
const nearNodes = buildings("near", random, nearList, GROUND, "#150a2b", 0.26);
const SCENE = {
  sky: sky(),
  sun: mergeRects(sun(), "sun"),
  stars: starNodes,
  far: mergeRects(
    [...edgePad(farList, HORIZON, "#2b1650"), ...farNodes],
    "far",
  ),
  near: mergeRects(
    [...edgePad(nearList, GROUND, "#150a2b"), ...nearNodes],
    "near",
  ),
  signs: signs(nearList, GROUND),
  splashes: splashes(),
  // The manhole sits on the road, so it is drawn after the merged street layer.
  street: [
    ...mergeRects(street(), "street"),
    rect("manhole", 202, 163, 8, 2, "#2a1450"),
  ],
  rain: mergeRects(rain(random), "rain"),
};

export function HeroScene() {
  return (
    <div className="hero-scene absolute inset-x-0 bottom-0 overflow-hidden">
      <ScenePointer />
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        className="h-full w-full"
      >
        <defs>
          <clipPath id="sun-clip">
            <rect x={0} y={0} width={WIDTH} height={HORIZON} />
          </clipPath>
        </defs>
        <g aria-hidden pointerEvents="none">
          {SCENE.sky}
          <g className="scene-par scene-par-sky">
            {SCENE.stars}
            <g clipPath="url(#sun-clip)">
              <g className="scene-sun">{SCENE.sun}</g>
            </g>
            {bolt()}
            <g className="scene-cloud">
              {mergeRects(spriteRects("cloud-a", CLOUD, 20, 34), "cloud-a")}
            </g>
            <g className="scene-cloud scene-cloud-slow">
              {mergeRects(spriteRects("cloud-b", CLOUD, 150, 56), "cloud-b")}
            </g>
            <g className="scene-cloud scene-cloud-mid">
              {mergeRects(
                spriteRects("cloud-c", CLOUD_SMALL, 90, 14),
                "cloud-c",
              )}
            </g>
          </g>
          {/* The sky dims as the sun goes down. */}
          <rect
            width={WIDTH}
            height={GROUND}
            fill="#0d0221"
            className="scene-dim"
          />
          {farBlimp()}
          {blimp()}
          {birds()}
          <g className="scene-par scene-par-far">{SCENE.far}</g>
          <g className="scene-par scene-par-near">
            {SCENE.near}
            {SCENE.signs}
          </g>
          {lamps()}
          {SCENE.street}
          {SCENE.splashes}
          {steam()}
          {cars()}
          {walkers()}
          {dogs()}
        </g>
        <SceneAvatar startX={190} feet={WALK_FEET} />
        <g aria-hidden pointerEvents="none">
          <g className="scene-par scene-par-front">
            {mergeRects(
              spriteRects("palm-l", PALM, 14, GROUND - PALM.rows.length + 3),
              "palm-l",
            )}
            {mergeRects(
              spriteRects("palm-r", PALM, 292, GROUND - PALM.rows.length + 3),
              "palm-r",
            )}
          </g>
          <g className="scene-rain scene-rain-a">{SCENE.rain}</g>
          <rect
            width={WIDTH}
            height={HEIGHT}
            fill="#d9ccff"
            className="scene-flash"
          />
          {/* The top edge dithers into the page background so no seam shows. */}
          {[1, 0.75, 0.5, 0.25].map((opacity, i) =>
            rect(`fade-${i}`, 0, i * 4, WIDTH, 4, "#120a2e", opacity),
          )}
          {/* The street dithers into the page background so the hero has no hard edge. */}
          {[0.2, 0.45, 0.7, 0.9, 1].map((opacity, i) =>
            rect(
              `foot-${i}`,
              0,
              HEIGHT - 20 + i * 4,
              WIDTH,
              4,
              "#120a2e",
              opacity,
            ),
          )}
          {/* Stepped scrim keeps the headline readable over the sunset. */}
          {[0.35, 0.25, 0.15, 0.08].map((opacity, i) =>
            rect(`scrim-${i}`, i * 28, 0, 28, HEIGHT, "#0d0221", opacity),
          )}
        </g>
      </svg>
    </div>
  );
}
