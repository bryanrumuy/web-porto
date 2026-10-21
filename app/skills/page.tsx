import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { skills } from "../data";
import {
  Bat,
  Cobwebs,
  Embers,
  Mist,
  Motes,
  Spider,
  WallRunes,
} from "./Ambience";
import { Chest } from "./Chest";
import { Torch } from "./Torch";
import "./skills.css";
import "./ambience.css";
import "./chest.css";

export const metadata: Metadata = { title: "Skills | Bryan Rumuy" };

export default function SkillsPage() {
  return (
    <PageShell current="/skills">
      <div className="dungeon">
        <WallRunes />
        <Cobwebs />
        <Motes />
        <Embers />
        <Bat />

        <div className="dungeon-hall">
          <span className="torch-glow torch-glow-left" aria-hidden="true" />
          <span className="torch-glow torch-glow-right" aria-hidden="true" />
          <div className="hall-row">
            <Torch side="left" />
            <div className="sign-plate">
              <h1 className="font-display text-xl leading-relaxed text-amber sm:text-3xl">
                Skills
              </h1>
              <p className="mt-2 text-xl text-foreground sm:text-2xl">
                Everything in the pack, sorted by chest.
              </p>
              <p className="mt-2 text-base text-muted">
                * Built with AI assistance
              </p>
            </div>
            <Torch side="right" />
          </div>
        </div>

        <div className="dungeon-body">
          <div className="rail" aria-hidden="true">
            <Spider variant="slow" />
            <div className="rail-torch">
              <Torch side="left" />
            </div>
          </div>
          <div className="chest-row">
            {skills.map((entry, index) => (
              <Chest
                key={entry.group}
                group={entry.group}
                index={index}
                tone={entry.tone}
                items={entry.items}
              />
            ))}
          </div>
          <div className="rail" aria-hidden="true">
            <Spider />
            <div className="rail-torch">
              <Torch side="right" />
            </div>
          </div>
        </div>
        <Mist />
        <div className="dungeon-floor" aria-hidden="true" />
      </div>
    </PageShell>
  );
}
