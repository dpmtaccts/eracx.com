import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FONT } from '../theme'
import { STATEMENTS } from './data'
import { InsightRow, COLORS as C, monoStyle as mono } from './InsightRow'
import { ScoreStrip } from './ScoreStrip'
import { PAGE_LINE } from './types'
import { betterupAudit } from '../../../data/audits/betterup'

export function InsightList() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())

  const toggle = useCallback((n: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }, [])

  const allOpen = openSet.size === STATEMENTS.length
  const setAll = useCallback((open: boolean) => {
    if (open) setOpenSet(new Set(STATEMENTS.map((s) => s.n)))
    else setOpenSet(new Set())
  }, [])

  // Open the statement matching the location hash on first paint
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.replace(/^#/, '')
    const match = STATEMENTS.find((s) => s.anchor === hash)
    if (match) {
      setOpenSet(new Set([match.n]))
      // give layout a frame to settle, then scroll
      window.setTimeout(() => {
        document.getElementById(match.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }, [])

  return (
    <div style={{ background: C.paper }}>
      <ScoreStrip />
      <AuditHeader />
      <main>
        {STATEMENTS.map((s, idx) => (
          <InsightRow
            key={s.n}
            statement={s}
            open={openSet.has(s.n)}
            onToggle={() => toggle(s.n)}
            // Show the reading guide once, beneath statement 02's bars.
            showReadingGuide={idx === 1}
            isFirst={idx === 0}
          />
        ))}
      </main>
      <MethodologyFooter />
      <CoSign />
      <ExpandAllControl allOpen={allOpen} onToggleAll={() => setAll(!allOpen)} />
    </div>
  )
}

function AuditHeader() {
  return (
    <header
      style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '96px 32px 80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 24,
          paddingBottom: 14,
          borderBottom: `1px solid ${PAGE_LINE}`,
          flexWrap: 'wrap',
        }}
      >
        <span style={mono(11, C.ink, 700)}>01 · THE RECOMMENDATION</span>
        <span style={mono(11, C.muted, 600)}>
          {betterupAudit.reportDate?.toUpperCase() ?? 'APRIL 2026'}
        </span>
      </div>
      <div style={{ marginTop: 32, marginBottom: 10 }}>
        <img
          src="/images/betterup/bu_logo_black.svg"
          alt="BetterUp"
          style={{ height: 'clamp(28px, 3.6vw, 48px)', width: 'auto', display: 'block' }}
        />
      </div>
      <h1
        style={{
          fontFamily: FONT.mega,
          fontWeight: 400,
          fontSize: 'clamp(64px, 9vw, 168px)',
          lineHeight: 0.92,
          letterSpacing: '-0.014em',
          textTransform: 'uppercase',
          color: C.ink,
          margin: '0 0 18px',
        }}
      >
        The Buyer View
      </h1>
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: 18,
          lineHeight: 1.55,
          color: C.muted,
          maxWidth: 760,
          margin: 0,
          fontWeight: 400,
        }}
      >
        Seven things the buyer encountered, ordered by what to fix first. Every row states the
        decision while collapsed. Open any row for the forensic evidence underneath.
      </p>
      <MethodologyLink />
    </header>
  )
}

function MethodologyLink() {
  const location = useLocation()
  return (
    <Link
      to="/methodology"
      state={{ backgroundLocation: location }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 22,
        fontFamily: FONT.mono,
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#E6195F',
        textDecoration: 'none',
        borderBottom: `1px solid #E6195F`,
        paddingBottom: 3,
      }}
    >
      35,000 Buyers · 9 Studies
      <span aria-hidden>→</span>
    </Link>
  )
}

