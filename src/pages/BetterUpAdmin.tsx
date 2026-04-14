import { useEffect, useState } from 'react'
import { getSupabase } from '../lib/supabase'
import { FONT, LIGHT } from './betterup/theme'

const ADMIN_PASSWORD = 'eraadmin2026'
const ADMIN_KEY = 'betterup-audit-admin-auth'

interface AnalyticsRow {
  id: string
  email: string
  event_type: string
  event_data: string | null
  page: string
  created_at: string
}

interface EmailSummary {
  email: string
  firstSeen: string
  lastSeen: string
  totalEvents: number
  pages: Set<string>
  sectionsViewed: Set<string>
  sectionTime: Record<string, number> // seconds
  cardsExpanded: Set<string>
  tabsClicked: string[]
  maxScrollDepth: number
  totalSessionSeconds: number
  themeToggles: number
  layerToggles: number
}

function summarize(rows: AnalyticsRow[]): EmailSummary[] {
  const map = new Map<string, EmailSummary>()
  for (const r of rows) {
    let s = map.get(r.email)
    if (!s) {
      s = {
        email: r.email,
        firstSeen: r.created_at,
        lastSeen: r.created_at,
        totalEvents: 0,
        pages: new Set(),
        sectionsViewed: new Set(),
        sectionTime: {},
        cardsExpanded: new Set(),
        tabsClicked: [],
        maxScrollDepth: 0,
        totalSessionSeconds: 0,
        themeToggles: 0,
        layerToggles: 0,
      }
      map.set(r.email, s)
    }
    s.totalEvents++
    s.pages.add(r.page)
    if (r.created_at < s.firstSeen) s.firstSeen = r.created_at
    if (r.created_at > s.lastSeen) s.lastSeen = r.created_at

    switch (r.event_type) {
      case 'section_view':
        if (r.event_data) s.sectionsViewed.add(r.event_data)
        break
      case 'section_time': {
        // event_data format: "sectionId:seconds"
        if (r.event_data) {
          const [id, secStr] = r.event_data.split(':')
          const sec = Number(secStr) || 0
          s.sectionTime[id] = Math.max(s.sectionTime[id] ?? 0, sec)
        }
        break
      }
      case 'card_expand':
        if (r.event_data) s.cardsExpanded.add(r.event_data)
        break
      case 'tab_click':
        if (r.event_data) s.tabsClicked.push(r.event_data)
        break
      case 'scroll_depth': {
        const n = Number(r.event_data) || 0
        if (n > s.maxScrollDepth) s.maxScrollDepth = n
        break
      }
      case 'session_duration': {
        const n = Number(r.event_data) || 0
        if (n > s.totalSessionSeconds) s.totalSessionSeconds = n
        break
      }
      case 'theme_toggle':
        s.themeToggles++
        break
      case 'layer_toggle':
        s.layerToggles++
        break
    }
  }
  return Array.from(map.values()).sort((a, b) => (a.lastSeen < b.lastSeen ? 1 : -1))
}

function AdminGate({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const submit = () => {
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, '1')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }
  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 360, width: '100%', textAlign: 'center', fontFamily: FONT.body }}>
        <div style={{ fontFamily: FONT.body, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: LIGHT.textMuted, marginBottom: 18 }}>
          Audit analytics
        </div>
        <div style={{ fontFamily: FONT.display, fontSize: 32, color: LIGHT.text, marginBottom: 28, fontStyle: 'italic' }}>
          Admin
        </div>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Admin password"
          style={{
            width: '100%', padding: '14px 18px', background: '#FFFFFF',
            border: `1px solid ${error ? LIGHT.red : LIGHT.border}`,
            borderRadius: 4, fontFamily: FONT.body, fontSize: 15, color: LIGHT.text,
            outline: 'none', marginBottom: 12, boxSizing: 'border-box',
          }}
        />
        <button
          onClick={submit}
          style={{
            width: '100%', padding: 14, background: LIGHT.rust, color: '#FFFFFF',
            border: 'none', borderRadius: 4, fontFamily: FONT.body, fontSize: 13,
            letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600,
          }}
        >
          Enter
        </button>
      </div>
    </div>
  )
}

