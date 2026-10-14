import type { CSSProperties, ReactNode } from "react";
import { toRuns } from "./PixelSprite";
import type { Sprite } from "./sprites";
import { mergeRects } from "./svgMerge";

// Moving things in the hero city: pedestrians, cars, a blimp, lamps, steam.
// Positions are in the same 320x180 pixel space as HeroScene.

const GROUND = 146;
const WALK_FEET = 155;
const HEADLIGHT = "#ffe9a8";

type Look = {
  hair: string;
  skin: string;
  body: string;
  legs: string;
  shoes: string;
  umbrella?: string;
};

type Walker = {
  look: Look;
  startX: number;
  reverse: boolean;
  seconds: number;
  delay: number;
};

type Car = {
  kind: "car" | "taxi" | "bus";
  body: string;
  bottom: number;
  startX: number;
  reverse: boolean;
  seconds: number;
  delay: number;
};

const TOP_ROWS = [
  "..HHH..",
  ".HSSSH.",
  ".HSSSH.",
  "..BBB..",
  ".BBBBB.",
  ".BBBBB.",
  ".SBBBS.",
  "..BBB..",
];
const STRIDE_ROWS = ["..L.L..", ".LL.LL.", ".O...O."];
const STAND_ROWS = ["...L...", "...L...", "..OOO.."];

const WALKERS: readonly Walker[] = [
  {
    look: {
      hair: "#1b1b3a",
      skin: "#e0ac7c",
      body: "#ff4fd8",
      legs: "#2a2b66",
      shoes: "#fff4e0",
    },
    startX: 30,
    reverse: false,
    seconds: 46,
    delay: -8,
  },
  {
    look: {
      hair: "#7a3b1d",
      skin: "#f2c9a0",
      body: "#4de8f0",
      legs: "#1d2a4a",
      shoes: "#ffc15a",
      umbrella: "#ff4fd8",
    },
    startX: 120,
    reverse: true,
    seconds: 58,
    delay: -30,
  },
  {
    look: {
      hair: "#101010",
      skin: "#c58c5f",
      body: "#ffc15a",
      legs: "#3a2a1a",
      shoes: "#111111",
    },
    startX: 210,
    reverse: false,
    seconds: 38,
    delay: -22,
  },
  {
    look: {
      hair: "#d8d8e8",
      skin: "#e0ac7c",
      body: "#8a6bff",
      legs: "#222244",
      shoes: "#fff4e0",
      umbrella: "#4de8f0",
    },
    startX: 270,
    reverse: true,
    seconds: 52,
    delay: -5,
  },
  {
    look: {
      hair: "#3a1c5e",
      skin: "#f2c9a0",
      body: "#ff7a3d",
      legs: "#2a2b66",
      shoes: "#4de8f0",
      umbrella: "#ffc15a",
    },
    startX: 80,
    reverse: false,
    seconds: 62,
    delay: -40,
  },
  {
    look: {
      hair: "#e8c36a",
      skin: "#e0ac7c",
      body: "#4dff9a",
      legs: "#1d2a4a",
      shoes: "#ff4fd8",
    },
    startX: 180,
    reverse: true,
    seconds: 44,
    delay: -15,
  },
  {
    look: {
      hair: "#2a1a4d",
      skin: "#c58c5f",
      body: "#ff3b5c",
      legs: "#3a2a1a",
      shoes: "#fff4e0",
      umbrella: "#8a6bff",
    },
    startX: 250,
    reverse: false,
    seconds: 56,
    delay: -48,
  },
];

// A dog trots a few steps ahead of the third pedestrian (same pace, same lane).
const DOG_ROWS = ["D.....DD", "DDDDDDDD", "DDDDDDDD"];
const DOG_STRIDE = "D.D..D.D";
const DOG_STAND = ".D.DD.D.";
const DOG = { color: "#c08a52", startX: 226, seconds: 38, delay: -22 };

const CARS: readonly Car[] = [
  {
    kind: "car",
    body: "#c03a5c",
    bottom: 168,
    startX: 60,
    reverse: false,
    seconds: 16,
    delay: -4,
  },
  {
    kind: "taxi",
    body: "#ffc15a",
    bottom: 168,
    startX: 60,
    reverse: false,
    seconds: 16,
    delay: -12,
  },
  {
    kind: "car",
    body: "#2f6fd6",
    bottom: 178,
    startX: 200,
    reverse: true,
    seconds: 22,
    delay: -13,
  },
  {
    kind: "bus",
    body: "#18a5a0",
    bottom: 178,
    startX: 200,
    reverse: true,
    seconds: 22,
    delay: -2,
  },
];
const CAR_WIDTH = 26;
const BUS_WIDTH = 40;

