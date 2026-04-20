import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { loops } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const CX = 250
const CY = 250
const RADIUS = 180          // node center distance from origin
const LABEL_RADIUS = 222    // label center distance
const NODE_COUNT = 9
const STEP_DEG = 360 / NODE_COUNT   // 40° between nodes

function nodePosition(i: number, r: number) {
  // First node at -90° (top), clockwise.
  const angleDeg = -90 + i * STEP_DEG
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad), angleDeg }
}

function labelAnchor(angleDeg: number): 'start' | 'middle' | 'end' {
  // Top and bottom → middle. Right hemisphere → start. Left hemisphere → end.
  if (angleDeg > -30 && angleDeg < 30) return 'middle'         // top (roughly)
  if (angleDeg > 150 && angleDeg < 210) return 'middle'        // bottom
  if (angleDeg >= 30 && angleDeg <= 150) return 'start'        // right side
  return 'end'                                                  // left side
}

export default function Loops() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % NODE_COUNT)
    }, loops.autoCycleMs)
    return () => window.clearInterval(id)
  }, [playing])

  const jumpTo = useCallback((i: number) => {
    setActive(i)
    setPlaying(false) // pause when user takes control
  }, [])

  const stage = loops.stages[active]

  return (
    <section className="loops" id="loops">
      <div className="container">
        <div className="loops-intro">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {loops.sectionLabel}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {loops.headline.before}
            <span className="accent">{loops.headline.italic}</span>
            {loops.headline.after}
          </motion.h2>
          <motion.p
            className="loops-lede"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {loops.lede}
          </motion.p>
        </div>

        <div className="loops-grid">
          <div className="loops-ring-wrap">
            <svg className="loops-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <circle className="ring-outline" cx={CX} cy={CY} r={RADIUS} />
              {loops.stages.map((s, i) => {
                const { x, y, angleDeg } = nodePosition(i, RADIUS)
                const label = nodePosition(i, LABEL_RADIUS)
                const anchor = labelAnchor(angleDeg)
                const isActive = active === i
                return (
                  <g
                    key={s.name}
                    className={`loops-node-group${isActive ? ' active' : ''}`}
                    onClick={() => jumpTo(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        jumpTo(i)
                      }
                    }}
                    aria-label={`Stage ${i + 1}: ${s.name}`}
                  >
                    <circle className="loops-node-hit" cx={x} cy={y} r={22} />
                    <circle className="loops-node" cx={x} cy={y} r={6} />
                    <text className="loops-node-index" x={x} y={y}>
                      {String(i + 1).padStart(2, '0')}
                    </text>
                    <text
                      className="loops-node-label"
                      x={label.x}
                      y={label.y + 4}
                      textAnchor={anchor}
                    >
                      {s.name}
                    </text>
                  </g>
                )
              })}
            </svg>
            <div className="loops-hint">{loops.hint}</div>
          </div>

          <motion.div
            className="loops-detail"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <div className="loops-detail-num">STAGE {String(active + 1).padStart(2, '0')}</div>
                <div className="loops-detail-name">{stage.name}</div>
                <div className="loops-detail-lede">{stage.lede}</div>
                <div className="loops-detail-body">{stage.body}</div>
              </motion.div>
            </AnimatePresence>

            <div className="loops-controls">
              <div className="loops-pager" role="tablist" aria-label="Stage pager">
                {loops.stages.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    className={active === i ? 'active' : ''}
                    onClick={() => jumpTo(i)}
                    aria-label={`Jump to ${s.name}`}
                    aria-current={active === i}
                  />
                ))}
              </div>
              <button
                type="button"
                className="loops-play"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={playing}
              >
                {playing ? <Pause size={10} /> : <Play size={10} />}
                {playing ? 'Pause' : 'Play'}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="loops-footer-row">
          <div className="loops-footer-line">{loops.footerLine}</div>
          <a href={loops.cta.href} className="btn-primary">
            {loops.cta.label} →
          </a>
        </div>
      </div>
    </section>
  )
}
