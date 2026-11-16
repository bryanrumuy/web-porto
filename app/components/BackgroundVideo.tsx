"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  /** Sources in order of preference, e.g. webm first and mp4 as fallback. */
  sources: readonly { src: string; type: string }[];
  poster?: string;
  className?: string;
};

/**
 * Decorative looping video. It only loads once it nears the viewport, stays
 * paused for visitors who prefer reduced motion, and removes itself if the
 * file is missing or cannot play, so the page never shows a broken player.
 */
export function BackgroundVideo({
  sources,
  poster,
  className = "",
}: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (failed) return null;

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      tabIndex={-1}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
      onError={() => setFailed(true)}
    >
      {active &&
        sources.map((source, i) => (
          <source
            key={source.src}
            src={source.src}
            type={source.type}
            onError={
              i === sources.length - 1 ? () => setFailed(true) : undefined
            }
          />
        ))}
    </video>
  );
}
