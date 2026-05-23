import type { ReactNode } from 'react'
import { FONT, useTheme } from '../../pages/betterup/theme'

const HOT = '#E6195F'
const YELLOW = '#F4C430'
const INK = '#0A0A0A'
const PARCHMENT = '#F4F1EA'
const CREAM_WHITE = '#FFFFFF'

export type ImpactCard = {
  /** Two-digit ordinal like "01". */
  ordinal: string
  /** Optional label shown next to the ordinal (e.g. the diagnostic each move
   *  repairs). When omitted, the eyebrow renders the ordinal alone. */
  ordinalLabel?: string
  headline: string
  body: string
  /** Optional rich JSX content that replaces the plain body paragraph. Use
   *  this for cards that interleave prose with inline visuals. The card
   *  layout still controls outer spacing; the rich content controls its own
   *  inner spacing between paragraphs and visuals. */
  richContent?: ReactNode
  /** Magenta leverage indicator on Maximum cards; muted "Why not now" on Minimum cards. */
  indicator: string
  /** Optional label that precedes the indicator. Defaults differ by ground. */
  indicatorLabel?: string
  /** Diagnostic accent color. When set, the eyebrow, ordinal, indicator, and
   *  evidence link all render in this color, tying the card visually to its
   *  matching ▶︎05 evidence sub-section. */
  accentColor?: string
  /** Anchor id of the ▶︎05 sub-section that produced this recommendation. When
   *  set, a "→ SEE THE EVIDENCE" link appears beneath the indicator. */
  evidenceAnchor?: string
}

type Props = {
  /** Retained for prop-shape compatibility with existing call sites.
   *  No longer rendered — the section identifier lives in the section's
   *  IssueBar, and the layout now places the headline as a band beneath the
   *  cards rather than above them. */
  eyebrow?: string
  /** Anton mega headline that renders as a full-width band beneath the cards. */
  headline: string
  cards: readonly ImpactCard[]
  /** Ink = loud (Maximum). Parchment = quiet (Minimum). */
  ground: 'ink' | 'parchment'
}

export function ImpactCardGrid({ eyebrow, headline, cards, ground }: Props) {
  const { palette } = useTheme()
  const isInk = ground === 'ink'
  const bg = isInk ? INK : PARCHMENT
  const textColor = isInk ? CREAM_WHITE : palette.text
  const mutedColor = isInk ? 'rgba(255, 255, 255, 0.6)' : 'rgba(10, 10, 10, 0.6)'
  const bodyColor = isInk ? 'rgba(255, 255, 255, 0.82)' : palette.text
  const ruleColor = isInk ? 'rgba(255, 255, 255, 0.12)' : palette.rule
  const eyebrowColor = isInk ? YELLOW : mutedColor
  const indicatorColor = isInk ? HOT : mutedColor
  void eyebrow

  return (
    <section
      style={{
        background: bg,
        color: textColor,
        margin: '0 calc(-1 * (50vw - 50%)) 0',
        padding: '96px max(32px, calc(50vw - 600px))',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: isInk ? 1 : 16,
          background: isInk ? ruleColor : 'transparent',
        }}
      >
        {/* Headline tile — bottom-left, spans 2 cols × 2 rows. Rendered
            first in DOM for semantic order; CSS Grid places it via explicit
            gridColumn/gridRow. Type fills the tile; tile sized by the row
            heights of cards 03 and 04 to its right. */}
        <div
          style={{
            gridColumn: '1 / span 2',
            gridRow: '2 / span 2',
            background: bg,
            padding: '40px 36px',
            display: 'flex',
            alignItems: 'center',
            border: isInk ? 'none' : `1px solid ${ruleColor}`,
          }}
        >
          <h2
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: textColor,
              margin: 0,
            }}
          >
            {headline}
          </h2>
        </div>

        {cards.map((card, i) => {
          // Cards wrap an L around the headline tile:
          //   0 = top-left   (cols 1-2, row 1)
          //   1 = top-right  (cols 3-4, row 1)
          //   2 = mid-right  (cols 3-4, row 2)
          //   3 = bot-right  (cols 3-4, row 3)
          const positions: ReadonlyArray<{ gridColumn: string; gridRow: string }> = [
            { gridColumn: '1 / span 2', gridRow: '1' },
            { gridColumn: '3 / span 2', gridRow: '1' },
            { gridColumn: '3 / span 2', gridRow: '2' },
            { gridColumn: '3 / span 2', gridRow: '3' },
          ]
          const pos = positions[i] ?? { gridColumn: 'auto', gridRow: 'auto' }
          const cardAccent = card.accentColor
          const cardEyebrowColor = cardAccent ?? eyebrowColor
          const cardIndicatorColor = cardAccent ?? indicatorColor
          return (
            <article
              key={card.ordinal}
              style={{
                ...pos,
                background: bg,
                padding: '28px 28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                border: isInk ? 'none' : `1px solid ${ruleColor}`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: cardEyebrowColor,
                  fontWeight: 600,
                }}
              >
                <span style={{ color: cardEyebrowColor }}>{card.ordinal}</span>
                {card.ordinalLabel ? ` · ${card.ordinalLabel}` : null}
              </div>
              <h3
                style={{
                  fontFamily: FONT.display,
                  fontSize: 24,
                  fontWeight: 400,
                  lineHeight: 1.18,
                  letterSpacing: '-0.01em',
                  color: textColor,
                  margin: 0,
                }}
              >
                {card.headline}
              </h3>
              {card.richContent ? (
                <div>{card.richContent}</div>
              ) : (
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: bodyColor,
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              )}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 14,
                  borderTop: `1px solid ${ruleColor}`,
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: cardIndicatorColor,
                  fontWeight: 600,
                }}
              >
                {card.indicatorLabel ? `${card.indicatorLabel} · ` : ''}
                {card.indicator}
              </div>
              {card.evidenceAnchor && (
                <a
                  href={`#${card.evidenceAnchor}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(card.evidenceAnchor!)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    marginTop: 4,
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: cardEyebrowColor,
                    fontWeight: 600,
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                    cursor: 'pointer',
                  }}
                >
                  → See the evidence
                </a>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
