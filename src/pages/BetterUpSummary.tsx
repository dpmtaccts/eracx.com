import { useEffect, useState } from 'react'
import { Callout, Gauge, Reveal } from './betterup/components'
import { FONT, ThemeContext, colorForScore, loadBetterUpFonts, useThemeState } from './betterup/theme'
import { COMPANY, CORE_FINDING, HERO_GAUGES } from './betterup/data/executive'
import { CASCADE_LAYERS } from './betterup/data/cascade'
import { SIGNALS } from './betterup/data/signals'
import { AI_MIRROR_SCORE } from './betterup/data/aiMirror'
import { CONTACTS, CTA_BODY } from './betterup/data/build'

const SESSION_KEY = 'betterup-audit-auth'
const PASSWORD = 'transformation'

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const submit = () => {
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F7F5F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 360, width: '100%', textAlign: 'center', fontFamily: FONT.body }}>
        <img src="/images/betterup/bu_logo_black.svg" alt="BetterUp" style={{ height: 36, marginBottom: 32 }} />
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Password"
          style={{
            width: '100%',
            padding: '14px 18px',
            background: '#FFFFFF',
            border: `1px solid ${error ? '#C84438' : '#E8E4DE'}`,
            borderRadius: 4,
            fontSize: 15,
            outline: 'none',
            marginBottom: 12,
          }}
        />
        <button
          onClick={submit}
          style={{
            width: '100%',
            padding: 14,
            background: '#C85A3A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 4,
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Enter
        </button>
      </div>
    </div>
  )
}

