import type { CSSProperties } from "react";
import {
  CLOUDS,
  CLOUDS_NEAR,
  FAR_HILLS,
  FLOWER_BLOOMS,
  FLOWER_STEMS,
  FOREGROUND_DARK,
  FOREGROUND_MID,
  GROUND_EDGE,
  GROUND_TEXTURE,
  MID_HILLS,
  SCENE_H,
  SHADE_0,
  SHADE_1,
  SHADE_2,
  TILE,
  TREES,
  TUFTS,
  type Rect,
} from "./art";
import { Birds, Leaves, Night, Rabbit, Sun, Walker } from "./SceneActors";

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

/** The LCD diorama: parallax layers, a day/night cycle, critters and a walking avatar. */
export function LcdScene() {
  return (
    <div
      className="gb-scene"
      role="img"
      aria-label="Pixel scene: Bryan walking through green hills and pine trees"
    >
      <Sun />
      <Layer duration={90} groups={[{ rects: CLOUDS, fill: SHADE_2 }]} />
      <Layer duration={55} groups={[{ rects: CLOUDS_NEAR, fill: SHADE_2 }]} />
      <Layer duration={150} groups={[{ rects: FAR_HILLS, fill: SHADE_2 }]} />
      <Birds />
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
          { rects: FLOWER_STEMS, fill: SHADE_1 },
          { rects: FLOWER_BLOOMS, fill: SHADE_0 },
        ]}
      />
      <Night />
      <Rabbit />
      <Walker />
      <Layer
        duration={14}
        groups={[
          { rects: FOREGROUND_DARK, fill: SHADE_0 },
          { rects: FOREGROUND_MID, fill: SHADE_1 },
        ]}
      />
      <Leaves />
    </div>
  );
}
