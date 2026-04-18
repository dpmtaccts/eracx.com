import { motion } from 'framer-motion'
import { stats } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-row"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="stat-number">
              {stat.number}
              {stat.numberItalic && <span className="it">{stat.numberItalic}</span>}
            </div>
            <div className="stat-text">
              {stat.text}
              <span className="source">{stat.source}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
