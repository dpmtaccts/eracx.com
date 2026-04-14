import { useEffect, useState } from 'react'
import {
  Callout,
  Gauge,
  MetricCard,
  ProfileCard,
  Reveal,
  Section,
  SectionHeader,
  StepperNav,
} from './betterup/components'
import {
  FONT,
  ThemeContext,
  loadBetterUpFonts,
  useThemeState,
} from './betterup/theme'
import {
  COMPANY,
  CORE_FINDING_PARAGRAPHS,
  HERO_GAUGES,
  PULL_QUOTE_1,
  PULL_QUOTE_2,
  STRENGTHS,
  VULNERABILITIES,
} from './betterup/data/executive'
import {
  ACTUALLY_SAYS,
  AI_MIRROR_CONTEXT,
  AI_MIRROR_SCORE,
  TEST_QUERIES,
  WANTS_TO_SAY,
  WHY_IT_MATTERS,
} from './betterup/data/aiMirror'
import { SECTIONS } from './betterup/data/sections'
import { AudienceSection, BuildSection, CascadeSection, GTMSection, InvestmentSection, SignalsSection } from './betterup/sections'
import { DataLayerProvider, useDataLayer, type DataLayer } from './betterup/dataLayer'
import { PasswordGate, isAuthed } from './betterup/PasswordGate'
import { startSectionTimeTracker, track } from './betterup/analytics'

/* ──────────────────────────────────────────────
   Section 1: Executive Summary
   ────────────────────────────────────────────── */
function ExecutiveSummary() {
  return (
    <Section id="summary">
      <Reveal>
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C85A3A',
            marginBottom: 16,
          }}
        >
          Revenue Signal Audit
        </div>
        <img
          src="/images/betterup/bu_logo_black.svg"
          alt="BetterUp"
          style={{ height: 'clamp(56px, 8vw, 96px)', width: 'auto', display: 'block', marginTop: 8 }}
        />
        <h1 style={{ position: 'absolute', left: -9999 }}>BetterUp</h1>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 13,
            marginTop: 16,
            opacity: 0.7,
          }}
        >
          {COMPANY.url} · {COMPANY.date}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <CompanyProfile />
      </Reveal>

      <Reveal delay={0.15}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginTop: 56,
            justifyItems: 'center',
          }}
        >
          {HERO_GAUGES.map((g) => (
            <Gauge key={g.label} score={g.score} label={g.label} description={g.description} size={170} />
          ))}
        </div>
      </Reveal>

      <CoreFindingEditorial />

      <div style={{ height: 96 }} />

      <Reveal delay={0.1}>
        <StrengthsVulnerabilities />
      </Reveal>
    </Section>
  )
}

function CoreFindingEditorial() {
  const beforePullQuote1 = CORE_FINDING_PARAGRAPHS.slice(0, 3)
  const afterPullQuote1 = CORE_FINDING_PARAGRAPHS.slice(3)

  // Break out of the Section container's 32px horizontal padding to make this feel
  // like a band running across the page.
  return (
    <div
      style={{
        background: '#F0EDEA',
        marginTop: 112,
        marginLeft: 'calc(-1 * (50vw - 50%))',
        marginRight: 'calc(-1 * (50vw - 50%))',
        paddingLeft: 'calc(50vw - 50%)',
        paddingRight: 'calc(50vw - 50%)',
        paddingTop: 96,
        paddingBottom: 96,
        position: 'relative',
      }}
    >
      {/* Inner column for body text */}
      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
        {/* Section number kicker */}
        <Reveal>
          <div style={{ position: 'relative', marginBottom: 32 }}>
            <div
              style={{
                width: 64,
                height: 2,
                background: '#C85A3A',
                marginBottom: 24,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontStyle: 'italic',
                  fontSize: 'clamp(72px, 9vw, 112px)',
                  color: '#C85A3A',
                  opacity: 0.18,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                }}
              >
                01
              </span>
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C85A3A',
                  fontWeight: 600,
                }}
              >
                Core finding
              </span>
            </div>
          </div>
        </Reveal>

        {/* Paragraphs before pull quote 1 — tight spacing */}
        {beforePullQuote1.map((p, i) => (
          <Reveal key={`pre-${i}`} delay={i * 0.04}>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 19,
                lineHeight: 1.65,
                color: '#1A1A1A',
                margin: '0 0 18px',
              }}
            >
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Pull quote 1 — wider than body, breaks out of the column */}
      <Reveal>
        <PullQuote text={PULL_QUOTE_1} />
      </Reveal>

      {/* Paragraphs after pull quote 1 — tight spacing */}
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {afterPullQuote1.map((p, i) => (
          <Reveal key={`post-${i}`} delay={i * 0.04}>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 19,
                lineHeight: 1.65,
                color: '#1A1A1A',
                margin: '0 0 18px',
              }}
            >
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Pull quote 2 — closer */}
      <Reveal>
        <PullQuote text={PULL_QUOTE_2} />
      </Reveal>

      {/* Bottom rust rule as transition out */}
      <div
        style={{
          maxWidth: 680,
          margin: '64px auto 0',
          height: 1,
          background: 'linear-gradient(90deg, transparent, #C85A3A 30%, #C85A3A 70%, transparent)',
          opacity: 0.4,
        }}
      />
    </div>
  )
}

