import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { hero } from '../content'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

// v8 deltas items 17 + 18: replace the dot field with a playbook-maze motion
// system. Five invisible routes span the hero; a cluster of five flowing
// dots per route creates a leading head + fading trail. Values tuned per
// item 18: leading dot 0.5 opacity, durations slowed ~60%, only 5 routes
// rendered (routes 6/7 paths retained in <defs> for future use).
const ROUTES = [
  { id: 'route-1', d: 'M -5 12 H 22 V 8 H 55 V 18 H 78 V 12 H 105', dur: '28s', begin: '0s' },
  { id: 'route-2', d: 'M -5 22 H 15 V 32 H 40 V 22 H 68 V 38 H 105', dur: '34s', begin: '-4s' },
  { id: 'route-3', d: 'M -5 42 H 28 V 52 H 62 V 42 H 88 V 50 H 105', dur: '42s', begin: '-2s' },
  { id: 'route-4', d: 'M 35 -5 V 15 H 60 V 30 H 85 V 25 H 105', dur: '30s', begin: '-6s' },
  { id: 'route-5', d: 'M -5 30 H 8 V 45 H 30 V 30 H 50 V 20 H 72 V 8 H 105', dur: '38s', begin: '-1s' },
] as const

const DORMANT_ROUTES = [
  { id: 'route-6', d: 'M 15 65 V 48 H 42 V 58 H 70 V 42 H 105' },
  { id: 'route-7', d: 'M -5 55 H 22 V 42 H 50 V 55 H 75 V 35 H 95 V 20 H 105' },
] as const

const WAYPOINTS: [number, number][] = [
  [22, 8],
  [55, 18],
  [40, 22],
  [68, 38],
  [28, 52],
  [62, 42],
  [60, 15],
  [85, 25],
  [30, 30],
  [50, 20],
]

// Five dots per route: one leader + four trail dots at descending opacities.
// Each trail dot's begin offset relative to the route's own begin value.
const TRAIL = [
  { r: 0.4, opacity: 0.5, offset: 0 },
  { r: 0.36, opacity: 0.3, offset: 0.3 },
  { r: 0.32, opacity: 0.18, offset: 0.6 },
  { r: 0.28, opacity: 0.1, offset: 0.9 },
  { r: 0.25, opacity: 0.04, offset: 1.2 },
]

function beginFor(base: string, offset: number): string {
  // base looks like "0s" or "-4s" — shift by a negative offset seconds.
  const n = parseFloat(base)
  return `${n - offset}s`
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const watermarkY = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <section className="hero" ref={sectionRef} data-ground="light">
      <motion.div
        className="hero-watermark"
        style={reduceMotion ? undefined : { y: watermarkY }}
        aria-hidden="true"
      >
        PLAYBOOK
      </motion.div>

      <svg
        className="hero-maze"
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {ROUTES.map((r) => (
            <path key={r.id} id={r.id} d={r.d} />
          ))}
          {DORMANT_ROUTES.map((r) => (
            <path key={r.id} id={r.id} d={r.d} />
          ))}
        </defs>

        {/* Static route traces — the "board" that persists even when motion is paused. */}
        {ROUTES.map((r) => (
          <use key={`trace-${r.id}`} href={`#${r.id}`} className="route-line" />
        ))}

        {WAYPOINTS.map(([cx, cy], i) => (
          <circle key={`wp-${i}`} cx={cx} cy={cy} r={0.25} className="waypoint" />
        ))}

        {/* Flowing dots — five per route, comet-tail effect. Hidden under prefers-reduced-motion. */}
        {!reduceMotion &&
          ROUTES.map((r) => (
            <g key={`flow-${r.id}`}>
              {TRAIL.map((t, i) => (
                <circle
                  key={i}
                  r={t.r}
                  className="flow-dot"
                  fillOpacity={t.opacity}
                >
                  <animateMotion
                    dur={r.dur}
                    begin={beginFor(r.begin, t.offset)}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${r.id}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          ))}
      </svg>

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
