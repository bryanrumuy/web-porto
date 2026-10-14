import type { Sprite } from "../components/sprites";

const OUTLINE = "#0b2a4a";

export const FLAG: Sprite = {
  palette: {
    O: OUTLINE,
    R: "#e0356f",
    D: "#a8164f",
    W: "#ffd0e0",
    G: "#e8eef5",
    S: "#7fb0d6",
  },
  rows: [
    "..OOOOOO....",
    "..ORRRWRRO..",
    "..ORRRRRRRO.",
    "..ORRRRRRDO.",
    "..ORRRRRDO..",
    "..OOOOODO...",
    "..OG........",
    "..OG........",
    "..OG........",
    "..OG........",
    "..OG........",
    "..OG........",
    "..OG........",
    "OOOOOOOO....",
    "OSSSSSSO....",
    "OOOOOOOO....",
  ],
};

export const CASTLE: Sprite = {
  palette: {
    O: OUTLINE,
    B: "#9aa8d6",
    L: "#c9d3f2",
    D: "#6b79b0",
    R: "#4b3fd9",
    K: "#241a6e",
    Y: "#ffc83d",
  },
  rows: [
    "...OO.....OO.....OO...",
    "...ORR....ORR....ORR..",
    "...OOO....OOO....OOO..",
    "..OLLBO..OLLBO..OLLBO.",
    "..OLLBO..OLLBO..OLLBO.",
    "..OBBDO..OBBDO..OBBDO.",
    "OOOBBDOOOOBBDOOOOBBDOO",
    "OLOLOLOLOLOLOLOLOLOLOL",
    "OLLLLLLLLLLLLLLLLLLLBO",
    "OLLLYYLLLLLLLLLLYYLLBO",
    "OLLLYYLLLLOOOOLLYYLLBO",
    "OLLLLLLLLOKKKKOLLLLLBO",
    "OLLLLLLLLOKKKKOLLLLLBO",
    "OBBBBBBBBOKKKKOBBBBBDO",
    "ODDDDDDDDOKKKKODDDDDDO",
    "OOOOOOOOOOOOOOOOOOOOOO",
  ],
};

export const CLOUD: Sprite = {
  palette: { W: "#ffffff", S: "#dff1fc" },
  rows: [
    "......WWWW..........",
    "....WWWWWWWW...WW...",
    "..WWWWWWWWWWWWWWWWW.",
    ".WWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSS",
  ],
};

export const CHECK: Sprite = {
  palette: { W: "#ffffff" },
  rows: ["......W", ".....WW", "W...WW.", "WW.WW..", ".WWW...", "..W...."],
};

export const TREE: Sprite = {
  palette: {
    O: OUTLINE,
    G: "#3fa66a",
    L: "#7fd98d",
    D: "#2a7d52",
    T: "#9a5a2b",
    t: "#6e3d1c",
  },
  rows: [
    "....OOOO....",
    "..OOGGGGOO..",
    ".OGGLLGGGGO.",
    "OGGLLGGGGGGO",
    "OGLGGGGGDGGO",
    "OGGGGGGGDDGO",
    ".OGGGDDDDGO.",
    "..OOOGDOOO..",
    "....OTTO....",
    "....OTTO....",
    "....OTtO....",
    "....OTtO....",
    "..OOOTtOOO..",
  ],
};

export const PINE: Sprite = {
  palette: {
    O: OUTLINE,
    G: "#2f9468",
    L: "#6fcf9a",
    D: "#1f6e4d",
    T: "#9a5a2b",
    t: "#6e3d1c",
  },
  rows: [
    "....OO....",
    "...OGGO...",
    "..OGLGGO..",
    "...OGGGDO.",
    "..OGLGGGDO",
    ".OGLGGGGDO",
    "OGLGGGGGDO",
    "OOOOGGOOOO",
    "...OTTO...",
    "...OTtO...",
    "...OTtO...",
    "..OOOOOO..",
  ],
};

export const SIGN: Sprite = {
  palette: {
    O: OUTLINE,
    P: "#f2c879",
    D: "#c9953f",
    T: "#9a5a2b",
    t: "#6e3d1c",
  },
  rows: [
    "OOOOOOOOOO..",
    "OPPPPPPPPPO.",
    "OPDDDDDDDDPO",
    "OPPPPPPPPPO.",
    "OOOOOOOOOO..",
    "....OTtO....",
    "....OTtO....",
    "....OTtO....",
    "....OTtO....",
    "..OOOTtOOO..",
  ],
};

