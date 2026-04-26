// HowItWorksVertical.tsx — pinned slot-machine alternative for the
// HowItWorks section.
//
// Outer wrapper is 5 viewports tall. Inner content is position: sticky,
// occupying a single 100vh frame. As the user scrolls through the outer
// wrapper, scroll progress (0..1) is computed from the wrapper's
// bounding rect and used to:
//   - drive a stage index 0..4 that picks which slot-machine card is
//     visible in each column (left action mock + center signal/warmth
//     content + top stage indicator)
//   - drive a continuous progress fill on the cold→warm gradient bar
//     at the bottom
//   - update the FRVRD radar's currentStageIndex (radar morphs via
//     requestAnimationFrame inside the component)
//
// Below 820px the pin disables. The five stages render stacked normally
// (slot machine + radar collapse to a list view) so the content remains
// readable without the scroll mechanic.
//
// Click any of the five progress dots at the top to jump to that stage.
// On desktop, this scrolls the outer wrapper to the appropriate
// position. On mobile, it just sets activeStage directly.

import { useEffect, useRef, useState, type ComponentType } from 'react'
import FrvrdRadar from './FrvrdRadar'
import LinkedInPostMock from './mocks/LinkedInPostMock'
import LinkedInCommentMock from './mocks/LinkedInCommentMock'
import BrowserMock from './mocks/BrowserMock'
import EmailMock from './mocks/EmailMock'
import CalendarMock from './mocks/CalendarMock'

interface StageDef {
  stageNumber: string
  weekLabel: string
  warmthBefore: number
  warmthAfter: number
  delta: string
  Mock: ComponentType
  captured: { signal: string; source: string }
  dimensionsMoved: string[]
  firedNext: { name: string; explainer: string }
  stageColor: 'cold' | 'warming' | 'warm' | 'hot'
}

const STAGES: StageDef[] = [
  {
    stageNumber: 'Stage 01',
    weekLabel: 'Week 1',
    warmthBefore: 32,
    warmthAfter: 36,
    delta: '+4',
    Mock: LinkedInPostMock,
    captured: { signal: 'Attention signal', source: 'LinkedIn · HockeyStack' },
    dimensionsMoved: ['Frequency'],
    firedNext: {
      name: 'Nothing. We waited.',
      explainer: 'Broadcasts earn the right to be read. Not replied to.',
    },
    stageColor: 'cold',
  },
  {
    stageNumber: 'Stage 02',
    weekLabel: 'Week 2',
    warmthBefore: 36,
    warmthAfter: 45,
    delta: '+9',
    Mock: LinkedInCommentMock,
    captured: { signal: 'Reciprocation signal', source: 'LinkedIn · Clay' },
    dimensionsMoved: ['Frequency', 'Responsiveness'],
    firedNext: {
      name: 'Named-account tag applied',
      explainer: 'VP Growth identified. Added to the watch list.',
    },
    stageColor: 'cold',
  },
  {
    stageNumber: 'Stage 03',
    weekLabel: 'Week 3',
    warmthBefore: 45,
    warmthAfter: 55,
    delta: '+10',
    Mock: BrowserMock,
    captured: { signal: 'Intent signal', source: 'HockeyStack · RB2B' },
    dimensionsMoved: ['Recency', 'Density'],
    firedNext: {
      name: 'Warm outreach trigger',
      explainer: 'Two visits, four-minute dwell. Not an accident.',
    },
    stageColor: 'warming',
  },
  {
    stageNumber: 'Stage 04',
    weekLabel: 'Week 4–5',
    warmthBefore: 55,
    warmthAfter: 67,
    delta: '+12',
    Mock: EmailMock,
    captured: { signal: 'Disclosure signal', source: 'Apollo · HubSpot' },
    dimensionsMoved: ['Velocity', 'Density', 'Responsiveness'],
    firedNext: {
      name: 'Stakeholder map update',
      explainer: 'Champion + economic buyer engaged on same thread.',
    },
    stageColor: 'warm',
  },
  {
    stageNumber: 'Stage 05',
    weekLabel: 'Week 6',
    warmthBefore: 67,
    warmthAfter: 72,
    delta: '+5',
    Mock: CalendarMock,
    captured: { signal: 'Commitment signal', source: 'HubSpot · Gong' },
    dimensionsMoved: ['Velocity', 'Frequency', 'Density'],
    firedNext: {
      name: 'Trust-loop invitation',
      explainer: 'Advisor dinner, six peers. No pitch. No deck.',
    },
    stageColor: 'hot',
  },
]

const STAGE_COUNT = STAGES.length

