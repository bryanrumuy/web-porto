"use client";

import { useEffect } from "react";
import { markVisited } from "./visited";

// Renders nothing; opening a page earns its XP on the hub map.
export function VisitTracker({ href }: { href: string }) {
  useEffect(() => {
    markVisited(href);
  }, [href]);

  return null;
}
