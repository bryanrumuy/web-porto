import { toRuns } from "../components/PixelSprite";
import type { Sprite } from "../components/sprites";

type MergedSpriteProps = {
  sprite: Sprite;
  scale?: number;
  className?: string;
};

/** Pixel sprite drawn as one <path> per colour (class `px-<key>` lets CSS animate a layer). */
export function MergedSprite({
  sprite,
  scale = 4,
  className,
}: MergedSpriteProps) {
  const height = sprite.rows.length;
  const width = sprite.rows[0]?.length ?? 0;
  const paths = new Map<string, string>();

  sprite.rows.forEach((row, y) => {
    for (const run of toRuns(row)) {
      const segment = `M${run.x} ${y}h${run.length}v1h-${run.length}z`;
      paths.set(run.key, (paths.get(run.key) ?? "") + segment);
    }
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      {[...paths].map(([key, d]) => (
        <path
          key={key}
          d={d}
          className={`px-${key}`}
          style={{ fill: sprite.palette[key] }}
        />
      ))}
    </svg>
  );
}
