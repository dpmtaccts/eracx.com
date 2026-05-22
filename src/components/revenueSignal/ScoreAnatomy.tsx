import { useState } from 'react'
import { FONT, useTheme } from '../../pages/betterup/theme'
import { Reveal } from '../../pages/betterup/components'
import { diagnosticRows, type DiagnosticScores } from '../../lib/buyerTrustScore'
import { Disclosure } from '../audit/Disclosure'

const EXPLAINER =
  'The Buyer Trust Score is a weighted composite of four diagnostic readings. Leaders carries the heaviest weight because the buyer encounters your leadership voices first when she opens LinkedIn. Employees and Your content are weighted equally as the upstream signals that produce what the buyer reads about you. Agents sits lightest because the AI answer is largely the synthesis of the other three. The weights are calibrated against ERA’s pattern recognition across comparable B2B engagements and updated as the dataset grows.'

type Props = {
  scores: DiagnosticScores
}

// v4 treatment: hairline rules, no card. Each diagnostic row is collapsible
// (progressive disclosure: closed by default, click to reveal methodology).
export function ScoreAnatomy({ scores }: Props) {
  const { palette } = useTheme()
  const rows = diagnosticRows(scores)
  const [methodologyOpen, setMethodologyOpen] = useState(false)

  return (
    <Reveal>
      <section
        id="score"
        style={{
          padding: '32px 0',
          marginBottom: 48,
          scrollMarginTop: 88,
          borderTop: `1px solid ${palette.rule}`,
          borderBottom: `1px solid ${palette.rule}`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: palette.textDim,
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          § Score Anatomy
        </div>
        <h2
          style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(28px, 4vw, 36px)',
            lineHeight: 1.1,
            color: palette.text,
            margin: '0 0 32px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          How the score is built.
        </h2>

        <div>
          {rows.map((row) => {
            const weightPct = Math.round(row.weight * 100)
            return (
              <div
                key={row.key}
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'minmax(160px, 1.2fr) minmax(140px, 2fr) minmax(72px, auto) minmax(120px, auto) minmax(88px, auto)',
                  alignItems: 'center',
                  gap: 18,
                  padding: '16px 0',
                  borderBottom: `1px solid ${palette.rule}`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 18,
                    color: palette.text,
                    lineHeight: 1.1,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    height: 8,
                    background: 'transparent',
                    border: `1px solid ${palette.rule}`,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: `${row.score}%`,
                      height: '100%',
                      background: row.bandColor,
                      transition: 'width 1.2s ease',
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 13,
                    color: palette.text,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.04em',
                  }}
                >
                  {row.score} / 100
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 12,
                    color: palette.textMuted,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.04em',
                  }}
                >
                  × {row.weight.toFixed(2)} = {row.contribution.toFixed(2)}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: 'transparent',
                    border: `1px solid ${palette.rule}`,
                    color: palette.text,
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {weightPct}% weight
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 24 }}>
          <Disclosure
            label="How we score"
            open={methodologyOpen}
            onToggle={() => setMethodologyOpen((v) => !v)}
          >
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 14,
                lineHeight: 1.65,
                color: palette.textMuted,
                margin: 0,
                maxWidth: 760,
              }}
            >
              {EXPLAINER}
            </p>
          </Disclosure>
        </div>
      </section>
    </Reveal>
  )
}
