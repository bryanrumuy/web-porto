import type { ReactNode } from "react";
import { PixelSprite } from "../components/PixelSprite";
import { BLADES, PINE, SIGN, TOWER, TREE, makeIsland } from "./art";

const ISLAND_SMALL = makeIsland(16);
const ISLAND_LARGE = makeIsland(28);

/** Scenery (or a marker) standing on a small floating grass island. */
export function Perch({ children, size = "small" }: { children: ReactNode; size?: "small" | "large" }) {
  return (
    <div className="perch">
      <div className="perch-items">{children}</div>
      <PixelSprite
        sprite={size === "large" ? ISLAND_LARGE : ISLAND_SMALL}
        scale={4}
        className="perch-island"
      />
    </div>
  );
}

function Windmill() {
  return (
    <div className="windmill">
      <PixelSprite sprite={TOWER} scale={5} />
      <PixelSprite sprite={BLADES} scale={5} className="windmill-blades" />
    </div>
  );
}

/** Trail scenery for each stop, shown on the side opposite the card. */
export function Deco({ kind }: { kind: "grove" | "mill" | "crossing" }) {
  return (
    <div aria-hidden="true" className="stop-deco">
      <Perch size="large">
        {kind === "grove" && (
          <>
            <PixelSprite sprite={TREE} scale={6} />
            <PixelSprite sprite={PINE} scale={5} />
            <PixelSprite sprite={TREE} scale={5} />
          </>
        )}
        {kind === "mill" && (
          <>
            <PixelSprite sprite={PINE} scale={5} />
            <Windmill />
            <PixelSprite sprite={TREE} scale={4} />
          </>
        )}
        {kind === "crossing" && (
          <>
            <PixelSprite sprite={PINE} scale={6} />
            <PixelSprite sprite={SIGN} scale={5} />
            <PixelSprite sprite={TREE} scale={5} />
          </>
        )}
      </Perch>
    </div>
  );
}

const BEND_ROWS = 18;
const BEND_AMPLITUDE = 4;
const BEND_CENTER = BEND_AMPLITUDE + 1;

/** One winding stretch of the dotted trail between two stops (desktop). */
export function Bend() {
  const width = BEND_CENTER * 2 + 1;
  return (
    <li aria-hidden="true" className="bend">
      <svg
        viewBox={`0 0 ${width} ${BEND_ROWS}`}
        width={width * 8}
        height={BEND_ROWS * 8}
        shapeRendering="crispEdges"
      >
        {Array.from({ length: BEND_ROWS }, (_, y) => {
          const x = BEND_CENTER + Math.round(BEND_AMPLITUDE * Math.sin(((y + 0.5) / BEND_ROWS) * Math.PI * 2));
          return (
            <rect key={y} x={x + 0.125} y={y + 0.125} width={0.75} height={0.75} style={{ fill: "currentColor" }} />
          );
        })}
      </svg>
    </li>
  );
}
