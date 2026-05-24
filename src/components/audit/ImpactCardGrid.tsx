import type { ReactNode } from 'react'
import { FONT, useTheme } from '../../pages/betterup/theme'

const INK = '#0A0A0A'
const PARCHMENT = '#F4F1EA'
const CREAM_WHITE = '#FFFFFF'

export type ImpactCard = {
  /** Two-digit ordinal like "01". */
  ordinal: string
  /** Optional label shown next to the ordinal (e.g. the diagnostic each
   *  decision repairs). When omitted, the eyebrow renders the ordinal alone. */
  ordinalLabel?: string
  headline: string
  body: string
  /** Optional rich JSX content that replaces the plain body paragraph. */
  richContent?: ReactNode
  /** Mono indicator strip along the foot of the card. */
  indicator: string
  /** Optional label that precedes the indicator. */
  indicatorLabel?: string
  /** Diagnostic accent color. When set, the eyebrow and evidence link
   *  render in this color, tying the card to its matching §05 sub-section. */
  accentColor?: string
  /** Anchor id of the §05 sub-section that produced this recommendation. */
  evidenceAnchor?: string
}

type Props = {
  /** No longer rendered. Section identifier lives in the IssueBar above. */
  eyebrow?: string
  /** No longer rendered. Section name lives in the IssueBar above. */
  headline?: string
  /** No longer rendered. */
  standfirst?: string
  cards: readonly ImpactCard[]
  /** Ink ground = ▶︎03 decisions (active, full contrast).
   *  Parchment ground = ▶︎04 motions (muted, set-aside). */
  ground: 'ink' | 'parchment'
}

// Cards-as-hero layout. The section title lives in the IssueBar above this
// component, so nothing renders above the grid here. Four equal cards in a
// row, each card driven by its h3 headline. Body / indicator / evidence
// link are recessive — they catch the second pass, not the first.
//
// Ink ground (▶︎03) is high-contrast and active: white headline, white-65
// body, accent-color eyebrow, hot-magenta indicator.
//
// Parchment ground (▶︎04) is muted and set-aside: ink-70 headline,
// ink-45 body, ink-40 eyebrow, lighter borders. The do/don't binary
// reads from peripheral vision before the reader engages.
export function ImpactCardGrid({ eyebrow, headline, standfirst, cards, ground }: Props) {
  const { palette } = useTheme()
  const isInk = ground === 'ink'
  const bg = isInk ? INK : PARCHMENT

  // Hero (headline) colors — the loudest thing in each card.
  const heroColor = isInk ? CREAM_WHITE : 'rgba(10, 10, 10, 0.78)'

  // Recessive (body, indicator, evidence) colors.
  const bodyColor = isInk ? 'rgba(255, 255, 255, 0.62)' : 'rgba(10, 10, 10, 0.5)'
  const recessiveColor = isInk ? 'rgba(255, 255, 255, 0.45)' : 'rgba(10, 10, 10, 0.4)'

  // Rule colors between cards.
  const ruleColor = isInk ? 'rgba(255, 255, 255, 0.12)' : 'rgba(10, 10, 10, 0.08)'

  // Eyebrow falls back to the recessive tone when a card has no accent.
  const eyebrowFallback = recessiveColor

  void eyebrow
  void headline
  void standfirst
  void palette

  return (
    <section
      style={{
        background: bg,
        color: heroColor,
        margin: '0 calc(-1 * (50vw - 50%)) 0',
        padding: '72px max(32px, calc(50vw - 600px))',
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
        {cards.map((card) => {
          const cardAccent = card.accentColor
          const cardEyebrowColor = cardAccent ?? eyebrowFallback
          // On ink ground the evidence link reads in the accent; on parchment
          // it stays recessive so it doesn't compete with the headline.
          const evidenceLinkColor = isInk ? cardEyebrowColor : recessiveColor

          return (
            <article
              key={card.ordinal}
              style={{
                background: bg,
                padding: '32px 28px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                border: isInk ? 'none' : `1px solid ${ruleColor}`,
              }}
            >
              {/* Eyebrow — small, accent or recessive. */}
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
                <span>{card.ordinal}</span>
                {card.ordinalLabel ? ` · ${card.ordinalLabel}` : null}
              </div>

              {/* Headline — the hero. Reads on its own if she skips
                  everything else. */}
              <h3
                style={{
                  fontFamily: FONT.display,
                  fontSize: 'clamp(22px, 1.9vw, 30px)',
                  fontWeight: 400,
                  lineHeight: 1.12,
                  letterSpacing: '-0.01em',
                  color: heroColor,
                  margin: 0,
                }}
              >
                {card.headline}
              </h3>

              {/* Body / richContent — recessive. */}
              {card.richContent ? (
                <div style={{ opacity: isInk ? 0.92 : 0.78 }}>{card.richContent}</div>
              ) : (
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: bodyColor,
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              )}

              {/* Indicator strip — small, recessive. */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 14,
                  borderTop: `1px solid ${ruleColor}`,
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: recessiveColor,
                  fontWeight: 600,
                }}
              >
                {card.indicatorLabel ? `${card.indicatorLabel} · ` : ''}
                {card.indicator}
              </div>

              {/* Evidence link — small, recessive on parchment, accent on ink. */}
              {card.evidenceAnchor && (
                <a
                  href={`#${card.evidenceAnchor}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(card.evidenceAnchor!)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    marginTop: 2,
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: evidenceLinkColor,
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
