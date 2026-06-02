import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { FONT } from '../theme'
import { PeripheralViewHero } from '../PeripheralSeismograph'
import { RevenueSignalGauge } from '../../../components/revenueSignal/RevenueSignalGauge'
import { betterupAudit } from '../../../data/audits/betterup'
import { computeBuyerTrustScore } from '../../../lib/buyerTrustScore'
import {
  CaretControl,
  HighestLeverageFlag,
  ImpactScopeBars,
  ShareButton,
  Watermark,
  mono,
  rowVisualsStyles as C,
} from './RowVisuals'
import { PAGE_LINE, PILLAR_COLOR, type Bento, type Statement } from './types'
import { RichBento } from './bentos'

const PARCHMENT = '#F4F1EA'

export function InsightRow({
  statement,
  open,
  onToggle,
  showReadingGuide,
  isFirst,
}: {
  statement: Statement
  open: boolean
  onToggle: () => void
  showReadingGuide: boolean
  isFirst: boolean
}) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!drawerRef.current) return
    if (open) {
      const h = drawerRef.current.scrollHeight
      setMaxHeight(h)
      const t = window.setTimeout(() => setMaxHeight(undefined), 460)
      return () => window.clearTimeout(t)
    } else {
      const h = drawerRef.current.scrollHeight
      setMaxHeight(h)
      requestAnimationFrame(() => setMaxHeight(0))
    }
  }, [open])

  const pillar = PILLAR_COLOR[statement.n] ?? C.ink

  return (
    <section
      id={statement.anchor}
      style={{
        position: 'relative',
        background: open ? PARCHMENT : C.paper,
        borderTop: isFirst ? 'none' : `1px solid ${PAGE_LINE}`,
        padding: '56px 0 48px',
        transition: 'background-color 0.45s ease',
      }}
    >
      {/* Pillar-coloured left keyline. 5px, fades in on open. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 5,
          background: pillar,
          opacity: open ? 1 : 0,
          transition: 'opacity 0.45s ease',
          pointerEvents: 'none',
        }}
      />

      <Watermark n={statement.n} />

      <div
        style={{
          position: 'relative',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        {/* Top control row — kicker left, share right */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <PillarTick color={pillar} />
            <span style={mono(11, C.ink, 700)}>
              STATEMENT {String(statement.n).padStart(2, '0')} ·{' '}
              {kindLabel(statement.kind)}
            </span>
          </span>
          <ShareButton anchor={statement.anchor} />
        </div>

        {statement.highestLeverage && <HighestLeverageFlag pillar={pillar} />}

        {/* Two-column body: headline + go-dos on left, impact/scope (or
            the frame dial) on right. The frame statement gets the
            composite-score gauge per spec; the rest get impact/scope bars. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              statement.kind === 'frame'
                ? 'minmax(0, 1fr) 340px'
                : statement.impact
                  ? 'minmax(0, 1fr) 380px'
                  : '1fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: FONT.mega,
                fontWeight: 400,
                fontSize: 'clamp(32px, 4.4vw, 64px)',
                lineHeight: 0.96,
                letterSpacing: '-0.012em',
                textTransform: 'uppercase',
                color: C.ink,
                margin: '0 0 22px',
                maxWidth: 880,
              }}
            >
              {statement.headline}
            </h2>

            {statement.leadLine && (
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: C.muted,
                  maxWidth: 720,
                  margin: '0 0 22px',
                  fontWeight: 400,
                }}
              >
                {statement.leadLine}
              </p>
            )}

            {statement.goDos && statement.goDos.length > 0 && (
              <ol
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  maxWidth: 720,
                }}
              >
                {statement.goDos.map((todo, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '32px 1fr',
                      gap: 12,
                      alignItems: 'baseline',
                    }}
                  >
                    <span style={mono(10, C.muted, 600)}>{String(i + 1).padStart(2, '0')}</span>
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 16,
                        lineHeight: 1.5,
                        fontWeight: 500,
                        color: C.ink,
                      }}
                    >
                      {todo}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {statement.impact && statement.scope && (
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <ImpactScopeBars impact={statement.impact} scope={statement.scope} />
              <div style={mono(11, C.ink, 700)}>{statement.verdict}</div>
              {showReadingGuide && <ReadingGuide />}
            </aside>
          )}

          {!statement.impact && statement.kind === 'frame' && <FrameDial verdict={statement.verdict} />}
          {!statement.impact && statement.kind !== 'frame' && (
            <aside>
              <div style={mono(11, C.ink, 700)}>{statement.verdict}</div>
            </aside>
          )}
        </div>

        {/* Quiet caret control — centered, no box */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <CaretControl open={open} onClick={onToggle} />
        </div>

        {/* Drawer */}
        <div
          ref={drawerRef}
          aria-hidden={!open}
          style={{
            overflow: 'hidden',
            maxHeight: maxHeight,
            transition: 'max-height 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          <ExpandPanel statement={statement} pillar={pillar} />
        </div>
      </div>
    </section>
  )
}

function PillarTick({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: 14,
        height: 3,
        background: color,
      }}
    />
  )
}

function ReadingGuide() {
  return (
    <div
      style={{
        marginTop: 8,
        padding: '14px 16px',
        background: C.paper,
        border: `1px solid ${PAGE_LINE}`,
      }}
    >
      <div style={{ ...mono(9, C.muted, 700), marginBottom: 8 }}>HOW TO READ THIS</div>
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: 13,
          lineHeight: 1.55,
          color: C.muted,
          margin: 0,
        }}
      >
        Long magenta over short black is the highest-leverage move, do it first. Long magenta over
        long black matters but costs more. Two short bars is low priority.
      </p>
    </div>
  )
}

