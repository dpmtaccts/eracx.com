import { useEffect, useState } from 'react'
import './styles.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import ProofStrip from './sections/ProofStrip'
import Intro from './sections/Intro'
import Playbook from './sections/Playbook'
import Loops from './sections/Loops'
import SignalLibrary from './sections/SignalLibrary'
import SignalMap from './sections/SignalMap'
import Aux from './sections/Aux'
import AiMirror from './sections/AiMirror'
import Audit from './sections/Audit'
import Integrations from './sections/Integrations'
import Halo from './sections/Halo'
import Expect from './sections/Expect'
import Clients from './sections/Clients'
import Engage from './sections/Engage'
import Founder from './sections/Founder'
import Close from './sections/Close'

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
      <ProofStrip />
      <Intro />
      <Playbook />
      <Loops />
      <SignalLibrary />
      <SignalMap />
      <Aux />
      <AiMirror />
      <Audit />
      <Integrations />
      <Halo />
      <Expect />
      <Clients />
      <Engage />
      <Founder />
      <Close />
      <Footer />
    </div>
  )
}
