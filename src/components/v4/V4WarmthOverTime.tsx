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
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

// Cold → warm color stops. Cobalt reads cold; magenta reads hot. Pentagon
// stroke/fill, the composite number, and the timeline polyline all
// interpolate across these as the animation progresses.
const COLD = '#1845C2'
const WARM = '#E6195F'

// Timeline pan geometry. The plot SVG is rendered at 200% of its viewport
// container, then translated horizontally as scroll progresses so a
// 700-SVG-unit window of content slides past. Day-0 visible at start;
// day-90 + DEAL MOVING visible at end. Padded right by 200 units past
// DEAL MOVING so the terminus enters the window before progress hits 1.
const PLOT_VIEWBOX_X = 100      // viewBox starts at SVG x=100 (just past where the y-axis sits)
const PLOT_VIEWBOX_WIDTH = 1400 // total SVG units of content (extends 200 past DEAL MOVING at x=1300)
const PLOT_VISIBLE_WIDTH = 700  // SVG units visible at any one time
const MARKER_FADE = 80          // SVG units of fade-in / fade-out at viewport edges

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
// Frequency → Value → Recency → Density → Responsiveness.
//
// Composite has no window of its own. It's computed as the running
// average of the five axis values at each frame, so it climbs smoothly
// from ~4 (all axes at seed) to 88 (all axes at target) as each axis
// fills in. Without this, the composite would sit at the seed floor for
// the first 80% of scroll and then jump 4 → 88 in the last 15%, which
// reads as broken.
const AXIS_WINDOWS = {
  frequency:      [0.05, 0.20] as const,
  value:          [0.20, 0.35] as const,
  recency:        [0.35, 0.50] as const,
  density:        [0.50, 0.65] as const,
  responsiveness: [0.65, 0.80] as const,
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
  // Outer wrapper drives the scroll-progress window; inner card is sticky
  // and pins to the viewport while the outer scrolls past. That gives the
  // animation a guaranteed dwell time on screen — it never finishes
  // off-screen because the card can't leave until the outer's bottom
  // clears the viewport. Wrapper height + sticky offset are tuned in CSS.
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Ratchet motion value. Tracks max progress reached; never decreases.
  // The choreography reads from this so the animation freezes once the
  // user has seen the full cold → warm transition, even if they scroll
  // back up. Resets only when the component remounts (page reload).
  const progress = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p > progress.get()) progress.set(p)
  })

  // Pentagon polygon points — derived from animated axis scores.
  const polygonPoints = useTransform<number, string>(progress, (p) => {
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

  useMotionValueEvent(progress, 'change', (p) => {
    if (reducedMotion) return
    const f  = axisAt(p, AXIS_WINDOWS.frequency, SCORES.frequency)
    const v  = axisAt(p, AXIS_WINDOWS.value, SCORES.value)
    const r  = axisAt(p, AXIS_WINDOWS.recency, SCORES.recency)
    const d  = axisAt(p, AXIS_WINDOWS.density, SCORES.density)
    const re = axisAt(p, AXIS_WINDOWS.responsiveness, SCORES.responsiveness)
    setScoreState({
      frequency:      Math.round(f),
      value:          Math.round(v),
      recency:        Math.round(r),
      density:        Math.round(d),
      responsiveness: Math.round(re),
      // Composite is the running average — climbs smoothly through the
      // intermediate values rather than jumping at the end.
      composite:      Math.round((f + v + r + d + re) / 5),
    })
  })

  // Pentagon fill opacity — fades in at start so the seed pentagon doesn't
  // pop a fully-saturated fill from frame 0.
  const polygonFillOpacity = useTransform(progress, [0, 0.05], [0, 0.12])

  // Cold → warm color shift. As scroll progresses the polygon, composite
  // number, and timeline line interpolate from cobalt (cold) to magenta
  // (warm). The pentagon starts cold and finishes hot.
  const warmthColor = useTransform(progress, [0, 1], [COLD, WARM])

  // Timeline line uses stroke-dasharray + stroke-dashoffset for a draw-on
  // effect. The polyline's path length is approximately 1500 units (it's
  // 14 segments across viewBox width 1300). 2000 is a safe overshoot.
  const TIMELINE_LINE_LENGTH = 2000
  const timelineDashOffset = useTransform(
    progress,
    [0.05, 0.95],
    [TIMELINE_LINE_LENGTH, 0],
  )

  // Timeline horizontal pan. SVG renders at 200% of its viewport container
  // (set in CSS) and translates left from 0 to -100% of the container as
  // scroll progresses. That slides a 700-SVG-unit window across the 1400-
  // unit plot, finishing on day-90 + DEAL MOVING.
  const timelinePanX = useTransform(progress, [0, 1], ['0%', '-50%'])

  return (
    <div ref={wrapperRef} className="v4-warmth-card__scrollytell">
      <div className="v4-warmth-card__sticky">
        <div className="v4-system-card v4-system-card--parchment v4-warmth-card">
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

            {/* Animated polygon — stroke + fill interpolate cobalt → magenta */}
            <motion.polygon
              points={polygonPoints}
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={
                reducedMotion
                  ? { fill: WARM, stroke: WARM, fillOpacity: 0.12 }
                  : { fill: warmthColor, stroke: warmthColor, fillOpacity: polygonFillOpacity }
              }
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

            {/* Composite — color shifts cold → warm with the polygon */}
            <motion.text
              x="240" y="225" textAnchor="middle"
              fontFamily="Archivo Black" fontSize="72"
              letterSpacing="-0.04em"
              style={reducedMotion ? { fill: WARM } : { fill: warmthColor }}
            >
              {scoreState.composite}
            </motion.text>
            <text x="240" y="252" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.5)" fontWeight="700" letterSpacing="0.18em">COMPOSITE</text>
          </svg>
        </div>

        {/* ===== RIGHT: Timeline =====
            Panning treatment: the SVG renders at 200% of its viewport
            container and translates left as scroll progresses, sliding a
            700-SVG-unit window across the 1400-unit plot. Markers fade in
            from the right edge and fade out as they pass the left edge of
            the viewport. Reduced-motion: no pan, full SVG fits in
            container, all markers visible. */}
        <div className="v4-warmth-card__timeline">
          <div className="v4-warmth-card__timeline-viewport">
            <motion.svg
              className="v4-warmth-card__timeline-svg"
              viewBox={`${PLOT_VIEWBOX_X} 0 ${PLOT_VIEWBOX_WIDTH} 720`}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Account 047 trajectory across 90 days, rising from cold to warm with discrete signal events ending in DEAL MOVING"
              style={reducedMotion ? undefined : { x: timelinePanX }}
            >
              {/* Grid lines — extended to x=1500 so they fill the right
                  pan padding (the 200 units past DEAL MOVING). */}
              <line x1="100" y1="80"  x2="1500" y2="80"  stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="215" x2="1500" y2="215" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="350" x2="1500" y2="350" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="485" x2="1500" y2="485" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="620" x2="1500" y2="620" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" />

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

              {/* Warmth line — animated draw-on, cold → warm color shift */}
              <motion.polyline
                points="100,620 192,598 285,555 377,555 469,523 562,501 654,512 746,480 838,415 931,361 1023,318 1115,242 1208,188 1300,145"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={TIMELINE_LINE_LENGTH}
                style={
                  reducedMotion
                    ? { stroke: WARM, strokeDashoffset: 0 }
                    : { stroke: warmthColor, strokeDashoffset: timelineDashOffset }
                }
              />

              {/* Event markers */}
              {MARKERS.map((m) => (
                <TimelineMarker
                  key={`${m.cx}-${m.cy}`}
                  marker={m}
                  scrollYProgress={progress}
                  reducedMotion={!!reducedMotion}
                />
              ))}

              {/* Terminus: DEAL MOVING */}
              <TimelineTerminus
                scrollYProgress={progress}
                reducedMotion={!!reducedMotion}
              />
            </motion.svg>
          </div>
        </div>
      </div>

          <p className="v4-system-card__footnote">
            FIVE DIMENSIONS. ONE WARMTH SCORE. NINETY DAYS OF COMPOUND.
          </p>
        </div>
      </div>
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
  // Opacity tied to the marker's cx position vs the panning window:
  // fades in as the right edge of the window passes the marker, holds
  // full opacity through the middle, fades out as the left edge of the
  // window approaches.
  const opacity = useTransform(scrollYProgress, (p) => {
    const windowLeft = PLOT_VIEWBOX_X + p * (PLOT_VIEWBOX_WIDTH - PLOT_VISIBLE_WIDTH)
    const windowRight = windowLeft + PLOT_VISIBLE_WIDTH
    if (m.cx <= windowLeft) return 0
    if (m.cx <= windowLeft + MARKER_FADE) return (m.cx - windowLeft) / MARKER_FADE
    if (m.cx >= windowRight) return 0
    if (m.cx >= windowRight - MARKER_FADE) return (windowRight - m.cx) / MARKER_FADE
    return 1
  })

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
  // DEAL MOVING uses the same panning window opacity logic as the other
  // markers — appears once the window's right edge crosses cx=1300,
  // fully visible thereafter.
  const opacity = useTransform(scrollYProgress, (p) => {
    const windowLeft = PLOT_VIEWBOX_X + p * (PLOT_VIEWBOX_WIDTH - PLOT_VISIBLE_WIDTH)
    const windowRight = windowLeft + PLOT_VISIBLE_WIDTH
    if (TERMINUS.cx <= windowLeft) return 0
    if (TERMINUS.cx <= windowLeft + MARKER_FADE) return (TERMINUS.cx - windowLeft) / MARKER_FADE
    if (TERMINUS.cx >= windowRight) return 0
    if (TERMINUS.cx >= windowRight - MARKER_FADE) return (windowRight - TERMINUS.cx) / MARKER_FADE
    return 1
  })

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
