/**
 * V4WarmthOverTime — combined FIG.02 (pentagon) + FIG.03 (timeline) on a
 * single parchment card with scroll-driven choreography.
 *
 * Replaces the previous two stacked cards (separate FIG.02 / FIG.03) with one
 * two-column composition. On desktop (≥1024px): pentagon left ~40%, timeline
 * right ~60%. On mobile: stacked, pentagon on top.
 *
 * Animation choreography (driven by scroll progress through the card):
 *
 *   progress 0.00 → small "seed" pentagon at 5% size, all five FRVRD numbers
 *                   read 0, timeline empty (markers at opacity 0, line not
 *                   drawn).
 *   0.05 – 0.20   → FREQUENCY ticks 0 → 92, that vertex extends outward.
 *   0.20 – 0.35   → VALUE ticks to 90.
 *   0.35 – 0.50   → RECENCY ticks to 88.
 *   0.50 – 0.65   → DENSITY ticks to 86.
 *   0.65 – 0.80   → RESPONSIVENESS ticks to 84.
 *   0.80 – 0.95   → COMPOSITE ticks to 88. DEAL MOVING terminus appears.
 *
 *   Each axis uses ease-out cubic. The pentagon polygon morphs continuously
 *   (SVG point interpolation, not stepped). Timeline markers fade in across
 *   the same progress window — they're spread roughly evenly so the line
 *   draws in alongside pentagon growth. Timeline line uses stroke-dasharray
 *   / stroke-dashoffset to draw on progressively.
 *
 * `prefers-reduced-motion: reduce` short-circuits the whole choreography
 * and renders the final state statically (full pentagon at 88 composite,
 * all markers visible, line fully drawn). No transforms, no motion values.
 *
 * Pentagon math: regular pentagon at center (240, 224) with max radius 183.
 * Five vertices at -90°, -18°, 54°, 126°, 198°. Source order in the points
 * string is [Frequency-top, Recency-top-right, Value-bottom-right,
 * Responsiveness-bottom-left, Density-top-left] — this matches the original
 * static pentagon's vertex order so the visual identity carries over.
 */

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

// ----- Pentagon geometry (matches the prior static pentagon's center + radius) -----

const PENTAGON_CX = 240
const PENTAGON_CY = 224
const PENTAGON_R = 183

// Vertex angles, ordered to match the existing polygon points string:
// [Frequency, Recency, Value, Responsiveness, Density]
const VERTEX_ANGLES = [
  -Math.PI / 2,                 // top         → Frequency
  -Math.PI / 2 + (2 * Math.PI / 5), // top-right   → Recency
  -Math.PI / 2 + (4 * Math.PI / 5), // bottom-right → Value
  -Math.PI / 2 + (6 * Math.PI / 5), // bottom-left  → Responsiveness
  -Math.PI / 2 + (8 * Math.PI / 5), // top-left    → Density
]

// Final scores. Order matches VERTEX_ANGLES.
const SCORES = {
  frequency: 92,
  recency: 88,
  value: 90,
  responsiveness: 84,
  density: 86,
  composite: 88,
}

// Scroll-progress window for each axis, in the order spec calls out:
// Frequency → Value → Recency → Density → Responsiveness → Composite.
const AXIS_WINDOWS = {
  frequency:      [0.05, 0.20] as const,
  value:          [0.20, 0.35] as const,
  recency:        [0.35, 0.50] as const,
  density:        [0.50, 0.65] as const,
  responsiveness: [0.65, 0.80] as const,
  composite:      [0.80, 0.95] as const,
}

// Tiny floor so the pentagon starts as a small visible shape, not a literal dot.
const SEED = 0.05

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

// Returns axis value at scroll progress p. Before the window opens the axis
// renders at SEED * target so the pentagon has a small visible footprint.
function axisAt(p: number, [start, end]: readonly [number, number], target: number) {
  if (p <= start) return SEED * target
  if (p >= end) return target
  const t = (p - start) / (end - start)
  return SEED * target + (target - SEED * target) * easeOutCubic(t)
}

