import type { CSSProperties } from "react";
import { PixelSprite } from "../components/PixelSprite";
import {
  CLOUDS,
  FAR_HILLS,
  GROUND_EDGE,
  GROUND_TEXTURE,
  MID_HILLS,
  SCENE_H,
  SHADE_0,
  SHADE_1,
  SHADE_2,
  SUN,
  TILE,
  TREES,
  TUFTS,
  WALK_A,
  WALK_B,
  type Rect,
} from "./art";

type LayerProps = {
  duration: number;
  groups: readonly { rects: readonly Rect[]; fill: string }[];
};

function Layer({ duration, groups }: LayerProps) {
  const tile = (offset: number) =>
    groups.map((group, g) =>
      group.rects.map((r, i) => (
        <rect
          key={`${offset}-${g}-${i}`}
          x={r.x + offset}
          y={r.y}
          width={r.w}
          height={r.h}
          fill={group.fill}
        />
      )),
    );

  return (
    <div
      className="gb-layer"
      style={{ "--dur": `${duration}s` } as CSSProperties}
      aria-hidden
    >
      <svg viewBox={`0 0 ${TILE * 2} ${SCENE_H}`} shapeRendering="crispEdges">
        {tile(0)}
        {tile(TILE)}
      </svg>
    </div>
  );
}

/** The LCD diorama: four parallax layers, a sun and a walking avatar. */
export function LcdScene() {
  return (
    <div
      className="gb-scene"
      role="img"
      aria-label="Pixel scene: Bryan walking through green hills and pine trees"
    >
      <div className="gb-sun" aria-hidden>
        <PixelSprite sprite={SUN} scale={1} className="gb-px" />
      </div>
      <Layer duration={90} groups={[{ rects: CLOUDS, fill: SHADE_2 }]} />
      <Layer duration={150} groups={[{ rects: FAR_HILLS, fill: SHADE_2 }]} />
      <Layer
        duration={80}
        groups={[
          { rects: MID_HILLS, fill: SHADE_1 },
          { rects: TREES, fill: SHADE_0 },
        ]}
      />
      <Layer
        duration={30}
        groups={[
          { rects: [{ x: 0, y: 48, w: TILE, h: 8 }], fill: SHADE_2 },
          { rects: GROUND_TEXTURE, fill: SHADE_1 },
          { rects: GROUND_EDGE, fill: SHADE_0 },
          { rects: TUFTS, fill: SHADE_1 },
        ]}
      />
      <div className="gb-walker" aria-hidden>
        <PixelSprite sprite={WALK_A} scale={1} className="gb-px gb-frame-a" />
        <PixelSprite sprite={WALK_B} scale={1} className="gb-px gb-frame-b" />
      </div>
    </div>
  );
}

