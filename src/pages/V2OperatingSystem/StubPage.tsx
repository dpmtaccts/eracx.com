import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './styles.css'
import Nav from './components/Nav'
import Footer from './components/Footer'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'era-v2-theme'

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

type Props = {
  eyebrow: string
  headline: string
  body: string
  title: string
  primaryCta?: { label: string; href: string; internal?: boolean }
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } },
}

// v8 delta item 30: round-4 stub for /why-era, /free-tools, /contact.
// Minimal page: Nav + centered copy + CTA back to the homepage close form.
export default function StubPage({ eyebrow, headline, body, title, primaryCta }: Props) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const prev = document.title
    document.title = `${title} · ERA`
    return () => {
      document.title = prev
    }
  }, [title])

  const cta = primaryCta ?? { label: 'Request an audit', href: '/#entry', internal: true }

  return (
    <div className="era-v2 stub-page" data-theme={theme}>
      <Nav theme={theme} setTheme={setTheme} />

      <section className="stub-hero" data-ground="light">
        <div className="container-narrow">
          <motion.div
            className="section-label"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            {eyebrow}
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="stub-headline"
          >
            {headline}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="stub-body"
          >
            {body}
          </motion.p>
          <motion.div
            className="stub-cta-row"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            {cta.internal ? (
              <Link to={cta.href} className="btn-primary">
                {cta.label}
              </Link>
            ) : (
              <a href={cta.href} className="btn-primary">
                {cta.label}
              </a>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
