import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { aux, signalMap } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const CX = 220
const CY = 220
const R = 160
const AXES = [
  { key: 'frequency', label: 'Frequency', angleDeg: -90 },
  { key: 'recency', label: 'Recency', angleDeg: -18 },
  { key: 'value', label: 'Value', angleDeg: 54 },
  { key: 'responsiveness', label: 'Respons.', angleDeg: 126 },
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

  const frvrdValues = {
    frequency: aux.account.frvrd.frequency,
    recency: aux.account.frvrd.recency,
    value: aux.account.frvrd.value,
    responsiveness: aux.account.frvrd.responsiveness,
    density: aux.account.frvrd.density,
  } as Record<(typeof AXES)[number]['key'], number>

  const rings = [0.25, 0.5, 0.75, 1.0].map((t) =>
    pointsString(AXES.map((a) => polar(a.angleDeg, R * t))),
  )
  const dataPoints: [number, number][] = AXES.map((a) =>
    polar(a.angleDeg, R * (frvrdValues[a.key] / 100)),
  )
  const dataPolygon = pointsString(dataPoints)
  const labelPositions = AXES.map((a) => {
    const [lx, ly] = polar(a.angleDeg, R + 28)
    const [vx, vy] = polar(a.angleDeg, R + 14)
    return { label: a.label, value: frvrdValues[a.key], lx, ly, vx, vy }
  })

  return (
    // v8 delta item 33d: AUX section band flips to dark ground (Ink).
    // The card itself stays white via data-ground="light" → token reset.
    <section className="aux" id="aux" ref={sectionRef} data-ground="dark">
      <div className="container">
        <div className="aux-intro-v8">
          <div>
            <motion.div
              className="section-label"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {aux.sectionLabel}
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {aux.headline.before}
              <span className="accent">{aux.headline.italic}</span>
              {aux.headline.after}
            </motion.h2>
          </div>
          <motion.p
            className="aux-lede-v8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {aux.note}
          </motion.p>
        </div>

        <motion.div
          className="account-card v8"
          data-ground="light"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <div className="card-header">
            <div className="header-left">
              <div className="header-top">
                <div className="account-name-v8">{aux.account.name}</div>
                <div className="account-domain-v8">{aux.account.domain}</div>
              </div>
              <div className="header-chips">
                <span className="tier-badge-v8">{aux.account.tierBadge}</span>
                <span className="metric-chip">
                  <span className="val">{aux.account.warmth}</span>
                  Warmth
                </span>
                <span className="metric-chip divide">
                  <span className="val">{aux.account.rolesEngaged}/{aux.account.rolesTotal}</span>
                  Roles Engaged
                </span>
              </div>
            </div>
            <div className="composite">
              <div className="composite-value">{aux.account.composite}</div>
              <div className="composite-label">Composite</div>
              <div className="composite-trend">{aux.account.warmthTrend}</div>
            </div>
          </div>

          <div className="card-body">
            <div className="radar-panel">
              <div className="panel-title">FRVRD Breakdown</div>
              <svg className="frvrd-radar v8" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
                {rings.map((pts, i) => (
                  <polygon key={`ring-${i}`} className="grid-ring" points={pts} />
                ))}
                {AXES.map((a) => {
                  const [x, y] = polar(a.angleDeg, R)
                  return <line key={a.key} className="axis" x1={CX} y1={CY} x2={x} y2={y} />
                })}
                <motion.polygon
                  className="data"
                  points={dataPolygon}
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.1, opacity: 0 }}
                  transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                />
                {dataPoints.map(([x, y], i) => (
                  <motion.circle
                    key={`dot-${i}`}
                    className="dot"
                    cx={x}
                    cy={y}
                    r={4}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
                  />
                ))}
                {labelPositions.map(({ label, value, lx, ly, vx, vy }) => (
                  <g key={label}>
                    <text className="axis-label" x={lx} y={ly}>{label}</text>
                    <text className="axis-val" x={vx} y={vy}>{value}</text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="activity-panel">
              <div className="panel-title">Recent Activity · 14 days</div>
              <div className="activity-list">
                {aux.account.activity.map((a, i) => (
                  <div key={i} className="activity-row">
                    <div className={`activity-dot ${a.tone !== 'primary' ? a.tone : ''}`} />
                    <div className="activity-content">
                      <div className="activity-person">
                        <span className="redacted">{a.person}</span>
                      </div>
                      <div className="activity-detail">{a.detail}</div>
                    </div>
                    <div className="activity-points">{a.points}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                ))}
              </div>
              <div className="redaction-note">{aux.redactionNote}</div>
            </div>
          </div>

          {/* v8 delta item 20: plays table spans the full card width below
              the radar + activity body. */}
          <div className="plays-panel full-width">
            <div className="panel-title">Signal → Outcome</div>
            <div className="plays-table">
              {signalMap.rows.map((r, i) => (
                <div key={r.signal.primary} className="plays-row">
                  <div className="plays-signal">
                    <div className="plays-primary">{r.signal.primary}</div>
                    <div className="plays-meta">{r.signal.meta}</div>
                  </div>
                  <div className="plays-outcome">
                    <div className="plays-primary play">{r.play.primary}</div>
                    <div className="plays-meta">{r.play.meta}</div>
                  </div>
                  <div className="plays-score">
                    <span className="plays-score-num">{r.score}</span>
                    <div className="plays-score-bar">
                      <motion.div
                        className="plays-score-fill"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: r.score / 100 } : { scaleX: 0 }}
                        transition={{
                          duration: 1.0,
                          delay: 0.3 + i * 0.08,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
