const STORAGE_KEY = "web-porto:visited-pages";

// Storage can be blocked (private mode, disabled cookies); the game then just
// starts from level 1 on every visit instead of failing.
const EMPTY = "[]";

export function parseVisited(raw: string): readonly string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

// Raw string snapshot so useSyncExternalStore can compare by value.
export function readVisitedSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

export const SERVER_VISITED_SNAPSHOT = EMPTY;

export function subscribeVisited(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function markVisited(href: string): void {
  const visited = parseVisited(readVisitedSnapshot());
  if (visited.includes(href)) return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...visited, href]),
    );
  } catch {
    // Ignore: progress simply is not remembered.
  }
}
