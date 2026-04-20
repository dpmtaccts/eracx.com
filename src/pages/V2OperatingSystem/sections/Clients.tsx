import { motion } from 'framer-motion'
import { clients } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Clients() {
  return (
    <section className="clients" id="clients">
      <div className="container">
        <div className="clients-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {clients.sectionLabel}
          </motion.div>
          <motion.h2
            className="section-h2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {clients.headline.before}
            <span className="it">{clients.headline.italic}</span>
            {clients.headline.after}
          </motion.h2>
          <motion.div
            className="clients-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {clients.items.map((c) => (
              <motion.div key={c.name} className="client" variants={card}>
                <div className="client-name">{c.name}</div>
                <div className="client-title">{c.title}</div>
                <div className="client-plays">{c.plays}</div>
                <div className={`client-quote${c.quoteIsPlaceholder ? ' placeholder' : ''}`}>
                  {c.quote}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
