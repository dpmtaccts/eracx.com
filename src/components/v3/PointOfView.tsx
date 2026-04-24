// PointOfView.tsx — §03 section for the /v3 staging homepage.
// Five principles, each a 2-column article with a bespoke SVG on the left
// and claim + caption + "What we do" implication on the right.
// All SVG coordinates pasted verbatim from design/era-v3-staging.html.

import type { ReactNode } from 'react'

interface PrincipleProps {
  num: string
  visual: ReactNode
  claim: ReactNode
  caption: ReactNode
  implication: ReactNode
}

function Principle({ num, visual, claim, caption, implication }: PrincipleProps) {
  return (
    <article className="principle">
      <div className="principle-visual">{visual}</div>
      <div className="principle-body">
        <div className="principle-num">{num}</div>
        <h3 className="principle-claim">{claim}</h3>
        <p className="principle-caption">{caption}</p>
        <div className="principle-implication">
          <span className="principle-implication-tag">What we do</span>
          {implication}
        </div>
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────
// Principle 01 — 50-dot grid, 4 accent-filled
// ─────────────────────────────────────────────────────────────
// 10 cols × 5 rows. Accent dots at (x=40, y=40), (x=264, y=40),
// (x=168, y=104), (x=328, y=136) — matches source positions.

const ROW_COLS = 10
const ROW_STRIDE = 32
const ROW_Y_ORIGIN = 40

function isAccent(col: number, row: number): boolean {
  return (
    (row === 0 && col === 0) ||
    (row === 0 && col === 7) ||
    (row === 2 && col === 4) ||
    (row === 3 && col === 9)
  )
}

function DotGridVisual() {
  const dots: React.JSX.Element[] = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < ROW_COLS; col++) {
      const cx = 40 + col * ROW_STRIDE
      const cy = ROW_Y_ORIGIN + row * ROW_STRIDE
      const accent = isAccent(col, row)
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={cx}
          cy={cy}
          r="7"
          fill={accent ? 'var(--accent)' : 'var(--bg-alt)'}
          stroke={accent ? undefined : 'var(--rule)'}
          strokeWidth={accent ? undefined : '1'}
        />,
      )
    }
  }

  return (
    <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      <g>{dots}</g>
      <text x="40" y="210" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="var(--accent)">■</text>
      <text x="56" y="210" fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="var(--text)" fontWeight="600">4 in market</text>
      <text x="160" y="210" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="var(--rule)">○</text>
      <text x="176" y="210" fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="var(--text)" fontWeight="600">46 not yet</text>
      <line x1="40" y1="224" x2="332" y2="224" stroke="var(--rule)" strokeWidth="1" />
      <text x="186" y="228" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-muted)" fontWeight="600" letterSpacing="0.1em">50 IDEAL ACCOUNTS</text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Principle 02 — Org chart (CEO → Champion → 4 adjacents)
// ─────────────────────────────────────────────────────────────

function OrgChartVisual() {
  return (
    <svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg">
      <line x1="220" y1="56" x2="220" y2="100" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="80" y1="130" x2="360" y2="130" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="80" y1="130" x2="80" y2="146" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="160" y1="130" x2="160" y2="146" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="240" y1="130" x2="240" y2="146" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="320" y1="130" x2="320" y2="146" stroke="var(--text)" strokeWidth="1.2" />
      <g transform="translate(220, 40)">
        <rect x="-60" y="-16" width="120" height="32" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.6" />
        <text y="5" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">CEO / Board</text>
      </g>
      <g transform="translate(220, 114)">
        <rect x="-64" y="-16" width="128" height="32" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.6" />
        <text y="5" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="700" fill="var(--bg)">Champion (VP)</text>
      </g>
      <text x="295" y="120" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--accent)" fontWeight="700" letterSpacing="0.08em">← who you talk to</text>
      <g transform="translate(80, 172)">
        <rect x="-44" y="-16" width="88" height="32" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.2" />
        <text y="5" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="600" fill="var(--text)">Finance</text>
      </g>
      <g transform="translate(160, 172)">
        <rect x="-44" y="-16" width="88" height="32" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.2" />
        <text y="5" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="600" fill="var(--text)">Legal</text>
      </g>
      <g transform="translate(240, 172)">
        <rect x="-44" y="-16" width="88" height="32" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.2" />
        <text y="5" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="600" fill="var(--text)">IT / Sec</text>
      </g>
      <g transform="translate(320, 172)">
        <rect x="-44" y="-16" width="88" height="32" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.2" />
        <text y="5" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="600" fill="var(--text)">Adjacent</text>
      </g>
      <text x="220" y="225" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--text-muted)" fontWeight="600" letterSpacing="0.1em">6 – 10 PEOPLE INFLUENCE THE CALL</text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Principle 03 — 70/30 split bar
