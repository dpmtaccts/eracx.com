// EmailMock.tsx — two stacked inbox previews showing the parallel
// multi-thread move. A small "x2" badge in the top-right ties the
// two rows to the same campaign event.

interface Row {
  to: string
  subject: string
  preview: string
  time: string
  initials: string
  starred: boolean
}

const ROWS: Row[] = [
  {
    to: 'Sarah Chen',
    subject: 'Sarah, on your comment about eighteen months',
    preview:
      'You mentioned forms filling but conversion flat. There&rsquo;s a measurement layer…',
    time: '10:42 AM',
    initials: 'JM',
    starred: true,
  },
  {
    to: 'Daniel Reyes (CRO)',
    subject: 'Forwarded — pipeline measurement note for Sarah',
    preview:
      'Looping you in. Sarah and I were talking about the eighteen-month layer in pipeline…',
    time: '10:43 AM',
    initials: 'JM',
    starred: false,
  },
]

export default function EmailMock() {
  return (
    <div className="mock mock-email" role="img" aria-label="Email parallel-thread mock">
      <div className="mock-email-badge">&times;2</div>
      {ROWS.map((row, i) => (
        <div key={i} className="mock-email-row">
          <div className="mock-email-to">To: {row.to}</div>
          <div className="mock-email-line">
            <StarIcon filled={row.starred} />
            <div className="mock-avatar mock-avatar--sm">{row.initials}</div>
            <div className="mock-email-content">
              <div className="mock-email-headrow">
                <span className="mock-email-from">ERA &middot; Justin</span>
                <span className="mock-email-time">{row.time}</span>
              </div>
              <div className="mock-email-subject">{row.subject}</div>
              <div className="mock-email-preview">{row.preview}</div>
            </div>
            <PaperclipIcon />
          </div>
        </div>
      ))}
    </div>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M8 1.6 l1.96 4.0 l4.4 0.65 l-3.18 3.1 l0.75 4.4 l-3.94 -2.07 l-3.94 2.07 l0.75 -4.4 l-3.18 -3.1 l4.4 -0.65 Z"
        fill={filled ? 'var(--gold)' : 'none'}
        stroke={filled ? 'var(--gold)' : 'var(--text-muted)'}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PaperclipIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="var(--text-muted)"
      strokeWidth="1.2"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M11 5 L5.5 10.5 a2.5 2.5 0 0 0 3.5 3.5 L14 9 a4 4 0 0 0 -5.5 -5.5 L3 9.5" />
    </svg>
  )
}
