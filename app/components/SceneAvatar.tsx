"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { toRuns } from "./PixelSprite";
import { AVATAR, AVATAR_BLINK, type Sprite } from "./sprites";

const SPRITE_WIDTH = AVATAR.rows[0].length;
const SPRITE_HEIGHT = AVATAR.rows.length;
const MIN_X = 4;
const MAX_X = 300;
const STEP_UNITS = 2;
const TICK_MS = 70;
const KEY_NUDGE = 14;
const BLINK_EVERY_MS = 3200;
const BLINK_FOR_MS = 160;
const GREETING_MS = 4500;
const BUBBLE_WIDTH = 60;
const BUBBLE_HEIGHT = 8;
const RIM = "#fff4e0";
const HIT_TOP = 146;
const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 180;
const RIM_OFFSETS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;

// Two walking poses: one foot lifted, then the other. Only the legs change.
const LEFT_FOOT_UP = [
  "...OBBBBOPPPO...",
  "...OOOOOOPPPO...",
  "........OBBBBO..",
  "........OOOOOO..",
];
const RIGHT_FOOT_UP = [
  "...OPPPOBBBBO...",
  "...OPPPOOOOOO...",
  "..OBBBBO........",
  "..OOOOOO........",
];

function withLegs(legs: readonly string[]): Sprite {
  return {
    palette: AVATAR.palette,
    rows: [...AVATAR.rows.slice(0, 16), ...legs],
  };
}

// A pale 1px rim around the sprite so the dark outline never melts into the city.
function framed(id: string, sprite: Sprite): ReactNode[] {
  const silhouette = (dx: number, dy: number) =>
    sprite.rows.flatMap((row, y) =>
      toRuns(row).map((run) => (
        <rect
          key={`${id}-rim-${dx}-${dy}-${y}-${run.x}`}
          x={run.x + dx}
          y={y + dy}
          width={run.length}
          height={1}
          fill={RIM}
        />
      )),
    );
  const body = sprite.rows.flatMap((row, y) =>
    toRuns(row).map((run) => (
      <rect
        key={`${id}-${y}-${run.x}`}
        x={run.x}
        y={y}
        width={run.length}
        height={1}
        style={{ fill: sprite.palette[run.key] }}
      />
    )),
  );
  return [...RIM_OFFSETS.flatMap(([dx, dy]) => silhouette(dx, dy)), ...body];
}

const FRAMES = {
  idle: framed("idle", AVATAR),
  blink: framed("blink", AVATAR_BLINK),
  stepA: framed("a", withLegs(LEFT_FOOT_UP)),
  stepB: framed("b", withLegs(RIGHT_FOOT_UP)),
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
  );
}

function clampX(x: number): number {
  return Math.min(Math.max(x, MIN_X), MAX_X);
}

