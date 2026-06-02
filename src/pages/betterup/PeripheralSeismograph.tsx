import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { FONT } from './theme'
import { MOMENTS, type ChannelId, type Moment } from './data/moments'
import { MomentDetailPanel } from './MomentDetailPanel'

/* ──────────────────────────────────────────────
   The Buyer's Peripheral View — seismograph hero.
   Bell curve of ideal congruence as the silhouette. Bars rendered as the
   brand's actual shape. Hover any bar for a tooltip. Click for the
   moment detail panel. Priority breaks link to recommendations.
   ────────────────────────────────────────────── */

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const PARCHMENT_DEEP = '#E8E3D6'
const PARCHMENT_OUTLINE = '#C9C2B0'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const RULE = 'rgba(10, 10, 10, 0.15)'
const HOT = '#E6195F'
const COBALT = '#1845C2'
const RUST = '#DD5C20'

const VB_W = 1600
const VB_H = 820
const ZERO_LINE = 440
const MAX_HEIGHT = 280
const BAR_WIDTH = 5
const POPOVER_WIDTH = 240

const CHART_X_START = 120
const CHART_X_END = 1500
const CHART_X_CENTER = (CHART_X_START + CHART_X_END) / 2
const CHART_X_WIDTH = CHART_X_END - CHART_X_START

const LABEL_Y = 720
const SPECTRUM_Y = 800
const CHANNEL_RULE_Y = 690

type Zone = 'Periphery' | 'Mid' | 'Core' | 'Core break'

type Channel = {
  id: ChannelId
  label: string
  zone: Zone
  center: number
  zoneStart: number
  zoneEnd: number
  color: string
  opacity: number
  labelOpacity: number
}

const CHANNELS: readonly Channel[] = [
  { id: 'ads', label: 'Ads', zone: 'Periphery', center: 175, zoneStart: 120, zoneEnd: 240, color: '#8E8C88', opacity: 1, labelOpacity: 0.5 },
  { id: 'sponsored', label: 'Sponsored', zone: 'Periphery', center: 305, zoneStart: 240, zoneEnd: 370, color: '#8E8C88', opacity: 1, labelOpacity: 0.5 },
  { id: 'owned', label: 'Owned', zone: 'Mid', center: 435, zoneStart: 370, zoneEnd: 510, color: '#F4C430', opacity: 1, labelOpacity: 0.65 },
  { id: 'linkedin', label: 'LinkedIn · Personal', zone: 'Core', center: 590, zoneStart: 510, zoneEnd: 670, color: COBALT, opacity: 1, labelOpacity: 1 },
  { id: 'agents', label: 'AI Agents', zone: 'Core break', center: 745, zoneStart: 670, zoneEnd: 815, color: HOT, opacity: 1, labelOpacity: 1 },
  { id: 'reviews', label: 'Reviews', zone: 'Core break', center: 880, zoneStart: 815, zoneEnd: 950, color: RUST, opacity: 1, labelOpacity: 1 },
  { id: 'company', label: 'Company', zone: 'Mid', center: 1015, zoneStart: 950, zoneEnd: 1075, color: COBALT, opacity: 0.78, labelOpacity: 0.65 },
  { id: 'instagram', label: 'Instagram', zone: 'Periphery', center: 1135, zoneStart: 1075, zoneEnd: 1195, color: '#8E8C88', opacity: 1, labelOpacity: 0.5 },
  { id: 'twitter', label: 'Twitter / X', zone: 'Periphery', center: 1255, zoneStart: 1195, zoneEnd: 1315, color: INK, opacity: 1, labelOpacity: 0.5 },
  { id: 'communities', label: 'Communities', zone: 'Periphery', center: 1370, zoneStart: 1315, zoneEnd: 1430, color: INK, opacity: 1, labelOpacity: 0.5 },
  { id: 'thirdparty', label: 'Third-party', zone: 'Periphery', center: 1485, zoneStart: 1430, zoneEnd: 1500, color: '#8E8C88', opacity: 1, labelOpacity: 0.5 },
]

const CHANNEL_BY_ID = new Map<ChannelId, Channel>(CHANNELS.map((c) => [c.id, c]))

/* Bell-curve silhouette of the ideal shape of congruence. Centered at the
   chart midpoint, σ = chart_width / 7, peak height = MAX_HEIGHT * 0.85. */
const BELL_SIGMA = CHART_X_WIDTH / 7
const BELL_PEAK = MAX_HEIGHT * 0.85

