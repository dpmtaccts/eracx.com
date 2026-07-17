import { useEffect, useState } from 'react'
import { usePostHog } from '@posthog/react'
// v4 design system tokens, scoped under `.v4-root` on the shell so this route
// coexists with the rest of the site.
import '../styles/v4-tokens.css'
import { FONT, ThemeContext, loadFonts, useThemeState } from './insuretech/theme'
import { PasswordGate, isAuthed } from './insuretech/PasswordGate'
import { Masthead, TocBar, Situation, DataLedger, Method, Rollup, AllPlayers, Footer } from './insuretech/sections'
import { Trajectory } from './insuretech/Trajectory'
import { InternalBrief } from './insuretech/InternalBrief'

/* The InsureTech Buyer View.
   An industry Buyer View for the insurance-technology core-platform market.
   Route: /buyerview/insuretech. Gated by email + access code. The body is an
   evidence assembly; every scoring judgment renders as a TO BUILD block. */

function Shell({ internal }: { internal: boolean }) {
  void usePostHog()
  const theme = useThemeState()

  useEffect(() => {
    document.documentElement.style.background = theme.palette.bg
    document.body.style.background = theme.palette.bg
    document.body.style.color = theme.palette.text
  }, [theme.palette])

  useEffect(() => {
    const prev = document.title
    document.title = 'The Buyer View · Insurance core platforms'
    return () => { document.title = prev }
  }, [])

  return (
    <ThemeContext.Provider value={theme}>
      <div className="v4-root" style={{ background: theme.palette.bg, minHeight: '100vh', color: theme.palette.text, fontFamily: FONT.body }}>
        <TocBar />
        <Masthead />
        {internal && <InternalBrief />}
        <Situation />
        <DataLedger />
        <Method />
        <Rollup />
        <Trajectory />
        <AllPlayers />
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default function InsureTechBuyerView() {
  const [authed, setAuthed] = useState(false)
  const [internal, setInternal] = useState(false)

  useEffect(() => {
    loadFonts()
    if (isAuthed()) setAuthed(true)
    // Internal partner brief is keyed to the browser, not the shared access
    // code. Visit ?internal=1 once to enable; ?internal=0 to clear.
    try {
      const v = new URLSearchParams(window.location.search).get('internal')
      if (v !== null) {
        if (v === '0' || v === 'off') localStorage.removeItem('insuretech-internal')
        else localStorage.setItem('insuretech-internal', '1')
      }
      setInternal(localStorage.getItem('insuretech-internal') === '1')
    } catch { /* private mode: default to hidden */ }
  }, [])

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <Shell internal={internal} />
}
