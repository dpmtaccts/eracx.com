/* Riiser insight list — mirrors the real InsightList shell
   (src/pages/betterup/insights/InsightList.tsx): sticky score strip, the
   recommendation header, the seven statement rows, the methodology footer, and
   the ERA + Pinwheel co-sign. Reads Riiser data; the real components are left
   untouched. */

import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePostHog } from '@posthog/react'
import { FONT } from '../betterup/theme'
import { mono, rowVisualsStyles as C } from '../betterup/insights/RowVisuals'
import { PAGE_LINE } from '../betterup/insights/types'
import { RIISER, SCALE_STATS, STATEMENTS } from '../../data/riiser-sample'
import { RiiserInsightRow } from './RiiserInsightRow'

export function RiiserInsightList() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())
  const posthog = usePostHog()

  const toggle = useCallback(
    (n: number) => {
      const opening = !openSet.has(n)
      setOpenSet((prev) => {
        const next = new Set(prev)
        if (next.has(n)) next.delete(n)
        else next.add(n)
        return next
      })
      posthog?.capture('sample_statement_toggled', { statement: n, opened: opening })
    },
    [openSet, posthog],
  )

  const allOpen = openSet.size === STATEMENTS.length
  const setAll = useCallback(
    (open: boolean) => {
      if (open) setOpenSet(new Set(STATEMENTS.map((s) => s.n)))
      else setOpenSet(new Set())
      posthog?.capture('sample_expand_all_toggled', { opened: open })
    },
    [posthog],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.replace(/^#/, '')
    const match = STATEMENTS.find((s) => s.anchor === hash)
    if (match) {
      setOpenSet(new Set([match.n]))
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
          <RiiserInsightRow key={s.n} statement={s} open={openSet.has(s.n)} onToggle={() => toggle(s.n)} isFirst={idx === 0} />
        ))}
      </main>
      <MethodologyFooter />
      <CoSign />
      <ExpandAllControl allOpen={allOpen} onToggleAll={() => setAll(!allOpen)} />
    </div>
  )
}

function ScoreStrip() {
  const STRIP_MUTED = 'rgba(10, 10, 10, 0.55)'
  return (
    <div role="banner" style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', color: '#0A0A0A', borderBottom: `1px solid ${PAGE_LINE}` }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24, padding: '12px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <a href="/" aria-label="ERA" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/era-symbol.png" alt="ERA" style={{ height: 22, width: 'auto', display: 'block' }} />
          </a>
          <span aria-hidden style={{ width: 1, height: 18, background: 'rgba(10,10,10,0.2)' }} />
          <span style={{ fontFamily: FONT.body, fontSize: 14, fontStyle: 'italic', color: STRIP_MUTED, fontWeight: 400 }}>
            Don’t pitch strangers.
          </span>
          <span style={{ ...mono(9, STRIP_MUTED, 700), border: `1px solid ${PAGE_LINE}`, padding: '3px 7px' }}>SAMPLE</span>
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 20, alignItems: 'baseline', flexWrap: 'wrap' }}>
          {SCALE_STATS.map((s) => (
            <li key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={mono(9, STRIP_MUTED)}>{s.label.toUpperCase()}</span>
              <span style={{ fontFamily: FONT.mega, fontSize: 18, lineHeight: 1, letterSpacing: '-0.01em', color: '#0A0A0A' }}>{s.value}</span>
              <span style={mono(9, STRIP_MUTED)}>· {s.sub.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AuditHeader() {
  return (
    <header style={{ maxWidth: 1400, margin: '0 auto', padding: '96px 32px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, paddingBottom: 14, borderBottom: `1px solid ${PAGE_LINE}`, flexWrap: 'wrap' }}>
        <span style={mono(11, C.ink, 700)}>01 · THE RECOMMENDATION</span>
        <span style={mono(11, C.muted, 600)}>{RIISER.reportDate.toUpperCase()} · SAMPLE</span>
      </div>
      <div style={{ marginTop: 32, marginBottom: 10 }}>
        {/* Riiser brand logo — a rising-bars "riser" mark plus the riiser.co
            wordmark, all inline so it stays crisp at any size. Fictional brand. */}
        <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 14 }} aria-label={RIISER.domain}>
          <svg width="40" height="43" viewBox="0 0 26 28" fill="none" aria-hidden style={{ display: 'block' }}>
            <rect x="0.5" y="17" width="5.5" height="10" fill={C.ink} />
            <rect x="10.25" y="10" width="5.5" height="17" fill={C.ink} />
            <rect x="20" y="2.5" width="5.5" height="24.5" fill={C.hot} />
          </svg>
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 'clamp(32px, 3.8vw, 46px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: C.ink,
              lineHeight: 1,
            }}
          >
            riiser<span style={{ color: C.muted, fontWeight: 500 }}>.co</span>
          </span>
        </span>
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
      <p style={{ fontFamily: FONT.body, fontSize: 18, lineHeight: 1.55, color: C.muted, maxWidth: 760, margin: 0, fontWeight: 400 }}>
        {/* DRAFT */}
        A sample Buyer View for Riiser, a fictional employee coaching and development platform. Seven things the buyer encountered, ordered by what to fix first. Every row states the decision while collapsed. Open any row for the evidence underneath.
      </p>
      <MethodologyLink />
    </header>
  )
}

function MethodologyLink() {
  const location = useLocation()
  const posthog = usePostHog()
  return (
    <Link
      to="/methodology"
      state={{ backgroundLocation: location }}
      onClick={() => posthog?.capture('sample_methodology_clicked')}
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
        borderBottom: '1px solid #E6195F',
        paddingBottom: 3,
      }}
    >
      Inside the Buyer View
      <span style={{ color: C.muted, fontWeight: 600 }}>· 35,000 buyers across 9 studies</span>
      <span aria-hidden>→</span>
    </Link>
  )
}

