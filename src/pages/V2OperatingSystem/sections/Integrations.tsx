import { motion } from 'framer-motion'
import { integrations } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const } },
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
            <span className="accent">{integrations.headline.italic}</span>
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
          className="int-logos"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {integrations.tools.map((tool) => (
            <motion.div key={tool.name} className="int-logo" variants={item}>
              {tool.src ? (
                <img src={tool.src} alt={tool.name} loading="lazy" />
              ) : (
                <span className="int-logo-text">{tool.name}</span>
              )}
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
