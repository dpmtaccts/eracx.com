import type { Dispatch, SetStateAction } from 'react'
import { nav } from '../content'
import ThemeToggle from './ThemeToggle'

type Props = {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}

export default function Nav({ theme, setTheme }: Props) {
  return (
    <nav className="v2-nav">
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
