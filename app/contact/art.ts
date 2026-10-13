import type { Sprite } from "../components/sprites";

const INK = "#0d0221";

// Invaders are tinted through currentColor so one sprite wears every neon tone.
const INVADER_PALETTE = { C: "currentColor" } as const;

export const INVADER_A: Sprite = {
  palette: INVADER_PALETTE,
  rows: [
    "..C.....C..",
    "...C...C...",
    "..CCCCCCC..",
    ".CC.CCC.CC.",
    "CCCCCCCCCCC",
    "C.CCCCCCC.C",
    "C.C.....C.C",
    "...CC.CC...",
  ],
};

export const INVADER_B: Sprite = {
  palette: INVADER_PALETTE,
  rows: [
    "..C.....C..",
    "C..C...C..C",
    "C.CCCCCCC.C",
    "CCC.CCC.CCC",
    "CCCCCCCCCCC",
    ".CCCCCCCCC.",
    "..C.....C..",
    ".C.......C.",
  ],
};

export const JOYSTICK: Sprite = {
  palette: {
    O: INK,
    P: "#ff4fd8",
    W: "#ffffff",
    S: "#cdb8ff",
    B: "#4a2a8a",
    D: "#2a1060",
  },
  rows: [
    "....OOOOO....",
    "...OPPPPPO...",
    "..OPWWPPPPO..",
    "..OPWPPPPPO..",
    "..OPPPPPPPO..",
    "...OPPPPPO...",
    "....OOOOO....",
    ".....OSO.....",
    ".....OSO.....",
    ".....OSO.....",
    ".OOOOOOOOOOO.",
    "OBBBBBBBBBBBO",
    "OBDDDDDDDDDBO",
    "OOOOOOOOOOOOO",
  ],
};