export default function HowItWorksVertical() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId: number | null = null
    const update = () => {
      const node = wrapperRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      // Mobile / no-pin layouts have no extra scroll range — leave state
      // alone so dot taps remain the source of truth.
      if (total <= 0) return
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setScrollProgress(p)
      // Map continuous progress to a discrete stage with a tiny bias so
      // the last stage activates before the wrapper finishes scrolling
      // out of view.
      const stage = Math.min(STAGE_COUNT - 1, Math.floor(p * STAGE_COUNT))
      setActiveStage(stage)
    }
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  // Click a progress dot → scroll the wrapper to the corresponding
  // position. Each stage occupies 1/STAGE_COUNT of the wrapper's
  // scrollable range.
  const jumpToStage = (i: number) => {
    // Sync state immediately so mobile (no pin → no scroll-driven update)
    // gets instant feedback on tap.
    setActiveStage(i)
    setScrollProgress(i / Math.max(1, STAGE_COUNT - 1))

    const node = wrapperRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    if (total <= 0) return
    const targetProgress = (i + 0.05) / STAGE_COUNT
    const targetTop = window.scrollY + rect.top + targetProgress * total
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  }

  return (
    <div className="hiw-pinned" ref={wrapperRef}>
      <div className="hiw-pinned-sticky">
        <header className="hiw-pinned-top">
          <div className="hiw-pinned-indicator">
            <SlotWindow ariaLabel="Active stage">
              {STAGES.map((s, i) => (
                <SlotCard key={i} index={i} activeIndex={activeStage}>
                  <span className="hiw-pinned-stage-num">
                    {s.stageNumber.toUpperCase()}
                  </span>
                  <span className="hiw-pinned-sep">/</span>
                  <span className="hiw-pinned-stage-week">{s.weekLabel}</span>
                </SlotCard>
              ))}
            </SlotWindow>
          </div>
          <div className="hiw-pinned-controls">
            <div className="hiw-pinned-dots" role="tablist" aria-label="Stage">
              {STAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeStage}
                  aria-label={`Stage ${i + 1}`}
                  className={`hiw-pinned-dot${i === activeStage ? ' is-active' : ''}${
                    i < activeStage ? ' is-passed' : ''
                  }`}
                  onClick={() => jumpToStage(i)}
                />
              ))}
            </div>
            <a className="hiw-pinned-skip" href="#signal-river">
              Skip the walkthrough &rarr;
            </a>
          </div>
        </header>

        <div className="hiw-pinned-grid">
          <div className="hiw-pinned-action">
            <SlotWindow>
              {STAGES.map((s, i) => (
                <SlotCard key={i} index={i} activeIndex={activeStage}>
                  <s.Mock />
                </SlotCard>
              ))}
            </SlotWindow>
          </div>

          <div className="hiw-pinned-signal">
            <SlotWindow>
              {STAGES.map((s, i) => (
                <SlotCard key={i} index={i} activeIndex={activeStage}>
                  <ChainPanel stage={s} />
                </SlotCard>
              ))}
            </SlotWindow>
          </div>

          <div className="hiw-pinned-radar">
            <FrvrdRadar currentStageIndex={activeStage} variant="desktop" />
          </div>
        </div>

        <div className="hiw-pinned-progress">
          <span className="hiw-pinned-progress-cap hiw-pinned-progress-cap--cold">
            COLD
          </span>
          <div className="hiw-pinned-progress-track">
            <div
              className="hiw-pinned-progress-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="hiw-pinned-progress-cap hiw-pinned-progress-cap--warm">
            WARM
          </span>
        </div>
      </div>
    </div>
  )
}

function SlotWindow({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel?: string
}) {
  return (
    <div className="slot-window" aria-label={ariaLabel} aria-live="polite">
      {children}
    </div>
  )
}

function SlotCard({
  index,
  activeIndex,
  children,
}: {
  index: number
  activeIndex: number
  children: React.ReactNode
}) {
  const offset = (index - activeIndex) * 100
  const isActive = index === activeIndex
  return (
    <div
      className={`slot-card${isActive ? ' is-active' : ''}`}
      style={{
        transform: `translateY(${offset}%)`,
        opacity: isActive ? 1 : 0,
      }}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  )
}

function ChainPanel({ stage }: { stage: StageDef }) {
  return (
    <div className={`chain-panel chain-panel--${stage.stageColor}`}>
      <div className="chain-panel-row">
        <div className="chain-panel-label">CAPTURED</div>
        <div className="chain-panel-value">
          <b>{stage.captured.signal}</b>
          <span>{stage.captured.source}</span>
        </div>
      </div>
      <div className="chain-panel-row">
        <div className="chain-panel-label">DIMENSIONS MOVED</div>
        <div className="chain-panel-dims">
          {stage.dimensionsMoved.map((d) => (
            <span key={d} className="chain-panel-dim">
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="chain-panel-row">
        <div className="chain-panel-label">FIRED NEXT</div>
        <div className="chain-panel-value">
          <b>{stage.firedNext.name}</b>
          <span>{stage.firedNext.explainer}</span>
        </div>
      </div>
      <div className="chain-panel-warmth">
        <span className="chain-panel-warmth-before">{stage.warmthBefore}</span>
        <span className="chain-panel-warmth-arrow">&rarr;</span>
        <span className="chain-panel-warmth-after">{stage.warmthAfter}</span>
        <span className="chain-panel-warmth-delta">{stage.delta}</span>
      </div>
    </div>
  )
}
