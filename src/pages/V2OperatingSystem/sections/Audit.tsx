import { motion } from 'framer-motion'
import { audit } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const shotItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
}

const POSITIONS = ['left', 'center', 'right'] as const

export default function Audit() {
  return (
    <section className="audit-section" id="audit">
      <div className="container">
        <div className="audit-intro">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {audit.sectionLabel}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {audit.headline.before}
            <span className="accent">{audit.headline.italic}</span>
            {audit.headline.after}
          </motion.h2>
          <motion.p
            className="audit-lede"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {audit.lede}
          </motion.p>
        </div>

        <motion.div
          className="audit-tilt"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {audit.shots.map((shot, i) => (
            <motion.div
              key={shot.src}
              className={`audit-shot ${POSITIONS[i] ?? 'center'}`}
              variants={shotItem}
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="audit-caption"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {audit.caption}
        </motion.p>

        <motion.div
          className="audit-cta-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <a href={audit.cta.href} className="audit-cta">
            {audit.cta.label} →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
