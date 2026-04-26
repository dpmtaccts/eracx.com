// FrvrdSlotWord.tsx — the giant italic-serif word in the center of
// the FRVRD framework section. Slot-machines through three states
// based on scrollProgress: "Noise." (0..0.25) → "Signal." (0.25..0.60)
// → "Warmth." (0.60..1.00). The word's color also shifts continuously
// so "Warmth." reaches magenta at the end.

const WORDS = ['Noise.', 'Signal.', 'Warmth.'] as const
const BOUNDARIES = [0.25, 0.6, 1.01] // upper bound for each word

interface Props {
  scrollProgress: number
}

function activeIndex(p: number): 0 | 1 | 2 {
  if (p < BOUNDARIES[0]) return 0
  if (p < BOUNDARIES[1]) return 1
  return 2
}

// Lerp the same way BuildingFrvrdRadar does so the word's color tracks
// the polygon's. Inline so this component stays self-contained.
const COLOR_STOPS: { p: number; rgb: [number, number, number] }[] = [
  { p: 0.0, rgb: [107, 110, 114] }, // text-muted gray
  { p: 0.25, rgb: [107, 110, 114] }, // hold gray during "Noise."
  { p: 0.4, rgb: [53, 80, 95] },     // deep steel
  { p: 0.7, rgb: [53, 80, 95] },     // hold steel during "Signal."
  { p: 1.0, rgb: [196, 74, 122] },   // magenta on "Warmth."
]

function colorAt(p: number): string {
  const x = Math.max(0, Math.min(1, p))
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const a = COLOR_STOPS[i]
    const b = COLOR_STOPS[i + 1]
    if (x <= b.p) {
      const t = (x - a.p) / Math.max(1e-6, b.p - a.p)
      const r = Math.round(a.rgb[0] + (b.rgb[0] - a.rgb[0]) * t)
      const g = Math.round(a.rgb[1] + (b.rgb[1] - a.rgb[1]) * t)
      const bl = Math.round(a.rgb[2] + (b.rgb[2] - a.rgb[2]) * t)
      return `rgb(${r}, ${g}, ${bl})`
    }
  }
  const last = COLOR_STOPS[COLOR_STOPS.length - 1].rgb
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`
}

export default function FrvrdSlotWord({ scrollProgress }: Props) {
  const active = activeIndex(scrollProgress)
  const color = colorAt(scrollProgress)
  return (
    <div className="frvrd-slotword" style={{ color }} aria-live="polite">
      {WORDS.map((word, i) => {
        const offset = (i - active) * 100
        const visible = i === active
        return (
          <span
            key={word}
            className={`frvrd-slotword-card${visible ? ' is-active' : ''}`}
            style={{
              transform: `translateY(${offset}%)`,
              opacity: visible ? 1 : 0,
            }}
            aria-hidden={!visible}
          >
            {word}
          </span>
        )
      })}
    </div>
  )
}
