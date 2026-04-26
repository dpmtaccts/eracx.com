// MeetingSignalTile.tsx — Stage 5 signal tile. Calendar-accept
// confirmation card with a small green dot to evoke the "Yes" state.

export default function MeetingSignalTile() {
  return (
    <div className="signal-tile">
      <CalendarIcon className="signal-tile-inmark" />
      <div className="signal-tile-row">
        <div className="signal-tile-avatar">SC</div>
        <div className="signal-tile-body">
          <div className="signal-tile-headline">
            <CalendarIcon />
            <span>
              <b>Sarah Chen</b> accepted
            </span>
            <span className="signal-tile-confirmed" aria-label="Confirmed">
              <span className="signal-tile-confirmed-dot" />
            </span>
          </div>
          <div className="signal-tile-subject">ERA &middot; Midmarket intro</div>
          <div className="signal-tile-when">
            THU MAY 14 &middot; 2:00 PM PST &middot; 30 MIN
          </div>
          <div className="signal-tile-foot">CONFIRMED VIA GOOGLE CALENDAR</div>
        </div>
      </div>
    </div>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.3"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect x="2.5" y="3.5" width="11" height="10" rx="1" />
      <line x1="2.5" y1="6.5" x2="13.5" y2="6.5" />
      <line x1="5.5" y1="2" x2="5.5" y2="5" />
      <line x1="10.5" y1="2" x2="10.5" y2="5" />
    </svg>
  )
}
