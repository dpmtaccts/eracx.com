/* Riiser insight row — mirrors the real InsightRow spine
   (src/pages/betterup/insights/InsightRow.tsx) but reads Riiser statements and
   renders Riiser evidence. Reuses the shared, data-agnostic primitives from
   RowVisuals and the real seismograph (rendered with Riiser moments). The real
   BetterUp components are left untouched. */

import { useEffect, useRef, useState } from 'react'
import { FONT } from '../betterup/theme'
import { PeripheralSeismograph } from '../betterup/PeripheralSeismograph'
import { RevenueSignalGauge } from '../../components/revenueSignal/RevenueSignalGauge'
import {
  CaretControl,
  HighestLeverageFlag,
  ImpactScopeBars,
  ShareButton,
  Watermark,
  mono,
  rowVisualsStyles as C,
} from '../betterup/insights/RowVisuals'
import { PAGE_LINE, PILLAR_COLOR } from '../betterup/insights/types'
import {
  RIISER,
  RIISER_MOMENTS,
  type EvidenceKind,
  type ExecuteBlock as RExecuteBlock,
  type ExecuteStep,
  type RiiserStatement,
} from '../../data/riiser-sample'
import {
  AtlasCards,
  ContentPanel,
  CloserPanel,
  GlassdoorCard,
  LinkedInCard,
  RedditCard,
} from './artifacts'

const PARCHMENT = '#F4F1EA'

export function RiiserInsightRow({
  statement,
  open,
  onToggle,
  isFirst,
}: {
  statement: RiiserStatement
  open: boolean
  onToggle: () => void
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
      {statement.recId && <span id={statement.recId} style={{ position: 'absolute', top: -90 }} aria-hidden />}

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

      <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <PillarTick color={pillar} />
            <span style={mono(11, C.ink, 700)}>
              STATEMENT {String(statement.n).padStart(2, '0')} · {kindLabel(statement.kind)}
            </span>
          </span>
          <ShareButton anchor={statement.anchor} />
        </div>

        {statement.highestLeverage && <HighestLeverageFlag pillar={pillar} />}

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
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
                {statement.goDos.map((todo, i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, alignItems: 'baseline' }}>
                    <span style={mono(10, C.muted, 600)}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: FONT.body, fontSize: 16, lineHeight: 1.5, fontWeight: 500, color: C.ink }}>{todo}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {statement.impact && statement.scope && (
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <ImpactScopeBars impact={statement.impact} scope={statement.scope} />
              <div style={mono(11, C.ink, 700)}>{statement.verdict}</div>
            </aside>
          )}

          {!statement.impact && statement.kind === 'frame' && <FrameDial verdict={statement.verdict} />}
          {!statement.impact && statement.kind !== 'frame' && (
            <aside>
              <div style={mono(11, C.ink, 700)}>{statement.verdict}</div>
            </aside>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <CaretControl open={open} onClick={onToggle} />
        </div>

        <div
          ref={drawerRef}
          aria-hidden={!open}
          style={{ overflow: 'hidden', maxHeight, transition: 'max-height 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)' }}
        >
          <ExpandPanel statement={statement} pillar={pillar} />
        </div>
      </div>
    </section>
  )
}

function PillarTick({ color }: { color: string }) {
  return <span aria-hidden style={{ display: 'inline-block', width: 14, height: 3, background: color }} />
}

function ExpandPanel({ statement, pillar }: { statement: RiiserStatement; pillar: string }) {
  return (
    <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 38 }}>
      <DrawerBlock label="THE INSIGHT" pillar={pillar}>{statement.drawer.insight}</DrawerBlock>
      <DrawerBlock label="WHAT IT MEANS" pillar={pillar}>{statement.drawer.meaning}</DrawerBlock>
      <ExecuteBlock label="WHAT TO EXECUTE" pillar={pillar} execute={statement.drawer.execute} />
      <DrawerBlock label="ASSUMPTIONS" pillar={pillar}>{statement.drawer.assumptions}</DrawerBlock>
      <EvidenceBlock label="THE EVIDENCE" pillar={pillar} evidence={statement.drawer.evidence} />
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

function DrawerBlock({ label, pillar, children }: { label: string; pillar: string; children: React.ReactNode }) {
  return (
    <div>
      <DrawerLabel label={label} pillar={pillar} />
      <p style={{ fontFamily: FONT.body, fontSize: 18, lineHeight: 1.55, color: C.ink, margin: 0, maxWidth: 880 }}>{children}</p>
    </div>
  )
}

function ExecuteBlock({ label, pillar, execute }: { label: string; pillar: string; execute: RExecuteBlock }) {
  return (
    <div>
      <DrawerLabel label={label} pillar={pillar} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 18, marginBottom: 24, maxWidth: 880 }}>
        <FromToCard label="FROM" body={execute.from} topColor={C.muted} labelColor={C.muted} />
        <FromToCard label="TO" body={execute.to} topColor={pillar} labelColor={pillar} />
      </div>

      {execute.steps.length > 0 && (
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 880 }}>
          {execute.steps.map((s, i) => (
            <ExecuteStepRow key={i} step={s} index={i} pillar={pillar} />
          ))}
        </ol>
      )}

      {execute.boundary && (
        <div style={{ marginTop: 24, padding: '16px 18px', background: PARCHMENT, borderLeft: `3px solid ${pillar}`, maxWidth: 880 }}>
          <div style={{ ...mono(10, pillar, 700), marginBottom: 8 }}>THE BOUNDARY</div>
          <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.55, color: C.ink, margin: 0 }}>{execute.boundary}</p>
        </div>
      )}

      {execute.effort && (
        <div style={{ marginTop: 22, paddingTop: 14, borderTop: `1px solid ${PAGE_LINE}`, display: 'grid', gridTemplateColumns: '110px minmax(0, 1fr)', gap: 14, alignItems: 'baseline', maxWidth: 880 }}>
          <span style={mono(10, C.muted, 700)}>EFFORT</span>
          <span style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.55, color: C.ink }}>{execute.effort}</span>
        </div>
      )}
    </div>
  )
}