function SummaryShell() {
  const theme = useThemeState()
  const { palette } = theme

  useEffect(() => {
    document.body.style.background = palette.bg
    document.body.style.color = palette.text
  }, [palette])

  const top5 = [...SIGNALS].sort((a, b) => a.alignment - b.alignment).slice(0, 5)

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ background: palette.bg, color: palette.text, fontFamily: FONT.body, minHeight: '100vh' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 32px 96px' }}>
          {/* Header */}
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: 12,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: palette.rust,
                  marginBottom: 16,
                }}
              >
                Revenue Signal Audit · Summary
              </div>
              <img
                src="/images/betterup/bu_logo_black.svg"
                alt="BetterUp"
                style={{ height: 48, display: 'block', marginBottom: 12 }}
              />
              <div style={{ fontFamily: FONT.mono, fontSize: 13, color: palette.textMuted }}>
                {COMPANY.url} · {COMPANY.date}
              </div>
            </div>
          </Reveal>

          {/* Company profile */}
          <Reveal>
            <div
              style={{
                background: palette.card,
                border: `1px solid ${palette.border}`,
                borderRadius: 6,
                padding: '24px 28px',
                marginBottom: 40,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px 32px',
              }}
            >
              {[
                ['Founded', COMPANY.founded],
                ['Revenue', COMPANY.revenue],
                ['Valuation', COMPANY.valuation],
                ['Employees', COMPANY.employees],
                ['Primary buyer', COMPANY.primaryBuyer],
                ['Notable clients', COMPANY.notableClients],
              ].map(([k, v]) => (
                <div key={k}>
                  <div
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: palette.textDim,
                      marginBottom: 4,
                    }}
                  >
                    {k}
                  </div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, color: palette.text, lineHeight: 1.4 }}>{v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Hero gauges */}
          <Reveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
                justifyItems: 'center',
                marginBottom: 48,
              }}
            >
              {HERO_GAUGES.map((g) => (
                <Gauge key={g.label} score={g.score} label={g.label} size={140} />
              ))}
            </div>
          </Reveal>

          {/* Core finding */}
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <Callout tone="rust">{CORE_FINDING}</Callout>
            </div>
          </Reveal>

          {/* Cascade scores */}
          <Reveal>
            <SectionLabel palette={palette}>Brand Conviction Cascade</SectionLabel>
            <div
              style={{
                background: palette.card,
                border: `1px solid ${palette.border}`,
                borderRadius: 6,
                padding: '24px 28px',
                marginBottom: 48,
              }}
            >
              {CASCADE_LAYERS.map((l, i) => {
                const stroke = colorForScore(palette, l.score)
                const isBreak = l.status === 'Cascade Break'
                return (
                  <div
                    key={l.number}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '12px 0',
                      borderBottom: i === CASCADE_LAYERS.length - 1 ? 'none' : `1px solid ${palette.border}`,
                    }}
                  >
                    <span style={{ fontFamily: FONT.mono, fontSize: 12, color: palette.textDim, width: 24 }}>{l.number}</span>
                    <span style={{ fontFamily: FONT.display, fontSize: 16, color: palette.text, flex: 1 }}>{l.name}</span>
                    <div
                      style={{
                        flex: 2,
                        height: 6,
                        background: palette.border,
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${l.score}%`,
                          height: '100%',
                          background: stroke,
                          transition: 'width 1s',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 14,
                        color: stroke,
                        width: 32,
                        textAlign: 'right',
                        fontWeight: isBreak ? 600 : 400,
                      }}
                    >
                      {l.score}
                    </span>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* Top 5 signal gaps */}
          <Reveal>
            <SectionLabel palette={palette}>Top 5 signal gaps</SectionLabel>
            <div
              style={{
                background: palette.card,
                border: `1px solid ${palette.border}`,
                borderRadius: 6,
                padding: '24px 28px',
                marginBottom: 48,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              {top5.map((s) => {
                const c = s.alignment < 26 ? palette.red : s.alignment <= 50 ? palette.amber : palette.sky
                return (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: 14, color: c, width: 40 }}>{s.alignment}%</span>
                    <span style={{ fontFamily: FONT.body, fontSize: 14, color: palette.text, fontWeight: 600, minWidth: 160 }}>
                      {s.name}
                    </span>
                    <span style={{ fontFamily: FONT.body, fontSize: 13, color: palette.textMuted, flex: 1 }}>
                      {s.pipelineImpact}
                    </span>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* AI Mirror */}
          <Reveal>
            <SectionLabel palette={palette}>The AI Mirror</SectionLabel>
            <div
              style={{
                background: palette.card,
                border: `1px solid ${palette.border}`,
                borderRadius: 6,
                padding: '24px 28px',
                marginBottom: 48,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                flexWrap: 'wrap',
              }}
            >
              <Gauge score={AI_MIRROR_SCORE} size={100} />
              <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.6, color: palette.textMuted, margin: 0, flex: 1, minWidth: 240 }}>
                When a CHRO asks ChatGPT, Claude, or Perplexity about BetterUp, the answer balances product strength against organizational fracture. Net impression: strong product, questionable integrity, proceed with caution.
              </p>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div
              style={{
                background: palette.text,
                color: palette.bg,
                borderRadius: 8,
                padding: '32px 36px',
              }}
            >
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#D86A48',
                  marginBottom: 14,
                }}
              >
                Next step
              </div>
              <p style={{ fontFamily: FONT.display, fontSize: 22, lineHeight: 1.4, margin: '0 0 24px' }}>{CTA_BODY}</p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 16,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {CONTACTS.map((c) => (
                  <div key={c.email}>
                    <div style={{ fontFamily: FONT.body, fontSize: 13, color: '#FFFFFF', fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 11, opacity: 0.6, marginTop: 4 }}>{c.role}</div>
                    <a
                      href={`mailto:${c.email}`}
                      style={{
                        display: 'inline-block',
                        marginTop: 8,
                        fontFamily: FONT.mono,
                        fontSize: 12,
                        color: '#D86A48',
                        textDecoration: 'none',
                      }}
                    >
                      {c.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

function SectionLabel({ children, palette }: { children: React.ReactNode; palette: ReturnType<typeof useThemeState>['palette'] }) {
  return (
    <div
      style={{
        fontFamily: FONT.body,
        fontSize: 11,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: palette.rust,
        marginBottom: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  )
}

export default function BetterUpSummary() {
  const [authed, setAuthed] = useState(false)
  useEffect(() => {
    loadBetterUpFonts()
    if (sessionStorage.getItem(SESSION_KEY) === '1') setAuthed(true)
  }, [])
  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <SummaryShell />
}
