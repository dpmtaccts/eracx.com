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

export default function Founder() {
  return (
    <section className="founder">
      <div className="container">
        <div className="founder-grid">
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
              <span className="accent">{founder.headline.italic}</span>
              {founder.headline.after}
            </motion.h2>
            {founder.body.map((p, i) => (
              <motion.p
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                {p}
              </motion.p>
            ))}
            <motion.div
              className="founder-byline"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              <span className="name">{founder.byline.name}</span>
              <span className="role">{founder.byline.role}</span>
            </motion.div>

            <motion.div
              className="credentials"
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

            <motion.a
              href={founder.cta.href}
              className="founder-cta"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              {founder.cta.label} →
            </motion.a>

            {founder.advisorsEnabled && (
              <div className="advisors">
                <div className="advisors-label">Advisors</div>
                <div className="advisors-list">
                  {founder.advisors.map((a) => (
                    <div key={a.name} className="advisor">
                      {a.name}
                      <span>{a.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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
        </div>
      </div>
    </section>
  )
}
