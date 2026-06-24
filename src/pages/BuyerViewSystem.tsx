import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { usePostHog } from '@posthog/react'
import {
  PeripheralSeismograph,
  CHANNEL_CENTERS,
  congruenceEnvelope,
  congruenceDownScale,
} from './betterup/PeripheralSeismograph'
import { ILLUSTRATIVE_MOMENTS } from '../data/landing-illustrative'
import {
  COMPETITORS,
  STATUS_COLOR,
  STATUS_ARROW,
  type Competitor,
} from '../data/competitors-composite'
import { formatSectionLabel } from '../lib/section-label'

/* /buyer-view-system
   Brand-agnostic landing page that sells the Buyer View as a standing
   intelligence system for marketing leaders. No client logos, no real
   names, no real competitors, no pricing. Uses the v4 brutalist tokens
   exactly, reuses the existing seismograph component fed by the
   illustrative composite data file. */

const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const INK = '#0A0A0A'
const LINE = 'rgba(10, 10, 10, 0.15)'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const HOT = '#E6195F'
const CREAM = 'rgba(255, 255, 255, 0.92)'
const CREAM_MUTED = 'rgba(255, 255, 255, 0.72)'
const INK_LINE = 'rgba(255, 255, 255, 0.18)'

const DISPLAY = "'Anton', sans-serif"
const MONO = "'JetBrains Mono', monospace"
const BODY = "'IBM Plex Sans', system-ui, sans-serif"

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap'

const CANONICAL = 'https://eracx.com/buyerview'

export default function BuyerViewSystem() {
  // Inject fonts + set SEO meta (canonical, og:url, twitter:url) for this
  // page only. Cleaned up on unmount so other routes are unaffected.
  useEffect(() => {
    const added: HTMLElement[] = []

    if (!document.querySelector(`link[rel="stylesheet"][href="${FONT_HREF}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
      added.push(link)
    }

    const setMeta = (
      kind: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`)
      const previousContent = el?.getAttribute('content') ?? null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(kind, key)
        document.head.appendChild(el)
        added.push(el)
      }
      el.setAttribute('content', content)
      // Restore on unmount when we did not own the element
      if (previousContent !== null) {
        return () => el!.setAttribute('content', previousContent)
      }
      return () => {}
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') ?? null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
      added.push(canonical)
    }
    canonical.setAttribute('href', CANONICAL)

    const restorers: Array<() => void> = []
    restorers.push(setMeta('property', 'og:url', CANONICAL))
    restorers.push(setMeta('name', 'twitter:url', CANONICAL))
    restorers.push(setMeta('property', 'og:title', 'The Buyer View · An intelligence system for marketing leaders'))
    restorers.push(setMeta('name', 'twitter:title', 'The Buyer View · An intelligence system for marketing leaders'))

    const previousTitle = document.title
    document.title = 'The Buyer View · An intelligence system for marketing leaders'

    return () => {
      document.title = previousTitle
      for (const el of added) el.remove()
      if (previousCanonical && canonical) canonical.setAttribute('href', previousCanonical)
      for (const r of restorers) r()
    }
  }, [])

  return (
    <div style={{ background: PAPER, color: INK, fontFamily: BODY }}>
      <TopNav />
      <Hero />
      <SectionBuyerView />
      <ScopeReadout />
      <SectionTheRead />
      <SectionAdvantage />
      <SectionProgram />
      <SectionClose />
    </div>
  )
}

/* ──────────────────────────────────────────────
   TOP NAV — page-specific, brand-agnostic
   ────────────────────────────────────────────── */

function TopNav() {
  const posthog = usePostHog()
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: PAPER,
        borderBottom: `1px solid ${INK}`,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <a
          href="/"
          aria-label="ERA"
          style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: INK }}
        >
          <img src="/era-symbol.png" alt="ERA" style={{ height: 22, width: 'auto', display: 'block' }} />
          <span style={{ width: 1, height: 18, background: 'rgba(10,10,10,0.22)' }} aria-hidden />
          <span style={{ ...mono(11, INK, 700), whiteSpace: 'nowrap' }}>▸ THE BUYER VIEW</span>
        </a>
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <a href="#the-view" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE VIEW</a>
          <a href="#the-read" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE MOMENTS</a>
          <a href="#the-program" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE PROGRAM</a>
          <a href="#the-advantage" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE ADVANTAGE</a>
          <a
            href="#gain-access"
            onClick={() => posthog?.capture('buyerview_cta_clicked', { location: 'nav' })}
            style={{
              ...mono(13, PAPER, 700),
              background: INK,
              color: PAPER,
              padding: '10px 20px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            GET YOUR FIRST REPORT FREE
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ──────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────── */

const HERO_CSS = `
@container (max-width: 920px) {
  [data-hero-grid] { grid-template-columns: minmax(0, 1fr) !important; }
  [data-hero-form] { margin-top: 8px; }
}
`

function Hero() {
  return (
    <section style={{ background: PAPER, padding: '88px 32px 64px', containerType: 'inline-size' }}>
      <style>{HERO_CSS}</style>
      <Container>
        <div
          data-hero-grid
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(320px, 1fr)',
            gap: 56,
            alignItems: 'start',
          }}
        >
          {/* Left — the why-now */}
          <div>
            <div style={mono(11, MUTED, 700)}>▸ THE BUYER VIEW</div>
            <h1
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 'clamp(64px, 8.5vw, 148px)',
                lineHeight: 0.9,
                letterSpacing: '-0.018em',
                textTransform: 'uppercase',
                color: INK,
                margin: '28px 0 32px',
              }}
            >
              <span style={{ display: 'block' }}>See what</span>
              <span style={{ display: 'block' }}>your buyer</span>
              <span style={{ display: 'block', color: HOT }}>sees.</span>
            </h1>
            <p
              style={{
                fontFamily: BODY,
                fontSize: 20,
                lineHeight: 1.5,
                color: INK,
                maxWidth: 640,
                margin: '0 0 28px',
                fontWeight: 400,
              }}
            >
              Before a buyer ever talks to you, they have met your brand across a dozen places your
              reporting cannot see, from review sites and peer threads to AI answers, and the Buyer
              View shows you those surfaces the way the buyer meets them, including what an AI agent
              says when no one is in the room.
            </p>
            <div style={{ ...mono(10, MUTED, 700), lineHeight: 1.7 }}>
              300+ DATA POINTS · 11 SURFACES READ · A 90-DAY ROLLING WINDOW
            </div>
          </div>

          {/* Right — the qualifying form */}
          <div data-hero-form>
            <BuyerViewForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   BUYER VIEW FORM — in-hero request
   Reuses the existing eracx.com contact backend (POST /api/contact with
   { name, company, email, message }). The company website folds into the
   company field and the message. Honeypot ("website" field) silently absorbs
   naive bots. v4 tokens only: 1px rule, no rounded corners, no shadow.
   ────────────────────────────────────────────── */

type FormState = 'idle' | 'submitting' | 'qualified' | 'error'

