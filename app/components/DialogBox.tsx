"use client";

import { useEffect, useRef, useState } from "react";
import { PixelSprite } from "./PixelSprite";
import { AVATAR } from "./sprites";

const TYPE_INTERVAL_MS = 38;

export function DialogBox({ speaker, text }: { speaker: string; text: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(text.length);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setTyped(0);
      let count = 0;
      timer = setInterval(() => {
        count += 1;
        setTyped(count);
        if (count >= text.length) clearInterval(timer);
      }, TYPE_INTERVAL_MS);
    });
    observer.observe(box);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [text]);

  const isDone = typed >= text.length;

  return (
    <div ref={boxRef} className="flex items-end gap-4">
      <div className="pixel-box hidden shrink-0 p-2 sm:block">
        <PixelSprite sprite={AVATAR} scale={4} />
      </div>
      <div className="pixel-box relative flex-1 p-5 pb-8 sm:p-6 sm:pb-9">
        <p className="font-display text-xs text-pink">{speaker}</p>
        <p className="mt-3 text-xl sm:text-2xl">
          <span>{text.slice(0, typed)}</span>
          <span aria-hidden className="invisible">
            {text.slice(typed)}
          </span>
        </p>
        {isDone && (
          <span
            aria-hidden
            className="blink-arrow absolute bottom-3 right-4 size-0 border-x-[8px] border-t-[10px] border-x-transparent border-t-foreground"
          />
        )}
      </div>
    </div>
  );
}