// Bryan on the pavement of the hero scene. Click the street, or press the
// left/right arrow keys, and he walks there. Click him to say hello.
export function SceneAvatar({
  startX,
  feet,
}: {
  startX: number;
  feet: number;
}) {
  const anchorRef = useRef<SVGGElement>(null);
  const xRef = useRef(startX);
  const targetRef = useRef(startX);
  const walkTimer = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const greetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);
  const [x, setX] = useState(startX);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [stride, setStride] = useState<0 | 1>(0);
  const [isWalking, setIsWalking] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isGreeting, setIsGreeting] = useState(true);

  const stopWalking = () => {
    clearInterval(walkTimer.current);
    walkTimer.current = undefined;
    setIsWalking(false);
  };

  const walkTo = (destination: number) => {
    targetRef.current = clampX(destination);
    if (walkTimer.current) return;
    setIsWalking(true);
    walkTimer.current = setInterval(() => {
      const diff = targetRef.current - xRef.current;
      if (Math.abs(diff) <= STEP_UNITS) {
        xRef.current = targetRef.current;
        setX(xRef.current);
        stopWalking();
        return;
      }
      const direction = diff > 0 ? 1 : -1;
      xRef.current += direction * STEP_UNITS;
      setX(xRef.current);
      setFacing(direction);
      setStride((current) => (current === 0 ? 1 : 0));
    }, TICK_MS);
  };

  const greet = () => {
    setIsGreeting(true);
    if (greetTimer.current) clearTimeout(greetTimer.current);
    greetTimer.current = setTimeout(() => setIsGreeting(false), GREETING_MS);
  };

  useEffect(() => {
    const pending = timers.current;
    const svg = anchorRef.current?.ownerSVGElement;

    const blink = setInterval(() => {
      setIsBlinking(true);
      pending.push(setTimeout(() => setIsBlinking(false), BLINK_FOR_MS));
    }, BLINK_EVERY_MS);
    pending.push(setTimeout(() => setIsGreeting(false), GREETING_MS));

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    if (svg) observer.observe(svg);

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!isVisibleRef.current || isTypingTarget(event.target)) return;
      const target = event.target;
      if (
        target instanceof Element &&
        target !== document.body &&
        target !== document.documentElement &&
        !target.closest(".scene-avatar")
      )
        return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      const direction =
        key === "arrowright" || key === "d"
          ? 1
          : key === "arrowleft" || key === "a"
            ? -1
            : 0;
      if (direction === 0) return;
      event.preventDefault();
      walkTo(xRef.current + direction * KEY_NUDGE);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearInterval(blink);
      clearInterval(walkTimer.current);
      pending.forEach(clearTimeout);
      if (greetTimer.current) clearTimeout(greetTimer.current);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
    };
    // walkTo only touches refs and stable setters, so it is safe to register once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStreetClick = (event: MouseEvent<SVGRectElement>) => {
    const svg = event.currentTarget.ownerSVGElement;
    const matrix = svg?.getScreenCTM();
    if (!svg || !matrix) return;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    walkTo(point.matrixTransform(matrix.inverse()).x - SPRITE_WIDTH / 2);
  };

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    greet();
  };

  const pose = isWalking
    ? stride === 0
      ? FRAMES.stepA
      : FRAMES.stepB
    : isBlinking
      ? FRAMES.blink
      : FRAMES.idle;
  const bubbleX = (SPRITE_WIDTH - BUBBLE_WIDTH) / 2;
  // Facing left mirrors the sprite around its own centre.
  const flip =
    facing === -1 ? `translate(${SPRITE_WIDTH} 0) scale(-1 1)` : undefined;

  return (
    <>
      <rect
        aria-hidden
        x={0}
        y={HIT_TOP}
        width={VIEW_WIDTH}
        height={VIEW_HEIGHT - HIT_TOP}
        fill="transparent"
        className="scene-street"
        onClick={handleStreetClick}
      />
      <g
        ref={anchorRef}
        className="scene-avatar"
        role="button"
        tabIndex={0}
        aria-label="Hi, I'm Bryan. Say hello. Left and right arrow keys walk."
        onClick={greet}
        onKeyDown={handleKeyDown}
        transform={`translate(${x} ${feet - SPRITE_HEIGHT})`}
      >
        <g className={isWalking ? "scene-avatar-walk" : "scene-avatar-idle"}>
          <g transform={flip}>{pose}</g>
        </g>
        <g
          aria-hidden
          className={`scene-bubble${isGreeting ? " is-on" : ""}`}
          transform={`translate(${bubbleX} ${-BUBBLE_HEIGHT - 4})`}
        >
          <rect width={BUBBLE_WIDTH} height={BUBBLE_HEIGHT} fill={RIM} />
          <rect
            x={1}
            y={1}
            width={BUBBLE_WIDTH - 2}
            height={BUBBLE_HEIGHT - 2}
            fill="#241044"
          />
          <rect
            x={BUBBLE_WIDTH / 2 - 1}
            y={BUBBLE_HEIGHT}
            width={2}
            height={2}
            fill={RIM}
          />
          <text
            x={BUBBLE_WIDTH / 2}
            y={5.6}
            textAnchor="middle"
            fontSize={3.8}
            fill={RIM}
            style={{ fontFamily: "var(--font-press-start), monospace" }}
          >
            Hi, I’m Bryan
          </text>
        </g>
      </g>
    </>
  );
}