function BuyerViewForm() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const posthog = usePostHog()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: a bot auto-filled the hidden field. Show success without
    // contacting the backend so it does not retry.
    if (honeypot) {
      setSubmittedEmail(email || 'your inbox')
      setStatus('qualified')
      return
    }

    if (!firstName || !email || !companyWebsite) {
      setStatus('error')
      setErrorMessage('Every field is required.')
      posthog?.capture('buyerview_report_validation_error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    posthog?.capture('buyerview_report_submitted', { company_website: companyWebsite })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: firstName,
          company: companyWebsite,
          email,
          message: `Buyer View request (/buyerview)\nCompany website: ${companyWebsite}`,
        }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || `Request failed (${response.status})`)
      }
      setSubmittedEmail(email)
      setStatus('qualified')
      posthog?.identify(email, { email, name: firstName, company_website: companyWebsite })
      posthog?.capture('buyerview_report_requested', { company_website: companyWebsite })
      setFirstName('')
      setEmail('')
      setCompanyWebsite('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Try again in a moment.',
      )
      posthog?.capture('buyerview_report_request_failed', {
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  const wrap: CSSProperties = {
    border: `1px solid ${INK}`,
    background: PAPER,
    padding: '26px 24px 28px',
  }

  if (status === 'qualified') {
    return (
      <div id="gain-access" style={wrap}>
        <div style={{ ...mono(11, HOT, 700), marginBottom: 14 }}>▸ YOUR REPORT IS UNDERWAY</div>
        <p style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.55, color: INK, margin: 0 }}>
          We read your category before we reply, so the first note lands with something in it. Watch
          for it at {submittedEmail}.
        </p>
        <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${LINE}` }}>
          <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.5, color: MUTED, margin: '0 0 12px' }}>
            While you wait, here is a full sample Buyer View for a fictional brand.
          </p>
          <a
            href="/buyerview/sample"
            onClick={() => posthog?.capture('buyerview_sample_clicked', { location: 'form_success' })}
            style={{
              ...mono(12, PAPER, 700),
              display: 'inline-block',
              background: INK,
              color: PAPER,
              padding: '12px 18px',
              textDecoration: 'none',
            }}
          >
            SEE A SAMPLE →
          </a>
        </div>
      </div>
    )
  }

  return (
    <form id="gain-access" onSubmit={handleSubmit} noValidate style={wrap}>
      <div style={{ ...mono(11, INK, 700), marginBottom: 6 }}>▸ GET YOUR REPORT</div>
      <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.5, color: MUTED, margin: '0 0 20px' }}>
        Due to high demand, we may not reply for a few days. But we're just as excited as you to see
        what your buyer sees. In the meantime,{' '}
        <a
          href="/buyerview/sample"
          onClick={() => posthog?.capture('buyerview_sample_clicked', { location: 'form_intro' })}
          style={{ color: HOT, fontWeight: 700, textDecoration: 'underline' }}
        >
          read a full sample report
        </a>
        .
      </p>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />

      <FormField label="First name" htmlFor="bv-first">
        <input id="bv-first" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required style={inputStyle} />
      </FormField>
      <FormField label="Work email" htmlFor="bv-email">
        <input id="bv-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required style={inputStyle} />
      </FormField>
      <FormField label="Company website" htmlFor="bv-website">
        <input id="bv-website" type="url" inputMode="url" placeholder="https://" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} autoComplete="url" required style={inputStyle} />
      </FormField>

      {status === 'error' && (
        <div role="alert" aria-live="polite" style={{ ...mono(10, HOT, 700), marginBottom: 14, lineHeight: 1.5 }}>
          {errorMessage || 'Something went wrong. Try again in a moment.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          ...mono(13, PAPER, 700),
          background: INK,
          color: PAPER,
          border: 'none',
          padding: '14px 20px',
          width: '100%',
          cursor: status === 'submitting' ? 'default' : 'pointer',
        }}
      >
        {status === 'submitting' ? '· · · SENDING' : 'GET YOUR FIRST REPORT FREE'}
      </button>
    </form>
  )
}

const inputStyle: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: BODY,
  fontSize: 15,
  color: INK,
  background: PAPER,
  border: `1px solid ${LINE}`,
  borderRadius: 0,
  padding: '11px 12px',
  outline: 'none',
}

function FormField({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label htmlFor={htmlFor} style={{ ...mono(10, MUTED, 700), display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

/* ──────────────────────────────────────────────
   SCOPE READOUT — big-number grid with count-up
   Big "300+" anchors the band. Six secondary cells run beside it on
   desktop and reflow to 3×2 / 2×3 / 2-col / single column as the band
   narrows. Numbers count up once when the band scrolls into view; under
   prefers-reduced-motion the final values render immediately.
   ────────────────────────────────────────────── */

type ScopeCell = {
  /** Display string after animation completes (e.g. "300+", "90D"). */
  finalText: string
  /** Numeric target the count-up rolls toward. */
  target: number
  /** Suffix appended after the count-up settles ("+", "D", or ""). */
  suffix: string
  label: string
  size: 'anchor' | 'cell'
}

// The executive-voices count is under correction elsewhere in the project,
// so it does not appear as a published integer here. The leadership-graph
// read is carried descriptively in the scope intro line and the prose
// instead. Five cells run beside the 300+ anchor; the last spans two
// columns so the 3x2 grid reads as intentional with no empty slot.
const SCOPE_CELLS: ScopeCell[] = [
  { finalText: '300+', target: 300, suffix: '+', label: 'DATA POINTS PER READ, EVERY QUARTER', size: 'anchor' },
  { finalText: '11',   target: 11,  suffix: '',  label: 'SURFACES READ',                       size: 'cell' },
  { finalText: '5',    target: 5,   suffix: '',  label: 'LOGGED-IN PLATFORMS',                 size: 'cell' },
  { finalText: '8',    target: 8,   suffix: '',  label: 'BUYER INTENT CATEGORIES',             size: 'cell' },
  { finalText: '4',    target: 4,   suffix: '',  label: 'AI AGENTS QUERIED',                   size: 'cell' },
  { finalText: '90D',  target: 90,  suffix: 'D', label: 'ROLLING WINDOW',                      size: 'cell' },
]

const SCOPE_READOUT_CSS = `
@container (max-width: 1100px) {
  [data-scope-grid] {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  [data-scope-anchor] {
    border-right: none !important;
    border-bottom: 1px solid #0A0A0A !important;
  }
  [data-scope-cells] {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
  [data-scope-cell]:nth-child(3n) {
    border-right: none !important;
  }
  [data-scope-cell]:nth-child(n+4) {
    border-top: 1px solid #0A0A0A !important;
  }
}
@container (max-width: 720px) {
  [data-scope-cells] {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
  [data-scope-cell] {
    border-right: 1px solid #0A0A0A !important;
    border-top: 1px solid #0A0A0A !important;
  }
  [data-scope-cell]:nth-child(2n) {
    border-right: none !important;
  }
  [data-scope-cell]:nth-child(-n+2) {
    border-top: none !important;
  }
  /* The last cell spans both columns; it owns the right edge, so no rule. */
  [data-scope-cell]:last-child {
    border-right: none !important;
  }
}
`

function ScopeReadout() {
  const ref = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setAnimate(true)
      return
    }
    const node = ref.current
    let triggered = false
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered) {
            triggered = true
            setAnimate(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Buyer View scope"
      style={{
        background: PARCHMENT,
        borderTop: `1px solid ${INK}`,
        borderBottom: `1px solid ${INK}`,
        containerType: 'inline-size',
      }}
    >
      <style>{SCOPE_READOUT_CSS}</style>

      {/* Intro — frames the read before the numbers. */}
      <div style={{ padding: '40px 36px 34px', borderBottom: `1px solid ${INK}` }}>
        <div style={{ ...mono(11, INK, 700), marginBottom: 16 }}>▸ WHAT EVERY READ MEASURES</div>
        <p style={{ fontFamily: BODY, fontSize: 18, lineHeight: 1.6, color: INK, maxWidth: 900, margin: 0 }}>
          The reading runs on a 90-day rolling window across the surfaces the buyer actually visits:
          the logged-in platforms like LinkedIn and Glassdoor, your own pages, the review sites, the
          peer communities, and the AI agents answering on your behalf.
        </p>
      </div>

      <div
        data-scope-grid
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 340px) minmax(0, 1fr)',
        }}
      >
        {/* Anchor — 300+ */}
        <ScopeAnchor cell={SCOPE_CELLS[0]} animate={animate} delayMs={0} />

        {/* Five cells in a 3×2 grid; the last spans two columns so there
            is no empty slot. */}
        <div
          data-scope-cells
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          }}
        >
          {SCOPE_CELLS.slice(1).map((cell, idx, arr) => {
            // Row 1 = idx 0,1,2 (cols 1,2,3). Row 2 = idx 3 (col 1) and the
            // last cell (idx 4) spanning cols 2–3. Right borders on inner
            // columns; bottom borders only under row 1. The band's top/bottom
            // rules and the anchor's right rule frame the grid.
            const isLast = idx === arr.length - 1
            const borderRight = idx === 0 || idx === 1 || idx === 3
            const borderBottom = idx < 3
            return (
              <ScopeCellTile
                key={cell.label}
                cell={cell}
                animate={animate}
                delayMs={(idx + 1) * 60}
                borderRight={borderRight}
                borderBottom={borderBottom}
                colSpan={isLast ? 2 : 1}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ScopeAnchor({ cell, animate, delayMs }: { cell: ScopeCell; animate: boolean; delayMs: number }) {
  const value = useCountUp(cell.target, animate, delayMs)
  return (
    <div
      data-scope-anchor
      style={{
        padding: '48px 36px 48px',
        borderRight: `1px solid ${INK}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(120px, 14vw, 160px)',
          lineHeight: 0.88,
          letterSpacing: '-0.018em',
          color: INK,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
        {value === cell.target ? cell.suffix : ''}
      </div>
      <div style={{ ...mono(11, INK, 700), marginTop: 14, maxWidth: 280 }}>{cell.label}</div>
    </div>
  )
}

function ScopeCellTile({
  cell,
  animate,
  delayMs,
  borderRight,
  borderBottom,
  colSpan = 1,
}: {
  cell: ScopeCell
  animate: boolean
  delayMs: number
  borderRight: boolean
  borderBottom: boolean
  colSpan?: number
}) {
  const value = useCountUp(cell.target, animate, delayMs)
  return (
    <div
      data-scope-cell
      style={{
        gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
        padding: '28px 28px 26px',
        borderRight: borderRight ? `1px solid ${INK}` : 'none',
        borderBottom: borderBottom ? `1px solid ${INK}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 132,
      }}
    >
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(48px, 6vw, 72px)',
          lineHeight: 0.88,
          letterSpacing: '-0.018em',
          color: INK,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
        {value === cell.target ? cell.suffix : ''}
      </div>
      <div style={{ ...mono(10, INK, 700), marginTop: 12 }}>{cell.label}</div>
    </div>
  )
}

/* Count-up hook. Linear ramp from 0 → target over ~900ms after `delayMs`.
   Returns `target` immediately if `animate` is false (which we set on
   first trigger AND on prefers-reduced-motion). */
function useCountUp(target: number, animate: boolean, delayMs: number) {
  const [value, setValue] = useState(animate ? 0 : target)

  useEffect(() => {
    if (!animate) {
      setValue(target)
      return
    }
    let raf = 0
    let started = false
    let startTime = 0
    const duration = 900

    const tick = (t: number) => {
      if (!started) {
        started = true
        startTime = t + delayMs
      }
      const elapsed = t - startTime
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      if (elapsed >= duration) {
        setValue(target)
        return
      }
      const progress = elapsed / duration
      const current = Math.round(target * progress)
      setValue(current)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animate, target, delayMs])

  return value
}

/* ──────────────────────────────────────────────
   COMPETITORS — stacked full-density mini seismographs
   Three illustrative-composite silhouettes shown beside the hero chart. Each
   mini reuses the hero's channel x-positions (CHANNEL_CENTERS, 1600-wide
   space) and the same congruence envelope, drawn at full line density (~11
   lines per channel cluster) so it reads as the real instrument shrunk down,
   not a simplified mock. Cropped to the bars only — no axis labels, no
   annotations, no card. Seeded jitter keeps each silhouette stable.
   ────────────────────────────────────────────── */

const MINI_VIEWBOX = '110 20 1440 360'
const MINI_BASE = 190
const MINI_MAXUP = 150
const MINI_MAXDOWN = 165
const MINI_BARW = 5
const MINI_SPREAD = 90
const MINI_LINES = 11 // lines per channel cluster — matches the hero's density

const COMP_CHANNEL_X: Record<string, number> = Object.fromEntries(
  CHANNEL_CENTERS.map((c) => [c.id, c.x]),
)

// Deterministic PRNG so the scattered lines stay put across renders.
function mulberry32(seed: number) {
  let s = seed
  return function () {
    s = (s + 0x6d2b79f5) | 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type MiniBar = { x: number; mag: number; d: 1 | -1 }

function buildMiniBars(competitor: Competitor, seed: number): MiniBar[] {
  const rand = mulberry32(seed)
  const bars: MiniBar[] = []
  for (const ch of competitor.channels) {
    const cx = COMP_CHANNEL_X[ch.id]
    if (cx === undefined) continue
    for (let i = 0; i < MINI_LINES; i++) {
      const x = cx + (rand() * 2 - 1) * MINI_SPREAD
      const magFactor = 0.6 + 0.4 * rand() // texture; tallest line ≈ the channel's m
      bars.push({ x, mag: ch.m * magFactor, d: ch.d })
    }
  }
  return bars
}

function MiniSeismograph({ competitor, color, seed }: { competitor: Competitor; color: string; seed: number }) {
  const bars = useMemo(() => buildMiniBars(competitor, seed), [competitor, seed])
  return (
    <svg
      viewBox={MINI_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={`${competitor.name} buyer-view silhouette`}
    >
      {bars.map((b, i) => {
        const h =
          b.d === 1
            ? b.mag * MINI_MAXUP * congruenceEnvelope(b.x)
            : b.mag * MINI_MAXDOWN * congruenceDownScale(b.x)
        const y = b.d === 1 ? MINI_BASE - h : MINI_BASE
        return (
          <rect
            key={i}
            x={b.x - MINI_BARW / 2}
            y={y}
            width={MINI_BARW}
            height={h}
            fill={color}
            opacity={b.d === 1 ? 0.85 : 1}
          />
        )
      })}
    </svg>
  )
}

// Silhouette/arrow/band color. On a dark slide "behind" (ink) would vanish,
// so it renders white there; "ahead" stays magenta on either background.
function statusColor(status: Competitor['status'], dark: boolean): string {
  if (status === 'behind' && dark) return '#FFFFFF'
  return STATUS_COLOR[status]
}

function CompetitorMini({ competitor, seed, dark = false }: { competitor: Competitor; seed: number; dark?: boolean }) {
  const color = statusColor(competitor.status, dark)
  const nameColor = dark ? CREAM : INK
  return (
    <div>
      {/* Header — name left, status arrow right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 8,
        }}
      >
        <span style={mono(11, nameColor, 700)}>{competitor.name.toUpperCase()}</span>
        <span style={mono(14, color, 700)} aria-label={competitor.status}>
          {STATUS_ARROW[competitor.status]}
        </span>
      </div>
      <MiniSeismograph competitor={competitor} color={color} seed={seed} />
      {/* Status band */}
      <div style={{ height: 3, background: color, marginTop: 8 }} />
    </div>
  )
}

const COMPETITORS_CSS = `
.sm-comps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 30px; }
@media (max-width: 720px) {
  .sm-comps { grid-template-columns: minmax(0, 1fr); gap: 22px; }
}
`

/* Three-across competitor comparison. Lives in the Summary slide (dark), so it
   defaults to the dark theme; pass dark={false} to use it on a light surface. */
function CompetitorsComparison({ dark = true }: { dark?: boolean }) {
  const labelColor = dark ? CREAM_MUTED : MUTED
  return (
    <div>
      <style>{COMPETITORS_CSS}</style>
      <div style={{ ...mono(11, labelColor, 700), marginBottom: 18 }}>▸ COMPETITORS</div>
      <div className="sm-comps">
        {COMPETITORS.map((c, i) => (
          <CompetitorMini key={c.name} competitor={c} seed={7001 + i * 1013} dark={dark} />
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ▸ 01 THE BUYER VIEW — seismograph hero (paper)
   ────────────────────────────────────────────── */

function SectionBuyerView() {
  return (
    <section
      id="the-view"
      style={{ background: PAPER, padding: '96px 32px 88px', borderBottom: `1px solid ${INK}` }}
    >
      <Container>
        <div style={mono(11, MUTED, 700)}>{formatSectionLabel('01', 'THE BUYER VIEW')}</div>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 112px)',
            lineHeight: 0.9,
            letterSpacing: '-0.018em',
            textTransform: 'uppercase',
            color: INK,
            margin: '24px 0 24px',
            maxWidth: 1100,
          }}
        >
          This is the field your buyer actually sees.
        </h2>
        <p
          style={{
            fontFamily: BODY,
            fontSize: 18,
            lineHeight: 1.6,
            color: INK,
            maxWidth: 880,
            margin: '0 0 40px',
          }}
        >
          Eleven surfaces, left to right by how directly the buyer trusts them. The center is where
          attention lands and credibility is highest: personal LinkedIn, AI agents, customer
          reviews. The edges are ambient: programmatic ads, third-party mentions. Bars above the
          line prove the promise. Bars below contradict it. The priority breaks, marked in magenta,
          are where the most credible surfaces work against the brand.
        </p>

        {/* In-chart legend */}
        <div
          style={{
            display: 'flex',
            gap: 26,
            flexWrap: 'wrap',
            paddingBottom: 16,
            borderBottom: `1px solid ${LINE}`,
            marginBottom: 26,
          }}
        >
          <LegendSwatch swatch={PARCHMENT} outline label="Ideal congruence" />
          <LegendSwatch swatch="#1845C2" label="Moments reinforcing" />
          <LegendSwatch swatch={HOT} label="Priority break" />
          <span style={{ ...mono(10, MUTED, 700), marginLeft: 'auto' }}>
            ↳ CLICK LINKEDIN · AI AGENTS · REVIEWS · COMMUNITIES TO SEE THE CONTENT
          </span>
        </div>

        {/* Full-bleed seismograph — full breadth of the read under the hero */}
        <div
          style={{
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            width: '100vw',
            paddingLeft: 'max(24px, calc((100vw - 1400px) / 2))',
            paddingRight: 'max(24px, calc((100vw - 1400px) / 2))',
            boxSizing: 'border-box',
          }}
        >
          <PeripheralSeismograph moments={ILLUSTRATIVE_MOMENTS} />
        </div>

        {/* Honest split: most of the 11 channels are public surfaces the
            system reads for any brand. Ads, Sponsored, Owned, and Instagram
            need composite or client-side data, so they ride as illustrative
            for this marketing surface. */}
        <div
          style={{
            ...mono(10, MUTED, 700),
            marginTop: 28,
            textAlign: 'right',
            lineHeight: 1.7,
          }}
        >
          60% DIRECTLY OBSERVED FROM PUBLIC SURFACES · LINKEDIN · AI AGENTS · REVIEWS · COMPANY · COMMUNITIES · TWITTER / X · THIRD-PARTY
          <br />
          NOT A REAL CLIENT AUDIT
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ▸ 03 THE MOMENTS — the read track
   Ported from buyer-view-read-track.html. A sticky progress strip plus five
   full-bleed slides (four moment slides + the verdict), the buyer journey in
   sequence. Stat count-up + progress states via IntersectionObserver.
   Annotations anchor to live artifact elements (refs), not pixel offsets.
   All styling is section-scoped in THE_MOMENTS_CSS; shared tokens untouched.
   ────────────────────────────────────────────── */

const THE_MOMENTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

#the-read{ --tm-ui:'Inter',system-ui,sans-serif; --tm-gd:#0caa41; background:#fff; }
#the-read .tm-in{max-width:1360px;margin:0 auto;padding:0 48px;}

#the-read .tm-prog{position:sticky;top:51px;z-index:40;background:#fff;border-bottom:1px solid #0A0A0A;}
#the-read .tm-prog .tm-in{padding:11px 48px;display:flex;align-items:center;gap:20px;}
#the-read .tm-prog-lab{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(10,10,10,0.55);}
#the-read .tm-prog-segs{display:flex;gap:5px;flex:1;max-width:340px;}
#the-read .tm-seg{height:5px;flex:1;background:#F4F1EA;border:1px solid rgba(10,10,10,0.16);transition:background .3s,border-color .3s;}
#the-read .tm-seg.on{background:#E6195F;border-color:#E6195F;}
#the-read .tm-prog-mode{font-family:'Anton',sans-serif;font-size:17px;text-transform:uppercase;letter-spacing:0.01em;transition:color .3s;margin-left:auto;}
#the-read .tm-prog-mode.passive{color:#0A0A0A;}
#the-read .tm-prog-mode.active{color:#E6195F;}

#the-read .tm-sec-head{padding-top:62px;padding-bottom:46px;background:#fff;}
#the-read .tm-eyebrow{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(10,10,10,0.55);margin-bottom:20px;}
#the-read .tm-eyebrow .tm-hot{color:#E6195F;}
#the-read .tm-h1{font-family:'Anton',sans-serif;font-size:78px;line-height:0.9;letter-spacing:-0.02em;text-transform:uppercase;margin-bottom:24px;}
#the-read .tm-lede{font-size:18px;line-height:1.55;max-width:760px;font-family:'IBM Plex Sans',system-ui,sans-serif;}

#the-read .tm-slide{position:relative;overflow:hidden;opacity:0;transform:translateY(20px);transition:opacity .55s ease,transform .55s ease;}
#the-read .tm-slide .tm-in{position:relative;z-index:1;}
#the-read .tm-bignum{position:absolute;top:50%;left:2.5%;transform:translateY(-50%);font-family:'Anton',sans-serif;font-size:clamp(240px,34vw,520px);line-height:0.78;letter-spacing:-0.03em;color:rgba(10,10,10,0.07);z-index:0;pointer-events:none;user-select:none;}
@media (max-width:860px){#the-read .tm-bignum{font-size:200px;left:-6px;}}
#the-read .tm-slide.seen{opacity:1;transform:none;}
#the-read .tm-slide.parchment{background:#F4F1EA;}
#the-read .tm-slide.paper{background:#fff;}
#the-read .tm-slide.ink{background:#0A0A0A;color:#fff;}
#the-read .tm-slide .tm-in{padding:54px 48px 50px;}

#the-read .tm-mhead{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-bottom:20px;border-bottom:1px solid rgba(10,10,10,0.16);}
#the-read .tm-slide.ink .tm-mhead{border-color:rgba(255,255,255,0.22);}
#the-read .tm-mhead-l{display:flex;align-items:center;gap:16px;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;flex-wrap:wrap;}
#the-read .tm-mhead-l .tm-n{color:#E6195F;}
#the-read .tm-chip{display:inline-flex;align-items:center;gap:8px;}
#the-read .tm-ico{width:22px;height:22px;border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
#the-read .tm-ico img{width:100%;height:100%;object-fit:contain;display:block;}
#the-read .tm-ico-atlas{background:#0E9384;}
#the-read .tm-ico-atlas svg{width:13px;height:13px;display:block;}
#the-read .tm-ico-fallback{width:14px;height:14px;border:1px solid rgba(10,10,10,0.4);display:block;}
#the-read .tm-slide.ink .tm-ico-fallback{border-color:rgba(255,255,255,0.4);}
#the-read .tm-pnm{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;}
#the-read .tm-mhead-r{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
#the-read .tm-seenby{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:rgba(10,10,10,0.55);}
#the-read .tm-slide.ink .tm-seenby{color:rgba(255,255,255,0.6);}
#the-read .tm-mini{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(10,10,10,0.55);}
#the-read .tm-blocks{display:flex;gap:3px;}
#the-read .tm-blocks i{width:10px;height:10px;background:transparent;border:1px solid rgba(10,10,10,0.55);display:block;}
#the-read .tm-blocks i.f{background:#E6195F;border-color:#E6195F;}
#the-read .tm-tag{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;letter-spacing:0.14em;padding:4px 9px;border:1px solid currentColor;text-transform:uppercase;}
#the-read .tm-tag.passive{color:#0A0A0A;}
#the-read .tm-tag.active{color:#fff;background:#E6195F;border-color:#E6195F;}
#the-read .tm-slide.ink .tm-tag.passive{color:#fff;}

#the-read .tm-body{display:grid;grid-template-columns:42% 58%;padding-top:38px;}
#the-read .tm-ev{padding-right:52px;}
#the-read .tm-num{font-family:'Anton',sans-serif;font-size:112px;line-height:0.8;letter-spacing:-0.02em;margin-bottom:18px;}
#the-read .tm-num .tm-sm{font-size:56px;color:rgba(10,10,10,0.55);}
#the-read .tm-slide.ink .tm-num{color:#fff;}
#the-read .tm-slide.ink .tm-num .tm-sm{color:rgba(255,255,255,0.55);}
#the-read .tm-src{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#E6195F;margin-bottom:14px;}
#the-read .tm-find{font-size:17px;line-height:1.52;font-family:'IBM Plex Sans',system-ui,sans-serif;}
#the-read .tm-slide.ink .tm-find{color:rgba(255,255,255,0.9);}
#the-read .tm-art{padding-left:52px;border-left:1px solid rgba(10,10,10,0.16);position:relative;}
#the-read .tm-slide.ink .tm-art{border-color:rgba(255,255,255,0.22);}

#the-read .tm-foot{margin-top:40px;padding-top:22px;border-top:1px solid rgba(10,10,10,0.16);font-size:16px;font-weight:500;font-family:'IBM Plex Sans',system-ui,sans-serif;}
#the-read .tm-slide.ink .tm-foot{border-color:rgba(255,255,255,0.22);color:#fff;}
#the-read .tm-foot .tm-h{color:#E6195F;font-weight:600;}

#the-read .tm-annot{position:absolute;display:flex;align-items:center;pointer-events:none;opacity:0;transform:translateY(-50%);transition:opacity .5s ease .25s;}
#the-read .tm-slide.seen .tm-annot{opacity:1;}
#the-read .tm-annot-dot{width:7px;height:7px;background:#E6195F;border-radius:999px;flex-shrink:0;}
#the-read .tm-annot-line{height:1px;background:#E6195F;width:46px;}
#the-read .tm-annot-tag{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#E6195F;white-space:nowrap;margin-left:10px;}
#the-read .tm-hl{background:rgba(230,25,95,0.16);box-shadow:inset 0 -2px 0 #E6195F;padding:0 2px;}

#the-read .tm-card{border:1px solid #0A0A0A;background:#fff;color:#0a0a0a;}
#the-read .tm-li{font-family:var(--tm-ui);padding:17px 19px;width:520px;max-width:100%;}
#the-read .tm-li-h{display:flex;gap:11px;align-items:center;margin-bottom:11px;}
#the-read .tm-li-av{width:42px;height:42px;border-radius:999px;background:linear-gradient(135deg,#1845C2,#0A66C2);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:14px;}
#the-read .tm-li-nm{font-size:14.5px;font-weight:600;color:#1d2226;}
#the-read .tm-li-sub{font-size:12px;color:rgba(0,0,0,.6);}
#the-read .tm-li-body{font-size:14px;line-height:1.5;color:#1d2226;margin-bottom:11px;}
#the-read .tm-li-rx{font-size:12px;color:rgba(0,0,0,.55);border-top:1px solid #eee;border-bottom:1px solid #eee;padding:8px 0;margin-bottom:9px;display:flex;justify-content:space-between;}
#the-read .tm-li-cm{display:flex;gap:8px;padding:5px 0 0;}
#the-read .tm-li-cav{width:28px;height:28px;border-radius:999px;flex-shrink:0;background:#5a6470;color:#fff;font-weight:700;font-size:10px;display:flex;align-items:center;justify-content:center;}
#the-read .tm-li-cb{background:#f2f2f2;border-radius:8px;padding:7px 10px;flex:1;border-left:3px solid #E6195F;}
#the-read .tm-li-cn{font-size:12px;font-weight:600;color:#1d2226;}
#the-read .tm-li-ct{font-size:12.5px;line-height:1.4;color:#1d2226;}

#the-read .tm-rd{font-family:var(--tm-ui);padding:15px 19px;width:520px;max-width:100%;}
#the-read .tm-rd-sub{font-size:12px;color:#7c7c7c;margin-bottom:6px;}
#the-read .tm-rd-sub b{color:#1a1a1b;}
#the-read .tm-rd-t{font-size:17px;font-weight:600;color:#1a1a1b;margin-bottom:13px;line-height:1.3;}
#the-read .tm-rd-c{border-top:1px solid #edeff1;padding-top:10px;border-left:3px solid #E6195F;padding-left:11px;}
#the-read .tm-rd-h{font-size:11.5px;color:#7c7c7c;margin-bottom:3px;}
#the-read .tm-rd-x{font-size:13px;color:#1c1c1c;line-height:1.45;}
#the-read .tm-rd-v{font-size:12px;font-weight:700;color:#ff4500;margin-top:5px;}

#the-read .tm-chat{width:540px;max-width:100%;background:#fff;border:1px solid #e6e6e6;border-radius:14px;font-family:var(--tm-ui);overflow:hidden;}
#the-read .tm-chat-top{display:flex;align-items:center;gap:9px;padding:12px 16px;border-bottom:1px solid #efefef;}
#the-read .tm-chat-mark{width:22px;height:22px;border-radius:6px;background:#0E9384;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
#the-read .tm-chat-mark svg{width:13px;height:13px;display:block;}
#the-read .tm-chat-name{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(10,10,10,0.55);}
#the-read .tm-chat-user{display:flex;justify-content:flex-end;padding:16px 16px 4px;}
#the-read .tm-chat-ubub{background:#f4f4f5;border-radius:18px;padding:10px 15px;font-size:14px;line-height:1.45;color:#1d2226;max-width:84%;}
#the-read .tm-chat-asst{display:flex;gap:10px;align-items:flex-start;padding:10px 16px 18px;}
#the-read .tm-chat-av{width:30px;height:30px;border-radius:999px;background:#0E9384;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
#the-read .tm-chat-av svg{width:16px;height:16px;display:block;}
#the-read .tm-chat-abody{flex:1;min-width:0;}
#the-read .tm-chat-atext{font-size:14.5px;line-height:1.55;color:#26262d;margin:3px 0 0;}
#the-read .tm-chat-atext strong{font-weight:700;}
#the-read .tm-chat-pills{display:flex;flex-wrap:wrap;gap:6px;margin-top:13px;}
#the-read .tm-chat-pill{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;color:#777;border:1px solid #e2e2e2;border-radius:999px;padding:5px 11px;}

#the-read .tm-gd{font-family:var(--tm-ui);display:flex;width:540px;max-width:100%;}
#the-read .tm-gd-s{padding:18px 24px;border-right:1px solid #e6e6e6;text-align:center;position:relative;flex-shrink:0;}
#the-read .tm-gd-big{font-size:44px;font-weight:700;color:#1d2939;line-height:1;}
#the-read .tm-gd-co{font-size:14px;font-weight:700;margin-bottom:8px;color:#1d2939;}
#the-read .tm-gd-st{font-size:17px;color:var(--tm-gd);letter-spacing:1px;margin:6px 0;}
#the-read .tm-gd-st .tm-gd-e{color:#dfe3e8;}
#the-read .tm-gd-rv{font-size:11px;color:#596573;}
#the-read .tm-gd-m{padding:16px 20px;flex:1;}
#the-read .tm-gd-pct{font-size:21px;font-weight:700;color:#e8762c;}
#the-read .tm-gd-pctl{font-size:11px;color:#596573;margin-bottom:13px;}
#the-read .tm-gd-rt{font-size:13.5px;font-weight:700;color:#1d2939;}
#the-read .tm-gd-rw{font-size:11.5px;color:#596573;line-height:1.4;}
#the-read .tm-gd-ring{position:absolute;left:14px;right:14px;top:38px;height:94px;border:2px solid #E6195F;border-radius:6px;opacity:0;transform:scale(1.12);transition:opacity .45s ease .3s,transform .45s ease .3s;pointer-events:none;}
#the-read .tm-slide.seen .tm-gd-ring{opacity:1;transform:scale(1);}

#the-read .tm-vtop{display:grid;grid-template-columns:42% 58%;padding-top:38px;align-items:start;}
#the-read .tm-vhero{padding-right:52px;}
#the-read .tm-vfind{padding-left:52px;border-left:1px solid rgba(255,255,255,0.22);}
#the-read .tm-scale{margin-top:50px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.22);}
#the-read .tm-scale-title{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:34px;}
#the-read .tm-scale-track{position:relative;height:56px;border:1px solid rgba(255,255,255,0.55);}
#the-read .tm-scale-band{position:absolute;top:0;bottom:0;background:rgba(255,255,255,0.12);border-left:1px solid rgba(255,255,255,0.45);border-right:1px solid rgba(255,255,255,0.45);display:flex;align-items:center;justify-content:center;}
#the-read .tm-scale-band span{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;color:rgba(255,255,255,0.55);}
#the-read .tm-scale-mk{position:absolute;top:-1px;bottom:-1px;width:3px;}
#the-read .tm-scale-mk.you{background:#E6195F;}
#the-read .tm-scale-mk.lead{background:#fff;}
#the-read .tm-scale-gap{position:absolute;top:-20px;height:13px;border-left:1px solid #E6195F;border-right:1px solid #E6195F;border-top:1px solid #E6195F;}
#the-read .tm-scale-gaplab{position:absolute;top:-42px;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#E6195F;white-space:nowrap;}
#the-read .tm-scale-labels{position:relative;height:18px;margin-top:13px;}
#the-read .tm-scale-labels span{position:absolute;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap;}
#the-read .tm-scale-labels .sl0{left:0;color:rgba(255,255,255,0.5);}
#the-read .tm-scale-labels .sl100{right:0;color:rgba(255,255,255,0.5);}
#the-read .tm-scale-labels .sl{transform:translateX(-50%);}
#the-read .tm-scale-labels .sl.you{color:#E6195F;}
#the-read .tm-scale-labels .sl.lead{color:#fff;}

@media (max-width:860px){
  #the-read .tm-in{padding:0 24px;}
  #the-read .tm-prog .tm-in{padding:11px 24px;}
  #the-read .tm-prog-lab,#the-read .tm-prog-mode{display:none;}
  #the-read .tm-prog-segs{max-width:none;}
  #the-read .tm-slide .tm-in{padding:40px 24px 38px;}
  #the-read .tm-h1{font-size:46px;}
  #the-read .tm-body,#the-read .tm-vtop{grid-template-columns:1fr;}
  #the-read .tm-ev,#the-read .tm-vhero{padding-right:0;}
  #the-read .tm-art{padding-left:0;border-left:none;border-top:1px solid rgba(10,10,10,0.16);margin-top:34px;padding-top:34px;}
  #the-read .tm-vfind{padding-left:0;border-left:none;border-top:1px solid rgba(255,255,255,0.22);margin-top:30px;padding-top:30px;}
  #the-read .tm-num{font-size:84px;}
  #the-read .tm-annot{display:none;}
}

/* Summary slide on white — re-tint the scale and dividers that were authored
   for the ink background so they read on paper. A solid top rule sets the
   outcome apart from the moments above. */
#the-read .tm-slide.tm-summary{border-top:2px solid #0A0A0A;}
#the-read .tm-slide.tm-summary .tm-in{padding-top:64px;}
#the-read .tm-slide.tm-summary .tm-vfind{border-left-color:rgba(10,10,10,0.16);}
#the-read .tm-slide.tm-summary .tm-scale{border-top-color:rgba(10,10,10,0.16);}
#the-read .tm-slide.tm-summary .tm-scale-title{color:rgba(10,10,10,0.55);}
#the-read .tm-slide.tm-summary .tm-scale-track{border-color:rgba(10,10,10,0.45);}
#the-read .tm-slide.tm-summary .tm-scale-band{background:rgba(10,10,10,0.06);border-left-color:rgba(10,10,10,0.30);border-right-color:rgba(10,10,10,0.30);}
#the-read .tm-slide.tm-summary .tm-scale-band span{color:rgba(10,10,10,0.55);}
#the-read .tm-slide.tm-summary .tm-scale-mk.lead{background:#0A0A0A;}
#the-read .tm-slide.tm-summary .tm-scale-labels .sl0,#the-read .tm-slide.tm-summary .tm-scale-labels .sl100{color:rgba(10,10,10,0.5);}
#the-read .tm-slide.tm-summary .tm-scale-labels .sl.lead{color:#0A0A0A;}
@media (max-width:860px){
  #the-read .tm-slide.tm-summary .tm-vfind{border-top-color:rgba(10,10,10,0.16);}
}
`

type TmMode = 'passive' | 'active' | 'verdict'
const TM_MODES: TmMode[] = ['passive', 'passive', 'active', 'active', 'verdict']

type TmArtifactProps = {
  cardRef: React.RefObject<HTMLDivElement | null>
  targetRef: React.RefObject<HTMLDivElement | null>
}

type TmMoment = {
  num: string
  name: string
  platform: string
  icon: string
  seenby: string
  impact: number
  mode: 'passive' | 'active'
  tag: string
  bg: 'parchment' | 'paper'
  stat: { target: number; dec: number; suffix: string }
  source: string
  finding: string
  artifact: (p: TmArtifactProps) => React.ReactElement
  annot: string
  footLead: string
  footHot: string
}

/* Spark glyph — the Atlas mark, white on teal. Shared by the chip and the
   moment-03 chat (top strip mark + assistant avatar). */
function SparkGlyph() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <path
        d="M36 14c1.9 14.2 5.8 18.1 20 20-14.2 1.9-18.1 5.8-20 20-1.9-14.2-5.8-18.1-20-20 14.2-1.9 18.1-5.8 20-20Z"
        fill="#fff"
      />
    </svg>
  )
}

/* Platform chip icon — real SVG from /images/buyerview/icons for the real
   platforms. Atlas is a fictional engine with no logo, so its teal spark mark
   is rendered inline (never the outline fallback). */
function PlatformIcon({ name }: { name: string }) {
  const [ok, setOk] = useState(true)
  if (name === 'atlas') {
    return (
      <span className="tm-ico tm-ico-atlas" aria-hidden>
        <SparkGlyph />
      </span>
    )
  }
  return (
    <span className="tm-ico">
      {ok ? (
        <img src={`/images/buyerview/icons/${name}.svg`} alt="" onError={() => setOk(false)} />
      ) : (
        <span className="tm-ico-fallback" aria-hidden />
      )}
    </span>
  )
}

/* Count-up — runs once when its slide reveals. Holds its own value so a
   parent re-render (active-slide change) never resets it. */
function StatNum({ target, dec, suffix, inView }: { target: number; dec: number; suffix: string; inView: boolean }) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const reduced =
      typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVal(target)
      return
    }
    let raf = 0
    let start = 0
    const dur = 1100
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setVal(target * p)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])
  return (
    <>
      {val.toFixed(dec)}
      {suffix}
    </>
  )
}

