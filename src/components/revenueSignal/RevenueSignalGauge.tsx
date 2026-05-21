import { SCORE_BANDS, BAND_COLORS, type ScoreBand } from '../../lib/revenueSignalScore'

/**
 * Semicircular gauge used in the Revenue Signal Score hero and in the
 * If-the-Signals-Connect mini view.
 *
 * Geometry (in SVG userspace, viewBox 0 0 460 240):
 *   - Arc centered at (230, 200), radius 190, stroke width 22.
 *   - 180-degree sweep from (40, 200) on the left to (420, 200) on the right.
 *   - Needle origin at (230, 200), length 170, rotation = -90 + (score/100) * 180.
 *
 * Score-to-angle mapping: score 0 points the needle left (-90deg), score 50
 * points up (0deg), score 100 points right (+90deg).
 */

const CENTER_X = 230
const CENTER_Y = 200
const RADIUS = 190
const NEEDLE_LENGTH = 170

const VIEW_W = 460
const VIEW_H = 240

const TICK_STOPS = [0, 25, 45, 65, 85, 100]

const SEGMENT_BOUNDARIES: Array<{ band: ScoreBand; from: number; to: number }> = SCORE_BANDS.map(
  (band, i, all) => ({
    band,
    from: i === 0 ? 0 : band.range[0],
    to: i === all.length - 1 ? 100 : band.range[1],
  })
)

type Props = {
  score: number
  ghostScore?: number
  width?: number
  className?: string
  /** Show the score number and "OUT OF 100" caption inside the gauge. */
  showScoreReadout?: boolean
  /** Show tick labels. Hide for very small gauges. */
  showTicks?: boolean
  /** Color used to highlight the arc segment between ghostScore and score. */
  highlightColor?: string
  /** When true, inverts tick separators, needle, and hub for dark grounds. */
  groundIsDark?: boolean
}

export function RevenueSignalGauge({
  score,
  ghostScore,
  width = 460,
  className,
  showScoreReadout = true,
  showTicks = true,
  highlightColor,
  groundIsDark = false,
}: Props) {
  const height = (VIEW_H / VIEW_W) * width
  const clamped = Math.max(0, Math.min(100, score))
  const ghostClamped = ghostScore == null ? null : Math.max(0, Math.min(100, ghostScore))

  const segments = SEGMENT_BOUNDARIES.map(({ band, from, to }) => ({
    band,
    color: BAND_COLORS[band.id],
    path: arcPath(from, to),
  }))

  const ticks = TICK_STOPS.map((s) => tickGeometry(s))

  const needleRotation = -90 + (clamped / 100) * 180
  const ghostRotation =
    ghostClamped == null ? null : -90 + (ghostClamped / 100) * 180

  const showHighlight =
    ghostClamped != null && highlightColor && ghostClamped !== clamped
  const highlightPath = showHighlight
    ? arcPath(Math.min(ghostClamped!, clamped), Math.max(ghostClamped!, clamped))
    : null

  // v4 ink/white inversion for needle, hub, and tick separators.
  const needleColor = groundIsDark ? '#FFFFFF' : '#0A0A0A'
  const tickSep = groundIsDark ? 'rgba(10,10,10,0.3)' : '#FFFFFF'
  const tickLabel = groundIsDark ? 'rgba(255,255,255,0.6)' : 'rgba(10,10,10,0.5)'

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width={width}
      height={height}
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
      role="img"
      aria-label={`Revenue Signal Score gauge showing ${score} of 100`}
    >
      {/* Band segments */}
      {segments.map((seg) => (
        <path
          key={seg.band.id}
          d={seg.path}
          stroke={seg.color}
          strokeWidth={22}
          fill="none"
          strokeLinecap="butt"
        />
      ))}

      {/* Highlight arc between ghost and current */}
      {highlightPath && (
        <path
          d={highlightPath}
          stroke={highlightColor}
          strokeWidth={26}
          strokeOpacity={0.22}
          fill="none"
          strokeLinecap="butt"
        />
      )}

      {/* Tick marks crossing the arc */}
      {ticks.map((t) => (
        <line
          key={`tick-${t.score}`}
          x1={t.innerX}
          y1={t.innerY}
          x2={t.outerX}
          y2={t.outerY}
          stroke={tickSep}
          strokeWidth={1.2}
          opacity={0.85}
        />
      ))}

      {/* Tick labels just inside the arc */}
      {showTicks &&
        ticks.map((t) => (
          <text
            key={`label-${t.score}`}
            x={t.labelX}
            y={t.labelY}
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize={10}
            fill={tickLabel}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ letterSpacing: '0.14em' }}
          >
            {t.score}
          </text>
        ))}

      {/* Ghost needle (optional) */}
      {ghostRotation != null && (
        <g transform={`rotate(${ghostRotation}, ${CENTER_X}, ${CENTER_Y})`} opacity={0.4}>
          <line
            x1={CENTER_X}
            y1={CENTER_Y}
            x2={CENTER_X}
            y2={CENTER_Y - NEEDLE_LENGTH}
            stroke={needleColor}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <circle cx={CENTER_X} cy={CENTER_Y - NEEDLE_LENGTH} r={4} fill={needleColor} />
        </g>
      )}

      {/* Solid needle */}
      <g transform={`rotate(${needleRotation}, ${CENTER_X}, ${CENTER_Y})`}>
        <line
          x1={CENTER_X}
          y1={CENTER_Y}
          x2={CENTER_X}
          y2={CENTER_Y - NEEDLE_LENGTH}
          stroke={needleColor}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <circle cx={CENTER_X} cy={CENTER_Y - NEEDLE_LENGTH} r={4.5} fill={needleColor} />
      </g>

      {/* Center hub */}
      <circle cx={CENTER_X} cy={CENTER_Y} r={10} fill={needleColor} />
      <circle cx={CENTER_X} cy={CENTER_Y} r={4} fill={groundIsDark ? '#0A0A0A' : '#FFFFFF'} />

      {/* Score readout — Anton mega */}
      {showScoreReadout && (
        <>
          <text
            x={CENTER_X}
            y={130}
            fontFamily="'Anton', 'Helvetica Neue Condensed', sans-serif"
            fontSize={72}
            fill={needleColor}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ letterSpacing: '-0.01em' }}
          >
            {Math.round(clamped)}
          </text>
          <text
            x={CENTER_X}
            y={172}
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize={11}
            fill={tickLabel}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ letterSpacing: '0.14em' }}
          >
            OUT OF 100
          </text>
        </>
      )}
    </svg>
  )
}

function arcPoint(score: number) {
  const angle = ((-90 + (score / 100) * 180) * Math.PI) / 180
  return {
    x: CENTER_X + RADIUS * Math.sin(angle),
    y: CENTER_Y - RADIUS * Math.cos(angle),
  }
}

function arcPath(scoreFrom: number, scoreTo: number) {
  const a = arcPoint(scoreFrom)
  const b = arcPoint(scoreTo)
  // sweep-flag=1 traces clockwise on screen, which goes over the top of the gauge.
  return `M ${a.x} ${a.y} A ${RADIUS} ${RADIUS} 0 0 1 ${b.x} ${b.y}`
}

function tickGeometry(score: number) {
  const angle = ((-90 + (score / 100) * 180) * Math.PI) / 180
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)
  return {
    score,
    innerX: CENTER_X + 178 * sin,
    innerY: CENTER_Y - 178 * cos,
    outerX: CENTER_X + 202 * sin,
    outerY: CENTER_Y - 202 * cos,
    labelX: CENTER_X + 160 * sin,
    labelY: CENTER_Y - 160 * cos,
  }
}
