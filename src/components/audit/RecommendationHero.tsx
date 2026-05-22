import { FONT, useTheme } from '../../pages/betterup/theme'
import { RevenueSignalGauge } from '../revenueSignal/RevenueSignalGauge'
import {
  computeBuyerTrustScore,
  getScoreBand,
  type DiagnosticScores,
} from '../../lib/buyerTrustScore'
import { useScoreDrawer } from './ScoreDrawerContext'

const HOT = '#E6195F'

type Props = {
  eyebrow: string
  /** Two-line headline. Each line is rendered separately. */
  headlineLine1: string
  headlineLine2: string
  /** Substring of headlineLine2 to render in hot magenta as the v4 italic substitute. */
  accentInLine2?: string
  standfirst: string
  /** Scores power the compressed mini-gauge + band callout on the right. */
  scores: DiagnosticScores
  /** Optional copy override for the line under the score number. */
  scoreContextLine?: string
  /** Where the "→ How the score is built" link scrolls to. */
  scoreAnchorId?: string
}

// ▶︎01 hero. White ground. Two-line Anton mega headline with magenta accent
// in the second line. Right column carries a compressed score callout: mini
// gauge, band label, drag line, anchor to the diagnosis section.
export function RecommendationHero({
  eyebrow,
  headlineLine1,
  headlineLine2,
  accentInLine2,
  standfirst,
  scores,
  scoreContextLine,
  scoreAnchorId = 'why',
}: Props) {
  const { palette } = useTheme()
  const { setOpen: openDrawer } = useScoreDrawer()
  const score = computeBuyerTrustScore(scores)
  const band = getScoreBand(score)
  const contextLine =
    scoreContextLine ??
    `Typical of category leaders losing ${band.dragLow}-${band.dragHigh}% of qualified pipeline before sales contact.`

  const accentParts =
    accentInLine2 && headlineLine2.includes(accentInLine2)
      ? splitAround(headlineLine2, accentInLine2)
      : null

  const openBreakdown = () => openDrawer(true)
  void scoreAnchorId

  return (
    <div style={{ marginBottom: 64 }}>
      {/* Publication nameplate. The eyebrow text composes "The {Company} Buyer
          View" upstream, so the company name is derived from the audit
          instance rather than hardcoded here. Set large enough to read as a
          masthead, capped on a heavy ink rule like a front-page nameplate. */}
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
        <div
          aria-hidden
          style={{
            height: 3,
            background: palette.text,
            marginTop: 14,
          }}
        />
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
          gridTemplateColumns: 'minmax(0, 1.7fr) minmax(260px, 1fr)',
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

        {/* Right: compressed score callout — entire card is a click target
            that opens the score breakdown drawer. */}
        <aside
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-label="Open score breakdown"
          onClick={openBreakdown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openBreakdown()
            }
          }}
          style={{
            border: `1px solid ${palette.rule}`,
            padding: '24px 24px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            background: palette.card,
            cursor: 'pointer',
            transition: 'border-color 120ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = HOT
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = palette.rule
          }}
        >
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <RevenueSignalGauge
              score={score}
              width={184}
              showScoreReadout={false}
              showTicks={false}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 72,
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
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: HOT,
                  fontWeight: 600,
                }}
              >
                / 100 · {band.label}
              </div>
            </div>
          </div>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 14,
              lineHeight: 1.55,
              color: palette.textMuted,
              margin: 0,
            }}
          >
            {contextLine}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              openBreakdown()
            }}
            style={{
              all: 'unset',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              fontFamily: FONT.mono,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: palette.text,
              border: `2px solid ${palette.text}`,
              padding: '10px 16px',
              transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = HOT
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.borderColor = HOT
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = palette.text
              e.currentTarget.style.borderColor = palette.text
            }}
          >
            → Open score breakdown
          </button>
        </aside>
      </div>
    </div>
  )
}

function splitAround(source: string, fragment: string): [string, string, string] {
  const idx = source.indexOf(fragment)
  if (idx === -1) return [source, '', '']
  return [source.slice(0, idx), fragment, source.slice(idx + fragment.length)]
}
