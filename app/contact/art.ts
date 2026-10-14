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

// ---------- Room decor (tinted through currentColor or theme variables) ----------

const TINT = { C: "currentColor" } as const;

export const BOLT: Sprite = {
  palette: TINT,
  rows: [
    "....CCC",
    "...CCC.",
    "..CCC..",
    ".CCCCCC",
    "...CCC.",
    "..CC...",
    ".CC....",
    "CC.....",
  ],
};

export const SPARK: Sprite = {
  palette: TINT,
  rows: ["..C..", ".CCC.", "CCCCC", ".CCC.", "..C.."],
};

export const ARROW_DOWN: Sprite = {
  palette: TINT,
  rows: ["CCCCCCC", ".CCCCC.", "..CCC..", "...C..."],
};

export const CHOMP_OPEN: Sprite = {
  palette: TINT,
  rows: [
    "..CCCCC..",
    ".CCCCCCC.",
    "CCCCCCC..",
    "CCCCCC...",
    "CCCCC....",
    "CCCCCC...",
    "CCCCCCC..",
    ".CCCCCCC.",
    "..CCCCC..",
  ],
};

export const CHOMP_SHUT: Sprite = {
  palette: TINT,
  rows: [
    "..CCCCC..",
    ".CCCCCCC.",
    "CCCCCCCCC",
    "CCCCCCCCC",
    "CCCCCCCCC",
    "CCCCCCCCC",
    "CCCCCCCCC",
    ".CCCCCCC.",
    "..CCCCC..",
  ],
};

export const GHOST: Sprite = {
  palette: { C: "currentColor", W: "#ffffff", K: INK },
  rows: [
    "..CCCCC..",
    ".CCCCCCC.",
    "CCCCCCCCC",
    "CWWCCWWCC",
    "CWKCCWKCC",
    "CCCCCCCCC",
    "CCCCCCCCC",
    "CCCCCCCCC",
    "CC.CCC.CC",
  ],
};

export const POSTER: Sprite = {
  palette: { O: INK, D: "#2a1060", C: "currentColor", W: "#ffffff" },
  rows: [
    "OOOOOOOOOO",
    "ODDDDDDDDO",
    "ODWDCCDDDO",
    "ODDCCCCDDO",
    "ODCCCCCCDO",
    "ODCWCCWCDO",
    "ODCCCCCCDO",
    "ODCDCCDCDO",
    "ODDDDDDWDO",
    "ODWDDDDDDO",
    "OOOOOOOOOO",
  ],
};

const MACHINE_ROWS = [
  "..OOOOOOOOOO..",
  ".OMMMMMMMMMMO.",
  ".OOOOOOOOOOOO.",
  "OBBBBBBBBBBBBO",
  "OBOOOOOOOOOOBO",
  "OBOSSSSSSSSOBO",
  "OBOSSGSSGSSOBO",
  "OBOSSSGGSSSOBO",
  "OBOSSGSSGSSOBO",
  "OBOOOOOOOOOOBO",
  "OLLLLLLLLLLLLO",
  "OBBPBBBBBBABBO",
  "OBBBBBBBBBBBBO",
  "OBBBBBBBBBBBBO",
  "OBBOOOOOOOOBBO",
  "OBBOKKKKKKOBBO",
  "OBBOOOOOOOOBBO",
  "OBBBBBBBBBBBBO",
  "OBBBBBBBBBBBBO",
  "OOOOOOOOOOOOOO",
] as const;

/** A background cabinet: marquee and screen take the given theme colours. */
export function makeMachine(marquee: string, screen: string): Sprite {
  return {
    rows: MACHINE_ROWS,
    palette: {
      O: INK,
      B: "#3a1a78",
      L: "#5a2f8a",
      M: marquee,
      S: "#150a35",
      G: screen,
      P: "#ff4fd8",
      A: "#4de8f0",
      K: "#ffc15a",
    },
  };
}
