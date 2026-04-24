import { motion } from 'framer-motion'
import { engage, type Tier } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } },
}

// v8 delta item 33j: 2x2 pricing card grid. Horizontal stacked-rows layout
// retired. One recommended tier (Revenue Signal Audit) gets a magenta top
// border, "Recommended" label, and magenta CTA fill. Feature bullets are
// blocked pending finalization from Justin — cards render without the
// bullet row until tier.features is populated.
export default function Engage() {
  return (
    <section className="entry" id="entry">
      <div className="container">
        <div className="entry-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {engage.sectionLabel}
          </motion.div>
          <motion.h2
            className="section-h2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {engage.headline.before}
            <span className="it">{engage.headline.italic}</span>
            {engage.headline.after}
          </motion.h2>

          <motion.div
            className="pricing-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {engage.tiers.map((t) => (
              <PricingCard key={t.name} tier={t} variants={card} />
            ))}
          </motion.div>

          <motion.div
            className="entry-note"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {engage.note}
          </motion.div>
          <motion.div
            className="entry-fit-line"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {engage.fitLine}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  tier,
  variants,
}: {
  tier: Tier
  variants: typeof fadeUp
}) {
  const hasFeatures = tier.features && tier.features.length > 0
  return (
    <motion.article
      className={`pricing-card${tier.recommended ? ' recommended' : ''}`}
      variants={variants}
    >
      {tier.recommended && (
        <div className="pricing-recommended-bar" aria-hidden="true" />
      )}
      {tier.recommended && (
        <div className="pricing-recommended-label">Recommended</div>
      )}
      <div className="pricing-card-head">
        <div className="pricing-card-name">{tier.name}</div>
        <div className="pricing-card-descriptor">{tier.descriptor}</div>
      </div>
      <div className="pricing-card-rule" aria-hidden="true" />
      <div className="pricing-card-price">
        <span className="pricing-card-price-value">{tier.price}</span>
        {tier.timing && (
          <span className="pricing-card-price-timing">{tier.timing}</span>
        )}
      </div>
      <p className="pricing-card-summary">{tier.summary}</p>
      {hasFeatures && (
        <ul className="pricing-card-features">
          {tier.features!.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
      <a
        href={tier.cta.href}
        className={`pricing-card-cta${tier.recommended ? ' primary' : ''}`}
      >
        {tier.cta.label} →
      </a>
    </motion.article>
  )
}
