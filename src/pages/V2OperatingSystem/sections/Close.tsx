import { motion } from 'framer-motion'
import { close } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Close() {
  return (
    <section className="close">
      <div className="watermark">◆</div>
      <div className="container-narrow">
        <div className="close-content">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {close.headline.before}
            <span className="it">{close.headline.italic}</span>
            {close.headline.after}
          </motion.h2>
          <motion.a
            href={close.cta.href}
            className="btn-primary"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {close.cta.label}
          </motion.a>
        </div>
      </div>
    </section>
  )
}
