"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./worldmap.css";
import { PixelSprite } from "./PixelSprite";
import { AVATAR, AVATAR_BLINK, STAR } from "./sprites";
import { isLandmark, WorldBuilding } from "./WorldBuildings";
import { SPOTS, START, type Spot } from "./worldSpots";
import {
  parseVisited,
  readVisitedSnapshot,
  SERVER_VISITED_SNAPSHOT,
  subscribeVisited,
} from "./visited";

type Theme = "gameboy" | "dungeon" | "sky" | "arcade";

export type WorldNode = {
  href: string;
  label: string;
  theme: Theme;
  teaser: string;
};

type Point = { x: number; y: number };

const WALK_MS = 900;
const BLINK_EVERY_MS = 3200;
const BLINK_FOR_MS = 160;
const TICK_MS = 50;
const STEP = 0.9;
const NEAR = 14;
const MIN_X = 3;
const MAX_X = 97;
const MAX_Y = 90;
const WIDE_QUERY = "(min-width: 640px)";
const WIDE_ASPECT = 16 / 9;
const TALL_ASPECT = 12 / 17;
const WIDE_MIN_Y = 26;
const TALL_MIN_Y = 18;

const MOVE_KEYS: Readonly<Record<string, Point>> = {
  arrowup: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  arrowdown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  arrowleft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  arrowright: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};