// ─────────────────────────────────────────────────────────────

function SplitBarVisual() {
  return (
    <svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="40" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--text-muted)" fontWeight="600" letterSpacing="0.1em">BUYING CYCLE · 100%</text>
      <rect x="20" y="56" width="400" height="44" fill="var(--bg-alt)" stroke="var(--rule)" strokeWidth="1" />
      <rect x="20" y="56" width="280" height="44" fill="var(--accent)" />
      <rect x="300" y="56" width="120" height="44" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.2" />
      <text x="160" y="84" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="22" fontWeight="600" fill="var(--bg)" letterSpacing="-0.01em">70%</text>
      <text x="360" y="84" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="18" fontWeight="600" fill="var(--text)" letterSpacing="-0.01em">30%</text>
      <line x1="20" y1="110" x2="300" y2="110" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="20" y1="108" x2="20" y2="116" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="300" y1="108" x2="300" y2="116" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="300" y1="110" x2="420" y2="110" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="420" y1="108" x2="420" y2="116" stroke="var(--text-muted)" strokeWidth="1" />
      <text x="160" y="130" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Buyer decides privately</text>
      <text x="160" y="146" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="11" fill="var(--text-muted)">Research · peers · content · dark social</text>
      <text x="360" y="130" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Vendor contact</text>
      <text x="360" y="146" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="11" fill="var(--text-muted)">Demos, calls, RFPs</text>
      <path d="M 300 180 C 300 200, 360 200, 360 196" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
      <polygon points="360,196 354,190 366,190" fill="var(--accent)" />
      <text x="330" y="224" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontStyle="italic" fontSize="12" fill="var(--accent)" fontWeight="600">by now, they&apos;re usually sold</text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Principle 04 — Scatter + warmth threshold at 60
// ─────────────────────────────────────────────────────────────

function ThresholdVisual() {
  return (
    <svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="30" x2="60" y2="200" stroke="var(--text)" strokeWidth="1.2" />
      <line x1="60" y1="200" x2="420" y2="200" stroke="var(--text)" strokeWidth="1.2" />
      <text x="50" y="36" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--text-muted)" fontWeight="600">100</text>
      <text x="50" y="118" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--text-muted)" fontWeight="600">50</text>
      <text x="50" y="204" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--text-muted)" fontWeight="600">0</text>
      <text x="22" y="118" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" fill="var(--text)" letterSpacing="0.1em" transform="rotate(-90 22 118)">WARMTH</text>
      <line x1="60" y1="95" x2="420" y2="95" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="5 4" />
      <text x="420" y="90" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--accent)" fontWeight="700" letterSpacing="0.06em">PITCH THRESHOLD · 60</text>
      <rect x="60" y="95" width="360" height="105" fill="var(--rule)" fillOpacity="0.2" />
      <text x="240" y="160" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontStyle="italic" fontSize="18" fill="var(--text-muted)" fontWeight="500">Do not pitch here</text>
      <text x="240" y="66" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontStyle="italic" fontSize="16" fill="var(--accent)" fontWeight="500">Earned pitch zone</text>
      <circle cx="100" cy="178" r="5" fill="var(--text-muted)" />
      <circle cx="140" cy="168" r="5" fill="var(--text-muted)" />
      <circle cx="180" cy="150" r="5" fill="var(--text-muted)" />
      <circle cx="220" cy="130" r="5" fill="var(--text-muted)" />
      <circle cx="260" cy="110" r="5" fill="var(--text-muted)" />
      <circle cx="300" cy="80" r="6" fill="var(--accent)" />
      <circle cx="340" cy="65" r="6" fill="var(--accent)" />
      <circle cx="380" cy="48" r="6" fill="var(--accent)" />
      <text x="240" y="222" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-muted)" fontWeight="600" letterSpacing="0.1em">ACCOUNTS SORTED BY WARMTH →</text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Principle 05 — Revenue by customer decile
// ─────────────────────────────────────────────────────────────