/* Annotation — anchored to a live target element, not a pixel offset. Dot
   sits at the card's right edge, vertically centered on the target row.
   Recomputes on resize so it survives width changes. Hidden on mobile. */
function TmAnnotation({
  containerRef,
  cardRef,
  targetRef,
  label,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  cardRef: React.RefObject<HTMLDivElement | null>
  targetRef: React.RefObject<HTMLDivElement | null>
  label: string
}) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)
  useEffect(() => {
    const measure = () => {
      const c = containerRef.current
      const k = cardRef.current
      const t = targetRef.current
      if (!c || !k || !t) return
      const cr = c.getBoundingClientRect()
      const kr = k.getBoundingClientRect()
      const tr = t.getBoundingClientRect()
      setPos({ left: kr.right - cr.left, top: tr.top - cr.top + tr.height / 2 })
    }
    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (ro && containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      if (ro) ro.disconnect()
    }
  }, [containerRef, cardRef, targetRef])
  if (!pos) return null
  return (
    <div className="tm-annot" style={{ left: pos.left, top: pos.top }}>
      <span className="tm-annot-dot" />
      <span className="tm-annot-line" />
      <span className="tm-annot-tag">{label}</span>
    </div>
  )
}

/* ── Live artifacts ── */

function LinkedInCard({ cardRef, targetRef }: TmArtifactProps) {
  return (
    <div className="tm-card tm-li" ref={cardRef}>
      <div className="tm-li-h">
        <div className="tm-li-av">PR</div>
        <div>
          <div className="tm-li-nm">Priya Ramaswamy · 1st</div>
          <div className="tm-li-sub">Chief People Officer at Ascend · 2d</div>
        </div>
      </div>
      <div className="tm-li-body">
        Culture is not a perk you bolt on. It is the operating system everything runs on. When we say we elevate the
        employee experience, we mean it.
      </div>
      <div className="tm-li-rx">
        <span>Marcus Wen and 1,246 others</span>
        <span>118 comments</span>
      </div>
      <div className="tm-li-cm">
        <div className="tm-li-cav">JD</div>
        <div className="tm-li-cb" ref={targetRef}>
          <div className="tm-li-cn">[Former employee] · 64 likes</div>
          <div className="tm-li-ct">
            Would love to see this reflected on the inside. The sentiment on the ground is a different story right now.
          </div>
        </div>
      </div>
    </div>
  )
}

