// WarmthRadars.tsx — Figure 03 of How it works.
// Five-column grid aligned with the sequence/chain above: radars in slots
// 1, 3, 5 (W1 baseline, W3 after LP+Email, W6 after Meeting) and empty
// slots at positions 2 and 4 (preserve column width; hidden on narrow
// viewports per CSS).
//
// Radars are pure JSX SVG (no client-side JS). Axis labels intentionally
// removed — inflation shape tells the W1→W3→W6 story; per-dimension detail
// lives in the chain cards above. Colors use CSS custom properties so the
// shapes recolour automatically when the Fixer toggles data-theme or the
// --accent knob.

const CX = 100
const CY = 100
const R = 72
const ANGLES_DEG = [-90, -18, 54, 126, 198]

function radarPoints(values: number[], cx = CX, cy = CY, r = R): string {
  return values
    .map((v, i) => {
      const a = (ANGLES_DEG[i] * Math.PI) / 180
      const rad = r * (v / 100)
      const x = cx + rad * Math.cos(a)
      const y = cy + rad * Math.sin(a)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

function ringPoints(pct: number): string {
  return radarPoints([pct, pct, pct, pct, pct])
}

interface RadarProps {
  values: number[]
  stroke: string
  fill: string
}

function Radar({ values, stroke, fill }: RadarProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring + three inner rings */}
      <polygon points={ringPoints(100)} fill="none" stroke="var(--rule)" strokeWidth="0.8" />
      <polygon points={ringPoints(75)} fill="none" stroke="var(--rule-soft)" strokeWidth="0.6" />
      <polygon points={ringPoints(50)} fill="none" stroke="var(--rule-soft)" strokeWidth="0.6" />
      <polygon points={ringPoints(25)} fill="none" stroke="var(--rule-soft)" strokeWidth="0.6" />

      {/* Axes */}
      <g stroke="var(--rule)" strokeWidth="0.6">
        {ANGLES_DEG.map((deg) => {
          const a = (deg * Math.PI) / 180
          const x = CX + R * Math.cos(a)
          const y = CY + R * Math.sin(a)
          return (
            <line
              key={deg}
              x1={CX}
              y1={CY}
              x2={x.toFixed(1)}
              y2={y.toFixed(1)}
            />
          )
        })}
      </g>

      {/* Warmth polygon */}
      <polygon
        points={radarPoints(values)}
        fill={fill}
        fillOpacity="0.3"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Vertex dots */}
      {values.map((v, i) => {
        const a = (ANGLES_DEG[i] * Math.PI) / 180
        const rad = R * (v / 100)
        const x = CX + rad * Math.cos(a)
        const y = CY + rad * Math.sin(a)
        return (
          <circle
            key={i}
            cx={x.toFixed(1)}
            cy={y.toFixed(1)}
            r="2.8"
            fill={stroke}
          />
        )
      })}
    </svg>
  )
}

interface Snapshot {
  num: string
  date: string
  values: number[]
  warmth: string
  delta: string
  deltaFlat?: boolean
  stroke: string
  fill: string
}

const SNAPSHOTS: Snapshot[] = [
  {
    num: 'W1',
    date: 'Baseline',
    values: [25, 40, 22, 30, 35],
    warmth: '32',
    delta: '—',
    deltaFlat: true,
    stroke: 'var(--text-muted)',
    fill: 'var(--text-muted)',
  },
  {
    num: 'W3',
    date: 'After LP + Email',
    values: [52, 58, 45, 50, 48],
    warmth: '51',
    delta: '↑ +19',
    stroke: 'var(--accent)',
    fill: 'var(--accent)',
  },
  {
    num: 'W6',
    date: 'After Meeting',
    values: [80, 78, 68, 74, 65],
    warmth: '72',
    delta: '↑ +21',
    stroke: 'var(--hot)',
    fill: 'var(--hot)',
  },
]

export default function WarmthRadars() {
  // Render order: W1, empty, W3, empty, W6 — matches the 5-column grid above.
  return (
    <div className="radar-grid-aligned">
      <RadarSlot snapshot={SNAPSHOTS[0]} />
      <div className="radar-slot empty" />
      <RadarSlot snapshot={SNAPSHOTS[1]} />
      <div className="radar-slot empty" />
      <RadarSlot snapshot={SNAPSHOTS[2]} />
    </div>
  )
}

function RadarSlot({ snapshot }: { snapshot: Snapshot }) {
  return (
    <div className="radar-slot">
      <div className="rc-head-mini">
        <span className="rc-num">{snapshot.num}</span>
        <span className="rc-date-mini">{snapshot.date}</span>
      </div>
      <div className="rc-svg-mini">
        <Radar
          values={snapshot.values}
          stroke={snapshot.stroke}
          fill={snapshot.fill}
        />
      </div>
      <div className="rc-foot-mini">
        <span className="rc-warmth-num-mini">{snapshot.warmth}</span>
        <span className={`rc-delta-mini${snapshot.deltaFlat ? ' flat' : ''}`}>
          {snapshot.delta}
        </span>
      </div>
    </div>
  )
}
