// VisitSignalTile.tsx — Stage 3 signal tile. Reads as a dashboard ping
// rather than a notification. Two-dot inline timeline and a "4m dwell"
// badge tell the visit story.

export default function VisitSignalTile() {
  return (
    <div className="signal-tile signal-tile--analytics">
      <CrosshairIcon />
      <div className="signal-tile-headline">
        <ArrowIcon />
        <span>
          <b>Sarah Chen</b> &rarr; eracx.com
        </span>
      </div>
      <div className="visit-line">
        <div className="visit-timeline" aria-hidden="true">
          <div className="visit-track" />
          <div className="visit-dot visit-dot--1">
            <span className="visit-stamp">Mon</span>
          </div>
          <div className="visit-dot visit-dot--2">
            <span className="visit-stamp">Wed</span>
          </div>
        </div>
        <div className="visit-dwell">4m DWELL</div>
      </div>
      <div className="signal-tile-foot">DETECTED VIA HOCKEYSTACK &middot; RB2B</div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M3 8 H13" />
      <path d="M9 4 L13 8 L9 12" />
    </svg>
  )
}

function CrosshairIcon() {
  return (
    <svg
      className="signal-tile-inmark"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="5" />
      <line x1="8" y1="1" x2="8" y2="3.5" />
      <line x1="8" y1="12.5" x2="8" y2="15" />
      <line x1="1" y1="8" x2="3.5" y2="8" />
      <line x1="12.5" y1="8" x2="15" y2="8" />
      <circle cx="8" cy="8" r="1" fill="var(--accent)" stroke="none" />
    </svg>
  )
}