function bellHeight(x: number): number {
  const dx = x - CHART_X_CENTER
  return BELL_PEAK * Math.exp(-(dx * dx) / (2 * BELL_SIGMA * BELL_SIGMA))
}

function bellOutlinePath(): string {
  let d = ''
  for (let x = CHART_X_START; x <= CHART_X_END; x += 4) {
    const y = ZERO_LINE - bellHeight(x)
    d += x === CHART_X_START ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return d
}

function bellFillPath(): string {
  return `${bellOutlinePath()} L ${CHART_X_END} ${ZERO_LINE} L ${CHART_X_START} ${ZERO_LINE} Z`
}

/* Identify the single tallest priority break — used as the "↓ Where trust
   breaks" annotation anchor. */
function findPeakBreak(): Moment | null {
  let peak: Moment | null = null
  for (const m of MOMENTS) {
    if (!m.isPriority) continue
    if (!peak || m.magnitude > peak.magnitude) peak = m
  }
  return peak
}

type BarVisualGroups = {
  channel: Channel
  reinforces: Moment[]
  contradicts: Moment[]
  priorities: Moment[]
}

function groupByChannel(): BarVisualGroups[] {
  return CHANNELS.map((ch) => {
    const inCh = MOMENTS.filter((m) => m.channelId === ch.id)
    return {
      channel: ch,
      reinforces: inCh.filter((m) => m.reinforces),
      contradicts: inCh.filter((m) => !m.reinforces && !m.isPriority),
      priorities: inCh.filter((m) => m.isPriority),
    }
  })
}

const CHANNEL_META_FOR_PANEL = Object.fromEntries(
  CHANNELS.map((c) => [c.id, { label: c.label, zone: c.zone }]),
) as Record<string, { label: string; zone: Zone }>

export function PeripheralSeismograph() {
  const grouped = useMemo(groupByChannel, [])
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [hovered, setHovered] = useState<Moment | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number; flipUp: boolean }>({
    left: 0,
    top: 0,
    flipUp: true,
  })
  const [selected, setSelected] = useState<Moment | null>(null)
  const [activeChannelId, setActiveChannelId] = useState<ChannelId | null>(null)
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 640)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const bellPath = useMemo(bellFillPath, [])
  const bellOutline = useMemo(bellOutlinePath, [])
  const peakBreak = useMemo(findPeakBreak, [])

  const onBarEnter = (m: Moment, ev: React.MouseEvent<SVGRectElement>) => {
    if (!wrapRef.current) return
    const wrapRect = wrapRef.current.getBoundingClientRect()
    const barRect = (ev.currentTarget as SVGRectElement).getBoundingClientRect()
    const barCenter = barRect.left + barRect.width / 2 - wrapRect.left
    const aboveBarY = barRect.top - wrapRect.top - 12
    const belowBarY = barRect.bottom - wrapRect.top + 12
    const flipUp = aboveBarY > 160
    let left = barCenter - POPOVER_WIDTH / 2
    if (left < 8) left = 8
    if (left + POPOVER_WIDTH > wrapRect.width - 8) left = wrapRect.width - POPOVER_WIDTH - 8
    setTooltipPos({ left, top: flipUp ? aboveBarY : belowBarY, flipUp })
    setHovered(m)
    setActiveChannelId(m.channelId)
  }

  const onBarLeave = () => {
    setHovered(null)
    setActiveChannelId(null)
  }

  const onBarClick = (m: Moment) => {
    setSelected(m)
  }

  const onViewRecommendation = (recId: string) => {
    setSelected(null)
    requestAnimationFrame(() => {
      const el = document.getElementById(recId)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('peripheral-rec-pulse')
      setTimeout(() => el.classList.remove('peripheral-rec-pulse'), 2200)
    })
  }

  if (isNarrow) {
    return (
      <>
        <style>{recommendationPulseKeyframes}</style>
        <ChannelCardList onSelect={setSelected} />
        <MomentDetailPanel
          moment={selected}
          channelMeta={CHANNEL_META_FOR_PANEL}
          onClose={() => setSelected(null)}
          onViewRecommendation={onViewRecommendation}
        />
      </>
    )
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <style>{recommendationPulseKeyframes}</style>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Seismograph of trust signals across eleven buyer-view channels, with the ideal shape of congruence as a silhouette"
      >
        {/* Bell curve — ideal silhouette behind everything */}
        <path d={bellPath} fill={PARCHMENT_DEEP} opacity={0.7} pointerEvents="none" />
        <path
          d={bellOutline}
          fill="none"
          stroke={PARCHMENT_OUTLINE}
          strokeWidth={1.2}
          strokeDasharray="6 4"
          pointerEvents="none"
        />

        {/* Annotation — bell curve label, above the peak */}
        <text
          x={CHART_X_CENTER}
          y={ZERO_LINE - BELL_PEAK - 22}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize={11}
          letterSpacing={1.4}
          fill="#A39884"
          fontWeight={600}
          pointerEvents="none"
        >
          ↑ THE SHAPE OF CONGRUENCE
        </text>

        {/* Zero line */}
        <line x1={CHART_X_START} y1={ZERO_LINE} x2={CHART_X_END} y2={ZERO_LINE} stroke={INK} strokeWidth={1.5} />

        {/* Bars — grouped per channel for dim-sibling hover effect */}
        {grouped.map(({ channel, reinforces, contradicts, priorities }) => {
          const isActive = activeChannelId === channel.id
          const channelOpacity = activeChannelId && !isActive ? 0.32 : 1
          return (
            <g
              key={`channel-${channel.id}`}
              data-channel={channel.id}
              style={{ opacity: channelOpacity, transition: 'opacity 0.18s ease' }}
            >
              {/* Halos behind priority bars */}
              {priorities.map((m) => {
                const h = (m.magnitude / 14) * MAX_HEIGHT
                return (
                  <rect
                    key={`halo-${m.id}`}
                    x={m.x - BAR_WIDTH * 1.7}
                    y={ZERO_LINE}
                    width={BAR_WIDTH * 4.4}
                    height={h}
                    fill={HOT}
                    opacity={0.24}
                    pointerEvents="none"
                  />
                )
              })}

              {/* Reinforces — above zero */}
              {reinforces.map((m) => {
                const h = (m.magnitude / 14) * MAX_HEIGHT
                return (
                  <rect
                    key={`r-${m.id}`}
                    data-moment={m.id}
                    x={m.x - BAR_WIDTH / 2}
                    y={ZERO_LINE - h}
                    width={BAR_WIDTH}
                    height={h}
                    fill={channel.color}
                    opacity={0.85 * channel.opacity}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => onBarEnter(m, e)}
                    onMouseLeave={onBarLeave}
                    onClick={() => onBarClick(m)}
                  />
                )
              })}

              {/* Contradicts — below zero */}
              {contradicts.map((m) => {
                const h = (m.magnitude / 14) * MAX_HEIGHT
                return (
                  <rect
                    key={`c-${m.id}`}
                    data-moment={m.id}
                    x={m.x - BAR_WIDTH / 2}
                    y={ZERO_LINE}
                    width={BAR_WIDTH}
                    height={h}
                    fill={channel.color}
                    opacity={0.92 * channel.opacity}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => onBarEnter(m, e)}
                    onMouseLeave={onBarLeave}
                    onClick={() => onBarClick(m)}
                  />
                )
              })}

              {/* Priorities — below zero, full opacity */}
              {priorities.map((m) => {
                const h = (m.magnitude / 14) * MAX_HEIGHT
                return (
                  <rect
                    key={`p-${m.id}`}
                    data-moment={m.id}
                    x={m.x - BAR_WIDTH / 2}
                    y={ZERO_LINE}
                    width={BAR_WIDTH}
                    height={h}
                    fill={channel.color}
                    opacity={1}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => onBarEnter(m, e)}
                    onMouseLeave={onBarLeave}
                    onClick={() => onBarClick(m)}
                  />
                )
              })}
            </g>
          )
        })}

        {/* "Where promise breaks" annotation — points into the highest priority */}
        {peakBreak && (
          <g pointerEvents="none">
            <line
              x1={peakBreak.x}
              y1={ZERO_LINE + (peakBreak.magnitude / 14) * MAX_HEIGHT + 8}
              x2={peakBreak.x + 60}
              y2={ZERO_LINE + (peakBreak.magnitude / 14) * MAX_HEIGHT + 56}
              stroke={HOT}
              strokeWidth={1.5}
            />
            <text
              x={peakBreak.x + 68}
              y={ZERO_LINE + (peakBreak.magnitude / 14) * MAX_HEIGHT + 62}
              fontFamily="JetBrains Mono, monospace"
              fontSize={11}
              letterSpacing={1.4}
              fill={HOT}
              fontWeight={700}
            >
              ↓ WHERE PROMISE BREAKS
            </text>
          </g>
        )}

        {/* Channel labels (above the rule) */}
        <line
          x1={CHART_X_START}
          y1={CHANNEL_RULE_Y}
          x2={CHART_X_END}
          y2={CHANNEL_RULE_Y}
          stroke={INK}
          strokeWidth={1}
        />
        <g fontFamily="JetBrains Mono, monospace" fontSize={11} letterSpacing={1.4} fill={INK} fontWeight={600}>
          {CHANNELS.map((ch) => {
            const isActive = activeChannelId === ch.id
            const baseOp = ch.labelOpacity
            const effective = activeChannelId ? (isActive ? 1 : Math.min(0.35, baseOp)) : baseOp
            return (
              <text
                key={`label-${ch.id}`}
                x={ch.center}
                y={LABEL_Y}
                textAnchor="middle"
                opacity={effective}
                style={{ transition: 'opacity 0.18s ease' }}
              >
                {ch.label.toUpperCase()}
              </text>
            )
          })}
        </g>

        {/* Spectrum gradient labels */}
        <text
          x={CHART_X_START}
          y={SPECTRUM_Y}
          fontFamily="JetBrains Mono, monospace"
          fontSize={10}
          letterSpacing={1.4}
          fill="#6B6760"
          fontWeight={500}
        >
          ←  AMBIENT
        </text>
        <text
          x={CHART_X_CENTER}
          y={SPECTRUM_Y}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize={10}
          letterSpacing={1.4}
          fill={HOT}
          fontWeight={600}
        >
          MOST DIRECT · MOST CREDIBLE
        </text>
        <text
          x={CHART_X_END}
          y={SPECTRUM_Y}
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize={10}
          letterSpacing={1.4}
          fill="#6B6760"
          fontWeight={500}
        >
          AMBIENT  →
        </text>
      </svg>

      {hovered && <MomentTooltip moment={hovered} pos={tooltipPos} />}

      <MomentDetailPanel
        moment={selected}
        channelMeta={CHANNEL_META_FOR_PANEL}
        onClose={() => setSelected(null)}
        onViewRecommendation={onViewRecommendation}
      />
    </div>
  )
}

