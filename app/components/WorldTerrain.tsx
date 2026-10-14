import type { CSSProperties, ReactNode } from "react";
import { toRuns } from "./PixelSprite";
import { CLOUD } from "./sceneArt";
import type { Sprite } from "./sprites";
import { mergeRects } from "./svgMerge";
import { SPOTS, START, TRAIL, type Spot } from "./worldSpots";

// The hub map: the same rainy neon city as the hero, seen from above as a
// night-time street grid. Seeded, so it never changes between renders.

type Layout = {
  id: string;
  width: number;
  height: number;
  visibility: string;
  point: (spot: Spot) => [number, number];
};

const LAYOUTS: readonly Layout[] = [
  {
    id: "wide",
    width: 240,
    height: 135,
    visibility: "hidden sm:block",
    point: (spot) => [(spot.x / 100) * 240, (spot.y / 100) * 135],
  },
  {
    id: "tall",
    width: 120,
    height: 170,
    visibility: "sm:hidden",
    point: (spot) => [(spot.mx / 100) * 120, (spot.my / 100) * 170],
  },
];

const PINE: Sprite = {
  palette: { G: "#1e6b4a", H: "#2f9a68", T: "#4a2a1a", D: "#2a1810" },
  rows: [
    "...G...",
    "..GGG..",
    "..GHG..",
    ".GGGGG.",
    ".GGHGG.",
    "GGGGGGG",
    "GGGHGGG",
    "...T...",
    "...T...",
    "..DTD..",
  ],
};

const STREET = "#15102a";
const BLOCKS = ["#241a44", "#2b2050", "#1e163a"] as const;
const LIGHTS = ["#ffc15a", "#ff9ec7", "#4de8f0"] as const;
const SKY_BANDS = ["#1a0d3a", "#261052", "#35165a", "#4b1c68"] as const;
const ROAD_EDGE = "#4a3a7a";
const ROAD_FILL = "#26223d";
const PLAZA = "#2f2a52";
const CAR_COLORS = ["#ff4fd8", "#4de8f0", "#ffc15a", "#ff6fb5"] as const;
const CAR_PACE = 0.32;
const CAR_LIGHT = "#ffe9a8";

