import { isValidElement, type ReactNode } from "react";

// A pixel scene is thousands of 1px rectangles. Browsers handle that badly,
// so plain rects of the same colour are folded into a single <path>.
// Rects that carry a class or style (animated ones) are left untouched.
//
// Order caveat: merged paths come first, in order of each colour's first
// appearance, followed by the untouched nodes. Only merge a layer whose
// different-coloured rects do not overlap, or whose overlap order is
// already "first colour underneath".

const PLAIN_PROPS = new Set(["x", "y", "width", "height", "fill", "opacity"]);

export function mergeRects(nodes: readonly ReactNode[], id: string): ReactNode[] {
  const paths = new Map<string, string>();
  const rest: ReactNode[] = [];

  for (const node of nodes) {
    if (isValidElement(node) && node.type === "rect") {
      const props = node.props as Record<string, unknown>;
      const isPlain = Object.entries(props).every(
        ([name, value]) => value === undefined || PLAIN_PROPS.has(name),
      );
      if (isPlain) {
        const { x, y, width, height, fill, opacity } = props as {
          x: number;
          y: number;
          width: number;
          height: number;
          fill: string;
          opacity?: number;
        };
        const key = `${fill}|${opacity ?? ""}`;
        const segment = `M${x} ${y}h${width}v${height}h${-width}z`;
        paths.set(key, (paths.get(key) ?? "") + segment);
        continue;
      }
    }
    rest.push(node);
  }

  const merged = [...paths].map(([key, d]) => {
    const [fill, opacity] = key.split("|");
    return (
      <path
        key={`${id}-${key}`}
        d={d}
        fill={fill}
        opacity={opacity === "" ? undefined : Number(opacity)}
      />
    );
  });
  return [...merged, ...rest];
}
