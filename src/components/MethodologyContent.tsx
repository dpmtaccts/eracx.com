import type { CSSProperties } from 'react'
import { FONT } from '../pages/betterup/theme'
import {
  AGGREGATE,
  CHARACTERISTICS,
  CREDIBILITY_LINE,
  HONEST_FLAGS,
  IMPLICATIONS,
  MYTHS,
  REGIONS_COVERED,
  RESEARCH_FIRMS,
  STUDIES,
  SUPPORTING_NOTE,
  type Myth,
} from '../data/buyer-2026'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const SOFT_INK = 'rgba(10, 10, 10, 0.78)'
const LINE = 'rgba(10, 10, 10, 0.15)'
const HOT = '#E6195F'
const CREAM = 'rgba(255, 255, 255, 0.78)'
const CREAM_MUTED = 'rgba(255, 255, 255, 0.55)'

/* The methodology page content — rendered identically by both the full
   /methodology route and the in-app drawer. One source of truth. */

export function MethodologyContent({ titleId = 'methodology-title' }: { titleId?: string }) {
  // `container-type: inline-size` lets the @container rules below respond
  // to the parent width (the drawer panel or the full page) instead of the
  // browser viewport. Same component, two presentations.
  return (
    <article style={{ containerType: 'inline-size' }}>
      <style>{RESPONSIVE_CSS}</style>
      <Hero titleId={titleId} />
      <SectionEvidenceBase />
      <SectionMyths />
      <SectionImplications />
      <SectionMethodology />
    </article>
  )
}

/* Container-query rules. Triggered when the methodology article is rendered
   inside a container narrower than 760px (the in-app drawer). */
const RESPONSIVE_CSS = `
@container (max-width: 760px) {
  [data-myth-anchor-grid] {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  [data-myth-anchor-stat] {
    font-size: clamp(56px, 18cqw, 96px) !important;
  }
  [data-myth-support-stat] {
    font-size: 32px !important;
  }
  [data-hero-headline] {
    font-size: clamp(40px, 11cqw, 72px) !important;
  }
  [data-evidence-mega] {
    font-size: clamp(72px, 24cqw, 140px) !important;
  }
  [data-section-grid] {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  [data-implications-headline] {
    font-size: clamp(28px, 7cqw, 40px) !important;
  }
  [data-fact-row] {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 6px !important;
  }
}
`

/* ──────────────────────────────────────────────
   Hero
   ────────────────────────────────────────────── */

function Hero({ titleId }: { titleId: string }) {
  return (
    <section style={{ padding: '112px 36px 96px', borderBottom: `1px solid ${INK}`, background: PAPER }}>
      <Container>
        <div style={mono(11, MUTED, 700)}>THE 2026 B2B BUYER · MYTH VS FACT</div>
        <h1
          id={titleId}
          data-hero-headline
          style={{
            fontFamily: FONT.mega,
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 112px)',
            lineHeight: 0.9,
            letterSpacing: '-0.018em',
            textTransform: 'uppercase',
            color: INK,
            margin: '20px 0 18px',
            maxWidth: 960,
          }}
        >
          Most of what you believe about your buyer is{' '}
          <span style={{ color: HOT }}>out of date.</span>
        </h1>
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 18,
            lineHeight: 1.5,
            color: SOFT_INK,
            margin: 0,
            maxWidth: 720,
          }}
        >
          Eight beliefs that still run B2B go-to-market. Tested against more than 35,000 buyers.
        </p>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   §01 — Evidence Base (ink ground)
   ────────────────────────────────────────────── */

