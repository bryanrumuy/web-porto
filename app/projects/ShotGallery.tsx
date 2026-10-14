"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectShotGroup } from "../data";

const FULL_WIDTH = 1600;
const FULL_HEIGHT = 808;

/**
 * Screenshots in a pixel "monitor" frame with a thumbnail strip. A project can
 * have several groups (customer side, admin side), shown as tabs. The card is
 * narrow, so the main image opens in a larger dialog for reading the details.
 */
export function ShotGallery({
  groups,
  title,
}: {
  groups: readonly ProjectShotGroup[];
  title: string;
}) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const group = groups[groupIndex];
  const shots = group.shots;
  const current = shots[index];
  const step = (direction: 1 | -1) =>
    setIndex((value) => (value + direction + shots.length) % shots.length);
  const chooseGroup = (next: number) => {
    setGroupIndex(next);
    setIndex(0);
  };

  return (
    <figure className="shots" aria-label={`${title} screenshots`}>
      {groups.length > 1 && (
        <div
          role="group"
          aria-label="Which side of the app"
          className="shots-tabs"
        >
          {groups.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={i === groupIndex}
              onClick={() => chooseGroup(i)}
              className="shots-tab"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="shots-frame shots-open"
        aria-label={`View ${current.label} larger`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <span className="shots-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <b key={`label-${current.src}`} className="shots-swap">
            {current.label}
          </b>
        </span>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={FULL_WIDTH}
          height={FULL_HEIGHT}
          sizes="(min-width: 1024px) 460px, 92vw"
          className="shots-img shots-swap"
        />
      </button>
      <figcaption
        key={`cap-${current.src}`}
        className="shots-caption shots-swap"
      >
        {current.caption}
      </figcaption>

      <div
        role="group"
        aria-label="Choose a screenshot"
        className="shots-thumbs"
      >
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            aria-pressed={i === index}
            aria-label={shot.label}
            onClick={() => setIndex(i)}
            className="shots-thumb"
          >
            <Image
              src={shot.src}
              alt=""
              width={FULL_WIDTH}
              height={FULL_HEIGHT}
              sizes="140px"
            />
          </button>
        ))}
      </div>
      <p className="shots-note">
        {group.note ? `${group.note} ` : ""}Click the image to enlarge it.
      </p>

      <dialog
        ref={dialogRef}
        className="shots-dialog"
        aria-label={`${title} screenshot: ${current.label}`}
        onClick={(event) => {
          // A click on the backdrop (the dialog element itself) closes it.
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="shots-dialog-body">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={FULL_WIDTH}
            height={FULL_HEIGHT}
            sizes="94vw"
            className="shots-dialog-img shots-swap"
          />
          <p
            key={`dcap-${current.src}`}
            className="shots-dialog-caption shots-swap"
          >
            {current.caption}
          </p>
          <div className="shots-dialog-actions">
            <button
              type="button"
              className="pixel-btn"
              onClick={() => step(-1)}
            >
              &lt; Previous
            </button>
            <button type="button" className="pixel-btn" onClick={() => step(1)}>
              Next &gt;
            </button>
            <button
              type="button"
              className="pixel-btn pixel-btn-solid"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </figure>
  );
}
