import type { CSSProperties, ReactNode } from 'react'
import { FONT, useTheme } from '../../pages/betterup/theme'
import {
  DIAGNOSTIC_COLORS,
  diagnosticRows,
  type DiagnosticKey,
  type DiagnosticScores,
} from '../../lib/buyerTrustScore'
import { CASCADE_LAYERS } from '../../pages/betterup/data/cascade'
import { SIGNALS } from '../../pages/betterup/data/signals'
import { Gauge } from '../../pages/betterup/components'

// Bento tiles for the §02 evidence board. Horizontal canvas, asymmetric
// widths, mixed visual types. Every tile carries its diagnostic color as
// a 3px top accent (no fills) and a mono `P# · NAME` eyebrow.

const INK = '#0A0A0A'

const REFERENCE_LINE = 50

const monoEyebrow: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 600,
}

const monoMicro: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: 9,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
}

/* ──────────────────────────────────────────────
   BentoTile — generic wrapper with top accent + eyebrow
   ────────────────────────────────────────────── */

export function BentoTile({
  accent,
  priority,
  diagnostic,
  eyebrow,
  colSpan,
  rowSpan = 1,
  children,
}: {
  accent: string
  /** Optional eyebrow override. When set, supersedes priority/diagnostic. */
  eyebrow?: string
  priority?: string
  diagnostic?: string
  colSpan: number
  rowSpan?: number
  children: ReactNode
}) {
  const { palette } = useTheme()
  const renderedEyebrow =
    eyebrow ?? (priority && diagnostic ? `${priority} · ${diagnostic}` : priority || diagnostic || '')
  return (
    <article
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        background: palette.card,
        border: `1px solid ${palette.rule}`,
        borderTop: `3px solid ${accent}`,
        padding: '22px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}
    >
      {renderedEyebrow && (
        <div
          style={{
            ...monoEyebrow,
            color: accent,
            marginBottom: 16,
          }}
        >
          {renderedEyebrow}
        </div>
      )}
      {children}
    </article>
  )
}

/* ──────────────────────────────────────────────
   ScoreColumnGraph4 — 4-bar column graph for §01
   ────────────────────────────────────────────── */

