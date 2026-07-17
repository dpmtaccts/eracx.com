import { useEffect, useState } from 'react'
import { usePostHog } from '@posthog/react'
// v4 design system tokens, scoped under `.v4-root` on the shell so this route
// coexists with the rest of the site.
import '../styles/v4-tokens.css'
import { FONT, ThemeContext, loadFonts, useThemeState } from './insuretech/theme'
import { PasswordGate, isAuthed } from './insuretech/PasswordGate'
import { Masthead, TocBar, Situation, DataLedger, Method, Rollup, AllPlayers, Footer } from './insuretech/sections'

/* The InsureTech Buyer View.
   An industry Buyer View for the insurance-technology core-platform market.
   Route: /buyerview/insuretech. Gated by email + access code. The body is an
   evidence assembly; every scoring judgment renders as a TO BUILD block. */

function Shell() {
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
        <Situation />
        <DataLedger />
        <Method />
        <Rollup />
        <AllPlayers />
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default function InsureTechBuyerView() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    loadFonts()
    if (isAuthed()) setAuthed(true)
  }, [])

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <Shell />
}
