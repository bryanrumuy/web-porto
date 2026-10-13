import { PixelSprite } from "../components/PixelSprite";
import type { Tone } from "../data";
import { CHEST_CLOSED, CHEST_OPEN } from "./art";

type ChestProps = {
  group: string;
  tone: Tone;
  items: readonly string[];
};

export function Chest({ group, tone, items }: ChestProps) {
  const headingId = `chest-${group.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <section aria-labelledby={headingId} className={`chest tone-${tone}`}>
      <div className="hang">
        <span className="hang-chain hang-chain-left" aria-hidden="true" />
        <span className="hang-chain hang-chain-right" aria-hidden="true" />
        <div className="plank">
          <h2 id={headingId} className="font-display text-xs leading-relaxed sm:text-sm">
            {group}
          </h2>
          <p className="plank-count">{items.length} items inside</p>
        </div>
      </div>

      <div className="chest-art" aria-hidden="true">
        <span className="chest-glow" />
        <PixelSprite sprite={CHEST_CLOSED} scale={8} className="chest-closed" />
        <PixelSprite sprite={CHEST_OPEN} scale={8} className="chest-open" />
        <span className="spark spark-1" />
        <span className="spark spark-2" />
        <span className="spark spark-3" />
      </div>

      <ul className="slots">
        {items.map((item) => (
          <li key={item} tabIndex={0} className="slot">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
