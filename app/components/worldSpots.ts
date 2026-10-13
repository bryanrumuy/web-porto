// Where things sit on the hub map, as percentages of the map box.
// Wide screens use (x, y); phones use the taller layout (mx, my).
export type Spot = { x: number; y: number; mx: number; my: number };

export const START: Spot = { x: 8, y: 84, mx: 8, my: 7 };

export const SPOTS: Readonly<Record<string, Spot>> = {
  "/about": { x: 21, y: 60, mx: 34, my: 24 },
  "/skills": { x: 43, y: 36, mx: 68, my: 44 },
  "/projects": { x: 65, y: 66, mx: 34, my: 66 },
  "/contact": { x: 85, y: 38, mx: 68, my: 86 },
};

export const TRAIL: readonly string[] = ["/about", "/skills", "/projects", "/contact"];