function PullQuote({ text }: { text: string }) {
  return (
    <blockquote
      style={{
        maxWidth: 880,
        margin: '72px auto',
        padding: '0 32px 0 56px',
        position: 'relative',
        fontFamily: FONT.display,
        fontStyle: 'italic',
        fontSize: 'clamp(30px, 4vw, 46px)',
        lineHeight: 1.2,
        color: '#1A1A1A',
        fontWeight: 400,
      }}
    >
      {/* Oversized opening quote mark */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: -8,
          fontFamily: FONT.display,
          fontStyle: 'italic',
          fontSize: 96,
          color: '#C85A3A',
          lineHeight: 1,
          opacity: 0.55,
        }}
      >
        “
      </span>
      {text}
    </blockquote>
  )
}

function CompanyProfile() {
  const { showBH } = useDataLayer()
  const fields: Array<[string, string]> = [
    ['Founded', COMPANY.founded],
    ['Category', COMPANY.category],
    ...((showBH ? [['Revenue', COMPANY.revenue]] : []) as Array<[string, string]>),
    ['Valuation', COMPANY.valuation],
    ['Funding', COMPANY.funding],
    ['Employees', COMPANY.employees],
    ['Notable clients', COMPANY.notableClients],
    ['Primary buyer', COMPANY.primaryBuyer],
  ]
  return (
    <div
      style={{
        marginTop: 56,
        background: '#FFFFFF',
        border: '1px solid #E8E4DE',
        borderRadius: 6,
        padding: '32px 36px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px 40px',
      }}
    >
      {fields.map(([label, value]) => (
        <div key={label}>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9A958C',
              marginBottom: 6,
            }}
          >
            {label}
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 15, color: '#1A1A1A', lineHeight: 1.4 }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}

function StrengthsVulnerabilities() {
  return (
    <div
      style={{
        marginTop: 56,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
      }}
    >
      <Column title="Top 3 Strengths" items={STRENGTHS} accent="#3A9B6E" />
      <Column title="Top 3 Vulnerabilities" items={VULNERABILITIES} accent="#C84438" />
    </div>
  )
}

function Column({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E4DE',
        borderRadius: 6,
        padding: '28px 32px',
      }}
    >
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: accent,
          marginBottom: 20,
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: FONT.body,
              fontSize: 15,
              lineHeight: 1.55,
              color: '#1A1A1A',
              display: 'flex',
              gap: 14,
            }}
          >
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 13,
                color: accent,
                flex: '0 0 auto',
                paddingTop: 2,
              }}
            >
              0{i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Section 6: AI Mirror
   ────────────────────────────────────────────── */
function AIMirror() {
  return (
    <Section id="mirror">
      <SectionHeader
        kicker="The AI Mirror"
        headline="When your buyer asks an AI about you, does the answer reflect your conviction or your cascade failure?"
      />

      <Reveal>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E8E4DE',
            borderRadius: 6,
            padding: '28px 32px',
            fontFamily: FONT.body,
            fontSize: 16,
            lineHeight: 1.65,
            color: '#1A1A1A',
            marginBottom: 48,
          }}
        >
          {AI_MIRROR_CONTEXT}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 20,
          }}
        >
          <ChatColumn
            tone="aspirational"
            title="What BetterUp wants the AI to say"
            items={WANTS_TO_SAY.map((t) => ({ tone: 'aspirational', text: t }))}
          />
          <ChatColumn
            tone="real"
            title="What the AI actually says"
            items={[...ACTUALLY_SAYS]}
          />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Gauge score={AI_MIRROR_SCORE} label="AI Mirror Score" size={180} />
        </div>
      </Reveal>

      <div style={{ marginTop: 48 }}>
        <Reveal>
          <Callout tone="rust">
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.7,
                marginBottom: 12,
              }}
            >
              Why this matters
            </div>
            {WHY_IT_MATTERS}
          </Callout>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <TestYourself />
      </Reveal>
    </Section>
  )
}

