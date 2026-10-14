import type { Sprite } from "../components/sprites";
import { SHADE_0, SHADE_1, SHADE_2, SHADE_3 } from "./art";

// Small LCD-palette sprites for the About scene and panel decorations.

export const RABBIT: Sprite = {
  palette: { O: SHADE_0, W: SHADE_3, s: SHADE_2 },
  rows: [
    ".O.O........",
    ".OsO........",
    ".OsOOOOOO...",
    "OOWWWWWWWO..",
    "OOWWWWWWWWO.",
    "OOWWWWWWWWWO",
    ".OWWWWWWWWWO",
    "..OOOOOOOOO.",
  ],
};

// Wings up, then wings down.
export const BIRD_A: Sprite = {
  palette: { O: SHADE_0 },
  rows: ["O.....O", ".O...O.", "..OOO..", "...O..."],
};
export const BIRD_B: Sprite = {
  palette: { O: SHADE_0 },
  rows: ["..OOO..", "OO.O.OO", "...O...", "......."],
};

export const LEAF: Sprite = {
  palette: { O: SHADE_0, H: SHADE_1 },
  rows: ["OO.", "OHO", ".OO"],
};

export const MOON: Sprite = {
  palette: { A: SHADE_3 },
  rows: [
    "..AAA..",
    ".AA....",
    "AA.....",
    "AA.....",
    "AA.....",
    ".AA....",
    "..AAA..",
  ],
};

export const HEART: Sprite = {
  palette: { A: SHADE_3 },
  rows: [".AA.AA.", "AAAAAAA", "AAAAAAA", ".AAAAA.", "..AAA..", "...A..."],
};

export const COIN: Sprite = {
  palette: { A: SHADE_3, B: SHADE_2 },
  rows: [".AAAA.", "AABBAA", "ABAAAA", "ABAAAA", "AABBAA", ".AAAA."],
};

export const SPARK: Sprite = {
  palette: { O: SHADE_0 },
  rows: ["..O..", "..O..", "OO.OO", "..O..", "..O.."],
};
