// FrvrdRadar.tsx — pentagon FRVRD radar (Frequency, Recency, Velocity,
// Density, Responsiveness) used by the vertical HowItWorks layout. The
// polygon's points and the warmth counter are animated via
// requestAnimationFrame with an ease-in-out curve. Dimensions that
// "moved" in the current stage briefly pulse on the axis dots.
// Honors prefers-reduced-motion: reduce by snapping to target values.
//
// Per-stage values are cumulative through that stage. The card header
// reads "Account Warmth" — the FRVRD acronym lives only on the axis
// labels themselves.

import { useEffect, useRef, useState } from 'react'

const AXIS_LABELS = [
  'FREQUENCY',
  'RECENCY',
  'VELOCITY',
  'DENSITY',
  'RESPONSIVENESS',
]

// Cumulative dimension values per stage. Index 0 = pre-stage-1 baseline.
// Indices 1..5 = after stages 1..5.
const STAGE_VALUES: number[][] = [
  [25, 40, 22, 30, 35], // pre-1 baseline
  [32, 40, 22, 30, 35], // after stage 1
  [40, 40, 22, 30, 48], // after stage 2
  [40, 55, 22, 50, 48], // after stage 3
  [40, 55, 55, 65, 60], // after stage 4
  [55, 55, 70, 75, 60], // after stage 5
]

const STAGE_WARMTH = [32, 36, 45, 55, 67, 72]
const STAGE_NAMES = ['Pre-loop', 'Post', 'Comment', 'Landing page', 'Email parallel', 'Meeting']

// Which axis indices "move" in each stage (pulsed after a transition).
const MOVED_BY_STAGE: number[][] = [
  [],          // pre
  [0],         // stage 1: Frequency
  [0, 4],      // stage 2: Frequency + Responsiveness
  [1, 3],      // stage 3: Recency + Density
  [2, 3, 4],   // stage 4: Velocity + Density + Responsiveness
  [2, 0, 3],   // stage 5: Velocity + Frequency + Density
]

interface Props {
  // -1 means pre-stage-1 baseline. 0..4 = after stages 1..5.
  currentStageIndex: number
  variant?: 'desktop' | 'mobile'
}

const TRANSITION_MS = 800
const PULSE_DELAY_MS = 200

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Pick textAnchor based on the cosine of an axis angle so labels never
// extend past the polygon when the axis is on the left or right side.
function anchorForAngle(angle: number): 'start' | 'middle' | 'end' {
  const c = Math.cos(angle)
  if (c > 0.3) return 'start'
  if (c < -0.3) return 'end'
  return 'middle'
}

export default function FrvrdRadar({ currentStageIndex, variant = 'desktop' }: Props) {
  // valuesIndex into STAGE_VALUES — clamp -1..4 → 0..5
  const valuesIndex = Math.min(STAGE_VALUES.length - 1, Math.max(0, currentStageIndex + 1))

  const [displayValues, setDisplayValues] = useState<number[]>(STAGE_VALUES[valuesIndex])
  const [displayWarmth, setDisplayWarmth] = useState<number>(STAGE_WARMTH[valuesIndex])
  const [pulseAxes, setPulseAxes] = useState<number[]>([])

  const fromValuesRef = useRef<number[]>(STAGE_VALUES[valuesIndex])
  const fromWarmthRef = useRef<number>(STAGE_WARMTH[valuesIndex])
  const rafRef = useRef<number | null>(null)
  const pulseTimeoutRef = useRef<number | null>(null)
  const lastIndexRef = useRef<number>(valuesIndex)

  useEffect(() => {
    if (lastIndexRef.current === valuesIndex) return
    const reduced = prefersReducedMotion()
    const targetValues = STAGE_VALUES[valuesIndex]
    const targetWarmth = STAGE_WARMTH[valuesIndex]

    fromValuesRef.current = displayValues.slice()
    fromWarmthRef.current = displayWarmth

    if (reduced) {
      setDisplayValues(targetValues)
      setDisplayWarmth(targetWarmth)
      setPulseAxes([])
      lastIndexRef.current = valuesIndex
      return
    }

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    if (pulseTimeoutRef.current !== null) window.clearTimeout(pulseTimeoutRef.current)
    setPulseAxes([])

    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / TRANSITION_MS)
      const eased = easeInOut(t)
      const next = fromValuesRef.current.map(
        (v, i) => v + (targetValues[i] - v) * eased,
      )
      const w = fromWarmthRef.current + (targetWarmth - fromWarmthRef.current) * eased
      setDisplayValues(next)
      setDisplayWarmth(w)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    pulseTimeoutRef.current = window.setTimeout(() => {
      setPulseAxes(MOVED_BY_STAGE[valuesIndex])
      pulseTimeoutRef.current = window.setTimeout(() => setPulseAxes([]), 600)
    }, PULSE_DELAY_MS)

    lastIndexRef.current = valuesIndex
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (pulseTimeoutRef.current !== null) window.clearTimeout(pulseTimeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesIndex])

  // Desktop: wide viewBox so axis labels (longest = "RESPONSIVENESS",
  // 14 chars) render fully without clipping. Mobile: square compact.
  const isMobile = variant === 'mobile'
  const vbWidth = isMobile ? 240 : 360
  const vbHeight = isMobile ? 240 : 280
  const cx = vbWidth / 2
  const cy = vbHeight / 2
  const rMax = isMobile ? 90 : 80
  const labelRadius = rMax + 22
  const axisCount = 5
  const axisAngle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / axisCount

  const polygonPoints = displayValues
    .map((v, i) => {
      const r = (v / 100) * rMax
      const x = cx + r * Math.cos(axisAngle(i))
      const y = cy + r * Math.sin(axisAngle(i))
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  const warmthDisplay = Math.round(displayWarmth)
  const stageName = STAGE_NAMES[valuesIndex]

  if (isMobile) {
    return (
      <div className="frvrd-mobile">
        <svg className="frvrd-mobile-svg" viewBox={`0 0 ${vbWidth} ${vbHeight}`} aria-hidden="true">
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
          <b>{warmthDisplay}</b>
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
        {/* Axis label dots */}
        {displayValues.map((_, i) => {
          const v = displayValues[i]
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
        {/* Axis labels with quadrant-aware textAnchor so they don't crop */}
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
        <div className="frvrd-warmth-value">{warmthDisplay}</div>
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
  const axisAngle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / axisCount
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
        return <polygon key={i} points={points} opacity={i === rings.length - 1 ? 0.8 : 0.4} />
      })}
      {Array.from({ length: axisCount }).map((_, i) => {
        const x = cx + rMax * Math.cos(axisAngle(i))
        const y = cy + rMax * Math.sin(axisAngle(i))
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} opacity="0.3" />
      })}
    </g>
  )
}
