import type { ReactNode } from "react";
import { ClusterField } from "./components/ClusterField";
import { CopyEmail } from "./components/CopyEmail";
import { education, profile, projects, skills } from "./data";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

const BUTTON_BASE =
  "inline-block rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto grid max-w-6xl scroll-mt-8 gap-8 px-6 py-20 lg:grid-cols-3 lg:gap-12"
    >
      <h2
        id={`${id}-title`}
        className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </h2>
      <div className="max-w-2xl lg:col-span-2">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6"
        >
          <a
            href="#"
            aria-label="Back to top"
            className="font-display text-lg font-bold"
          >
            Portfolio
          </a>
          <ul className="flex gap-7 text-sm font-medium text-muted">
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
        <section className="relative flex min-h-svh items-center overflow-hidden">
          <ClusterField />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
            <h1
              className="animate-rise font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {profile.name}
            </h1>
            <p
              className="animate-rise tone-violet mt-4 font-display text-xl font-semibold text-tone sm:text-2xl"
              style={{ animationDelay: "200ms" }}
            >
              {profile.role}
            </p>
            <p
              className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: "320ms" }}
            >
              {profile.tagline}
            </p>
            <div
              className="animate-rise mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "440ms" }}
            >
              <a
                href="#projects"
                className={`${BUTTON_BASE} bg-foreground text-background`}
              >
                See my projects
              </a>
              <a
                href="#contact"
                className={`${BUTTON_BASE} border border-line bg-background/60 backdrop-blur`}
              >
                Contact me
              </a>
            </div>
            <dl
              className="animate-rise mt-14 grid max-w-2xl gap-6 border-t border-line pt-6 sm:grid-cols-3"
              style={{ animationDelay: "560ms" }}
            >
              {profile.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="mt-1 font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section id="about" title="About">
          <p className="text-justify text-lg leading-relaxed hyphens-auto">
            {profile.summary}
          </p>
          <div className="mt-8 border-t border-line pt-6">
            <h3 className="font-semibold">{education.school}</h3>
            <p className="mt-1 text-sm text-muted">{education.period}</p>
            <p className="mt-3 text-muted">{education.degree}</p>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="space-y-8">
            {skills.map((skill) => (
              <div key={skill.group} className={`tone-${skill.tone}`}>
                <h3 className="flex items-center gap-3 font-semibold">
                  <span aria-hidden className="size-3 rounded-full bg-tone" />
                  {skill.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-tone/40 bg-tone/10 px-4 py-1.5 text-base transition-colors duration-200 hover:bg-tone/25"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="space-y-6">
            {projects.map((project) => (
              <article
                key={project.title}
                className={`tone-${project.tone} rounded-3xl bg-tone/10 p-7 sm:p-9`}
              >
                <p className="text-sm text-muted">{project.context}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-tone">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-xl text-muted">
                  {project.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {project.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 border-t border-tone/30 pt-3"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-2 shrink-0 rounded-full bg-tone"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <p className="max-w-xl text-lg sm:text-xl">{profile.seeking}</p>
          <div className="mt-8">
            <CopyEmail email={profile.email} />
          </div>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className={`${BUTTON_BASE} border border-line`}
              >
                Open mail app
              </a>
            </li>
            <li>
              <a
                href={profile.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BUTTON_BASE} border border-line`}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </Section>
      </main>

      <footer className="border-t border-line py-6 text-center text-sm text-muted">
        {profile.name}, {profile.location}
      </footer>
    </>
  );
}
