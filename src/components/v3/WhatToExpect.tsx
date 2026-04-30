// WhatToExpect.tsx — §08 section for the /v3 staging homepage.
// Renamed from Operators in commit 11; same three-phase content.
// Three-phase ongoing program structure (Design+Install / First Results /
// Infrastructure Compounds). Replaces the prior Gantt-style timeline.
// A horizontal timeline with three open-circle node markers sits above the
// three phase cards. Below the cards, a portrait strip with operator names
// (placeholders for now) and the "Three operators. Zero account managers."
// subtitle.

interface Credential {
  name: string
  src: string
}

const CREDENTIALS: Credential[] = [
  { name: 'Microsoft', src: '/images/navalent/microsoft.png' },
  { name: 'Chase', src: '/images/navalent/chase-logo.png' },
  { name: 'P&G', src: '/images/navalent/P&G_logo 1.png' },
  { name: 'IHG', src: '/images/navalent/InterContinental_Hotels_Group.svg 1.png' },
  { name: 'Amazon', src: '/images/navalent/Amazon_logo.svg 1.png' },
  { name: 'Intel', src: '' },
  { name: 'T-Mobile', src: '/images/navalent/tmobile.png' },
]

interface Phase {
  num: string
  duration: string
  title: string
  body: string
}

const PHASES: Phase[] = [
  {
    num: 'PHASE 1',
    duration: 'Months 1–2',
    title: 'Design + Install',
    body:
      'Signal architecture defined by week two. First outreach live by week three. Measurable activity before month two ends.',
  },
  {
    num: 'PHASE 2',
    duration: 'Months 3–4',
    title: 'First Results',
    body:
      'Pipeline moves. Stalled deals re-engage. The signal library is fully active. This is the minimum window. Most customers know what they have by month four.',
  },
  {
    num: 'PHASE 3',
    duration: 'Months 5–12+',
    title: 'Infrastructure Compounds',
    body:
      'The relationship database deepens. Referral loops activate. Warm pipeline grows without added spend. The return in month ten is structurally different from month three.',
  },
]

export default function WhatToExpect() {
  return (
    <section id="what-to-expect">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">07 &nbsp; What to expect</div>
            <h2 className="section-h2">
              What the first year<br />
              <span className="slab">looks like.</span>
            </h2>
          </div>
          <p className="section-lede">
            <strong>Three phases. Twelve months.</strong> Compounding warmth
            across your highest-value accounts.
          </p>
        </div>

        {/* Horizontal three-stop timeline */}
        <div className="phase-timeline">
          <svg
            className="phase-timeline-svg"
            viewBox="0 0 1000 80"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <line x1="80" y1="50" x2="920" y2="50" stroke="var(--accent)" strokeWidth="1" />
            <g
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fontWeight="700"
              fill="var(--text)"
              letterSpacing="0.12em"
            >
              <text x="160" y="28" textAnchor="middle">MONTHS 1–2</text>
              <text x="500" y="28" textAnchor="middle">MONTHS 3–4</text>
              <text x="840" y="28" textAnchor="middle">MONTHS 5–12+</text>
            </g>
            <g fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5">
              <circle cx="160" cy="50" r="7" />
              <circle cx="500" cy="50" r="7" />
              <circle cx="840" cy="50" r="7" />
            </g>
          </svg>
        </div>

        <div className="phase-grid">
          {PHASES.map((p) => (
            <div key={p.num} className="phase-card">
              <div className="phase-overline">{p.num}</div>
              <div className="phase-duration">{p.duration}</div>
              <div className="phase-title">{p.title}</div>
              <p className="phase-body">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="phase-pull">
          Compounding,&nbsp;
          <span className="slab">not linear.</span>
        </p>

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