function RedditCard({ cardRef, targetRef }: TmArtifactProps) {
  return (
    <div className="tm-card tm-rd" ref={cardRef}>
      <div className="tm-rd-sub">
        <b>r/humanresources</b> · u/people_ops_throwaway · 14h
      </div>
      <div className="tm-rd-t">Anyone actually using Ascend? Considering it vs Vantage for ~800 employees</div>
      <div className="tm-rd-c" ref={targetRef}>
        <div className="tm-rd-h">u/burned_once · 8h</div>
        <div className="tm-rd-x">
          Read their <span className="tm-hl">Glassdoor</span> before you commit. Honestly{' '}
          <span className="tm-hl">Vantage</span>'s reporting is stronger if you need exec buy-in.
        </div>
        <div className="tm-rd-v">▲ 29</div>
      </div>
    </div>
  )
}

function AnswerEngineCard({ cardRef, targetRef }: TmArtifactProps) {
  return (
    <div className="tm-chat" ref={cardRef}>
      <div className="tm-chat-top">
        <span className="tm-chat-mark" aria-hidden>
          <SparkGlyph />
        </span>
        <span className="tm-chat-name">Atlas</span>
      </div>
      <div className="tm-chat-user">
        <div className="tm-chat-ubub">What are the best platforms for employee coaching and development?</div>
      </div>
      <div className="tm-chat-asst">
        <span className="tm-chat-av" aria-hidden>
          <SparkGlyph />
        </span>
        <div className="tm-chat-abody">
          <p className="tm-chat-atext" ref={targetRef}>
            The platforms most often cited as leaders are <strong>Vantage</strong> and{' '}
            <strong>Meridian</strong>, noted for breadth and enterprise adoption. A handful of smaller
            alternatives follow.
          </p>
          <div className="tm-chat-pills">
            <span className="tm-chat-pill">vantage.com</span>
            <span className="tm-chat-pill">g2.com</span>
            <span className="tm-chat-pill">analyst note</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function GlassdoorCard({ cardRef, targetRef }: TmArtifactProps) {
  return (
    <div className="tm-card tm-gd" ref={cardRef}>
      <div className="tm-gd-s" ref={targetRef}>
        <div className="tm-gd-co">Ascend</div>
        <div className="tm-gd-big">2.8</div>
        <div className="tm-gd-st">
          ★★★<span className="tm-gd-e">★★</span>
        </div>
        <div className="tm-gd-rv">1,204 reviews</div>
        <div className="tm-gd-ring" />
      </div>
      <div className="tm-gd-m">
        <div className="tm-gd-pct">41%</div>
        <div className="tm-gd-pctl">Recommend to a friend</div>
        <div className="tm-gd-rt">"Great mission, hard reality"</div>
        <div className="tm-gd-rw">
          Current Employee · 2+ years: leadership says one thing externally, another internally.
        </div>
      </div>
    </div>
  )
}

const TM_MOMENTS: TmMoment[] = [
  {
    num: '01',
    name: 'First impression',
    platform: 'LinkedIn',
    icon: 'linkedin',
    seenby: 'Seen by · a VP, mid-scroll',
    impact: 1,
    mode: 'passive',
    tag: 'Passive',
    bg: 'parchment',
    stat: { target: 94, dec: 0, suffix: '%' },
    source: '6sense · Buyer Experience Report 2025',
    finding:
      'Most vendor research is complete before a buyer contacts sales. The impression is forming now, in passive channels, and the audience reacting to a leadership post is mostly employees and peers. A single critical reply is read more closely than the praise above it.',
    artifact: LinkedInCard,
    annot: 'More likes than the post',
    footLead: 'The post says culture comes first.',
    footHot: 'The most-liked reply is a former employee who disagrees.',
  },
  {
    num: '02',
    name: 'The peer check',
    platform: 'Reddit',
    icon: 'reddit',
    seenby: 'Seen by · a practitioner, lurking',
    impact: 2,
    mode: 'passive',
    tag: 'Passive',
    bg: 'paper',
    stat: { target: 58.5, dec: 1, suffix: '%' },
    source: 'SparkToro · Zero-Click Study 2024',
    finding:
      'Most searches end without a click to any site. When the buyer checks with peers, the question is answered inside the thread, and the recommendation frequently points to someone else.',
    artifact: RedditCard,
    annot: 'Points to a rival',
    footLead: 'The brand says people teams trust it.',
    footHot: 'The thread points the buyer to a competitor.',
  },
  {
    num: '03',
    name: 'Asking the AI',
    platform: 'Atlas · AI',
    icon: 'atlas',
    seenby: 'Seen by · the project lead, comparing',
    impact: 4,
    mode: 'active',
    tag: 'Active',
    bg: 'parchment',
    stat: { target: 67, dec: 0, suffix: '%' },
    source: 'Gartner',
    finding:
      'Two-thirds of buyers prefer to research without talking to sales. When they ask an AI who leads the category, it answers in your place and names the vendors it treats as leaders.',
    artifact: AnswerEngineCard,
    annot: 'Two rivals. You are absent',
    footLead: 'The brand calls itself the category leader.',
    footHot: 'The agent names two rivals instead.',
  },
  {
    num: '04',
    name: 'Building the case',
    platform: 'Glassdoor',
    icon: 'glassdoor',
    seenby: 'Seen by · people ops, vetting',
    impact: 5,
    mode: 'active',
    tag: 'Active',
    bg: 'paper',
    stat: { target: 77, dec: 0, suffix: '%' },
    source: 'EMARKETER · Google + NRG',
    finding:
      'Most buyers reach a decision within twelve weeks. In that window they test the promise against the public record, and employer reviews are part of the record they read.',
    artifact: GlassdoorCard,
    annot: 'Checked before your demo',
    footLead: 'The brand says it elevates the employee experience.',
    footHot: 'Employees rate it 2.8.',
  },
]

function MomentSlide({
  data,
  index,
  seen,
  slideRef,
}: {
  data: TmMoment
  index: number
  seen: boolean
  slideRef: (el: HTMLElement | null) => void
}) {
  const artRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const Artifact = data.artifact
  return (
    <section ref={slideRef} data-i={index} className={`tm-slide ${data.bg}${seen ? ' seen' : ''}`}>
      <span className="tm-bignum" aria-hidden>{data.num}</span>
      <div className="tm-in">
        <div className="tm-mhead">
          <div className="tm-mhead-l">
            <span className="tm-n">{data.num}</span>
            <span>{data.name}</span>
            <span className="tm-chip">
              <PlatformIcon name={data.icon} />
              <span className="tm-pnm">{data.platform}</span>
            </span>
          </div>
          <div className="tm-mhead-r">
            <span className="tm-seenby">{data.seenby}</span>
            <span className="tm-mini">
              Impact
              <span className="tm-blocks">
                {[0, 1, 2, 3, 4].map((b) => (
                  <i key={b} className={b < data.impact ? 'f' : ''} />
                ))}
              </span>
            </span>
            <span className={`tm-tag ${data.mode === 'passive' ? 'passive' : 'active'}`}>{data.tag}</span>
          </div>
        </div>
        <div className="tm-body">
          <div className="tm-ev">
            <div className="tm-num">
              <StatNum target={data.stat.target} dec={data.stat.dec} suffix={data.stat.suffix} inView={seen} />
            </div>
            <div className="tm-src">{data.source}</div>
            <div className="tm-find">{data.finding}</div>
          </div>
          <div className="tm-art" ref={artRef}>
            <Artifact cardRef={cardRef} targetRef={targetRef} />
            <TmAnnotation containerRef={artRef} cardRef={cardRef} targetRef={targetRef} label={data.annot} />
          </div>
        </div>
        <div className="tm-foot">
          {data.footLead} <span className="tm-h">{data.footHot}</span>
        </div>
      </div>
    </section>
  )
}

function VerdictSlide({
  index,
  seen,
  slideRef,
}: {
  index: number
  seen: boolean
  slideRef: (el: HTMLElement | null) => void
}) {
  return (
    <section ref={slideRef} data-i={index} className={`tm-slide paper tm-summary${seen ? ' seen' : ''}`}>
      <span className="tm-bignum" aria-hidden>05</span>
      <div className="tm-in">
        <div className="tm-mhead">
          <div className="tm-mhead-l">
            <span className="tm-n">05</span>
            <span>Summary</span>
          </div>
          <div className="tm-mhead-r">
            <span className="tm-seenby">Seen by · the buying group, converging</span>
            <span className="tm-tag active">Outcome</span>
          </div>
        </div>
        <div className="tm-vtop">
          <div className="tm-vhero">
            <div className="tm-num">
              41<span className="tm-sm">/100</span>
            </div>
            <div className="tm-src">Buyer Trust Score · the sum of the five moments</div>
          </div>
          <div className="tm-find tm-vfind">
            The five moments add up to one number. At 41, this brand sits below the 65 that category leaders clear, and
            the 24-point gap forms entirely off the dashboard. Companies that close it grow faster, 19 percent against 12
            (Bain, B2B Growth Agenda 2026).
          </div>
        </div>
        <div className="tm-scale">
          <div className="tm-scale-title">Buyer Trust Score · 0 to 100</div>
          <div className="tm-scale-track">
            <div className="tm-scale-band" style={{ left: '28%', width: '8%' }}>
              <span>28–36</span>
            </div>
            <div className="tm-scale-gap" style={{ left: '41%', width: '24%' }} />
            <div className="tm-scale-gaplab" style={{ left: '53%' }}>
              24 points to the short-list
            </div>
            <div className="tm-scale-mk you" style={{ left: '41%' }} />
            <div className="tm-scale-mk lead" style={{ left: '65%' }} />
          </div>
          <div className="tm-scale-labels">
            <span className="sl0">0 · most brands</span>
            <span className="sl you" style={{ left: '41%' }}>
              You · 41
            </span>
            <span className="sl lead" style={{ left: '65%' }}>
              Short-list · 65
            </span>
            <span className="sl100">100</span>
          </div>
        </div>
        <div className="tm-foot">
          Five moments, none recorded in your pipeline,{' '}
          <span className="tm-h">set the short-list before your team entered the room.</span>
        </div>
        {/* Competitor comparison — the same instrument shrunk, three rivals
            beside the audited brand. Light theme to match the white slide. */}
        <div style={{ marginTop: 44, paddingTop: 32, borderTop: '1px solid rgba(10,10,10,0.16)' }}>
          <CompetitorsComparison dark={false} />
        </div>
      </div>
    </section>
  )
}

function SectionTheRead() {
  const slideEls = useRef<(HTMLElement | null)[]>([])
  const [seen, setSeen] = useState<boolean[]>(() => TM_MODES.map(() => false))
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) setSeen(TM_MODES.map(() => true))

    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i)
            setSeen((prev) => {
              if (prev[i]) return prev
              const next = [...prev]
              next[i] = true
              return next
            })
            revObs.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -22% 0px', threshold: 0.12 },
    )
    const actObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    slideEls.current.forEach((el) => {
      if (el) {
        revObs.observe(el)
        actObs.observe(el)
      }
    })
    return () => {
      revObs.disconnect()
      actObs.disconnect()
    }
  }, [])

  const activeMode = TM_MODES[active]
  const modeLabel = activeMode === 'verdict' ? 'Decided' : activeMode.charAt(0).toUpperCase() + activeMode.slice(1)
  const modeClass = activeMode === 'passive' ? 'passive' : 'active'

  return (
    <section id="the-read">
      <style>{THE_MOMENTS_CSS}</style>

      <div className="tm-prog">
        <div className="tm-in">
          <span className="tm-prog-lab">▸ The Moments</span>
          <div className="tm-prog-segs">
            {TM_MODES.map((_, i) => (
              <span key={i} className={`tm-seg${i <= active ? ' on' : ''}`} />
            ))}
          </div>
          <span className={`tm-prog-mode ${modeClass}`}>{modeLabel}</span>
        </div>
      </div>

      <div className="tm-in tm-sec-head">
        <div className="tm-eyebrow">
          ▸ 02 · <span className="tm-hot">The Moments</span>
        </div>
        <div className="tm-h1">
          The decision forms
          <br />
          before they become a lead.
        </div>
        <div className="tm-lede">
          There is no single buyer and no fixed order. A buying group meets these moments across surfaces you do not
          control and cannot measure, often more than one at a time. We have sequenced them so they can be read. The
          group does not.
        </div>
      </div>

      {TM_MOMENTS.map((d, i) => (
        <MomentSlide
          key={d.num}
          data={d}
          index={i}
          seen={seen[i]}
          slideRef={(el) => {
            slideEls.current[i] = el
          }}
        />
      ))}

      <VerdictSlide
        index={4}
        seen={seen[4]}
        slideRef={(el) => {
          slideEls.current[4] = el
        }}
      />

      <SampleCta />
    </section>
  )
}

