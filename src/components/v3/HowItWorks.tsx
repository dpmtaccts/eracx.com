// HowItWorks.tsx — §03 section for the /v3 staging homepage.
// Renders the three horizontal figures (InteractionSequence +
// InteractionChain + WarmthRadars). The vertical scrollytelling
// alternative (HowItWorksVertical) and its dev toggle were removed
// in commit 11; the vertical files stay on disk in case they come back.

import InteractionSequence from './InteractionSequence'
import InteractionChain from './InteractionChain'
import WarmthRadars from './WarmthRadars'

export default function HowItWorks() {
  return (
    <section id="six-weeks">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02.D &nbsp; One account, six weeks</div>
            <h2 className="section-h2">
              Five touches.<br />
              <span className="slab">Six weeks.</span>
            </h2>
          </div>
          <div className="section-lede">
            <p>
              One account, traced end to end through the loop. The
              interactions are nothing new.{' '}
              <strong>The capture and scoring underneath them is.</strong>
            </p>
          </div>
        </div>

        <div className="account-strip">
          <div className="account-name">
            Midmarket Holdings Co.&nbsp;
            <span className="slab">— Week 1 through Week 6.</span>
          </div>
          <div className="account-meta">
            Warmth <b>32 → 72</b> &nbsp;·&nbsp; <b>T1 Active</b>
          </div>
        </div>

        {/* Figure 01 — The interaction sequence */}
        <div className="fig-block">
          <div className="fig-head">
            <div className="fig-tag">Figure 01</div>
            <h2 className="fig-title">
              The <span className="slab">interaction sequence.</span>
            </h2>
          </div>
          <InteractionSequence />
        </div>

        {/* Figure 02 — Source, signal, action */}
        <div className="fig-block">
          <div className="fig-head">
            <div className="fig-tag">Figure 02</div>
            <h2 className="fig-title">
              Source, signal, <span className="slab">action.</span>
            </h2>
          </div>
          <InteractionChain />
        </div>

        {/* Figure 03 — Warmth, updated daily */}
        <div className="fig-block">
          <div className="fig-head">
            <div className="fig-tag">Figure 03</div>
            <h2 className="fig-title">
              Warmth, <span className="slab">updated daily.</span>
            </h2>
          </div>
          <WarmthRadars />
        </div>
      </div>
    </section>
  )
}
