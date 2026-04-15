import { usePostHog } from '@posthog/react'
import { Callout, Gauge, Reveal } from './components'
import { FONT, colorForScore, useTheme } from './theme'
import { COMPANY, CORE_FINDING, HERO_GAUGES } from './data/executive'
import { CASCADE_LAYERS } from './data/cascade'
import { SIGNALS } from './data/signals'
import { AI_MIRROR_SCORE } from './data/aiMirror'
import { CONTACTS, CTA_BODY } from './data/build'
import { CHANNELS, GTM_COMPOSITE_SCORE } from './data/gtm'
import { PROJECTED_IMPACT } from './data/investment'

/* The condensed view: gauges, core finding, cascade scores, GTM composite,
   top 5 signals, AI mirror, projected impact, CTA. Renders inside the
   existing audit ThemeProvider. */
export function SummaryView() {
  const posthog = usePostHog()
  const { palette } = useTheme()
  const top5 = [...SIGNALS].sort((a, b) => a.alignment - b.alignment).slice(0, 5)

  return (
    <div style={{ background: palette.bg, color: palette.text, fontFamily: FONT.body }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 32px 120px' }}>

        {/* Header */}
        <Reveal>
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                fontFamily: FONT.body, fontSize: 12, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: palette.rust, marginBottom: 16,
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

        {/* Profile */}
        <Reveal>
          <div
            style={{
              background: palette.card, border: `1px solid ${palette.border}`,
              borderRadius: 6, padding: '24px 28px', marginBottom: 40,
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px 32px',
            }}
          >
            {([
              ['Founded', COMPANY.founded],
              ['Revenue', COMPANY.revenue],
              ['Valuation', COMPANY.valuation],
              ['Employees', COMPANY.employees],
              ['Primary buyer', COMPANY.primaryBuyer],
              ['Notable clients', COMPANY.notableClients],
            ] as [string, string][]).map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontFamily: FONT.body, fontSize: 10, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: palette.textDim, marginBottom: 4,
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
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16, justifyItems: 'center', marginBottom: 48,
            }}
          >
            {HERO_GAUGES.map((g) => (
              <Gauge key={g.label} score={g.score} label={g.label} description={g.description} size={140} />
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
              background: palette.card, border: `1px solid ${palette.border}`,
              borderRadius: 6, padding: '24px 28px', marginBottom: 48,
            }}
          >
            {CASCADE_LAYERS.map((l, i) => {
              const stroke = colorForScore(palette, l.score)
              const isBreak = l.status === 'Cascade Break'
              return (
                <div
                  key={l.number}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0',
                    borderBottom: i === CASCADE_LAYERS.length - 1 ? 'none' : `1px solid ${palette.border}`,
                  }}
                >
                  <span style={{ fontFamily: FONT.mono, fontSize: 12, color: palette.textDim, width: 24 }}>{l.number}</span>
                  <span style={{ fontFamily: FONT.display, fontSize: 16, color: palette.text, flex: 1 }}>{l.name}</span>
                  <div style={{ flex: 2, height: 6, background: palette.border, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${l.score}%`, height: '100%', background: stroke, transition: 'width 1s' }} />
                  </div>
                  <span
                    style={{
                      fontFamily: FONT.mono, fontSize: 14, color: stroke,
                      width: 32, textAlign: 'right', fontWeight: isBreak ? 600 : 400,
                    }}
                  >
                    {l.score}
                  </span>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* GTM composite */}
        <Reveal>
          <SectionLabel palette={palette}>GTM Signal Chain</SectionLabel>
          <div
            style={{
              background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 6,
              padding: '24px 28px', marginBottom: 48,
              display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
            }}
          >
            <Gauge score={GTM_COMPOSITE_SCORE} size={100} />
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.6, color: palette.textMuted, margin: 0 }}>
                Across six profiles closest to the buyer (CEO, marketing leadership, sales, account management,
                coaches, client champions), the conviction that drives the product does not show up where the
                buyer looks.
              </p>
              <div
                style={{
                  marginTop: 14, display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 8,
                }}
              >
                {CHANNELS.map((c) => (
                  <div key={c.id} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: FONT.mono, fontSize: 16, color: colorForScore(palette, c.score) }}>{c.score}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: palette.textDim, marginTop: 2 }}>
                      {c.tab}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Top 5 signal gaps */}
        <Reveal>
          <SectionLabel palette={palette}>Top 5 signal gaps</SectionLabel>
          <div
            style={{
              background: palette.card, border: `1px solid ${palette.border}`,
              borderRadius: 6, padding: '24px 28px', marginBottom: 48,
              display: 'flex', flexDirection: 'column', gap: 14,
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
              background: palette.card, border: `1px solid ${palette.border}`,
              borderRadius: 6, padding: '24px 28px', marginBottom: 48,
              display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
            }}
          >
            <Gauge score={AI_MIRROR_SCORE} size={100} />
            <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.6, color: palette.textMuted, margin: 0, flex: 1, minWidth: 240 }}>
              When a CHRO asks ChatGPT, Claude, or Perplexity about BetterUp, the answer balances product strength against organizational fracture. Net impression: strong product, questionable integrity, proceed with caution.
            </p>
          </div>
        </Reveal>

        {/* Projected impact */}
        <Reveal>
          <SectionLabel palette={palette}>If the signals connect</SectionLabel>
          <div
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 12, marginBottom: 48,
            }}
          >
            {PROJECTED_IMPACT.map((p) => {
              const delta = Math.round(((p.projected - p.current) / p.current) * 100)
              return (
                <div
                  key={p.label}
                  style={{
                    background: palette.card, border: `1px solid ${palette.border}`,
                    borderTop: `2px solid ${palette.rust}`, borderRadius: 4, padding: '18px 18px',
                  }}
                >
                  <div style={{ fontFamily: FONT.body, fontSize: 11, color: palette.textMuted, marginBottom: 10 }}>{p.label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: 14, color: palette.textDim, textDecoration: 'line-through' }}>{p.current}</span>
                    <span style={{ color: palette.rust }}>→</span>
                    <span style={{ fontFamily: FONT.mono, fontSize: 28, color: palette.rust, fontWeight: 500 }}>{p.projected}</span>
                  </div>
                  <div style={{ fontFamily: FONT.mono, fontSize: 11, color: palette.green, marginTop: 6 }}>+{delta}%</div>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div style={{ background: palette.text, color: palette.bg, borderRadius: 8, padding: '32px 36px' }}>
            <div
              style={{
                fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#D86A48', marginBottom: 14,
              }}
            >
              Next step
            </div>
            <p style={{ fontFamily: FONT.display, fontSize: 22, lineHeight: 1.4, margin: '0 0 24px' }}>{CTA_BODY}</p>
            <div
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {CONTACTS.map((c) => (
                <div key={c.email}>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, color: '#FFFFFF', fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 11, opacity: 0.6, marginTop: 4 }}>{c.role}</div>
                  <a
                    href={`mailto:${c.email}`}
                    onClick={() => posthog?.capture('audit_summary_cta_email_clicked', { contact_name: c.name, contact_role: c.role, email: c.email })}
                    style={{
                      display: 'inline-block', marginTop: 8, fontFamily: FONT.mono,
                      fontSize: 12, color: '#D86A48', textDecoration: 'none',
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
  )
}

function SectionLabel({ children, palette }: { children: React.ReactNode; palette: ReturnType<typeof useTheme>['palette'] }) {
  return (
    <div
      style={{
        fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: palette.rust, marginBottom: 12, fontWeight: 600,
      }}
    >
      {children}
    </div>
  )
}
