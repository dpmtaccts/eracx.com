import { motion } from 'framer-motion'
import { hero } from '../content'

// v8 delta item 28: atmospheric drift replaces playbook-maze.
// v8 delta items 33a + 33i: hero eyebrow pill retired; secondary CTA dropped
// (audit requests now convert from the nav CTA). New entry-stagger cascade:
// headline 0ms → subhead 100ms → primary CTA 200ms → pillars 300ms.

const ease = [0.23, 1, 0.32, 1] as const
const makeFade = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay },
  },
})

const headline = makeFade(0)
const subhead = makeFade(0.1)
const primaryCta = makeFade(0.2)
const pillars = makeFade(0.3)

export default function Hero() {
  return (
    <section className="hero" data-ground="light">
      <div className="drift-layer" aria-hidden="true">
        <div className="drift-field drift-a" />
        <div className="drift-field drift-b" />
        <div className="drift-field drift-c" />
        <div className="drift-wash" />
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.h1 initial="hidden" animate="show" variants={headline}>
            {hero.headline.before}
            <span className="accent">{hero.headline.italic}</span>
            {hero.headline.after}
          </motion.h1>
          <motion.p
            className="sub"
            initial="hidden"
            animate="show"
            variants={subhead}
          >
            {hero.sub}
          </motion.p>
          <motion.div
            className="actions"
            initial="hidden"
            animate="show"
            variants={primaryCta}
          >
            <a href={hero.primary.href} className="btn-primary">
              {hero.primary.label}
            </a>
          </motion.div>
          <motion.ul
            className="hero-pillars"
            initial="hidden"
            animate="show"
            variants={pillars}
            aria-label="What ERA operates"
          >
            {hero.pillars.map((label) => (
              <li key={label} className="hero-pillar">
                <span className="hero-pillar-mark" aria-hidden="true">+</span>
                <span className="hero-pillar-label">{label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
