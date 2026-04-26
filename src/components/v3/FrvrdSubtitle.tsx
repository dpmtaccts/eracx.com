// FrvrdSubtitle.tsx — three-state slot-machine subtitle below the big
// FrvrdSlotWord. Boundaries match FrvrdSlotWord (0.25 / 0.60).

const LINES = [
  "A thousand metrics. Most don't matter.",
  'Five signals separate noise from intent.',
  'FRVRD measures every named account, every day.',
] as const

const BOUNDARIES = [0.25, 0.6, 1.01]

interface Props {
  scrollProgress: number
}

function activeIndex(p: number): 0 | 1 | 2 {
  if (p < BOUNDARIES[0]) return 0
  if (p < BOUNDARIES[1]) return 1
  return 2
}

export default function FrvrdSubtitle({ scrollProgress }: Props) {
  const active = activeIndex(scrollProgress)
  return (
    <div className="frvrd-subtitle" aria-live="polite">
      {LINES.map((line, i) => {
        const offset = (i - active) * 100
        const visible = i === active
        return (
          <p
            key={i}
            className={`frvrd-subtitle-card${visible ? ' is-active' : ''}`}
            style={{
              transform: `translateY(${offset}%)`,
              opacity: visible ? 1 : 0,
            }}
            aria-hidden={!visible}
          >
            {line}
          </p>
        )
      })}
    </div>
  )
}
