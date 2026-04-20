import { motion } from 'framer-motion'
import { hero } from '../content'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
          <motion.h1 variants={item}>
            {hero.headline.before}
            <span className="it">{hero.headline.italic}</span>
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