function MethodologyFooter() {
  return (
    <footer style={{ borderTop: `1px solid ${PAGE_LINE}`, background: '#F4F1EA', padding: '64px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ ...mono(10, C.muted, 700), marginBottom: 14 }}>METHODOLOGY · BUYER TRUST SCORE</div>
        <h3 style={{ fontFamily: FONT.mega, fontWeight: 400, fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.005em', textTransform: 'uppercase', color: C.ink, margin: '0 0 22px', maxWidth: 720 }}>
          How the score is built.
        </h3>
        <p style={{ fontFamily: FONT.body, fontSize: 16, lineHeight: 1.6, color: C.ink, maxWidth: 720, margin: '0 0 14px' }}>
          The composite weights Leaders at 35 percent, Employees at 25 percent, Content at 25 percent, and Agents at 15 percent. Each pillar carries a base read of what the buyer finds today and a target read of what intact performance looks like.
        </p>
        <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.55, color: C.muted, maxWidth: 720, margin: '0 0 10px' }}>
          {/* DRAFT */}
          This is a fictional sample. Every figure, name, and quote is invented to demonstrate the format. No real brand, person, or review is represented.
        </p>
      </div>
    </footer>
  )
}

// Co-sign footer, matched to the /buyerview footer: a bordered two-column grid
// with role labels, descriptions, and contacts. Stacks to one column under 760px.
const COSIGN_CSS = `
@container (max-width: 760px) {
  [data-riiser-cosign] { grid-template-columns: minmax(0, 1fr) !important; }
  [data-riiser-cosign-left] {
    border-right: none !important;
    border-bottom: 1px solid #0A0A0A !important;
  }
}
`

function CoSign() {
  const posthog = usePostHog()
  return (
    <section style={{ background: C.paper, borderTop: `1px solid ${C.ink}`, padding: '72px 0 96px', containerType: 'inline-size' }}>
      <style>{COSIGN_CSS}</style>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ ...mono(11, C.muted, 700), marginBottom: 24 }}>CO-SIGNED BY</div>
        <div
          data-riiser-cosign
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', border: `1px solid ${C.ink}` }}
        >
          {/* ERA */}
          <article
            data-riiser-cosign-left
            style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '32px 30px', borderRight: `1px solid ${C.ink}` }}
          >
            <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
              <img src="/erafull.png" alt="ERA" style={{ height: 38, width: 'auto', display: 'block' }} />
            </div>
            <div>
              <div style={{ ...mono(11, C.ink, 700), marginBottom: 10 }}>Operates the experience</div>
              <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.55, color: C.ink, margin: 0, maxWidth: 480 }}>
                ERA reads the surfaces your buyer sees, analyzes the gap between promise and proof,
                and builds the system to improve pipeline velocity through every channel.
              </p>
            </div>
            <div style={{ paddingTop: 18, borderTop: `1px solid rgba(10, 10, 10, 0.15)`, marginTop: 'auto' }}>
              <div style={{ ...mono(11, C.ink, 700), marginBottom: 6 }}>Justin Marshall</div>
              <a
                href="mailto:justin@eracx.com"
                onClick={() => posthog?.capture('sample_cosign_email_clicked', { firm: 'era' })}
                style={{ ...mono(11, C.hot, 700), textDecoration: 'none' }}
              >
                justin@eracx.com
              </a>
            </div>
          </article>

          {/* Pinwheel */}
          <article style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '32px 30px' }}>
            <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
              <img src="/assets/pinwheel-logo.png" alt="Pinwheel" style={{ height: 34, width: 'auto', display: 'block' }} />
            </div>
            <div>
              <div style={{ ...mono(11, C.ink, 700), marginBottom: 10 }}>Produces the proof</div>
              <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.55, color: C.ink, margin: 0, maxWidth: 480 }}>
                Pinwheel is a creative marketing and content agency that partners with B2B brands to
                delight, persuade, and educate their audiences. It produces the executive content,
                editorial, and design that get each surface backing the promise.
              </p>
            </div>
            <div style={{ paddingTop: 18, borderTop: `1px solid rgba(10, 10, 10, 0.15)`, marginTop: 'auto' }}>
              <div style={{ ...mono(11, C.ink, 700), marginBottom: 6 }}>Todd Anthony</div>
              <a
                href="mailto:todd@pinwheelagency.com"
                onClick={() => posthog?.capture('sample_cosign_email_clicked', { firm: 'pinwheel' })}
                style={{ ...mono(11, C.hot, 700), textDecoration: 'none' }}
              >
                todd@pinwheelagency.com
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function ExpandAllControl({ allOpen, onToggleAll }: { allOpen: boolean; onToggleAll: () => void }) {
  const controlMono: CSSProperties = { fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'lowercase', fontWeight: 700 }
  return (
    <div style={{ position: 'fixed', right: 18, top: '50%', transform: 'translateY(-50%)', zIndex: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button
        onClick={onToggleAll}
        aria-label={allOpen ? 'Collapse all insights' : 'Expand all insights'}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', background: C.paper, color: C.ink, border: `1px solid ${PAGE_LINE}`, padding: '14px 10px', cursor: 'pointer', ...controlMono }}
      >
        {allOpen ? 'collapse all' : 'expand all'}
      </button>
    </div>
  )
}
