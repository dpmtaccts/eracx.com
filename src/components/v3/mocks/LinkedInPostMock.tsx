// LinkedInPostMock.tsx — stylized LinkedIn post card for the vertical
// HowItWorks scrollytelling. Not a screenshot. Visual cues that evoke
// LinkedIn (avatar circle, name + timestamp + globe, reaction row,
// "in" mark in the corner) using ERA's typography and palette.

const POST_BODY =
  "Most pipeline metrics measure activity, not relationships. Forms filled and demos booked are theater. Real pipeline is the relationship you build with the right buyers eighteen months before they're ready to sign."

export default function LinkedInPostMock() {
  return (
    <div className="mock mock-linkedin-post" role="img" aria-label="LinkedIn post mock">
      <InMark />
      <div className="mock-linkedin-head">
        <div className="mock-avatar mock-avatar--lg">JM</div>
        <div className="mock-linkedin-id">
          <div className="mock-linkedin-name">Justin Marshall</div>
          <div className="mock-linkedin-meta">
            Founder, ERA &middot; 1d &middot; <GlobeIcon />
          </div>
        </div>
      </div>
      <p className="mock-linkedin-body">{POST_BODY}</p>
      <div className="mock-linkedin-reactions">
        <ReactionDot />
        <span className="mock-linkedin-count">127</span>
        <div className="mock-linkedin-spacer" />
        <span className="mock-linkedin-action">Like</span>
        <span className="mock-linkedin-action">Comment</span>
        <span className="mock-linkedin-action">Repost</span>
        <span className="mock-linkedin-action">Share</span>
      </div>
    </div>
  )
}

function InMark() {
  return (
    <svg
      className="mock-inmark"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <rect width="16" height="16" rx="2" fill="var(--text-muted)" opacity="0.45" />
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

function GlobeIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      style={{ verticalAlign: '-1px', marginLeft: '4px' }}
    >
      <circle cx="8" cy="8" r="6.5" />
      <ellipse cx="8" cy="8" rx="3.2" ry="6.5" />
      <line x1="1.5" y1="8" x2="14.5" y2="8" />
    </svg>
  )
}

function ReactionDot() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#0A66C2" />
      <path
        d="M5.2 8 l1.7 1.7 l4 -4"
        fill="none"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
