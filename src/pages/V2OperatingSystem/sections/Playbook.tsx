import { motion } from 'framer-motion'
import { playbook } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const cell = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Playbook() {
  return (
    <section className="playbook">
      <div className="container">
        <div className="playbook-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {playbook.sectionLabel}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {playbook.headline.before}
            <span className="it">{playbook.headline.italic}</span>
            {playbook.headline.after}
          </motion.h2>
          <motion.div
            className="pb-table"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div className="pb-header left" variants={cell}>Old</motion.div>
            <motion.div className="pb-header right" variants={cell}>New</motion.div>
            {playbook.rows.flatMap(([oldPlay, newPlay], i) => [
              <motion.div key={`l-${i}`} className="pb-cell left" variants={cell}>
                {oldPlay}
              </motion.div>,
              <motion.div key={`r-${i}`} className="pb-cell right" variants={cell}>
                {newPlay}
              </motion.div>,
            ])}
          </motion.div>
          <motion.div
            className="pb-footer"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {playbook.closer}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
