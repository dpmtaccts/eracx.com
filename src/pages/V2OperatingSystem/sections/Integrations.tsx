import { motion } from 'framer-motion'
import { integrations } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const col = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Integrations() {
  return (
    <section className="integrations">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {integrations.sectionLabel}
        </motion.div>
        <div className="integrations-header">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {integrations.headline.before}
            <span className="it">{integrations.headline.italic}</span>
            {integrations.headline.after}
          </motion.h2>
          <motion.div
            className="int-note"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {integrations.note}
          </motion.div>
        </div>
        <motion.div
          className="int-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {integrations.columns.map((c) => (
            <motion.div key={c.category} className="int-col" variants={col}>
              <div className="int-category">{c.category}</div>
              <div className="int-tools">
                {c.tools.map((t) => (
                  <div key={t} className="int-tool">{t}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="int-footer"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {integrations.closer}
        </motion.div>
      </div>
    </section>
  )
}
