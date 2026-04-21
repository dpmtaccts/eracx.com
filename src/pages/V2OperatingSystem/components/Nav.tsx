import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { nav } from '../content'
import ThemeToggle from './ThemeToggle'

type Props = {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}

export default function Nav({ theme, setTheme }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Nav gains chrome (blur + border) only after the hero has scrolled
    // past — the hero and nav share a continuous ground at the top.
    const computeThreshold = () => Math.max(320, window.innerHeight - 120)
    let threshold = computeThreshold()

    const onScroll = () => {
      setScrolled(window.scrollY > threshold)
    }
    const onResize = () => {
      threshold = computeThreshold()
      onScroll()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <nav className={`v2-nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#top" className="logo" aria-label="ERA — home">
        <img src="/assets/era_final.png" alt="ERA" />
      </a>
      <div className="nav-links">
        {nav.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="nav-right">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <a href={nav.cta.href} className="cta">
          {nav.cta.label}
        </a>
      </div>
    </nav>
  )
}