export const TOWER: Sprite = {
  palette: {
    O: OUTLINE,
    R: "#e0356f",
    W: "#f4ead2",
    D: "#d3c19a",
    K: "#5a3a1c",
  },
  rows: [
    "......OOOO......",
    "....OORRRROO....",
    "...ORRRRRRRRO...",
    "..ORRRRRRRRRRO..",
    "..OOOOOOOOOOOO..",
    "...OWWWWWWWWO...",
    "...OWWWWWWWDO...",
    "...OWWOOWWWDO...",
    "...OWWOOWWWDO...",
    "...OWWWWWWWDO...",
    "..OWWWWWWWWDDO..",
    "..OWWWWWWWWWDO..",
    "..OWWWWWWWWWDO..",
    "..OWWOOOWWWWDO..",
    "..OWWOKKOWWWDO..",
    "..OWWOKKOWWWDO..",
    "..OWWOKKOWWWDO..",
    "..OWWOKKOWWWDO..",
    ".OWWWWWWWWWWDDO.",
    ".OWWWWWWWWWWWDO.",
    ".OWWWWWWWWWWWDO.",
    ".OOOOOOOOOOOOOO.",
  ],
};

export const BLADES: Sprite = {
  palette: { O: OUTLINE, W: "#f4ead2", H: "#7a4a21" },
  rows: [
    "......OOO......",
    "......OWO......",
    "......OWO......",
    "......OWO......",
    "......OWO......",
    "......OWO......",
    "OOOOOOOWOOOOOOO",
    "OWWWWWWHWWWWWWO",
    "OOOOOOOWOOOOOOO",
    "......OWO......",
    "......OWO......",
    "......OWO......",
    "......OWO......",
    "......OWO......",
    "......OOO......",
  ],
};

export const BALLOON: Sprite = {
  palette: { O: OUTLINE, R: "#e0356f", Y: "#ffc83d", B: "#9a5a2b" },
  rows: [
    "....OOOOOO....",
    "..OORRYYRROO..",
    ".ORRYYRRYYRRO.",
    "ORRYYRRYYRRYYO",
    "ORRYYRRYYRRYYO",
    "ORRYYRRYYRRYYO",
    "ORRYYRRYYRRYYO",
    "ORRYYRRYYRRYYO",
    ".ORRYYRRYYRRO.",
    "..ORYYRRYYRO..",
    "...ORYRRYRO...",
    "....OOOOOO....",
    "....O....O....",
    "....O....O....",
    "....OOOOOO....",
    "....OBBBBO....",
    "....OBBBBO....",
    "....OOOOOO....",
  ],
};

export const BIRD_UP: Sprite = {
  palette: { O: "#0b2a4a" },
  rows: ["O.......O", ".O.....O.", "..OO.OO..", "....O...."],
};
export const BIRD_DOWN: Sprite = {
  palette: { O: "#0b2a4a" },
  rows: ["....O....", "..OOOOO..", ".O..O..O.", "O...O...O"],
};

/** A floating grass island that `cells` pixels wide; scenery stands on it. */
export function makeIsland(cells: number): Sprite {
  const fill = (n: number, pattern: string) =>
    Array.from({ length: n }, (_, i) => pattern[i % pattern.length]).join("");
  const w = cells;
  return {
    palette: {
      O: OUTLINE,
      G: "#4fb872",
      L: "#8fe39a",
      D: "#b07a3f",
      E: "#8a5a2b",
    },
    rows: [
      `.${"O".repeat(w - 2)}.`,
      `O${fill(w - 2, "GGGLGGGGG")}O`,
      `O${fill(w - 2, "DDEDDDDED")}O`,
      `.O${fill(w - 4, "DDDEDDD")}O.`,
      `..O${fill(w - 6, "DEDDDD")}O..`,
      `...${"O".repeat(w - 6)}...`,
    ],
  };
}

/** Distant peaks: column heights in pixel rows, deterministic. */
export function mountainHeights(cols: number): number[] {
  const peaks: ReadonlyArray<readonly [number, number]> = [
    [10, 20],
    [32, 30],
    [56, 22],
    [80, 32],
    [104, 24],
  ];
  return Array.from({ length: cols }, (_, x) =>
    Math.max(
      3,
      Math.round(Math.max(...peaks.map(([p, h]) => h - Math.abs(x - p) * 1.1))),
    ),
  );
}

