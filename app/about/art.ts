import { AVATAR, AVATAR_BLINK, type Sprite } from "../components/sprites";

// Four handheld-LCD shades, darkest to lightest.
export const SHADE_0 = "#1f1f1f";
export const SHADE_1 = "#4d533c";
export const SHADE_2 = "#8b956d";
export const SHADE_3 = "#dbe3bb";

const LCD_PALETTE = {
  O: SHADE_0,
  H: SHADE_1,
  S: SHADE_3,
  s: SHADE_2,
  G: SHADE_0,
  W: SHADE_3,
  K: SHADE_0,
  M: SHADE_1,
  V: SHADE_1,
  v: SHADE_0,
  P: SHADE_1,
  B: SHADE_3,
} as const;

export const AVATAR_LCD: Sprite = { rows: AVATAR.rows, palette: LCD_PALETTE };
export const AVATAR_LCD_BLINK: Sprite = {
  rows: AVATAR_BLINK.rows,
  palette: LCD_PALETTE,
};

// Walk cycle: frame A is the standing pose, frame B closes the legs.
const WALK_B_LEGS: Record<number, string> = {
  16: "....OPPPPPPO....",
  17: "....OPPPPPPO....",
  18: "...OBBBBBBBBO...",
  19: "...OOOOOOOOOO...",
};
export const WALK_A: Sprite = AVATAR_LCD;
export const WALK_B: Sprite = {
  palette: LCD_PALETTE,
  rows: AVATAR.rows.map((row, y) => WALK_B_LEGS[y] ?? row),
};

export const SUN: Sprite = {
  palette: { A: SHADE_2, B: SHADE_1 },
  rows: [
    "...AAAA...",
    "..AAAAAA..",
    ".AAAAAAAAA",
    "AAAAAAAAAA",
    "AAAAAAAAAA",
    ".AAAAAAAAA",
    "..AAAAAA..",
    "...AAAA...",
  ],
};

export const FLOPPY: Sprite = {
  palette: { O: SHADE_0, H: SHADE_1, B: SHADE_3, S: SHADE_3, K: SHADE_1 },
  rows: [
    "OOOOOOOOOOOOO.",
    "OHHBBBBBBHHHOO",
    "OHHBBBOOBHHHHO",
    "OHHBBBBBBHHHHO",
    "OHHHHHHHHHHHHO",
    "OHHHHHHHHHHHHO",
    "OHSSSSSSSSSSHO",
    "OHSSSSSSSSSSHO",
    "OHSSSSSSSSSSHO",
    "OHSKKKKKKKKSHO",
    "OHSSSSSSSSSSHO",
    "OHSKKKKKKSSSHO",
    "OHSSSSSSSSSSHO",
    "OOOOOOOOOOOOOO",
  ],
};

// --- Scrolling scenery -------------------------------------------------
// Every layer is one tile of TILE x SCENE_H grid units, drawn twice side by
// side so a translateX of -TILE loops seamlessly. All shapes are fixed, so the
// output is identical on every render.

export const TILE = 240;
export const SCENE_H = 56;
export const GROUND_TOP = 48;

export type Rect = { x: number; y: number; w: number; h: number };

/** Periodic hill silhouette: integer wave counts keep the tile seamless. */
function hills(
  base: number,
  amp: number,
  waves: [number, number],
  phase: number,
): Rect[] {
  const tops = Array.from({ length: TILE }, (_, x) => {
    const a = Math.sin((2 * Math.PI * x * waves[0]) / TILE + phase);
    const b = Math.sin((2 * Math.PI * x * waves[1]) / TILE + phase * 2.3);
    return Math.round(base - amp * (0.65 * a + 0.35 * b));
  });
  const rects: Rect[] = [];
  let start = 0;
  for (let x = 1; x <= TILE; x++) {
    if (x === TILE || tops[x] !== tops[start]) {
      rects.push({
        x: start,
        y: tops[start],
        w: x - start,
        h: SCENE_H - tops[start],
      });
      start = x;
    }
  }
  return rects;
}

