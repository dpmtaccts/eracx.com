import { motion } from 'framer-motion'
import { hero } from '../content'

// v8 delta item 28: atmospheric drift replaces playbook-maze.
// Three blurred radial-gradient fields drift behind the hero content;
// the PLAYBOOK watermark and the seven-route maze SVG are retired.
// Motion respects prefers-reduced-motion via CSS (animations paused, fields
// remain as static gradients).

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
}

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
        <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
          <motion.div className="hero-eyebrow-chip" variants={item}>
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            The operating layer
          </motion.div>
          <motion.h1 variants={item}>
            {hero.headline.before}
            <span className="accent">{hero.headline.italic}</span>
            {hero.headline.after}
          </motion.h1>
          <motion.p className="sub" variants={item}>
            {hero.sub}
          </motion.p>
          <motion.div className="actions" variants={item}>
            <a href={hero.primary.href} className="btn-primary">
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className="btn-secondary">
              {hero.secondary.label}
            </a>
          </motion.div>
          <motion.div className="logo-strip" variants={item}>
            <span className="label">{hero.clientsLabel}</span>
            {hero.clients.join(' · ')}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
