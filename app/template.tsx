"use client";

import { useEffect, useState, type ReactNode } from "react";

const WIPE_MS = 900;

/**
 * Re-mounted on every navigation, so the pixel wipe overlay below replays each
 * time a page opens. It is skipped on the very first load: the attribute that
 * enables it is only set after the first mount (see `.page-wipe` in globals.css).
 * A timer removes the overlay even if the animation never gets to run, for
 * example in a background tab, so it can never keep covering the page.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [isWiping, setIsWiping] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.nav = "1";
    const timer = setTimeout(() => setIsWiping(false), WIPE_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isWiping && <div aria-hidden className="page-wipe" />}
      {children}
    </>
  );
}
