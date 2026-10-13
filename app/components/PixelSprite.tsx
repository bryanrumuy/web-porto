import type { CSSProperties } from "react";
import type { Sprite } from "./sprites";

type PixelSpriteProps = {
  sprite: Sprite;
  scale?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
};

export type Run = { x: number; length: number; key: string };

const TRANSPARENT = ".";

// Merge horizontal runs of the same colour so a sprite is a few rects, not one per pixel.
export function toRuns(row: string): Run[] {
  const runs: Run[] = [];
  for (let x = 0; x < row.length; x++) {
    const key = row[x];
    if (key === TRANSPARENT) continue;
    const last = runs[runs.length - 1];
    if (last && last.key === key && last.x + last.length === x) {
      runs[runs.length - 1] = { ...last, length: last.length + 1 };
    } else {
      runs.push({ x, length: 1, key });
    }
  }
  return runs;
}

export function PixelSprite({
  sprite,
  scale = 4,
  label,
  className,
  style,
}: PixelSpriteProps) {
  const height = sprite.rows.length;
  const width = sprite.rows[0]?.length ?? 0;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={style}
    >
      {sprite.rows.flatMap((row, y) =>
        toRuns(row).map((run) => (
          <rect
            key={`${y}-${run.x}`}
            x={run.x}
            y={y}
            width={run.length}
            height={1}
            style={{ fill: sprite.palette[run.key] }}
          />
        )),
      )}
    </svg>
  );
}
