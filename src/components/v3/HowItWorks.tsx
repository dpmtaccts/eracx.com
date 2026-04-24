// HowItWorks.tsx — §01 section for the /v3 staging homepage.
// Wraps three figures: InteractionSequence, InteractionChain, WarmthRadars.
// All copy and structural markup copied verbatim from
// design/era-v3-staging.html.

import InteractionSequence from './InteractionSequence'
import InteractionChain from './InteractionChain'
import WarmthRadars from './WarmthRadars'

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">01 &nbsp; How it works</div>
            <h2 className="section-h2">
              Five touches.<br />
              <span className="slab">Six weeks.</span>
            </h2>
          </div>
          <div className="section-lede">
            <p>
              A real account, traced end to end. The interactions are nothing
              new. <strong>The capture and scoring underneath them is.</strong>
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

        <div className="close-line">
          Warmth is what accumulates{' '}
          <span className="accent">when the chain is intact.</span>
        </div>
      </div>
    </section>
  )
}
