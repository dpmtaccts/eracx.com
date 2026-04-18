import { motion } from 'framer-motion'
import { fit } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Fit() {
  return (
    <section className="fit">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {fit.sectionLabel}
        </motion.div>
        <motion.h2
          className="section-h2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {fit.headline.before}
          <span className="it">{fit.headline.italic}</span>
          {fit.headline.after}
        </motion.h2>
        <motion.div
          className="fit-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="fit-col yes-col">
            <div className="fit-label">For</div>
            <ul className="fit-list">
              {fit.forItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="fit-col no-col">
            <div className="fit-label">Not for</div>
            <ul className="fit-list">
              {fit.notForItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