function ExecuteStepRow({ step, index, pillar }: { step: ExecuteStep; index: number; pillar: string }) {
  const ordinal = String(index + 1).padStart(2, '0')
  if (typeof step === 'string') {
    return (
      <li style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, alignItems: 'baseline' }}>
        <span style={mono(10, C.muted, 600)}>{ordinal}</span>
        <span style={{ fontFamily: FONT.body, fontSize: 16, lineHeight: 1.5, color: C.ink }}>{step}</span>
      </li>
    )
  }
  const paragraphs = Array.isArray(step.body) ? step.body : [step.body]
  return (
    <li style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 14, alignItems: 'baseline' }}>
      <span style={mono(10, pillar, 700)}>{ordinal}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontFamily: FONT.body, fontSize: 17, lineHeight: 1.4, color: C.ink, fontWeight: 700 }}>{step.title}</span>
        {paragraphs.map((p, pi) => (
          <p key={pi} style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.6, color: 'rgba(10, 10, 10, 0.72)', margin: 0 }}>{p}</p>
        ))}
      </div>
    </li>
  )
}

function FromToCard({ label, body, topColor, labelColor }: { label: string; body: string; topColor: string; labelColor: string }) {
  return (
    <div style={{ padding: '18px 20px', background: C.paper, border: `1px solid ${PAGE_LINE}`, borderTopWidth: 3, borderTopColor: topColor }}>
      <div style={{ ...mono(10, labelColor, 700), marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: FONT.body, fontSize: 16, lineHeight: 1.5, color: C.ink }}>{body}</div>
    </div>
  )
}

