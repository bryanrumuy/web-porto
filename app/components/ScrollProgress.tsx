"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-20 h-0.5 origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
