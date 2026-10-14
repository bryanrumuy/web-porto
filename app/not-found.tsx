import Link from "next/link";
import type { Metadata } from "next";
import { PixelSprite } from "./components/PixelSprite";
import { AVATAR, HEART } from "./components/sprites";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Page not found",
};

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <div className="theme-root theme-dusk nf-root min-h-screen">
      <div className="nf-stars" aria-hidden="true" />
      <div className="nf-rain" aria-hidden="true" />

      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-8 px-4 py-12 text-center">
        <div className="nf-hearts" aria-hidden="true">
          <PixelSprite sprite={HEART} scale={5} />
          <PixelSprite sprite={HEART} scale={5} />
          <PixelSprite sprite={HEART} scale={5} className="nf-heart-lost" />
        </div>

        <h1
          className="animate-rise text-6xl leading-none sm:text-8xl"
          style={{
            fontFamily: "var(--font-display), monospace",
            color: "var(--pink)",
            textShadow: "4px 4px 0 var(--line)",
          }}
        >
          404
          <span className="sr-only"> Page not found</span>
        </h1>

        <div className="flex items-end justify-center gap-6" aria-hidden="true">
          <PixelSprite sprite={AVATAR} scale={5} />
          <div className="nf-block">?</div>
        </div>

        <div className="pixel-box max-w-md px-5 py-4">
          <p className="text-xl sm:text-2xl">This page is off the map.</p>
          <p className="mt-2 text-lg" style={{ color: "var(--muted)" }}>
            The link may be old, so head back and pick a new path
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <Link href="/" className="pixel-btn pixel-btn-solid">
            Back to the map
          </Link>
          <nav aria-label="Pages">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-lg">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nf-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
