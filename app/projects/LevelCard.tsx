import { PixelSprite } from "../components/PixelSprite";
import { COIN, STAR } from "../components/sprites";
import {
  projectLinks,
  projectShots,
  projectStacks,
  type projects,
} from "../data";
import { CHECK } from "./art";
import { ShotGallery } from "./ShotGallery";

export type Project = (typeof projects)[number];

// "Security: mandatory two-factor ..." -> a bold "Security" lead-in plus the rest.
const LABEL_PATTERN = /^([A-Z][A-Za-z ]{2,24}): /;

function splitLabel(point: string): { label: string | null; text: string } {
  const match = LABEL_PATTERN.exec(point);
  return match
    ? { label: `${match[1]}: `, text: point.slice(match[0].length) }
    : { label: null, text: point };
}

/** A level opened up: ribbon with the client and dates, goals checklist, clear stamp. */
export function LevelCard({ project, id }: { project: Project; id: string }) {
  const total = project.points.length;
  const shots = projectShots[project.title];
  const stack = projectStacks[project.title];
  const links = projectLinks[project.title];
  return (
    <article aria-labelledby={id} className={`level-card tone-${project.tone}`}>
      <p className="level-ribbon">
        <PixelSprite sprite={COIN} scale={2} />
        {project.context}
      </p>

      <div className="level-body">
        <h2 id={id} className="font-display text-lg leading-snug sm:text-xl">
          {project.title}
        </h2>
        <p className="mt-3 text-lg leading-snug text-muted">
          {project.description}
        </p>

        {shots && <ShotGallery groups={shots} title={project.title} />}

        <ul className="level-goals">
          {project.points.map((point) => {
            const { label, text } = splitLabel(point);
            return (
              <li key={point}>
                <span aria-hidden="true" className="level-tick">
                  <PixelSprite sprite={CHECK} scale={2} />
                </span>
                <span>
                  {label && (
                    <strong className="level-point-label">{label}</strong>
                  )}
                  {text}
                </span>
              </li>
            );
          })}
        </ul>

        {(links?.code || links?.demo) && (
          <p className="mt-5 flex flex-wrap gap-3">
            {links.code && (
              <a
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn pixel-btn-solid"
              >
                View code
              </a>
            )}
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn"
              >
                Watch demo
              </a>
            )}
          </p>
        )}

        {stack && (
          <section aria-label="Skills and deliverables" className="level-stack">
            <h3 className="level-stack-title">Skills and deliverables</h3>
            <ul>
              {stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <footer className="level-foot">
        <span className="text-muted">
          Goals {total}/{total}
        </span>
        <span className="level-stamp">
          <PixelSprite sprite={STAR} scale={3} />
          Level clear
        </span>
      </footer>
    </article>
  );
}
