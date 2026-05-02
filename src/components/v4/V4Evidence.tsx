/**
 * V4Evidence — §04 of v4 marketing site.
 *
 * Yellow-ground proof section. Customer logos render in flat ink for
 * editorial coherence (color sacrificed for visual rhythm). Two hero
 * testimonials stacked with a divider rule between them.
 *
 * Three testimonials confirmed (third pending assets):
 * - Nate Houghton (Lorikeet) — operator-led GTM
 * - Lara Vandenberg (Assemble) — earlier engagement
 * - Stephen Roesler (Miniac) — pending logo + quote, will become third
 *   hero in the stack
 *
 * Founder photo intentionally excluded. Personality lives in About /
 * footer, not Evidence. Customer proof is the only argument here.
 *
 * Logo treatment uses filter: brightness(0) on color PNGs or
 * fill="currentColor" on SVGs to render every logo in flat ink.
 */

import { V4Header } from './V4Header'

const LOGOS = [
  { name: 'Lorikeet', src: '/images/navalent/Lorikeet_logo_color.png' },
  { name: 'Assemble', src: '/images/betterup/assemble.png' },
  { name: 'Miniac', src: '/assets/clients/miniac.png' },
  { name: 'Netrush', src: '/assets/clients/netrush.webp' },
  { name: 'High Fidelity', src: '/assets/clients/highfidelity.png' },
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

        {/* --------- Hero quote: Nate --------- */}
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

        {/* --------- Hero quote: Lara --------- */}
        <div className="v4-hero-quote">
          <p className="v4-hero-quote__text">
            ERA is an asset to any high-growth company, impacting every
            aspect of revenue, marketing, customer success, and account
            management.
          </p>
          <div className="v4-hero-quote__attribution">
            <img
              className="v4-hero-quote__attribution-logo"
              src="/images/betterup/assemble.png"
              alt="Assemble"
            />
            <span>Lara Vandenberg · Founder · Assemble</span>
          </div>
        </div>
      </div>
    </section>
  )
}