function subscribeWide(onChange: () => void): () => void {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readWide(): boolean {
  return window.matchMedia(WIDE_QUERY).matches;
}

function spotStyle(spot: Spot): CSSProperties {
  return {
    "--x": `${spot.x}%`,
    "--y": `${spot.y}%`,
    "--mx": `${spot.mx}%`,
    "--my": `${spot.my}%`,
    // Bryan stands on the side of a building that has room for him.
    "--side": spot.x > 70 ? -1 : 1,
    "--mside": spot.mx > 55 ? -1 : 1,
  } as CSSProperties;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function WorldMap({
  nodes,
  terrain,
}: {
  nodes: readonly WorldNode[];
  terrain: ReactNode;
}) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pressed = useRef(new Set<string>());
  const goal = useRef<Point | null>(null);
  const position = useRef<Point>({ x: START.x, y: START.y });
  const loop = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const rawVisited = useSyncExternalStore(
    subscribeVisited,
    readVisitedSnapshot,
    () => SERVER_VISITED_SNAPSHOT,
  );
  const isWide = useSyncExternalStore(subscribeWide, readWide, () => true);
  const visited = useMemo(() => parseVisited(rawVisited), [rawVisited]);
  const [target, setTarget] = useState<Spot>(START);
  const [free, setFree] = useState<Point | null>(null);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), BLINK_FOR_MS);
    }, BLINK_EVERY_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isWalking) return;
    const timer = setTimeout(() => setIsWalking(false), WALK_MS);
    return () => clearTimeout(timer);
  }, [isWalking, target]);

  useEffect(() => () => clearInterval(loop.current), []);

  const aspect = isWide ? WIDE_ASPECT : TALL_ASPECT;
  const minY = isWide ? WIDE_MIN_Y : TALL_MIN_Y;

  const nearestHref = (point: Point): string | null => {
    let best: string | null = null;
    let bestDistance = NEAR;
    for (const node of nodes) {
      const spot = SPOTS[node.href];
      const nodeX = isWide ? spot.x : spot.mx;
      const nodeY = isWide ? spot.y : spot.my;
      // Vertical percent is of the map height, so rescale to width units.
      const distance = Math.hypot(point.x - nodeX, (point.y - nodeY) / aspect);
      if (distance < bestDistance) {
        best = node.href;
        bestDistance = distance;
      }
    }
    return best;
  };

  const stopLoop = () => {
    clearInterval(loop.current);
    loop.current = undefined;
    setIsWalking(false);
  };

  const tick = () => {
    let dx = 0;
    let dy = 0;
    pressed.current.forEach((key) => {
      dx += MOVE_KEYS[key]?.x ?? 0;
      dy += MOVE_KEYS[key]?.y ?? 0;
    });
    const destination = goal.current;
    if (dx === 0 && dy === 0 && destination) {
      const toX = destination.x - position.current.x;
      const toY = (destination.y - position.current.y) / aspect;
      const length = Math.hypot(toX, toY);
      if (length <= STEP) {
        goal.current = null;
      } else {
        dx = toX / length;
        dy = toY / length;
      }
    }
    if (dx === 0 && dy === 0) {
      if (pressed.current.size === 0 && !goal.current) stopLoop();
      return;
    }
    const length = Math.hypot(dx, dy);
    const next = {
      x: clamp(position.current.x + (dx / length) * STEP, MIN_X, MAX_X),
      y: clamp(position.current.y + ((dy / length) * STEP) * aspect, minY, MAX_Y),
    };
    position.current = next;
    setFree(next);
    if (dx !== 0) setFacing(dx > 0 ? 1 : -1);
    setActiveHref(nearestHref(next));
  };

  const startMoving = () => {
    if (!free) {
      position.current = isWide
        ? { x: target.x, y: target.y }
        : { x: target.mx, y: target.my };
      setFree(position.current);
    }
    setIsWalking(true);
    if (!loop.current) loop.current = setInterval(tick, TICK_MS);
  };

  const walkToLink = (href: string) => {
    const spot = SPOTS[href];
    setActiveHref(href);
    setFree(null);
    pressed.current.clear();
    goal.current = null;
    stopLoop();
    if (!spot || spot === target) return;
    setTarget(spot);
    setIsWalking(true);
  };

  const handleMapClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) return;
    const box = mapRef.current?.getBoundingClientRect();
    if (!box) return;
    mapRef.current?.focus();
    goal.current = {
      x: clamp(((event.clientX - box.left) / box.width) * 100, MIN_X, MAX_X),
      y: clamp(((event.clientY - box.top) / box.height) * 100, minY, MAX_Y),
    };
    startMoving();
  };

  const handleMapKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const key = event.key.toLowerCase();
    if (key in MOVE_KEYS) {
      event.preventDefault();
      goal.current = null;
      pressed.current.add(key);
      startMoving();
      // A quick tap still moves one step before the key is released.
      tick();
    } else if ((key === "enter" || key === " ") && free && activeHref) {
      event.preventDefault();
      router.push(activeHref);
    }
  };

  const handleMapKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    pressed.current.delete(event.key.toLowerCase());
  };

  // Arrow keys on a focused building step through the buildings in order.
  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !backward) return;
    const links = Array.from(
      listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
    );
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    const nextIndex = clamp(current + (forward ? 1 : -1), 0, links.length - 1);
    event.preventDefault();
    links[nextIndex]?.focus();
  };

  const level = 1 + visited.length;
  const isComplete = visited.length >= nodes.length;
  const active = nodes.find((node) => node.href === activeHref);
  const walkerSpot: Spot = free
    ? { x: free.x, y: free.y, mx: free.x, my: free.y }
    : target;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="font-display text-sm">Level {level}</p>
        <div
          role="progressbar"
          aria-label="Blocks visited"
          aria-valuemin={0}
          aria-valuemax={nodes.length}
          aria-valuenow={visited.length}
          className="world-xp"
        >
          {nodes.map((node, index) => (
            <span key={node.href} data-full={index < visited.length} />
          ))}
        </div>
        <p className="text-lg text-muted">
          {isComplete
            ? "All blocks visited. Max level."
            : `${visited.length} of ${nodes.length} blocks visited`}
        </p>
      </div>

      <div
        ref={mapRef}
        className="world-map"
        role="group"
        tabIndex={0}
        aria-label="World map. Use the arrow keys or WASD to walk, and Enter next to a building to go in."
        onClick={handleMapClick}
        onKeyDown={handleMapKeyDown}
        onKeyUp={handleMapKeyUp}
        onBlur={() => pressed.current.clear()}
      >
        {terrain}

        <ul ref={listRef} onKeyDown={handleListKeyDown}>
          {nodes.map((node) => {
            const isVisited = visited.includes(node.href);
            return (
              <li
                key={node.href}
                className={`world-node theme-${node.theme}`}
                style={spotStyle(SPOTS[node.href])}
              >
                <Link
                  href={node.href}
                  onFocus={() => walkToLink(node.href)}
                  onMouseEnter={() => walkToLink(node.href)}
                  className="world-link"
                  data-active={node.href === activeHref}
                >
                  {isLandmark(node.href) && (
                    <WorldBuilding href={node.href} scale={1} />
                  )}
                  <span className="world-label">
                    {node.label}
                    {isVisited && (
                      <>
                        <PixelSprite
                          sprite={STAR}
                          scale={2}
                          className="world-done"
                        />
                        <span className="sr-only"> (visited)</span>
                      </>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          aria-hidden
          className="world-walker"
          data-walking={isWalking}
          data-free={free !== null}
          data-facing={facing}
          style={spotStyle(walkerSpot)}
        >
          <PixelSprite sprite={isBlinking ? AVATAR_BLINK : AVATAR} scale={1} />
        </div>
      </div>

      <p className="mt-4 text-base text-muted">
        Click the map to walk Bryan there. With the map focused, use the arrow
        keys or WASD, then press Enter beside a building to go in.
      </p>

      <div
        aria-live="polite"
        className="pixel-box mt-4 flex flex-wrap items-center justify-between gap-4 p-5"
      >
        {active ? (
          <>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm">{active.label}</p>
              <p className="mt-2 text-lg text-muted">{active.teaser}</p>
            </div>
            <Link href={active.href} className="pixel-btn pixel-btn-solid">
              Enter {active.label}
            </Link>
          </>
        ) : (
          <p className="text-lg text-muted">
            Walk to a building to see what is inside.
          </p>
        )}
      </div>
    </div>
  );
}
