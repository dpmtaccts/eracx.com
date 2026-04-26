// FrvrdRadar.tsx — pentagon FRVRD radar (Frequency, Recency, Value,
// Responsiveness, Density). Axis order matches the FRVRD acronym.
//
// The polygon shape and warmth number are computed CONTINUOUSLY from a
// scrollProgress prop (0..1) that the parent passes in every render.
// Polygon points get a fresh interpolated value each frame, so the
// radar tracks the user's actual scroll velocity — fast scroll, fast
// growth; backward scroll, the polygon shrinks. No CSS transition on
// the polygon points; no count-up animation on the warmth number;
// every render is a snapshot of the current state.
//
// Discrete stage transitions still drive two visual cues:
//   - the stage label below the warmth number ("Post" / "Comment" /
//     etc.) snaps when activeStage changes, since a name doesn't
//     interpolate
//   - the dimension-pulse animation on the moved axes fires when
//     activeStage changes
//
// Honors prefers-reduced-motion: reduce by suppressing only the
// dimension pulse. Polygon and warmth still flow with scroll because
// that is data, not motion.

import { useEffect, useRef, useState } from 'react'

const AXIS_LABELS = [
  'FREQUENCY',
  'RECENCY',
  'VALUE',
  'RESPONSIVENESS',
  'DENSITY',
]

// Cumulative dimension values at each "anchor" point. Index 0 =
// pre-stage-1 baseline. Indices 1..5 = after stages 1..5. Order matches
// AXIS_LABELS: [Frequency, Recency, Value, Responsiveness, Density].
interface Anchor {
  warmth: number
  values: number[]
}
const ANCHORS: Anchor[] = [
  { warmth: 32, values: [25, 40, 22, 35, 30] },
  { warmth: 36, values: [32, 40, 22, 35, 30] },
  { warmth: 45, values: [40, 40, 22, 48, 30] },
  { warmth: 55, values: [40, 55, 22, 48, 50] },
  { warmth: 67, values: [40, 55, 55, 60, 65] },
  { warmth: 72, values: [55, 55, 70, 60, 75] },
]

// Stage labels (by activeStage 0..4 — i.e. the currently visible card).
const STAGE_NAMES = ['Post', 'Comment', 'Landing page', 'Email parallel', 'Meeting']

// Which axis indices "move" when each anchor is reached (pulsed when
// activeStage transitions to the corresponding card). Indices map to
// the FRVRD axis order: 0=F, 1=R, 2=V, 3=R(esp), 4=D.
const MOVED_BY_ANCHOR: number[][] = [
  [],          // anchor 0 (baseline) — nothing moved yet
  [0],         // anchor 1: Frequency moved in stage 1
  [0, 3],      // anchor 2: Frequency + Responsiveness moved in stage 2
  [1, 4],      // anchor 3: Recency + Density moved in stage 3
  [2, 4, 3],   // anchor 4: Value + Density + Responsiveness moved in stage 4
  [2, 0, 4],   // anchor 5: Value + Frequency + Density moved in stage 5
]

const PULSE_DELAY_MS = 200
const PULSE_DURATION_MS = 600

