import { motion } from 'framer-motion'
import { engage } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const row = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Engage() {
  return (
    <section className="entry" id="entry">
      <div className="watermark">12</div>
      <div className="container">
        <div className="entry-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {engage.sectionLabel}
          </motion.div>
          <motion.h2
            className="section-h2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {engage.headline.before}
            <span className="it">{engage.headline.italic}</span>
            {engage.headline.after}
          </motion.h2>
          <motion.div
            className="tiers"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {engage.tiers.map((t) => (
              <motion.div key={t.name} className="tier" variants={row}>
                <div className="tier-name">{t.name}</div>
                <div className={`tier-price${t.priceIsInquire ? ' inquire' : ''}`}>{t.price}</div>
                <div className="tier-time">{t.time}</div>
                <div className="tier-desc">{t.desc}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="entry-note"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {engage.note}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
