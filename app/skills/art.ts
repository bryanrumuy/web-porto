import type { Sprite } from "../components/sprites";

const TORCH_PALETTE = {
  y: "#fff2a8",
  o: "#ffc447",
  r: "#ff7a3c",
  b: "#7a4a22",
  g: "#8d8aa0",
};

const TORCH_BASE = [
  "..gggg..",
  "..g..g..",
  "...bb...",
  "...bb...",
  "..bbbb..",
  "...bb...",
  "...bb...",
  "...bb...",
];

// Two flame frames sharing one handle; CSS swaps them with steps().
export const TORCH_A: Sprite = {
  rows: [
    "...y....",
    "..yoy...",
    ".yooro..",
    ".orrryo.",
    ".orrrro.",
    "..orro..",
    ...TORCH_BASE,
  ],
  palette: TORCH_PALETTE,
};

export const TORCH_B: Sprite = {
  rows: [
    "....y...",
    "...yoy..",
    "..oroy..",
    ".oyrrro.",
    ".orrrro.",
    "..orro..",
    ...TORCH_BASE,
  ],
  palette: TORCH_PALETTE,
};

// Chest frames share a 16x12 grid so the closed and open states swap in place.
// "T" reads --tone from the nearest .tone-* class.
const CHEST_PALETTE = {
  o: "#120b0a",
  w: "#8a5a2b",
  T: "var(--tone)",
  K: "#ffc447",
  y: "#ffc447",
  Y: "#fff2a8",
};

export const CHEST_CLOSED: Sprite = {
  rows: [
    "................",
    "................",
    "................",
    "..oooooooooooo..",
    ".owwwwwwwwwwwwo.",
    "owwTwwwwwwwwTwwo",
    "owwTwwwwwwwwTwwo",
    "oooooooKKooooooo",
    "owwTwwwKKwwTwwwo",
    "owwTwwwwwwwwTwwo",
    "owwTwwwwwwwwTwwo",
    "oooooooooooooooo",
  ],
  palette: CHEST_PALETTE,
};

export const CHEST_OPEN: Sprite = {
  rows: [
    "..oooooooooooo..",
    ".owwwwwwwwwwwwo.",
    ".owTwwwwwwwwTwo.",
    ".oooooooooooooo.",
    "oyYyyYyyyyYyyyyo",
    "oyyyYyyyyyyYyyyo",
    "oooooooKKooooooo",
    "owwTwwwKKwwTwwwo",
    "owwTwwwwwwwwTwwo",
    "owwTwwwwwwwwTwwo",
    "owwTwwwwwwwwTwwo",
    "oooooooooooooooo",
  ],
  palette: CHEST_PALETTE,
};

const BAT_PALETTE = { w: "#7d6aa6", o: "#a995d4", R: "#ff6b6b" };

// Wings up, then wings down; CSS flips between them with steps(1).
export const BAT_A: Sprite = {
  rows: [
    "ww........ww",
    "www.o..o.www",
    "wwwwoRRowwww",
    ".wwwooooowww",
    "..w..oo..w..",
    "............",
  ],
  palette: BAT_PALETTE,
};

export const BAT_B: Sprite = {
  rows: [
    "....o..o....",
    "....oooo....",
    "wwwwoRRowwww",
    ".wwwooooowww",
    "..ww.oo.ww..",
    "...w......w.",
  ],
  palette: BAT_PALETTE,
};

export const SPIDER: Sprite = {
  rows: [
    "o......o",
    ".o.oo.o.",
    "..oooo..",
    "oooRRooo",
    "..oooo..",
    ".o.oo.o.",
    "o..oo..o",
  ],
  palette: { o: "#a995d4", R: "#ff6b6b" },
};

// Deterministic ember field: same output on server and client, no Math.random.
export type Ember = {
  x: number;
  y: number;
  size: number;
  dx: number;
  duration: number;
  delay: number;
  hot: boolean;
};

export function makeEmbers(count: number, startSeed = 7): Ember[] {
  let seed = startSeed;
  const next = () => {
    seed = (seed * 48271) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(((i + 0.5) / count) * 96 + next() * 3),
    y: Math.round(next() * 70),
    size: next() > 0.6 ? 6 : 4,
    dx: Math.round((next() - 0.5) * 60),
    duration: Math.round(9 + next() * 9),
    delay: -Math.round(next() * 14),
    hot: next() > 0.45,
  }));
}

// Loot that pops out of an open chest. "T" reads --tone from the nearest .tone-* class.
export const COIN: Sprite = {
  rows: [".ooo.", "oYyyo", "oyYyo", "oyyyo", ".ooo."],
  palette: { o: "#7a4a14", y: "#ffc447", Y: "#fff2a8" },
};

export const GEM: Sprite = {
  rows: [".oooo.", "oWTTTo", "oTTTTo", ".oTTo.", "..oo.."],
  palette: { o: "#120b0a", W: "#ffffff", T: "var(--tone)" },
};

// Wall runes: "r" takes the CSS colour of the wrapper, so one glyph can glow any hue.
const RUNE_PALETTE = { r: "currentColor" };

export const RUNES: readonly Sprite[] = [
  {
    rows: [
      "...r...",
      "..rr...",
      ".r.r.r.",
      "...rrrr",
      "...r.r.",
      "..r..r.",
      "..r....",
    ],
    palette: RUNE_PALETTE,
  },
  {
    rows: [
      "rrrrrrr",
      "r..r..r",
      ".r.r.r.",
      "..rrr..",
      "...r...",
      "...r...",
      "..rrr..",
    ],
    palette: RUNE_PALETTE,
  },
  {
    rows: [
      "..rrr..",
      ".r...r.",
      "r..r..r",
      "r.rrr.r",
      "r..r..r",
      ".r...r.",
      "..rrr..",
    ],
    palette: RUNE_PALETTE,
  },
];

// Cobweb for a top-left corner; mirrored in CSS for the right.
export const COBWEB: Sprite = {
  rows: [
    "wwwwwwwwww",
    "wwwww.w...",
    "ww.w.w....",
    "w.w.ww....",
    "ww..w.w...",
    "ww..w..w..",
    "w...w...w.",
    "w...w....w",
    "w....",
  ].map((row) => row.padEnd(10, ".")),
  palette: { w: "#b8b0d4" },
};