/** Rolling hill silhouette: two summed sines, deterministic. */
export function hillHeights(
  cols: number,
  base: number,
  amp: number,
  a: number,
  b: number,
): number[] {
  return Array.from({ length: cols }, (_, x) =>
    Math.round(base + amp * Math.sin(x / a) + amp * 0.5 * Math.sin(x / b + 1)),
  );
}

/** A round sun, generated from distance to the centre so it stays symmetric. */
function makeSun(size: number): Sprite {
  const mid = (size - 1) / 2;
  const rows = Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => {
      const dist = Math.hypot(x - mid, y - mid);
      if (dist > mid + 0.2) return ".";
      if (dist > mid - 1) return "O";
      return dist < mid - 3 ? "L" : "Y";
    }).join(""),
  );
  return { palette: { O: OUTLINE, Y: "#ffc83d", L: "#fff3a8" }, rows };
}
export const SUN: Sprite = makeSun(12);

/** Sun rays as merged pixel-square paths: ring `a` (long) and ring `b` (short, offset angle). */
function rayPath(offsetDeg: number, from: number, to: number): string {
  const cells: string[] = [];
  for (let k = 0; k < 8; k++) {
    const angle = ((k * 45 + offsetDeg) * Math.PI) / 180;
    for (let d = from; d <= to; d += 2) {
      const x = 20 + Math.round(Math.cos(angle) * d) - 1;
      const y = 20 + Math.round(Math.sin(angle) * d) - 1;
      cells.push(`M${x} ${y}h2v2h-2z`);
    }
  }
  return cells.join("");
}
export const RAYS_A = rayPath(0, 9, 13);
export const RAYS_B = rayPath(22.5, 9, 11);

export const AIRSHIP: Sprite = {
  palette: {
    O: OUTLINE,
    R: "#4b3fd9",
    L: "#8f86f2",
    Y: "#ffc83d",
    B: "#9a5a2b",
    W: "#f4ead2",
    F: "#e0356f",
  },
  rows: [
    "......OOOOOOOOOOOOOOOO......",
    "....OOLLLLLLLLLLLLLLLLOO....",
    "...OLLLLLLLLLLLLLLLLLLLLO...",
    "OOOLLLLLLLLLLLLLLLLLLLLLLOO.",
    "OFFRRRRRRRRRRRRRRRRRRRRRRRRO",
    "OFFRYYRRYYRRYYRRYYRRYYRRRRRO",
    "OOORRRRRRRRRRRRRRRRRRRRRRROO",
    "...ORRRRRRRRRRRRRRRRRRRRRRO.",
    "....OOORRRRRRRRRRRRRRRROOO..",
    "......OOOOOOOOOOOOOOOOOO....",
    "..........OBBBBBBBBO........",
    "..........OWWOWWOWWO........",
    "..........OOOOOOOOOO........",
  ],
};

export const SMOKE: Sprite = {
  palette: { W: "#ffffff", S: "#d6e4f0" },
  rows: [".WWW.", "WWWWW", "WWWWS", ".SSS."],
};

export const SPARKLE: Sprite = {
  palette: { W: "#ffffff" },
  rows: [".W.", "WWW", ".W."],
};

export const FLOWER: Sprite = {
  palette: { O: OUTLINE, P: "#ff7aa8", Y: "#ffd84a", G: "#2f9468" },
  rows: [".P.P.", "PPYPP", ".PPP.", "..G..", "..G..", ".GG.."],
};

export const BUSH: Sprite = {
  palette: {
    O: OUTLINE,
    G: "#3fa66a",
    L: "#7fd98d",
    D: "#2a7d52",
    R: "#e0356f",
  },
  rows: [
    "..OOOO..",
    ".OGLLGO.",
    "OGGRGGGO",
    "OGGGGRGO",
    "ODDDDDDO",
    ".OOOOOO.",
  ],
};

/** Second frame of the flag: the cloth rippled, pole and base unchanged. */
export const FLAG_WAVE: Sprite = {
  palette: FLAG.palette,
  rows: [
    "..OOOOOOO...",
    "..ORRWRRRRO.",
    "..ORRRRRRRRO",
    "..ORRRRRRDO.",
    "..ORRRRDO...",
    "..OOOODO....",
    ...FLAG.rows.slice(6),
  ],
};

const PENNANT_PALETTE = { O: OUTLINE, R: "#e0356f" };
export const PENNANT_A: Sprite = {
  palette: PENNANT_PALETTE,
  rows: ["OOO.", "ORRO", "OOO."],
};
export const PENNANT_B: Sprite = {
  palette: PENNANT_PALETTE,
  rows: [".OOO", "ORRO", ".OO."],
};
