// CalendarMock.tsx — calendar event card mock. A small "GC" hint at
// the top evokes the Google Calendar / Cal.com category without
// borrowing their colors. ERA palette throughout.

export default function CalendarMock() {
  return (
    <div className="mock mock-calendar" role="img" aria-label="Calendar event mock">
      <div className="mock-calendar-tab">
        <CalIcon />
        <span>Google Calendar</span>
      </div>
      <div className="mock-calendar-card">
        <div className="mock-calendar-tagline">30 MIN</div>
        <h3 className="mock-calendar-title">
          ERA &middot; Midmarket Holdings intro
        </h3>
        <div className="mock-calendar-when">
          Thursday, May 14 &middot; 2:00 PM PST
        </div>
        <div className="mock-calendar-attendees">
          <div className="mock-avatar mock-avatar--sm">SC</div>
          <div className="mock-avatar mock-avatar--sm">DR</div>
          <div className="mock-avatar mock-avatar--sm">JM</div>
          <span className="mock-calendar-attendees-label">3 attendees</span>
        </div>
        <div className="mock-calendar-confirmed">
          <span className="mock-calendar-dot" />
          Confirmed
        </div>
      </div>
    </div>
  )
}

function CalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
      <line x1="2.5" y1="6.5" x2="13.5" y2="6.5" />
      <line x1="5.5" y1="2" x2="5.5" y2="5" />
      <line x1="10.5" y1="2" x2="10.5" y2="5" />
    </svg>
  )
}
