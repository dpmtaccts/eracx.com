import { FONT } from '../../pages/betterup/theme'
import { Reveal } from '../../pages/betterup/components'
import {
  DIAGNOSTIC_COLORS,
  computeBuyerTrustScore,
  diagnosticRows,
  percentDelta,
  type DiagnosticKey,
  type DiagnosticScores,
} from '../../lib/buyerTrustScore'
import { RevenueSignalGauge } from './RevenueSignalGauge'

const INK = '#0A0A0A'
const PARCHMENT = '#F4F1EA'
const HOT = '#E6195F'

type Props = {
  currentScores: DiagnosticScores
  projectedScores: DiagnosticScores
}

// Projection ground is parchment so it sits visually with the audit's other
// warm sections. Diagnostic accent colors are applied to component cards as
// the only color call-outs; body text stays in standard ink/muted treatments.
export function SignalConnectionProjection({ currentScores, projectedScores }: Props) {
  const currentTotal = computeBuyerTrustScore(currentScores)
  const projectedTotal = computeBuyerTrustScore(projectedScores)
  const totalDelta = percentDelta(currentTotal, projectedTotal)

  const currentRows = diagnosticRows(currentScores)
  const projectedRows = diagnosticRows(projectedScores)

  const muted = 'rgba(10, 10, 10, 0.6)'
  const dim = 'rgba(10, 10, 10, 0.35)'
  const ruleColor = 'rgba(10, 10, 10, 0.12)'

  return (
    <Reveal>
      <section
        style={{
          marginBottom: 48,
          background: PARCHMENT,
          color: INK,
          padding: '48px 40px',
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: muted,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          The business case
        </div>

        <h2
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(36px, 5.5vw, 76px)',
            fontWeight: 400,
            lineHeight: 0.98,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: INK,
            margin: '0 0 32px',
            maxWidth: 1100,
          }}
        >
          Three decisions move the score by ten points and recover most of the pipeline currently leaking before sales contact.
        </h2>

        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 40 }}>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.6,
              color: INK,
              margin: 0,
            }}
          >
            The Buyer Trust Score moves from {currentTotal} to {projectedTotal} when the three Maximum Impact decisions land. That score movement maps to recovering 12 to 18 percentage points of qualified pipeline that's currently leaking before sales contact. For BetterUp, that's a defensible business case: the marketing investment that has been hard to attribute now has a measurement that moves with executive activity, employee experience repair, and content-to-agent alignment.
          </p>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.6,
              color: INK,
              margin: 0,
            }}
          >
            The fourth decision, treating this as a measurement instead of a project, is what makes the score movement repeatable. Without it, the score moves once and drifts back. With it, the score becomes a governance artifact the board can budget against.
          </p>
        </div>

        {/* Hero composite + mini gauge */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 1fr) minmax(220px, 1fr)',
            gap: 28,
            alignItems: 'center',
            paddingBottom: 28,
            borderBottom: `1px solid ${ruleColor}`,
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: muted,
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              Buyer Trust Score
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 28,
                  color: dim,
                  textDecoration: 'line-through',
                  letterSpacing: '0.04em',
                }}
              >
                {currentTotal}
              </span>
              <span
                style={{
                  color: HOT,
                  fontFamily: FONT.display,
                  fontSize: 24,
                }}
              >
                →
              </span>
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 96,
                  color: INK,
                  lineHeight: 0.92,
                  letterSpacing: '-0.01em',
                }}
              >
                {projectedTotal}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 4,
                  padding: '6px 12px',
                  background: 'transparent',
                  border: `1px solid ${HOT}`,
                  color: HOT,
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  marginLeft: 4,
                }}
              >
                +{totalDelta}%
              </span>
            </div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 15,
                lineHeight: 1.55,
                color: muted,
                margin: '18px 0 0',
                maxWidth: 380,
              }}
            >
              The score movement maps to 12 to 18 percentage points of pipeline recovered before sales contact.
            </p>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: 320,
              justifySelf: 'end',
              alignSelf: 'center',
            }}
          >
            <RevenueSignalGauge
              score={projectedTotal}
              ghostScore={currentTotal}
              width={320}
              showScoreReadout={false}
              showTicks={false}
              highlightColor={HOT}
            />
          </div>
        </div>

        {/* Four component cards — each accented in its diagnostic's color */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {currentRows.map((row, i) => {
            const proj = projectedRows[i].score
            const delta = percentDelta(row.score, proj)
            const accent = DIAGNOSTIC_COLORS[row.key as DiagnosticKey] ?? INK
            return (
              <div
                key={row.key}
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${ruleColor}`,
                  borderTop: `4px solid ${accent}`,
                  padding: '22px 22px 20px',
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: accent,
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  {row.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 14,
                      color: dim,
                      textDecoration: 'line-through',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {row.score}
                  </span>
                  <span style={{ color: accent, fontFamily: FONT.display, fontSize: 14 }}>→</span>
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 32,
                      color: INK,
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {proj}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    color: accent,
                    marginTop: 8,
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                  }}
                >
                  +{delta}%
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

