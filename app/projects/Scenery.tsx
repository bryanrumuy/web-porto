import type { CSSProperties, ReactNode } from "react";
import { PixelSprite } from "../components/PixelSprite";
import { AVATAR } from "../components/sprites";
import type { Sprite } from "../components/sprites";
import {
  BLADES,
  BUSH,
  CASTLE,
  FLAG,
  FLAG_WAVE,
  FLOWER,
  PENNANT_A,
  PENNANT_B,
  PINE,
  SIGN,
  SMOKE,
  TOWER,
  TREE,
  makeIsland,
} from "./art";

const ISLAND_SMALL = makeIsland(16);
const ISLAND_LARGE = makeIsland(28);

/** Scenery (or a marker) standing on a small floating grass island. */
export function Perch({
  children,
  size = "small",
}: {
  children: ReactNode;
  size?: "small" | "large";
}) {
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

/** Two frames of the same sprite, swapped in steps so the cloth appears to wave. */
function Waving({
  a,
  b,
  scale,
  className = "",
  style,
}: {
  a: Sprite;
  b: Sprite;
  scale: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`swap ${className}`} style={style}>
      <PixelSprite sprite={a} scale={scale} className="swap-a" />
      <PixelSprite sprite={b} scale={scale} className="swap-b" />
    </span>
  );
}

const PENNANT_COLUMNS = [6, 13] as const;

/** Level marker: the flag waves, the castle flies pennants, the tower puffs smoke. */
export function Marker({ sprite, scale }: { sprite: Sprite; scale: number }) {
  if (sprite === FLAG) return <Waving a={FLAG} b={FLAG_WAVE} scale={scale} />;
  if (sprite === CASTLE) {
    return (
      <span className="marker-wrap">
        <PixelSprite sprite={sprite} scale={scale} />
        {PENNANT_COLUMNS.map((col, i) => (
          <Waving
            key={col}
            a={PENNANT_A}
            b={PENNANT_B}
            scale={scale}
            className="pennant"
            style={
              { left: col * scale, "--d": `${i * -0.3}s` } as CSSProperties
            }
          />
        ))}
      </span>
    );
  }
  if (sprite === TOWER) {
    return (
      <span className="marker-wrap">
        <PixelSprite sprite={sprite} scale={scale} />
        <span className="smoke" style={{ left: 9 * scale }}>
          {[0, 1, 2].map((n) => (
            <PixelSprite
              key={n}
              sprite={SMOKE}
              scale={3}
              className="smoke-puff"
              style={{ animationDelay: `${n * -0.9}s` }}
            />
          ))}
        </span>
      </span>
    );
  }
  return <PixelSprite sprite={sprite} scale={scale} />;
}

function Windmill() {
  return (
    <div className="windmill">
      <PixelSprite sprite={TOWER} scale={5} />
      <PixelSprite sprite={BLADES} scale={5} className="windmill-blades" />
    </div>
  );
}

function Flowers({ delay }: { delay: number }) {
  return (
    <PixelSprite
      sprite={FLOWER}
      scale={3}
      className="flower"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

/** Trail scenery for each stop, shown on the side opposite the card. */
export function Deco({ kind }: { kind: "grove" | "mill" | "crossing" }) {
  return (
    <div aria-hidden="true" className="stop-deco">
      <Perch size="large">
        {kind === "grove" && (
          <>
            <Flowers delay={0} />
            <PixelSprite sprite={TREE} scale={6} />
            <PixelSprite sprite={PINE} scale={5} />
            <PixelSprite sprite={BUSH} scale={4} />
            <PixelSprite sprite={TREE} scale={5} />
          </>
        )}
        {kind === "mill" && (
          <>
            <PixelSprite sprite={PINE} scale={5} />
            <Flowers delay={-0.5} />
            <Windmill />
            <PixelSprite sprite={BUSH} scale={3} />
            <PixelSprite sprite={TREE} scale={4} />
          </>
        )}
        {kind === "crossing" && (
          <>
            <PixelSprite sprite={PINE} scale={6} />
            <Flowers delay={-0.9} />
            <PixelSprite sprite={SIGN} scale={5} />
            <PixelSprite sprite={BUSH} scale={4} />
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

/** One winding stretch of the dotted trail between two stops (desktop), walked by a tiny hero. */
export function Bend({ index }: { index: number }) {
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
          const x =
            BEND_CENTER +
            Math.round(
              BEND_AMPLITUDE * Math.sin(((y + 0.5) / BEND_ROWS) * Math.PI * 2),
            );
          return (
            <rect
              key={y}
              x={x + 0.125}
              y={y + 0.125}
              width={0.75}
              height={0.75}
              style={{ fill: "currentColor" }}
            />
          );
        })}
      </svg>
      <span
        className="walker"
        style={{ animationDelay: `${-(index % 3) * 3}s` }}
      >
        <PixelSprite sprite={AVATAR} scale={2} className="walker-sprite" />
      </span>
    </li>
  );
}
