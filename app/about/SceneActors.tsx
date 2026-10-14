import type { CSSProperties } from "react";
import { PixelSprite } from "../components/PixelSprite";
import type { Sprite } from "../components/sprites";
import {
  SCENE_H,
  SHADE_3,
  STARS_A,
  STARS_B,
  SUN,
  TILE,
  WALK_A,
  WALK_B,
} from "./art";
import { BIRD_A, BIRD_B, LEAF, MOON, RABBIT } from "./critters";

type SpriteBoxProps = { sprite: Sprite; className?: string };

/** A sprite sized in scene pixels (`--s`), so it scales with the LCD. */
function SpriteBox({ sprite, className = "" }: SpriteBoxProps) {
  const style = {
    "--w": sprite.rows[0].length,
    "--h": sprite.rows.length,
  } as CSSProperties;
  return (
    <span className={`gb-spr ${className}`} style={style} aria-hidden>
      <PixelSprite sprite={sprite} scale={1} />
    </span>
  );
}

const LEAVES = [
  { left: 14, delay: -2, dur: 9 },
  { left: 38, delay: -7, dur: 11 },
  { left: 63, delay: -4, dur: 10 },
  { left: 86, delay: -9, dur: 12 },
];

const FIREFLIES = [
  { x: 22, y: 38, delay: 0 },
  { x: 54, y: 33, delay: -1.2 },
  { x: 91, y: 40, delay: -2.1 },
];

/** Sun that sets behind the hills; the matching night sky lives in Night. */
export function Sun() {
  return (
    <div className="gb-sun" aria-hidden>
      <SpriteBox sprite={SUN} />
    </div>
  );
}

/** Night wash, moon, stars and fireflies that fade in with the day cycle. */
export function Night() {
  return (
    <div className="gb-night" aria-hidden>
      <div className="gb-dusk" />
      <div className="gb-moon">
        <SpriteBox sprite={MOON} />
      </div>
      <svg
        className="gb-stars"
        viewBox={`0 0 ${TILE} ${SCENE_H}`}
        shapeRendering="crispEdges"
      >
        <g className="gb-twinkle-a" fill={SHADE_3}>
          {STARS_A.map((r) => (
            <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={1} height={1} />
          ))}
        </g>
        <g className="gb-twinkle-b" fill={SHADE_3}>
          {STARS_B.map((r) => (
            <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={1} height={1} />
          ))}
        </g>
      </svg>
      {FIREFLIES.map((f) => (
        <span
          key={f.x}
          className="gb-firefly"
          style={
            {
              "--x": f.x,
              "--y": f.y,
              "--delay": `${f.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Two birds flapping across the sky. */
export function Birds() {
  return (
    <>
      <div className="gb-track gb-bird-track" aria-hidden>
        <div className="gb-bird" style={{ "--top": 6 } as CSSProperties}>
          <SpriteBox sprite={BIRD_A} className="gb-flap-a" />
          <SpriteBox sprite={BIRD_B} className="gb-flap-b" />
        </div>
        <div
          className="gb-bird gb-bird-2"
          style={{ "--top": 12 } as CSSProperties}
        >
          <SpriteBox sprite={BIRD_A} className="gb-flap-a" />
          <SpriteBox sprite={BIRD_B} className="gb-flap-b" />
        </div>
      </div>
    </>
  );
}

/** A rabbit that hops across the ground now and then. */
export function Rabbit() {
  return (
    <div className="gb-track gb-rabbit-track" aria-hidden>
      <div className="gb-rabbit">
        <SpriteBox sprite={RABBIT} />
      </div>
    </div>
  );
}

/** Leaves drifting down through the scene. */
export function Leaves() {
  return (
    <>
      {LEAVES.map((leaf) => (
        <span
          key={leaf.left}
          className="gb-leaf"
          style={
            {
              "--left": leaf.left,
              "--delay": `${leaf.delay}s`,
              "--dur": `${leaf.dur}s`,
            } as CSSProperties
          }
          aria-hidden
        >
          <SpriteBox sprite={LEAF} />
        </span>
      ))}
    </>
  );
}

/** The avatar: shadow, dust puffs, a periodic hop and a two-frame walk cycle. */
export function Walker() {
  return (
    <div className="gb-walker-pos" aria-hidden>
      <span className="gb-shadow" />
      <span className="gb-dust gb-dust-1" />
      <span className="gb-dust gb-dust-2" />
      <div className="gb-walker-hop">
        <div className="gb-walker">
          <PixelSprite sprite={WALK_A} scale={1} className="gb-px gb-frame-a" />
          <PixelSprite sprite={WALK_B} scale={1} className="gb-px gb-frame-b" />
        </div>
      </div>
    </div>
  );
}