function ChatColumn({
  title,
  items,
  tone,
}: {
  title: string
  tone: 'aspirational' | 'real'
  items: { tone: string; text: string }[]
}) {
  const isAspirational = tone === 'aspirational'

  // For real column, separate the summary line out
  const summaryItem = items.find((i) => i.tone === 'summary')
  const bodyItems = items.filter((i) => i.tone !== 'summary')

  return (
    <div
      style={{
        background: isAspirational ? '#FBF9F6' : '#FFFFFF',
        border: `1px solid #E8E4DE`,
        borderRadius: 12,
        padding: '24px 26px 28px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isAspirational ? 'none' : '0 8px 32px rgba(0,0,0,0.06)',
        position: 'relative',
      }}
    >
      {/* Header — chat avatar for the AI side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        {isAspirational ? (
          <div
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#E8E4DE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT.body, fontSize: 11, color: '#6B6760', fontWeight: 600, letterSpacing: '0.04em',
            }}
          >
            BU
          </div>
        ) : (
          <div
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#1A1A1A', color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        )}
        <div>
          <div
            style={{
              fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: isAspirational ? '#9A958C' : '#C85A3A',
              fontWeight: 600,
            }}
          >
            {isAspirational ? 'Marketing copy' : 'Composite AI answer'}
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 11, color: '#9A958C', marginTop: 2 }}>
            {isAspirational ? 'What BetterUp tells the world' : 'ChatGPT · Claude · Perplexity · Google AI'}
          </div>
        </div>
      </div>

      <div style={{ fontFamily: FONT.display, fontSize: 20, color: '#1A1A1A', marginBottom: 20, lineHeight: 1.25 }}>
        {title}
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {bodyItems.map((item, i) => {
          const isPositive = item.tone === 'positive'
          const isNegative = item.tone === 'negative'
          const dotColor = isPositive ? '#3A9B6E' : isNegative ? '#C84438' : '#9A958C'
          return (
            <li
              key={i}
              style={{
                fontFamily: FONT.body,
                fontSize: isNegative ? 15 : 14,
                lineHeight: 1.5,
                color: '#1A1A1A',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                padding: isNegative ? '6px 12px 6px 14px' : '4px 0',
                background: isNegative ? 'rgba(200,68,56,0.04)' : 'transparent',
                borderLeft: isNegative ? '2px solid #C84438' : 'none',
                borderRadius: isNegative ? 2 : 0,
                fontWeight: isNegative ? 500 : 400,
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: dotColor,
                  flex: '0 0 auto', marginTop: 8,
                }}
              />
              <span>{item.text}</span>
            </li>
          )
        })}
      </ul>

      {/* Summary callout */}
      {summaryItem && (
        <div
          style={{
            marginTop: 22,
            padding: '16px 18px',
            background: '#1A1A1A',
            color: '#FFFFFF',
            borderRadius: 8,
            fontFamily: FONT.body,
            fontSize: 14,
            lineHeight: 1.5,
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontFamily: FONT.body, fontSize: 9, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#D86A48',
              fontWeight: 600, flex: '0 0 auto', marginTop: 3, whiteSpace: 'nowrap',
            }}
          >
            Net read
          </div>
          <span style={{ fontStyle: 'italic' }}>{summaryItem.text}</span>
        </div>
      )}
    </div>
  )
}

