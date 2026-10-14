import type { Sprite } from "./sprites";

// Original pixel art for the hero backdrop (dusk city, palms, drifting clouds).

export const PALM: Sprite = {
  palette: { G: "#14735c", H: "#27a37e", T: "#4a2438", D: "#331626" },
  rows: [
    "...GGH...HGG...",
    ".GGHHGGGGGHHGG.",
    "GGGHGGGHGGGGHGG",
    "GG.GGGGGHGGG.GG",
    "G...GGGTGGG...G",
    ".....GGTGG.....",
    "......TTG......",
    ".......TD......",
    ".......TD......",
    "......TTD......",
    "......TD.......",
    "......TD.......",
    "......TD.......",
    ".....TTD.......",
    ".....TD........",
    ".....TD........",
    ".....TD........",
    ".....TD........",
    "....TTD........",
    "....TD.........",
    "....TD.........",
    "....TD.........",
    "....TD.........",
    "....TD.........",
    "....TD.........",
    "....TD.........",
    "....TD.........",
  ],
};

export const CLOUD: Sprite = {
  palette: { O: "#3a1c5e", H: "#6a2f7a" },
  rows: [
    ".........HHHH...........",
    ".......HHHOOOHH..HHH....",
    "...HHHHHOOOOOOHHHOOOH...",
    "..HOOOOOOOOOOOOOOOOOOH..",
    ".HOOOOOOOOOOOOOOOOOOOOH.",
    "OOOOOOOOOOOOOOOOOOOOOOOO",
  ],
};

export const CLOUD_SMALL: Sprite = {
  palette: { O: "#3a1c5e", H: "#6a2f7a" },
  rows: ["...HHH......", ".HHOOOHH.HH.", "HOOOOOOOHOOH", "OOOOOOOOOOOO"],
};