export function ScoreColumnGraph4({
  scores,
  height = 220,
}: {
  scores: DiagnosticScores
  height?: number
}) {
  const { palette } = useTheme()
  const rows = diagnosticRows(scores)
  const maxValue = 100
  const refY = ((maxValue - REFERENCE_LINE) / maxValue) * height

  return (
    <div
      role="img"
      aria-label={`Buyer Trust Score component breakdown. ${rows.map((r) => `${r.label} ${r.score}`).join(', ')}. Reference line at ${REFERENCE_LINE}.`}
      style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}
    >
      <div
        style={{
          position: 'relative',
          height,
          display: 'grid',
          gridTemplateColumns: `repeat(${rows.length}, 1fr)`,
          gap: 14,
          alignItems: 'end',
        }}
      >
        {/* Reference line at 50 */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: refY,
            borderTop: `1px dashed ${palette.textDim}`,
            opacity: 0.6,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: refY - 14,
            ...monoMicro,
            color: palette.textDim,
            background: palette.card,
            padding: '2px 4px',
          }}
        >
          50 · floor
        </div>

        {rows.map((row) => {
          const barHeight = (row.score / maxValue) * height
          const accent = DIAGNOSTIC_COLORS[row.key as DiagnosticKey]
          return (
            <div
              key={row.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                position: 'relative',
                height,
                justifyContent: 'flex-end',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  color: accent,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  marginBottom: 4,
                }}
              >
                {row.score}
              </span>
              <div
                style={{
                  width: '100%',
                  maxWidth: 64,
                  height: barHeight,
                  background: accent,
                  transition: 'height 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          )
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${rows.length}, 1fr)`,
          gap: 14,
        }}
      >
        {rows.map((row) => {
          const accent = DIAGNOSTIC_COLORS[row.key as DiagnosticKey]
          return (
            <div key={row.key} style={{ textAlign: 'center' }}>
              <span style={{ ...monoMicro, color: accent }}>{row.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ContentColumnGraph8 — 8-bar column for §02 Your content tile
   ────────────────────────────────────────────── */

export function ContentColumnGraph8({ accent }: { accent: string }) {
  const { palette } = useTheme()
  const height = 140
  const maxValue = 100
  const refY = ((maxValue - REFERENCE_LINE) / maxValue) * height

  return (
    <div
      role="img"
      aria-label={`Content alignment by category, eight categories, reference at ${REFERENCE_LINE} percent.`}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}
    >
      <div
        style={{
          position: 'relative',
          height,
          display: 'grid',
          gridTemplateColumns: `repeat(${SIGNALS.length}, 1fr)`,
          gap: 6,
          alignItems: 'end',
        }}
      >
        {/* Reference line at 50% */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: refY,
            borderTop: `1px dashed ${palette.textDim}`,
            opacity: 0.5,
          }}
        />

        {SIGNALS.map((s) => {
          const barHeight = (s.alignment / maxValue) * height
          const isAboveLine = s.alignment >= REFERENCE_LINE
          return (
            <div
              key={s.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                height,
                justifyContent: 'flex-end',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  color: isAboveLine ? accent : palette.textMuted,
                  fontWeight: 600,
                }}
              >
                {s.alignment}
              </span>
              <div
                style={{
                  width: '100%',
                  height: barHeight,
                  background: isAboveLine ? accent : `${accent}66`,
                  transition: 'height 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Category labels — abbreviate aggressively to fit horizontal real estate */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SIGNALS.length}, 1fr)`,
          gap: 6,
        }}
      >
        {SIGNALS.map((s) => (
          <div
            key={s.name}
            style={{
              ...monoMicro,
              fontSize: 8,
              color: palette.textMuted,
              textAlign: 'center',
              lineHeight: 1.2,
              minWidth: 0,
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
            title={s.name}
          >
            {abbreviateCategory(s.name)}
          </div>
        ))}
      </div>
    </div>
  )
}

function abbreviateCategory(name: string): string {
  const map: Record<string, string> = {
    'Leadership Visibility': 'Leaders',
    'Thought Leadership': 'POV',
    'Brand Narrative': 'Brand',
    'Competitive Signal': 'Compete',
    'Employee Signal': 'Employees',
    'AI Product Signal': 'Product',
    'Pricing Signal': 'Pricing',
    'Community Signal': 'Community',
  }
  return map[name] ?? name
}

/* ──────────────────────────────────────────────
   CascadeBreakStack — 6 stacked horizontal bars
   ────────────────────────────────────────────── */

export function CascadeBreakStack({ accent }: { accent: string }) {
  const { palette } = useTheme()
  return (
    <div
      role="img"
      aria-label={`Cascade trust chain across six layers. Layer 4 is the break.`}
      style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}
    >
      {CASCADE_LAYERS.map((layer) => {
        const isBreak = layer.status === 'Cascade Break'
        const barColor = isBreak ? '#E6195F' : accent
        return (
          <div
            key={layer.number}
            style={{
              display: 'grid',
              gridTemplateColumns: '24px 1fr 32px',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 10,
                color: isBreak ? '#E6195F' : palette.textDim,
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              {layer.number}
            </span>
            <div
              style={{
                position: 'relative',
                height: 6,
                background: 'rgba(10, 10, 10, 0.08)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${layer.score}%`,
                  background: barColor,
                  opacity: isBreak ? 1 : 0.85,
                  transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              {isBreak && (
                <span
                  style={{
                    position: 'absolute',
                    left: `calc(${layer.score}% + 6px)`,
                    top: -6,
                    fontFamily: FONT.mono,
                    fontSize: 9,
                    color: '#E6195F',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ◀ BREAK
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                color: isBreak ? '#E6195F' : INK,
                fontWeight: isBreak ? 700 : 500,
                textAlign: 'right',
                letterSpacing: '0.02em',
              }}
            >
              {layer.score}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ──────────────────────────────────────────────
   StarRating — half-star Glassdoor 3.2 / 5
   ────────────────────────────────────────────── */

export function StarRating({
  value,
  outOf = 5,
  color = INK,
  size = 16,
}: {
  value: number
  outOf?: number
  color?: string
  size?: number
}) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.25 && value - full < 0.75
  const totalFilled = hasHalf ? full + 0.5 : full
  return (
    <div
      role="img"
      aria-label={`${value} out of ${outOf} stars`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
    >
      {Array.from({ length: outOf }).map((_, i) => {
        const fillPct = Math.max(0, Math.min(1, totalFilled - i)) * 100
        return (
          <div
            key={i}
            style={{
              position: 'relative',
              width: size,
              height: size,
            }}
          >
            <Star color="rgba(10, 10, 10, 0.18)" size={size} />
            {fillPct > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${fillPct}%`,
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Star color={color} size={size} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Star({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <polygon points="12 2 14.84 8.74 22 9.27 16.5 14.14 18.18 21 12 17.27 5.82 21 7.5 14.14 2 9.27 9.16 8.74 12 2" />
    </svg>
  )
}

/* ──────────────────────────────────────────────
   SiteVsAgentContrast — 3-row side-by-side compare:
   what your marketing publishes vs what the agent tells the buyer
   ────────────────────────────────────────────── */

type ContrastRow = {
  yours: string
  theirs: string
}

const SITE_VS_AGENT_ROWS: ReadonlyArray<ContrastRow> = [
  { yours: 'Enterprise coaching platform', theirs: 'D2C app at $14/month' },
  { yours: '~1,200 employees', theirs: '~800 employees' },
  { yours: 'Microsoft, Salesforce, NASA', theirs: 'Logos that left in 2023' },
]

export function SiteVsAgentContrast({ accent }: { accent: string }) {
  const { palette } = useTheme()
  return (
    <div
      role="img"
      aria-label={`Three side-by-side rows comparing what your site publishes with what an agent tells the buyer.`}
      style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          paddingBottom: 10,
          borderBottom: `1px solid ${palette.rule}`,
          marginBottom: 6,
        }}
      >
        <div style={{ ...monoMicro, color: palette.textDim }}>What your site says</div>
        <div style={{ ...monoMicro, color: accent }}>What Perplexity told her</div>
      </div>
      {SITE_VS_AGENT_ROWS.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
            padding: '10px 0',
            borderBottom:
              i === SITE_VS_AGENT_ROWS.length - 1 ? 'none' : `1px solid ${palette.rule}`,
            alignItems: 'baseline',
          }}
        >
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 13,
              lineHeight: 1.4,
              color: palette.text,
              fontWeight: 500,
            }}
          >
            {row.yours}
          </span>
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 13,
              lineHeight: 1.4,
              color: accent,
              fontWeight: 600,
              textDecoration: 'line-through',
              textDecorationColor: `${accent}80`,
              textDecorationThickness: '1px',
            }}
          >
            {row.theirs}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────
   GaugeDial — wraps the existing semicircular Gauge
   ────────────────────────────────────────────── */

export function GaugeDial({
  score,
  benchmark,
  benchmarkLabel,
  size = 160,
}: {
  score: number
  benchmark?: number
  benchmarkLabel?: string
  size?: number
}) {
  return (
    <Gauge score={score} benchmark={benchmark} benchmarkLabel={benchmarkLabel} size={size} />
  )
}

