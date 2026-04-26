// CommentSignalTile.tsx — Stage 2 signal tile. Stylized LinkedIn
// comment notification with a two-line italic preview of the comment.

export default function CommentSignalTile() {
  return (
    <div className="signal-tile">
      <InMark />
      <div className="signal-tile-row">
        <div className="signal-tile-avatar">SC</div>
        <div className="signal-tile-body">
          <div className="signal-tile-headline">
            <CommentIcon />
            <span>
              <b>Sarah Chen</b> commented
            </span>
          </div>
          <p className="signal-tile-preview">
            &ldquo;This matches what we&rsquo;ve been seeing in Q3. The forms
            are filling but conversion is flat&hellip;&rdquo;
          </p>
          <div className="signal-tile-foot">2 HOURS AGO &middot; LINKEDIN</div>
        </div>
      </div>
    </div>
  )
}

function CommentIcon() {
  return (
    <svg
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
      <path d="M2 4 h12 v8 h-7 l-3 2.5 v-2.5 H2 Z" />
    </svg>
  )
}

function InMark() {
  return (
    <svg
      className="signal-tile-inmark"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <rect width="16" height="16" rx="2" fill="var(--accent)" opacity="0.35" />
      <text
        x="8"
        y="11.5"
        textAnchor="middle"
        fontFamily="Instrument Sans, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="var(--bg)"
      >
        in
      </text>
    </svg>
  )
}
