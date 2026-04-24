import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './styles.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Halo from './sections/Halo'

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

// v8 delta: standalone /halo page. Reuses the homepage Halo section so
// copy, bento, and pricing stay in one place. Adds a page-level intro so
// the link from the nav lands on a self-contained surface rather than
// scrolling to an in-page anchor.
export default function HaloPage() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const prev = document.title
    document.title = 'Halo · The LinkedIn operating layer · ERA'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="era-v2 halo-page" data-theme={theme}>
      <Nav theme={theme} setTheme={setTheme} />

      <section className="halo-page-hero" data-ground="light">
        <div className="container-narrow">
          <motion.div
            className="section-label"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            Halo
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="stub-headline"
          >
            The LinkedIn operating layer for executives who <span className="accent">can&apos;t post on a schedule.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="stub-body"
          >
            Voice-tuned content, engagement scoring, and warm-outreach plays operated on your behalf. Plugs into the Signal River. Ships weekly.
          </motion.p>
        </div>
      </section>

      <Halo />

      <Footer />
    </div>
  )
}
