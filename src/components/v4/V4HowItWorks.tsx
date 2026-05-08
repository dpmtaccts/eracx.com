/**
 * V4HowItWorks — §05 of v4 marketing site.
 *
 * Cobalt-ground section showing ERA's three loops as a non-linear
 * 3×3 grid. Connection, Trust, Loyalty as columns. Three stages per
 * loop as rows. All nine cells visible simultaneously.
 *
 * Visual treatment is system-view, not process-diagram. No arrows
 * between cells. No timeline. No animation. The reader should
 * understand: these loops run continuously, concurrently, always.
 *
 * Stage names + claims ported verbatim from v3 source
 * (src/components/v3/Loop.tsx). Three Loops is ERA's core methodology
 * IP — never fabricate stage labels.
 */

import { V4Header } from './V4Header'

interface Loop {
  num: string
  name: string
  line: string
  stages: { num: string; name: string; desc: string }[]
}

const LOOPS: Loop[] = [
  {
    num: 'LOOP 01',
    name: 'Connection',
    line: 'Capture warmth from every channel.',
    stages: [
      { num: 'STAGE 01', name: 'Detect', desc: 'Signals the moment a buying window opens.' },
      { num: 'STAGE 02', name: 'Enrich', desc: "Builds context the rep doesn't have time to build." },
      { num: 'STAGE 03', name: 'Score', desc: 'Ranks the heat. Knows when to wait.' },
    ],
  },
  {
    num: 'LOOP 02',
    name: 'Trust',
    line: 'Multi-thread the buying committee.',
    stages: [
      { num: 'STAGE 04', name: 'Reach', desc: 'Outreach with a reason, not a quota.' },
      { num: 'STAGE 05', name: 'Respond', desc: "Replies that sound like the buyer's question, not your script." },
      { num: 'STAGE 06', name: 'Nurture', desc: "Stays useful when they're not ready." },
    ],
  },
  {
    num: 'LOOP 03',
    name: 'Loyalty',
    line: 'Turn customers into champions.',
    stages: [
      { num: 'STAGE 07', name: 'Close', desc: 'Pushes through the last ten yards.' },
      { num: 'STAGE 08', name: 'Expand', desc: 'Grows the account after the win.' },
      { num: 'STAGE 09', name: 'Retain', desc: 'Keeps the relationship warm past renewal.' },
    ],
  },
]

export function V4HowItWorks() {
  return (
    <section className="v4-section v4-section--howitworks" id="how">
      <V4Header
        phase="▸05 · HOW IT WORKS"
        meta={['3 LOOPS', '9 STAGES', 'ALWAYS RUNNING']}
      />

      <div className="v4-howitworks">
        <div className="v4-howitworks__header">
          <h2 className="v4-howitworks__display">
            Run loops,<br />not campaigns.
          </h2>
          <p className="v4-howitworks__lede">
            All nine stages run in parallel on every named account, every
            day. Connection, Trust, and Loyalty are{' '}
            <strong>concurrent loops</strong>, not a sequence. Buyers don't
            wait their turn, so the system doesn't either.
          </p>
        </div>

        <div className="v4-loops-grid">
          {/* Header row: 3 loop column headers */}
          {LOOPS.map((loop, i) => {
            const isLastCol = i === LOOPS.length - 1
            return (
              <div
                key={`header-${loop.name}`}
                className={`v4-loops-grid__cell v4-loop-header-cell${
                  isLastCol ? ' v4-loops-grid__cell--last-col' : ''
                }`}
              >
                <div className="v4-loop-header-cell__subtitle">{loop.num}</div>
                <div className="v4-loop-header-cell__name">{loop.name}</div>
                <div className="v4-loop-header-cell__line">{loop.line}</div>
              </div>
            )
          })}

          {/* 3 stage rows × 3 columns = 9 stage cells */}
          {[0, 1, 2].map((rowIdx) =>
            LOOPS.map((loop, colIdx) => {
              const stage = loop.stages[rowIdx]
              const isLastCol = colIdx === LOOPS.length - 1
              const isLastRow = rowIdx === 2
              return (
                <div
                  key={stage.num}
                  className={[
                    'v4-loops-grid__cell',
                    'v4-stage-cell',
                    isLastCol ? 'v4-loops-grid__cell--last-col' : '',
                    isLastRow ? 'v4-loops-grid__cell--last-row' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className="v4-stage-cell__num">{stage.num}</div>
                  <div className="v4-stage-cell__name">{stage.name}</div>
                  <div className="v4-stage-cell__desc">{stage.desc}</div>
                </div>
              )
            }),
          )}
        </div>

        <div className="v4-howitworks__summary">
          9 STAGES · 3 LOOPS · ZERO START AND END
        </div>
      </div>
    </section>
  )
}
