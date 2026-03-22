import { useCallback, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { QuarterData, ToggleMode, InflectionPoint, QuarterlyCard, QoQLift, IndustryTerminology } from '../lib/simulatorEngine'

// ── Constants ───────────────────────────────────────────────────────────────

const COLORS = {
  charcoal: '#383838',
  offWhite: '#F6F5F2',
  teal: '#1FA7A2',
  oxide: '#B85C4A',
  sand: '#D6B26D',
  techGray: '#5B6670',
  gray: '#8A8A8A',
  grayLight: '#B0B0B0',
  labelText: '#5A5A5A',
}

const FONT = "'Source Sans 3', sans-serif"

// ── Path Generators (stepped staircase) ─────────────────────────────────────

function makeSteppedAreaPath(
  topPoints: { x: number; y: number }[],
  bottomPoints: { x: number; y: number }[],
): string {
  if (topPoints.length === 0) return ''
  const n = topPoints.length
  let d = `M ${topPoints[0].x} ${topPoints[0].y}`
  for (let i = 1; i < n; i++) {
    const prev = topPoints[i - 1]
    const curr = topPoints[i]
    d += ` L ${curr.x} ${prev.y} L ${curr.x} ${curr.y}`
  }
  for (let i = n - 1; i >= 0; i--) {
    const curr = bottomPoints[i]
    if (i === n - 1) {
      d += ` L ${curr.x} ${curr.y}`
    } else {
      const next = bottomPoints[i + 1]
      d += ` L ${next.x} ${curr.y} L ${curr.x} ${curr.y}`
    }
  }
  d += ' Z'
  return d
}

function makeSteppedLinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    d += ` L ${curr.x} ${prev.y} L ${curr.x} ${curr.y}`
  }
  return d
}

// ── Investment Card Icons ───────────────────────────────────────────────────

function CardIcon({ type, size = 8 }: { type: 'people' | 'advertising' | 'technology'; size?: number }) {
  const s = size
  switch (type) {
    case 'people':
      return <circle cx={s / 2} cy={s / 2} r={s / 2 - 0.5} fill={COLORS.oxide} />
    case 'advertising':
      return <rect x={0.5} y={1} width={s - 1} height={s - 2} rx={1} fill={COLORS.sand} />
    case 'technology':
      return (
        <polygon
          points={`${s / 2},0.5 ${s - 0.5},${s / 2} ${s / 2},${s - 0.5} 0.5,${s / 2}`}
          fill={COLORS.techGray}
        />
      )
  }
}

// ── Density Markers ─────────────────────────────────────────────────────────

function DensityMarkers({
  points, bottomPoints, type, count,
}: {
  points: { x: number; y: number }[]
  bottomPoints: { x: number; y: number }[]
  type: 'people' | 'advertising' | 'technology'
  count: number
}) {
  const markers: { x: number; y: number; key: number }[] = []
  const step = Math.max(1, Math.floor(points.length / Math.min(count, points.length)))
  let seed = 42
  const pseudoRandom = () => {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }
  for (let i = 0; i < points.length && markers.length < count; i += step) {
    const top = points[i]
    const bot = bottomPoints[i]
    if (!top || !bot) continue
    const bandHeight = bot.y - top.y
    if (bandHeight < 8) continue
    const markersInCol = Math.min(3, Math.max(1, Math.floor(bandHeight / 14)))
    for (let m = 0; m < markersInCol && markers.length < count; m++) {
      markers.push({
        x: top.x + (pseudoRandom() - 0.5) * 12,
        y: top.y + bandHeight * (0.2 + pseudoRandom() * 0.6),
        key: markers.length,
      })
    }
  }

  return (
    <g opacity={0.3}>
      {markers.map(m => {
        switch (type) {
          case 'people': return <circle key={m.key} cx={m.x} cy={m.y} r={2.5} fill={COLORS.oxide} />
          case 'advertising': return <rect key={m.key} x={m.x - 2} y={m.y - 1.5} width={4} height={3} rx={0.5} fill={COLORS.sand} />
          case 'technology': return <polygon key={m.key} points={`${m.x},${m.y - 2.5} ${m.x + 2.5},${m.y} ${m.x},${m.y + 2.5} ${m.x - 2.5},${m.y}`} fill={COLORS.techGray} />
        }
      })}
    </g>
  )
}

