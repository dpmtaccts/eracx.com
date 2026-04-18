import { useEffect, useState } from 'react'
import './styles.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Ghost from './sections/Ghost'
import Stats from './sections/Stats'
import Playbook from './sections/Playbook'
import System from './sections/System'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'era-v2-theme'

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export default function V2OperatingSystem() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const prev = document.title
    document.title = 'ERA — The modern B2B playbook, operated.'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="era-v2" data-theme={theme}>
      <Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <Ghost />
      <Stats />
      <Playbook />
      <System />
      <Footer />
    </div>
  )
}
