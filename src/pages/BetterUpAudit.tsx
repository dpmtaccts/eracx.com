import { useEffect, useState } from 'react'
import { usePostHog } from '@posthog/react'
import {
  Callout,
  Gauge,
  MetricCard,
  ProfileCard,
  Reveal,
  Section,
  SectionHeader,
  ShareButton,
  StepperNav,
} from './betterup/components'
import { CASCADE_LAYERS } from './betterup/data/cascade'
import {
  FONT,
  ThemeContext,
  loadBetterUpFonts,
  useThemeState,
} from './betterup/theme'
import {
  COMPANY,
  CORE_FINDING_PARAGRAPHS,
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
import { SummaryView } from './betterup/SummaryView'
import { AnimatePresence, motion } from 'framer-motion'

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
          Revenue Signal Audit · {COMPANY.date}
        </div>
        <img
          src="/images/betterup/bu_logo_black.svg"
          alt="BetterUp"
          style={{ height: 'clamp(48px, 6vw, 72px)', width: 'auto', display: 'block', marginTop: 8 }}
        />
        <h1 style={{ position: 'absolute', left: -9999 }}>BetterUp</h1>
      </Reveal>

      <Reveal delay={0.1}>
        <BentoHero />
      </Reveal>

      <CoreFindingEditorial />

      <div style={{ height: 96 }} />

      <Reveal delay={0.1}>
        <StrengthsVulnerabilities />
      </Reveal>
    </Section>
  )
}

/* ──────────────────────────────────────────────
   Bento hero — six tiles, one viewport, clickable deep-links
   ────────────────────────────────────────────── */
function BentoHero() {
  const goto = (id: string) => {
    void track('bento_tile_click', id, 'full')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div
      style={{
        marginTop: 40,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: 'minmax(0, auto)',
        gap: 16,
      }}
    >
      <BentoGaugeTile
        onClick={() => goto('cascade')}
        label="Brand Conviction Cascade"
        score={41}
        benchmark={57}
        benchmarkLabel="category avg"
        column="span 4"
      />
      <BentoGaugeTile
        onClick={() => goto('leaders')}
        label="GTM Signal Chain"
        score={24}
        benchmark={50}
        benchmarkLabel="functional floor"
        column="span 4"
      />
      <BentoGaugeTile
        onClick={() => goto('signals')}
        label="Content-to-Pipeline"
        score={29}
        benchmark={45}
        benchmarkLabel="functional floor"
        column="span 4"
      />

      <BentoTile onClick={() => goto('cascade')} column="span 6" tone="light">
        <BentoEyebrow>Where the conviction breaks</BentoEyebrow>
        <CascadeBreakVisual />
      </BentoTile>

      <BentoTile onClick={() => goto('audience')} column="span 6" tone="rust">
        <BentoEyebrow light>Employee Brand Health</BentoEyebrow>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 8 }}>
          <div style={{ fontFamily: FONT.display, fontSize: 72, lineHeight: 1, color: '#F7F5F2' }}>
            32
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 14, color: '#F7F5F2', opacity: 0.85 }}>
            BetterUp
            <div style={{ opacity: 0.65, fontSize: 12 }}>vs. Torch 82 · category avg 62</div>
          </div>
        </div>
        <div style={{ fontFamily: FONT.display, fontStyle: 'italic', fontSize: 20, color: '#F7F5F2', marginTop: 16, lineHeight: 1.3 }}>
          Your competitor's greatest strength is your greatest weakness.
        </div>
      </BentoTile>

      <BentoTile onClick={() => goto('mirror')} column="span 4" tone="dark">
        <BentoEyebrow light>AI Mirror</BentoEyebrow>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
          <div style={{ fontFamily: FONT.display, fontSize: 64, lineHeight: 1, color: '#D86A48' }}>38</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 11, color: '#F7F5F2', opacity: 0.55 }}>/ 100</div>
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 14, color: '#F7F5F2', marginTop: 14, lineHeight: 1.45 }}>
          Product praised, organization questioned. That's what your buyer's AI search returns.
        </div>
      </BentoTile>

      <BentoTile onClick={() => goto('leaders')} column="span 4" tone="light">
        <BentoEyebrow>GTM Signal Chain</BentoEyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          <BentoBigStat value="6%" label="of commenters on CEO content match the buyer profile" />
          <BentoBigStat value="0%" label="of sales team content addresses buyer pain points" />
        </div>
      </BentoTile>

      <BentoTile column="span 4" tone="quote">
        <BentoEyebrow>Core finding</BentoEyebrow>
        <div
          style={{
            fontFamily: FONT.display,
            fontStyle: 'italic',
            fontSize: 18,
            lineHeight: 1.35,
            color: '#1A1A1A',
            marginTop: 10,
          }}
        >
          "A category pioneer leaking pipeline not because the product fails, but because the go-to-market doesn't carry the conviction far enough."
        </div>
      </BentoTile>
    </div>
  )
}