function seeded(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rect(
  key: string,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  className?: string,
  opacity?: number,
): ReactNode {
  return (
    <rect
      key={key}
      x={x}
      y={y}
      width={w}
      height={h}
      fill={fill}
      className={className}
      opacity={opacity}
    />
  );
}

function sprite(id: string, art: Sprite, x: number, y: number): ReactNode[] {
  return art.rows.flatMap((row, dy) =>
    toRuns(row).map((run) =>
      rect(
        `${id}-${dy}-${run.x}`,
        x + run.x,
        y + dy,
        run.length,
        1,
        art.palette[run.key],
      ),
    ),
  );
}

function distanceToSegment(
  px: number,
  py: number,
  [ax, ay]: [number, number],
  [bx, by]: [number, number],
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(
    0,
    Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)),
  );
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function buildLayout(layout: Layout): ReactNode {
  const { id, width, height, point } = layout;
  const random = seeded(width * 31 + height);
  const isWide = width > height;
  const skyBottom = Math.round(height * (isWide ? 0.2 : 0.14));
  const riverY = Math.round(height * 0.93);
  const waypoints = [START, ...TRAIL.map((href) => SPOTS[href])].map(point);
  const layers: ReactNode[] = [];
  let nodes: ReactNode[] = [];
  // Close the current layer: its plain rects fold into a few paths.
  const flush = (name: string) => {
    layers.push(...mergeRects(nodes, `${id}-${name}`));
    nodes = [];
  };

  // Night sky with stars, a crescent moon and a far skyline.
  SKY_BANDS.forEach((color, i) => {
    const top = Math.round((skyBottom / SKY_BANDS.length) * i);
    nodes.push(
      rect(
        `${id}-sky-${i}`,
        0,
        top,
        width,
        Math.ceil(skyBottom / SKY_BANDS.length) + 1,
        color,
      ),
    );
  });
  for (let i = 0; i < 26; i++) {
    nodes.push(
      rect(
        `${id}-star-${i}`,
        Math.floor(random() * width),
        Math.floor(random() * (skyBottom - 6)),
        1,
        1,
        "#fff4e0",
        i % 4 === 0 ? "scene-twinkle" : undefined,
        0.6 + random() * 0.4,
      ),
    );
  }
  flush("sky");
  nodes.push(rect(`${id}-moon-a`, width - 22, 3, 7, 7, "#fff4e0"));
  nodes.push(rect(`${id}-moon-b`, width - 19, 2, 6, 6, SKY_BANDS[0]));
  flush("moon");
  for (let x = 0; x < width;) {
    const w = 5 + Math.floor(random() * 7);
    const h = 4 + Math.floor(random() * 9);
    nodes.push(rect(`${id}-far-${x}`, x, skyBottom - h, w, h + 1, "#2e1b52"));
    if (random() < 0.5) {
      nodes.push(
        rect(
          `${id}-farl-${x}`,
          x + 1,
          skyBottom - h + 2,
          1,
          1,
          LIGHTS[Math.floor(random() * 3)],
        ),
      );
    }
    x += w;
  }

  flush("far");

  // Street grid with city blocks, lit windows and neon roof trim.
  const bodies: ReactNode[] = [
    rect(`${id}-street`, 0, skyBottom, width, height - skyBottom, STREET),
  ];
  const details: ReactNode[] = [];
  const blockW = isWide ? 17 : 15;
  const blockH = isWide ? 13 : 14;
  let blockIndex = 0;
  for (let y = skyBottom + 3; y + blockH < riverY - 2; y += blockH + 4) {
    for (let x = 2; x + blockW < width; x += blockW + 4) {
      blockIndex += 1;
      const key = `${id}-blk-${blockIndex}`;
      bodies.push(
        rect(
          key,
          x,
          y,
          blockW,
          blockH,
          BLOCKS[Math.floor(random() * BLOCKS.length)],
        ),
      );
      details.push(rect(`${key}-top`, x, y, blockW, 1, "#3a2c66"));
      for (let wy = y + 3; wy < y + blockH - 1; wy += 3) {
        for (let wx = x + 2; wx < x + blockW - 1; wx += 3) {
          if (random() > 0.3) continue;
          const lit = rect(
            `${key}-w-${wx}-${wy}`,
            wx,
            wy,
            1,
            1,
            LIGHTS[Math.floor(random() * LIGHTS.length)],
            random() < 0.12 ? "scene-twinkle" : undefined,
          );
          details.push(lit);
        }
      }
      if (random() < 0.3) {
        details.push(
          rect(
            `${key}-neon`,
            x,
            y + blockH - 1,
            blockW,
            1,
            LIGHTS[Math.floor(random() * 3)],
            "scene-flicker",
          ),
        );
      }
    }
  }

  nodes.push(...bodies, ...details);
  flush("blocks");

  // Parks: a few green plots with pines, away from the road and buildings.
  let parks = 0;
  for (let attempt = 0; attempt < 120 && parks < (isWide ? 4 : 3); attempt++) {
    const x = 4 + Math.floor(random() * (width - 26));
    const y = skyBottom + 6 + Math.floor(random() * (riverY - skyBottom - 28));
    const nearRoad =
      waypoints.some(([wx, wy]) => Math.hypot(x + 9 - wx, y + 7 - wy) < 22) ||
      waypoints
        .slice(1)
        .some(
          (to, i) => distanceToSegment(x + 9, y + 7, waypoints[i], to) < 14,
        );
    if (nearRoad) continue;
    parks += 1;
    nodes.push(rect(`${id}-park-${parks}`, x, y, 18, 14, "#1c4a38"));
    nodes.push(rect(`${id}-park-e-${parks}`, x, y, 18, 1, "#2f7a58"));
    nodes.push(...sprite(`${id}-pine-a-${parks}`, PINE, x + 2, y + 3));
    nodes.push(...sprite(`${id}-pine-b-${parks}`, PINE, x + 9, y + 2));
  }

  flush("parks");

  // Main road along the trail: dark edge, asphalt, dashed yellow centre line.
  const road: Array<[number, number]> = [];
  waypoints.slice(1).forEach(([bx, by], i) => {
    const [ax, ay] = waypoints[i];
    const steps = Math.ceil(Math.hypot(bx - ax, by - ay));
    for (let s = 0; s <= steps; s++) {
      road.push([
        Math.round(ax + ((bx - ax) * s) / steps),
        Math.round(ay + ((by - ay) * s) / steps),
      ]);
    }
  });
  road.forEach(([x, y], i) =>
    nodes.push(rect(`${id}-re-${i}`, x - 3, y - 3, 7, 7, ROAD_EDGE)),
  );
  road.forEach(([x, y], i) =>
    nodes.push(rect(`${id}-rf-${i}`, x - 2, y - 2, 5, 5, ROAD_FILL)),
  );
  road.forEach(([x, y], i) => {
    if (i % 7 < 3) nodes.push(rect(`${id}-rd-${i}`, x, y, 1, 1, "#ffc15a"));
  });

  flush("road");

  // Plazas under each landmark.
  waypoints.slice(1).forEach(([x, y], i) => {
    nodes.push(rect(`${id}-pz-${i}`, x - 12, y - 7, 24, 15, PLAZA));
    nodes.push(rect(`${id}-pze-${i}`, x - 12, y - 7, 24, 1, "#6a5aa8"));
  });

  flush("plaza");

  // Canal along the bottom edge with neon reflections.
  for (let x = 0; x < width; x += 2) {
    const y = riverY + Math.round(Math.sin(x / 11) * 1.5);
    nodes.push(rect(`${id}-r-${x}`, x, y, 2, height - y, "#143a7a"));
    nodes.push(rect(`${id}-rt-${x}`, x, y, 2, 1, "#4d8fe0"));
    if (x % 10 === 0) {
      nodes.push(
        rect(
          `${id}-rr-${x}`,
          x + 3,
          y + 3,
          3,
          1,
          LIGHTS[((x / 10) % 3) | 0],
          "scene-twinkle",
          0.8,
        ),
      );
    }
  }

  flush("canal");

  // Start marker: a bus stop with a flickering sign.
  const [startX, startY] = point(START);
  nodes.push(rect(`${id}-stop-pad`, startX - 7, startY - 4, 14, 10, PLAZA));
  nodes.push(rect(`${id}-stop-pole`, startX - 1, startY - 8, 1, 10, "#8a8aa8"));
  nodes.push(
    rect(
      `${id}-stop-sign`,
      startX - 3,
      startY - 11,
      6,
      4,
      "#ff4fd8",
      "scene-flicker",
    ),
  );
  nodes.push(rect(`${id}-stop-mark`, startX - 2, startY - 10, 4, 2, "#1a0738"));

  flush("stop");

  // Water glints: two rows of dashes slide along the canal in opposite directions.
  [0, 1].forEach((row) => {
    const dashes: ReactNode[] = [];
    for (let x = -6; x < width; x += 6) {
      dashes.push(
        rect(
          `${id}-g${row}-${x}`,
          x + row * 3,
          riverY + 3 + row * 3,
          3,
          1,
          row ? "#4d8fe0" : "#9cc8ff",
          undefined,
          row ? 0.7 : 0.6,
        ),
      );
    }
    nodes.push(
      <g
        key={`${id}-glint-${row}`}
        className={`world-glint${row ? " world-glint-rev" : ""}`}
      >
        {mergeRects(dashes, `${id}-glint-${row}`)}
      </g>,
    );
  });

  // Traffic on the main road: one car each way on every stretch, plus a signal at each plaza.
  waypoints.slice(1).forEach(([bx, by], i) => {
    const [ax, ay] = waypoints[i];
    const dx = bx - ax;
    const dy = by - ay;
    const length = Math.hypot(dx, dy);
    [false, true].forEach((reverse) => {
      const lane: [number, number] =
        Math.abs(dx) > Math.abs(dy) ? [0, 1] : [1, 0];
      const shift = reverse ? lane : [0, 0];
      const headsRight = dx >= 0 !== reverse;
      const style = {
        "--dx": `${dx}px`,
        "--dy": `${dy}px`,
        "--dur": `${(length * CAR_PACE * (reverse ? 1.3 : 1)).toFixed(1)}s`,
        "--delay": `${-((i * 5 + (reverse ? 9 : 2)) % 14)}s`,
      } as CSSProperties;
      const color = CAR_COLORS[(i * 2 + (reverse ? 1 : 0)) % CAR_COLORS.length];
      nodes.push(
        <g
          key={`${id}-car-${i}-${reverse}`}
          transform={`translate(${ax - 1 + shift[0]} ${ay - 1 + shift[1]})`}
        >
          <g
            className={`world-car${reverse ? " world-car-rev" : ""}`}
            style={style}
          >
            {rect(`${id}-cb-${i}-${reverse}`, 0, 0, 3, 2, color)}
            {rect(
              `${id}-ch-${i}-${reverse}`,
              headsRight ? 3 : -1,
              0,
              1,
              1,
              CAR_LIGHT,
            )}
          </g>
        </g>,
      );
    });
    nodes.push(
      rect(
        `${id}-sig-r-${i}`,
        bx + 9,
        by - 5,
        1,
        1,
        "#ff3b5c",
        "world-signal world-signal-a",
      ),
      rect(
        `${id}-sig-g-${i}`,
        bx + 9,
        by - 4,
        1,
        1,
        "#4dff9a",
        "world-signal world-signal-b",
      ),
    );
  });

  // Drifting cloud over the skyline.
  nodes.push(
    <g
      key={`${id}-cloud`}
      className="scene-cloud scene-cloud-slow"
      style={{ opacity: 0.8 }}
    >
      {sprite(`${id}-c`, CLOUD, 30, 3)}
    </g>,
  );

  return (
    <svg
      key={id}
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      className={`world-terrain ${layout.visibility}`}
    >
      {layers}
      {nodes}
    </svg>
  );
}

export function WorldTerrain() {
  return <>{LAYOUTS.map(buildLayout)}</>;
}
