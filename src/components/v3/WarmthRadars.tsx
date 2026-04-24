// WarmthRadars.tsx — Figure 03 of How it works.
// Five radars, one per touchpoint (W1 → W5). Baseline is zero; warmth
// grows monotonically across the five dimensions: Frequency, Recency,
// Density, Responsiveness, Value. Aligned one-per-column with the
// sequence/chain above.
//
// Pure inline JSX SVG (no client-side JS). Colors reference CSS custom
// properties so the shapes re-colour automatically when the Fixer toggles
// data-theme or the --accent knob.

const CX = 120
const CY = 120
const R = 68
// Axis order (5 vertices): Frequency (top), Recency (upper-right),
// Density (lower-right), Responsiveness (lower-left), Value (upper-left).
const ANGLES_DEG = [-90, -18, 54, 126, 198]
const AXIS_LABELS = ['Frequency', 'Recency', 'Density', 'Responsiveness', 'Value']

function pointOnRing(angleDeg: number, radius: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)]
}

function radarPoints(values: number[], radius = R): string {
  return values
    .map((v, i) => {
      const [x, y] = pointOnRing(ANGLES_DEG[i], radius * (v / 100))
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
    <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric rings */}
      <polygon points={ringPoints(100)} fill="none" stroke="var(--rule)" strokeWidth="0.8" />
      <polygon points={ringPoints(75)} fill="none" stroke="var(--rule-soft)" strokeWidth="0.6" />
      <polygon points={ringPoints(50)} fill="none" stroke="var(--rule-soft)" strokeWidth="0.6" />
      <polygon points={ringPoints(25)} fill="none" stroke="var(--rule-soft)" strokeWidth="0.6" />

      {/* Axes */}
      <g stroke="var(--rule)" strokeWidth="0.6">
        {ANGLES_DEG.map((deg) => {
          const [x, y] = pointOnRing(deg, R)
          return (
            <line key={deg} x1={CX} y1={CY} x2={x.toFixed(1)} y2={y.toFixed(1)} />
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
        const [x, y] = pointOnRing(ANGLES_DEG[i], R * (v / 100))
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

      {/* Axis labels (just outside the outer ring) */}
      <g
        fontFamily="JetBrains Mono, monospace"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="0.04em"
        fill="var(--text-muted)"
      >
        {AXIS_LABELS.map((label, i) => {
          const deg = ANGLES_DEG[i]
          const [lx, ly] = pointOnRing(deg, R + 22)
          // Align text based on which side of the pentagon the label sits on
          let anchor: 'start' | 'middle' | 'end' = 'middle'
          if (deg > -90 && deg < 90) anchor = 'start'
          else if (deg > 90 || deg < -90) anchor = 'end'
          // Nudge vertical position so top/bottom labels sit cleanly
          const dy = deg === -90 ? -4 : deg === 54 || deg === 126 ? 8 : 4
          return (
            <text
              key={label}
              x={lx.toFixed(1)}
              y={(ly + dy).toFixed(1)}
              textAnchor={anchor}
            >
              {label}
            </text>
          )
        })}
      </g>
    </svg>
  )
}

interface Snapshot {
  num: string
  date: string
  // Values indexed by AXIS_LABELS:
  // [Frequency, Recency, Density, Responsiveness, Value]
  values: number[]
  warmth: string
  delta: string
  deltaFlat?: boolean
  stroke: string
  fill: string
}

// Progressive growth from baseline zero. Deltas map to the
// InteractionChain's per-step deltas (+4, +9, +10, +12, +5 = 40 warmth
// from 0). Per-axis shape echoes which dimensions each touchpoint moves.
const SNAPSHOTS: Snapshot[] = [
  {
    num: 'W1',
    date: 'Baseline',
    values: [0, 0, 0, 0, 0],
    warmth: '0',
    delta: '—',
    deltaFlat: true,
    stroke: 'var(--text-muted)',
    fill: 'var(--text-muted)',
  },
  {
    num: 'W2',
    date: 'After Post',
    values: [10, 3, 2, 4, 3],
    warmth: '4',
    delta: '↑ +4',
    stroke: 'var(--cold)',
    fill: 'var(--cold)',
  },
  {
    num: 'W3',
    date: 'After Comment',
    values: [22, 8, 6, 18, 8],
    warmth: '13',
    delta: '↑ +9',
    stroke: 'var(--warming)',
    fill: 'var(--warming)',
  },
  {
    num: 'W4',
    date: 'After LP + Email',
    values: [42, 38, 36, 32, 22],
    warmth: '35',
    delta: '↑ +22',
    stroke: 'var(--warm)',
    fill: 'var(--warm)',
  },
  {
    num: 'W6',
    date: 'After Meeting',
    values: [78, 72, 65, 70, 60],
    warmth: '72',
    delta: '↑ +37',
    stroke: 'var(--hot)',
    fill: 'var(--hot)',
  },
]

export default function WarmthRadars() {
  return (
    <div className="radar-grid-aligned">
      {SNAPSHOTS.map((snapshot) => (
        <RadarSlot key={snapshot.num} snapshot={snapshot} />
      ))}
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
