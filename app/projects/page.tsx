import type { Metadata } from "next";
import { Fragment } from "react";
import { PageShell } from "../components/PageShell";
import { PixelSprite } from "../components/PixelSprite";
import { AVATAR } from "../components/sprites";
import { projects } from "../data";
import { CASTLE, FLAG, TOWER, TREE } from "./art";
import { Backdrop } from "./Backdrop";
import { LevelCard } from "./LevelCard";
import { Bend, Deco, Marker, Perch } from "./Scenery";
import "./projects.css";

export const metadata: Metadata = { title: "Projects | Bryan Rumuy" };

const MARKERS = [
  { sprite: FLAG, scale: 5, label: "Level 1", deco: "mill" },
  { sprite: CASTLE, scale: 3, label: "Level 2", deco: "crossing" },
  { sprite: TOWER, scale: 4, label: "Level 3", deco: "grove" },
  { sprite: TREE, scale: 5, label: "Level 4", deco: "mill" },
] as const;

export default function ProjectsPage() {
  return (
    <PageShell current="/projects">
      <div className="map">
        <Backdrop />

        <div className="map-inner">
          <header className="map-sign pixel-box">
            <h1 className="font-display text-2xl sm:text-3xl">Projects</h1>
            <p className="mt-3 text-xl leading-snug text-muted">
              Four projects, from client systems to a thesis, laid out as levels
              on a map.
            </p>
          </header>

          <ol className="trail">
            <li className="stop stop-start">
              <div className="stop-marker">
                <Perch>
                  <PixelSprite
                    sprite={AVATAR}
                    scale={4}
                    label="Bryan's avatar at the start"
                    className="stop-avatar"
                  />
                </Perch>
              </div>
              <p className="hello">Start here and follow the trail.</p>
              <Deco kind="grove" />
            </li>

            {projects.map((project, index) => {
              const marker = MARKERS[index % MARKERS.length];
              return (
                <Fragment key={project.title}>
                  <Bend index={index} />
                  <li
                    className={`stop ${index % 2 === 0 ? "stop-left" : "stop-right"}`}
                  >
                    <div className="stop-marker">
                      <Perch>
                        <Marker sprite={marker.sprite} scale={marker.scale} />
                      </Perch>
                      <span className="stop-label">{marker.label}</span>
                    </div>
                    <LevelCard project={project} id={`level-${index + 1}`} />
                    <Deco kind={marker.deco} />
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </PageShell>
  );
}
