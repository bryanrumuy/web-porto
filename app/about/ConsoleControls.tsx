/** Decorative handheld controls. Purely visual, hidden from assistive tech. */
export function ConsoleControls() {
  return (
    <div className="gb-controls" aria-hidden>
      <div className="gb-dpad">
        <span className="gb-dpad-h" />
        <span className="gb-dpad-v" />
        <span className="gb-dpad-dot" />
      </div>

      <div className="gb-pills">
        <span className="gb-pill" />
        <span className="gb-pill" />
      </div>

      <div className="gb-ab">
        <span className="gb-btn gb-btn-b">B</span>
        <span className="gb-btn gb-btn-a">A</span>
      </div>

      <div className="gb-speaker">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}
