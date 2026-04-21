import { motion } from 'framer-motion'
import { founder } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const credItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const } },
}

// v8 delta item 24: homepage operator-bench credibility block.
// Cream ground, no headshot, no first-person copy. Supersedes item 23.
export default function Founder() {
  return (
    <section className="operator-bench">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {founder.sectionLabel}
        </motion.div>
        <motion.h2
          className="operator-bench-headline"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {founder.headline.before}
          <span className="accent">{founder.headline.italic}</span>
          {founder.headline.after}
        </motion.h2>
        <motion.p
          className="operator-bench-lede"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {founder.lede}
        </motion.p>

        <motion.div
          className="operator-bench-credentials"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="credentials-label" variants={credItem}>
            {founder.credentialsLabel}
          </motion.div>
          <div className="credentials-grid">
            {founder.credentials.map((c) => (
              <motion.div key={c.name} variants={credItem}>
                {c.src ? (
                  <img
                    src={c.src}
                    alt={c.name}
                    className="credential-logo"
                    loading="lazy"
                  />
                ) : (
                  <span className="credential-text">{c.name}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="operator-bench-cta-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <a className="operator-bench-cta" href={founder.cta.href}>
            {founder.cta.label} →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