/* See-a-sample CTA — links to the public Riiser sample audit. The four
   moment cards above are drawn from that same fictional brand, so the buyer
   can now read the full Buyer View it belongs to. */
function SampleCta() {
  const posthog = usePostHog()
  return (
    <div className="tm-in" style={{ padding: '0 0 96px' }}>
      <div
        style={{
          borderTop: `1px solid rgba(10,10,10,0.16)`,
          paddingTop: 40,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div style={{ ...mono(11, HOT, 700), marginBottom: 10 }}>SEE A SAMPLE</div>
          <div style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 18, lineHeight: 1.5, color: INK }}>
            These four moments belong to one fictional brand. Read the full Buyer View it adds up to, scored end to end.
          </div>
        </div>
        <a
          href="/buyerview/sample"
          onClick={() => posthog?.capture('buyerview_sample_clicked', { location: 'moments' })}
          style={{
            ...mono(13, PAPER, 700),
            background: INK,
            color: PAPER,
            padding: '14px 24px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          SEE THE FULL SAMPLE →
        </a>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   QUARTER-OVER-QUARTER TRAJECTORY (illustrative composite)
   The baseline read (Q1) and how the Buyer Trust Score closes on the field
   across the year. Drawn for the ink Program section.
   ────────────────────────────────────────────── */

type TrajStep = { q: string; score: number; label: string; body: string }
const TRAJ_STEPS: TrajStep[] = [
  { q: 'Q1', score: 41, label: 'Baseline', body: 'The first read. Every break named and ranked by what it costs you in pipeline.' },
  { q: 'Q2', score: 49, label: 'Breaks corrected', body: 'The priority contradictions are fixed first, so the most credible surfaces stop working against you.' },
  { q: 'Q3', score: 56, label: 'Core realigned', body: 'Reviews and AI answers move into agreement with the promise, and the center starts to hold.' },
  { q: 'Q4', score: 63, label: 'Gap closing', body: 'Trust compounds. The distance to the field narrows quarter over quarter, and the board can see it.' },
]
const TRAJ_QUARTERS = TRAJ_STEPS.map((s) => s.q)
const TRAJ_YOU = TRAJ_STEPS.map((s) => s.score)
const TRAJ_FIELD = [65, 65, 66, 67]

function QuarterTrajectory({ inView }: { inView: boolean }) {
  const VBW = 1120
  const VBH = 440
  const L = 72
  const R = 122 // room for the end-of-line value callouts
  const T = 44
  const B = 66
  const plotW = VBW - L - R
  const plotH = VBH - T - B
  const S_TOP = 80
  const S_BOT = 30
  const n = TRAJ_QUARTERS.length
  const xAt = (i: number) => L + (i / (n - 1)) * plotW
  const yAt = (s: number) => T + ((S_TOP - s) / (S_TOP - S_BOT)) * plotH
  const line = (vals: number[]) => vals.map((s, i) => `${xAt(i).toFixed(1)},${yAt(s).toFixed(1)}`).join(' ')
  const gridScores = [40, 50, 60, 70]
  const m = { fontFamily: MONO, letterSpacing: 1.2, fontWeight: 600 } as const
  return (
    <svg
      viewBox={`0 0 ${VBW} ${VBH}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Buyer Trust Score quarter over quarter: your score climbing from 41 toward the field across four quarters"
    >
      {gridScores.map((s) => (
        <g key={s}>
          <line x1={L} y1={yAt(s)} x2={VBW - R} y2={yAt(s)} stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
          <text x={L - 16} y={yAt(s) + 4} textAnchor="end" {...m} fontSize={12} fill={CREAM_MUTED}>
            {s}
          </text>
        </g>
      ))}
      {TRAJ_QUARTERS.map((_q, i) => (
        <line key={`v${i}`} x1={xAt(i)} y1={T} x2={xAt(i)} y2={T + plotH} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}

      {/* The field — dashed benchmark, fades in */}
      <polyline
        points={line(TRAJ_FIELD)}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={2.5}
        strokeDasharray="7 6"
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}
      />
      {/* You — solid magenta, draws on scroll */}
      <polyline
        points={line(TRAJ_YOU)}
        fill="none"
        stroke={HOT}
        strokeWidth={4}
        pathLength={100}
        style={{
          strokeDasharray: 100,
          strokeDashoffset: inView ? 0 : 100,
          transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
        }}
      />

      {TRAJ_FIELD.map((s, i) => (
        <circle
          key={`f${i}`}
          cx={xAt(i)}
          cy={yAt(s)}
          r={4}
          fill={INK}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={1.5}
          style={{ opacity: inView ? 1 : 0, transition: `opacity 0.4s ease ${0.3 + i * 0.18}s` }}
        />
      ))}
      {TRAJ_YOU.map((s, i) => (
        <g key={`y${i}`} style={{ opacity: inView ? 1 : 0, transition: `opacity 0.4s ease ${0.45 + i * 0.28}s` }}>
          <circle cx={xAt(i)} cy={yAt(s)} r={6} fill={HOT} />
          <text x={xAt(i)} y={yAt(s) - 18} textAnchor="middle" {...m} fontSize={16} fill={PAPER}>
            {s}
          </text>
        </g>
      ))}

      {/* End-of-line value callouts */}
      <text x={xAt(n - 1) + 16} y={yAt(TRAJ_FIELD[n - 1]) + 5} {...m} fontSize={13} fill="rgba(255,255,255,0.7)" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 1s' }}>
        FIELD · {TRAJ_FIELD[n - 1]}
      </text>
      <text x={xAt(n - 1) + 16} y={yAt(TRAJ_YOU[n - 1]) + 5} {...m} fontSize={13} fill={HOT} style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 1.5s' }}>
        YOU · {TRAJ_YOU[n - 1]}
      </text>

      {TRAJ_QUARTERS.map((q, i) => (
        <text key={q} x={xAt(i)} y={VBH - 30} textAnchor="middle" {...m} fontSize={14} fill={CREAM_MUTED}>
          {q}
        </text>
      ))}
      <text x={xAt(0)} y={VBH - 12} textAnchor="middle" {...m} fontSize={10} fill="rgba(255,255,255,0.45)">
        BASELINE
      </text>
    </svg>
  )
}

/* ──────────────────────────────────────────────
   ▸ 04 THE PROGRAM (ink)
   The quarter-over-quarter trajectory leads as the hero; the line draws on
   scroll. The progression below replaces the old deliverables grid with the
   actual quarter-by-quarter story of what improves over the year.
   ────────────────────────────────────────────── */

const PROGRAM_CSS = `
.prog-quarters{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid ${INK_LINE};margin-top:36px;}
.prog-quarters > div{padding:26px 24px;border-right:1px solid ${INK_LINE};}
.prog-quarters > div:last-child{border-right:none;}
@media (max-width:900px){
  .prog-quarters{grid-template-columns:repeat(2,minmax(0,1fr));}
  .prog-quarters > div:nth-child(2n){border-right:none;}
  .prog-quarters > div:nth-child(-n+2){border-bottom:1px solid ${INK_LINE};}
}
@media (max-width:540px){
  .prog-quarters{grid-template-columns:1fr;}
  .prog-quarters > div{border-right:none;border-bottom:1px solid ${INK_LINE};}
  .prog-quarters > div:last-child{border-bottom:none;}
}
`

function SectionProgram() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const posthog = usePostHog()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setInView(true)
      return
    }
    let done = false
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done) {
            done = true
            setInView(true)
            obs.disconnect()
          }
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="the-program"
      style={{ background: INK, color: PAPER, padding: '96px 32px 88px', borderBottom: `1px solid ${INK}`, containerType: 'inline-size' }}
    >
      <style>{PROGRAM_CSS}</style>
      <Container>
        <div style={mono(11, CREAM_MUTED, 700)}>{formatSectionLabel('04', 'THE PROGRAM')}</div>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 112px)',
            lineHeight: 0.9,
            letterSpacing: '-0.018em',
            textTransform: 'uppercase',
            color: PAPER,
            margin: '24px 0 28px',
            maxWidth: 1100,
          }}
        >
          Your buyer experience, measured every quarter.
        </h2>
        <p
          style={{
            fontFamily: BODY,
            fontSize: 18,
            lineHeight: 1.6,
            color: CREAM,
            maxWidth: 880,
            margin: '0 0 44px',
          }}
        >
          The Buyer View is a quarterly program. Every quarter we re-read the eleven surfaces your
          buyer meets, score the gap between what you promise and what each one proves, and report
          how your Buyer Trust Score moved since the last read. You are not holding a one-time
          snapshot that drifts back the moment you stop watching. You are watching your buyer
          experience shift over time, quarter by quarter. The board budgets against the number. Your
          team works the evidence behind it.
        </p>

        {/* Quarter-over-quarter trajectory — the hero of this section */}
        <div style={{ ...mono(11, CREAM_MUTED, 700), marginBottom: 12 }}>
          ▸ BUYER TRUST SCORE · QUARTER OVER QUARTER
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
          <span style={{ ...mono(10, CREAM, 700), display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 18, height: 3, background: HOT, display: 'inline-block' }} />
            YOU
          </span>
          <span style={{ ...mono(10, CREAM, 700), display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 18, height: 3, background: 'rgba(255,255,255,0.6)', display: 'inline-block' }} />
            THE FIELD
          </span>
        </div>
        <QuarterTrajectory inView={inView} />
        <p
          style={{
            fontFamily: BODY,
            fontSize: 16,
            lineHeight: 1.6,
            color: CREAM,
            maxWidth: 760,
            margin: '14px 0 0',
          }}
        >
          The first read is the baseline. Each quarter after measures movement against the field, so
          improvement is something you can see and defend at the board, not something you assert.
        </p>

        {/* What improves, quarter by quarter */}
        <div className="prog-quarters">
          {TRAJ_STEPS.map((step, i) => (
            <div key={step.q}>
              <div style={{ ...mono(10, CREAM_MUTED, 700), marginBottom: 16 }}>
                {step.q} · {step.label.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(44px, 5vw, 60px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                  color: i === TRAJ_STEPS.length - 1 ? HOT : PAPER,
                  marginBottom: 16,
                }}
              >
                {step.score}
              </div>
              <div style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.55, color: CREAM }}>
                {step.body}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: BODY,
            fontSize: 17,
            lineHeight: 1.55,
            color: PAPER,
            margin: '36px 0 28px',
            maxWidth: 720,
          }}
        >
          The first quarter sets the baseline. Every quarter after is the instrument.
        </p>

        <a
          href="#gain-access"
          onClick={() => posthog?.capture('buyerview_cta_clicked', { location: 'program' })}
          style={{
            ...mono(11, INK, 700),
            background: PAPER,
            color: INK,
            padding: '14px 22px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          GET YOUR REPORT
        </a>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ▸ 03 THE UNFAIR ADVANTAGE (ink)
   Ported from bv-advantage.html: headline + short lede + a "you vs the
   field" index comparison (Ascend vs the three composite rivals) + the Bain
   credibility strip. All styling is section-scoped in ADV_CSS; shared tokens
   untouched. The comparison data is illustrative composite.
   ────────────────────────────────────────────── */

const ADV_CSS = `
#the-advantage .adv-cmp{border-top:1px solid rgba(255,255,255,0.22);padding-top:38px;}
#the-advantage .adv-grid{display:grid;grid-template-columns:300px 1fr;gap:64px;align-items:start;}
#the-advantage .adv-kick{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:20px;}
#the-advantage .adv-read{font-size:16px;line-height:1.62;color:rgba(255,255,255,0.82);margin-bottom:30px;font-family:'IBM Plex Sans',system-ui,sans-serif;}
#the-advantage .adv-read b{color:#fff;font-weight:600;}
#the-advantage .adv-read .h{color:#E6195F;font-weight:600;}
#the-advantage .adv-legend{display:flex;flex-direction:column;gap:13px;}
#the-advantage .adv-legend span{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);display:flex;align-items:center;gap:10px;}
#the-advantage .adv-legend i{width:11px;height:11px;display:inline-block;flex-shrink:0;}
#the-advantage .adv-legend .la{background:#E6195F;}
#the-advantage .adv-legend .lv{background:#fff;}
#the-advantage .adv-legend .lm{background:#8E8C88;}
#the-advantage .adv-legend .lx{background:#F4C430;}
#the-advantage .adv-brow{margin-bottom:19px;}
#the-advantage .adv-brow-h{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:9px;gap:14px;}
#the-advantage .adv-bname{font-size:15px;font-weight:500;color:#fff;font-family:'IBM Plex Sans',system-ui,sans-serif;}
#the-advantage .adv-bscore{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.07em;color:rgba(255,255,255,0.42);white-space:nowrap;}
#the-advantage .adv-bscore b{color:#E6195F;font-weight:600;}
#the-advantage .adv-btrack{position:relative;height:15px;background:rgba(255,255,255,0.055);}
#the-advantage .adv-bfill{position:absolute;left:0;top:0;bottom:0;background:rgba(230,25,95,0.30);border-right:2px solid #E6195F;}
#the-advantage .adv-btick{position:absolute;top:-2px;bottom:-2px;width:2px;}
#the-advantage .adv-btick.v{background:#fff;}
#the-advantage .adv-btick.m{background:#8E8C88;}
#the-advantage .adv-btick.x{background:#F4C430;}
#the-advantage .adv-strip{margin-top:52px;padding-top:22px;border-top:1px solid rgba(255,255,255,0.22);font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.45);}
@media (max-width:860px){
  #the-advantage .adv-grid{grid-template-columns:1fr;gap:36px;}
}
`

// You vs the field, by index. Ascend (you) is the magenta bar; the three
// composite rivals ride as tick markers. Illustrative composite.
const ADV_ROWS = [
  { name: 'Awareness', you: 72, v: 58, m: 42, x: 48 },
  { name: 'Share of voice', you: 67, v: 55, m: 38, x: 42 },
  { name: 'Perception', you: 55, v: 60, m: 58, x: 62 },
  { name: 'Customer experience', you: 58, v: 62, m: 65, x: 60 },
  { name: 'Consistency', you: 52, v: 60, m: 64, x: 66 },
  { name: 'Employee brand', you: 32, v: 55, m: 62, x: 58 },
  { name: 'Vulnerability', you: 41, v: 55, m: 60, x: 62 },
]

function SectionAdvantage() {
  return (
    <section
      id="the-advantage"
      style={{ background: INK, color: PAPER, padding: '90px 32px 84px', borderBottom: `1px solid ${INK}` }}
    >
      <style>{ADV_CSS}</style>
      <Container>
        <div style={mono(11, CREAM_MUTED, 700)}>{formatSectionLabel('03', 'THE UNFAIR ADVANTAGE')}</div>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 112px)',
            lineHeight: 0.9,
            letterSpacing: '-0.018em',
            textTransform: 'uppercase',
            color: PAPER,
            margin: '24px 0 26px',
            maxWidth: 1100,
          }}
        >
          Make consistency
          <br />
          your unfair advantage.
        </h2>
        <p
          style={{
            fontFamily: BODY,
            fontSize: 19,
            lineHeight: 1.6,
            color: CREAM,
            maxWidth: 720,
            margin: '0 0 56px',
          }}
        >
          It is expensive to stay consistent across every surface a buyer touches, which is exactly
          why it works. A rival can copy your campaign. It cannot copy the surfaces it cannot see.
        </p>

        <div className="adv-cmp">
          <div className="adv-grid">
            <div>
              <div className="adv-kick">▸ You vs the field, by index</div>
              <div className="adv-read">
                <b>Ascend leads on awareness and share of voice.</b> It trails the field on{' '}
                <span className="h">consistency, employee brand, and vulnerability.</span> The brand is
                louder than its peers, and more fragile.
              </div>
              <div className="adv-legend">
                <span>
                  <i className="la" />Ascend (you)
                </span>
                <span>
                  <i className="lv" />Vantage
                </span>
                <span>
                  <i className="lm" />Meridian
                </span>
                <span>
                  <i className="lx" />Apex
                </span>
              </div>
            </div>
            <div>
              {ADV_ROWS.map((r) => (
                <div className="adv-brow" key={r.name}>
                  <div className="adv-brow-h">
                    <span className="adv-bname">{r.name}</span>
                    <span className="adv-bscore">
                      <b>{r.you}</b> · {r.v} · {r.m} · {r.x}
                    </span>
                  </div>
                  <div className="adv-btrack">
                    <div className="adv-bfill" style={{ width: `${r.you}%` }} />
                    <span className="adv-btick v" style={{ left: `${r.v}%` }} />
                    <span className="adv-btick m" style={{ left: `${r.m}%` }} />
                    <span className="adv-btick x" style={{ left: `${r.x}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="adv-strip">
          19% vs 12% revenue growth · 4% of executives report clarity · Bain 2026 B2B Growth Agenda
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   CO-SIGN — page footer. The 06 wrap-up / 270→360 close was removed; this
   keeps the ERA + Pinwheel co-sign as the closing credit block.
   ────────────────────────────────────────────── */

// The co-sign grid stacks to one column under 760px.
const CLOSE_CSS = `
@container (max-width: 760px) {
  [data-close-cosign] { grid-template-columns: minmax(0, 1fr) !important; }
  [data-close-cosign-left] {
    border-right: none !important;
    border-bottom: 1px solid #0A0A0A !important;
  }
}
`

function SectionClose() {
  return (
    <section
      style={{ background: PAPER, padding: '72px 32px 96px', borderTop: `1px solid ${INK}`, containerType: 'inline-size' }}
    >
      <style>{CLOSE_CSS}</style>
      <Container>
        <div style={{ ...mono(11, MUTED, 700), marginBottom: 24 }}>CO-SIGNED BY</div>
        <div
          data-close-cosign
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            border: `1px solid ${INK}`,
          }}
        >
          {/* ERA */}
          <article
            data-close-cosign-left
            style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '32px 30px', borderRight: `1px solid ${INK}` }}
          >
            <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
              <img src="/erafull.png" alt="ERA" style={{ height: 38, width: 'auto', display: 'block' }} />
            </div>
            <div>
              <div style={{ ...mono(11, INK, 700), marginBottom: 10 }}>Operates the experience</div>
              <p style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.55, color: INK, margin: 0, maxWidth: 480 }}>
                ERA reads the surfaces your buyer sees, analyzes the gap between promise and proof,
                and builds the system to improve pipeline velocity through every channel.
              </p>
            </div>
            <div style={{ paddingTop: 18, borderTop: `1px solid ${LINE}`, marginTop: 'auto' }}>
              <div style={{ ...mono(11, INK, 700), marginBottom: 6 }}>Justin Marshall</div>
              <a href="mailto:justin@eracx.com" style={{ ...mono(11, HOT, 700), textDecoration: 'none' }}>
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
              <div style={{ ...mono(11, INK, 700), marginBottom: 10 }}>Produces the proof</div>
              <p style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.55, color: INK, margin: 0, maxWidth: 480 }}>
                Pinwheel is a creative marketing and content agency that partners with B2B brands to
                delight, persuade, and educate their audiences. It produces the executive content,
                editorial, and design that get each surface backing the promise.
              </p>
            </div>
            <div style={{ paddingTop: 18, borderTop: `1px solid ${LINE}`, marginTop: 'auto' }}>
              <div style={{ ...mono(11, INK, 700), marginBottom: 6 }}>Todd Anthony</div>
              <a href="mailto:todd@pinwheelagency.com" style={{ ...mono(11, HOT, 700), textDecoration: 'none' }}>
                todd@pinwheelagency.com
              </a>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Shared
   ────────────────────────────────────────────── */

function Container({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: 1400, margin: '0 auto' }}>{children}</div>
}

function LegendSwatch({
  swatch,
  outline,
  label,
}: {
  swatch: string
  outline?: boolean
  label: string
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 26,
          height: 14,
          background: swatch,
          border: outline ? `1px dashed rgba(10,10,10,0.3)` : 'none',
        }}
      />
      <span style={mono(10, INK, 700)}>{label}</span>
    </span>
  )
}

function mono(size: number, color: string = INK, weight: number = 600): CSSProperties {
  return {
    fontFamily: MONO,
    fontSize: size,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color,
    fontWeight: weight,
  }
}
