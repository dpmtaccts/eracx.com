import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { expect } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const phaseItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Expect() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section className="expect" id="expect" ref={sectionRef}>
      <div className="container">
        <div className="expect-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {expect.sectionLabel}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {expect.headline.before}
            <span className="it">{expect.headline.italic}</span>
            {expect.headline.after}
          </motion.h2>
          <motion.p
            className="expect-sub"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {expect.sub}
          </motion.p>

          <div className="timeline">
            <div className="timeline-track">
              <motion.div
                className="timeline-fill"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ width: '100%' }}
              />
            </div>
            <div className="timeline-markers">
              {expect.markers.map((m, i) => (
                <div key={m} className="timeline-marker">
                  <motion.div
                    className="dot"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.8, ease: [0.23, 1, 0.32, 1] }}
                  />
                  <div className="months">{m}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="phases-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {expect.phases.map((p) => (
              <motion.div key={p.label} className="phase" variants={phaseItem}>
                <div className="phase-label">{p.label}</div>
                <div className="phase-name">{p.name}</div>
                <div className="phase-months">{p.months}</div>
                <div className="phase-desc">{p.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="expect-footer"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {expect.closer}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
