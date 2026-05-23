import { FONT, useTheme } from '../../pages/betterup/theme'
import type { DiagnosticScores } from '../../lib/buyerTrustScore'

const HOT = '#E6195F'

type Props = {
  eyebrow: string
  headlineLine1: string
  headlineLine2: string
  accentInLine2?: string
  standfirst: string
  /** Retained for backwards-compatible call sites. The score visual now lives
   *  inside the §02 bento, so the hero no longer reads `scores` directly. */
  scores?: DiagnosticScores
  /** Retained for backwards compatibility; no longer rendered. */
  scoreContextLine?: string
  scoreAnchorId?: string
}

// §01 hero. Tight: publication nameplate + Anton headline + IBM Plex Sans
// standfirst. The score visual (dial + 4-bar column graph) now lives at the
// top of the §02 bento as the score anchor row, so it sits with the rest of
// the evidence rather than as a standalone band.
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
  void scores
  void scoreContextLine
  void scoreAnchorId

  const accentParts =
    accentInLine2 && headlineLine2.includes(accentInLine2)
      ? splitAround(headlineLine2, accentInLine2)
      : null

  return (
    <div style={{ marginBottom: 24 }}>
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

      {/* Headline + standfirst, single column. */}
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
  )
}

function splitAround(source: string, fragment: string): [string, string, string] {
  const idx = source.indexOf(fragment)
  if (idx === -1) return [source, '', '']
  return [source.slice(0, idx), fragment, source.slice(idx + fragment.length)]
}