function TestYourself() {
  return (
    <div
      style={{
        marginTop: 48,
        background: '#1A1A1A',
        color: '#F7F5F2',
        borderRadius: 6,
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
          marginBottom: 16,
        }}
      >
        Run the test yourself
      </div>
      <div style={{ fontFamily: FONT.display, fontSize: 24, marginBottom: 24, lineHeight: 1.3 }}>
        Ask ChatGPT, Claude, Perplexity, or Google AI Overview:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TEST_QUERIES.map((q, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
            }}
          >
            <span style={{ color: '#D86A48', marginRight: 12 }}>›</span>
            {q}
          </div>
        ))}
      </div>
    </div>
  )
}


/* ──────────────────────────────────────────────
   Page shell
   ────────────────────────────────────────────── */
function AuditShell({ eraMode }: { eraMode: boolean }) {
  const theme = useThemeState()
  const [layer, setLayer] = useState<DataLayer>(eraMode ? 'era' : 'era-plus-bh')
  const page = eraMode ? 'era' : 'full'

  useEffect(() => {
    document.documentElement.style.background = theme.palette.bg
    document.body.style.background = theme.palette.bg
    document.body.style.color = theme.palette.text
  }, [theme.palette])

  // Behavioral analytics: section views, time per section, scroll depth, session duration
  useEffect(() => {
    const cleanup = startSectionTimeTracker(SECTIONS.map((s) => s.id), page)
    return cleanup
  }, [page])

  // Theme toggle tracking
  const handleThemeToggle = () => {
    void track('theme_toggle', theme.mode === 'light' ? 'dark' : 'light', page)
    theme.toggle()
  }

  // Layer toggle tracking
  const handleLayerSet = (l: DataLayer) => {
    void track('layer_toggle', l, page)
    setLayer(l)
  }

  return (
    <ThemeContext.Provider value={theme}>
      <DataLayerProvider defaultLayer={eraMode ? 'era' : 'era-plus-bh'} showLayerToggle={eraMode}>
        <DataLayerSync layer={layer} setLayer={setLayer} />
        <div style={{ background: theme.palette.bg, minHeight: '100vh', color: theme.palette.text, fontFamily: FONT.body }}>
          <StepperNav
            items={SECTIONS}
            onToggleTheme={handleThemeToggle}
            themeMode={theme.mode}
            layerToggle={eraMode ? { layer, onSet: handleLayerSet } : undefined}
          />
          <div style={{ paddingTop: 60 }}>
            <ExecutiveSummary />
            <CascadeSection />
            <GTMSection />
            <SignalsSection />
            <AudienceSection />
            <AIMirror />
            <InvestmentSection />
            <BuildSection />
          </div>
        </div>
      </DataLayerProvider>
    </ThemeContext.Provider>
  )
}

/** Bridges the local toggle state in AuditShell into the DataLayerProvider context. */
function DataLayerSync({ layer, setLayer }: { layer: DataLayer; setLayer: (l: DataLayer) => void }) {
  const ctx = useDataLayer()
  useEffect(() => {
    if (ctx.layer !== layer) ctx.setLayer(layer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer])
  // Also: if the context changes (e.g. via the pill), pull it back into local state
  useEffect(() => {
    if (ctx.layer !== layer) setLayer(ctx.layer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.layer])
  return null
}

function BetterUpAuditPage({ eraMode }: { eraMode: boolean }) {
  const [authed, setAuthed] = useState(false)
  const page = eraMode ? 'era' : 'full'

  useEffect(() => {
    loadBetterUpFonts()
    if (isAuthed()) setAuthed(true)
  }, [])

  if (!authed) return <PasswordGate page={page} onAuth={() => setAuthed(true)} />
  return <AuditShell eraMode={eraMode} />
}

export default function BetterUpAudit() {
  return <BetterUpAuditPage eraMode={false} />
}

export function BetterUpAuditEra() {
  return <BetterUpAuditPage eraMode />
}

// MetricCard re-export to satisfy data-driven future sections
export { MetricCard, ProfileCard }
