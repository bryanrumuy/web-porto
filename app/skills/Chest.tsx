import type { CSSProperties } from "react";
import { PixelSprite } from "../components/PixelSprite";
import type { Tone } from "../data";
import { CHEST_CLOSED, CHEST_OPEN, COIN, GEM } from "./art";

type ChestProps = {
  group: string;
  tone: Tone;
  items: readonly string[];
  index: number;
};

const MAX_LOOT = 6;
const LOOT_SPACING = 22;

// One piece of loot per skill chip: coins and gems alternate and fan out of the chest.
function lootStyle(i: number, count: number): CSSProperties {
  return {
    "--lx": `${Math.round((i - (count - 1) / 2) * LOOT_SPACING)}px`,
    "--ly": `${-34 - (i % 3) * 10}px`,
    "--ld": `${i * 0.12}s`,
  } as CSSProperties;
}

export function Chest({ group, tone, items, index }: ChestProps) {
  const headingId = `chest-${group.replace(/\W+/g, "-").toLowerCase()}`;
  const lootCount = Math.min(items.length, MAX_LOOT);

  return (
    <section
      aria-labelledby={headingId}
      className={`chest tone-${tone}`}
      style={{ "--n": index } as CSSProperties}
    >
      <div className="hang">
        <span className="hang-chain hang-chain-left" aria-hidden="true" />
        <span className="hang-chain hang-chain-right" aria-hidden="true" />
        <div className="plank">
          <h2
            id={headingId}
            className="font-display text-xs leading-relaxed sm:text-sm"
          >
            {group}
          </h2>
          <p className="plank-count">{items.length} items inside</p>
        </div>
      </div>

      <div className="chest-art" aria-hidden="true">
        <span
          className="drip"
          style={
            {
              "--dx": `${10 + ((index * 37) % 20)}%`,
              "--dd": `${3.4 + index * 0.9}s`,
            } as CSSProperties
          }
        />
        <span
          className="splash"
          style={
            {
              "--dx": `${10 + ((index * 37) % 20)}%`,
              "--dd": `${3.4 + index * 0.9}s`,
            } as CSSProperties
          }
        />
        <span className="chest-glow" />
        <span className="chest-beam" />
        <div className="chest-body">
          <PixelSprite
            sprite={CHEST_CLOSED}
            scale={8}
            className="chest-closed"
          />
          <PixelSprite sprite={CHEST_OPEN} scale={8} className="chest-open" />
        </div>
        {Array.from({ length: lootCount }, (_, i) => (
          <span key={i} className="loot" style={lootStyle(i, lootCount)}>
            <PixelSprite sprite={i % 2 === 0 ? COIN : GEM} scale={4} />
          </span>
        ))}
        <span className="spark spark-1" />
        <span className="spark spark-2" />
        <span className="spark spark-3" />
      </div>

      <ul className="slots">
        {items.map((item, i) => (
          <li
            key={item}
            tabIndex={0}
            className="slot"
            style={{ "--i": i } as CSSProperties}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
