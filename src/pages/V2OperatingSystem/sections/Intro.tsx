import { motion } from 'framer-motion'
import { intro } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Intro() {
  return (
    <section className="intro" aria-label="The new growth playbook">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {intro.sectionLabel}
        </motion.div>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {intro.headline}
        </motion.h2>
        <motion.div
          className="intro-body"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          {intro.body.map((p, i) => (
            <motion.p key={i} variants={item}>{p}</motion.p>
          ))}
        </motion.div>
        <motion.div
          className="intro-stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {intro.stats.map((s, i) => (
            <motion.div key={i} className="intro-stat" variants={item}>
              <div className="intro-stat-value">{s.value}</div>
              <div className="intro-stat-text">{s.text}</div>
              <div className="intro-stat-source">{s.source}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
