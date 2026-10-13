import Link from "next/link";
import type { ReactNode } from "react";
import { VisitTracker } from "./VisitTracker";

export const STAGES = [
  { href: "/about", label: "About", theme: "gameboy" },
  { href: "/skills", label: "Skills", theme: "dungeon" },
  { href: "/projects", label: "Projects", theme: "sky" },
  { href: "/contact", label: "Contact", theme: "arcade" },
] as const;

export type Stage = (typeof STAGES)[number];

/**
 * Frame shared by every inner page: the page's own theme class re-skins the
 * tokens, the top bar links back to the hub, and the footer steps to the
 * neighbouring pages. The page body is passed as children.
 */
export function PageShell({
  current,
  children,
}: {
  current: Stage["href"];
  children: ReactNode;
}) {
  const index = STAGES.findIndex((stage) => stage.href === current);
  const stage = STAGES[index];
  const previous = index > 0 ? STAGES[index - 1] : undefined;
  const next = index < STAGES.length - 1 ? STAGES[index + 1] : undefined;

  return (
    <div className={`theme-root theme-${stage.theme} flex flex-col`}>
      <VisitTracker href={current} />
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="pixel-btn">
          &lt; Home
        </Link>
        <nav aria-label="Pages">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-lg">
            {STAGES.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === current ? "page" : undefined}
                  className={`inline-block px-1 py-1 ${
                    item.href === current
                      ? "bg-foreground text-background"
                      : "hover:bg-foreground hover:text-background"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-4 px-6 py-10">
        {previous ? (
          <Link href={previous.href} className="pixel-btn">
            &lt; {previous.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="pixel-btn pixel-btn-solid">
            {next.label} &gt;
          </Link>
        ) : (
          <Link href="/" className="pixel-btn pixel-btn-solid">
            Back to start
          </Link>
        )}
      </footer>
    </div>
  );
}