function cloud(x: number, y: number): Rect[] {
  return [
    { x: x + 3, y, w: 5, h: 1 },
    { x: x + 1, y: y + 1, w: 9, h: 1 },
    { x, y: y + 2, w: 12, h: 2 },
  ];
}

const PINE_ROWS = [1, 3, 5, 3, 5, 7, 5, 7, 9];

/** Stepped pine; `center` is the trunk column, `bottom` the foot of the trunk. */
function pine(center: number, bottom: number): Rect[] {
  const top = bottom - 2 - PINE_ROWS.length;
  const crown = PINE_ROWS.map((w, i) => ({
    x: center - (w - 1) / 2,
    y: top + i,
    w,
    h: 1,
  }));
  return [...crown, { x: center, y: bottom - 2, w: 1, h: 2 }];
}

export const FAR_HILLS = hills(36, 7, [2, 5], 0.6);
export const MID_HILLS = hills(42, 4, [3, 7], 2.1);
export const CLOUDS = [...cloud(14, 7), ...cloud(96, 14), ...cloud(172, 5)];
export const TREES = [24, 58, 71, 118, 150, 163, 205, 226].flatMap((c, i) =>
  pine(c, GROUND_TOP + (i % 2)),
);

/** Ground strip: dark edge line, then sparse texture and grass tufts. */
export const GROUND_EDGE: Rect[] = [{ x: 0, y: GROUND_TOP, w: TILE, h: 1 }];
export const GROUND_TEXTURE: Rect[] = [
  ...Array.from({ length: 30 }, (_, i) => ({
    x: i * 8 + (i % 3),
    y: 51,
    w: 2,
    h: 1,
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    x: i * 10 + 4 + (i % 2) * 3,
    y: 54,
    w: 3,
    h: 1,
  })),
];
export const TUFTS: Rect[] = [12, 47, 90, 133, 176, 221].flatMap((x) => [
  { x, y: GROUND_TOP - 2, w: 1, h: 2 },
  { x: x + 2, y: GROUND_TOP - 1, w: 1, h: 1 },
]);

// --- Extra scenery -----------------------------------------------------

/** A faster, lower cloud layer in front of the far hills. */
export const CLOUDS_NEAR = [
  ...cloud(60, 20),
  ...cloud(140, 24),
  ...cloud(214, 17),
].filter((r) => r.x + r.w <= TILE);

/** Flowers on the ground strip: a stem plus a dark bloom. */
const FLOWER_X = [28, 66, 109, 151, 187, 214];
export const FLOWER_STEMS: Rect[] = FLOWER_X.map((x) => ({
  x,
  y: GROUND_TOP - 2,
  w: 1,
  h: 2,
}));
export const FLOWER_BLOOMS: Rect[] = FLOWER_X.flatMap((x) => [
  { x: x - 1, y: GROUND_TOP - 3, w: 3, h: 1 },
  { x, y: GROUND_TOP - 4, w: 1, h: 1 },
]);

/** Tall grass drawn in front of the walker's feet on the fastest layer. */
const GRASS_X = [5, 31, 62, 97, 128, 166, 199, 233];
export const FOREGROUND_DARK: Rect[] = GRASS_X.flatMap((x) => [
  { x, y: 51, w: 1, h: 5 },
  { x: x + 2, y: 53, w: 1, h: 3 },
]);
export const FOREGROUND_MID: Rect[] = GRASS_X.map((x) => ({
  x: x + 1,
  y: 52,
  w: 1,
  h: 4,
}));

/** Night stars in two groups so they can twinkle out of step. */
export const STARS_A: Rect[] = [
  [8, 4],
  [31, 12],
  [57, 3],
  [84, 16],
  [112, 6],
  [139, 14],
  [166, 4],
  [190, 11],
].map(([x, y]) => ({ x, y, w: 1, h: 1 }));
export const STARS_B: Rect[] = [
  [19, 9],
  [44, 18],
  [71, 8],
  [99, 3],
  [126, 11],
  [153, 19],
  [178, 8],
  [203, 15],
].map(([x, y]) => ({ x, y, w: 1, h: 1 }));
