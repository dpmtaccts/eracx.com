import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PeripheralSeismograph } from './betterup/PeripheralSeismograph'
import { ILLUSTRATIVE_MOMENTS } from '../data/landing-illustrative'
import intelligence from '../data/landing-intelligence.json'
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
const CREAM = 'rgba(255, 255, 255, 0.78)'
const CREAM_MUTED = 'rgba(255, 255, 255, 0.55)'
const INK_LINE = 'rgba(255, 255, 255, 0.18)'

const DISPLAY = "'Anton', sans-serif"
const MONO = "'JetBrains Mono', monospace"
const BODY = "'IBM Plex Sans', system-ui, sans-serif"

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap'

const CANONICAL = 'https://eracx.com/archive/buyer-view-system'

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
      <ScopeReadout />
      <SectionWhyNow />
      <SectionBuyerView />
      <SectionTheRead />
      <SectionProgram />
      <SectionAdvantage />
      <SectionClose />
    </div>
  )
}

/* ──────────────────────────────────────────────
   TOP NAV — page-specific, brand-agnostic
   ────────────────────────────────────────────── */

function TopNav() {
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
          <span style={mono(11, INK, 700)}>
            ▸ THE BUYER VIEW · AN INTELLIGENCE SYSTEM FOR MARKETING LEADERS
          </span>
        </a>
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
          <a href="#why" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>WHY</a>
          <a href="#the-view" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE VIEW</a>
          <a href="#the-read" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE READ</a>
          <a href="#the-program" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE PROGRAM</a>
          <a href="#the-advantage" style={{ ...mono(11, MUTED, 700), textDecoration: 'none' }}>THE ADVANTAGE</a>
          <a
            href="#gain-access"
            style={{
              ...mono(11, PAPER, 700),
              background: INK,
              color: PAPER,
              padding: '10px 16px',
              textDecoration: 'none',
            }}
          >
            GAIN ACCESS
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ──────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────── */

function Hero() {
  // Stripped to the hook. The instrument readout (300+ data points + the
  // facts list) lives in the ScopeReadout band below. Hero stays empty
  // enough to let the headline breathe.
  return (
    <section style={{ background: PAPER, padding: '120px 32px 144px' }}>
      <Container>
        <div style={mono(11, MUTED, 700)}>
          ▸ THE BUYER VIEW · WHAT YOUR BUYER SEES THAT YOU DO NOT
        </div>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(72px, 11vw, 192px)',
            lineHeight: 0.9,
            letterSpacing: '-0.018em',
            textTransform: 'uppercase',
            color: INK,
            margin: '32px 0 36px',
          }}
        >
          <span style={{ display: 'block' }}>See what</span>
          <span style={{ display: 'block' }}>your buyer</span>
          <span style={{ display: 'block', color: HOT }}>sees.</span>
        </h1>
        <p
          style={{
            fontFamily: BODY,
            fontSize: 22,
            lineHeight: 1.45,
            color: INK,
            maxWidth: 820,
            margin: '0 0 48px',
            fontWeight: 400,
          }}
        >
          You see your own analytics. Your buyer decides on the surfaces you cannot.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
          <a
            href="#gain-access"
            style={{
              ...mono(11, PAPER, 700),
              background: INK,
              color: PAPER,
              padding: '14px 22px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            GAIN ACCESS
          </a>
          <a
            href="#the-program"
            style={{
              ...mono(11, INK, 700),
              background: PAPER,
              color: INK,
              padding: '14px 22px',
              textDecoration: 'none',
              border: `1px solid ${INK}`,
              display: 'inline-block',
            }}
          >
            SEE HOW IT WORKS
          </a>
        </div>
        <div style={{ ...mono(10, MUTED, 600) }}>
          BY ENROLLMENT · AN INTELLIGENCE SYSTEM YOU HOLD, NOT A REPORT YOU READ ONCE
        </div>
      </Container>
    </section>
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

const SCOPE_CELLS: ScopeCell[] = [
  { finalText: '300+', target: 300, suffix: '+', label: 'DATA POINTS PER READ, EVERY QUARTER', size: 'anchor' },
  { finalText: '11',   target: 11,  suffix: '',  label: 'SURFACES READ',                       size: 'cell' },
  { finalText: '21',   target: 21,  suffix: '',  label: 'EXECUTIVE VOICES INDEXED',            size: 'cell' },
  { finalText: '5',    target: 5,   suffix: '',  label: 'WALLED GARDENS',                      size: 'cell' },
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
      <div
        data-scope-grid
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 340px) minmax(0, 1fr)',
        }}
      >
        {/* Anchor — 300+ */}
        <ScopeAnchor cell={SCOPE_CELLS[0]} animate={animate} delayMs={0} />

        {/* Six cells in a 3×2 grid */}
        <div
          data-scope-cells
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          }}
        >
          {SCOPE_CELLS.slice(1).map((cell, idx) => {
            // 3×2: right border on columns 1+2, bottom on row 1. No outer
            // borders — the band's top/bottom rules and the anchor's right
            // rule frame the grid.
            const isRightCol = (idx + 1) % 3 === 0
            const isTopRow = idx < 3
            return (
              <ScopeCellTile
                key={cell.label}
                cell={cell}
                animate={animate}
                delayMs={(idx + 1) * 60}
                borderRight={!isRightCol}
                borderBottom={isTopRow}
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
}: {
  cell: ScopeCell
  animate: boolean
  delayMs: number
  borderRight: boolean
  borderBottom: boolean
}) {
  const value = useCountUp(cell.target, animate, delayMs)
  return (
    <div
      data-scope-cell
      style={{
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
   ▸ 01 WHY NOW (ink)
   ────────────────────────────────────────────── */

function SectionWhyNow() {
  return (
    <section
      id="why"
      style={{ background: INK, color: PAPER, padding: '96px 32px 88px', borderBottom: `1px solid ${INK}` }}
    >
      <Container>
        <div style={mono(11, CREAM_MUTED, 700)}>{formatSectionLabel('01', 'WHY THIS MATTERS NOW')}</div>
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
          Your buyer decides in the dark.
        </h2>
        <p
          style={{
            fontFamily: BODY,
            fontSize: 18,
            lineHeight: 1.6,
            color: CREAM,
            maxWidth: 880,
            margin: '0 0 28px',
          }}
        >
          The conversation left your website. No one clicks through to book a demo anymore. They ask
          an agent who the category leaders are, they read the reviews, they check whether your
          executives are anyone, and they do all of it in rooms you are not in. Around 77 percent of
          B2B buyers finish the decision in twelve weeks, most of it before first contact. By the
          time sales is in the room, the view has already formed, and you never saw the surfaces
          that formed it.
        </p>
        <div style={{ ...mono(10, CREAM_MUTED, 700), maxWidth: 880, lineHeight: 1.7 }}>
          77% · EMARKETER CITING GOOGLE + NRG. 58% OF BUYERS SWITCHED VENDORS IN SIX MONTHS · ERA
          BUYER RESEARCH 2026.
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ▸ 02 THE BUYER VIEW — seismograph hero (paper)
   ────────────────────────────────────────────── */

function SectionBuyerView() {
  return (
    <section
      id="the-view"
      style={{ background: PAPER, padding: '96px 32px 88px', borderBottom: `1px solid ${INK}` }}
    >
      <Container>
        <div style={mono(11, MUTED, 700)}>{formatSectionLabel('02', 'THE BUYER VIEW')}</div>
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
            ↳ HOVER ANY BAR · CLICK TO INSPECT
          </span>
        </div>

        {/* Full-bleed seismograph */}
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

        {/* How to read this — three rows */}
        <div style={{ marginTop: 48 }}>
          <div style={{ ...mono(11, MUTED, 700), marginBottom: 16 }}>HOW TO READ THIS</div>
          <div style={{ display: 'grid', gap: 0 }}>
            {[
              {
                label: 'PROMISE VS PROOF.',
                body: 'Every surface promises something. It either proves the promise or contradicts it. The delta is the score.',
              },
              {
                label: 'THE AXIS.',
                body: 'Horizontal is attention and credibility, not time. Vertical is trust volume.',
              },
              {
                label: 'THE TIERS.',
                body: 'Low opacity up: routine reinforces. Down: routine contradicts. Full opacity down: priority break. Magenta halo: fix first.',
              },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(200px, 240px) minmax(0, 1fr)',
                  gap: 22,
                  padding: '18px 0',
                  borderTop: `1px solid ${LINE}`,
                  borderBottom: i === arr.length - 1 ? `1px solid ${LINE}` : 'none',
                  alignItems: 'baseline',
                }}
              >
                <span style={mono(11, INK, 700)}>{row.label}</span>
                <span style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.55, color: INK }}>
                  {row.body}
                </span>
              </div>
            ))}
          </div>
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
          ADS, SPONSORED, OWNED, AND INSTAGRAM ARE ILLUSTRATIVE COMPOSITE
          <br />
          NOT A REAL CLIENT AUDIT
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ▸ 03 THE READ — collapsed-moments list
   Six rows demoted vs the spine: thin, 1px keylines, marker + category +
   finding + caret. Row 01 open by default. Each row's expanded content is
   one of the existing hand-built visuals.
   ────────────────────────────────────────────── */

type Moment = {
  num: string
  category: string
  finding: string
  render: () => React.ReactNode
}

const MOMENTS: Moment[] = [
  {
    num: '01',
    category: 'AGENTIC SEARCH',
    finding: 'Ask an AI who leads the category. It names two rivals before it names you.',
    render: () => <AgentAnswerVisual />,
  },
  {
    num: '02',
    category: 'DARK SOCIAL',
    finding: "Your executives’ engagement looks healthy. Zero percent of it is buyers.",
    render: () => <CompositionVisual />,
  },
  {
    num: '03',
    category: 'DARK SOCIAL',
    finding: 'Five of seven leaders are silent. The other two only repost.',
    render: () => <SilenceMapVisual />,
  },
  {
    num: '04',
    category: 'CONTENT',
    finding: 'Seven of eight decision-stage topics fall below alignment.',
    render: () => <AlignmentVisual />,
  },
  {
    num: '05',
    category: 'EVIDENCE',
    finding: 'Twelve named buyers are engaging right now. None of it reaches your CRM.',
    render: () => <EvidenceFileVisual />,
  },
  {
    num: '06',
    category: 'BENCHMARK',
    finding: 'Most brands sit in the low thirties. The leaders sit near sixty-five.',
    render: () => <BenchmarkRowContent />,
  },
]

function SectionTheRead() {
  // Single open row at a time, default row 01. Click toggles. Accordion
  // behavior keeps the page compact; switch to a Set if simultaneous open
  // rows are wanted later.
  const [openNum, setOpenNum] = useState<string | null>('01')
  const toggle = (num: string) => setOpenNum((cur) => (cur === num ? null : num))

  return (
    <section
      id="the-read"
      style={{ background: PAPER, borderBottom: `1px solid ${INK}` }}
    >
      <Container>
        <div style={{ padding: '88px 32px 40px' }}>
          <div style={mono(11, MUTED, 700)}>{formatSectionLabel('03', 'THE READ')}</div>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: 'clamp(32px, 4.4vw, 56px)',
              lineHeight: 1,
              letterSpacing: '-0.018em',
              textTransform: 'uppercase',
              color: INK,
              margin: '20px 0 22px',
              maxWidth: 980,
            }}
          >
            Open any moment. See what one read returns.
          </h2>
          <p
            style={{
              fontFamily: BODY,
              fontSize: 17,
              lineHeight: 1.55,
              color: INK,
              maxWidth: 820,
              margin: 0,
            }}
          >
            Two forces shape the decision before you ever show up, and your analytics record
            neither. The first is dark social, the private peer layer where buyers compare notes out
            of your sight. The second is agentic search, the AI that answers in your place. Here are
            six moments from a single read.
          </p>
        </div>
      </Container>

      {/* List */}
      <Container>
        <div style={{ padding: '0 32px 88px' }}>
          <div style={{ borderTop: `1px solid ${INK}` }}>
            {MOMENTS.map((m) => (
              <MomentRow
                key={m.num}
                num={m.num}
                category={m.category}
                finding={m.finding}
                isOpen={openNum === m.num}
                onToggle={() => toggle(m.num)}
              >
                {m.render()}
              </MomentRow>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function MomentRow({
  num,
  category,
  finding,
  isOpen,
  onToggle,
  children,
}: {
  num: string
  category: string
  finding: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!contentRef.current) return
    if (reduced) {
      // Instant: don't animate height, just toggle visibility.
      setMaxHeight(isOpen ? undefined : 0)
      return
    }
    if (isOpen) {
      const h = contentRef.current.scrollHeight
      setMaxHeight(h)
      const t = window.setTimeout(() => setMaxHeight(undefined), 380)
      return () => window.clearTimeout(t)
    } else {
      const h = contentRef.current.scrollHeight
      setMaxHeight(h)
      requestAnimationFrame(() => setMaxHeight(0))
    }
  }, [isOpen, reduced])

  return (
    <article
      data-moment-row
      style={{
        borderBottom: `1px solid ${INK}`,
        background: PAPER,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`moment-${num}-panel`}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '20px 0',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 20,
          alignItems: 'baseline',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
          <span style={mono(11, INK, 700)}>▸ {num}</span>
          <span style={mono(10, HOT, 700)}>{category}</span>
          <span
            style={{
              fontFamily: BODY,
              fontSize: 15,
              lineHeight: 1.5,
              color: INK,
              fontWeight: 500,
              flex: '1 1 280px',
              minWidth: 0,
            }}
          >
            {finding}
          </span>
        </div>
        <span style={mono(10, MUTED, 700)} aria-hidden>
          {isOpen ? '— close' : '+ open'}
        </span>
      </button>

      <div
        id={`moment-${num}-panel`}
        ref={contentRef}
        aria-hidden={!isOpen}
        style={{
          overflow: 'hidden',
          maxHeight,
          transition: reduced ? 'none' : 'max-height 0.36s cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      >
        <div style={{ padding: '8px 0 36px' }}>{children}</div>
      </div>
    </article>
  )
}

/* ──────────────────────────────────────────────
   Moment visuals — extracted from the prior PanelShell layout. Each
   returns its own JSX; the surrounding MomentRow handles the row chrome.
   ────────────────────────────────────────────── */

function AgentAnswerVisual() {
  const CITATIONS = ['vantage.com', 'g2.com', '2023 analyst note']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <article
        style={{
          background: PAPER,
          border: `1.5px solid ${HOT}`,
          maxWidth: 760,
        }}
      >
        <div
          style={{
            background: HOT,
            color: PAPER,
            padding: '12px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 14,
          }}
        >
          <span style={mono(11, PAPER, 700)}>ANSWER ENGINE</span>
          <span style={mono(10, 'rgba(255,255,255,0.78)', 600)}>BUYER-MODE QUERY</span>
        </div>
        <div style={{ padding: '20px 22px 8px' }}>
          <div style={mono(11, MUTED, 600)}>QUERY</div>
          <div style={{ ...mono(15, INK, 700), marginTop: 6, textTransform: 'none', letterSpacing: 0 }}>
            <span style={{ color: HOT, marginRight: 10 }}>›</span>
            Who leads this category?
          </div>
        </div>
        <div style={{ padding: '14px 22px 18px' }}>
          <div style={mono(11, MUTED, 600)}>ANSWER</div>
          <p
            style={{
              fontFamily: BODY,
              fontSize: 16,
              lineHeight: 1.6,
              color: INK,
              margin: '8px 0 0',
            }}
          >
            The platforms most often cited as leaders are{' '}
            <span style={{ fontWeight: 700 }}>Vantage</span> and{' '}
            <span style={{ fontWeight: 700 }}>Meridian</span>, noted for breadth and enterprise
            adoption. A handful of smaller alternatives follow.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 22px 18px' }}>
          {CITATIONS.map((c) => (
            <span
              key={c}
              style={{
                ...mono(10, MUTED, 700),
                border: `1px solid ${LINE}`,
                padding: '6px 10px',
                background: PAPER,
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <div
          style={{
            padding: '14px 22px 18px',
            borderTop: `1px solid ${LINE}`,
            fontFamily: BODY,
            fontSize: 14,
            lineHeight: 1.55,
            color: INK,
          }}
        >
          <span style={{ color: HOT, fontWeight: 700 }}>Promise:</span> the category leader.{' '}
          <span style={{ color: HOT, fontWeight: 700 }}>Proof:</span> the agent names two rivals
          first, and you are not in the list.
        </div>
      </article>
      <div style={mono(10, MUTED, 700)}>
        ILLUSTRATIVE COMPOSITE. VANTAGE AND MERIDIAN ARE FICTIONAL.
      </div>
    </div>
  )
}

function CompositionVisual() {
  const { segments, ghost, punchline } = intelligence.compositionBar
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div
        aria-hidden
        style={{
          display: 'flex',
          height: 44,
          border: `1px solid ${INK}`,
          background: PAPER,
        }}
      >
        {segments.map((s) => (
          <div
            key={s.label}
            title={`${s.label}: ${s.pct}%`}
            style={{
              flex: s.pct,
              background: s.color,
              opacity: s.opacity,
              borderRight: `1px solid ${PAPER}`,
            }}
          />
        ))}
        <div
          style={{
            flex: 6,
            background: 'transparent',
            border: `1.5px dashed ${HOT}`,
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              ...mono(10, HOT, 700),
              whiteSpace: 'nowrap',
            }}
          >
            {ghost.label.toUpperCase()} · 0%
          </span>
        </div>
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map((s) => (
          <li
            key={s.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '14px minmax(0, 1fr) 64px',
              gap: 12,
              alignItems: 'center',
              padding: '6px 0',
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <span style={{ width: 14, height: 10, background: s.color, opacity: s.opacity }} aria-hidden />
            <span style={{ fontFamily: BODY, fontSize: 14, color: INK }}>{s.label}</span>
            <span style={{ ...mono(11, INK, 700), textAlign: 'right' }}>{s.pct}%</span>
          </li>
        ))}
        <li
          style={{
            display: 'grid',
            gridTemplateColumns: '14px minmax(0, 1fr) 64px',
            gap: 12,
            alignItems: 'center',
            padding: '6px 0',
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          <span style={{ width: 14, height: 10, border: `1.5px dashed ${HOT}` }} aria-hidden />
          <span style={{ fontFamily: BODY, fontSize: 14, color: HOT, fontWeight: 600 }}>
            {ghost.label}
          </span>
          <span style={{ ...mono(11, HOT, 700), textAlign: 'right' }}>0%</span>
        </li>
      </ul>

      <div style={mono(11, HOT, 700)}>{punchline}</div>
      <div style={mono(10, MUTED, 700)}>ILLUSTRATIVE COMPOSITE</div>
    </div>
  )
}

function SilenceMapVisual() {
  const { cards } = intelligence.silenceMap
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        {cards.map((c) => (
          <article
            key={c.title}
            style={{
              padding: '18px 18px 20px',
              background: PAPER,
              border: `1px solid ${LINE}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: INK, lineHeight: 1.3 }}>
              {c.title}
            </div>
            <SilenceSparkline cadence={c.cadence} color={c.barColor} isSilent={c.total === 0} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={mono(10, MUTED, 700)}>TOTAL {c.total}</span>
              <span style={mono(10, c.total === 0 ? MUTED : INK, 700)}>{c.status}</span>
            </div>
          </article>
        ))}
      </div>
      <div style={mono(10, MUTED, 700)}>ILLUSTRATIVE COMPOSITE</div>
    </div>
  )
}

function SilenceSparkline({
  cadence,
  color,
  isSilent,
}: {
  cadence: number[]
  color: string
  isSilent: boolean
}) {
  if (isSilent) {
    return (
      <div
        aria-hidden
        style={{
          height: 28,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ width: '100%', height: 1, background: '#8E8C88' }} />
      </div>
    )
  }
  const max = Math.max(...cadence, 1)
  return (
    <div aria-hidden style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28 }}>
      {cadence.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: v > 0 ? `${Math.max(8, (v / max) * 100)}%` : 2,
            background: v > 0 ? color : '#D8D4CC',
          }}
        />
      ))}
    </div>
  )
}

function AlignmentVisual() {
  const { rows, legend } = intelligence.alignment
  const colorFor = (tier: string) =>
    legend.find((l) => l.tier === tier)?.color ?? INK
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {rows.map((r) => {
          const color = colorFor(r.tier)
          return (
            <div key={r.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) 56px',
                  gap: 12,
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontFamily: BODY, fontSize: 14, fontWeight: 500, color: INK }}>
                  {r.label}
                </span>
                <span style={{ ...mono(11, INK, 700), textAlign: 'right' }}>{r.pct}%</span>
              </div>
              <div
                aria-hidden
                style={{
                  height: 10,
                  background: PARCHMENT,
                  border: `1px solid ${LINE}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${r.pct}%`,
                    background: color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        {legend.map((l) => (
          <span key={l.tier} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 10, background: l.color }} aria-hidden />
            <span style={mono(10, INK, 700)}>{l.tier.toUpperCase()}</span>
          </span>
        ))}
      </div>
      <div style={mono(10, MUTED, 700)}>ILLUSTRATIVE COMPOSITE</div>
    </div>
  )
}

function EvidenceFileVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* 4-stat grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          border: `1px solid ${INK}`,
        }}
      >
        {[
          { num: '12', label: 'NAMED BUYERS' },
          { num: '6', label: 'WALLED GARDENS' },
          { num: '90D', label: 'WINDOW' },
          { num: '0', label: 'IN CRM' },
        ].map((cell, i, arr) => (
          <div
            key={cell.label}
            style={{
              padding: '24px 22px',
              borderRight: i < arr.length - 1 ? `1px solid ${INK}` : 'none',
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(40px, 4.4vw, 64px)',
                lineHeight: 0.9,
                letterSpacing: '-0.018em',
                color: INK,
              }}
            >
              {cell.num}
            </div>
            <div style={{ ...mono(10, MUTED, 700), marginTop: 10 }}>{cell.label}</div>
          </div>
        ))}
      </div>

      {/* Archetypal roles + signal */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          border: `1px solid ${INK}`,
        }}
      >
        {COMPOSITE_ROLES.map((p) => (
          <div
            key={p.title}
            style={{
              padding: '20px 22px',
              borderRight: `1px solid ${INK}`,
              borderBottom: `1px solid ${INK}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div style={{ fontFamily: BODY, fontSize: 15, fontWeight: 600, color: INK }}>
              {p.title}
            </div>
            <div style={{ ...mono(10, HOT, 700), marginTop: 2 }}>{p.signal.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div style={mono(10, MUTED, 700)}>
        ILLUSTRATIVE ARCHETYPES. REAL ENGAGEMENTS SURFACE REAL NAMES WITH PERMISSION.
      </div>
    </div>
  )
}

function BenchmarkRowContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <BenchmarkVisual ground="paper" />
      <div style={mono(10, MUTED, 700)}>ILLUSTRATIVE COMPOSITE</div>
    </div>
  )
}

/* Benchmark visual — Buyer Trust Score band + marker track. Lives in ▸ 06
   under the moat copy as supporting proof. Plain divs, hard 1px ink rules,
   v4 token colors only. */
function BenchmarkVisual({ ground = 'paper' }: { ground?: 'paper' | 'ink' }) {
  const { axis, band, markers } = intelligence.benchmark
  const trackBg = ground === 'ink' ? 'rgba(255,255,255,0.06)' : PAPER
  const trackBorder = ground === 'ink' ? CREAM_MUTED : INK
  const tickColor = ground === 'ink' ? CREAM_MUTED : MUTED
  const bandLabelColor = ground === 'ink' ? CREAM_MUTED : MUTED
  return (
    <div style={{ position: 'relative' }}>
        {/* Track */}
        <div
          style={{
            position: 'relative',
            height: 44,
            background: trackBg,
            border: `1px solid ${trackBorder}`,
            overflow: 'hidden',
          }}
        >
          {/* MOST BRANDS shaded band */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${band.from}%`,
              width: `${band.to - band.from}%`,
              background: '#8E8C88',
              opacity: 0.28,
            }}
            title={`${band.label}: ${band.from}–${band.to}`}
          />
          {/* Vertical markers */}
          {markers.map((m) => (
            <div
              key={m.label}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${m.at}%`,
                width: 2,
                background: m.color,
              }}
            />
          ))}
        </div>

        {/* Axis ticks */}
        <div
          style={{
            position: 'relative',
            height: 30,
            marginTop: 4,
            borderTop: `1px solid ${trackBorder}`,
          }}
        >
          {axis.map((tick) => (
            <span
              key={tick}
              style={{
                position: 'absolute',
                left: `${tick}%`,
                top: 8,
                transform: 'translateX(-50%)',
                ...mono(10, tickColor, 700),
              }}
            >
              {tick}
            </span>
          ))}
        </div>

        {/* Marker labels beneath */}
        <div style={{ position: 'relative', height: 56, marginTop: 4 }}>
          {/* MOST BRANDS label sits beneath the band */}
          <div
            style={{
              position: 'absolute',
              left: `${(band.from + band.to) / 2}%`,
              top: 0,
              transform: 'translateX(-50%)',
              textAlign: 'center',
              maxWidth: 140,
            }}
          >
            <div style={mono(10, bandLabelColor, 700)}>{band.label}</div>
            <div style={mono(10, bandLabelColor, 600)}>
              {band.from}&ndash;{band.to}
            </div>
          </div>

          {markers.map((m) => (
            <div
              key={m.label}
              style={{
                position: 'absolute',
                left: `${m.at}%`,
                top: 0,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                maxWidth: 160,
              }}
            >
              <div style={mono(10, m.color, 700)}>{m.label}</div>
              <div style={mono(10, bandLabelColor, 600)}>{m.at}</div>
            </div>
          ))}
        </div>
      </div>
  )
}

/* ──────────────────────────────────────────────
   ▸ 04 THE PROGRAM (ink)
   ────────────────────────────────────────────── */

function SectionProgram() {
  return (
    <section
      id="the-program"
      style={{ background: INK, color: PAPER, padding: '96px 32px 88px', borderBottom: `1px solid ${INK}` }}
    >
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
          A system you hold, not a report you read once.
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
          An audit tells you where trust leaks today, then drifts back the moment you stop watching.
          The Buyer View is built to be held. We set the baseline, then re-read the field your buyer
          sees every quarter and report the movement. The board budgets against the number. Your
          team drills into the evidence. You stay at the altitude of the decision. This is not
          something you build in-house. It is the instrument the rest of your market does not have.
        </p>

        <div style={{ ...mono(11, CREAM_MUTED, 700), marginBottom: 18 }}>
          WHAT YOU HOLD EACH QUARTER
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            border: `1px solid ${INK_LINE}`,
          }}
        >
          {[
            {
              label: 'THE READ.',
              body:
                'The buyer view re-run across eleven surfaces and twenty-one voices, with the Buyer Trust Score and its movement since last quarter.',
            },
            {
              label: 'THE BREAKS.',
              body:
                'The priority contradictions ranked by what is costing the most pipeline, each stated as a decision to make, not a metric to admire.',
            },
            {
              label: 'THE TRAJECTORY.',
              body:
                'Where the score goes if the priorities land, quarter by quarter across the year, framed as a prognosis, not a delivery promise.',
            },
            {
              label: 'THE SCORECARD.',
              body:
                'A read your team takes to the board, so you defend brand and marketing spend on whether trust is rising, not on activity.',
            },
          ].map((cell, i) => (
            <div
              key={cell.label}
              style={{
                padding: '28px 30px',
                borderRight: i % 2 === 0 ? `1px solid ${INK_LINE}` : 'none',
                borderBottom: i < 2 ? `1px solid ${INK_LINE}` : 'none',
              }}
            >
              <div style={{ ...mono(11, HOT, 700), marginBottom: 12 }}>{cell.label}</div>
              <div style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: CREAM }}>
                {cell.body}
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
          style={{
            ...mono(11, INK, 700),
            background: PAPER,
            color: INK,
            padding: '14px 22px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          GAIN ACCESS
        </a>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ▸ 05 THE EVIDENCE FILE (ink)
   ────────────────────────────────────────────── */

// Archetypal roles + the walled-garden signal each archetype produces.
// Names removed: this is a marketing surface, not a fabricated audit.
const COMPOSITE_ROLES = [
  { title: 'VP Engineering', signal: 'Comments on a competitor CEO, weekly' },
  { title: 'Chief People Officer', signal: 'Asks agents to rank the category' },
  { title: 'Head of RevOps', signal: 'Active in a private peer Slack' },
  { title: 'SVP Marketing', signal: 'Reads review sites before demos' },
  { title: 'Director of Platform', signal: 'Follows three of your rivals, not you' },
  { title: 'VP Customer Success', signal: 'Saves your posts, never likes them' },
]


/* ──────────────────────────────────────────────
   ▸ 05 THE UNFAIR ADVANTAGE (ink, text-only)
   The benchmark visual moved to row 06 in ▶︎03 THE READ. This section
   stays a text-only beat — headline + body + citation strip.
   ────────────────────────────────────────────── */

function SectionAdvantage() {
  return (
    <section
      id="the-advantage"
      style={{ background: INK, color: PAPER, padding: '96px 32px 88px', borderBottom: `1px solid ${INK}` }}
    >
      <Container>
        <div style={mono(11, CREAM_MUTED, 700)}>{formatSectionLabel('05', 'THE UNFAIR ADVANTAGE')}</div>
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
          Consistency is the moat.
        </h2>
        <p
          style={{
            fontFamily: BODY,
            fontSize: 18,
            lineHeight: 1.6,
            color: CREAM,
            maxWidth: 880,
            margin: '0 0 28px',
          }}
        >
          It is expensive to be consistent across every surface a buyer touches, which is exactly
          why it works. It is the one signal AI cannot fabricate. Bain found companies with clarity
          grow revenue 19 percent against 12 percent for those without it, and only 4 percent of
          executives believe their organization has it. A competitor can copy a campaign. It cannot
          copy a system that reads the surfaces it cannot see, scored on an axis it does not
          measure, held long enough to compound. Most marketing teams will never build this
          themselves. The team that holds its own buyer view fixes the breaks its rivals cannot
          even detect, and keeps fixing them while the rivals guess.
        </p>
        <div style={{ ...mono(10, CREAM_MUTED, 700), maxWidth: 880, lineHeight: 1.7 }}>
          19% VS 12% REVENUE GROWTH · 4% OF EXECUTIVES REPORT CLARITY · BAIN 2026 B2B GROWTH AGENDA.
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ▸ 06 THE WRAP-UP / CLOSE
   The Observation close. Headline + lede + the from/to ring visual that
   shows 270 of 360 delivered, the four-move summary, the ink CTA, and the
   co-sign. No mode toggle, no Program/sparkline/trend view: the ring carries
   the 270→360 idea on its own, the CTA only sells the outcome.
   ────────────────────────────────────────────── */

// Two grids stack to one column under 760px (rings + co-sign).
const CLOSE_CSS = `
@container (max-width: 760px) {
  [data-close-rings] { grid-template-columns: minmax(0, 1fr) !important; }
  [data-close-ring-left] {
    border-right: none !important;
    border-bottom: 1px solid #0A0A0A !important;
  }
  [data-close-cosign] { grid-template-columns: minmax(0, 1fr) !important; }
  [data-close-cosign-left] {
    border-right: none !important;
    border-bottom: 1px solid #0A0A0A !important;
  }
  [data-close-cadence] { grid-template-columns: minmax(0, 1fr) !important; }
  [data-close-cadence-cell] {
    border-left: none !important;
    border-top: 1px solid rgba(255, 255, 255, 0.18) !important;
  }
  [data-close-cadence-cell]:first-child { border-top: none !important; }
}
`

function CloseLegendRow({ label, state, hot = false }: { label: string; state: string; hot?: boolean }) {
  const color = hot ? HOT : INK
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 10,
        padding: '8px 0',
        borderTop: `1px solid ${LINE}`,
      }}
    >
      <span
        aria-hidden
        style={{ width: 9, height: 9, background: color, flex: '0 0 auto', position: 'relative', top: 1 }}
      />
      <span style={{ ...mono(10, color, 700), flex: 1 }}>{label}</span>
      <span style={mono(10, color, 700)}>{state}</span>
    </div>
  )
}

function RingNote({ head, body }: { head: string; body: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: 'clamp(20px, 2.2vw, 26px)',
          lineHeight: 0.95,
          letterSpacing: '-0.018em',
          textTransform: 'uppercase',
          color: INK,
          margin: '0 0 10px',
        }}
      >
        {head}
      </div>
      <p style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.55, color: INK, margin: 0 }}>{body}</p>
    </div>
  )
}

function SectionClose() {
  return (
    <>
      {/* The wrap-up: headline, lede, rings, moves — on paper so the ink rings read */}
      <section
        style={{ background: PAPER, padding: '96px 32px 88px', borderTop: `1px solid ${INK}`, containerType: 'inline-size' }}
      >
        <style>{CLOSE_CSS}</style>
        <Container>
          {/* 1. Eyebrow with 22px ink bar + headline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span aria-hidden style={{ width: 22, height: 2, background: INK, display: 'inline-block' }} />
            <span style={mono(11, INK, 700)}>{formatSectionLabel('06', 'THE WRAP-UP · WHAT THIS AUDIT DELIVERED')}</span>
          </div>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: 'clamp(48px, 7vw, 112px)',
              lineHeight: 0.9,
              letterSpacing: '-0.018em',
              textTransform: 'uppercase',
              color: INK,
              margin: '24px 0 28px',
              maxWidth: 1100,
            }}
          >
            The only place your buyer adds up.
          </h2>

          {/* 2. Lede */}
          <p
            style={{
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: 1.6,
              color: INK,
              maxWidth: 760,
              margin: '0 0 48px',
            }}
          >
            Eleven surfaces, twenty-one voices, four AI agents across ninety days, consolidated into
            a single view of how your buyer decides. No dashboard you own can show you this.
          </p>

          {/* 3. The from/to ring visual */}
          <div
            data-close-rings
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              border: `1px solid ${INK}`,
            }}
          >
            {/* Left cell — FROM · THIS REPORT */}
            <div data-close-ring-left style={{ padding: '32px 30px', borderRight: `1px solid ${INK}` }}>
              <div style={{ ...mono(11, INK, 700), marginBottom: 22 }}>▸ FROM · THIS REPORT</div>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
                <svg viewBox="0 0 400 400" aria-label="270 degree view" style={{ width: 200, maxWidth: '46%', height: 'auto', flex: '0 0 auto' }}>
                  <path d="M210.5 50.4 A150 150 0 0 1 349.6 189.5" fill="none" stroke={INK} strokeWidth={26} />
                  <path d="M349.6 210.5 A150 150 0 0 1 210.5 349.6" fill="none" stroke={INK} strokeWidth={26} />
                  <path d="M189.5 349.6 A150 150 0 0 1 50.4 210.5" fill="none" stroke={INK} strokeWidth={26} />
                  <path d="M50.4 189.5 A150 150 0 0 1 189.5 50.4" fill="none" stroke={HOT} strokeWidth={26} strokeDasharray="4 13" opacity={0.9} />
                  <text x={200} y={188} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={92} letterSpacing={-2} fill={INK}>270°</text>
                  <text x={200} y={232} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={15} letterSpacing={4} fill={MUTED}>OF 360</text>
                </svg>
                <RingNote
                  head="The thinking is complete."
                  body="The audit reads every surface, names the contradictions, and forces the four decisions. Three quarters of the loop is done."
                />
              </div>
              <CloseLegendRow label="See · every surface the buyer checks" state="Delivered" />
              <CloseLegendRow label="Diagnose · promise vs proof" state="Delivered" />
              <CloseLegendRow label="Decide · the four decisions" state="Delivered" />
              <CloseLegendRow label="Prove · movement over time" state="Missing" hot />
            </div>

            {/* Right cell — TO · THE PROGRAM */}
            <div style={{ padding: '32px 30px' }}>
              <div style={{ ...mono(11, HOT, 700), marginBottom: 22 }}>▸ TO · THE PROGRAM</div>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
                <svg viewBox="0 0 400 400" aria-label="360 degree view" style={{ width: 200, maxWidth: '46%', height: 'auto', flex: '0 0 auto' }}>
                  <circle cx={200} cy={200} r={150} fill="none" stroke={INK} strokeWidth={26} />
                  <path d="M50.4 189.5 A150 150 0 0 1 189.5 50.4" fill="none" stroke={HOT} strokeWidth={26} />
                  <text x={200} y={188} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={92} letterSpacing={-2} fill={INK}>360°</text>
                  <text x={200} y={232} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={15} letterSpacing={4} fill={HOT}>COMPLETE</text>
                </svg>
                <RingNote
                  head="The proof compounds."
                  body="The missing quarter is the live loop: act, measure, improve. It only exists once the program runs, and it gets stronger every quarter it does."
                />
              </div>
              <CloseLegendRow label="Prove · monitoring goes live" state="+ Program" hot />
              <CloseLegendRow label="Trend · a line for every moment" state="+ Program" hot />
              <CloseLegendRow label="Improve · quarter over quarter" state="+ Program" hot />
              <CloseLegendRow label="Readout · monthly and quarterly" state="+ Program" hot />
            </div>
          </div>

          {/* 4. Moves summary */}
          <div style={{ marginTop: 56, borderTop: `1px solid ${INK}`, paddingTop: 28 }}>
            <div style={{ ...mono(11, MUTED, 700), marginBottom: 6 }}>
              SUMMARY · THE FOUR MOVES THIS REPORT RECOMMENDS
            </div>
            {[
              { n: '01', move: 'Fix the inaccurate public data so the AI agents stop repeating it.', pillar: 'Agents · 15%' },
              { n: '02', move: 'Activate three executives with ghostwritten posts on a weekly cadence.', pillar: 'Leaders · 35%' },
              { n: '03', move: 'Publish the proof on the surfaces the buyer checks, and measure the lift.', pillar: 'Content · 25%' },
              { n: '04', move: 'Re-run the audit at week 12 and report where the score moved.', pillar: 'Composite' },
            ].map((row) => (
              <div
                key={row.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                  gap: 18,
                  alignItems: 'baseline',
                  padding: '18px 0',
                  borderTop: `1px solid ${LINE}`,
                }}
              >
                <span style={mono(13, HOT, 700)}>{row.n}</span>
                <span style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.55, color: INK }}>{row.move}</span>
                <span style={{ ...mono(11, MUTED, 700), textAlign: 'right' }}>{row.pillar}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. The CTA — full-bleed ink */}
      <section
        id="gain-access"
        style={{ background: INK, color: PAPER, padding: '96px 32px 104px', containerType: 'inline-size' }}
      >
        <Container>
          <div style={{ ...mono(11, HOT, 700), marginBottom: 22 }}>▸ YOU ARE ONE CONNECTION AWAY</div>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: 'clamp(48px, 7vw, 112px)',
              lineHeight: 0.9,
              letterSpacing: '-0.018em',
              textTransform: 'uppercase',
              color: PAPER,
              margin: '0 0 28px',
              maxWidth: 1100,
            }}
          >
            In 72 hours, the system begins recording your buyer in 360.
          </h2>
          <p
            style={{
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: 1.6,
              color: CREAM,
              maxWidth: 760,
              margin: '0 0 44px',
            }}
          >
            Monitoring goes live across all eleven surfaces. The first readout lands inside the week,
            and the quarterly Buyer Trust Score review begins the moment it does.
          </p>

          {/* Cadence strip */}
          <div
            data-close-cadence
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              border: `1px solid ${INK_LINE}`,
              marginBottom: 44,
            }}
          >
            {[
              { label: '72 HOURS', body: 'Monitoring is live across all eleven surfaces.' },
              { label: 'WEEK ONE', body: 'First monthly readout lands in your inbox.' },
              { label: 'EVERY QUARTER', body: 'Buyer Trust Score review. The number, and the movement.' },
            ].map((cell, i) => (
              <div
                key={cell.label}
                data-close-cadence-cell
                style={{ padding: '26px 28px', borderLeft: i === 0 ? 'none' : `1px solid ${INK_LINE}` }}
              >
                <div style={{ ...mono(11, HOT, 700), marginBottom: 12 }}>{cell.label}</div>
                <div style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: CREAM }}>{cell.body}</div>
              </div>
            ))}
          </div>

          <a
            href="mailto:justin@eracx.com?subject=Buyer%20View%20access"
            style={{
              ...mono(11, INK, 700),
              background: PAPER,
              color: INK,
              padding: '16px 24px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            GAIN ACCESS
          </a>
        </Container>
      </section>

      {/* 6. Co-sign */}
      <section
        style={{ background: PAPER, padding: '72px 32px 96px', borderTop: `1px solid ${INK}`, containerType: 'inline-size' }}
      >
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
              <img src="/images/era_symbol.svg" alt="ERA" style={{ height: 44, width: 'auto', display: 'block' }} />
              <div style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 34, lineHeight: 0.9, letterSpacing: '-0.018em', textTransform: 'uppercase', color: INK }}>
                ERA
              </div>
              <p style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.55, color: INK, margin: 0, maxWidth: 480 }}>
                Operates the connection and the measurement.
              </p>
              <div style={{ paddingTop: 18, borderTop: `1px solid ${LINE}`, marginTop: 'auto' }}>
                <div style={{ ...mono(11, INK, 700), marginBottom: 6 }}>Justin Marshall</div>
                <a href="mailto:justin@eracx.com" style={{ ...mono(11, HOT, 700), textDecoration: 'none' }}>
                  justin@eracx.com
                </a>
              </div>
            </article>

            {/* Pinwheel */}
            <article style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '32px 30px' }}>
              <img src="/assets/pinwheel_agency_logo.jpg" alt="Pinwheel" style={{ height: 44, width: 'auto', display: 'block' }} />
              <div style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 34, lineHeight: 0.9, letterSpacing: '-0.018em', textTransform: 'uppercase', color: INK }}>
                Pinwheel
              </div>
              <p style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.55, color: INK, margin: 0, maxWidth: 480 }}>
                Produces the proof.
              </p>
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
    </>
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
