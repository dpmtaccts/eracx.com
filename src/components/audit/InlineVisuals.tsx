import type { CSSProperties, ReactNode } from 'react'
import { FONT } from '../../pages/betterup/theme'

// Reusable inline visuals for the §02 / §03 impact cards. Brutalist
// treatment: hairline rules, square corners, no shadows, no gradients,
// single-accent-color per visual. Each visual carries its own aria-label so
// screen readers receive the same information sighted readers do.

const INK = '#0A0A0A'

export type Ground = 'ink' | 'parchment'

function mutedSurface(ground: Ground): string {
  // The track behind a filled bar, or the "muted" half of a count split.
  return ground === 'ink' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(10, 10, 10, 0.14)'
}

function mutedLabel(ground: Ground): string {
  // Secondary text and reference rules.
  return ground === 'ink' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(10, 10, 10, 0.55)'
}

function bodyTextColor(ground: Ground): string {
  return ground === 'ink' ? 'rgba(255, 255, 255, 0.82)' : INK
}

const monoMicro: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: 9,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
}

const monoSmall: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: 10,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
}

/* ──────────────────────────────────────────────
   Card helpers — paragraph + spacing
   ────────────────────────────────────────────── */

export function CardParagraph({
  children,
  ground,
  marginTop = 0,
}: {
  children: ReactNode
  ground: Ground
  marginTop?: number
}) {
  return (
    <p
      style={{
        fontFamily: FONT.body,
        fontSize: 15,
        lineHeight: 1.55,
        color: bodyTextColor(ground),
        margin: marginTop ? `${marginTop}px 0 0` : 0,
      }}
    >
      {children}
    </p>
  )
}

export function CardVisual({
  children,
  marginTop = 16,
  ariaLabel,
}: {
  children: ReactNode
  marginTop?: number
  ariaLabel?: string
}) {
  return (
    <div role={ariaLabel ? 'img' : undefined} aria-label={ariaLabel} style={{ margin: `${marginTop}px 0 0` }}>
      {children}
    </div>
  )
}

/* ──────────────────────────────────────────────
   Underline — 1px accent underline, 2px below baseline
   ────────────────────────────────────────────── */

export function Underline({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      style={{
        textDecoration: 'underline',
        textDecorationColor: color,
        textDecorationThickness: '1px',
        textUnderlineOffset: '2px',
      }}
    >
      {children}
    </span>
  )
}

/* ──────────────────────────────────────────────
   DiagnosticBar — horizontal score bar with 50-line marker
   ────────────────────────────────────────────── */

