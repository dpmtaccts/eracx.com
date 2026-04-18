import { motion } from 'framer-motion'
import { founder } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Founder() {
  return (
    <section className="founder">
      <div className="container">
        <div className="founder-grid">
          <motion.div
            className="founder-img"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {founder.imageSrc ? (
              <img src={founder.imageSrc} alt={founder.imageAlt} />
            ) : (
              <span>[photograph of Justin — TODO]</span>
            )}
          </motion.div>
          <div className="founder-body">
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
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              {founder.headline.before}
              <span className="it">{founder.headline.italic}</span>
              {founder.headline.after}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              {founder.body}
            </motion.p>
            <motion.div
              className="advisors"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="advisors-label">Advisors</div>
              <div className="advisors-list">
                {founder.advisors.map((a) => (
                  <div key={a.name} className="advisor">
                    {a.name}
                    <span>{a.role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