function ExpandPanel({ statement, pillar }: { statement: Statement; pillar: string }) {
  return (
    <div
      style={{
        marginTop: 44,
        display: 'flex',
        flexDirection: 'column',
        gap: 38,
      }}
    >
      <DrawerBlock label="THE INSIGHT" pillar={pillar}>
        {statement.drawer.insight}
      </DrawerBlock>
      <DrawerBlock label="WHAT IT MEANS" pillar={pillar}>
        {statement.drawer.meaning}
      </DrawerBlock>
      <ExecuteBlock
        label="WHAT TO EXECUTE"
        pillar={pillar}
        execute={statement.drawer.execute}
      />
      <DrawerBlock label="ASSUMPTIONS" pillar={pillar}>
        {statement.drawer.assumptions}
      </DrawerBlock>
      <BentoBlock label="THE EVIDENCE" pillar={pillar} bento={statement.drawer.bento} />
    </div>
  )
}

function DrawerLabel({ label, pillar }: { label: string; pillar: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <PillarTick color={pillar} />
      <span style={mono(10, C.muted, 700)}>{label}</span>
    </div>
  )
}

function DrawerBlock({
  label,
  pillar,
  children,
}: {
  label: string
  pillar: string
  children: React.ReactNode
}) {
  return (
    <div>
      <DrawerLabel label={label} pillar={pillar} />
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: 18,
          lineHeight: 1.55,
          color: C.ink,
          margin: 0,
          maxWidth: 880,
        }}
      >
        {children}
      </p>
    </div>
  )
}

function ExecuteBlock({
  label,
  pillar,
  execute,
}: {
  label: string
  pillar: string
  execute: import('./types').ExecuteBlock
}) {
  return (
    <div>
      <DrawerLabel label={label} pillar={pillar} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 18,
          marginBottom: 24,
          maxWidth: 880,
        }}
      >
        <FromToCard
          label="FROM"
          body={execute.from}
          topColor={C.muted}
          labelColor={C.muted}
        />
        <FromToCard label="TO" body={execute.to} topColor={pillar} labelColor={pillar} />
      </div>

      {execute.steps.length > 0 && (
        <ol
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            maxWidth: 880,
          }}
        >
          {execute.steps.map((s, i) => (
            <ExecuteStepRow key={i} step={s} index={i} pillar={pillar} />
          ))}
        </ol>
      )}

      {execute.boundary && (
        <div
          style={{
            marginTop: 24,
            padding: '16px 18px',
            background: PARCHMENT_FILL,
            borderLeft: `3px solid ${pillar}`,
            maxWidth: 880,
          }}
        >
          <div style={{ ...mono(10, pillar, 700), marginBottom: 8 }}>THE BOUNDARY</div>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 14,
              lineHeight: 1.55,
              color: C.ink,
              margin: 0,
            }}
          >
            {execute.boundary}
          </p>
        </div>
      )}

      {execute.effort && (
        <div
          style={{
            marginTop: 22,
            paddingTop: 14,
            borderTop: `1px solid ${PAGE_LINE}`,
            display: 'grid',
            gridTemplateColumns: '110px minmax(0, 1fr)',
            gap: 14,
            alignItems: 'baseline',
            maxWidth: 880,
          }}
        >
          <span style={mono(10, C.muted, 700)}>EFFORT</span>
          <span style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.55, color: C.ink }}>
            {execute.effort}
          </span>
        </div>
      )}
    </div>
  )
}

const PARCHMENT_FILL = '#F4F1EA'

