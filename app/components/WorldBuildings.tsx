import type { ReactNode } from "react";

// Four small landmarks for the hub map, drawn on a 20x20 pixel grid.
// Each shape gets a 1px dark outline automatically.

// A trailing `true` marks a lit window or light that twinkles.
type Shape = readonly [
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  glow?: boolean,
];

const OUTLINE = "#120a1e";
const SIZE = 20;

// About: a townhouse with a tiled roof and lit windows.
const COTTAGE: readonly Shape[] = [
  [14, 2, 2, 5, "#9a8aa8"],
  [8, 3, 4, 1, "#c9594a"],
  [6, 4, 8, 1, "#c9594a"],
  [4, 5, 12, 1, "#c9594a"],
  [2, 6, 16, 1, "#a8453a"],
  [1, 7, 18, 1, "#a8453a"],
  [3, 8, 14, 9, "#e8d9a8"],
  [5, 10, 3, 3, "#4de8f0", true],
  [13, 10, 3, 3, "#ffc15a", true],
  [9, 12, 3, 5, "#6b3b1e"],
];

// Skills: a data centre, rows of server windows under an antenna.
const DUNGEON: readonly Shape[] = [
  [10, 1, 1, 4, "#8a8aa8"],
  [9, 0, 3, 1, "#ff3b5c", true],
  [2, 5, 16, 13, "#4a4070"],
  [3, 6, 14, 1, "#6a5aa8"],
  [4, 8, 12, 2, "#0d0221"],
  [5, 8, 2, 1, "#4de8f0", true],
  [9, 8, 2, 1, "#ffc15a", true],
  [13, 8, 2, 1, "#4de8f0", true],
  [4, 11, 12, 2, "#0d0221"],
  [5, 11, 2, 1, "#ffc15a", true],
  [9, 11, 2, 1, "#4de8f0", true],
  [13, 11, 2, 1, "#ff6fb5", true],
  [4, 14, 12, 2, "#0d0221"],
  [5, 14, 2, 1, "#4de8f0", true],
  [9, 14, 2, 1, "#ffc15a", true],
];

// Projects: an office tower with a lit window grid and a beacon.
const CASTLE: readonly Shape[] = [
  [10, 0, 1, 3, "#c9d6e8"],
  [9, 0, 3, 1, "#ff4fd8", true],
  [5, 3, 10, 15, "#8fb4dc"],
  [4, 8, 1, 10, "#6f93bd"],
  [15, 8, 1, 10, "#6f93bd"],
  [6, 5, 2, 2, "#ffc15a", true],
  [9, 5, 2, 2, "#4de8f0", true],
  [12, 5, 2, 2, "#ffc15a", true],
  [6, 9, 2, 2, "#4de8f0", true],
  [9, 9, 2, 2, "#ffc15a", true],
  [12, 9, 2, 2, "#ffc15a", true],
  [6, 13, 2, 2, "#ffc15a", true],
  [12, 13, 2, 2, "#4de8f0", true],
  [9, 14, 2, 4, "#3a1c5e"],
];

const ARCADE: readonly Shape[] = [
  [3, 3, 14, 15, "#3a1d78"],
  [4, 4, 12, 4, "#ff4fd8"],
  [5, 5, 10, 2, "#1a0738"],
  [6, 5, 4, 1, "#4de8f0", true],
  [5, 10, 10, 5, "#0d0221"],
  [6, 11, 3, 1, "#4de8f0"],
  [11, 12, 3, 1, "#ffe14d", true],
  [7, 13, 2, 1, "#ff4fd8", true],
  [9, 16, 2, 1, "#ffc15a", true],
];

const LANDMARKS = {
  "/about": COTTAGE,
  "/skills": DUNGEON,
  "/projects": CASTLE,
  "/contact": ARCADE,
} as const;

function shapes(list: readonly Shape[]): ReactNode[] {
  const outlines = list.map(([x, y, w, h], i) => (
    <rect
      key={`o-${i}`}
      x={x - 1}
      y={y - 1}
      width={w + 2}
      height={h + 2}
      fill={OUTLINE}
    />
  ));
  const fills = list.map(([x, y, w, h, fill, glow], i) => (
    <rect
      key={`f-${i}`}
      x={x}
      y={y}
      width={w}
      height={h}
      fill={fill}
      className={glow ? "world-window" : undefined}
      style={glow ? { animationDelay: `${-((i * 7) % 32) / 10}s` } : undefined}
    />
  ));
  return [...outlines, ...fills];
}

export function WorldBuilding({
  href,
  scale,
}: {
  href: keyof typeof LANDMARKS;
  scale: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE * scale}
      height={SIZE * scale}
      shapeRendering="crispEdges"
      className="world-building"
    >
      {/* Ground shadow so the building sits on the grass. */}
      <rect x={1} y={18} width={18} height={2} fill="#000000" opacity={0.3} />
      {shapes(LANDMARKS[href])}
    </svg>
  );
}

export function isLandmark(href: string): href is keyof typeof LANDMARKS {
  return href in LANDMARKS;
}
