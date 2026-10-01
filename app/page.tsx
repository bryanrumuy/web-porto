import { Reveal } from "./components/Reveal";
import { ScrollProgress } from "./components/ScrollProgress";
import { Typewriter } from "./components/Typewriter";
import {
  education,
  profile,
  projects,
  roles,
  skills,
  stats,
} from "./data";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

const MARQUEE_SKILLS = skills.flatMap((group) => group.items);

function SectionTitle({
  id,
  index,
  children,
}: {
  id: string;
  index: string;
  children: string;
}) {
  return (
    <h2 id={id} className="mb-10 flex scroll-mt-24 items-baseline gap-3">
      <span className="font-mono text-sm text-accent">{index}</span>
      <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {children}
      </span>
      <span aria-hidden className="ml-2 h-px flex-1 bg-line" />
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-10 border-b border-line bg-background/70 backdrop-blur-md">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4"
        >
          <a href="#" className="font-mono text-sm font-semibold">
            <span className="text-accent">&lt;</span>
            BR
            <span className="text-accent">/&gt;</span>
          </a>
          <ul className="flex gap-6 text-sm text-muted">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div aria-hidden className="hero-grid absolute inset-0" />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 animate-blob rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-4xl px-6 py-28 sm:py-40">
            <p className="animate-fade-up font-mono text-sm text-muted">
              <span className="mr-2 inline-block size-2 rounded-full bg-emerald-500" />
              Available for work · {profile.location}
            </p>
            <h1
              className="animate-fade-up mt-6 text-5xl font-semibold tracking-tight sm:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Hi, I&apos;m{" "}
              <span className="animate-gradient bg-gradient-to-r from-accent via-rose-500 to-indigo-500 bg-[length:200%_auto] bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            <p
              className="animate-fade-up mt-5 h-9 font-mono text-xl text-muted sm:text-2xl"
              style={{ animationDelay: "240ms" }}
            >
              <span className="text-accent">&gt; </span>
              <Typewriter words={roles} />
            </p>
            <p
              className="animate-fade-up mt-6 max-w-xl leading-relaxed text-muted"
              style={{ animationDelay: "360ms" }}
            >
              {profile.seeking} I turn messy operational problems into
              practical, well-tested software.
            </p>
            <div
              className="animate-fade-up mt-10 flex flex-wrap gap-3 text-sm"
              style={{ animationDelay: "480ms" }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                View projects
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-line px-6 py-3 font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <div className="border-y border-line bg-surface">
          <dl className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-line px-2">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center">
                <dd className="text-2xl font-semibold text-accent sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs text-muted sm:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto max-w-4xl space-y-32 px-6 py-28">
          <section aria-labelledby="about">
            <Reveal>
              <SectionTitle id="about" index="01">
                About
              </SectionTitle>
              <div className="grid gap-10 sm:grid-cols-5">
                <p className="leading-relaxed text-muted sm:col-span-3">
                  {profile.summary}
                </p>
                <div className="space-y-4 sm:col-span-2">
                  <div className="rounded-2xl border border-line bg-surface p-5">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      Education
                    </p>
                    <p className="mt-2 font-medium">{education.school}</p>
                    <p className="text-sm text-muted">{education.period}</p>
                    <p className="mt-2 text-sm text-muted">{education.degree}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section aria-labelledby="projects">
            <SectionTitle id="projects" index="02">
              Projects
            </SectionTitle>
            <div className="space-y-6">
              {projects.map((project, i) => (
                <Reveal key={project.title} delayMs={i * 100}>
                  <article className="group relative rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-muted">
                        {project.context}
                      </p>
                    </div>
                    <p className="mt-4 text-muted">{project.description}</p>
                    <ul className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2">
                      {project.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span aria-hidden className="text-accent">
                            ▹
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="skills">
            <Reveal>
              <SectionTitle id="skills" index="03">
                Skills
              </SectionTitle>
              <div className="grid gap-5 sm:grid-cols-3">
                {skills.map((skill) => (
                  <div
                    key={skill.group}
                    className="rounded-2xl border border-line bg-surface p-5"
                  >
                    <h3 className="mb-4 text-sm font-medium">{skill.group}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        </div>

        <div
          aria-hidden
          className="overflow-hidden border-y border-line bg-surface py-5"
        >
          <div className="flex w-max animate-marquee gap-10 font-mono text-sm text-muted">
            {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((item, i) => (
              <span key={i} className="flex items-center gap-10">
                {item}
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </div>

        <section
          aria-labelledby="contact"
          className="mx-auto max-w-4xl px-6 py-28"
        >
          <Reveal>
            <SectionTitle id="contact" index="04">
              Contact
            </SectionTitle>
            <p className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Have a project or opportunity?{" "}
              <span className="text-accent">Let&apos;s talk.</span>
            </p>
            <ul className="mt-10 flex flex-wrap gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-block rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-line px-6 py-3 font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line py-6 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js
      </footer>
    </>
  );
}
