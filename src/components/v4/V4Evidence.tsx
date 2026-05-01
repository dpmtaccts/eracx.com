/**
 * V4Evidence — §04 of v4 marketing site.
 *
 * Yellow-ground proof section. Customer logos render in flat ink for
 * editorial coherence (color sacrificed for visual rhythm). Hero
 * testimonial dominates, one supporting testimonial below, balanced
 * by a small founder photo inset.
 *
 * Two confirmed testimonials (Stephen Roesler / Miniac was requested
 * but no copy exists in source — Justin redirected to Nate as hero):
 * - Hero: Nate Houghton (Lorikeet) — Head of Sales, Americas
 * - Supporting: Lara Vandenberg (Assemble) — Founder
 *
 * Logo wall shows four ERA customer marks (Lorikeet, Assemble,
 * Netrush, Navalent), all rendered in flat ink via filter:
 * brightness(0) + opacity 0.85 — Bloomberg/Turley editorial unity.
 *
 * White text is FORBIDDEN on yellow ground. Magenta accent is rested
 * for this section per the v4 color rhythm.
 */

import { V4Header } from './V4Header'

const LOGOS = [
  { name: 'Lorikeet', src: '/images/navalent/Lorikeet_logo_color.png' },
  { name: 'Assemble', src: '/images/betterup/assemble.png' },
  { name: 'Netrush', src: '/assets/clients/netrush.webp' },
  { name: 'Navalent', src: '/images/navalent/navalent-logo.png' },
]

export function V4Evidence() {
  return (
    <section className="v4-section v4-section--evidence" id="evidence">
      <V4Header
        phase="§04 · EVIDENCE"
        meta={['NAMED CUSTOMERS', 'REAL LOOPS RUNNING', 'REAL RESULTS']}
      />

      <div className="v4-evidence">
        <div className="v4-evidence__header">
          <h2 className="v4-evidence__display">
            Real loops.<br />Real <em>customers</em>.
          </h2>
          <p className="v4-evidence__lede">
            Companies running real signal-based pipeline today, each
            solving different problems, each supported by ERA's operator
            team alongside theirs.
          </p>
        </div>

        {/* --------- Logo wall --------- */}
        <div className="v4-logo-wall">
          {LOGOS.map(({ name, src }) => (
            <div key={name} className="v4-logo-wall__item">
              <img className="v4-logo-wall__img" src={src} alt={name} />
            </div>
          ))}
        </div>

        {/* --------- Hero quote --------- */}
        <div className="v4-hero-quote">
          <p className="v4-hero-quote__text">
            Justin builds the thing most consultants just talk about.
            Actual operational systems. Scoring, enrichment, sequencing,
            CRM. When he hands it off, your team can run it.
          </p>
          <div className="v4-hero-quote__attribution">
            <img
              className="v4-hero-quote__attribution-logo"
              src="/images/navalent/Lorikeet_logo_color.png"
              alt="Lorikeet"
            />
            <span>Nate Houghton · Head of Sales, Americas · Lorikeet</span>
          </div>
        </div>

        {/* --------- Supporting + founder --------- */}
        <div className="v4-evidence-bottom">
          <div className="v4-quote-card">
            <p className="v4-quote-card__text">
              Era is an asset to any high-growth company, impacting every
              aspect of revenue, marketing, customer success, and account
              management.
            </p>
            <div className="v4-quote-card__attribution">
              <img
                className="v4-quote-card__attribution-logo"
                src="/images/betterup/assemble.png"
                alt="Assemble"
              />
              <span>Lara Vandenberg · Founder · Assemble</span>
            </div>
          </div>

          <div className="v4-founder-inset">
            <img
              className="v4-founder-inset__photo"
              src="/images/justinmarshall.png"
              alt="Justin Marshall"
            />
            <div className="v4-founder-inset__caption">
              Justin Marshall<br />ERA founder
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
