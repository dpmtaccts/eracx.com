import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
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

// v8 delta item 26: two testimonial cards replace the old 2x2 grid.
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
            <span className="accent">{clients.headline.italic}</span>
            {clients.headline.after}
          </motion.h2>
          <motion.p
            className="clients-sub"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {clients.sub}
          </motion.p>
          <motion.div
            className="testimonials-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {clients.items.map((t) => (
              <motion.div key={t.name} className="testimonial-card" variants={card}>
                <div className="testimonial-stars" aria-label={`${t.stars} out of 5`}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="testimonial-quote">
                  <span className="testimonial-quote-mark" aria-hidden="true">
                    "
                  </span>
                  <p>{t.quote}</p>
                </blockquote>
                <div className="testimonial-attribution">
                  <img
                    className="testimonial-photo"
                    src={t.photo}
                    alt={t.photoAlt}
                    loading="lazy"
                  />
                  <div className="testimonial-who">
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                  <img
                    className="testimonial-logo"
                    src={t.companyLogo}
                    alt={t.companyLogoAlt}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
