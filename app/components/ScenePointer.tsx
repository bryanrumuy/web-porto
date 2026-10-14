"use client";

import { useEffect, useRef } from "react";

// Parallax driver for the hero: writes the pointer's horizontal position to
// the hero as --px (-1 to 1, in quarter steps so layers hop like pixels).
// CSS does the rest with transforms. Nothing renders and React never re-renders.

const STEPS = 4;

export function ScenePointer() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = anchor.current?.closest<HTMLElement>(".hero-sky");
    if (!hero) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = 0;

    const apply = (value: number) => {
      if (value === last) return;
      last = value;
      hero.style.setProperty("--px", String(value));
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || calm.matches) return;
      const box = hero.getBoundingClientRect();
      const ratio = ((event.clientX - box.left) / box.width) * 2 - 1;
      apply(Math.round(Math.max(-1, Math.min(1, ratio)) * STEPS) / STEPS);
    };
    const onLeave = () => apply(0);

    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.style.removeProperty("--px");
    };
  }, []);

  return <span ref={anchor} hidden />;
}