function SectionEvidenceBase() {
  return (
    <section style={{ background: INK, color: PAPER, padding: '72px 36px 64px' }}>
      <Container>
        <SectionHeader number="01" label="THE EVIDENCE BASE" ground="dark" />

        <div
          data-section-grid
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 40, marginBottom: 56 }}
        >
          <div>
            <div
              data-evidence-mega
              style={{
                fontFamily: FONT.mega,
                fontSize: 'clamp(96px, 14vw, 220px)',
                lineHeight: 0.88,
                letterSpacing: '-0.018em',
                color: PAPER,
              }}
            >
              {AGGREGATE.buyers}
            </div>
            <div style={{ ...mono(11, CREAM, 700), marginTop: 14 }}>
              BUYERS AND BUYING INTERACTIONS
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 15,
                lineHeight: 1.55,
                color: CREAM,
                margin: 0,
                maxWidth: 520,
              }}
            >
              {AGGREGATE.honestyNote}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 20,
            paddingTop: 28,
            borderTop: `1px solid rgba(255,255,255,0.18)`,
            marginBottom: 56,
          }}
        >
          <StatTile value={`${AGGREGATE.studies}`} label="STUDIES" ground="dark" />
          <StatTile value={`${AGGREGATE.firms}`} label="FIRMS" ground="dark" />
          <StatTile value={`${AGGREGATE.regions}`} label="REGIONS" ground="dark" />
          <StatTile value={`${AGGREGATE.industries}`} label="INDUSTRIES" ground="dark" />
        </div>

        <div style={{ ...mono(11, CREAM_MUTED, 700), marginBottom: 12 }}>RESEARCH FIRMS</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 48 }}>
          {RESEARCH_FIRMS.map((f) => (
            <span key={f} style={mono(13, PAPER, 700)}>{f.toUpperCase()}</span>
          ))}
        </div>

        <div style={{ ...mono(11, CREAM_MUTED, 700), marginBottom: 12 }}>REGIONS</div>
        <ul style={{ margin: '0 0 48px', padding: 0, listStyle: 'none', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {REGIONS_COVERED.map((r) => (
            <li key={r} style={mono(12, PAPER, 600)}>{r.toUpperCase()}</li>
          ))}
        </ul>

        {/* Characteristics strip */}
        <div style={{ ...mono(11, CREAM_MUTED, 700), marginBottom: 16 }}>
          BUYER CHARACTERISTICS
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            marginBottom: 64,
          }}
        >
          {CHARACTERISTICS.map((c) => (
            <div
              key={c.label}
              style={{
                padding: '18px 20px',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(255,255,255,0.18)`,
              }}
            >
              <div style={{ ...mono(10, CREAM, 700), marginBottom: 8 }}>{c.label.toUpperCase()}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 13, lineHeight: 1.5, color: CREAM }}>
                {c.body}
              </div>
            </div>
          ))}
        </div>

        {/* Study ledger */}
        <div style={{ ...mono(11, CREAM_MUTED, 700), marginBottom: 16 }}>STUDY LEDGER</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {STUDIES.map((s) => (
            <div
              key={s.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '52px 1fr',
                gap: 18,
                padding: '20px 0',
                borderTop: `1px solid rgba(255,255,255,0.18)`,
              }}
            >
              <span style={mono(11, HOT, 700)}>0{s.n}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...mono(13, PAPER, 700), textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: 6 }}
                  >
                    {s.firm.toUpperCase()}
                    <span aria-hidden style={{ fontSize: 10 }}>→</span>
                  </a>
                  <span style={mono(11, CREAM_MUTED, 600)}>{s.year.toUpperCase()}</span>
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 15, color: PAPER, fontWeight: 500 }}>
                  {s.title}
                </div>
                <div style={mono(10, CREAM, 700)}>{s.sample.toUpperCase()}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 13, color: CREAM, lineHeight: 1.5 }}>
                  {s.scope}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            ...mono(10, CREAM_MUTED, 600),
            paddingTop: 22,
            borderTop: `1px solid rgba(255,255,255,0.18)`,
            marginTop: 4,
            letterSpacing: '0.1em',
            textTransform: 'none',
          }}
        >
          {SUPPORTING_NOTE}
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   §02 — Myth vs Fact (paper ground, anchored myths get full weight)
   ────────────────────────────────────────────── */

function SectionMyths() {
  const anchors = MYTHS.filter((m) => m.anchor)
  const rest = MYTHS.filter((m) => !m.anchor)
  return (
    <section style={{ background: PAPER, padding: '72px 36px 64px', borderBottom: `1px solid ${INK}` }}>
      <Container>
        <SectionHeader number="02" label="MYTH VS FACT" />
        {anchors.map((m) => (
          <MythBlock key={m.n} m={m} variant="anchor" />
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginTop: 32 }}>
          {rest.map((m) => (
            <MythBlock key={m.n} m={m} variant="support" />
          ))}
        </div>
      </Container>
    </section>
  )
}

function MythBlock({ m, variant }: { m: Myth; variant: 'anchor' | 'support' }) {
  const isAnchor = variant === 'anchor'

  // Hierarchy: the fact is the headline. The myth sits above as a small
  // recessive quote. The anchor stat is a raw number with no header chrome.
  return (
    <article
      data-myth-anchor-grid={isAnchor ? '' : undefined}
      style={{
        padding: isAnchor ? '44px 0 48px' : '28px 28px 24px',
        borderTop: isAnchor ? `1px solid ${LINE}` : 'none',
        border: !isAnchor ? `1px solid ${LINE}` : undefined,
        background: PAPER,
        display: 'grid',
        gridTemplateColumns: isAnchor ? 'minmax(0, 2fr) minmax(0, 1fr)' : 'minmax(0, 1fr)',
        gap: isAnchor ? 44 : 14,
        alignItems: 'start',
      }}
    >
      <div>
        {/* MYTH XX kicker — small ordinal, recessive */}
        <div style={{ ...mono(10, MUTED, 700), marginBottom: 10 }}>
          MYTH {String(m.n).padStart(2, '0')}
        </div>

        {/* The myth — small, italic, muted. Acknowledged, not equal. */}
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: isAnchor ? 15 : 14,
            fontWeight: 400,
            lineHeight: 1.45,
            color: MUTED,
            margin: '0 0 18px',
            maxWidth: 640,
            fontStyle: 'italic',
          }}
        >
          “{m.myth}”
        </p>

        {/* The fact — the headline. Body type, large, weight 700, ink. */}
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: isAnchor ? 30 : 21,
            lineHeight: 1.25,
            color: INK,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            margin: '0 0 28px',
            maxWidth: 760,
          }}
        >
          {m.fact}
        </p>

        {/* Evidence list — source as external link, body next to it.
            Each row is one scannable line. */}
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {m.facts.map((f, i) => (
            <li
              key={i}
              data-fact-row
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(140px, 180px) minmax(0, 1fr)',
                gap: 18,
                padding: '14px 0',
                borderTop: `1px solid ${LINE}`,
              }}
            >
              <SourceLink source={f.source} url={f.url} />
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: isAnchor ? 15 : 14,
                  lineHeight: 1.55,
                  color: SOFT_INK,
                }}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {m.caveat && (
          <div
            style={{
              marginTop: 22,
              padding: '14px 16px',
              background: PARCHMENT,
              borderLeft: `2px solid ${HOT}`,
            }}
          >
            <div style={{ ...mono(10, HOT, 700), marginBottom: 6 }}>CAVEAT</div>
            <div style={{ fontFamily: FONT.body, fontSize: 13, lineHeight: 1.5, color: SOFT_INK }}>
              {m.caveat}
            </div>
          </div>
        )}
      </div>

      {/* Anchor stat. No header. Just the number and the one-line caption. */}
      {isAnchor && (
        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingTop: 16,
            borderTop: `2px solid ${HOT}`,
          }}
        >
          <div
            data-myth-anchor-stat
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(72px, 9vw, 140px)',
              lineHeight: 0.85,
              letterSpacing: '-0.018em',
              color: HOT,
            }}
          >
            {m.anchorStat.value}
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 13,
              lineHeight: 1.5,
              color: SOFT_INK,
              maxWidth: 280,
            }}
          >
            {m.anchorStat.caption}
          </div>
        </aside>
      )}

      {/* Support myth anchor stat — inline, smaller, no header. */}
      {!isAnchor && (
        <div
          style={{
            marginTop: 22,
            paddingTop: 14,
            borderTop: `2px solid ${HOT}`,
            display: 'flex',
            alignItems: 'baseline',
            gap: 14,
          }}
        >
          <span
            data-myth-support-stat
            style={{
              fontFamily: FONT.mega,
              fontSize: 44,
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              color: HOT,
            }}
          >
            {m.anchorStat.value}
          </span>
          <span style={{ fontFamily: FONT.body, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
            {m.anchorStat.caption}
          </span>
        </div>
      )}
    </article>
  )
}

function SourceLink({ source, url }: { source: string; url?: string }) {
  const label = source.toUpperCase()
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...mono(10, HOT, 700),
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 6,
          alignSelf: 'baseline',
        }}
      >
        {label}
        <span aria-hidden style={{ fontSize: 9 }}>→</span>
      </a>
    )
  }
  return <span style={mono(10, MUTED, 700)}>{label}</span>
}

/* ──────────────────────────────────────────────
   §03 — What It Means
   ────────────────────────────────────────────── */

function SectionImplications() {
  return (
    <section style={{ background: PARCHMENT, padding: '72px 36px 64px', borderBottom: `1px solid ${INK}` }}>
      <Container>
        <SectionHeader number="03" label="WHAT IT MEANS" />
        <h2
          data-implications-headline
          style={{
            fontFamily: FONT.mega,
            fontWeight: 400,
            fontSize: 'clamp(32px, 4.4vw, 56px)',
            lineHeight: 1,
            letterSpacing: '-0.014em',
            textTransform: 'uppercase',
            color: INK,
            margin: '12px 0 32px',
            maxWidth: 880,
          }}
        >
          The Buyer Is a System.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 880 }}>
          {IMPLICATIONS.map((i) => (
            <div key={i.n}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 }}>
                <span style={mono(11, HOT, 700)}>0{i.n}</span>
                <h3 style={{ fontFamily: FONT.body, fontSize: 22, fontWeight: 700, color: INK, margin: 0, lineHeight: 1.25 }}>
                  {i.title}
                </h3>
              </div>
              <p style={{ fontFamily: FONT.body, fontSize: 17, lineHeight: 1.55, color: SOFT_INK, margin: 0 }}>
                {i.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   §04 — Methodology and Sources
   ────────────────────────────────────────────── */

function SectionMethodology() {
  return (
    <section style={{ background: PAPER, padding: '72px 36px 80px' }}>
      <Container>
        <SectionHeader number="04" label="METHODOLOGY AND SOURCES" />

        {/* Sources block — compact study restatement */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 48 }}>
          {STUDIES.map((s) => (
            <div
              key={s.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px minmax(0, 1fr)',
                gap: 18,
                padding: '16px 0',
                borderTop: `1px solid ${LINE}`,
              }}
            >
              <span style={mono(11, MUTED, 700)}>0{s.n}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...mono(12, HOT, 700), textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: 6 }}
                  >
                    {s.firm.toUpperCase()}
                    <span aria-hidden style={{ fontSize: 9 }}>→</span>
                  </a>
                  <span style={mono(10, MUTED, 600)}>{s.year.toUpperCase()}</span>
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: INK, marginTop: 4, fontWeight: 500 }}>
                  {s.title}
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 12, color: MUTED, marginTop: 4, lineHeight: 1.5 }}>
                  {s.sample}. {s.scope}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest flags */}
        <div style={mono(11, MUTED, 700)}>HONEST FLAGS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 16, marginBottom: 56 }}>
          {HONEST_FLAGS.map((f) => (
            <div key={f.label}>
              <div style={mono(11, HOT, 700)}>{f.label.toUpperCase()}</div>
              <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.55, color: SOFT_INK, margin: '6px 0 0', maxWidth: 880 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* Credibility line — closing statement */}
        <div
          style={{
            background: INK,
            color: PAPER,
            padding: '32px 36px',
          }}
        >
          <div style={{ ...mono(10, CREAM_MUTED, 700), marginBottom: 14 }}>HOW THE BUYER VIEW HOLDS UP</div>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.55,
              color: PAPER,
              margin: 0,
              maxWidth: 880,
            }}
          >
            {CREDIBILITY_LINE}
          </p>
        </div>
      </Container>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Shared primitives
   ────────────────────────────────────────────── */

function Container({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: 1280, margin: '0 auto' }}>{children}</div>
}

function SectionHeader({
  number,
  label,
  ground = 'light',
}: {
  number: string
  label: string
  ground?: 'light' | 'dark'
}) {
  const color = ground === 'dark' ? CREAM_MUTED : MUTED
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
      <span style={mono(11, HOT, 700)}>{number}</span>
      <span style={mono(11, color, 700)}>{label}</span>
    </div>
  )
}

function StatTile({ value, label, ground = 'light' }: { value: string; label: string; ground?: 'light' | 'dark' }) {
  const labelColor = ground === 'dark' ? CREAM_MUTED : MUTED
  const numberColor = ground === 'dark' ? PAPER : INK
  return (
    <div>
      <div
        style={{
          fontFamily: FONT.mega,
          fontSize: 'clamp(36px, 5vw, 64px)',
          lineHeight: 0.9,
          letterSpacing: '-0.014em',
          color: numberColor,
        }}
      >
        {value}
      </div>
      <div style={{ ...mono(10, labelColor, 700), marginTop: 8 }}>{label}</div>
    </div>
  )
}

function mono(size: number, color: string = INK, weight: number = 600): CSSProperties {
  return {
    fontFamily: FONT.mono,
    fontSize: size,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color,
    fontWeight: weight,
  }
}