function pentagonPoints(scores: number[]) {
  return scores
    .map((score, i) => {
      const r = (score / 100) * PENTAGON_R
      const x = PENTAGON_CX + r * Math.cos(VERTEX_ANGLES[i])
      const y = PENTAGON_CY + r * Math.sin(VERTEX_ANGLES[i])
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

// Static "final state" polygon for reduced-motion fallback.
const FINAL_POLYGON = pentagonPoints([
  SCORES.frequency,
  SCORES.recency,
  SCORES.value,
  SCORES.responsiveness,
  SCORES.density,
])

// ----- Timeline event markers — kept verbatim from the previous FIG.03.
//       Added a `progressIn` field per marker so each fades in at a
//       roughly evenly-distributed scroll position. -----

interface Marker {
  cx: number
  cy: number
  r: number
  progressIn: number
  label?: string
  delta?: string
  labelY?: number
  deltaY?: number
  labelTickFrom?: number
  labelTickTo?: number
  labelOpacity?: number
  cooling?: boolean
}

const MARKERS: Marker[] = [
  { cx: 192, cy: 598, r: 7, progressIn: 0.10, label: 'NEWSLETTER',        delta: '+4',  labelY: 540, deltaY: 525, labelTickFrom: 591, labelTickTo: 555 },
  { cx: 285, cy: 555, r: 7, progressIn: 0.18, label: 'WEBINAR ATTENDED',  delta: '+8',  labelY: 475, deltaY: 460, labelTickFrom: 548, labelTickTo: 490 },
  { cx: 469, cy: 523, r: 7, progressIn: 0.30, label: 'REPORT DOWNLOADED', delta: '+6',  labelY: 410, deltaY: 395, labelTickFrom: 516, labelTickTo: 425 },
  { cx: 562, cy: 501, r: 7, progressIn: 0.38, label: 'LINKEDIN COMMENT',  delta: '+5',  labelY: 600, deltaY: 615, labelTickFrom: 508, labelTickTo: 582 },
  { cx: 654, cy: 512, r: 6, progressIn: 0.46, label: 'SIGNAL COOLING',    delta: '−2',  labelY: 640, deltaY: 655, labelTickFrom: 519, labelTickTo: 625, cooling: true },
  { cx: 746, cy: 480, r: 6, progressIn: 0.54 },
  { cx: 838, cy: 415, r: 7, progressIn: 0.60, label: 'CONFERENCE',        delta: '+12', labelY: 350, deltaY: 335, labelTickFrom: 408, labelTickTo: 365 },
  { cx: 931, cy: 361, r: 7, progressIn: 0.68, label: 'EMAIL REPLY',       delta: '+8',  labelY: 448, deltaY: 463, labelTickFrom: 368, labelTickTo: 430 },
  { cx: 1023, cy: 318, r: 7, progressIn: 0.74, label: 'LINKEDIN × 3',     delta: '+10', labelY: 255, deltaY: 240, labelTickFrom: 311, labelTickTo: 270 },
  { cx: 1115, cy: 242, r: 9, progressIn: 0.80, label: 'REFERRAL INTRO',   delta: '+15', labelY: 322, deltaY: 337, labelTickFrom: 251, labelTickTo: 305 },
  { cx: 1208, cy: 188, r: 7, progressIn: 0.86, label: 'MEETING SCHEDULED', delta: '+12', labelY: 232, deltaY: 247, labelTickFrom: 195, labelTickTo: 215 },
]

// Final terminus marker (DEAL MOVING) animates in last.
const TERMINUS = { cx: 1300, cy: 145, r: 10, progressIn: 0.90 }

// ----- Component -----

interface ScoreState {
  frequency: number
  value: number
  recency: number
  density: number
  responsiveness: number
  composite: number
}

const ZERO_SCORES: ScoreState = {
  frequency: 0,
  value: 0,
  recency: 0,
  density: 0,
  responsiveness: 0,
  composite: 0,
}

const FINAL_SCORES: ScoreState = {
  frequency: SCORES.frequency,
  value: SCORES.value,
  recency: SCORES.recency,
  density: SCORES.density,
  responsiveness: SCORES.responsiveness,
  composite: SCORES.composite,
}

export function V4WarmthOverTime() {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 70%', 'end 30%'],
  })

  // Pentagon polygon points — derived from animated axis scores.
  const polygonPoints = useTransform<number, string>(scrollYProgress, (p) => {
    if (reducedMotion) return FINAL_POLYGON
    return pentagonPoints([
      axisAt(p, AXIS_WINDOWS.frequency, SCORES.frequency),
      axisAt(p, AXIS_WINDOWS.recency, SCORES.recency),
      axisAt(p, AXIS_WINDOWS.value, SCORES.value),
      axisAt(p, AXIS_WINDOWS.responsiveness, SCORES.responsiveness),
      axisAt(p, AXIS_WINDOWS.density, SCORES.density),
    ])
  })

  // Score number tickers. State approach so SVG <text> nodes can render
  // integers without imperative DOM mutation.
  const [scoreState, setScoreState] = useState<ScoreState>(
    reducedMotion ? FINAL_SCORES : ZERO_SCORES,
  )

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reducedMotion) return
    setScoreState({
      frequency:      Math.round(axisAt(p, AXIS_WINDOWS.frequency, SCORES.frequency)),
      value:          Math.round(axisAt(p, AXIS_WINDOWS.value, SCORES.value)),
      recency:        Math.round(axisAt(p, AXIS_WINDOWS.recency, SCORES.recency)),
      density:        Math.round(axisAt(p, AXIS_WINDOWS.density, SCORES.density)),
      responsiveness: Math.round(axisAt(p, AXIS_WINDOWS.responsiveness, SCORES.responsiveness)),
      composite:      Math.round(axisAt(p, AXIS_WINDOWS.composite, SCORES.composite)),
    })
  })

  // Pentagon fill opacity — fades in at start so the seed pentagon doesn't
  // pop a fully-saturated fill from frame 0.
  const polygonFillOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.12])

  // Timeline line uses stroke-dasharray + stroke-dashoffset for a draw-on
  // effect. The polyline's path length is approximately 1500 units (it's
  // 14 segments across viewBox width 1300). 2000 is a safe overshoot.
  const TIMELINE_LINE_LENGTH = 2000
  const timelineDashOffset = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [TIMELINE_LINE_LENGTH, 0],
  )

  return (
    <div ref={cardRef} className="v4-system-card v4-system-card--parchment v4-warmth-card">
      <div className="v4-system-card__header">
        <span className="v4-system-card__label">FIG.02 / WARMTH OVER TIME</span>
        <span className="v4-system-card__label">FRVRD · 90 DAYS</span>
      </div>

      <div className="v4-warmth-card__grid">
        {/* ===== LEFT: Pentagon ===== */}
        <div className="v4-warmth-card__pentagon">
          <svg
            className="v4-pentagon"
            viewBox="-50 0 580 440"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="FRVRD pentagon: frequency 92, recency 88, value 90, responsiveness 84, density 86, composite 88"
          >
            {/* Reference pentagons (static) */}
            <polygon
              points="240,40 411,164 346,376 134,376 69,164"
              fill="none"
              stroke="rgba(10,10,10,0.1)"
              strokeWidth="1"
            />
            <polygon
              points="240,130 326,192 293,298 187,298 154,192"
              fill="none"
              stroke="rgba(10,10,10,0.08)"
              strokeWidth="1"
            />

            {/* Animated polygon */}
            <motion.polygon
              points={polygonPoints}
              fill="#0A0A0A"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={reducedMotion ? { fillOpacity: 0.12 } : { fillOpacity: polygonFillOpacity }}
            />

            {/* Vertex circles — static positions at the FINAL polygon. They
                'pop' as the morphing polygon reaches them, which reads as
                each axis 'arriving'. */}
            <circle cx="240" cy="54" r="6" fill="#0A0A0A" />
            <circle cx="397" cy="170" r="6" fill="#0A0A0A" />
            <circle cx="335" cy="358" r="6" fill="#0A0A0A" />
            <circle cx="144" cy="355" r="6" fill="#0A0A0A" />
            <circle cx="95" cy="170" r="6" fill="#0A0A0A" />

            {/* Axis labels + animated score numbers */}
            <text x="240" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">FREQUENCY</text>
            <text x="240" y="38" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{scoreState.frequency}</text>

            <text x="430" y="170" textAnchor="start" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">RECENCY</text>
            <text x="430" y="186" textAnchor="start" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{scoreState.recency}</text>

            <text x="365" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">VALUE</text>
            <text x="365" y="411" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{scoreState.value}</text>

            <text x="115" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">RESPONSIVENESS</text>
            <text x="115" y="411" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{scoreState.responsiveness}</text>

            <text x="50" y="170" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">DENSITY</text>
            <text x="50" y="186" textAnchor="end" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{scoreState.density}</text>

            {/* Composite */}
            <text x="240" y="225" textAnchor="middle" fontFamily="Archivo Black" fontSize="72" fill="#0A0A0A" letterSpacing="-0.04em">{scoreState.composite}</text>
            <text x="240" y="252" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.5)" fontWeight="700" letterSpacing="0.18em">COMPOSITE</text>
          </svg>
        </div>

        {/* ===== RIGHT: Timeline ===== */}
        <div className="v4-warmth-card__timeline">
          <div className="v4-chart-svg-wrap">
            <svg
              className="v4-chart-svg"
              viewBox="0 0 1400 720"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Account 047 trajectory across 90 days, rising from cold to warm with discrete signal events ending in DEAL MOVING"
            >
              {/* Grid lines */}
              <line x1="100" y1="80"  x2="1300" y2="80"  stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="215" x2="1300" y2="215" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="350" x2="1300" y2="350" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="485" x2="1300" y2="485" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="620" x2="1300" y2="620" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" />

              {/* Y-axis labels */}
              <text x="80" y="84"  textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">100</text>
              <text x="80" y="219" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">75</text>
              <text x="80" y="354" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">50</text>
              <text x="80" y="489" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">25</text>
              <text x="80" y="624" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">0</text>

              {/* X-axis labels (days) */}
              <text x="100"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 0</text>
              <text x="285"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 15</text>
              <text x="469"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 30</text>
              <text x="654"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 45</text>
              <text x="838"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 60</text>
              <text x="1023" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 75</text>
              <text x="1208" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 90</text>

              {/* Quiet stretch */}
              <rect x="285" y="80" width="92" height="540" fill="rgba(10,10,10,0.04)" />
              <text x="331" y="675" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.14em">QUIET</text>

              {/* Warmth line — animated draw-on */}
              <motion.polyline
                points="100,620 192,598 285,555 377,555 469,523 562,501 654,512 746,480 838,415 931,361 1023,318 1115,242 1208,188 1300,145"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={TIMELINE_LINE_LENGTH}
                style={
                  reducedMotion
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: timelineDashOffset }
                }
              />

              {/* Event markers */}
              {MARKERS.map((m) => (
                <TimelineMarker
                  key={`${m.cx}-${m.cy}`}
                  marker={m}
                  scrollYProgress={scrollYProgress}
                  reducedMotion={!!reducedMotion}
                />
              ))}

              {/* Terminus: DEAL MOVING */}
              <TimelineTerminus
                scrollYProgress={scrollYProgress}
                reducedMotion={!!reducedMotion}
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="v4-system-card__footnote">
        FIVE DIMENSIONS. ONE WARMTH SCORE. NINETY DAYS OF COMPOUND.
      </p>
    </div>
  )
}

