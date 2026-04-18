import { motion } from 'framer-motion'
import { signalLibrary } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const tile = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function SignalLibrary() {
  return (
    <section className="signal-library">
      <div className="container">
        <div className="lib-intro">
          <div>
            <motion.div
              className="section-label"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {signalLibrary.sectionLabel}
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {signalLibrary.headline.before}
              <span className="it">{signalLibrary.headline.italic}</span>
              {signalLibrary.headline.after}
            </motion.h2>
          </div>
          <motion.div
            className="lib-note"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {signalLibrary.note}
          </motion.div>
        </div>

        <motion.div
          className="library-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          {signalLibrary.tiles.map((t) => (
            <motion.div key={t.name} className={`sig-tile ${t.tone === 'primary' ? '' : t.tone}`} variants={tile}>
              <div className="sig-name">{t.name}</div>
              <div className="sig-tools">{t.tools}</div>
              <div className="sig-play">{t.play}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="lib-footer">
          <div className="lib-count">{signalLibrary.countLabel}</div>
          <div className="lib-note-right">{signalLibrary.closer}</div>
        </div>
      </div>
    </section>
  )
}
