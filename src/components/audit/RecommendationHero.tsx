import { FONT, useTheme } from '../../pages/betterup/theme'
import {
  DIAGNOSTIC_COLORS,
  DIAGNOSTIC_LABELS,
  computeBuyerTrustScore,
  diagnosticRows,
  getScoreBand,
  type DiagnosticKey,
  type DiagnosticScores,
} from '../../lib/buyerTrustScore'

const HOT = '#E6195F'

type Props = {
  eyebrow: string
  /** Two-line headline. Each line is rendered separately. */
  headlineLine1: string
  headlineLine2: string
  /** Substring of headlineLine2 to render in hot magenta as the v4 italic substitute. */
  accentInLine2?: string
  standfirst: string
  /** Scores power the integrated bento on the right column. */
  scores: DiagnosticScores
  /** Optional copy override for the line under the score readout. */
  scoreContextLine?: string
  /** Retained for backwards-compatible call sites. The bento is static, so
   *  there is no anchor target, but removing the prop would force every
   *  caller to update simultaneously. */
  scoreAnchorId?: string
}

// §01 hero. Publication masthead at the top, then a two-column layout: Anton
// mega headline + standfirst on the left, integrated bento on the right
// showing the overall Buyer Trust Score above a 2x2 grid of the four
// component scores. The bento is purely visual evidence; the previous
// "open score breakdown" drawer interaction is gone. Methodology and band
// legend live in §05 alongside the rest of the proof.
export function RecommendationHero({
  eyebrow,
  headlineLine1,
  headlineLine2,
  accentInLine2,
  standfirst,
  scores,
  scoreContextLine,
  scoreAnchorId,
}: Props) {
  const { palette } = useTheme()
  const score = computeBuyerTrustScore(scores)
  const band = getScoreBand(score)
  const contextLine =
    scoreContextLine ??
    `Typical of category leaders losing ${band.dragLow}-${band.dragHigh}% of qualified pipeline before sales contact.`

  const accentParts =
    accentInLine2 && headlineLine2.includes(accentInLine2)
      ? splitAround(headlineLine2, accentInLine2)
      : null

  void scoreAnchorId

  return (
    <div style={{ marginBottom: 64 }}>
      {/* Publication nameplate. The eyebrow composes "The Buyer View"
          upstream. Capped on a heavy ink rule like a front-page nameplate. */}
      <header style={{ marginBottom: 40 }}>
        <div
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.005em',
            textTransform: 'uppercase',
            color: palette.text,
          }}
        >
          {eyebrow}
        </div>
        <div aria-hidden style={{ height: 3, background: palette.text, marginTop: 14 }} />
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: palette.textMuted,
            fontWeight: 600,
            marginTop: 12,
          }}
        >
          A Revenue Signal Instrument by ERA
        </div>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(280px, 1fr)',
          gap: 48,
          alignItems: 'start',
        }}
      >
        {/* Left: two-line Anton headline + standfirst */}
        <div>
          <h1
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(56px, 11vw, 168px)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: palette.text,
              margin: '0 0 32px',
            }}
          >
            <span style={{ display: 'block' }}>{headlineLine1}</span>
            <span style={{ display: 'block' }}>
              {accentParts ? (
                <>
                  {accentParts[0]}
                  <span style={{ color: HOT }}>{accentParts[1]}</span>
                  {accentParts[2]}
                </>
              ) : (
                headlineLine2
              )}
            </span>
          </h1>

          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 22,
              lineHeight: 1.55,
              color: palette.text,
              margin: 0,
              maxWidth: 640,
            }}
          >
            {standfirst}
          </p>
        </div>

        {/* Right: integrated bento — large overall score above 2x2 grid */}
        <BentoScore score={score} bandLabel={band.label} scores={scores} contextLine={contextLine} />
      </div>
    </div>
  )
}

function BentoScore({
  score,
  bandLabel,
  scores,
  contextLine,
}: {
  score: number
  bandLabel: string
  scores: DiagnosticScores
  contextLine: string
}) {
  const { palette } = useTheme()
  const rows = diagnosticRows(scores)
  return (
    <aside
      aria-label="Buyer Trust Score breakdown"
      style={{
        border: `1px solid ${palette.rule}`,
        background: palette.card,
        padding: '24px 24px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* Overall score header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: palette.textDim,
            fontWeight: 600,
          }}
        >
          Buyer Trust Score
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 4,
          }}
        >
          <span
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(72px, 9vw, 104px)',
              lineHeight: 0.9,
              color: palette.text,
              letterSpacing: '-0.02em',
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: HOT,
              fontWeight: 600,
            }}
          >
            / 100
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 17,
            color: palette.text,
            fontWeight: 500,
            marginTop: 2,
          }}
        >
          {bandLabel}
        </div>
      </div>

      {/* Hairline divider between overall and components */}
      <div aria-hidden style={{ height: 1, background: palette.rule, margin: '4px 0' }} />

      {/* 2x2 grid of component scores */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 1,
          background: palette.rule,
          border: `1px solid ${palette.rule}`,
        }}
      >
        {rows.map((row) => (
          <ComponentCell
            key={row.key}
            name={DIAGNOSTIC_LABELS[row.key as DiagnosticKey].short}
            score={row.score}
            weight={row.weight}
            accent={DIAGNOSTIC_COLORS[row.key as DiagnosticKey]}
          />
        ))}
      </div>

      {/* Quiet context line beneath the bento */}
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: 13,
          lineHeight: 1.5,
          color: palette.textMuted,
          margin: 0,
        }}
      >
        {contextLine}
      </p>
    </aside>
  )
}

function ComponentCell({
  name,
  score,
  weight,
  accent,
}: {
  name: string
  score: number
  weight: number
  accent: string
}) {
  const { palette } = useTheme()
  const weightPct = Math.round(weight * 100)
  return (
    <div
      style={{
        background: palette.card,
        borderTop: `3px solid ${accent}`,
        padding: '14px 14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: accent,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: FONT.mega,
          fontSize: 'clamp(40px, 5vw, 52px)',
          lineHeight: 0.9,
          color: palette.text,
          letterSpacing: '-0.01em',
        }}
      >
        {score}
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 9,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: palette.textDim,
          fontWeight: 600,
        }}
      >
        {weightPct}% weight
      </div>
    </div>
  )
}

function splitAround(source: string, fragment: string): [string, string, string] {
  const idx = source.indexOf(fragment)
  if (idx === -1) return [source, '', '']
  return [source.slice(0, idx), fragment, source.slice(idx + fragment.length)]
}
