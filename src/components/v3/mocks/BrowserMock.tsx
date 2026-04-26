// BrowserMock.tsx — stylized browser window showing a visit to
// eracx.com. The page body is abstracted (typographic blocks, not a
// real render) plus heatmap dots and a corner annotation. Stays in the
// v3 palette so it reads as ERA at a glance.

export default function BrowserMock() {
  return (
    <div className="mock mock-browser" role="img" aria-label="Browser mock — visit to eracx.com">
      <div className="mock-browser-chrome">
        <div className="mock-browser-dots">
          <span style={{ background: '#FF5F57' }} />
          <span style={{ background: '#FEBC2E' }} />
          <span style={{ background: '#28C840' }} />
        </div>
        <div className="mock-browser-url">
          <LockIcon />
          <span>https://eracx.com</span>
        </div>
        <div className="mock-browser-spacer" />
      </div>
      <div className="mock-browser-body">
        {/* Abstracted hero: serif headline blocks + slab + lede + CTA */}
        <div className="mock-browser-line mock-browser-line--xl" />
        <div className="mock-browser-line mock-browser-line--lg" />
        <div className="mock-browser-line mock-browser-line--accent" />
        <div className="mock-browser-meta">
          <div className="mock-browser-line mock-browser-line--sm" />
          <div className="mock-browser-line mock-browser-line--sm" />
        </div>
        <div className="mock-browser-cta">
          <div className="mock-browser-pill mock-browser-pill--filled" />
          <div className="mock-browser-pill" />
        </div>

        {/* Heatmap dots — visitor lingered on the headline + CTA */}
        <div className="mock-heat mock-heat-1" />
        <div className="mock-heat mock-heat-2" />
        <div className="mock-heat mock-heat-3" />
        <div className="mock-heat mock-heat-4" />

        {/* Bottom-right annotation */}
        <div className="mock-browser-annotation">2 visits &middot; 4m dwell</div>
      </div>
    </div>
  )
}

function LockIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="10" height="7" rx="1.2" />
      <path d="M5 7 V5 a3 3 0 0 1 6 0 V7" />
    </svg>
  )
}
