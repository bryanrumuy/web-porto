"use client";

import { useEffect, useRef } from "react";

const CLUSTER_VARS = [
  "--violet",
  "--pink",
  "--cyan",
  "--amber",
] as const;

const POINTS_DESKTOP = 90;
const POINTS_MOBILE = 48;
const MOBILE_WIDTH = 640;
const POINTER_RADIUS = 170;

type Point = { x: number; y: number; vx: number; vy: number; size: number };

function readColors(): string[] {
  const style = getComputedStyle(document.documentElement);
  return CLUSTER_VARS.map((name) => style.getPropertyValue(name).trim());
}

function makePoints(count: number, width: number, height: number): Point[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: 2 + Math.random() * 3,
  }));
}

export function ClusterField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dark = window.matchMedia("(prefers-color-scheme: dark)");

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let colors = readColors();
    let pointer: { x: number; y: number } | null = null;
    let visible = true;
    let frame = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = makePoints(
        width < MOBILE_WIDTH ? POINTS_MOBILE : POINTS_DESKTOP,
        width,
        height,
      );
    };

    const centroids = () =>
      CLUSTER_VARS.map((_, i) => {
        const angle = (i / CLUSTER_VARS.length) * Math.PI * 2 + 0.6;
        const orbit = 0.05 * Math.min(width, height);
        return {
          x: width * (0.68 + 0.2 * Math.cos(angle)) + Math.sin(time * 0.0004 + i * 2) * orbit,
          y: height * (0.5 + 0.28 * Math.sin(angle)) + Math.cos(time * 0.0005 + i * 3) * orbit,
        };
      });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const centers = centroids();

      for (const p of points) {
        let nearest = 0;
        let best = Infinity;
        centers.forEach((c, i) => {
          const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2;
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
        const target = centers[nearest];
        p.vx += (target.x - p.x) * 0.00006;
        p.vy += (target.y - p.y) * 0.00006;

        if (pointer) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS && dist > 1) {
            const pull = (1 - dist / POINTER_RADIUS) * 0.05;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = colors[nearest];
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();

        ctx.globalAlpha = 0.95;
        ctx.fillStyle = colors[nearest];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      centers.forEach((c, i) => {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = (now: number) => {
      time = now;
      draw();
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (reduceMotion.matches) {
        for (let i = 0; i < 240; i++) draw();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointer = null;
    };
    const onTheme = () => {
      colors = readColors();
      if (reduceMotion.matches) draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) start();
    });
    const resizeObserver = new ResizeObserver(() => {
      resize();
      start();
    });

    resize();
    start();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    dark.addEventListener("change", onTheme);
    reduceMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      dark.removeEventListener("change", onTheme);
      reduceMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
