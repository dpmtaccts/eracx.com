import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { signalMap } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function SignalMap() {
  const flowRef = useRef<HTMLDivElement>(null)
  const flowInView = useInView(flowRef, { once: true, amount: 0.2 })

  return (
    <section className="signal-map" id="signal-map">
      <div className="container">
        <div className="signal-map-content">
          <div className="map-intro">
            <div>
              <motion.div
                className="section-label"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                {signalMap.sectionLabel}
              </motion.div>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                {signalMap.headline.before}
                <span className="it">{signalMap.headline.italic}</span>
                {signalMap.headline.after}
              </motion.h2>
            </div>
            <motion.div
              className="map-note"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {signalMap.note}
            </motion.div>
          </div>

          <motion.div
            className="map-flow"
            ref={flowRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <div className="flow-header">
              <div className="flow-col-label">{signalMap.columns.signal}</div>
              <div />
              <div className="flow-col-label">{signalMap.columns.play}</div>
              <div />
              <div className="flow-col-label">{signalMap.columns.priority}</div>
            </div>

            {signalMap.rows.map((row, i) => (
              <div key={row.signal.primary} className="flow-row">
                <div className="flow-signal">
                  <div className="flow-primary">{row.signal.primary}</div>
                  <div className="flow-meta">{row.signal.meta}</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-play">
                  <div className="flow-primary play">{row.play.primary}</div>
                  <div className="flow-meta">{row.play.meta}</div>
                </div>
                <div />
                <div className="flow-score">
                  {row.score}
                  <div className="flow-score-bar">
                    <motion.div
                      className="flow-score-fill"
                      initial={{ scaleX: 0 }}
                      animate={flowInView ? { scaleX: row.score / 100 } : { scaleX: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.3 + i * 0.1,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="map-caption"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {signalMap.caption}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
