// FrvrdSection.tsx — §02 framework intro between Thesis and LoopHalo.
// Two viewport-height frames stacked vertically: hero (eyebrow +
// headline + sub + giant "Compounding." word) and dimension cards
// (5 FrvrdDimensionCard instances). FloatingDotsBackground sits behind
// both frames, drifting continuously while the section is on screen.
// IntersectionObservers on each frame trigger entry animations (the
// big word slide-up + scale on Frame 1, staggered card fade on
// Frame 2). Bottom transition link anchors to HowItWorks.

import { useEffect, useRef, useState } from 'react'
import FloatingDotsBackground from './FloatingDotsBackground'
import FrvrdDimensionCard from './FrvrdDimensionCard'

interface Dimension {
  label: string
  definition: string
  accentVar: string
}

// Canonical FRVRD order (treating the two R's as distinct):
// Frequency, Recency, Value, Responsiveness, Density.
const DIMENSIONS: Dimension[] = [
  {
    label: 'FREQUENCY',
    definition:
      'How often the account engages. More touchpoints across more days means deeper interest.',
    accentVar: '--mist',
  },
  {
    label: 'RECENCY',
    definition:
      'How recent the last engagement was. A signal three months ago is colder than a signal three days ago.',
    accentVar: '--mineral-blue',
  },
  {
    label: 'VALUE',
    definition:
      'The dollar value this account represents. ARR potential, deal size, expansion runway.',
    accentVar: '--accent',
  },
  {
    label: 'RESPONSIVENESS',
    definition:
      'How fast they respond when reached out to. Same-day reply is hotter than seven-day reply.',
    accentVar: '--mineral-blue',
  },
  {
    label: 'DENSITY',
    definition:
      'How widely the account engages across the org. One champion is fragile. Three engaged stakeholders is durable.',
    accentVar: '--hot',
  },
]

export default function FrvrdSection() {
  const frame1Ref = useRef<HTMLDivElement | null>(null)
  const frame2Ref = useRef<HTMLDivElement | null>(null)
  const [frame1Visible, setFrame1Visible] = useState(false)
  const [frame2Visible, setFrame2Visible] = useState(false)

  useEffect(() => {
    const f1 = frame1Ref.current
    const f2 = frame2Ref.current
    if (!f1 || !f2) return
    const io1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFrame1Visible(true)
      },
      { threshold: 0.25 },
    )
    const io2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFrame2Visible(true)
      },
      { threshold: 0.2 },
    )
    io1.observe(f1)
    io2.observe(f2)
    return () => {
      io1.disconnect()
      io2.disconnect()
    }
  }, [])

  return (
    <section id="frvrd" className="frvrd-section">
      <FloatingDotsBackground />
      <div className="frvrd-section-inner">
        <div
          ref={frame1Ref}
          className={`frvrd-frame frvrd-frame--hero${frame1Visible ? ' is-visible' : ''}`}
        >
          <div className="container">
            <div className="eyebrow">02 &nbsp; The framework</div>
            <h2 className="section-h2">
              Five signals.<br />
              <span className="slab">One score.</span>
            </h2>
            <p className="frvrd-sub">
              FRVRD is how we measure warmth across every named account. Five
              dimensions, scored every day, updated automatically.
            </p>
            <div className="frvrd-big">Compounding.</div>
          </div>
        </div>

        <div
          ref={frame2Ref}
          className={`frvrd-frame frvrd-frame--cards${frame2Visible ? ' is-visible' : ''}`}
        >
          <div className="container">
            <div className="frvrd-cards-eyebrow">What FRVRD measures</div>
            <div className="frvrd-cards">
              {DIMENSIONS.map((d, i) => (
                <FrvrdDimensionCard
                  key={d.label}
                  dimensionLabel={d.label}
                  definition={d.definition}
                  accentVar={d.accentVar}
                  delayMs={i * 200}
                />
              ))}
            </div>
            <div className="frvrd-bottom">
              <a href="#how">What this looks like in motion &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