const recommendationPulseKeyframes = `
@keyframes peripheralRecPulse {
  0%   { box-shadow: inset 0 0 0 0 transparent, 0 0 0 0 rgba(230,25,95,0); }
  10%  { box-shadow: inset 0 0 0 3px ${HOT}, 0 0 0 6px rgba(230,25,95,0.18); }
  100% { box-shadow: inset 0 0 0 0 transparent, 0 0 0 0 rgba(230,25,95,0); }
}
.peripheral-rec-pulse {
  animation: peripheralRecPulse 2.2s ease-out forwards;
}
`

function MomentTooltip({
  moment,
  pos,
}: {
  moment: Moment
  pos: { left: number; top: number; flipUp: boolean }
}) {
  const channel = CHANNEL_BY_ID.get(moment.channelId)
  if (!channel) return null
  const direction = moment.reinforces ? 'REINFORCES' : moment.isPriority ? 'PRIORITY BREAK' : 'CONTRADICTS'
  const dirColor = moment.reinforces ? COBALT : moment.isPriority ? HOT : RUST
  const dayLabel = recencyLabel(moment.capturedDay)
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'absolute',
        left: pos.left,
        top: pos.top,
        width: POPOVER_WIDTH,
        transform: pos.flipUp ? 'translateY(-100%)' : 'translateY(0)',
        background: PAPER,
        border: `1.5px solid ${moment.isPriority ? HOT : INK}`,
        padding: '12px 14px',
        pointerEvents: 'none',
        zIndex: 20,
        boxShadow: `0 1px 0 ${INK}`,
      }}
    >
      <div style={{ ...mono(10), color: INK, fontWeight: 600, marginBottom: 6 }}>
        {channel.label.toUpperCase()} · {channel.zone.toUpperCase()}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ ...mono(10), color: dirColor, fontWeight: 700 }}>
          {moment.reinforces ? '↑' : '↓'} {direction}
        </span>
        <div
          aria-hidden
          style={{ flex: 1, height: 6, background: PARCHMENT, position: 'relative', overflow: 'hidden' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${Math.min(100, (moment.magnitude / 14) * 100)}%`,
              background: dirColor,
            }}
          />
        </div>
      </div>
      {moment.description ? (
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 13,
            lineHeight: 1.4,
            color: INK,
            textTransform: 'none',
            letterSpacing: 0,
          }}
        >
          {moment.description}
        </div>
      ) : (
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 12,
            lineHeight: 1.4,
            color: MUTED,
            textTransform: 'none',
            letterSpacing: 0,
            fontStyle: 'italic',
          }}
        >
          Routine signal. Click for detail.
        </div>
      )}
      <div style={{ ...mono(9), color: MUTED, marginTop: 8 }}>{dayLabel}</div>
    </div>
  )
}

function recencyLabel(capturedDay: number): string {
  // capturedDay 1 = furthest back, 90 = today
  const daysAgo = 90 - capturedDay
  if (daysAgo <= 0) return 'Today'
  if (daysAgo === 1) return '1 day ago'
  if (daysAgo < 30) return `${daysAgo} days ago`
  if (daysAgo < 60) return `${Math.round(daysAgo / 30)} month ago`
  return `${Math.round(daysAgo / 30)} months ago`
}

function ChannelCardList({ onSelect }: { onSelect: (m: Moment) => void }) {
  // Mobile: show one card per channel, summarizing magnitude + priority count
  const byChannel = useMemo(() => {
    return CHANNELS.map((ch) => {
      const inCh = MOMENTS.filter((m) => m.channelId === ch.id)
      const priorities = inCh.filter((m) => m.isPriority)
      const contradicts = inCh.filter((m) => !m.reinforces)
      return { channel: ch, inCh, priorities, contradicts }
    })
  }, [])
  return (
    <ul style={{ listStyle: 'none', margin: '8px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {byChannel.map(({ channel: ch, priorities, contradicts }) => {
        const priority = ch.zone === 'Core break'
        const sample = priorities[0] ?? contradicts[0] ?? null
        return (
          <li
            key={ch.id}
            style={{
              border: `1px solid ${priority ? HOT : RULE}`,
              borderTop: `3px solid ${priority ? HOT : ch.color}`,
              background: PAPER,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 600, color: INK }}>{ch.label}</span>
              <span style={{ ...mono(10), color: priority ? HOT : MUTED }}>{ch.zone}</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{ ...mono(10), color: MUTED }}>
                {contradicts.length} CONTRADICT{contradicts.length === 1 ? '' : 'S'}
                {priorities.length > 0 && (
                  <>
                    {' · '}
                    <span style={{ color: HOT }}>{priorities.length} PRIORITY</span>
                  </>
                )}
              </span>
            </div>
            {sample && (
              <button
                onClick={() => onSelect(sample)}
                style={{
                  ...mono(10),
                  fontWeight: 700,
                  background: priority ? HOT : INK,
                  color: PAPER,
                  border: 'none',
                  padding: '10px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                → INSPECT {priority ? 'PRIORITY BREAK' : 'MOMENT'}
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function mono(size: number): CSSProperties {
  return {
    fontFamily: FONT.mono,
    fontSize: size,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  }
}

/* ──────────────────────────────────────────────
   Hero block — lockup, legend, chart, foot strip.
   ────────────────────────────────────────────── */

export function PeripheralViewHero() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top-left lockup */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: INK,
          }}
        >
          The buyer view
        </span>
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.5,
            color: MUTED,
            maxWidth: 460,
            margin: 0,
          }}
        >
          Buyer attention concentrates in some places and slips past others, and trust gets built or broken in the center.
        </p>
      </div>

      {/* Legend strip — three items, separated from chart by 1px rule */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          flexWrap: 'wrap',
          paddingBottom: 14,
          borderBottom: `1px solid ${RULE}`,
          marginBottom: 18,
        }}
      >
        <LegendItem swatch={PARCHMENT_DEEP} outline label="Ideal congruence" />
        <LegendItem swatch={COBALT} label="Moments reinforcing" />
        <LegendItem swatch={HOT} label="Priority break" />
        <span style={{ ...mono(10), color: MUTED, marginLeft: 'auto' }}>
          ↳ HOVER ANY BAR · CLICK TO INSPECT
        </span>
      </div>

      {/* Full-bleed chart */}
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
        <PeripheralSeismograph />
      </div>

      {/* Foot strip — figure caption only, slogan removed. */}
      <div
        style={{
          paddingTop: 24,
          marginTop: 16,
          borderTop: `1px solid ${RULE}`,
        }}
      >
        <span style={{ ...mono(11), color: MUTED, fontWeight: 600 }}>
          FIG · WHERE TRUST LIVES IN THE BUYER'S VIEW
        </span>
      </div>
    </div>
  )
}

function LegendItem({
  swatch,
  outline,
  label,
}: {
  swatch: string
  outline?: boolean
  label: string
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 26,
          height: 14,
          background: swatch,
          border: outline ? `1px dashed ${PARCHMENT_OUTLINE}` : 'none',
        }}
      />
      <span style={{ ...mono(10), color: INK, fontWeight: 600 }}>{label}</span>
    </span>
  )
}
