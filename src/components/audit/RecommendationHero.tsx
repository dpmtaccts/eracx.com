import { FONT, useTheme } from '../../pages/betterup/theme'
import {
  computeBuyerTrustScore,
  getScoreBand,
  type DiagnosticScores,
} from '../../lib/buyerTrustScore'
import { RevenueSignalGauge } from '../revenueSignal/RevenueSignalGauge'
import { ScoreColumnGraph4 } from './BentoTiles'

const HOT = '#E6195F'

type Props = {
  eyebrow: string
  headlineLine1: string
  headlineLine2: string
  accentInLine2?: string
  standfirst: string
  scores: DiagnosticScores
  scoreContextLine?: string
  scoreAnchorId?: string
}

// §01 hero. Publication masthead at the top, then a single-column composition:
// Anton headline (tightened one clamp step) → standfirst → full-width
// horizontal score band carrying the Buyer Trust Score dial paired with the
// 4-bar column graph of the diagnostic readings.
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
      {/* Publication nameplate */}
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

      {/* Headline + standfirst, single column. Headline tightened one clamp
          step so the score band lands inside the first viewport. */}
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(48px, 9vw, 128px)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: palette.text,
            margin: '0 0 28px',
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
            fontSize: 20,
            lineHeight: 1.55,
            color: palette.text,
            margin: 0,
            maxWidth: 720,
          }}
        >
          {standfirst}
        </p>
      </div>

      {/* Score band — horizontal, full-width. Dial on the left, 4-bar
          column graph on the right. */}
      <ScoreBand score={score} bandLabel={band.label} scores={scores} contextLine={contextLine} />
    </div>
  )
}

function ScoreBand({
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
  return (
    <aside
      aria-label="Buyer Trust Score and component breakdown"
      style={{
        border: `1px solid ${palette.rule}`,
        background: palette.card,
        padding: '32px 36px',
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(360px, 1.4fr)',
        gap: 40,
        alignItems: 'center',
      }}
    >
      {/* Left: dial + readout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: palette.textDim,
            fontWeight: 600,
          }}
        >
          Buyer Trust Score
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
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
            / 100 · {bandLabel}
          </span>
        </div>
        <div style={{ marginTop: 4, maxWidth: 360 }}>
          <RevenueSignalGauge score={score} width={360} showScoreReadout={false} showTicks={false} />
        </div>
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 13,
            lineHeight: 1.55,
            color: palette.textMuted,
            margin: 0,
            maxWidth: 380,
          }}
        >
          {contextLine}
        </p>
      </div>

      {/* Right: 4-bar component column graph */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: palette.textDim,
            fontWeight: 600,
          }}
        >
          What she encountered, scored
        </div>
        <ScoreColumnGraph4 scores={scores} height={200} />
      </div>
    </aside>
  )
}

function splitAround(source: string, fragment: string): [string, string, string] {
  const idx = source.indexOf(fragment)
  if (idx === -1) return [source, '', '']
  return [source.slice(0, idx), fragment, source.slice(idx + fragment.length)]
}
