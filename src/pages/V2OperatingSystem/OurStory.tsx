import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './styles.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { ourStory } from './content'

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
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

// v8 delta item 25: /our-story page — preamble + manifesto + who runs it + CTA.
// Copy placeholders clearly marked TODO where Justin hasn't supplied text yet.
export default function OurStory() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const prev = document.title
    document.title = 'Our Story · ERA'
    return () => {
      document.title = prev
    }
  }, [])

  const { preamble, manifesto, whoRunsIt, cta } = ourStory

  // Split the manifesto body around the pull quotes. Current placement:
  // pull 1 after paragraph ~3, pull 2 after paragraph ~6. With placeholder
  // copy of only 3 paragraphs, both pulls fall at the end.
  const manifestoParagraphs = manifesto.body
  const pull1After = Math.min(3, Math.max(1, manifestoParagraphs.length - 1))
  const pull2After = Math.min(6, manifestoParagraphs.length)

  return (
    <div className="era-v2 our-story-page" data-theme={theme}>
      <Nav theme={theme} setTheme={setTheme} />

      {/* Section A — preamble + manifesto, cream ground */}
      <section className="our-story-manifesto" data-ground="light">
        <div className="container-narrow">
          <motion.div
            className="our-story-preamble"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p>{preamble.body}</p>
            <div className="our-story-preamble-sig">— {preamble.signature}</div>
          </motion.div>

          <div className="our-story-rule" aria-hidden="true" />

          <motion.div
            className="our-story-essay"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div className="our-story-eyebrow">{manifesto.eyebrow}</div>
            {manifestoParagraphs.map((p, i) => (
              <>
                <p key={`p-${i}`} className={i === 0 ? 'with-dropcap' : undefined}>
                  {p}
                </p>
                {i + 1 === pull1After && manifesto.pullQuotes[0] && (
                  <blockquote key="pull-1" className="our-story-pull">
                    {manifesto.pullQuotes[0]}
                  </blockquote>
                )}
                {i + 1 === pull2After && manifesto.pullQuotes[1] && (
                  <blockquote key="pull-2" className="our-story-pull">
                    {manifesto.pullQuotes[1]}
                  </blockquote>
                )}
              </>
            ))}

            <div className="our-story-signature">
              <span className="name">{manifesto.signature.name}</span>
              <span className="role">{manifesto.signature.role}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section B — Who runs it, dark ground */}
      <section className="our-story-bench" data-ground="dark">
        <div className="container">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {whoRunsIt.sectionLabel}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {whoRunsIt.headline}
          </motion.h2>

          <div className="our-story-profiles">
            {whoRunsIt.profiles
              .filter((p) => p.enabled)
              .map((p) => (
                <motion.div
                  key={p.name}
                  className="our-story-profile"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                >
                  <div className="our-story-portrait">
                    {p.imageSrc ? (
                      <img src={p.imageSrc} alt={p.imageAlt} loading="lazy" />
                    ) : (
                      <span>[TODO — headshot]</span>
                    )}
                  </div>
                  <div className="our-story-profile-name">{p.name}</div>
                  <div className="our-story-profile-role">{p.role}</div>
                  <div className="our-story-profile-credential">{p.credential}</div>
                  <div className="our-story-profile-bio">{p.bio}</div>
                </motion.div>
              ))}
          </div>

          <motion.div
            className="our-story-bench-closer"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {whoRunsIt.closer}
          </motion.div>
        </div>
      </section>

      {/* Section C — Ready to focus? CTA, cream ground */}
      <section className="our-story-cta-section" data-ground="light">
        <div className="container-narrow">
          <motion.h2
            className="our-story-cta-headline"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {cta.headline}
          </motion.h2>
          <motion.a
            href={cta.link.href}
            className="our-story-cta-link"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {cta.link.label} →
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
