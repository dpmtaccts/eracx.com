import { motion } from 'framer-motion'
import { system, type SystemComponent } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function System() {
  return (
    <section className="system" id="system">
      <div className="container">
        <div className="system-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {system.sectionLabel}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {system.headline.before}
            <span className="it">{system.headline.italic}</span>
            {system.headline.after}
          </motion.h2>
          <motion.p
            className="lede"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {system.lede}
          </motion.p>
          <motion.div
            className="components"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {system.components.map((c) => (
              <Component key={c.name} data={c} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Component({ data }: { data: SystemComponent }) {
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
  }
  return (
    <motion.div className="component" variants={item}>
      <div className="c-label">{data.label}</div>
      <div className="c-name">{data.name}</div>
      <div className="c-role">{data.role}</div>
      <div className="c-desc">{data.description}</div>
      <div className="c-visual">
        <Viz type={data.viz} />
      </div>
    </motion.div>
  )
}

function Viz({ type }: { type: SystemComponent['viz'] }) {
  if (type === 'river') {
    return (
      <div className="viz-river">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    )
  }
  if (type === 'map') {
    // 16 dots in a 4x8 half-grid; prototype uses 4 rows x 4 cols with hot/warm highlights.
    // Classes defined per position from the prototype.
    const classes = [
      '', 'warm', '', 'hot',
      '', '', 'warm', '',
      'hot', '', '', 'warm',
      '', 'hot', '', '',
    ]
    return (
      <div className="viz-map">
        {classes.map((cls, i) => (
          <span key={i} className={cls} />
        ))}
      </div>
    )
  }
  if (type === 'aux') {
    return (
      <div className="viz-aux">
        {[
          ['Acme Co.', 87],
          ['Helix', 62],
          ['Marlin', 41],
        ].map(([name, score]) => (
          <div key={name as string} className="viz-aux-row">
            <span>{name}</span>
            <span className="viz-aux-bar" />
            <span>{score}</span>
          </div>
        ))}
      </div>
    )
  }
  // mirror
  return (
    <div className="viz-mirror">
      {[
        ['G2 reviews', '28%'],
        ['Glassdoor', '19%'],
        ['Competitor pages', '17%'],
      ].map(([name, weight]) => (
        <div key={name} className="viz-mirror-row">
          <span>{name}</span>
          <span>{weight}</span>
        </div>
      ))}
    </div>
  )
}