function fmtSeconds(s: number): string {
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}m ${r}s`
}

function AdminDashboard() {
  const [rows, setRows] = useState<AnalyticsRow[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const sb = getSupabase()
    if (!sb) {
      setErr('Supabase not configured')
      setLoading(false)
      return
    }
    const { data, error } = await sb
      .from('betterup_audit_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10000)
    if (error) {
      setErr(error.message)
    } else {
      setRows(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    void load()
  }, [])

  const summaries = summarize(rows)

  return (
    <div style={{ background: LIGHT.bg, minHeight: '100vh', color: LIGHT.text, fontFamily: FONT.body, padding: '40px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: LIGHT.rust, marginBottom: 8 }}>
              BetterUp Audit Analytics
            </div>
            <h1 style={{ fontFamily: FONT.display, fontSize: 36, margin: 0, fontWeight: 400 }}>
              {summaries.length} {summaries.length === 1 ? 'visitor' : 'visitors'}
            </h1>
          </div>
          <button
            onClick={load}
            style={{
              background: 'transparent', border: `1px solid ${LIGHT.border}`,
              padding: '8px 16px', borderRadius: 4, cursor: 'pointer',
              fontFamily: FONT.mono, fontSize: 12, color: LIGHT.text,
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {loading && <div style={{ color: LIGHT.textMuted }}>Loading…</div>}
        {err && <div style={{ color: LIGHT.red }}>{err}</div>}

        {!loading && !err && summaries.length === 0 && (
          <div style={{ color: LIGHT.textMuted, padding: 32, background: LIGHT.card, border: `1px solid ${LIGHT.border}`, borderRadius: 6 }}>
            No visits yet.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {summaries.map((s) => (
            <div
              key={s.email}
              style={{
                background: LIGHT.card,
                border: `1px solid ${LIGHT.border}`,
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() => setExpanded(expanded === s.email ? null : s.email)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr auto',
                  padding: '16px 20px',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: 12,
                  fontSize: 13,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: LIGHT.text }}>{s.email}</div>
                  <div style={{ fontSize: 11, color: LIGHT.textDim, marginTop: 2 }}>
                    {Array.from(s.pages).join(' · ')}
                  </div>
                </div>
                <Stat label="Last seen" value={new Date(s.lastSeen).toLocaleString()} small />
                <Stat label="Sections" value={`${s.sectionsViewed.size}/8`} />
                <Stat label="Time" value={fmtSeconds(s.totalSessionSeconds || Object.values(s.sectionTime).reduce((a, b) => a + b, 0))} />
                <Stat label="Scroll" value={`${s.maxScrollDepth}%`} />
                <Stat label="Cards" value={String(s.cardsExpanded.size)} />
                <span style={{ fontFamily: FONT.mono, color: LIGHT.textMuted }}>
                  {expanded === s.email ? '−' : '+'}
                </span>
              </div>
              {expanded === s.email && (
                <div style={{ borderTop: `1px solid ${LIGHT.border}`, padding: '20px 24px', background: LIGHT.cardAlt }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                    <Detail label="Time per section">
                      {Object.entries(s.sectionTime).length === 0 && <Empty />}
                      {Object.entries(s.sectionTime).map(([id, sec]) => (
                        <Row key={id} k={id} v={fmtSeconds(sec)} />
                      ))}
                    </Detail>
                    <Detail label="Cards expanded">
                      {s.cardsExpanded.size === 0 && <Empty />}
                      {Array.from(s.cardsExpanded).map((c) => <Row key={c} k={c} v="" />)}
                    </Detail>
                    <Detail label="GTM tabs clicked">
                      {s.tabsClicked.length === 0 && <Empty />}
                      {s.tabsClicked.map((t, i) => <Row key={i} k={t} v="" />)}
                    </Detail>
                    <Detail label="Other">
                      <Row k="First seen" v={new Date(s.firstSeen).toLocaleString()} />
                      <Row k="Total events" v={String(s.totalEvents)} />
                      <Row k="Theme toggles" v={String(s.themeToggles)} />
                      <Row k="Layer toggles" v={String(s.layerToggles)} />
                    </Detail>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIGHT.textDim, marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontFamily: small ? FONT.body : FONT.mono, fontSize: small ? 12 : 14, color: LIGHT.text }}>
        {value}
      </div>
    </div>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIGHT.rust, fontWeight: 600, marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12, padding: '2px 0' }}>
      <span style={{ color: LIGHT.text }}>{k}</span>
      {v && <span style={{ fontFamily: FONT.mono, color: LIGHT.textMuted }}>{v}</span>}
    </div>
  )
}

function Empty() {
  return <div style={{ fontSize: 11, color: LIGHT.textDim, fontStyle: 'italic' }}>none</div>
}

export default function BetterUpAdmin() {
  const [authed, setAuthed] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_KEY) === '1') setAuthed(true)
  }, [])
  if (!authed) return <AdminGate onAuth={() => setAuthed(true)} />
  return <AdminDashboard />
}