function ExecuteStepRow({
  step,
  index,
  pillar,
}: {
  step: import('./types').ExecuteStep
  index: number
  pillar: string
}) {
  const ordinal = String(index + 1).padStart(2, '0')

  if (typeof step === 'string') {
    return (
      <li
        style={{
          display: 'grid',
          gridTemplateColumns: '32px 1fr',
          gap: 12,
          alignItems: 'baseline',
        }}
      >
        <span style={mono(10, C.muted, 600)}>{ordinal}</span>
        <span style={{ fontFamily: FONT.body, fontSize: 16, lineHeight: 1.5, color: C.ink }}>
          {step}
        </span>
      </li>
    )
  }

  // Rich step — title + body, body may be string or array of paragraphs.
  const paragraphs = Array.isArray(step.body) ? step.body : [step.body]
  return (
    <li
      style={{
        display: 'grid',
        gridTemplateColumns: '32px 1fr',
        gap: 14,
        alignItems: 'baseline',
      }}
    >
      <span style={mono(10, pillar, 700)}>{ordinal}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 17,
            lineHeight: 1.4,
            color: C.ink,
            fontWeight: 700,
          }}
        >
          {step.title}
        </span>
        {paragraphs.map((p, pi) => (
          <p
            key={pi}
            style={{
              fontFamily: FONT.body,
              fontSize: 15,
              lineHeight: 1.6,
              color: 'rgba(10, 10, 10, 0.72)',
              margin: 0,
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </li>
  )
}

function FromToCard({
  label,
  body,
  topColor,
  labelColor,
}: {
  label: string
  body: string
  topColor: string
  labelColor: string
}) {
  return (
    <div
      style={{
        padding: '18px 20px',
        background: C.paper,
        borderTop: `3px solid ${topColor}`,
        border: `1px solid ${PAGE_LINE}`,
        borderTopWidth: 3,
        borderTopColor: topColor,
      }}
    >
      <div style={{ ...mono(10, labelColor, 700), marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: FONT.body, fontSize: 16, lineHeight: 1.5, color: C.ink }}>
        {body}
      </div>
    </div>
  )
}

function BentoBlock({
  label,
  pillar,
  bento,
}: {
  label: string
  pillar: string
  bento: Bento
}) {
  if (bento.kind === 'seismograph') {
    return (
      <div>
        <DrawerLabel label={label} pillar={pillar} />
        <div
          style={{
            border: `1px solid ${PAGE_LINE}`,
            padding: '28px 28px 24px',
            background: C.paper,
          }}
        >
          <PeripheralViewHero />
        </div>
      </div>
    )
  }
  if (bento.kind === 'rich') {
    return (
      <div>
        <DrawerLabel label={label} pillar={pillar} />
        <RichBento slot={bento.slot} />
      </div>
    )
  }
  return (
    <div>
      <DrawerLabel label={label} pillar={pillar} />
      <div
        style={{
          padding: '24px 24px',
          border: `1px solid ${PAGE_LINE}`,
          background: C.paper,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <PillarTick color={pillar} />
          <span style={mono(10, C.muted, 700)}>FORENSIC EVIDENCE PENDING MIGRATION</span>
        </div>
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 15,
            lineHeight: 1.55,
            color: C.muted,
            margin: '0 0 16px',
            maxWidth: 720,
          }}
        >
          The following pieces of the existing audit migrate into this bento. The components
          already exist and carry verified data. Phase 2 wires them through headerless variants.
        </p>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {bento.blocks.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: 10,
                alignItems: 'baseline',
              }}
            >
              <span style={mono(10, C.muted, 700)}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.5, color: C.ink }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function FrameDial({ verdict }: { verdict: string }) {
  const totalScore = computeBuyerTrustScore(betterupAudit.currentScores)
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
      <RevenueSignalGauge score={totalScore} width={300} showScoreReadout showTicks={false} />
      <span style={mono(10, '#E6195F', 700)}>BAND 3 OF 5</span>
      <div
        style={{
          ...mono(11, C.ink, 700),
          paddingTop: 12,
          borderTop: `1px solid ${PAGE_LINE}`,
          alignSelf: 'stretch',
        }}
      >
        {verdict}
      </div>
    </aside>
  )
}

function kindLabel(kind: Statement['kind']): string {
  switch (kind) {
    case 'frame':
      return 'THE FRAME'
    case 'move':
      return 'THE MOVE'
    case 'urgency':
      return 'WHY NOW'
    case 'closer':
      return 'THE CLOSER'
  }
}

export { mono as monoStyle }
export const COLORS = C
export type RowStyle = CSSProperties
