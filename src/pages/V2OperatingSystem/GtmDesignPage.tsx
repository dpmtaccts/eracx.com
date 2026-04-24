import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './styles.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Close from './sections/Close'
import { gtmDesign } from './content'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'era-v2-theme'

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

// v8 delta round 3: /gtm-design standalone page.
// Copy sourced verbatim from the GTM Systems PDF in /docs/v8/. Uses the
// shared v8 Nav, Close section, and Footer so palette + nav adapt
// automatically. Three Loops framework section from the PDF is retired
// per item 27.
export default function GtmDesignPage() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const prev = document.title
    document.title = 'GTM Design · Fixed-scope GTM sprint · ERA'
    return () => {
      document.title = prev
    }
  }, [])

  const { hero, problem, gaps, deliverables, engagement, fit, close } = gtmDesign

  return (
    <div className="era-v2 gtm-design-page" data-theme={theme}>
      <Nav theme={theme} setTheme={setTheme} />

      {/* Hero — 2-col: headline + CTA on left, deliverables summary card on right. */}
      <section className="gtm-hero" data-ground="light">
        <div className="container">
          <div className="gtm-hero-grid">
            <motion.div
              className="gtm-hero-col"
              initial="hidden"
              animate="show"
              variants={stagger}
            >
              <motion.div className="gtm-hero-eyebrow" variants={fadeUp}>
                {hero.eyebrow}
              </motion.div>
              <motion.h1 variants={fadeUp} className="gtm-hero-headline">
                {hero.headline.before}
                <span className="accent">{hero.headline.italic}</span>
                {hero.headline.after}
              </motion.h1>
              <motion.p variants={fadeUp} className="gtm-hero-sub">
                {hero.sub}
              </motion.p>
              <motion.div variants={fadeUp} className="gtm-hero-cta-row">
                <a href={hero.cta.href} className="btn-primary">
                  {hero.cta.label} →
                </a>
                <span className="gtm-hero-meta">{hero.meta}</span>
              </motion.div>
            </motion.div>

            <motion.aside
              className="gtm-hero-summary"
              initial="hidden"
              animate="show"
              variants={fadeUp}
              aria-label="Deliverables summary"
            >
              <div className="gtm-hero-summary-head">
                <div className="gtm-hero-summary-eyebrow">{hero.summaryEyebrow}</div>
                <div className="gtm-hero-summary-line">{hero.summaryLine}</div>
              </div>
              <ul className="gtm-hero-summary-list">
                {hero.summaryItems.map((item) => (
                  <li key={item.num} className="gtm-hero-summary-item">
                    <span className="gtm-hero-summary-num">{item.num}</span>
                    <div className="gtm-hero-summary-body">
                      <div className="gtm-hero-summary-name">{item.name}</div>
                      <div className="gtm-hero-summary-detail">{item.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Problem framing. */}
      <section className="gtm-problem" data-ground="light">
        <div className="container-narrow">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {problem.eyebrow}
          </motion.div>
          <motion.h2
            className="section-h2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {problem.headline.before}
            <span className="accent">{problem.headline.italic}</span>
            {problem.headline.after}
          </motion.h2>
          <motion.p
            className="gtm-problem-sub"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {problem.sub}
          </motion.p>
        </div>
      </section>

      {/* Three gaps. */}
      <section className="gtm-gaps" data-ground="light">
        <div className="container">
          <div className="gtm-gaps-list">
            {gaps.map((gap) => (
              <motion.article
                key={gap.eyebrow}
                className="gtm-gap"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <div className="gtm-gap-eyebrow">{gap.eyebrow}</div>
                <h3 className="gtm-gap-title">{gap.title}</h3>
                <p className="gtm-gap-body">{gap.body}</p>
                <div className="gtm-gap-stat">
                  <div className="gtm-gap-stat-value">{gap.stat.value}</div>
                  <div className="gtm-gap-stat-line">{gap.stat.line}</div>
                  <div className="gtm-gap-stat-source">{gap.stat.source}</div>
                </div>
                <p className="gtm-gap-closer">{gap.closer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Four deliverables. */}
      <section className="gtm-deliverables" data-ground="light">
        <div className="container">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {deliverables.eyebrow}
          </motion.div>
          <motion.h2
            className="section-h2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {deliverables.headline.before}
            <span className="accent">{deliverables.headline.italic}</span>
            {deliverables.headline.after}
          </motion.h2>
          <motion.p
            className="gtm-deliverables-sub"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {deliverables.sub}
          </motion.p>
          <motion.div
            className="gtm-deliverables-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {deliverables.items.map((item) => (
              <motion.article
                key={item.num}
                className="gtm-deliverable-card"
                variants={fadeUp}
              >
                <div className="gtm-deliverable-num">{item.num}</div>
                <h3 className="gtm-deliverable-title">{item.title}</h3>
                <p className="gtm-deliverable-body">{item.body}</p>
                <div className="gtm-deliverable-meta">{item.meta}</div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How the engagement works — three-phase timeline. */}
      <section className="gtm-engagement" data-ground="dark">
        <div className="container">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {engagement.eyebrow}
          </motion.div>
          <motion.h2
            className="section-h2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {engagement.headline}
          </motion.h2>

          <div className="gtm-phase-rail" aria-hidden="true" />

          <motion.ol
            className="gtm-phase-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {engagement.phases.map((phase) => (
              <motion.li key={phase.num} className="gtm-phase-card" variants={fadeUp}>
                <div className="gtm-phase-label">{phase.label}</div>
                <div className="gtm-phase-when">{phase.when}</div>
                <div className="gtm-phase-num">{phase.num}</div>
                <h3 className="gtm-phase-title">{phase.title}</h3>
                <p className="gtm-phase-body">{phase.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Fit criteria. */}
      <section className="gtm-fit" data-ground="light">
        <div className="container">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {fit.eyebrow}
          </motion.div>
          <motion.h2
            className="section-h2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {fit.headline}
          </motion.h2>

          <motion.div
            className="gtm-fit-range"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            aria-label="Revenue range"
          >
            <div className="gtm-fit-range-labels">
              {fit.rangeLabels.map((label, i) => (
                <span key={label} className={`gtm-fit-range-label pos-${i}`}>
                  {label}
                </span>
              ))}
            </div>
            <div className="gtm-fit-range-bar">
              <span className="gtm-fit-range-active" />
            </div>
            <div className="gtm-fit-range-markers">
              {fit.rangeMarkers.map((m) => (
                <span key={m} className="gtm-fit-range-marker">
                  {m}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="gtm-fit-body-grid">
            <motion.p
              className="gtm-fit-body"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              {fit.body}
            </motion.p>
            <motion.div
              className="gtm-fit-checklist"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              <div className="gtm-fit-checklist-label">{fit.checklistLabel}</div>
              <ul>
                {fit.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to build the system? */}
      <section className="gtm-ready" data-ground="light">
        <div className="container-narrow">
          <motion.h2
            className="gtm-ready-headline"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {close.headline}
          </motion.h2>
          <motion.p
            className="gtm-ready-sub"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {close.sub}
          </motion.p>
          <motion.a
            href={close.cta.href}
            className="btn-primary"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {close.cta.label} →
          </motion.a>
        </div>
      </section>

      <Close />
      <Footer />
    </div>
  )
}
