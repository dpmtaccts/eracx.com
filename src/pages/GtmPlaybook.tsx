// GtmPlaybook.tsx — /gtmplaybook landing for the AI Mirror free GTM assessment.
//
// Same v4 design system as the homepage: ink + magenta + parchment + yellow
// + cobalt + rust palette, four-typeface system (Anton / Archivo Black /
// IBM Plex Sans / JetBrains Mono), brutalist editorial chrome.
//
// Page structure:
//   1. Issue bar       ▸ GTM PLAYBOOK · A FREE GTM ASSESSMENT
//   2. V4Nav            shared with /v4
//   3. Hero             Anton mega headline + sidebar (eyebrow / lede / CTA)
//   4. Three-stat band  5 / 9 / 24 (mirrors §01 hero pattern)
//   5. Disclaimer       small mono line below the stats
//   6. What you get     four-row deliverables block (mirrors §02b structure)
//   7. V4Footer         shared with /v4 (contact form + LinkedIn)
//
// "AI Mirror" is the product name (preserved). "GTM Playbook" is the
// buyer-legible label for the page itself. CTA mailto goes to hello@eracx.com
// with a prefilled subject so the assessment request can be processed
// manually until the actual flow ships.

import { useEffect } from 'react'
import '../styles/v4-tokens.css'
import '../styles/v4-components.css'
import { V4Header } from '../components/v4/V4Header'
import { V4Nav } from '../components/v4/V4Nav'
import { V4Footer } from '../components/v4/V4Footer'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap'

const PRECONNECTS = [
  { href: 'https://fonts.googleapis.com', crossOrigin: false },
  { href: 'https://fonts.gstatic.com', crossOrigin: true },
]

const STATS = [
  { num: '5', label: 'Dimensions / FRVRD' },
  { num: '9', label: 'Stages / The loop' },
  { num: '24', label: 'Signal types tracked' },
]

const ROWS = [
  {
    label: '01 / WARMTH SCORECARD',
    body:
      'Your GTM scored across the five dimensions ERA uses with paying customers: frequency, recency, value, responsiveness, density.',
  },
  {
    label: '02 / LEAK POINTS',
    body:
      'Where your funnel is losing motion. Ranked by revenue impact.',
  },
  {
    label: '03 / SIGNAL MAP',
    body:
      'Which of the 24 buying signals you are capturing today, and which you are missing.',
  },
  {
    label: '04 / NEXT STEPS',
    body:
      'A prioritized plan to fix the top leaks. The same framework we use with paying customers.',
  },
]

// Self-select qualifier rows. Each is a single conditional sentence
// ("If X, [ERA / the assessment] [does Y]"). Lets the buyer place
// themselves before they request the assessment.
const QUALIFIERS = [
  {
    label: '01 / FIFTY ACCOUNTS',
    body:
      'If you can name your next ten customers and list the fifty after that, ERA is the operating layer that warms them.',
  },
  {
    label: '02 / COLD SELLERS',
    body:
      'If your sellers are walking into accounts that have never heard of your company, the assessment shows you why.',
  },
  {
    label: '03 / OUTBOUND IS DEAD',
    body:
      'If cold sequences are no longer producing replies, the assessment maps the signals you are missing.',
  },
  {
    label: "04 / DECKS DON'T SHIP",
    body:
      'If you are tired of strategy decks and want an operating layer instead, the assessment is step one.',
  },
]

// Sample audit outputs — anonymized real screenshots from the
// `public/images/audit_screenshots/` set, mapped to the four ROWS above
// so each tile previews what its corresponding deliverable looks like.
const PREVIEW_SHOTS = [
  {
    src: '/images/audit_screenshots/dashboard.png',
    caption: '01 / WARMTH SCORECARD',
    alt: 'Sample warmth scorecard dashboard from a recent assessment, anonymized.',
  },
  {
    src: '/images/audit_screenshots/from-to.png',
    caption: '02 / LEAK POINTS',
    alt: 'Sample funnel leak point analysis showing from/to states, anonymized.',
  },
  {
    src: '/images/audit_screenshots/2x2.png',
    caption: '03 / SIGNAL MAP',
    alt: 'Sample 2x2 priority matrix mapping signals to actions, anonymized.',
  },
  {
    src: '/images/audit_screenshots/agentic.png',
    caption: '04 / NEXT STEPS',
    alt: 'Sample 90-day operating plan with agentic recommendations, anonymized.',
  },
]

