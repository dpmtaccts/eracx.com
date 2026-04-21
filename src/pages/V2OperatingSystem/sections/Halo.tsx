import { motion } from 'framer-motion'
import { halo } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const feat = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Halo() {
  const [main, secondaryA, secondaryB] = halo.screenshots

  return (
    <section className="halo" id="halo">
      <div className="container">
        <div className="halo-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {halo.sectionLabel}
          </motion.div>
          <div className="halo-intro">
            <div className="halo-header">
              <motion.div
                className="halo-headline-row"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                <h2>{halo.headline}</h2>
                <img
                  className="halo-linkedin"
                  src={halo.linkedinLogo}
                  alt=""
                  aria-hidden="true"
                />
              </motion.div>
              <motion.div
                className="halo-subtitle"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                {halo.subtitle}
              </motion.div>
              <motion.div
                className="tagline"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                The operating layer for <em>executive presence</em> on LinkedIn.
              </motion.div>
            </div>
            <motion.div
              className="halo-side"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              {halo.sideBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </div>

          {/* v8 delta item 10: asymmetric bento — main 2/3, two stacked 1/3. */}
          <motion.div
            className="halo-bento"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {main && (
              <motion.div className="halo-bento-main" variants={feat}>
                <img src={main.src} alt={main.alt} loading="lazy" />
              </motion.div>
            )}
            <div className="halo-bento-stack">
              {secondaryA && (
                <motion.div className="halo-bento-small" variants={feat}>
                  <img src={secondaryA.src} alt={secondaryA.alt} loading="lazy" />
                </motion.div>
              )}
              {secondaryB && (
                <motion.div className="halo-bento-small" variants={feat}>
                  <img src={secondaryB.src} alt={secondaryB.alt} loading="lazy" />
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="halo-features"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {halo.features.map((f) => (
              <motion.div key={f.num} className="halo-feat" variants={feat}>
                <div className="halo-feat-num">{f.num}</div>
                <h4>{f.heading}</h4>
                <p>{f.body}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="halo-cta-row"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            <div className="halo-cta-price">
              <span className="price">{halo.price}</span>
              <span className="sep">·</span>
              <span className="duration">{halo.duration}</span>
              <span className="note">{halo.priceNote}</span>
            </div>
            <a href={halo.cta.href} className="btn-primary">
              {halo.cta.label}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