function DecileVisual() {
  return (
    <svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--text-muted)" fontWeight="600" letterSpacing="0.1em">REVENUE BY CUSTOMER DECILE</text>
      <line x1="40" y1="190" x2="420" y2="190" stroke="var(--text)" strokeWidth="1.2" />
      <rect x="50" y="60" width="32" height="130" fill="var(--accent)" />
      <text x="66" y="54" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="700" fill="var(--accent)">40%</text>
      <rect x="88" y="95" width="32" height="95" fill="var(--accent)" />
      <text x="104" y="90" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="700" fill="var(--accent)">20%</text>
      <rect x="126" y="130" width="32" height="60" fill="var(--warming)" />
      <text x="142" y="124" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="10" fontWeight="600" fill="var(--text-muted)">12%</text>
      <rect x="164" y="150" width="32" height="40" fill="var(--warming)" />
      <rect x="202" y="162" width="32" height="28" fill="var(--rule)" />
      <rect x="240" y="170" width="32" height="20" fill="var(--rule)" />
      <rect x="278" y="176" width="32" height="14" fill="var(--rule)" />
      <rect x="316" y="180" width="32" height="10" fill="var(--rule)" />
      <rect x="354" y="183" width="32" height="7" fill="var(--bg-alt)" stroke="var(--rule)" strokeWidth="0.8" />
      <rect x="392" y="185" width="20" height="5" fill="var(--bg-alt)" stroke="var(--rule)" strokeWidth="0.8" />
      <text x="66" y="208" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text)" fontWeight="700">TOP</text>
      <text x="66" y="220" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text)" fontWeight="700">10%</text>
      <text x="402" y="208" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-muted)" fontWeight="600">BOT</text>
      <text x="402" y="220" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-muted)" fontWeight="600">10%</text>
      <path d="M 50 40 L 120 40" stroke="var(--accent)" strokeWidth="1.4" />
      <text x="130" y="44" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="700" fill="var(--accent)" fontStyle="italic">60% of revenue from top 20%</text>
    </svg>
  )
}

export default function PointOfView() {
  return (
    <section id="pov">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">§03 &nbsp; Point of view</div>
            <h2 className="section-h2">
              Five things<br />
              <span className="slab">we believe.</span>
            </h2>
          </div>
          <p className="section-lede">
            We build <strong>AI-powered ABM programs</strong> that generate
            warmth with your highest-value accounts. Here is why we do it the
            way we do.
          </p>
        </div>

        <Principle
          num="Principle 01"
          visual={<DotGridVisual />}
          claim={
            <>
              Only 3&ndash;5% are<br />
              <span className="slab">actively buying.</span>
            </>
          }
          caption={
            <>
              Of every 100 ideal customers, three to five are in-market right
              now. The rest are not unqualified.{' '}
              <strong>They are not yet.</strong>
            </>
          }
          implication="Treat the 95% as the asset. Compound warmth while competitors chase the 5%."
        />

        <Principle
          num="Principle 02"
          visual={<OrgChartVisual />}
          claim={
            <>
              Nobody<br />
              <span className="slab">buys alone.</span>
            </>
          }
          caption={
            <>
              Every buyer has someone to answer to.{' '}
              <strong>
                The average B2B buying committee has 6 to 10 people.
              </strong>{' '}
              Solo decisions are a myth.
            </>
          }
          implication="Multi-thread by default. Champion plus economic buyer plus one adjacent stakeholder, minimum."
        />

        <Principle
          num="Principle 03"
          visual={<SplitBarVisual />}
          claim={
            <>
              Decisions happen<br />
              <span className="slab">earlier than you think.</span>
            </>
          }
          caption={
            <>
              By the time a buyer fills out your demo form,{' '}
              <strong>60 to 80% of the decision is already made.</strong> They
              came to confirm a choice, not to evaluate one.
            </>
          }
          implication="Instrument the months before the form. Dark activity, content engagement, peer mentions."
        />

        <Principle
          num="Principle 04"
          visual={<ThresholdVisual />}
          claim={
            <>
              Don&apos;t pitch<br />
              <span className="slab">strangers.</span>
            </>
          }
          caption={
            <>
              Cold outreach asks for a meeting before asking for a reason.{' '}
              <strong>We pitch when warmth supports it.</strong> Never before.
            </>
          }
          implication="Outreach fires when warmth crosses a defined threshold. Every message is earned by a prior signal."
        />

        <Principle
          num="Principle 05"
          visual={<DecileVisual />}
          claim={
            <>
              Not all customers<br />
              <span className="slab">are equal.</span>
            </>
          }
          caption={
            <>
              The top 20% of named accounts drive most of the revenue.{' '}
              <strong>Headcount math is seductive and wrong.</strong> Deepen
              the right accounts; don&apos;t widen the wrong funnel.
            </>
          }
          implication="Design around 50 to 250 named accounts. Fewer accounts, higher warmth, better revenue."
        />
      </div>
    </section>
  )
}
