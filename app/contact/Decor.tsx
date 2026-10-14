import { MergedSprite } from "./MergedSprite";
import {
  CHOMP_OPEN,
  CHOMP_SHUT,
  GHOST,
  POSTER,
  SPARK,
  makeMachine,
} from "./art";

type Tone = "pink" | "cyan" | "amber";

type Star = { x: string; y: string; tone: Tone; delay: string; size: number };

// Hand-placed so the sky never looks random-noisy; delays keep the twinkle uneven.
const STARS: readonly Star[] = [
  { x: "3%", y: "2%", tone: "cyan", delay: "0s", size: 2 },
  { x: "14%", y: "9%", tone: "amber", delay: "-0.8s", size: 3 },
  { x: "27%", y: "1%", tone: "pink", delay: "-1.6s", size: 2 },
  { x: "44%", y: "6%", tone: "cyan", delay: "-0.4s", size: 2 },
  { x: "58%", y: "0%", tone: "amber", delay: "-2s", size: 3 },
  { x: "71%", y: "8%", tone: "pink", delay: "-1.2s", size: 2 },
  { x: "86%", y: "2%", tone: "cyan", delay: "-0.2s", size: 3 },
  { x: "96%", y: "10%", tone: "amber", delay: "-1.8s", size: 2 },
  { x: "-1%", y: "46%", tone: "pink", delay: "-1s", size: 3 },
  { x: "99%", y: "52%", tone: "cyan", delay: "-0.6s", size: 2 },
  { x: "6%", y: "93%", tone: "amber", delay: "-1.4s", size: 2 },
  { x: "92%", y: "90%", tone: "pink", delay: "-0.3s", size: 3 },
];

export function Sky() {
  return (
    <div className="cab-sky" aria-hidden>
      {STARS.map((star, i) => (
        <span
          key={i}
          className={`spark spark-${star.tone}`}
          style={{
            left: star.x,
            top: star.y,
            animationDelay: star.delay,
          }}
        >
          <MergedSprite sprite={SPARK} scale={star.size * 2} />
        </span>
      ))}
    </div>
  );
}

const MACHINE_LEFT = makeMachine("var(--pink)", "var(--cyan)");
const MACHINE_RIGHT = makeMachine("var(--cyan)", "var(--amber)");

function Side({
  side,
  tone,
  machine,
}: {
  side: "l" | "r";
  tone: Tone;
  machine: typeof MACHINE_LEFT;
}) {
  return (
    <div className={`cab-side cab-side-${side}`} aria-hidden>
      <span className={`poster poster-${tone}`}>
        <MergedSprite sprite={POSTER} scale={6} />
      </span>
      <MergedSprite sprite={machine} scale={8} className="mach" />
    </div>
  );
}

/** Background arcade machines and wall posters; only shown on wide screens. */
export function Sides() {
  return (
    <>
      <Side side="l" tone="pink" machine={MACHINE_LEFT} />
      <Side side="r" tone="cyan" machine={MACHINE_RIGHT} />
    </>
  );
}

/** Attract mode: a chomper eats a row of pellets while a ghost gives chase. */
export function Attract() {
  return (
    <div className="cab-attract" aria-hidden>
      <div className="att-track">
        <span className="att-dots" />
        <span className="att-eaten" />
        <span className="att-actor att-chomp">
          <MergedSprite sprite={CHOMP_OPEN} scale={4} className="att-a" />
          <MergedSprite sprite={CHOMP_SHUT} scale={4} className="att-b" />
        </span>
        <span className="att-actor att-ghost">
          <MergedSprite sprite={GHOST} scale={4} />
        </span>
      </div>
    </div>
  );
}
