// LikeSignalTile.tsx — Stage 1 signal tile. Stylized "Sarah Chen liked
// your post" notification. Heart fills in --hot to keep the palette
// consistent with the rest of v3 (no LinkedIn red).

export default function LikeSignalTile() {
  return (
    <div className="signal-tile">
      <InMark />
      <div className="signal-tile-row">
        <div className="signal-tile-avatar">SC</div>
        <div className="signal-tile-body">
          <div className="signal-tile-headline">
            <HeartIcon />
            <span>
              <b>Sarah Chen</b> liked your post
            </span>
          </div>
          <div className="signal-tile-foot">JUST NOW &middot; LINKEDIN</div>
        </div>
      </div>
    </div>
  )
}

function HeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M8 14 L2 7.5 a3.6 3.6 0 0 1 5.6 -4.4 L8 3.5 l0.4 -0.4 a3.6 3.6 0 0 1 5.6 4.4 Z"
        fill="var(--hot)"
        stroke="var(--hot)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
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
