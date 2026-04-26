// FrvrdDimensionPanel.tsx — right-edge slot-machine panel that walks
// through the five FRVRD dimensions as each FRVRD dot arrives at its
// vertex. Visible only after scrollProgress crosses 0.25 (when the
// migration phase begins).

interface Dimension {
  number: string
  name: string
  accent: string
  definition: string
}

const DIMENSIONS: Dimension[] = [
  {
    number: 'DIMENSION 01',
    name: 'FREQUENCY',
    accent: 'How often.',
    definition:
      'How often the account engages. More touchpoints across more days means deeper interest.',
  },
  {
    number: 'DIMENSION 02',
    name: 'RECENCY',
    accent: 'How recent.',
    definition:
      'How recent the last engagement was. A signal three months ago is colder than a signal three days ago.',
  },
  {
    number: 'DIMENSION 03',
    name: 'VALUE',
    accent: 'How much.',
    definition:
      'The dollar value this account represents. ARR potential, deal size, expansion runway.',
  },
  {
    number: 'DIMENSION 04',
    name: 'RESPONSIVENESS',
    accent: 'How fast.',
    definition:
      'How fast they respond when reached out to. Same-day reply is hotter than seven-day reply.',
  },
  {
    number: 'DIMENSION 05',
    name: 'DENSITY',
    accent: 'How wide.',
    definition:
      'How widely the account engages across the org. One champion is fragile. Three engaged stakeholders is durable.',
  },
]

// Each dimension owns one of the five 0.10-wide migration windows.
// The panel updates as soon as the matching dot starts migrating.
const BOUNDARIES = [0.25, 0.35, 0.45, 0.55, 0.65, 1.01]

interface Props {
  scrollProgress: number
  visible: boolean
}

function activeIndex(p: number): number {
  if (p < BOUNDARIES[0]) return 0
  for (let i = 0; i < DIMENSIONS.length; i++) {
    if (p < BOUNDARIES[i + 1]) return i
  }
  return DIMENSIONS.length - 1
}

export default function FrvrdDimensionPanel({ scrollProgress, visible }: Props) {
  const active = activeIndex(scrollProgress)
  return (
    <aside
      className={`frvrd-panel${visible ? ' is-visible' : ''}`}
      aria-live="polite"
    >
      <div className="frvrd-panel-window">
        {DIMENSIONS.map((d, i) => {
          const offset = (i - active) * 100
          const isActive = i === active
          return (
            <article
              key={d.name}
              className={`frvrd-panel-card${isActive ? ' is-active' : ''}`}
              style={{
                transform: `translateY(${offset}%)`,
                opacity: isActive ? 1 : 0,
              }}
              aria-hidden={!isActive}
            >
              <div className="frvrd-panel-num">{d.number}</div>
              <h3 className="frvrd-panel-name">{d.name}</h3>
              <p className="frvrd-panel-accent">{d.accent}</p>
              <p className="frvrd-panel-def">{d.definition}</p>
            </article>
          )
        })}
      </div>
    </aside>
  )
}
