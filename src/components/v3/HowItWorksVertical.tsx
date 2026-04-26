// HowItWorksVertical.tsx — vertical scrollytelling alternative for
// HowItWorks. Five InteractionStage sections in the left column, a
// sticky FRVRD radar in the right column at desktop, or as a sticky top
// band on mobile. The parent HowItWorks owns the section header and
// account strip — this component renders only the five-stage area.

import { useState, type ComponentType } from 'react'
import InteractionStage from './InteractionStage'
import StickyFrvrdRadar from './StickyFrvrdRadar'
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

export default function HowItWorksVertical() {
  const [currentStage, setCurrentStage] = useState(0)

  return (
    <div className="hiw-vertical">
      <div className="hiw-vertical-skip">
        <a href="#signal-river">Skip the walkthrough &rarr;</a>
      </div>
      <StickyFrvrdRadar currentStageIndex={currentStage} variant="mobile" />
      <div className="hiw-vertical-grid">
        <div className="hiw-vertical-stages">
          {STAGES.map((s, i) => (
            <InteractionStage
              key={s.stageNumber}
              stageIndex={i}
              stageNumber={s.stageNumber}
              weekLabel={s.weekLabel}
              warmthBefore={s.warmthBefore}
              warmthAfter={s.warmthAfter}
              delta={s.delta}
              visualMock={<s.Mock />}
              captured={s.captured}
              dimensionsMoved={s.dimensionsMoved}
              firedNext={s.firedNext}
              stageColor={s.stageColor}
              onActive={setCurrentStage}
            />
          ))}
        </div>
        <aside className="hiw-vertical-radar-col">
          <div className="hiw-vertical-radar-sticky">
            <StickyFrvrdRadar currentStageIndex={currentStage} variant="desktop" />
          </div>
        </aside>
      </div>
    </div>
  )
}