function EvidenceBlock({ label, pillar, evidence }: { label: string; pillar: string; evidence: EvidenceKind }) {
  return (
    <div>
      <DrawerLabel label={label} pillar={pillar} />
      {evidence === 'seismograph' ? (
        <div style={{ border: `1px solid ${PAGE_LINE}`, padding: '28px 28px 24px', background: C.paper }}>
          <RiiserSeismographHero />
        </div>
      ) : (
        <div style={{ border: `1px solid ${PAGE_LINE}`, padding: '28px', background: C.paper }}>
          <EvidenceArtifact evidence={evidence} />
        </div>
      )}
    </div>
  )
}

function EvidenceArtifact({ evidence }: { evidence: EvidenceKind }) {
  switch (evidence) {
    case 'linkedin':
      return <LinkedInCard />
    case 'atlas':
      return <AtlasCards />
    case 'glassdoor':
      return <GlassdoorCard />
    case 'reddit':
      return <RedditCard />
    case 'content':
      return <ContentPanel />
    case 'closer':
      return <CloserPanel />
    default:
      return null
  }
}

/* Riiser seismograph hero — mirrors PeripheralViewHero's lockup/legend/foot but
   renders the chart with Riiser moments (the real component supports a moments
   prop, so the chart itself is reused, not forked). */
function RiiserSeismographHero() {
  const RULE = 'rgba(10, 10, 10, 0.15)'
  const MUTED = 'rgba(10, 10, 10, 0.55)'
  const COBALT = '#1845C2'
  const HOT = '#E6195F'
  const PARCHMENT_DEEP = '#E8E3D6'
  const PARCHMENT_OUTLINE = '#C9C2B0'
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
        <span style={{ ...mono(11, C.ink, 600) }}>The buyer view</span>
        <p style={{ fontFamily: FONT.body, fontSize: 15, fontWeight: 400, lineHeight: 1.5, color: MUTED, maxWidth: 460, margin: 0 }}>
          Buyer attention concentrates in some places and slips past others, and trust gets built or broken in the center.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', paddingBottom: 14, borderBottom: `1px solid ${RULE}`, marginBottom: 18 }}>
        <LegendItem swatch={PARCHMENT_DEEP} outline outlineColor={PARCHMENT_OUTLINE} label="Ideal congruence" />
        <LegendItem swatch={COBALT} label="Moments reinforcing" />
        <LegendItem swatch={HOT} label="Priority break" />
        <span style={{ ...mono(10, MUTED, 600), marginLeft: 'auto' }}>↳ HOVER ANY BAR · CLICK TO INSPECT</span>
      </div>

      <div
        style={{
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          paddingLeft: 'max(24px, calc((100vw - 1400px) / 2))',
          paddingRight: 'max(24px, calc((100vw - 1400px) / 2))',
          boxSizing: 'border-box',
        }}
      >
        <PeripheralSeismograph moments={RIISER_MOMENTS} />
      </div>

      <div style={{ paddingTop: 24, marginTop: 16, borderTop: `1px solid ${RULE}` }}>
        <span style={{ ...mono(11, MUTED, 600) }}>FIG · WHERE TRUST LIVES IN {RIISER.wordmark}'S BUYER VIEW</span>
      </div>
    </div>
  )
}

function LegendItem({ swatch, outline, outlineColor, label }: { swatch: string; outline?: boolean; outlineColor?: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span aria-hidden style={{ display: 'inline-block', width: 26, height: 14, background: swatch, border: outline ? `1px dashed ${outlineColor}` : 'none' }} />
      <span style={{ ...mono(10, C.ink, 600) }}>{label}</span>
    </span>
  )
}

function FrameDial({ verdict }: { verdict: string }) {
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
      <RevenueSignalGauge score={RIISER.buyerTrust} width={300} showScoreReadout showTicks={false} />
      <span style={mono(10, '#E6195F', 700)}>BAND 3 OF 5</span>
      <div style={{ ...mono(11, C.ink, 700), paddingTop: 12, borderTop: `1px solid ${PAGE_LINE}`, alignSelf: 'stretch' }}>{verdict}</div>
    </aside>
  )
}

function kindLabel(kind: RiiserStatement['kind']): string {
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
