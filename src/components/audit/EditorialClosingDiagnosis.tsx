import { FONT } from '../../pages/betterup/theme'

type Props = {
  /** Mono uppercase kicker above the headline. */
  kicker: string
  /** The headline pulled out of the paragraph for the Anton treatment. */
  headline: string
  /** Anton-mega accent fragment inside the headline. Rendered in hot magenta. */
  headlineAccent?: string
  /** Three follow-on body sentences after the headline. */
  bodyLines: readonly string[]
  /** Ratio shown as a 21-dot grid: heard / total. */
  ratio?: { heard: number; total: number; label?: string }
}

const INK = '#0A0A0A'
const HOT = '#E6195F'
const YELLOW = '#F4C430'
const CREAM_WHITE = '#FFFFFF'

// Editorial pull-quote with a side-by-side ratio visual. Ink ground, Anton
// mega headline with a magenta accent fragment, IBM Plex body in a narrower
// column. The right column carries a 21-dot grid showing how many voices the
// buyer actually lands on. Designed to break the wall-of-bold-text pattern.
export function EditorialClosingDiagnosis({
  kicker,
  headline,
  headlineAccent,
  bodyLines,
  ratio,
}: Props) {
  // If the accent is a substring of the headline, split around it so we can
  // render the accent in magenta inline. Falls back to plain headline.
  const accentParts = headlineAccent && headline.includes(headlineAccent)
    ? splitAround(headline, headlineAccent)
    : null

  return (
    <section
      style={{
        background: INK,
        color: CREAM_WHITE,
        margin: '64px calc(-1 * (50vw - 50%)) 64px',
        padding: '88px max(32px, calc(50vw - 560px))',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.55fr) minmax(220px, 1fr)',
          gap: 56,
          alignItems: 'start',
        }}
      >
        {/* Left column: kicker + Anton headline + body */}
        <div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: YELLOW,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {kicker}
          </div>

          <h2
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: CREAM_WHITE,
              margin: '0 0 32px',
            }}
          >
            {accentParts ? (
              <>
                {accentParts[0]}
                <span style={{ color: HOT }}>{accentParts[1]}</span>
                {accentParts[2]}
              </>
            ) : (
              headline
            )}
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              maxWidth: 640,
            }}
          >
            {bodyLines.map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: FONT.body,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Right column: ratio visual */}
        {ratio && <RatioGrid heard={ratio.heard} total={ratio.total} label={ratio.label} />}
      </div>
    </section>
  )
}

/** 21-dot grid (or whatever `total` is) with `heard` rendered in magenta. */
function RatioGrid({
  heard,
  total,
  label,
}: {
  heard: number
  total: number
  label?: string
}) {
  const dots = Array.from({ length: total }, (_, i) => i < heard)
  // Layout the dots roughly square: 7-wide grid for 21 dots.
  const cols = Math.min(7, total)

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: `1px solid rgba(255, 255, 255, 0.12)`,
        padding: '24px 22px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.5)',
          fontWeight: 600,
        }}
      >
        Voices the buyer lands on
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <div
          style={{
            fontFamily: FONT.mega,
            fontSize: 96,
            lineHeight: 0.9,
            color: HOT,
            letterSpacing: '-0.01em',
          }}
        >
          {heard}
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.04em',
          }}
        >
          of {total}
        </div>
      </div>

      <div
        aria-hidden
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 8,
          maxWidth: 220,
        }}
      >
        {dots.map((isHeard, i) => (
          <div
            key={i}
            style={{
              width: 18,
              height: 18,
              background: isHeard ? HOT : 'transparent',
              border: isHeard ? 'none' : '1px solid rgba(255, 255, 255, 0.25)',
            }}
          />
        ))}
      </div>

      {label && (
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 13,
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

function splitAround(source: string, fragment: string): [string, string, string] {
  const idx = source.indexOf(fragment)
  if (idx === -1) return [source, '', '']
  return [source.slice(0, idx), fragment, source.slice(idx + fragment.length)]
}
