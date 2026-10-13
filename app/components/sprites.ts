export type Sprite = {
  readonly rows: readonly string[];
  readonly palette: Readonly<Record<string, string>>;
};

const OUTLINE = "#1b1b3a";

const AVATAR_PALETTE = {
  O: OUTLINE,
  H: "#2b2b4a",
  S: "#e0a874",
  s: "#c28a58",
  G: OUTLINE,
  W: "#ffffff",
  K: "#000000",
  M: "#9a3b32",
  V: "#7c4dff",
  v: "#5a34c9",
  P: "#3b3f7a",
  B: "#ececf8",
} as const;

export const AVATAR: Sprite = {
  palette: AVATAR_PALETTE,
  rows: [
    "....OOOOOOOO....",
    "...OHHHHHHHHO...",
    "..OHHHHHHHHHHO..",
    "..OHHSSSSSSHHO..",
    "..OSGGSSSSGGSO..",
    "..OGWKGSSGKWGO..",
    "..OSGGSSSSGGSO..",
    "..OSSSMMMMSSSO..",
    "...OSSSSSSSSO...",
    "....OOSSSSOO....",
    "...OVVVvvVVVO...",
    ".OVVVVVVVVVVVVO.",
    "OVVVVVVvvVVVVVVO",
    "OVVOVVVVVVVVOVVO",
    "OSSOVVVVVVVVOSSO",
    "...OvvvvvvvvO...",
    "...OPPPOOPPPO...",
    "...OPPPOOPPPO...",
    "..OBBBBOOBBBBO..",
    "..OOOOOOOOOOOO..",
  ],
};

export const AVATAR_BLINK: Sprite = {
  palette: AVATAR_PALETTE,
  rows: AVATAR.rows.map((row, index) =>
    index === 5 ? "..OGKKGSSGKKGO.." : row,
  ),
};

export const COIN: Sprite = {
  palette: { O: OUTLINE, Y: "#ffc83d", W: "#fff3b0", D: "#d98e1f" },
  rows: [
    "..OOOO..",
    ".OYYYYO.",
    "OYWYYYYO",
    "OYWYDDYO",
    "OYYYDDYO",
    "OYYYYYDO",
    ".ODDDDO.",
    "..OOOO..",
  ],
};

export const HEART: Sprite = {
  palette: { O: OUTLINE, P: "#ff4f8b", W: "#ffd0e0", D: "#c42565" },
  rows: [
    "........",
    ".OO..OO.",
    "OPWOOPPO",
    "OPWPPPPO",
    "OPPPPPDO",
    ".OPPPDO.",
    "..OPDO..",
    "...OO...",
  ],
};

export const STAR: Sprite = {
  palette: { O: OUTLINE, Y: "#ffd23f", W: "#fff6bf" },
  rows: [
    "...OO...",
    "..OYYO..",
    "OOOYYOOO",
    "OYWYYYYO",
    ".OYYYYO.",
    ".OYYYYO.",
    "OYYOOYYO",
    "OOO..OOO",
  ],
};

export const TROPHY: Sprite = {
  palette: {
    O: OUTLINE,
    Y: "#ffc83d",
    W: "#fff3b0",
    D: "#d98e1f",
    B: "#8a5a2b",
  },
  rows: [
    ".OOOOOO.",
    "OOYWYYOO",
    "O.OYYDO.",
    "..OYYDO.",
    "...OYO..",
    "...OYO..",
    ".OBBBBO.",
    ".OOOOOO.",
  ],
};

export const SCROLL: Sprite = {
  palette: { O: OUTLINE, T: "#c99a52", P: "#f6e3b0", K: "#8a5a2b" },
  rows: [
    ".OOOOOO.",
    "OTTTTTTO",
    ".OPPPPO.",
    ".OPKKPO.",
    ".OPPPPO.",
    ".OPKKPO.",
    "OTTTTTTO",
    ".OOOOOO.",
  ],
};

const ICON_PALETTE = {
  O: OUTLINE,
  k: "#262650",
  a: "var(--violet)",
  b: "var(--cyan)",
  c: "var(--amber)",
} as const;

export const ICON_CHIP: Sprite = {
  palette: ICON_PALETTE,
  rows: [
    "...cc..cc...",
    "..OOOOOOOO..",
    "..OaaaaaaO..",
    "ccOabbbbaOcc",
    "ccOabccbaOcc",
    "..OabccbaO..",
    "..OabbbbaO..",
    "ccOaaaaaaOcc",
    "ccOaaaaaaOcc",
    "..OaaaaaaO..",
    "..OOOOOOOO..",
    "...cc..cc...",
  ],
};

export const ICON_CODE: Sprite = {
  palette: ICON_PALETTE,
  rows: [
    "OOOOOOOOOOOO",
    "OaaaaaaaaaaO",
    "OkkkkkkkkkkO",
    "OkkbkkckbkkO",
    "OkbkkkckkbkO",
    "OkbkkckkkbkO",
    "OkkbkckkbkkO",
    "OkkkkkkkkkkO",
    "OOOOOOOOOOOO",
    ".....OaaO...",
    "...OOaaOO...",
    "..OaaaaaaO..",
  ],
};

export const ICON_DATABASE: Sprite = {
  palette: ICON_PALETTE,
  rows: [
    "..OOOOOOOO..",
    ".ObbbbbbbbO.",
    ".OaaaaaaaaO.",
    ".OaaaaaacaO.",
    ".OOOOOOOOOO.",
    ".ObbbbbbbbO.",
    ".OaaaaaaaaO.",
    ".OaaaaaacaO.",
    ".OOOOOOOOOO.",
    ".ObbbbbbbbO.",
    ".OaaaaaacaO.",
    "..OOOOOOOO..",
  ],
};
