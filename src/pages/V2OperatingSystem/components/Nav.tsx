import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { nav } from '../content'
import ThemeToggle from './ThemeToggle'

type Props = {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}

// v8 delta item 19: nav adapts to the ground behind it. Over any section
// marked data-ground="dark" the nav gets a semi-dark backdrop + blur and
// its text inverts to cream. Over light sections it stays transparent with
// ink-dark text so the hero ground reads through.
export default function Nav({ theme, setTheme }: Props) {
  const [overDark, setOverDark] = useState(false)

  useEffect(() => {
    const threshold = 80 // rough nav height in px
    let raf = 0

    const check = () => {
      const darkSections = document.querySelectorAll<HTMLElement>('[data-ground="dark"]')
      let active = false
      darkSections.forEach((el) => {
        if (active) return
        const rect = el.getBoundingClientRect()
        if (rect.top <= threshold && rect.bottom > threshold) active = true
      })
      setOverDark(active)
    }

    const schedule = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        check()
      })
    }

    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <nav className={`v2-nav adaptive${overDark ? ' nav-over-dark' : ''}`}>
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