export default function GtmPlaybook() {
  useEffect(() => {
    const added: HTMLLinkElement[] = []

    for (const { href, crossOrigin } of PRECONNECTS) {
      if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = href
        if (crossOrigin) link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
        added.push(link)
      }
    }

    if (!document.querySelector(`link[rel="stylesheet"][href="${FONT_HREF}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
      added.push(link)
    }

    return () => {
      for (const link of added) link.remove()
    }
  }, [])

  useEffect(() => {
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = 'smooth'
    return () => {
      html.style.scrollBehavior = previous
    }
  }, [])

  return (
    <div className="v4-root">
      <section className="v4-section v4-section--hero" id="top">
        <V4Header
          phase="▸ GTM PLAYBOOK · A FREE GTM ASSESSMENT"
          meta={['12 QUESTIONS', '10 MINUTES', 'ONE REPORT']}
        />
        <V4Nav />

        <div className="v4-statement">
          <div>
            <h1 className="v4-display-mega">
              Know where<br />
              your GTM is&nbsp;<em>leaking.</em>
            </h1>
          </div>
          <aside className="v4-statement__sidebar">
            <div className="v4-eyebrow">▸ THE ASSESSMENT</div>
            <p className="v4-body-large">
              <strong>AI Mirror</strong> is a free assessment that scores
              your GTM against the same framework ERA uses with paying
              customers. Twelve questions, ten minutes, one report.
            </p>
            <a
              href="mailto:hello@eracx.com?subject=GTM%20Playbook%20Assessment"
              className="v4-cta"
            >
              Start the assessment
              <span className="v4-cta__arrow">→</span>
            </a>
          </aside>
        </div>

        <div className="v4-statement-meta v4-statement-meta--three">
          {STATS.map(({ num, label }) => (
            <div key={label} className="v4-statement-meta__cell">
              <div className="v4-statement-meta__num">{num}</div>
              <div className="v4-statement-meta__label">{label}</div>
            </div>
          ))}
        </div>

        <div className="v4-gtmplaybook__disclaimer">
          FREE, NO SALES CALL REQUIRED, TAKES ABOUT TEN MINUTES.
        </div>
      </section>

      <section className="v4-section v4-section--whatyouget" id="report">
        <div className="v4-whatyouget">
          <div className="v4-whatyouget__header">
            <h2 className="v4-whatyouget__display">
              What you get<br />from the report.
            </h2>
            <p className="v4-whatyouget__subhead">
              Every assessment produces the same four-part output. No fluff,
              no upsell.
            </p>
          </div>

          <div className="v4-whatyouget__timeline">
            {ROWS.map(({ label, body }) => (
              <div key={label} className="v4-whatyouget__row">
                <div className="v4-whatyouget__label">{label}</div>
                <div className="v4-whatyouget__body">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v4-section v4-section--report-preview" id="preview">
        <div className="v4-report-preview">
          <div className="v4-report-preview__header">
            <p className="v4-report-preview__eyebrow">▸ FROM A RECENT ASSESSMENT</p>
            <h2 className="v4-report-preview__display">
              What it actually<br />looks like.
            </h2>
          </div>

          <div className="v4-report-preview__grid">
            {PREVIEW_SHOTS.map(({ src, caption, alt }) => (
              <figure key={src} className="v4-report-preview__tile">
                <img src={src} alt={alt} className="v4-report-preview__img" />
                <figcaption className="v4-report-preview__caption">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="v4-report-preview__attr">
            SAMPLE OUTPUTS · FROM RECENT ASSESSMENTS · ANONYMIZED.
          </p>
        </div>
      </section>

      <section className="v4-section v4-section--qualifier" id="qualifier">
        <div className="v4-qualifier">
          <div className="v4-qualifier__header">
            <p className="v4-qualifier__eyebrow">▸ THIS IS FOR YOU</p>
            <h2 className="v4-qualifier__display">
              You see yourself<br />in these four lines.
            </h2>
          </div>

          <div className="v4-qualifier__rows">
            {QUALIFIERS.map(({ label, body }) => (
              <div key={label} className="v4-qualifier__row">
                <div className="v4-qualifier__label">{label}</div>
                <div className="v4-qualifier__body">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <V4Footer />
    </div>
  )
}
