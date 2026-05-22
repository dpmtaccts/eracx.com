import { FONT, useTheme } from '../../pages/betterup/theme'
import { Reveal } from '../../pages/betterup/components'
import {
  SCORE_BANDS,
  BAND_COLORS,
  computeBuyerTrustScore,
  getScoreBand,
  getBandVerdictColor,
  type DiagnosticScores,
  type ScoreBand,
} from '../../lib/buyerTrustScore'
import { RevenueSignalGauge } from './RevenueSignalGauge'

type Props = {
  scores: DiagnosticScores
  anchorTargetId?: string
  verdictOverride?: string
}

// v4 treatment: white ground, no rounded corners, no shadows. Hero headline
// uses Anton mega. Band verdict uses Archivo Black. Body uses IBM Plex.
// Cost callout uses ink ground with yellow eyebrow per v4 ground pattern.
export function RevenueSignalScoreHero({
  scores,
  anchorTargetId = 'score',
  verdictOverride,
}: Props) {
  const { palette } = useTheme()
  const score = computeBuyerTrustScore(scores)
  const band = getScoreBand(score)
  const verdictColor = getBandVerdictColor(score)

  const subLine =
    verdictOverride ??
    `The product is real. The signal chain between the product and the buyer is not. That gap costs you ${band.dragLow} to ${band.dragHigh} percent of qualified pipeline before sales ever picks up the phone.`

  const onAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(anchorTargetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Reveal>
      <div id="revenue-signal-score" style={{ marginBottom: 56 }}>
        {/* A. Eyebrow */}
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: palette.textDim,
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          Buyer Trust Score
        </div>

        {/* B. Verdict headline — Anton mega */}
        <h2
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(56px, 11vw, 168px)',
            fontWeight: 400,
            lineHeight: 0.92,
            color: palette.text,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            margin: '0 0 24px',
          }}
        >
          {band.shortVerdict}
        </h2>

        {/* C. Verdict sub-line — IBM Plex 20px standfirst */}
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 20,
            lineHeight: 1.55,
            color: palette.text,
            maxWidth: 640,
            margin: '0 0 40px',
          }}
        >
          {subLine}
        </p>

        {/* D. Gauge card — flat white, hairline rule, no radius */}
        <div
          style={{
            background: palette.card,
            border: `1px solid ${palette.rule}`,
            padding: '32px 32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div style={{ width: '100%', maxWidth: 460, position: 'relative' }}>
            <RevenueSignalGauge score={score} width={460} />
          </div>

          {/* E. Band verdict below gauge — Archivo Black mid-display */}
          <div
            style={{
              width: '100%',
              borderTop: `1px solid ${palette.rule}`,
              paddingTop: 22,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 28,
                fontWeight: 400,
                color: verdictColor,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 10,
              }}
            >
              {band.label}.
            </div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 14,
                lineHeight: 1.5,
                color: palette.textMuted,
                maxWidth: 420,
                margin: 0,
              }}
            >
              {band.fullVerdict}
            </p>
          </div>

          {/* F. Band legend strip — square cards, hairline rules */}
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(${SCORE_BANDS.length}, minmax(0, 1fr))`,
              gap: 8,
            }}
          >
            {SCORE_BANDS.map((b) => {
              const isActive = b.id === band.id
              const color = BAND_COLORS[b.id]
              return (
                <div
                  key={b.id}
                  style={{
                    border: `1px solid ${isActive ? color : palette.rule}`,
                    background: isActive ? color + '14' : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ height: 4, background: color }} />
                  <div style={{ padding: '8px 8px 10px', textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 11,
                        fontWeight: 600,
                        color: isActive ? color : palette.text,
                        lineHeight: 1.2,
                        marginBottom: 2,
                      }}
                    >
                      {b.label}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 10,
                        color: palette.textDim,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {b.range[0]}&ndash;{b.range[1]}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* G. Cost callout — ink ground, yellow eyebrow, Archivo Black */}
        <div
          style={{
            marginTop: 16,
            background: palette.ink,
            color: '#FFFFFF',
            padding: '24px 28px',
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: palette.yellow,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            What it's costing you
          </div>
          <div
            style={{
              fontFamily: FONT.display,
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
            }}
          >
            {band.costLine}
          </div>
        </div>

        {/* Anchor link */}
        <div style={{ marginTop: 24 }}>
          <a
            href={`#${anchorTargetId}`}
            onClick={onAnchor}
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: palette.text,
              textDecoration: 'none',
              borderBottom: `2px solid ${palette.text}`,
              paddingBottom: 4,
              fontWeight: 600,
            }}
          >
            → How the score is built
          </a>
        </div>
      </div>
    </Reveal>
  )
}

export type { ScoreBand }
