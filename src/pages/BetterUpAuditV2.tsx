import { useEffect, useState } from 'react'
import { usePostHog } from '@posthog/react'
// v4 design system tokens. Scoped under `.v4-root` (applied below on the
// audit shell) so they coexist with other routes that ship their own theme.
import '../styles/v4-tokens.css'
import {
  FONT,
  ThemeContext,
  loadBetterUpFonts,
  useThemeState,
} from './betterup/theme'
import { SECTIONS } from './betterup/data/sections'
import { DataLayerProvider, useDataLayer, type DataLayer } from './betterup/dataLayer'
import { PasswordGate, isAuthed } from './betterup/PasswordGate'
import { startSectionTimeTracker } from './betterup/analytics'
import { InsightList } from './betterup/insights/InsightList'

/* BetterUp audit, v2.
   The seven-statement insight list, mounted at /audit/betterupv2.
   The original audit at /audit/betterup stays unchanged. */

function AuditShell({ eraMode }: { eraMode: boolean }) {
  void usePostHog()
  const theme = useThemeState()
  const [layer, setLayer] = useState<DataLayer>(eraMode ? 'era' : 'era-plus-bh')
  const page = eraMode ? 'era' : 'full'

  useEffect(() => {
    document.documentElement.style.background = theme.palette.bg
    document.body.style.background = theme.palette.bg
    document.body.style.color = theme.palette.text
  }, [theme.palette])

  useEffect(() => {
    const previous = document.title
    document.title = 'The Buyer View · v2'
    return () => {
      document.title = previous
    }
  }, [])

  useEffect(() => {
    const cleanup = startSectionTimeTracker(SECTIONS.map((s) => s.id), page)
    return cleanup
  }, [page])

  return (
    <ThemeContext.Provider value={theme}>
      <DataLayerProvider defaultLayer={eraMode ? 'era' : 'era-plus-bh'} showLayerToggle={eraMode}>
        <DataLayerSync layer={layer} setLayer={setLayer} />
        <div
          className="v4-root"
          style={{
            background: theme.palette.bg,
            minHeight: '100vh',
            color: theme.palette.text,
            fontFamily: FONT.body,
          }}
        >
          <InsightList />
        </div>
      </DataLayerProvider>
    </ThemeContext.Provider>
  )
}

function DataLayerSync({ layer, setLayer }: { layer: DataLayer; setLayer: (l: DataLayer) => void }) {
  const ctx = useDataLayer()
  useEffect(() => {
    if (ctx.layer !== layer) ctx.setLayer(layer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer])
  useEffect(() => {
    if (ctx.layer !== layer) setLayer(ctx.layer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.layer])
  return null
}

function BetterUpAuditV2Page({ eraMode }: { eraMode: boolean }) {
  const [authed, setAuthed] = useState(false)
  const page = eraMode ? 'era' : 'full'

  useEffect(() => {
    loadBetterUpFonts()
    if (isAuthed()) setAuthed(true)
  }, [])

  if (!authed) return <PasswordGate page={page} onAuth={() => setAuthed(true)} />
  return <AuditShell eraMode={eraMode} />
}

export default function BetterUpAuditV2() {
  return <BetterUpAuditV2Page eraMode={false} />
}

export function BetterUpAuditV2Era() {
  return <BetterUpAuditV2Page eraMode />
}
