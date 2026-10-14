import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { PixelSprite } from "../components/PixelSprite";
import { DialogBox } from "../components/DialogBox";
import { CopyEmail } from "../components/CopyEmail";
import { TROPHY } from "../components/sprites";
import { profile } from "../data";
import { INVADER_A, INVADER_B, JOYSTICK } from "./art";
import { CoinCabinet } from "./CoinCabinet";
import "./contact.css";

export const metadata: Metadata = { title: "Contact | Bryan Rumuy" };

const INVADER_TONES = ["pink", "cyan", "amber", "cyan", "pink"] as const;

function InvaderRow() {
  return (
    <div className="inv-band" aria-hidden>
      <div className="inv-row">
        {INVADER_TONES.map((tone, i) => (
          <span key={i} className={`inv inv-${tone}`}>
            <PixelSprite sprite={INVADER_A} className="inv-a" />
            <PixelSprite sprite={INVADER_B} className="inv-b" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <PageShell current="/contact">
      <div className="cab">
        <InvaderRow />

        <CoinCabinet>
          <div className="cab-marquee">
            <h1 className="cab-title">Contact Bryan</h1>
            <p className="cab-sub">
              Insert a message to start the conversation.
            </p>
          </div>

          <div className="cab-screen">
            <div className="cab-hud" aria-hidden>
              <span>1UP</span>
              <span className="blink-arrow">Ready</span>
              <span>2UP</span>
            </div>

            <DialogBox speaker={profile.name} text={profile.seeking} />

            <section className="cab-scores" aria-labelledby="reach-heading">
              <h2 id="reach-heading">
                <PixelSprite sprite={TROPHY} scale={3} />
                <span>How to reach me</span>
                <PixelSprite sprite={TROPHY} scale={3} />
              </h2>
              <dl>
                <div className="cab-row">
                  <dt>Email</dt>
                  <dd data-coin>
                    <CopyEmail email={profile.email} />
                  </dd>
                </div>
                <div className="cab-row">
                  <dt>GitHub</dt>
                  <dd>
                    <a
                      href={profile.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cab-link"
                    >
                      github.com/bryanrumuy
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
                <div className="cab-row">
                  <dt>Based in</dt>
                  <dd>{profile.location}</dd>
                </div>
              </dl>
            </section>
          </div>

          <div className="cab-deck">
            <a
              href={`mailto:${profile.email}`}
              data-coin
              className="arcade-btn cab-a"
            >
              Open mail app
            </a>
            <PixelSprite sprite={JOYSTICK} scale={5} className="cab-stick" />
            <a
              href={profile.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="arcade-btn arcade-btn-cyan cab-b"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </CoinCabinet>

        <div className="cab-floor" aria-hidden />
      </div>
    </PageShell>
  );
}