// ── Draggable Handle ────────────────────────────────────────────────────────

function DragHandle({
  axis, x, y, onDrag, label, chartRef, axisStart, axisEnd,
}: {
  axis: 'x' | 'y'; x: number; y: number
  onDrag: (delta: number) => void; label: string
  chartRef: React.RefObject<SVGSVGElement | null>
  axisStart: number; axisEnd: number
}) {
  const dragging = useRef(false)
  const lastPos = useRef(0)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    lastPos.current = axis === 'y' ? e.clientY : e.clientX
    ;(e.target as Element).setPointerCapture(e.pointerId)
    e.preventDefault()
  }, [axis])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !chartRef.current) return
    const svgRect = chartRef.current.getBoundingClientRect()
    const viewBox = chartRef.current.viewBox.baseVal
    const scale = axis === 'y' ? viewBox.height / svgRect.height : viewBox.width / svgRect.width
    const pos = axis === 'y' ? e.clientY : e.clientX
    const svgDelta = (pos - lastPos.current) * scale
    if (Math.abs(svgDelta) > 1) {
      onDrag(svgDelta)
      lastPos.current = pos
    }
  }, [axis, onDrag, chartRef])

  const handlePointerUp = useCallback(() => { dragging.current = false }, [])

  const isY = axis === 'y'
  const pillW = isY ? 56 : 76
  const pillH = isY ? 22 : 20
  const gradId = `handle-fade-${axis}`

  return (
    <g
      style={{ cursor: isY ? 'ns-resize' : 'ew-resize' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <defs>
        <linearGradient id={`${gradId}-before`} x1={isY ? '0' : '0'} y1={isY ? '0' : '0'} x2={isY ? '0' : '1'} y2={isY ? '1' : '0'}>
          <stop offset="0%" stopColor={COLORS.grayLight} stopOpacity={0} />
          <stop offset="100%" stopColor={COLORS.grayLight} stopOpacity={0.4} />
        </linearGradient>
        <linearGradient id={`${gradId}-after`} x1={isY ? '0' : '0'} y1={isY ? '0' : '0'} x2={isY ? '0' : '1'} y2={isY ? '1' : '0'}>
          <stop offset="0%" stopColor={COLORS.grayLight} stopOpacity={0.4} />
          <stop offset="100%" stopColor={COLORS.grayLight} stopOpacity={0} />
        </linearGradient>
      </defs>
      {isY ? (
        <>
          <line x1={x} y1={axisStart} x2={x} y2={y - pillH / 2 - 4} stroke={`url(#${gradId}-before)`} strokeWidth={1} strokeDasharray="3 3" />
          <line x1={x} y1={y + pillH / 2 + 4} x2={x} y2={axisEnd} stroke={`url(#${gradId}-after)`} strokeWidth={1} strokeDasharray="3 3" />
        </>
      ) : (
        <>
          <line x1={axisStart} y1={y} x2={x - pillW / 2 - 4} y2={y} stroke={`url(#${gradId}-before)`} strokeWidth={1} strokeDasharray="3 3" />
          <line x1={x + pillW / 2 + 4} y1={y} x2={axisEnd} y2={y} stroke={`url(#${gradId}-after)`} strokeWidth={1} strokeDasharray="3 3" />
        </>
      )}
      <rect x={x - pillW / 2} y={y - pillH / 2} width={pillW} height={pillH} rx={pillH / 2}
        fill={COLORS.charcoal} stroke={COLORS.offWhite} strokeWidth={1} />
      {(isY ? [[-6, -3], [-6, 3], [6, -3], [6, 3]] : [[-3, -4], [3, -4], [-3, 4], [3, 4]]).map(([dx, dy], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={1.2} fill={COLORS.grayLight} />
      ))}
      <text x={x} y={y + 4} textAnchor="middle" fill={COLORS.offWhite}
        fontFamily={FONT} fontSize={9} fontWeight={700} letterSpacing="0.04em">{label}</text>
    </g>
  )
}

// ── Inflection Panel ────────────────────────────────────────────────────────

function InflectionPanel({ inflection, x, y }: { inflection: InflectionPoint; x: number; y: number }) {
  const panelW = 210
  return (
    <g>
      <rect x={x} y={y} width={panelW} height={155} rx={6}
        fill={COLORS.offWhite} fillOpacity={0.92} stroke="rgba(56,56,56,0.08)" strokeWidth={1} />
      <text x={x + 14} y={y + 18} fill={COLORS.oxide}
        fontFamily={FONT} fontSize={8} fontWeight={700} letterSpacing="0.12em">{inflection.kicker}</text>
      <text fontFamily={FONT} fontSize={11} fontWeight={700} fill={COLORS.charcoal}>
        <tspan x={x + 14} y={y + 36}>{inflection.headline.substring(0, 38)}</tspan>
        {inflection.headline.length > 38 && <tspan x={x + 14} dy={14}>{inflection.headline.substring(38)}</tspan>}
      </text>
      {(() => {
        const words = inflection.body.split(' '); const lines: string[] = []; let cur = ''
        for (const w of words) { if ((cur + ' ' + w).length > 38) { lines.push(cur); cur = w; if (lines.length >= 3) break } else { cur = cur ? cur + ' ' + w : w } }
        if (lines.length < 3 && cur) lines.push(cur)
        return <text fontFamily={FONT} fontSize={9} fontWeight={400} fill={COLORS.gray}>
          {lines.map((l, i) => <tspan key={i} x={x + 14} y={y + 62 + i * 13}>{l}</tspan>)}
        </text>
      })()}
      <text x={x + 14} y={y + 115} fill={COLORS.charcoal} fontFamily={FONT} fontSize={20} fontWeight={700}>{inflection.metric}</text>
      <text x={x + 14 + inflection.metric.length * 13} y={y + 115} fill={COLORS.gray} fontFamily={FONT} fontSize={9}> {inflection.metricLabel}</text>
      <text x={x + 14} y={y + 135} fill={COLORS.grayLight} fontFamily={FONT} fontSize={7} fontStyle="italic">{inflection.source}</text>
    </g>
  )
}

// ── Quarterly Investment Card (v12: overlap fix) ────────────────────────────

function InvestmentCard({ card, x, y }: { card: QuarterlyCard; x: number; y: number }) {
  const cardW = 110
  const lineH = 12
  const maxItems = 2 // limit items to prevent overflow
  const visibleItems = card.items.slice(0, maxItems)
  const cardH = 16 + visibleItems.length * lineH + 6

  return (
    <g>
      <rect x={x - cardW / 2} y={y} width={cardW} height={cardH} rx={4}
        fill={COLORS.offWhite} fillOpacity={0.95}
        stroke={card.isInflection ? COLORS.teal : 'rgba(56,56,56,0.1)'}
        strokeWidth={card.isInflection ? 1.5 : 0.75} />
      <text x={x - cardW / 2 + 6} y={y + 11}
        fill={card.isInflection ? COLORS.teal : COLORS.gray}
        fontFamily={FONT} fontSize={7} fontWeight={700} letterSpacing="0.06em">{card.label}</text>
      {visibleItems.map((item, i) => (
        <g key={i}>
          <svg x={x - cardW / 2 + 6} y={y + 15 + i * lineH} width={7} height={7}>
            <CardIcon type={item.icon} size={7} />
          </svg>
          <text x={x - cardW / 2 + 16} y={y + 21 + i * lineH}
            fill={COLORS.labelText} fontFamily={FONT} fontSize={7} fontWeight={400}>
            {item.text.length > 16 ? item.text.substring(0, 15) + '..' : item.text}
          </text>
        </g>
      ))}
    </g>
  )
}

// ── Main Chart Component ────────────────────────────────────────────────────

interface ChartProps {
  quarters: QuarterData[]
  qoqLifts: QoQLift[]
  quarterlyCards: QuarterlyCard[]
  toggleMode: ToggleMode
  revenueTarget: number
  timelineQuarters: number
  annotation: string
  profitCallout: string
  inflection: InflectionPoint
  terminology: IndustryTerminology
  onRevenueTargetChange: (v: number) => void
  onTimelineChange: (v: number) => void
}

export default function GrowthSimulatorChart({
  quarters, qoqLifts, quarterlyCards, toggleMode, revenueTarget, timelineQuarters,
  annotation, profitCallout, inflection, terminology,
  onRevenueTargetChange, onTimelineChange,
}: ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 960, height: 500 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        const w = entry.contentRect.width
        setDimensions({ width: Math.max(640, w), height: Math.max(380, Math.min(540, w * 0.52)) })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const W = dimensions.width
  const H = dimensions.height
  const PAD = { top: 44, right: 80, bottom: 56, left: 72 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  if (quarters.length === 0) return null

  const maxRevenue = Math.max(...quarters.map(q => q.revenue)) * 1.15
  const xScale = (i: number) => PAD.left + (i / (quarters.length - 1)) * chartW
  const yScale = (v: number) => PAD.top + chartH - (v / maxRevenue) * chartH

  // P&L layer stacks
  const baseline = quarters.map((_, i) => ({ x: xScale(i), y: yScale(0) }))
  const overheadTop = quarters.map((q, i) => ({ x: xScale(i), y: yScale(q.overhead) }))
  const techTop = quarters.map((q, i) => ({ x: xScale(i), y: yScale(q.overhead + q.technology) }))
  const adsTop = quarters.map((q, i) => ({ x: xScale(i), y: yScale(q.overhead + q.technology + q.advertising) }))
  const peopleTop = quarters.map((q, i) => ({ x: xScale(i), y: yScale(q.overhead + q.technology + q.advertising + q.people) }))
  const revenueLine = quarters.map((q, i) => ({ x: xScale(i), y: yScale(q.revenue) }))
  // Base (recurring) revenue line for renewal visual
  const baseRevLine = quarters.map((q, i) => ({ x: xScale(i), y: yScale(q.baseRevenue) }))

  const overheadPath = makeSteppedAreaPath(overheadTop, baseline)
  const techPath = makeSteppedAreaPath(techTop, overheadTop)
  const adsPath = makeSteppedAreaPath(adsTop, techTop)
  const peoplePath = makeSteppedAreaPath(peopleTop, adsTop)
  const profitPath = makeSteppedAreaPath(revenueLine, peopleTop)
  const cacLinePath = makeSteppedLinePath(peopleTop)
  const revenueLinePath = makeSteppedLinePath(revenueLine)
  const baseRevLinePath = makeSteppedLinePath(baseRevLine)

  const peopleDensity = toggleMode === 'conventional' ? 22 : 10
  const adsDensity = toggleMode === 'conventional' ? 14 : 5
  const profitOpacity = toggleMode === 'system' ? 0.14 : 0.04

  const yTickCount = 5
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => Math.round((maxRevenue / yTickCount) * i * 10) / 10)
  const xLabelInterval = Math.max(1, Math.floor(quarters.length / 8))

  // Drag handlers: 1:1 visual mapping with damping for smooth feel
  const handleRevenueDrag = useCallback((delta: number) => {
    // delta is in SVG units. Convert to revenue units using the y-axis scale.
    const revenuePerSvgUnit = maxRevenue / chartH
    const rawChange = -delta * revenuePerSvgUnit
    // Damping factor for smooth, predictable feel
    const damped = rawChange * 0.3
    const newTarget = Math.max(5, Math.min(150, revenueTarget + damped))
    onRevenueTargetChange(Math.round(newTarget))
  }, [maxRevenue, chartH, revenueTarget, onRevenueTargetChange])

  const handleTimelineDrag = useCallback((delta: number) => {
    // delta is in SVG units. Convert to quarters using the x-axis scale.
    const quartersPerSvgUnit = 12 / chartW
    const rawChange = delta * quartersPerSvgUnit
    const damped = rawChange * 0.4
    const newTimeline = Math.max(4, Math.min(12, timelineQuarters + damped))
    onTimelineChange(Math.round(newTimeline))
  }, [chartW, timelineQuarters, onTimelineChange])

  const revHandleY = yScale(revenueTarget)
  const inflectionIdx = Math.min(inflection.quarter - 1, quarters.length - 1)
  const inflectionX = xScale(inflectionIdx)
  const inflectionCacY = peopleTop[inflectionIdx]?.y ?? yScale(0)

  const labelIdx = Math.min(Math.floor((quarters.length - 1) * 0.78), quarters.length - 1)
  const lq = quarters[labelIdx]
  const lx = xScale(labelIdx) + 10
  const lastIdx = quarters.length - 1
  const lastQ = quarters[lastIdx]

  // v12: card overlap fix: limit cards shown based on available space
  const minCardSpacing = 85
  const maxCards = Math.max(2, Math.floor(chartW / minCardSpacing))
  // Pick evenly spaced cards, always including inflection
  const visibleCards: QuarterlyCard[] = []
  if (quarterlyCards.length <= maxCards) {
    visibleCards.push(...quarterlyCards)
  } else {
    const step = Math.ceil(quarterlyCards.length / (maxCards - 1))
    for (let i = 0; i < quarterlyCards.length; i += step) {
      visibleCards.push(quarterlyCards[i])
    }
    // Ensure inflection card is included
    const inflCard = quarterlyCards.find(c => c.isInflection)
    if (inflCard && !visibleCards.includes(inflCard)) {
      visibleCards.pop()
      visibleCards.push(inflCard)
    }
    visibleCards.sort((a, b) => a.quarter - b.quarter)
  }

  // v12: QoQ lift labels: show every Nth lift to avoid clutter
  const liftInterval = Math.max(1, Math.ceil(qoqLifts.length / 6))

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', fontFamily: FONT, userSelect: 'none', touchAction: 'none' }}
      >
        {/* Grid */}
        {yTicks.map(v => (
          <g key={v}>
            <line x1={PAD.left} y1={yScale(v)} x2={W - PAD.right} y2={yScale(v)} stroke="rgba(56,56,56,0.05)" strokeDasharray="4 4" />
            <text x={PAD.left - 10} y={yScale(v) + 3} textAnchor="end" fill={COLORS.gray} fontFamily={FONT} fontSize={9}>${Math.round(v)}M</text>
          </g>
        ))}

        {/* X-axis labels */}
        {quarters.map((q, i) => i % xLabelInterval === 0 ? (
          <text key={i} x={xScale(i)} y={PAD.top + chartH + 14} textAnchor="middle" fill={COLORS.gray} fontFamily={FONT} fontSize={9}>{q.label}</text>
        ) : null)}

        {/* Layers */}
        <motion.path d={overheadPath} fill={COLORS.techGray} opacity={0.3} animate={{ d: overheadPath }} transition={{ duration: 0.6 }} />
        <motion.path d={techPath} fill={COLORS.techGray} opacity={0.45} animate={{ d: techPath }} transition={{ duration: 0.6 }} />
        <motion.path d={adsPath} fill={COLORS.sand} opacity={0.55} animate={{ d: adsPath }} transition={{ duration: 0.6 }} />
        <motion.path d={peoplePath} fill={COLORS.oxide} opacity={0.5} animate={{ d: peoplePath }} transition={{ duration: 0.6 }} />
        <motion.path d={profitPath} fill={COLORS.teal} animate={{ d: profitPath, opacity: profitOpacity }} transition={{ duration: 0.6 }} />

        {/* Density */}
        <DensityMarkers points={peopleTop} bottomPoints={adsTop} type="people" count={peopleDensity} />
        <DensityMarkers points={adsTop} bottomPoints={techTop} type="advertising" count={adsDensity} />

        {/* Lines */}
        <motion.path d={cacLinePath} fill="none" stroke={COLORS.oxide} strokeWidth={2.5} animate={{ d: cacLinePath }} transition={{ duration: 0.6 }} />
        <motion.path d={revenueLinePath} fill="none" stroke={COLORS.charcoal} strokeWidth={2.5} animate={{ d: revenueLinePath }} transition={{ duration: 0.6 }} />
        {/* Base (recurring) revenue line: dashed charcoal showing renewal floor */}
        <motion.path d={baseRevLinePath} fill="none" stroke={COLORS.charcoal} strokeWidth={1} strokeDasharray="4 3" opacity={0.4} animate={{ d: baseRevLinePath }} transition={{ duration: 0.6 }} />

        {/* v12: QoQ Lift % labels (in the white space to the LEFT of each revenue step) */}
        {qoqLifts.filter((_, i) => i % liftInterval === 0).map(lift => {
          const qIdx = lift.quarter - 1
          const x = xScale(qIdx) - 2
          const prevRevY = revenueLine[qIdx - 1]?.y ?? revenueLine[qIdx].y
          const currRevY = revenueLine[qIdx].y
          const midY = (prevRevY + currRevY) / 2
          if (lift.liftPct < 0.5 || lift.liftPct > 50) return null
          return (
            <g key={lift.quarter}>
              {/* Tiny bracket line showing the lift */}
              <line x1={x - 18} y1={prevRevY} x2={x - 18} y2={currRevY}
                stroke={COLORS.teal} strokeWidth={0.75} opacity={0.5} />
              <line x1={x - 21} y1={prevRevY} x2={x - 15} y2={prevRevY}
                stroke={COLORS.teal} strokeWidth={0.75} opacity={0.5} />
              <line x1={x - 21} y1={currRevY} x2={x - 15} y2={currRevY}
                stroke={COLORS.teal} strokeWidth={0.75} opacity={0.5} />
              {/* % label */}
              <text x={x - 24} y={midY + 3} textAnchor="end"
                fill={COLORS.teal} fontFamily={FONT} fontSize={8} fontWeight={700}>
                +{lift.liftPct}%
              </text>
              {/* Driver label */}
              <text x={x - 24} y={midY + 12} textAnchor="end"
                fill={COLORS.grayLight} fontFamily={FONT} fontSize={6} fontWeight={400}>
                {lift.driver}
              </text>
            </g>
          )
        })}

        {/* Tufte inline labels with icons */}
        <text x={lx} y={yScale(lq.overhead * 0.5) - 1} fill={COLORS.grayLight} fontFamily={FONT} fontSize={8} fontWeight={600} opacity={0.6}>OVERHEAD</text>
        <g>
          <svg x={lx - 2} y={yScale(lq.overhead + lq.technology * 0.5) - 5} width={8} height={8}><CardIcon type="technology" size={8} /></svg>
          <text x={lx + 10} y={yScale(lq.overhead + lq.technology * 0.5) + 3} fill={COLORS.techGray} fontFamily={FONT} fontSize={9} fontWeight={700} opacity={0.85}>TECHNOLOGY</text>
        </g>
        <g>
          <svg x={lx - 2} y={yScale(lq.overhead + lq.technology + lq.advertising * 0.5) - 5} width={8} height={8}><CardIcon type="advertising" size={8} /></svg>
          <text x={lx + 10} y={yScale(lq.overhead + lq.technology + lq.advertising * 0.5) + 3} fill={COLORS.sand} fontFamily={FONT} fontSize={9} fontWeight={700} opacity={0.9}>ADVERTISING</text>
        </g>
        <g>
          <svg x={lx - 2} y={yScale(lq.overhead + lq.technology + lq.advertising + lq.people * 0.5) - 5} width={8} height={8}><CardIcon type="people" size={8} /></svg>
          <text x={lx + 10} y={yScale(lq.overhead + lq.technology + lq.advertising + lq.people * 0.5) + 3} fill={COLORS.oxide} fontFamily={FONT} fontSize={10} fontWeight={700}>PEOPLE</text>
        </g>
        <text x={xScale(lastIdx) + 10} y={yScale(lastQ.revenue) + 4} fill={COLORS.charcoal} fontFamily={FONT} fontSize={10} fontWeight={700}>REVENUE</text>
        {/* Base revenue label (only show if renewal < 100 and base is visually separate from total) */}
        {lastQ.baseRevenue > 0 && lastQ.baseRevenue < lastQ.revenue * 0.95 && (
          <text x={xScale(lastIdx) + 10} y={yScale(lastQ.baseRevenue) + 4} fill={COLORS.gray} fontFamily={FONT} fontSize={8} fontWeight={600} opacity={0.5}>BASE</text>
        )}
        <text x={xScale(lastIdx) + 10} y={yScale(lastQ.cac) + 4} fill={COLORS.oxide} fontFamily={FONT} fontSize={9} fontWeight={700}>{terminology.cac.toUpperCase()}</text>
        <text x={xScale(lastIdx) + 10} y={(yScale(lastQ.revenue) + yScale(lastQ.cac)) / 2 + 4}
          fill={COLORS.teal} fontFamily={FONT} fontSize={9} fontWeight={700} opacity={0.9}>PROFIT</text>

        {/* Inflection */}
        <line x1={inflectionX} y1={PAD.top} x2={inflectionX} y2={PAD.top + chartH}
          stroke={COLORS.charcoal} strokeWidth={1} strokeDasharray="4 3" opacity={0.25} />
        <circle cx={inflectionX} cy={inflectionCacY} r={4} fill={COLORS.oxide} stroke={COLORS.offWhite} strokeWidth={1.5} />
        <InflectionPanel inflection={inflection} x={PAD.left + 10} y={PAD.top + 6} />

        {/* v12: Investment cards (overlap-safe) */}
        {visibleCards.map(card => {
          const cx = xScale(card.quarter - 1)
          const qIdx = Math.min(card.quarter - 1, quarters.length - 1)
          const cacY = peopleTop[qIdx]?.y ?? yScale(0)
          const cardY = Math.max(PAD.top + 170, cacY - 50)
          return <InvestmentCard key={card.quarter} card={card} x={cx} y={cardY} />
        })}

        {/* Annotations */}
        <text x={W - PAD.right - 8} y={PAD.top + 14} textAnchor="end" fill={COLORS.labelText} fontFamily={FONT} fontSize={10}>{annotation}</text>
        <text x={W - PAD.right - 8} y={PAD.top + 28} textAnchor="end" fill={COLORS.teal} fontFamily={FONT} fontSize={9} fontWeight={700}>{profitCallout}</text>

        {/* Handles */}
        <DragHandle axis="y" x={PAD.left - 6}
          y={Math.max(PAD.top + 10, Math.min(PAD.top + chartH - 10, revHandleY))}
          onDrag={handleRevenueDrag} label={`$${revenueTarget}M`} chartRef={svgRef}
          axisStart={PAD.top - 20} axisEnd={PAD.top + chartH + 20} />
        <DragHandle axis="x" x={Math.min(W - PAD.right - 10, xScale(quarters.length - 1) + 6)}
          y={PAD.top + chartH + 20} onDrag={handleTimelineDrag} label={`${timelineQuarters}Q`}
          chartRef={svgRef} axisStart={PAD.left - 20} axisEnd={W - PAD.right + 30} />

        {/* Axis title */}
        <text x={14} y={H / 2} textAnchor="middle" fill={COLORS.gray}
          fontFamily={FONT} fontSize={8} fontWeight={700} letterSpacing="0.1em"
          transform={`rotate(-90, 14, ${H / 2})`}>ANNUAL REVENUE ($M)</text>

        {/* Sources */}
        <text x={W - PAD.right} y={H - 8} textAnchor="end" fill={COLORS.grayLight}
          fontFamily={FONT} fontSize={7} opacity={0.6}>
          SaaS Capital 2025 · Bridge Group 2024 · Gartner CMO Spend 2025 · KeyBanc SaaS 2024
        </text>
      </svg>
    </div>
  )
}
