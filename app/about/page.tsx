import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { PixelSprite } from "../components/PixelSprite";
import { education, profile } from "../data";
import { AVATAR_LCD, AVATAR_LCD_BLINK, FLOPPY } from "./art";
import { ConsoleControls } from "./ConsoleControls";
import { LcdScene } from "./LcdScene";
import "./about.css";

export const metadata: Metadata = { title: "About | Bryan Rumuy" };

function Portrait() {
  return (
    <div className="gb-portrait">
      <div className="gb-eyes-open">
        <PixelSprite sprite={AVATAR_LCD} scale={6} label="Pixel portrait of Bryan" />
      </div>
      <div className="gb-blink" aria-hidden>
        <PixelSprite sprite={AVATAR_LCD_BLINK} scale={6} />
      </div>
    </div>
  );
}

function StatusCard() {
  return (
    <section aria-labelledby="status-heading" className="gb-panel">
      <div className="gb-panel-head font-display">
        <span>Status</span>
      </div>
      <div className="gb-panel-body">
        <div className="gb-id">
          <Portrait />
          <div className="min-w-0">
            <h1 id="status-heading" className="font-display text-xl leading-tight sm:text-2xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-xl leading-snug">{profile.role}</p>
          </div>
        </div>
        <dl className="gb-facts">
          {profile.facts.map((fact) => (
            <div key={fact.label} className="gb-fact">
              <dt className="font-display text-xs">{fact.label}</dt>
              <dd className="text-xl leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function BioCard() {
  return (
    <section aria-labelledby="bio-heading" className="gb-panel">
      <h2 id="bio-heading" className="gb-panel-head font-display">
        Bio
      </h2>
      <div className="gb-panel-body">
        <p className="blink-cursor max-w-prose text-xl leading-snug sm:text-2xl">
          {profile.summary}
        </p>
      </div>
    </section>
  );
}

function SaveFile() {
  return (
    <section aria-labelledby="save-heading" className="gb-cart">
      <h2 id="save-heading" className="gb-cart-head font-display">
        Save file: education
      </h2>
      <div className="gb-cart-body">
        <div className="gb-cart-icon">
          <PixelSprite sprite={FLOPPY} scale={5} />
        </div>
        <div className="min-w-0">
          <p className="text-2xl leading-tight">{education.school}</p>
          <p className="gb-chip font-display">{education.period}</p>
          <p className="max-w-prose text-xl leading-snug">{education.degree}</p>
        </div>
      </div>
      <div className="gb-pins" aria-hidden />
    </section>
  );
}

export default function AboutPage() {
  return (
    <PageShell current="/about">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="gb-console animate-rise">
          <div className="gb-bezel-bar font-display">
            <span className="gb-led" aria-hidden />
            <span>Power</span>
          </div>

          <div className="gb-lcd-frame">
            <div className="gb-screen">
              <div className="gb-hud font-display" aria-hidden>
                <span>Now playing: About</span>
                <span className="gb-start">Press start</span>
              </div>
              <LcdScene />
              <div className="gb-grid">
                <StatusCard />
                <div className="gb-stack">
                  <BioCard />
                  <SaveFile />
                </div>
              </div>
            </div>
          </div>

          <ConsoleControls />
        </div>
      </div>
    </PageShell>
  );
}
