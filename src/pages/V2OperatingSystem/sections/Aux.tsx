import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { aux } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

// FRVRD pentagon geometry: center (220, 220), max radius 160.
// Axes clockwise from top: Frequency, Recency, Value, Responsiveness, Density.
const CX = 220
const CY = 220
const R = 160
const AXES = [
  { key: 'frequency', label: 'Frequency', angleDeg: -90 },
  { key: 'recency', label: 'Recency', angleDeg: -18 },
  { key: 'value', label: 'Value', angleDeg: 54 },
  { key: 'responsiveness', label: 'Responsiveness', angleDeg: 126 },
  { key: 'density', label: 'Density', angleDeg: 198 },
] as const

function polar(angleDeg: number, r: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

function pointsString(pts: [number, number][]): string {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

export default function Aux() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  const frvrd = aux.account.frvrd
  const frvrdValues = {
    frequency: frvrd.frequency,
    recency: frvrd.recency,
    value: frvrd.value,
    responsiveness: frvrd.responsiveness,
    density: frvrd.density,
  } as Record<(typeof AXES)[number]['key'], number>

  // Grid rings at 20, 40, 60, 80, 100%
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0].map((t) =>
    pointsString(AXES.map((a) => polar(a.angleDeg, R * t))),
  )
  // Data polygon + dots
  const dataPoints: [number, number][] = AXES.map((a) =>
    polar(a.angleDeg, R * (frvrdValues[a.key] / 100)),
  )
  const dataPolygon = pointsString(dataPoints)
  // Label positions — just outside the outermost vertex
  const labelPositions = AXES.map((a) => {
    const [lx, ly] = polar(a.angleDeg, R + 28)
    const [vx, vy] = polar(a.angleDeg, R + 14)
    return { label: a.label, value: frvrdValues[a.key], lx, ly, vx, vy }
  })

  return (
    <section className="aux" id="aux" ref={sectionRef}>
      <div className="container">
        <div className="aux-section-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {aux.sectionLabel}
          </motion.div>
          <div className="aux-intro">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {aux.headline.before}
              <span className="it">{aux.headline.italic}</span>
              {aux.headline.after}
            </motion.h2>
            <motion.div
              className="aux-note"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {aux.note}
            </motion.div>
          </div>

          <motion.div
            className="account-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <div className="account-header">
              <div>
                <div className="account-name">{aux.account.name}</div>
                <div className="account-domain">{aux.account.domain}</div>
              </div>
              <div className="account-metric">
                <div className="account-metric-label">Warmth</div>
                <div className="account-metric-value">{aux.account.warmth}</div>
                <div className="account-metric-trend">{aux.account.warmthTrend}</div>
              </div>
              <div className="account-metric">
                <div className="account-metric-label">Roles engaged</div>
                <div className="account-metric-value">
                  {aux.account.rolesEngaged}
                  <span className="sub">/{aux.account.rolesTotal}</span>
                </div>
                <div className="account-metric-trend muted">{aux.account.rolesNote}</div>
              </div>
              <div className="account-metric">
                <div className="account-metric-label">Tier</div>
                <div style={{ marginTop: 6 }}>
                  <span className="tier-badge">{aux.account.tierBadge}</span>
                </div>
              </div>
            </div>

            <div className="account-body">
              <div className="aux-radar-panel">
                <div className="aux-radar-title">FRVRD Breakdown</div>
                <svg className="frvrd-radar" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
                  {rings.map((pts, i) => (
                    <polygon key={`ring-${i}`} className="grid-ring" points={pts} />
                  ))}
                  {AXES.map((a) => {
                    const [x, y] = polar(a.angleDeg, R)
                    return (
                      <line key={a.key} className="axis" x1={CX} y1={CY} x2={x} y2={y} />
                    )
                  })}
                  <motion.polygon
                    className="data"
                    points={dataPolygon}
                    initial={{ scale: 0.1, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.1, opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'fill-box' as unknown as undefined }}
                  />
                  {dataPoints.map(([x, y], i) => (
                    <motion.circle
                      key={`dot-${i}`}
                      className="dot"
                      cx={x}
                      cy={y}
                      r={5}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
                    />
                  ))}
                  {labelPositions.map(({ label, value, lx, ly, vx, vy }) => (
                    <g key={label}>
                      <text className="label" x={lx} y={ly}>
                        {label}
                      </text>
                      <text className="value" x={vx} y={vy}>
                        {value}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="aux-score-panel">
                <div className="aux-score-title">Score Composition</div>
                {aux.account.scores.map((s, i) => (
                  <div key={s.label} className="score-row">
                    <div className="score-label">{s.label}</div>
                    <div className="score-bar-wrap">
                      <motion.div
                        className={`score-bar-fill${s.color === 'gold' ? ' gold' : ''}`}
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: s.value / 100 } : { scaleX: 0 }}
                        transition={{
                          duration: 1.3,
                          delay: 0.3 + i * 0.15,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className="score-value">{s.value}</div>
                  </div>
                ))}
                <div className="score-composite">
                  <div className="score-composite-label">Composite</div>
                  <div className="score-composite-value">{aux.account.composite}</div>
                </div>
              </div>
            </div>

            <div className="aux-activity">
              <div className="aux-activity-title">Recent activity · last 14 days</div>
              {aux.account.activity.map((a, i) => (
                <div key={i} className="activity-row">
                  <div
                    className={`activity-dot${a.tone === 'warm' ? ' warm' : a.tone === 'cool' ? ' cool' : ''}`}
                  />
                  <div className="activity-desc">
                    <strong>{a.name}</strong> — {a.action}
                  </div>
                  <div className="activity-points">{a.points}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="tier-distribution">
            <div className="tier-dist-title">
              <span>{aux.tierDist.titleLeft}</span>
              <span>{aux.tierDist.titleRight}</span>
            </div>
            {aux.tierDist.tiers.map((t, i) => (
              <div key={t.tier} className="tier-row" data-tier={t.tier}>
                <div className="tier-label">
                  <span className="tag">{t.tag}</span>
                  {t.label}
                </div>
                <div className="tier-bar">
                  <motion.div
                    className="tier-bar-fill"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: t.widthPct / 100 } : { scaleX: 0 }}
                    transition={{
                      duration: 1.4,
                      delay: 0.4 + i * 0.15,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="tier-count">{t.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