function MethodologyFooter() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${PAGE_LINE}`,
        background: '#F4F1EA',
        padding: '64px 0',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ ...mono(10, C.muted, 700), marginBottom: 14 }}>
          METHODOLOGY · BUYER TRUST SCORE
        </div>
        <h3
          style={{
            fontFamily: FONT.mega,
            fontWeight: 400,
            fontSize: 'clamp(28px, 3vw, 40px)',
            lineHeight: 1.05,
            letterSpacing: '-0.005em',
            textTransform: 'uppercase',
            color: C.ink,
            margin: '0 0 22px',
            maxWidth: 720,
          }}
        >
          How the score is built.
        </h3>
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 16,
            lineHeight: 1.6,
            color: C.ink,
            maxWidth: 720,
            margin: '0 0 14px',
          }}
        >
          The composite weights Leaders at 35 percent, Employees at 25 percent, Content at 25
          percent, and Agents at 15 percent. Each pillar carries a base read of what the buyer
          finds today and a target read of what intact performance looks like.
        </p>
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 14,
            lineHeight: 1.55,
            color: C.muted,
            maxWidth: 720,
            margin: '0 0 10px',
          }}
        >
          Every figure describes publicly visible brand presence, not internal spend or
          performance. Pipeline recovery is directional, based on ERA pattern recognition across
          comparable B2B engagements.
        </p>
      </div>
    </footer>
  )
}

function CoSign() {
  return (
    <section
      style={{
        background: C.paper,
        borderTop: `1px solid ${PAGE_LINE}`,
        padding: '72px 0 96px',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ ...mono(10, C.muted, 700), marginBottom: 28 }}>
          BUILT TOGETHER BY
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 1px minmax(0, 1fr)',
            gap: 48,
            alignItems: 'stretch',
          }}
        >
          {/* ERA */}
          <article style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <img
              src="/images/era_symbol.svg"
              alt="ERA"
              style={{ height: 56, width: 'auto', display: 'block' }}
            />
            <div style={mono(11, C.ink, 700)}>ERA</div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 16,
                lineHeight: 1.55,
                color: C.ink,
                margin: 0,
                maxWidth: 480,
              }}
            >
              ERA builds signal-driven growth systems for B2B revenue teams, from LinkedIn
              intelligence to executive content, brand presence coaching, and signal measurement.
            </p>
            <div
              style={{
                paddingTop: 18,
                borderTop: `1px solid ${PAGE_LINE}`,
                marginTop: 'auto',
              }}
            >
              <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 4 }}>
                Justin Marshall
              </div>
              <a
                href="mailto:justin@eracx.com"
                style={{
                  fontFamily: FONT.body,
                  fontSize: 14,
                  color: '#E6195F',
                  textDecoration: 'none',
                  borderBottom: '1px solid #E6195F',
                  paddingBottom: 1,
                }}
              >
                justin@eracx.com
              </a>
            </div>
          </article>

          {/* Vertical separator */}
          <div aria-hidden style={{ background: PAGE_LINE, width: 1, height: '100%' }} />

          {/* Pinwheel */}
          <article style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <img
              src="/assets/pinwheel_agency_logo.jpg"
              alt="Pinwheel Creative"
              style={{ height: 56, width: 'auto', display: 'block' }}
            />
            <div style={mono(11, C.ink, 700)}>Pinwheel Creative</div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 16,
                lineHeight: 1.55,
                color: C.ink,
                margin: 0,
                maxWidth: 480,
              }}
            >
              Pinwheel Creative builds brand strategy, thought-leadership content, design, and
              campaigns for technology and finance brands ready to be readable.
            </p>
            <div
              style={{
                paddingTop: 18,
                borderTop: `1px solid ${PAGE_LINE}`,
                marginTop: 'auto',
              }}
            >
              <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 4 }}>
                S. Todd Anthony
              </div>
              <a
                href="mailto:todd@pinwheelcreative.com"
                style={{
                  fontFamily: FONT.body,
                  fontSize: 14,
                  color: '#E6195F',
                  textDecoration: 'none',
                  borderBottom: '1px solid #E6195F',
                  paddingBottom: 1,
                }}
              >
                todd@pinwheelcreative.com
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function ExpandAllControl({
  allOpen,
  onToggleAll,
}: {
  allOpen: boolean
  onToggleAll: () => void
}) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 18,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <button
        onClick={onToggleAll}
        aria-label={allOpen ? 'Collapse all insights' : 'Expand all insights'}
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          background: C.paper,
          color: C.ink,
          border: `1px solid ${PAGE_LINE}`,
          padding: '14px 10px',
          cursor: 'pointer',
          ...controlMono,
        }}
      >
        {allOpen ? 'collapse all' : 'expand all'}
      </button>
    </div>
  )
}

const controlMono: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'lowercase',
  fontWeight: 700,
}
