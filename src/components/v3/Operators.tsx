// Operators.tsx — §04 section for the /v3 staging homepage.
// Reframed for the monthly/ongoing engagement model (pulled from v2's
// "What to expect" + "Who runs it" content in
// src/pages/V2OperatingSystem/content.ts). The sprint-in-weeks narrative
// is out; the infrastructure-that-compounds-over-months narrative is in.
//
// Timeline: three phases covering Months 1–2 (Design + Install),
// Months 3–4 (First Results), Months 5–12+ (Infrastructure Compounds).
// Below, a credential-bench team panel with the v2 "Who runs it" write-up
// replaces the three portrait placeholders.

interface Credential {
  name: string
  src: string
}

// From v2 content.ts → founder.credentials (Intel intentionally left as
// text because the logo asset wasn't sourced at v2 time).
const CREDENTIALS: Credential[] = [
  { name: 'Microsoft', src: '/images/navalent/microsoft.png' },
  { name: 'Chase', src: '/images/navalent/chase-logo.png' },
  { name: 'P&G', src: '/images/navalent/P&G_logo 1.png' },
  { name: 'IHG', src: '/images/navalent/InterContinental_Hotels_Group.svg 1.png' },
  { name: 'Amazon', src: '/images/navalent/Amazon_logo.svg 1.png' },
  { name: 'Intel', src: '' },
  { name: 'T-Mobile', src: '/images/navalent/tmobile.png' },
]

export default function Operators() {
  return (
    <section id="operators">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">04 &nbsp; Operators</div>
            <h2 className="section-h2">
              Compounding,<br />
              <span className="slab">not linear.</span>
            </h2>
          </div>
          <p className="section-lede">
            This is <strong>infrastructure, not a sprint.</strong> The system
            compounds. The return in month ten is structurally different from
            month three.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-head">
            <div className="timeline-title">
              <b>Program timeline.</b> &nbsp;Monthly, ongoing.
            </div>
            <div className="timeline-meta">From $15K/mo · ongoing</div>
          </div>
          <div className="timeline-svg-wrap">
            <svg className="timeline-svg" viewBox="0 0 1000 320" xmlns="http://www.w3.org/2000/svg">
              {/* Phase labels — three windows across the first year */}
              <g fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="var(--text)" letterSpacing="0.1em">
                <text x="215" y="26" textAnchor="middle">MONTHS 01 – 02</text>
                <text x="525" y="26" textAnchor="middle">MONTHS 03 – 04</text>
                <text x="800" y="26" textAnchor="middle">MONTHS 05 – 12+</text>
              </g>
              <g stroke="var(--rule)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6">
                <line x1="50" y1="40" x2="950" y2="40" />
                <line x1="50" y1="280" x2="950" y2="280" />
              </g>
              <g stroke="var(--rule-soft)" strokeWidth="0.8">
                <line x1="380" y1="40" x2="380" y2="280" />
                <line x1="670" y1="40" x2="670" y2="280" />
              </g>

              {/* Row 1 — Design + Install */}
              <g>
                <text x="40" y="74" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Design + Install</text>
                <rect x="55" y="58" width="320" height="28" fill="var(--cold)" />
                <text x="215" y="77" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--text)">Signal architecture · capture layer · first outreach by week three</text>
              </g>

              {/* Row 2 — First Results */}
              <g>
                <text x="40" y="114" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">First Results</text>
                <rect x="385" y="98" width="280" height="28" fill="var(--warming)" />
                <text x="525" y="117" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--bg)">Pipeline moves · stalled deals re-engage</text>
              </g>

              {/* Row 3 — Infrastructure compounds */}
              <g>
                <text x="40" y="154" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Infrastructure compounds</text>
                <rect x="675" y="138" width="270" height="28" fill="var(--warm)" />
                <text x="810" y="157" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--bg)">Referral loops · warm pipeline without new spend</text>
              </g>

              {/* Row 4 — Aux dashboard (spans month 2 onward) */}
              <g>
                <text x="40" y="194" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Aux dashboard</text>
                <rect x="215" y="178" width="730" height="28" fill="var(--text)" />
                <text x="580" y="197" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--bg)">Live from Month 02 onward · updates daily</text>
              </g>

              {/* Row 5 — Monthly standup */}
              <g>
                <text x="40" y="234" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Monthly review</text>
                <rect x="55" y="218" width="890" height="28" fill="none" stroke="var(--text)" strokeWidth="1.4" strokeDasharray="6 4" />
                <text x="500" y="237" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--text)">30 min · shared doc · async by default</text>
              </g>

              {/* Row 6 — Quarterly strategy */}
              <g>
                <text x="40" y="274" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Quarterly strategy</text>
                <rect x="55" y="258" width="890" height="28" fill="var(--bg-alt)" stroke="var(--rule)" strokeWidth="1" />
                <text x="500" y="277" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--text)">Strategy reviewed · thresholds retuned · loops extended</text>
              </g>

              {/* "First results" anchor marker at month 4 boundary */}
              <line x1="670" y1="40" x2="670" y2="290" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="670" cy="40" r="5" fill="var(--accent)" />
              <text x="680" y="36" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700" fill="var(--accent)" letterSpacing="0.08em">FIRST RESULTS</text>

              <text x="500" y="310" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontStyle="italic" fontSize="13" fill="var(--text-muted)">Most clients know what they have by month four.</text>
            </svg>
          </div>
        </div>

        <div className="portraits-head">
          <div className="portraits-title">
            <b>The team.</b> &nbsp;No layers.
          </div>
          <div className="portraits-count">
            Led growth at Fortune 500s
          </div>
        </div>

        <div className="team-panel">
          <p className="team-lede">
            ERA is built by <strong>GTM executives, business leaders, and
            founders</strong> with decades of experience across Fortune 500
            enterprises. We&apos;ve led the data-driven growth programs at
            some of the largest B2B companies in the world. Now we operate
            that experience as a system inside yours.
          </p>
          <div className="team-credentials">
            <div className="team-credentials-label">Led growth at:</div>
            <div className="team-credentials-row">
              {CREDENTIALS.map((c) =>
                c.src ? (
                  <img
                    key={c.name}
                    className="team-credential-logo"
                    src={c.src}
                    alt={c.name}
                  />
                ) : (
                  <span key={c.name} className="team-credential-text">
                    {c.name}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
