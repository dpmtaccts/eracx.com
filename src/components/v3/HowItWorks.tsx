// HowItWorks.tsx — §03 section for the /v3 staging homepage.
// Default: three horizontal figures (InteractionSequence + InteractionChain
// + WarmthRadars). Dev-only toggle in the section header switches to a
// vertical scrollytelling alternative (HowItWorksVertical) for A/B
// comparison. Selection persists in localStorage. The toggle UI is gated
// by import.meta.env.DEV; in production builds the toggle never renders
// and the layout is forced to 'horizontal' regardless of localStorage.

import { useEffect, useState } from 'react'
import InteractionSequence from './InteractionSequence'
import InteractionChain from './InteractionChain'
import WarmthRadars from './WarmthRadars'
import HowItWorksVertical from './HowItWorksVertical'

type Layout = 'horizontal' | 'vertical'
const STORAGE_KEY = 'era-v3-howitworks-layout'

export default function HowItWorks() {
  // In production: layout is locked to horizontal regardless of stored
  // preference. In dev: respect localStorage.
  const [layout, setLayout] = useState<Layout>('horizontal')

  useEffect(() => {
    if (!import.meta.env.DEV) return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'vertical' || stored === 'horizontal') setLayout(stored)
    } catch {
      // Storage may be disabled (private mode, etc.) — ignore.
    }
  }, [])

  const choose = (next: Layout) => {
    setLayout(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore.
    }
  }

  return (
    <section id="how">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">03 &nbsp; How it works</div>
            <h2 className="section-h2">
              Five touches.<br />
              <span className="slab">Six weeks.</span>
            </h2>
            <LayoutToggle layout={layout} onChange={choose} />
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

        {layout === 'horizontal' ? <Horizontal /> : <HowItWorksVertical />}
      </div>
    </section>
  )
}

function Horizontal() {
  return (
    <>
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
    </>
  )
}

function LayoutToggle({
  layout,
  onChange,
}: {
  layout: Layout
  onChange: (next: Layout) => void
}) {
  if (!import.meta.env.DEV) return null
  return (
    <div className="hiw-toggle" role="group" aria-label="Layout (dev only)">
      <button
        type="button"
        className={`hiw-toggle-opt${layout === 'horizontal' ? ' is-active' : ''}`}
        onClick={() => onChange('horizontal')}
      >
        Horizontal
      </button>
      <span className="hiw-toggle-sep">/</span>
      <button
        type="button"
        className={`hiw-toggle-opt${layout === 'vertical' ? ' is-active' : ''}`}
        onClick={() => onChange('vertical')}
      >
        Vertical (new)
      </button>
    </div>
  )
}