// ----- Sub-components for marker + terminus to keep the main render tight -----

function TimelineMarker({
  marker: m,
  scrollYProgress,
  reducedMotion,
}: {
  marker: Marker
  scrollYProgress: MotionValue<number>
  reducedMotion: boolean
}) {
  const opacity = useTransform(
    scrollYProgress,
    [m.progressIn, m.progressIn + 0.04],
    [0, 1],
  )

  const fill = m.cooling ? 'rgba(10,10,10,0.5)' : '#0A0A0A'
  const labelFill = m.cooling ? 'rgba(10,10,10,0.55)' : '#0A0A0A'
  const deltaFill = m.cooling ? 'rgba(10,10,10,0.5)' : 'rgba(10,10,10,0.6)'
  const tickStroke = m.cooling ? 'rgba(10,10,10,0.25)' : 'rgba(10,10,10,0.3)'

  const groupStyle = reducedMotion ? { opacity: 1 } : { opacity }

  return (
    <motion.g style={groupStyle}>
      <circle cx={m.cx} cy={m.cy} r={m.r} fill={fill} stroke="#F4F1EA" strokeWidth="2" />
      {m.label && m.labelTickFrom !== undefined && m.labelTickTo !== undefined && (
        <line
          x1={m.cx}
          y1={m.labelTickFrom}
          x2={m.cx}
          y2={m.labelTickTo}
          stroke={tickStroke}
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      )}
      {m.label && m.labelY !== undefined && (
        <text
          x={m.cx}
          y={m.labelY}
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="10"
          fill={labelFill}
          fontWeight="700"
          letterSpacing="0.08em"
        >
          {m.label}
        </text>
      )}
      {m.delta && m.deltaY !== undefined && (
        <text
          x={m.cx}
          y={m.deltaY}
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="9"
          fill={deltaFill}
          fontWeight="500"
        >
          {m.delta}
        </text>
      )}
    </motion.g>
  )
}

function TimelineTerminus({
  scrollYProgress,
  reducedMotion,
}: {
  scrollYProgress: MotionValue<number>
  reducedMotion: boolean
}) {
  const opacity = useTransform(scrollYProgress, [TERMINUS.progressIn, TERMINUS.progressIn + 0.05], [0, 1])

  return (
    <motion.g style={reducedMotion ? { opacity: 1 } : { opacity }}>
      <circle cx={TERMINUS.cx} cy={TERMINUS.cy} r={TERMINUS.r} fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
      <line x1={TERMINUS.cx} y1="135" x2={TERMINUS.cx} y2="100" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" strokeDasharray="2,2" />
      <text
        x={TERMINUS.cx}
        y="85"
        textAnchor="end"
        fontFamily="Archivo Black"
        fontSize="14"
        fill="#0A0A0A"
        letterSpacing="-0.01em"
      >
        DEAL MOVING
      </text>
    </motion.g>
  )
}
