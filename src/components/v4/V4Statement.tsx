// V4Statement.tsx — §01 hero / statement section for the /v4 route.
// White ground, ink type. Publication mast (enlarged ERA wordmark, magazine
// cover treatment) tops the page, followed by the issue bar and nav, then
// the two-column hero (massive Anton headline left, ink-bordered sidebar
// with eyebrow, lede, and CTA right), followed by the 4-cell meta band of
// FRVRD / loop / signals / wasted-actions metrics.

import { V4Header } from './V4Header'
import { V4Nav } from './V4Nav'
import { V4Wordmark } from './V4Wordmark'

const META = [
  { num: '5', label: 'Dimensions / FRVRD' },
  { num: '9', label: 'Stages / The loop' },
  { num: '24', label: 'Signal types tracked' },
  { num: '80%', label: 'Wasted actions removed' },
]

export function V4Statement() {
  return (
    <section className="v4-section v4-section--hero" id="top">
      <div className="v4-statement-mast">
        <V4Wordmark className="v4-statement-mast__wordmark" />
      </div>
      <V4Header
        phase="ISSUE 04 · VOL. ONE"
        meta={['GTM SYSTEMS', 'EST. 2024']}
      />
      <V4Nav />

      <div className="v4-statement">
        <div>
          <h1 className="v4-display-mega">
            Cold<br />
            outbound<br />
            is&nbsp;<em>over.</em>
          </h1>
        </div>
        <aside className="v4-statement__sidebar">
          <div className="v4-eyebrow">§01 · The thesis</div>
          <p className="v4-body-large">
            ERA builds <strong>signal-driven ABM programs</strong> for B2B companies that know their next ten customers by name. We measure warmth the way investors measure returns. Compounding, not linear.
          </p>
          <a href="#cta" className="v4-cta">
            Evaluate your GTM
            <span className="v4-cta__arrow">→</span>
          </a>
        </aside>
      </div>

      <div className="v4-statement-meta">
        {META.map(({ num, label }) => (
          <div key={label} className="v4-statement-meta__cell">
            <div className="v4-statement-meta__num">{num}</div>
            <div className="v4-statement-meta__label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