const LAMP_XS = [48, 150, 262] as const;
const STEAM_X = 204;

function mirror(rows: readonly string[]): string[] {
  return rows.map((row) => [...row].reverse().join(""));
}

export function rect(
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

function rows(id: string, sprite: Sprite, x: number, y: number): ReactNode[] {
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

function figure(id: string, look: Look, reverse: boolean, legRows: string[]) {
  const palette = {
    H: look.hair,
    S: look.skin,
    B: look.body,
    L: look.legs,
    O: look.shoes,
  };
  const all = [...TOP_ROWS, ...legRows];
  return mergeRects(
    rows(id, { rows: reverse ? mirror(all) : all, palette }, 0, 0),
    id,
  );
}

function umbrella(id: string, color: string): ReactNode[] {
  return [
    rect(`${id}-u1`, 1, -6, 5, 1, color),
    rect(`${id}-u2`, -1, -5, 9, 1, color),
    rect(`${id}-u3`, -2, -4, 11, 1, color),
    rect(`${id}-u4`, 3, -3, 1, 4, "#cfe3ff"),
  ];
}

export function walkers(): ReactNode[] {
  return WALKERS.map((walker, i) => {
    const id = `walker-${i}`;
    const style = {
      "--dur": `${walker.seconds}s`,
      "--delay": `${walker.delay}s`,
    } as CSSProperties;
    return (
      <g
        key={id}
        className={`scene-walker${walker.reverse ? " scene-walker-rev" : ""}`}
        style={style}
      >
        <g transform={`translate(${walker.startX} ${WALK_FEET - 11})`}>
          <g className="scene-frame-a">
            {figure(`${id}-a`, walker.look, walker.reverse, STRIDE_ROWS)}
          </g>
          <g className="scene-frame-b">
            {figure(`${id}-b`, walker.look, walker.reverse, STAND_ROWS)}
          </g>
          {walker.look.umbrella && umbrella(id, walker.look.umbrella)}
        </g>
      </g>
    );
  });
}

function busShape(id: string, body: string): ReactNode[] {
  const windows = Array.from({ length: 6 }, (_, k) =>
    rect(`${id}-win-${k}`, 3 + k * 6, 2, 4, 3, "#9fd8ff"),
  );
  return [
    rect(`${id}-beam1`, 40, 5, 6, 2, HEADLIGHT, 0.28),
    rect(`${id}-beam2`, 46, 4, 8, 4, HEADLIGHT, 0.17),
    rect(`${id}-beam3`, 54, 3, 10, 6, HEADLIGHT, 0.09),
    rect(`${id}-body`, 1, 0, 38, 9, body),
    ...windows,
    rect(`${id}-stripe`, 1, 6, 38, 1, "#fff4e0", 0.7),
    rect(`${id}-trim`, 1, 8, 38, 1, "#0d0221", 0.5),
    rect(`${id}-head`, 38, 5, 2, 2, HEADLIGHT),
    rect(`${id}-tail`, 0, 5, 1, 2, "#ff3b5c"),
    rect(`${id}-wheel1`, 5, 8, 5, 3, "#0d0221"),
    rect(`${id}-wheel2`, 28, 8, 5, 3, "#0d0221"),
    rect(`${id}-hub1`, 7, 9, 1, 1, "#8a8aa8"),
    rect(`${id}-hub2`, 30, 9, 1, 1, "#8a8aa8"),
  ];
}

function carShape(id: string, body: string, taxi = false): ReactNode[] {
  return [
    ...(taxi ? [rect(`${id}-sign`, 10, -1, 3, 1, "#fff4e0")] : []),
    rect(`${id}-beam1`, 26, 5, 6, 2, HEADLIGHT, 0.28),
    rect(`${id}-beam2`, 32, 4, 8, 4, HEADLIGHT, 0.17),
    rect(`${id}-beam3`, 40, 3, 10, 6, HEADLIGHT, 0.09),
    rect(`${id}-roof`, 6, 0, 13, 5, body),
    rect(`${id}-win1`, 8, 1, 4, 3, "#9fd8ff"),
    rect(`${id}-win2`, 13, 1, 4, 3, "#9fd8ff"),
    rect(`${id}-body`, 1, 4, 24, 5, body),
    rect(`${id}-trim`, 1, 8, 24, 1, "#0d0221", 0.5),
    rect(`${id}-head`, 24, 5, 2, 2, HEADLIGHT),
    rect(`${id}-tail`, 0, 5, 1, 2, "#ff3b5c"),
    rect(`${id}-wheel1`, 4, 8, 5, 3, "#0d0221"),
    rect(`${id}-wheel2`, 18, 8, 5, 3, "#0d0221"),
    rect(`${id}-hub1`, 6, 9, 1, 1, "#8a8aa8"),
    rect(`${id}-hub2`, 20, 9, 1, 1, "#8a8aa8"),
  ];
}

export function cars(): ReactNode[] {
  return CARS.map((car, i) => {
    const id = `car-${i}`;
    const style = {
      "--dur": `${car.seconds}s`,
      "--delay": `${car.delay}s`,
    } as CSSProperties;
    // Cars are drawn facing right; the reverse lane mirrors them.
    const width = car.kind === "bus" ? BUS_WIDTH : CAR_WIDTH;
    const flip = car.reverse ? `translate(${width} 0) scale(-1 1)` : undefined;
    return (
      <g
        key={id}
        className={`scene-car${car.reverse ? " scene-car-rev" : ""}`}
        style={style}
      >
        <g transform={`translate(${car.startX} ${car.bottom - 11})`}>
          <g transform={flip}>
            {car.kind === "bus"
              ? busShape(id, car.body)
              : carShape(id, car.body, car.kind === "taxi")}
          </g>
        </g>
      </g>
    );
  });
}

export function dogs(): ReactNode[] {
  const id = "dog";
  const style = {
    "--dur": `${DOG.seconds}s`,
    "--delay": `${DOG.delay}s`,
  } as CSSProperties;
  const frame = (key: string, legs: string) => {
    const all = [...DOG_ROWS, legs];
    const sprite = { rows: all, palette: { D: DOG.color } };
    return mergeRects(rows(`${id}-${key}`, sprite, 0, 0), `${id}-${key}`);
  };
  return [
    <g key={id} className="scene-walker" style={style}>
      <g transform={`translate(${DOG.startX} ${WALK_FEET - 4})`}>
        <g className="scene-frame-a">{frame("a", DOG_STRIDE)}</g>
        <g className="scene-frame-b">{frame("b", DOG_STAND)}</g>
      </g>
    </g>,
  ];
}

export function blimp(): ReactNode {
  const halves = [11, 14, 15, 16, 16, 15, 14, 11];
  return (
    <g key="blimp" className="scene-blimp">
      <g transform="translate(0 24)">
        {halves.map((half, dy) =>
          rect(
            `blimp-${dy}`,
            16 - half,
            dy,
            half * 2,
            1,
            dy < 2 ? "#5a3c98" : "#3a2468",
          ),
        )}
        {rect("blimp-gondola", 12, 8, 8, 2, "#1b0f33")}
        {rect("blimp-fin-a", 0, 2, 3, 3, "#2a1a4d")}
        {rect("blimp-fin-b", 3, 0, 2, 2, "#2a1a4d")}
        {rect("blimp-ad", 8, 3, 16, 3, "#ff4fd8", 1, "scene-flicker")}
        {rect("blimp-ad-text", 10, 4, 12, 1, "#fff4e0")}
        {rect("blimp-beacon", 30, 3, 2, 2, "#ff3b5c", 1, "scene-twinkle")}
      </g>
    </g>
  );
}

export function lamps(): ReactNode[] {
  return LAMP_XS.flatMap((x) => {
    const top = GROUND - 24;
    const cone = Array.from({ length: 16 }, (_, k) => {
      const half = 1 + Math.round(k * 0.75);
      return rect(
        `lamp-${x}-cone-${k}`,
        x + 4 - half,
        top + 2 + k,
        half * 2 + 1,
        1,
        HEADLIGHT,
        0.07,
      );
    });
    return [
      rect(`lamp-${x}-pole`, x, top, 1, 24, "#2a1a4d"),
      rect(`lamp-${x}-arm`, x, top, 5, 1, "#2a1a4d"),
      rect(`lamp-${x}-head`, x + 3, top + 1, 3, 1, HEADLIGHT),
      ...mergeRects(cone, `lamp-${x}-cone`),
    ];
  });
}

export function steam(): ReactNode[] {
  return [0, 1, 2].map((i) => (
    <g
      key={`steam-${i}`}
      className="scene-steam"
      style={{ animationDelay: `${i * -0.9}s` }}
    >
      {rect(`steam-${i}-a`, STEAM_X + i, 162, 3, 2, "#cfe3ff", 0.3)}
      {rect(`steam-${i}-b`, STEAM_X + 2 - i, 160, 2, 2, "#cfe3ff", 0.22)}
    </g>
  ));
}
