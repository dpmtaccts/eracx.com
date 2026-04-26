// LinkedInCommentMock.tsx — stylized LinkedIn comment thread. Truncated
// post at the top for context, then an indented reply from a named
// VP Growth. Same visual cues as the post mock.

export default function LinkedInCommentMock() {
  return (
    <div className="mock mock-linkedin-comment" role="img" aria-label="LinkedIn comment mock">
      <InMark />
      <div className="mock-linkedin-truncated">
        <div className="mock-linkedin-truncated-head">
          <div className="mock-avatar mock-avatar--xs">JM</div>
          <div className="mock-linkedin-truncated-name">
            Justin Marshall <span className="mock-linkedin-truncated-meta">&middot; 1d</span>
          </div>
        </div>
        <p className="mock-linkedin-truncated-body">
          Most pipeline metrics measure activity, not relationships.{' '}
          <span className="mock-linkedin-seemore">&hellip; see more</span>
        </p>
      </div>
      <div className="mock-divider" />
      <div className="mock-linkedin-comment-body">
        <div className="mock-avatar mock-avatar--md">SC</div>
        <div className="mock-linkedin-comment-content">
          <div className="mock-linkedin-name">Sarah Chen</div>
          <div className="mock-linkedin-meta">
            VP Growth at Midmarket Holdings &middot; 2h
          </div>
          <p className="mock-linkedin-comment-text">
            This matches what we&rsquo;ve been seeing in Q3. The forms are
            filling but conversion is flat. Curious how you measure the
            eighteen-month part.
          </p>
          <div className="mock-linkedin-comment-actions">
            <span>Like</span>
            <span>&middot;</span>
            <span>Reply</span>
            <span>&middot;</span>
            <span>3 likes</span>
          </div>
        </div>
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