function BentoTile({
  onClick,
  children,
  column,
  tone = 'light',
}: {
  onClick?: () => void
  children: React.ReactNode
  column: string
  tone?: 'light' | 'dark' | 'rust' | 'quote'
}) {
  const bg = tone === 'dark' ? '#1A1A1A' : tone === 'rust' ? '#C85A3A' : tone === 'quote' ? '#F0EDEA' : '#FFFFFF'
  const border = tone === 'light' || tone === 'quote' ? '1px solid #E8E4DE' : 'none'
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick() } }}
      style={{
        gridColumn: column,
        background: bg,
        border,
        borderRadius: 8,
        padding: '20px 22px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.10)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </div>
  )
}

function BentoEyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        fontFamily: FONT.body,
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: light ? 'rgba(247,245,242,0.75)' : '#9A958C',
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  )
}

function BentoGaugeTile({
  label,
  score,
  benchmark,
  benchmarkLabel,
  column,
  onClick,
}: {
  label: string
  score: number
  benchmark: number
  benchmarkLabel: string
  column: string
  onClick: () => void
}) {
  return (
    <BentoTile onClick={onClick} column={column} tone="light">
      <BentoEyebrow>{label}</BentoEyebrow>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, paddingTop: 8 }}>
        <Gauge score={score} benchmark={benchmark} benchmarkLabel={benchmarkLabel} size={140} />
      </div>
    </BentoTile>
  )
}

function BentoBigStat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <div style={{ fontFamily: FONT.display, fontSize: 34, color: '#C85A3A', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: FONT.body, fontSize: 12, color: '#1A1A1A', lineHeight: 1.4 }}>{label}</div>
    </div>
  )
}

function CascadeBreakVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
      {CASCADE_LAYERS.map((layer) => {
        const color = layer.score >= 60 ? '#3A9B6E' : layer.score >= 40 ? '#C85A3A' : '#C84438'
        const isBreak = layer.status === 'Cascade Break'
        return (
          <div key={layer.number} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 10, color: '#9A958C', width: 18 }}>{layer.number}</span>
            <span style={{ fontFamily: FONT.body, fontSize: 12, color: isBreak ? '#C84438' : '#1A1A1A', flex: 1, fontWeight: isBreak ? 600 : 400 }}>
              {layer.name}
            </span>
            <div style={{ flex: 2, height: 6, background: '#E8E4DE', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${layer.score}%`, height: '100%', background: color, borderRadius: 3 }} />
            </div>
            <span style={{ fontFamily: FONT.mono, fontSize: 11, color: isBreak ? '#C84438' : '#1A1A1A', width: 28, textAlign: 'right', fontWeight: isBreak ? 600 : 400 }}>
              {layer.score}
            </span>
          </div>
        )
      })}
    </div>
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
        <PullQuote text={PULL_QUOTE_1} anchorId="quote-1" />
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
        <PullQuote text={PULL_QUOTE_2} anchorId="quote-2" />
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

function PullQuote({ text, anchorId }: { text: string; anchorId?: string }) {
  return (
    <blockquote
      id={anchorId}
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
      {anchorId && (
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <ShareButton anchorId={anchorId} label="this quote" size="sm" />
        </div>
      )}
    </blockquote>
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
        shareId="mirror"
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
          <Gauge score={AI_MIRROR_SCORE} benchmark={65} benchmarkLabel="high-performing floor" label="AI Mirror Score" size={180} />
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

      <Reveal delay={0.08}>
        <BuyerPromptCard />
      </Reveal>

      <Reveal delay={0.1}>
        <TestYourself />
      </Reveal>
    </Section>
  )
}

const BUYER_PROMPT = `I am a CHRO at a Fortune 500 company evaluating enterprise coaching platforms. I have a $2M annual budget for leadership development and need to justify the spend to my CFO. Tell me about BetterUp. Include pricing, employee reviews, competitive alternatives, and whether the ROI evidence is strong enough to present to a board.`

function BuyerPromptCard() {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(BUYER_PROMPT) } catch {}
    setCopied(true)
    void track('prompt_copy', 'buyer_prompt', 'full')
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <div
      style={{
        marginTop: 48,
        background: '#FBF9F6',
        border: '1px solid #E8E4DE',
        borderRadius: 10,
        padding: '28px 32px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C85A3A', fontWeight: 600, marginBottom: 6 }}>
            See what your buyer sees
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 22, color: '#1A1A1A', lineHeight: 1.25 }}>
            Paste this into ChatGPT, Claude, or Perplexity.
          </div>
        </div>
        <button
          onClick={onCopy}
          style={{
            background: '#1A1A1A',
            color: '#F7F5F2',
            border: 'none',
            borderRadius: 6,
            padding: '10px 18px',
            fontFamily: FONT.body,
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : 'Copy to clipboard'}
        </button>
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 14,
          lineHeight: 1.6,
          color: '#1A1A1A',
          background: '#FFFFFF',
          border: '1px solid #E8E4DE',
          borderRadius: 6,
          padding: '20px 24px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {BUYER_PROMPT}
      </div>
    </div>
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
const VIEW_MODE_KEY = 'betterup-audit-view-mode'

function AuditShell({ eraMode }: { eraMode: boolean }) {
  const posthog = usePostHog()
  const theme = useThemeState()
  const [layer, setLayer] = useState<DataLayer>(eraMode ? 'era' : 'era-plus-bh')
  const page = eraMode ? 'era' : 'full'

  // View mode (Summary | Full) — only used on the main route. Default Summary on first visit.
  const [viewMode, setViewMode] = useState<'summary' | 'full'>(() => {
    if (eraMode) return 'full'
    try {
      const stored = localStorage.getItem(VIEW_MODE_KEY)
      if (stored === 'summary' || stored === 'full') return stored
    } catch {}
    return 'full'
  })

  useEffect(() => {
    if (!eraMode) {
      try { localStorage.setItem(VIEW_MODE_KEY, viewMode) } catch {}
    }
  }, [viewMode, eraMode])

  useEffect(() => {
    document.documentElement.style.background = theme.palette.bg
    document.body.style.background = theme.palette.bg
    document.body.style.color = theme.palette.text
  }, [theme.palette])

  // Behavioral analytics: only run the section observer when the full sections are mounted.
  useEffect(() => {
    if (eraMode || viewMode === 'full') {
      const cleanup = startSectionTimeTracker(SECTIONS.map((s) => s.id), page)
      return cleanup
    }
  }, [page, viewMode, eraMode])

  const handleThemeToggle = () => {
    const newMode = theme.mode === 'light' ? 'dark' : 'light'
    void track('theme_toggle', newMode, page)
    posthog?.capture('audit_theme_toggled', { theme: newMode, audit_page: page })
    theme.toggle()
  }

  const handleLayerSet = (l: DataLayer) => {
    void track('layer_toggle', l, page)
    posthog?.capture('audit_data_layer_changed', { layer: l, audit_page: page })
    setLayer(l)
  }

  const handleViewModeSet = (m: 'summary' | 'full') => {
    void track('view_mode_toggle', m, page)
    posthog?.capture('audit_view_mode_changed', { view_mode: m, audit_page: page })
    setViewMode(m)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            viewModeToggle={!eraMode ? { mode: viewMode, onSet: handleViewModeSet } : undefined}
          />
          <div style={{ paddingTop: 60 }}>
            <AnimatePresence mode="wait">
              {!eraMode && viewMode === 'summary' ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SummaryView />
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ExecutiveSummary />
                  <CascadeSection />
                  <GTMSection />
                  <SignalsSection />
                  <AudienceSection />
                  <AIMirror />
                  <InvestmentSection />
                  <BuildSection />
                </motion.div>
              )}
            </AnimatePresence>
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
