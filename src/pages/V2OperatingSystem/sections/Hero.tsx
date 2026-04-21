import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { hero } from '../content'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

// Deterministic pseudo-random so dots stay stable across renders.
function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

type Dot = {
  left: number          // percent
  top: number           // percent
  size: number          // px
  opacity: number
  duration: number      // s
  delay: number         // s
  shiftY: number        // px drift per cycle
}

function generateDots(count: number): Dot[] {
  const rand = mulberry32(42)
  return Array.from({ length: count }, () => {
    // Bias concentration toward lower-left and upper-right corners.
    const corner = rand() > 0.5
    const biasX = corner ? rand() * 0.35 : 0.55 + rand() * 0.45
    const biasY = corner ? 0.55 + rand() * 0.45 : rand() * 0.45
    return {
      left: biasX * 100,
      top: biasY * 100,
      size: 2 + rand() * 1.5,
      opacity: 0.15 + rand() * 0.2,
      duration: 4 + rand() * 4,
      delay: rand() * -6,
      shiftY: 3 + rand() * 5,
    }
  })
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  // Subtle parallax: watermark drifts up 12% as the hero scrolls out.
  const watermarkY = useTransform(scrollY, [0, 600], [0, -80])

  const dots = useMemo(() => generateDots(52), [])

  return (
    <section className="hero" ref={sectionRef}>
      <motion.div
        className="hero-watermark"
        style={reduceMotion ? undefined : { y: watermarkY }}
        aria-hidden="true"
      >
        PLAYBOOK
      </motion.div>

      <div className="hero-dots" aria-hidden="true">
        {dots.map((d, i) => (
          <span
            key={i}
            className={`hero-dot${reduceMotion ? ' static' : ''}`}
            style={
              {
                left: `${d.left}%`,
                top: `${d.top}%`,
                width: d.size,
                height: d.size,
                opacity: d.opacity,
                '--shift-y': `${d.shiftY}px`,
                animationDuration: `${d.duration}s`,
                animationDelay: `${d.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="container">
        <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
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
