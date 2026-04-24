import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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
// v8 delta item 30: hamburger + right-slide drawer below 768px. Six nav
// items stacked vertically, CTA full-width at the bottom of the drawer.
export default function Nav({ theme, setTheme }: Props) {
  const [overDark, setOverDark] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

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

  // Close drawer on route change so navigating inside the drawer feels right.
  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  const renderLink = (link: { label: string; href: string }, opts?: { onClick?: () => void }) =>
    link.href.startsWith('#') ? (
      <a key={link.href} href={link.href} onClick={opts?.onClick}>
        {link.label}
      </a>
    ) : (
      <Link key={link.href} to={link.href} onClick={opts?.onClick}>
        {link.label}
      </Link>
    )

  return (
    <>
      <nav className={`v2-nav adaptive${overDark ? ' nav-over-dark' : ''}`}>
        <a href="#top" className="logo" aria-label="ERA — home">
          <img src="/assets/era_final.png" alt="ERA" />
        </a>
        <div className="nav-links">
          {nav.links.map((link) => renderLink(link))}
        </div>
        <div className="nav-right">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <a href={nav.cta.href} className="cta">
            {nav.cta.label}
          </a>
          <button
            type="button"
            className="nav-hamburger"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="v2-nav-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={24} strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer. Rendered in the React tree always; CSS handles the
          slide + visibility transition via .nav-drawer-backdrop.open. */}
      <div
        className={`nav-drawer-backdrop${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />
      <aside
        id="v2-nav-drawer"
        className={`nav-drawer${drawerOpen ? ' open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <div className="nav-drawer-head">
          <button
            type="button"
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <X size={24} strokeWidth={1.75} />
          </button>
        </div>
        <nav className="nav-drawer-links" aria-label="Mobile">
          {nav.links.map((link) =>
            renderLink(link, { onClick: () => setDrawerOpen(false) }),
          )}
        </nav>
        <div className="nav-drawer-cta">
          <a
            href={nav.cta.href}
            className="cta"
            onClick={() => setDrawerOpen(false)}
          >
            {nav.cta.label}
          </a>
        </div>
      </aside>
    </>
  )
}
