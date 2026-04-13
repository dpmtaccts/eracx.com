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

const PASSWORD = 'transformation'
const SESSION_KEY = 'betterup-audit-auth'

/* ──────────────────────────────────────────────
   Password gate
   ────────────────────────────────────────────── */
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT.body,
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: 360, width: '100%', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6B6760',
            marginBottom: 18,
          }}
        >
          Revenue Signal Audit built for
        </div>
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
          <img
            src="/images/betterup/bu_logo_black.svg"
            alt="BetterUp"
            style={{ height: 36, width: 'auto', display: 'block' }}
          />
        </div>
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
            fontFamily: FONT.body,
            fontSize: 15,
            color: '#1A1A1A',
            outline: 'none',
            marginBottom: 12,
            transition: 'border-color 0.3s',
          }}
        />
        <button
          onClick={submit}
          style={{
            width: '100%',
            padding: '14px',
            background: '#C85A3A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 4,
            fontFamily: FONT.body,
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
            <Gauge key={g.label} score={g.score} label={g.label} size={170} />
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
  const fields = [
    ['Founded', COMPANY.founded],
    ['Category', COMPANY.category],
    ['Revenue', COMPANY.revenue],
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
  return (
    <div
      style={{
        background: isAspirational ? '#FBF9F6' : '#FFFFFF',
        border: `1px solid ${isAspirational ? '#E8E4DE' : '#E8E4DE'}`,
        borderRadius: 6,
        padding: '28px 28px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isAspirational ? '#9A958C' : '#C85A3A',
          marginBottom: 6,
        }}
      >
        {isAspirational ? 'Marketing copy' : 'Composite AI answer'}
      </div>
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: 22,
          color: '#1A1A1A',
          marginBottom: 24,
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => {
          const dotColor =
            item.tone === 'positive'
              ? '#3A9B6E'
              : item.tone === 'negative'
                ? '#C84438'
                : item.tone === 'summary'
                  ? '#1A1A1A'
                  : '#9A958C'
          const isSummary = item.tone === 'summary'
          return (
            <li
              key={i}
              style={{
                fontFamily: FONT.body,
                fontSize: 14.5,
                lineHeight: 1.55,
                color: '#1A1A1A',
                display: 'flex',
                gap: 12,
                paddingTop: isSummary ? 14 : 0,
                marginTop: isSummary ? 8 : 0,
                borderTop: isSummary ? '1px solid #E8E4DE' : 'none',
                fontStyle: isSummary ? 'italic' : 'normal',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: dotColor,
                  flex: '0 0 auto',
                  marginTop: 8,
                }}
              />
              <span>{item.text}</span>
            </li>
          )
        })}
      </ul>
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
function AuditShell() {
  const theme = useThemeState()

  useEffect(() => {
    document.documentElement.style.background = theme.palette.bg
    document.body.style.background = theme.palette.bg
    document.body.style.color = theme.palette.text
  }, [theme.palette])

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ background: theme.palette.bg, minHeight: '100vh', color: theme.palette.text, fontFamily: FONT.body }}>
        <StepperNav items={SECTIONS} onToggleTheme={theme.toggle} themeMode={theme.mode} />
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
    </ThemeContext.Provider>
  )
}

export default function BetterUpAudit() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    loadBetterUpFonts()
    if (sessionStorage.getItem(SESSION_KEY) === '1') setAuthed(true)
  }, [])

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <AuditShell />
}

// MetricCard re-export to satisfy data-driven future sections
export { MetricCard, ProfileCard }
