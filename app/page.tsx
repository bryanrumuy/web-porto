import Link from "next/link";
import { HeroScene } from "./components/HeroScene";
import { STAGES } from "./components/PageShell";
import { PixelSprite } from "./components/PixelSprite";
import { HEART } from "./components/sprites";
import { WorldMap, type WorldNode } from "./components/WorldMap";
import { WorldTerrain } from "./components/WorldTerrain";
import { education, profile, projects, skills } from "./data";

const LIVES = 3;

const TEASERS: Record<(typeof STAGES)[number]["href"], string> = {
  "/about": `${education.school}, ${education.period}`,
  "/skills": skills.map((skill) => skill.group).join(", "),
  "/projects": projects.map((project) => project.title).join(", "),
  "/contact": profile.seeking,
};

const NODES: readonly WorldNode[] = STAGES.map((stage) => ({
  ...stage,
  teaser: TEASERS[stage.href],
}));

export default function Home() {
  return (
    <div className="theme-root theme-dusk flex flex-col">
      <main className="flex-1">
        <section className="hero-sky relative flex min-h-[max(44rem,100svh)] items-start overflow-hidden">
          <HeroScene />
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 pointer-events-none pt-24 pb-[clamp(11rem,30vw,22rem)]">
            <div className="pointer-events-auto">
              <p className="animate-rise mb-8 flex items-center gap-3 font-display text-xs sm:text-sm">
                <span aria-hidden className="flex gap-1">
                  {Array.from({ length: LIVES }, (_, i) => (
                    <PixelSprite key={i} sprite={HEART} scale={3} />
                  ))}
                </span>
                Portfolio
              </p>
              <h1
                className="animate-rise font-display text-2xl leading-tight sm:text-5xl lg:text-6xl"
                style={{ animationDelay: "80ms" }}
              >
                {profile.name}
              </h1>
              <p
                className="animate-rise tone-violet mt-5 text-xl font-bold text-tone sm:text-2xl"
                style={{ animationDelay: "200ms" }}
              >
                {profile.role}
              </p>
              <p
                className="animate-rise blink-cursor mt-6 max-w-xl text-xl leading-relaxed text-muted"
                style={{ animationDelay: "320ms" }}
              >
                {profile.tagline}
              </p>
              <div
                className="animate-rise mt-8 flex flex-wrap gap-4"
                style={{ animationDelay: "440ms" }}
              >
                <Link href="/projects" className="pixel-btn pixel-btn-solid">
                  View projects
                </Link>
                <Link href="/contact" className="pixel-btn">
                  Contact me
                </Link>
                <a
                  href="/CV_BryanRumuy_2026.pdf"
                  download
                  className="pixel-btn"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
          <p className="pointer-events-none absolute inset-x-0 bottom-4 px-6 text-center text-base text-muted [text-shadow:0_2px_0_#120a2e]">
            Click the street or press the left and right arrow keys to walk
            Bryan around.
          </p>
        </section>

        <section
          aria-labelledby="blocks-title"
          className="mx-auto max-w-6xl px-6 pb-20"
        >
          <h2 id="blocks-title" className="font-display text-lg sm:text-xl">
            <span aria-hidden className="mr-3 text-pink">
              &gt;
            </span>
            World map
          </h2>
          <p className="mb-8 mt-3 max-w-xl text-lg text-muted">
            Walk to a block and open it. Each one has its own look, and every
            block you visit levels you up.
          </p>
          <WorldMap nodes={NODES} terrain={<WorldTerrain />} />
        </section>
      </main>

      <footer className="border-t-4 border-dashed border-line py-6 text-center text-base text-muted">
        {profile.name}, {profile.location}
      </footer>
    </div>
  );
}