interface Props {
  // Continuous scroll position within the pinned section, 0..1.
  // Polygon shape and warmth number are computed from this.
  scrollProgress: number
  // Discrete card index 0..4 of the currently visible stage. Drives
  // the stage label and the dimension-pulse animation. Values < 0
  // are clamped to 0.
  activeStage: number
  variant?: 'desktop' | 'mobile'
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function anchorForAngle(angle: number): 'start' | 'middle' | 'end' {
  const c = Math.cos(angle)
  if (c > 0.3) return 'start'
  if (c < -0.3) return 'end'
  return 'middle'
}

export default function FrvrdRadar({
  scrollProgress,
  activeStage,
  variant = 'desktop',
}: Props) {
  // ---- Continuous interpolation from scrollProgress -----------------
  const clamped = Math.max(0, Math.min(1, scrollProgress))
  const fractional = clamped * (ANCHORS.length - 1)
  const lo = Math.min(ANCHORS.length - 2, Math.floor(fractional))
  const hi = lo + 1
  const t = fractional - lo
  const values = ANCHORS[lo].values.map(
    (v, i) => v + (ANCHORS[hi].values[i] - v) * t,
  )
  const warmth = Math.round(
    ANCHORS[lo].warmth + (ANCHORS[hi].warmth - ANCHORS[lo].warmth) * t,
  )

  // ---- Discrete stage label + pulse trigger from activeStage --------
  const safeStage = Math.min(STAGE_NAMES.length - 1, Math.max(0, activeStage))
  const stageName = STAGE_NAMES[safeStage]

  const [pulseAxes, setPulseAxes] = useState<number[]>([])
  const lastStageRef = useRef<number>(safeStage)
  const pulseTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (lastStageRef.current === safeStage) return
    lastStageRef.current = safeStage

    if (prefersReducedMotion()) return

    if (pulseTimeoutRef.current !== null) {
      window.clearTimeout(pulseTimeoutRef.current)
    }
    setPulseAxes([])

    // Pulse the dimensions that moved during the stage that's now
    // visible. activeStage 0 (Post) → ANCHORS[1] (after stage 1) →
    // MOVED_BY_ANCHOR[1] = [0] = Frequency.
    const movedIndex = Math.min(MOVED_BY_ANCHOR.length - 1, safeStage + 1)
    pulseTimeoutRef.current = window.setTimeout(() => {
      setPulseAxes(MOVED_BY_ANCHOR[movedIndex])
      pulseTimeoutRef.current = window.setTimeout(() => {
        setPulseAxes([])
      }, PULSE_DURATION_MS)
    }, PULSE_DELAY_MS)

    return () => {
      if (pulseTimeoutRef.current !== null) {
        window.clearTimeout(pulseTimeoutRef.current)
      }
    }
  }, [safeStage])

  // ---- Geometry ------------------------------------------------------
  const isMobile = variant === 'mobile'
  const vbWidth = isMobile ? 240 : 360
  const vbHeight = isMobile ? 240 : 280
  const cx = vbWidth / 2
  const cy = vbHeight / 2
  const rMax = isMobile ? 90 : 80
  const labelRadius = rMax + 22
  const axisCount = 5
  const axisAngle = (i: number) =>
    -Math.PI / 2 + (i * 2 * Math.PI) / axisCount

  const polygonPoints = values
    .map((v, i) => {
      const r = (v / 100) * rMax
      const x = cx + r * Math.cos(axisAngle(i))
      const y = cy + r * Math.sin(axisAngle(i))
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  if (isMobile) {
    return (
      <div className="frvrd-mobile">
        <svg
          className="frvrd-mobile-svg"
          viewBox={`0 0 ${vbWidth} ${vbHeight}`}
          aria-hidden="true"
        >
          <RadarGrid cx={cx} cy={cy} rMax={rMax} compact />
          <polygon
            points={polygonPoints}
            fill="var(--accent)"
            fillOpacity="0.15"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
        </svg>
        <div className="frvrd-mobile-stage">{stageName}</div>
        <div className="frvrd-mobile-warmth">
          <b>{warmth}</b>
          <span>warmth</span>
        </div>
      </div>
    )
  }

  return (
    <div className="frvrd-radar">
      <div className="frvrd-radar-label">Account Warmth</div>
      <svg
        className="frvrd-radar-svg"
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        role="img"
        aria-label="Account Warmth radar"
      >
        <RadarGrid cx={cx} cy={cy} rMax={rMax} />
        <polygon
          points={polygonPoints}
          fill="var(--accent)"
          fillOpacity="0.15"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Axis dots — pulse when their dimension moved in the new stage */}
        {values.map((v, i) => {
          const r = (v / 100) * rMax
          const x = cx + r * Math.cos(axisAngle(i))
          const y = cy + r * Math.sin(axisAngle(i))
          const pulsing = pulseAxes.includes(i)
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={pulsing ? 6 : 3.5}
              fill="var(--accent)"
              style={{ transition: 'r 600ms ease-out' }}
            />
          )
        })}
        {/* Axis labels with quadrant-aware textAnchor */}
        {AXIS_LABELS.map((lbl, i) => {
          const angle = axisAngle(i)
          const x = cx + labelRadius * Math.cos(angle)
          const y = cy + labelRadius * Math.sin(angle) + 3
          return (
            <text
              key={lbl}
              x={x}
              y={y}
              textAnchor={anchorForAngle(angle)}
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              letterSpacing="0.08em"
              fill={pulseAxes.includes(i) ? 'var(--accent)' : 'var(--text-muted)'}
              fontWeight={pulseAxes.includes(i) ? 700 : 600}
            >
              {lbl}
            </text>
          )
        })}
      </svg>
      <div className="frvrd-warmth">
        <div className="frvrd-warmth-label">WARMTH</div>
        <div className="frvrd-warmth-value">{warmth}</div>
        <div className="frvrd-warmth-stage">{stageName}</div>
      </div>
    </div>
  )
}

function RadarGrid({
  cx,
  cy,
  rMax,
  compact = false,
}: {
  cx: number
  cy: number
  rMax: number
  compact?: boolean
}) {
  const rings = compact ? [0.5, 1] : [0.25, 0.5, 0.75, 1]
  const axisCount = 5
  const axisAngle = (i: number) =>
    -Math.PI / 2 + (i * 2 * Math.PI) / axisCount
  return (
    <g stroke="var(--rule)" strokeWidth="0.5" fill="none">
      {rings.map((f, i) => {
        const points = Array.from({ length: axisCount })
          .map((_, j) => {
            const r = f * rMax
            const x = cx + r * Math.cos(axisAngle(j))
            const y = cy + r * Math.sin(axisAngle(j))
            return `${x.toFixed(2)},${y.toFixed(2)}`
          })
          .join(' ')
        return (
          <polygon
            key={i}
            points={points}
            opacity={i === rings.length - 1 ? 0.8 : 0.4}
          />
        )
      })}
      {Array.from({ length: axisCount }).map((_, i) => {
        const x = cx + rMax * Math.cos(axisAngle(i))
        const y = cy + rMax * Math.sin(axisAngle(i))
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} opacity="0.3" />
        )
      })}
    </g>
  )
}