export function DiagnosticBar({
  label,
  score,
  accent,
  ground,
  showFloor = true,
}: {
  label: string
  score: number
  accent: string
  ground: Ground
  showFloor?: boolean
}) {
  const ariaLabel = `Diagnostic bar showing ${label} score of ${score} out of 100${
    showFloor
      ? `, ${score < 50 ? 'below' : 'above'} the 50-point functional floor reference`
      : ''
  }.`
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
    >
      <div
        style={{
          position: 'relative',
          flex: '0 1 140px',
          minWidth: 100,
          height: 8,
          background: mutedSurface(ground),
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${Math.max(0, Math.min(100, score))}%`,
            height: '100%',
            background: accent,
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {showFloor && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -2,
              left: '50%',
              width: 1,
              height: 12,
              background: mutedLabel(ground),
            }}
          />
        )}
      </div>
      <span style={{ ...monoSmall, color: accent }}>
        {label} · {score}/100
      </span>
    </div>
  )
}

/* ──────────────────────────────────────────────
   CountSplit — N accent squares vs M muted squares
   ────────────────────────────────────────────── */

export function CountSplit({
  leftCount,
  leftLabel,
  rightCount,
  rightLabel,
  accent,
  ground,
}: {
  leftCount: number
  leftLabel: string
  rightCount: number
  rightLabel: string
  accent: string
  ground: Ground
}) {
  const ariaLabel = `Count split: ${leftCount} ${leftLabel.toLowerCase()} versus ${rightCount} ${rightLabel.toLowerCase()}.`
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}
    >
      <SquareGroup
        count={leftCount}
        fill={accent}
        label={leftLabel}
        labelColor={mutedLabel(ground)}
      />
      <SquareGroup
        count={rightCount}
        fill={mutedSurface(ground)}
        label={rightLabel}
        labelColor={mutedLabel(ground)}
      />
    </div>
  )
}

function SquareGroup({
  count,
  fill,
  label,
  labelColor,
}: {
  count: number
  fill: string
  label: string
  labelColor: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 140 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ width: 12, height: 12, background: fill }} />
        ))}
      </div>
      <span style={{ ...monoMicro, color: labelColor }}>{label}</span>
    </div>
  )
}

/* ──────────────────────────────────────────────
   StruckRows — strikethrough rows for "wrong data"
   ────────────────────────────────────────────── */

export function StruckRows({
  rows,
  accent,
  ground,
}: {
  rows: ReadonlyArray<string>
  accent: string
  ground: Ground
}) {
  const ariaLabel = `Inaccurate data points the buyer encounters: ${rows.join('; ')}.`
  return (
    <div role="img" aria-label={ariaLabel} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 14, height: 1, background: accent, flex: '0 0 auto' }} />
          <span
            style={{
              ...monoMicro,
              color: mutedLabel(ground),
              textDecoration: 'line-through',
              textDecorationColor: accent,
              textDecorationThickness: '1px',
            }}
          >
            {row}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────
   CadenceTimeline — N squares evenly spaced on a hairline
   ────────────────────────────────────────────── */

export function CadenceTimeline({
  points,
  caption,
  captionPosition = 'above',
  accent,
  ground,
}: {
  points: ReadonlyArray<string>
  caption?: string
  captionPosition?: 'above' | 'below'
  accent: string
  ground: Ground
}) {
  const ariaLabel = `Cadence across ${points.length} points: ${points.join(', ')}${
    caption ? `. ${caption}` : '.'
  }`
  const captionEl = caption ? (
    <div style={{ ...monoMicro, color: mutedLabel(ground) }}>{caption}</div>
  ) : null
  return (
    <div role="img" aria-label={ariaLabel} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {captionPosition === 'above' && captionEl}
      <div style={{ position: 'relative', paddingTop: 4 }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 6,
            right: 6,
            top: 9,
            height: 1,
            background: mutedLabel(ground),
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${points.length}, 1fr)`,
            position: 'relative',
          }}
        >
          {points.map((label, i) => (
            <div
              key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <div style={{ width: 10, height: 10, background: accent, position: 'relative', zIndex: 1 }} />
              <span style={{ ...monoMicro, color: mutedLabel(ground) }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      {captionPosition === 'below' && captionEl}
    </div>
  )
}

/* ──────────────────────────────────────────────
   QuarterlyTrajectory — squares + score values above
   ────────────────────────────────────────────── */

export function QuarterlyTrajectory({
  points,
  accent,
  ground,
}: {
  points: ReadonlyArray<{ label: string; value: number }>
  accent: string
  ground: Ground
}) {
  const ariaLabel = `Quarterly trajectory: ${points
    .map((p) => `${p.label} ${p.value}`)
    .join(', ')}.`
  return (
    <div role="img" aria-label={ariaLabel} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${points.length}, 1fr)`,
        }}
      >
        {points.map((p, i) => (
          <span
            key={i}
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              color: accent,
              fontWeight: 700,
              textAlign: 'center',
              letterSpacing: '0.04em',
            }}
          >
            {p.value}
          </span>
        ))}
      </div>
      <div style={{ position: 'relative', paddingTop: 4 }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 8,
            right: 8,
            top: 10,
            height: 1,
            background: accent,
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${points.length}, 1fr)`,
            position: 'relative',
          }}
        >
          {points.map((p, i) => (
            <div
              key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: accent,
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              <span style={{ ...monoMicro, color: mutedLabel(ground) }}>{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   DiminishingReturns — top row growing, bottom row flat
   ────────────────────────────────────────────── */

export function DiminishingReturns({
  topLabel,
  bottomLabel,
  ground,
}: {
  topLabel: string
  bottomLabel: string
  ground: Ground
}) {
  const accent = ground === 'ink' ? '#FFFFFF' : INK
  const labelColor = mutedLabel(ground)
  const topSizes = [6, 8, 10, 12, 14, 16]
  const ariaLabel = `Diminishing returns: ${topLabel} grows while ${bottomLabel} stays flat.`
  return (
    <div role="img" aria-label={ariaLabel} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 18 }}>
          {topSizes.map((s, i) => (
            <div key={i} style={{ width: s, height: s, background: accent }} />
          ))}
        </div>
        <span style={{ ...monoMicro, color: labelColor }}>{topLabel}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 18 }}>
          {topSizes.map((_, i) => (
            <div
              key={i}
              style={{ width: 10, height: 10, background: accent, opacity: 0.45 }}
            />
          ))}
        </div>
        <span style={{ ...monoMicro, color: labelColor }}>{bottomLabel}</span>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   NoiseSignal — scatter dots on top, clean line on bottom
   ────────────────────────────────────────────── */

export function NoiseSignal({
  topLabel,
  bottomLabel,
  ground,
}: {
  topLabel: string
  bottomLabel: string
  ground: Ground
}) {
  const accent = ground === 'ink' ? '#FFFFFF' : INK
  const labelColor = mutedLabel(ground)
  // Deterministic-looking scatter
  const dots: ReadonlyArray<{ left: number; top: number }> = [
    { left: 4, top: 6 },
    { left: 14, top: 13 },
    { left: 24, top: 2 },
    { left: 36, top: 10 },
    { left: 48, top: 5 },
    { left: 58, top: 14 },
    { left: 70, top: 4 },
    { left: 80, top: 11 },
    { left: 90, top: 7 },
    { left: 30, top: 15 },
    { left: 64, top: 1 },
  ]
  const ariaLabel = `Noise versus signal: ${topLabel} is scattered, ${bottomLabel} is a clean line.`
  return (
    <div role="img" aria-label={ariaLabel} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ position: 'relative', height: 18 }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              height: 1,
              background: labelColor,
            }}
          />
          {dots.map((d, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 3,
                height: 3,
                background: accent,
                left: `${d.left}%`,
                top: d.top,
              }}
            />
          ))}
        </div>
        <span style={{ ...monoMicro, color: labelColor }}>{topLabel}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 18, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', height: 2, background: accent }} />
        </div>
        <span style={{ ...monoMicro, color: labelColor }}>{bottomLabel}</span>
      </div>
    </div>
  )
}
