// Evidence.tsx — §05 section for the /v3 staging homepage.
// Four big-number tiles (warmth lift, first outreach, first results,
// end-to-end stages) followed by two named customer quote blocks. Quotes,
// names, titles, and logos sourced verbatim from the prior /v3 build —
// retained because they were vetted by the customers (Nate Houghton at
// Lorikeet, Lara Vandenberg at Publicist).

import type { ReactNode } from 'react'

interface BigNum {
  label: string
  value: string
  unit?: string
  // narrowValue → use a smaller display font so multi-character values
  // like "Months 3–4" or "Week 3" don't wrap or overflow at any width.
  narrowValue?: boolean
  context: ReactNode
}

const BIG_NUMBERS: BigNum[] = [
  {
    label: 'Warmth lift',
    value: '+40',
    unit: 'pts',
    context: (
      <>
        Average composite lift across <b>engaged named accounts</b> at a B2B
        SaaS platform.
      </>
    ),
  },
  {
    label: 'First outreach',
    value: 'Week 3',
    narrowValue: true,
    context: (
      <>
        Live within three weeks of kickoff. <b>Signal-driven from day one.</b>
      </>
    ),
  },
  {
    label: 'First results',
    value: 'Months 3–4',
    narrowValue: true,
    context: (
      <>
        Typical window for <b>measurable pipeline movement</b> at engaged
        accounts.
      </>
    ),
  },
  {
    label: 'End-to-end',
    value: '9',
    unit: 'stages',
    context: (
      <>
        Detect through Retain. <b>The full revenue lifecycle</b>, not just
        top-of-funnel.
      </>
    ),
  },
]

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  companyLogo: string
  companyLogoAlt: string
  stars: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Justin builds the thing most consultants just talk about. Actual operational systems. Scoring, enrichment, sequencing, CRM. When he hands it off, your team can run it.',
    name: 'Nate Houghton',
    role: 'Head of Sales, Americas',
    company: 'Lorikeet',
    companyLogo: '/images/navalent/Lorikeet_logo_color.png',
    companyLogoAlt: 'Lorikeet',
    stars: 5,
  },
  {
    quote:
      'Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, customer success, and account management.',
    name: 'Lara Vandenberg',
    role: 'Founder',
    company: 'Publicist',
    companyLogo: '/assets/clients/publicist.png',
    companyLogoAlt: 'Publicist',
    stars: 5,
  },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="quote-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < count ? 'var(--accent)' : 'none'}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 1.6 l1.96 4.0 l4.4 0.65 l-3.18 3.1 l0.75 4.4 l-3.94 -2.07 l-3.94 2.07 l0.75 -4.4 l-3.18 -3.1 l4.4 -0.65 Z" />
        </svg>
      ))}
    </div>
  )
}

export default function Evidence() {
  return (
    <section id="evidence">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">06 &nbsp; Evidence</div>
            <h2 className="section-h2">
              The numbers<br />
              <span className="slab">
                before <span className="accent">the narrative.</span>
              </span>
            </h2>
          </div>
          <div className="section-lede">
            <p>
              Audited results across engagements. Quotes come after the
              numbers, not before.
            </p>
          </div>
        </div>

        <div className="big-numbers">
          {BIG_NUMBERS.map((n) => (
            <div key={n.label} className="big-num">
              <div className="big-num-label">{n.label}</div>
              <div
                className={`big-num-value${n.narrowValue ? ' big-num-value--narrow' : ''}`}
              >
                {n.value}
                {n.unit && <span className="big-num-unit">{n.unit}</span>}
              </div>
              <p className="big-num-context">{n.context}</p>
            </div>
          ))}
        </div>

        <div className="quote-blocks">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="quote-block">
              <div className="quote-block-head">
                <img
                  className="quote-block-logo"
                  src={t.companyLogo}
                  alt={t.companyLogoAlt}
                />
                <StarRow count={t.stars} />
              </div>
              <blockquote className="quote-block-text">{t.quote}</blockquote>
              <figcaption className="quote-block-attrib">
                <b>{t.name}</b>
                <span>
                  {t.role} &middot; {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
