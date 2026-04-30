// HowItWorks.tsx — §02 "How it works" section for /v3.
// Renders the three horizontal figures (InteractionSequence +
// InteractionChain + WarmthRadars). One named account traced end to
// end through the loop. The vertical scrollytelling alternative
// (HowItWorksVertical) and its dev toggle were removed in commit 11;
// the vertical files stay on disk in case they come back.

import InteractionSequence from './InteractionSequence'
import InteractionChain from './InteractionChain'
import WarmthRadars from './WarmthRadars'

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02 &nbsp; How it works</div>
            <h2 className="section-h2">
              Watch the loop run.
            </h2>
          </div>
          <div className="section-lede">
            <p>
              One named account. Six weeks. Five touches that{' '}
              <strong className="accent">compound from cold to warm</strong>.
              Every action generates a signal. Every signal triggers the
              next.
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
