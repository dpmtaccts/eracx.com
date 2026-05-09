// V4Statement.tsx — §01 hero / statement section for the /v4 route.
// White ground, ink type. Issue bar + nav at the top, then the two-column
// hero (massive Anton headline left, ink-bordered sidebar with eyebrow,
// lede, and CTA right), followed by the 4-cell meta band of FRVRD / loop /
// signals / wasted-actions metrics. The wordmark in the issue-bar's right
// group (rendered by V4Header) carries brand presence at the page top.

import { V4Header } from './V4Header'
import { V4Nav } from './V4Nav'
import { MobileNav } from './MobileNav'

const META = [
  { num: '5', label: 'Dimensions / FRVRD' },
  { num: '9', label: 'Stages / The loop' },
  { num: '24', label: 'Signal types tracked' },
  { num: '80%', label: 'Wasted actions removed' },
]

export function V4Statement() {
  return (
    <section className="v4-section v4-section--hero" id="top">
      <V4Header
        phase="ISSUE 04 · VOL. ONE"
        meta={['GTM SYSTEMS', 'EST. 2024']}
      />
      <V4Nav />
      <MobileNav />

      <div className="v4-statement">
        <div>
          {/* Hero headline. Each word is its own span so the layout can
              shift between desktop (3 lines: "Cold" / "outbound" / "is over.")
              and mobile (4 lines: "Cold" / "outbound" / "is" / "over.") via
              CSS `display` toggles on a 768px breakpoint. */}
          <h1 className="v4-display-mega">
            <span className="v4-hero-word">Cold</span>
            <span className="v4-hero-word">outbound</span>
            <span className="v4-hero-word">is&nbsp;</span>
            <span className="v4-hero-word"><em>over.</em></span>
          </h1>
        </div>
        <aside className="v4-statement__sidebar">
          <div className="v4-eyebrow">▸01 · A new way to grow</div>
          <p className="v4-body-large">
            Your team is hustling while your pipeline sits still, and the buyers most likely to close aren't on your call list. ERA finds them, warms them, and hands your sellers conversations ready to close.
          </p>
          <a href="#contact" className="v4-cta">
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

      <div className="v4-statement__icp">
        FOR B2B COMPANIES WITH 50 ACCOUNTS THAT MATTER AND NO RELIABLE WAY IN.
      </div>
    </section>
  )
}
