// EmailSignalTile.tsx — Stage 4 signal tile. Inbox-style email reply
// notification with a "+ CRO replied" badge that hints at the parallel
// thread paying off.

export default function EmailSignalTile() {
  return (
    <div className="signal-tile">
      <EnvelopeIcon className="signal-tile-inmark" />
      <div className="signal-tile-row">
        <div className="signal-tile-avatar">SC</div>
        <div className="signal-tile-body">
          <div className="signal-tile-headline">
            <EnvelopeIcon />
            <span>
              <b>Sarah Chen</b> replied
            </span>
            <span className="signal-tile-badge">+ CRO replied</span>
          </div>
          <div className="signal-tile-subject">
            re: your comment about eighteen months
          </div>
          <p className="signal-tile-preview">
            &ldquo;You&rsquo;re right that we&rsquo;re treating early like
            dead. Curious what measurement layer you&rsquo;d recommend&hellip;&rdquo;
          </p>
          <div className="signal-tile-foot">2 MINUTES AGO &middot; GMAIL</div>
        </div>
      </div>
    </div>
  )
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.4"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect x="2" y="3.5" width="12" height="9" rx="1" />
      <path d="M2.5 4.5 L8 9 L13.5 4.5" />
    </svg>
  )
}
