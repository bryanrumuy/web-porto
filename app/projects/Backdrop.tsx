import type { CSSProperties } from "react";
import { PixelSprite } from "../components/PixelSprite";
import {
  AIRSHIP,
  BALLOON,
  BIRD_DOWN,
  BIRD_UP,
  CLOUD,
  hillHeights,
  mountainHeights,
  RAYS_A,
  RAYS_B,
  SPARKLE,
  SUN,
} from "./art";

type Drift = {
  x: string;
  top: string;
  seconds: number;
  steps: number;
  delay: number;
};

const MOUNTAINS = mountainHeights(120);
const HILLS_FAR = hillHeights(120, 9, 4, 7, 3);
const HILLS_NEAR = hillHeights(120, 5, 3, 5, 2.3);

const SLOW_CLOUDS: Drift[] = [
  { x: "12vw", top: "6%", seconds: 220, steps: 160, delay: -60 },
  { x: "58vw", top: "22%", seconds: 260, steps: 160, delay: -140 },
  { x: "30vw", top: "46%", seconds: 240, steps: 160, delay: -20 },
  { x: "78vw", top: "66%", seconds: 250, steps: 160, delay: -190 },
];
const FAR_CLOUDS: Drift[] = [
  { x: "40vw", top: "3%", seconds: 420, steps: 200, delay: -150 },
  { x: "8vw", top: "28%", seconds: 380, steps: 200, delay: -300 },
  { x: "66vw", top: "52%", seconds: 400, steps: 200, delay: -60 },
];
const FAST_CLOUDS: Drift[] = [
  { x: "70vw", top: "13%", seconds: 120, steps: 100, delay: -40 },
  { x: "20vw", top: "36%", seconds: 140, steps: 100, delay: -90 },
  { x: "62vw", top: "56%", seconds: 130, steps: 100, delay: -10 },
];

function driftStyle({ x, top, seconds, steps, delay }: Drift): CSSProperties {
  return {
    "--x": x,
    top,
    animationDuration: `${seconds}s`,
    animationDelay: `${delay}s`,
    animationTimingFunction: `steps(${steps}, end)`,
  } as CSSProperties;
}

function Skyline({
  heights,
  color,
  snow,
  rowPx,
  className,
}: {
  heights: readonly number[];
  color: string;
  snow?: string;
  rowPx: number;
  className: string;
}) {
  const max = Math.max(...heights);
  return (
    <svg
      viewBox={`0 0 ${heights.length} ${max}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      className={`skyline ${className}`}
      style={{ height: max * rowPx }}
    >
      {heights.map((height, x) => {
        const line = max * 0.62;
        const cap =
          snow && height > line
            ? Math.min(3, Math.round((height - line) / 2) + 1)
            : 0;
        return (
          <g key={x}>
            <rect
              x={x}
              y={max - height}
              width={1}
              height={height}
              style={{ fill: color }}
            />
            {cap > 0 && (
              <rect
                x={x}
                y={max - height}
                width={1}
                height={cap}
                style={{ fill: snow }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Bird({ left, top }: { left: number; top: number }) {
  return (
    <span className="bird" style={{ left, top }}>
      <PixelSprite sprite={BIRD_UP} scale={4} className="bird-a" />
      <PixelSprite sprite={BIRD_DOWN} scale={4} className="bird-b" />
    </span>
  );
}

const GLINTS = [
  { left: "6%", bottom: 34, delay: 0 },
  { left: "21%", bottom: 12, delay: -0.9 },
  { left: "37%", bottom: 44, delay: -1.7 },
  { left: "54%", bottom: 18, delay: -0.4 },
  { left: "71%", bottom: 40, delay: -1.3 },
  { left: "88%", bottom: 14, delay: -2.1 },
];

function Sun() {
  return (
    <div className="sun">
      <svg
        viewBox="0 0 40 40"
        width={160}
        height={160}
        shapeRendering="crispEdges"
        className="sun-rays"
      >
        <path d={RAYS_A} className="rays-a" />
        <path d={RAYS_B} className="rays-b" />
      </svg>
      <PixelSprite sprite={SUN} scale={4} className="sun-disc" />
    </div>
  );
}

/** Parallax sky: peaks, hills, two cloud speeds, a balloon and a flock. Decorative. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="map-sky">
      <Sun />
      {FAR_CLOUDS.map((c) => (
        <span key={c.top} className="fly cloud-far" style={driftStyle(c)}>
          <PixelSprite sprite={CLOUD} scale={2} />
        </span>
      ))}
      {SLOW_CLOUDS.map((c) => (
        <span key={c.top} className="fly" style={driftStyle(c)}>
          <PixelSprite sprite={CLOUD} scale={3} />
        </span>
      ))}
      <Skyline
        heights={MOUNTAINS}
        color="#8aa6dc"
        snow="#f4f9ff"
        rowPx={9}
        className="sky-mountains"
      />
      {FAST_CLOUDS.map((c) => (
        <span key={c.top} className="fly" style={driftStyle(c)}>
          <PixelSprite sprite={CLOUD} scale={6} />
        </span>
      ))}
      <span
        className="fly"
        style={driftStyle({
          x: "44vw",
          top: "9%",
          seconds: 300,
          steps: 220,
          delay: -90,
        })}
      >
        <PixelSprite sprite={BALLOON} scale={6} className="balloon-sway" />
      </span>
      <span
        className="fly"
        style={driftStyle({
          x: "10vw",
          top: "19%",
          seconds: 360,
          steps: 240,
          delay: -200,
        })}
      >
        <span className="airship-bob">
          <PixelSprite sprite={AIRSHIP} scale={5} />
        </span>
      </span>
      <span
        className="fly flock"
        style={driftStyle({
          x: "24vw",
          top: "31%",
          seconds: 170,
          steps: 220,
          delay: -50,
        })}
      >
        <span className="flock-bob">
          <Bird left={0} top={12} />
          <Bird left={44} top={0} />
          <Bird left={86} top={20} />
        </span>
      </span>
      <Skyline
        heights={HILLS_FAR}
        color="#79cdb0"
        rowPx={9}
        className="sky-hills-far"
      />
      <Skyline
        heights={HILLS_NEAR}
        color="#3f9f78"
        rowPx={9}
        className="sky-hills-near"
      />
      {GLINTS.map((g) => (
        <span
          key={g.left}
          className="glint"
          style={{
            left: g.left,
            bottom: g.bottom,
            animationDelay: `${g.delay}s`,
          }}
        >
          <PixelSprite sprite={SPARKLE} scale={3} />
        </span>
      ))}
    </div>
  );
}
