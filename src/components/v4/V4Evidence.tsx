/**
 * V4Evidence — §04 of v4 marketing site.
 *
 * Yellow-ground proof section. Customer logos render in flat ink for
 * editorial coherence (color sacrificed for visual rhythm). One hero
 * testimonial below the logo wall.
 *
 * Confirmed:
 * - Nate Houghton (Lorikeet) — operator-led GTM
 * Pending assets:
 * - Stephen Roesler (Miniac) — pending logo + quote
 *
 * Founder photo intentionally excluded. Personality lives in About /
 * footer, not Evidence. Customer proof is the only argument here.
 *
 * Logo treatment uses filter: brightness(0) on color PNGs or
 * fill="currentColor" on SVGs to render every logo in flat ink.
 */

import { V4Header } from './V4Header'

// Per-logo render heights tuned so each logo's actual graphical content
// (measured via opaque-pixel bounding box) renders at ~32px optical height
// across the wall. Lorikeet + Netrush have 100% content fill, so 32px height
// puts content at 32px. Assemble + High Fidelity have ~73% content, so 44px
// height produces 32px content. Miniac has ~67% content, so 48px → 32px.
// Switching to flex layout (instead of equal-column grid) so wide aspect
// ratios get their natural width and don't squash.
const LOGOS = [
  { name: 'Lorikeet', src: '/images/navalent/Lorikeet_logo_color.png', height: 32 },
  { name: 'Assemble', src: '/images/betterup/assemble.png', height: 44 },
  { name: 'Miniac', src: '/assets/clients/miniac.png', height: 48 },
  { name: 'Netrush', src: '/assets/clients/netrush.webp', height: 32 },
  { name: 'High Fidelity', src: '/assets/clients/highfidelity.png', height: 44 },
]

export function V4Evidence({ phase = '▸04 · EVIDENCE' }: { phase?: string } = {}) {
  return (
    <section className="v4-section v4-section--evidence" id="evidence">
      <V4Header
        phase={phase}
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
          {LOGOS.map(({ name, src, height }) => (
            <div key={name} className="v4-logo-wall__item">
              <img
                className="v4-logo-wall__img"
                src={src}
                alt={name}
                style={{ height: `${height}px` }}
              />
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

      </div>
    </section>
  )
}
