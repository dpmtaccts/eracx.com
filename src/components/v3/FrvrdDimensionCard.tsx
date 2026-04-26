// FrvrdDimensionCard.tsx — single dimension card used in the FRVRD
// section. White surface, dimension label in mono accent, a dashed
// sigmoid sparkline, and a two-sentence definition. Cards fade in with
// staggered delay when the cards row enters the viewport (delayMs is
// applied as animation-delay; the parent toggles the .is-visible class
// on its container).

interface Props {
  dimensionLabel: string
  definition: string
  // CSS custom property name (e.g. "--mist") — drives the sparkline
  // and the label color.
  accentVar: string
  delayMs: number
}

export default function FrvrdDimensionCard({
  dimensionLabel,
  definition,
  accentVar,
  delayMs,
}: Props) {
  const accent = `var(${accentVar})`
  return (
    <article
      className="frvrd-card"
      style={{
        // Apply the stagger via CSS custom property the stylesheet
        // reads as the animation-delay.
        ['--frvrd-card-delay' as string]: `${delayMs}ms`,
      }}
    >
      <div className="frvrd-card-label" style={{ color: accent }}>
        {dimensionLabel}
      </div>
      <div className="frvrd-card-spark">
        <svg
          viewBox="0 0 100 32"
          preserveAspectRatio="none"
          width="100%"
          height="32"
          aria-hidden="true"
        >
          <path
            d="M 2 28 C 24 28 32 22 50 17 C 68 12 76 6 98 4"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="frvrd-card-def">{definition}</p>
    </article>
  )
}
