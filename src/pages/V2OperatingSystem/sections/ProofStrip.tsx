import { motion } from 'framer-motion'
import { proofStrip } from '../content'

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const col = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Client outcomes">
      <div className="container">
        <motion.div
          className="proof-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          {proofStrip.columns.map((c, i) => (
            <motion.div
              key={i}
              className={`proof-col${c.isPlaceholder ? ' placeholder' : ''}`}
              variants={col}
            >
              {c.isPlaceholder && <div className="proof-todo">TODO</div>}
              <div className="proof-descriptor">{c.descriptor}</div>
              <div className="proof-outcome">{c.outcome}</div>
              <div className="proof-detail">{c.detail}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
