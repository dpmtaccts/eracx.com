import type { CSSProperties } from 'react'
import { FONT } from '../theme'
import { PAGE_LINE, PILLAR_COLOR } from './types'

import { BRAND_HEALTH, BRAND_HEALTH_NOTE } from '../data/brandHealth'
import { SIGNALS, SIGNALS_FINDING, SIGNALS_AVG_ALIGNMENT } from '../data/signals'
import { CASCADE_LAYERS } from '../data/cascade'
import {
  WANTS_TO_SAY,
  ACTUALLY_SAYS,
  AI_MIRROR_SCORE,
  AI_MIRROR_CONTEXT,
  TEST_QUERIES,
} from '../data/aiMirror'
import {
  ICP_BUYERS_NAMED,
  ICP_BUYERS_HEADLINE,
  TIER_AVERAGES,
  SEVEN_FINDINGS,
} from '../data/population'
import { PROJECTED_IMPACT, VISIBLE_FOOTPRINT, PROJECTION_CAVEAT, FOOTPRINT_NOTE } from '../data/investment'
import { PROFILE_VISUALS, ALEXI_COMMENTER_MIX, NETWORK_REACH } from '../data/profiles'
import { KEY_METRICS, ACTIVE_TENSIONS } from '../data/audience'
import { PHASES } from '../data/build'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const SOFT_INK = 'rgba(10, 10, 10, 0.78)'
const HOT = '#E6195F'
const COBALT = '#1845C2'
const RUST = '#DD5C20'
const YELLOW = '#F4C430'
const POSITIVE = '#3A9B6E'

/* ──────────────────────────────────────────────
   Router — picks the right bento by slot
   ────────────────────────────────────────────── */

export type BentoSlot =
  | 'leaders'
  | 'agents'
  | 'content'
  | 'employees'
  | 'buyers'
  | 'closer'

export function RichBento({ slot }: { slot: BentoSlot }) {
  switch (slot) {
    case 'leaders':
      return <LeadersBento />
    case 'agents':
      return <AgentsBento />
    case 'content':
      return <ContentBento />
    case 'employees':
      return <EmployeesBento />
    case 'buyers':
      return <BuyersBento />
    case 'closer':
      return <CloserBento />
  }
}

/* ──────────────────────────────────────────────
   Shared primitives
   ────────────────────────────────────────────── */

function Card({
  children,
  padding = '22px 24px',
  background = PAPER,
  colSpan = 1,
  rowSpan = 1,
}: {
  children: React.ReactNode
  padding?: string
  background?: string
  colSpan?: number
  rowSpan?: number
}) {
  return (
    <article
      style={{
        background,
        border: `1px solid ${PAGE_LINE}`,
        padding,
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}
    >
      {children}
    </article>
  )
}

function Grid({ children, columns = 12 }: { children: React.ReactNode; columns?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 14,
      }}
    >
      {children}
    </div>
  )
}

function Kicker({
  children,
  pillar = INK,
  marginBottom = 14,
}: {
  children: React.ReactNode
  pillar?: string
  marginBottom?: number
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom }}>
      <span
        aria-hidden
        style={{ display: 'inline-block', width: 14, height: 3, background: pillar }}
      />
      <span style={mono(10, MUTED, 700)}>{children}</span>
    </div>
  )
}

function MegaNumber({
  value,
  suffix,
  color = INK,
  size = 64,
}: {
  value: number | string
  suffix?: string
  color?: string
  size?: number
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span
        style={{
          fontFamily: FONT.mega,
          fontSize: size,
          lineHeight: 0.9,
          letterSpacing: '-0.01em',
          color,
        }}
      >
        {value}
      </span>
      {suffix && <span style={mono(11, MUTED, 600)}>{suffix}</span>}
    </div>
  )
}

function BarRow({
  label,
  value,
  max = 100,
  color,
  trailing,
}: {
  label: string
  value: number
  max?: number
  color: string
  trailing?: string
}) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: FONT.body, fontSize: 13, color: INK, fontWeight: 500 }}>
          {label}
        </span>
        <span style={mono(10, MUTED, 700)}>
          {value}
          {trailing ?? ''}
        </span>
      </div>
      <div
        aria-hidden
        style={{ height: 8, background: PARCHMENT, position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

function Body({
  children,
  size = 14,
  color = INK,
  maxWidth,
}: {
  children: React.ReactNode
  size?: number
  color?: string
  maxWidth?: number
}) {
  return (
    <p style={{ fontFamily: FONT.body, fontSize: size, lineHeight: 1.55, color, margin: 0, maxWidth }}>
      {children}
    </p>
  )
}

function ArtifactImage({
  src,
  alt,
  gloss,
}: {
  src: string
  alt: string
  gloss?: string
}) {
  // The cascade screenshots are 530px wide natively, 1600–2250px tall.
  // On screen: 560×560 frame with scroll, so the drawer doesn't blow out.
  // For print/PDF: the frame opens up to the image's full height so the
  // entire screenshot lands on the page instead of whatever scroll
  // position happened to be active when the PDF was saved.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      <style>{ARTIFACT_PRINT_CSS}</style>
      <div
        data-artifact-frame
        style={{
          background: PARCHMENT,
          width: '100%',
          maxWidth: 560,
          height: 560,
          overflowY: 'auto',
          overflowX: 'hidden',
          border: `1px solid ${PAGE_LINE}`,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
      {gloss && (
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 12,
            lineHeight: 1.5,
            color: MUTED,
            maxWidth: 560,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {gloss}
        </div>
      )}
    </div>
  )
}

const ARTIFACT_PRINT_CSS = `
@media print {
  [data-artifact-frame] {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    page-break-inside: avoid;
  }
}
`

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

/* ──────────────────────────────────────────────
   ▸ 02 — LEADERS
   Voice census · CEO comment behavior · Share of Voice
   ────────────────────────────────────────────── */

function LeadersBento() {
  const pillar = PILLAR_COLOR[2]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Grid columns={12}>
        {/* Voice census */}
        <Card colSpan={4}>
          <Kicker pillar={pillar}>VOICE CENSUS · 90 DAYS</Kicker>
          <MegaNumber value="2" suffix="OF 21 VOICES" color={pillar} size={84} />
          <div style={{ marginTop: 14, marginBottom: 14 }}>
            <Body size={13} color={MUTED}>
              Two of twenty-one BetterUp leaders publish original content. The remaining nineteen
              repost or stay silent.
            </Body>
          </div>
          <VoiceCensusBar pillar={pillar} />
        </Card>

        {/* CEO comment behavior — Alexi departures screenshot */}
        <Card colSpan={8}>
          <Kicker pillar={pillar}>WHAT THE BUYER SEES · CEO COMMENT BEHAVIOR</Kicker>
          <ArtifactImage
            src="/images/betterup/cascade/crop-a-alexi-departures.png"
            alt="CEO comment stream showing short congratulations on departures to BCG, IBM, ServiceNow, and Workday"
            gloss="Graceful, generous, and disproportionate. The CEO is visible to alumni, invisible to the buyers the company needs to win."
          />
        </Card>
      </Grid>

      {/* Share of Voice vs competitors */}
      <Card>
        <Kicker pillar={pillar}>SHARE OF VOICE · BETTERUP VS COACHHUB · TORCH · EZRA</Kicker>
        <Grid columns={12}>
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Body color={SOFT_INK}>{BRAND_HEALTH_NOTE}</Body>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <LegendDot color={pillar} label="BetterUp" />
              <LegendDot color="#7B8FB5" label="CoachHub" />
              <LegendDot color="#B5A77B" label="Torch" />
              <LegendDot color="#B57BAC" label="Ezra" />
            </div>
          </div>
          <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BRAND_HEALTH.map((dim) => (
              <CompareRow
                key={dim.dim}
                label={dim.dim}
                buScore={dim.betterup}
                others={[
                  { color: '#7B8FB5', value: dim.coachhub },
                  { color: '#B5A77B', value: dim.torch },
                  { color: '#B57BAC', value: dim.ezra },
                ]}
                buColor={pillar}
              />
            ))}
          </div>
        </Grid>
      </Card>

      {/* Executive cadence grid — four named voices, twelve-month post counts.
          Sits next to the voice-census stat so the silence reads twice: as
          a number (2 of 21) and as faces. */}
      <Card>
        <Kicker pillar={pillar}>NAMED EXECUTIVES · 12-MONTH POST COUNT</Kicker>
        <Grid columns={12}>
          {EXEC_GRID.map((e) => {
            const visuals = PROFILE_VISUALS[e.id]
            return (
              <div
                key={e.id}
                style={{
                  gridColumn: 'span 3',
                  padding: '16px 18px',
                  border: `1px solid ${PAGE_LINE}`,
                  background: PAPER,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {visuals.photo ? (
                    <img
                      src={visuals.photo}
                      alt={e.label}
                      style={{ width: 44, height: 44, objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: PARCHMENT,
                        border: `1px solid ${PAGE_LINE}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...mono(12, MUTED, 700),
                      }}
                    >
                      {visuals.initials}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 600, color: INK }}>
                      {e.label}
                    </span>
                    <span style={mono(9, MUTED, 600)}>{e.role}</span>
                  </div>
                </div>
                <CadenceSparkline cadence={visuals.cadence} pillar={pillar} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={mono(9, MUTED, 600)}>
                    TOTAL {visuals.cadence.reduce((a, b) => a + b, 0)} POSTS
                  </span>
                  <span style={mono(9, MUTED, 600)}>↑ NOW</span>
                </div>
              </div>
            )
          })}
        </Grid>
      </Card>

      {/* Alexi commenter mix — who actually engages */}
      <Card>
        <Kicker pillar={pillar}>WHO COMMENTS ON THE CEO · WHO THE CEO IS TALKING TO</Kicker>
        <Grid columns={12}>
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Body color={INK}>
              Zero percent of the commenters on the CEO’s posts are enterprise buyers. Forty
              percent are BetterUp employees. The conversation is internal, and the audience the
              company needs is absent.
            </Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ALEXI_COMMENTER_MIX.map((m) => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span
                    aria-hidden
                    style={{
                      width: 10,
                      height: 10,
                      background: commenterDot(m.color, pillar, m.ghost),
                      border: m.ghost ? `1px dashed ${MUTED}` : 'none',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 13,
                      color: m.ghost ? MUTED : INK,
                      flex: 1,
                    }}
                  >
                    {m.label}
                  </span>
                  <span style={mono(10, m.ghost ? MUTED : INK, 700)}>
                    {m.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ gridColumn: 'span 7' }}>
            <CommenterMixBar mix={ALEXI_COMMENTER_MIX} pillar={pillar} />
            <div style={{ marginTop: 14, ...mono(10, MUTED, 700) }}>
              ENTERPRISE BUYERS · 0% · THE CHANNEL HE NEEDS, NOT REACHED
            </div>
          </div>
        </Grid>
      </Card>

      {/* Person vs Page — two-bar headline showing the 3.6× felt as
          visual ratio, then the human total decomposed into its sources */}
      <Card background={PARCHMENT}>
        <Kicker pillar={pillar}>PERSON VS PAGE · LINKEDIN ALGORITHM REALITY</Kicker>
        <Grid columns={12}>
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <MegaNumber value={NETWORK_REACH.multiplier} suffix="COMBINED HUMAN REACH" color={pillar} size={72} />
            <Body size={13} color={MUTED}>
              Activating the people gives 3.6× the reach of the company page alone. The lever is
              human, not pages.
            </Body>
          </div>
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Headline two-bar comparison on the same axis */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <ReachHero
                label="Company page"
                sublabel="BRAND HANDLE · @BETTERUP"
                value={NETWORK_REACH.brandPage.value}
                max={NETWORK_REACH.combinedHuman}
                color={MUTED}
                format={NETWORK_REACH.brandPage.format}
              />
              <ReachHero
                label="Combined human"
                sublabel="CEO · COACHES · SALES · MARKETING"
                value={NETWORK_REACH.combinedHuman}
                max={NETWORK_REACH.combinedHuman}
                color={pillar}
                format={NETWORK_REACH.combinedHumanFormat}
                strong
              />
            </div>
            {/* Decomposition — what makes up the human total */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={mono(9, MUTED, 700)}>HUMAN TOTAL · BREAKDOWN</span>
              <div style={{ display: 'flex', height: 20, border: `1px solid ${PAGE_LINE}` }}>
                {NETWORK_REACH.human.map((h, i) => (
                  <div
                    key={h.label}
                    title={`${h.label}: ${h.format}`}
                    style={{
                      flex: h.value,
                      background: pillar,
                      opacity: 0.35 + (i / NETWORK_REACH.human.length) * 0.6,
                      borderRight:
                        i < NETWORK_REACH.human.length - 1 ? `1px solid ${PAPER}` : 'none',
                    }}
                  />
                ))}
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: 6,
                }}
              >
                {NETWORK_REACH.human.map((h, i) => (
                  <li
                    key={h.label}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 10,
                        height: 10,
                        background: pillar,
                        opacity: 0.35 + (i / NETWORK_REACH.human.length) * 0.6,
                        display: 'inline-block',
                        flex: '0 0 auto',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 12,
                        color: INK,
                        flex: 1,
                      }}
                    >
                      {h.label}
                    </span>
                    <span style={mono(9, MUTED, 700)}>{h.format}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Grid>
      </Card>

      {/* Leadership Visibility critical-gap signal */}
      <Card>
        <Grid columns={12}>
          <div style={{ gridColumn: 'span 4' }}>
            <MegaNumber value="18" suffix="/ 100 LEADERSHIP VISIBILITY" color={pillar} size={56} />
            <div style={{ marginTop: 8 }}>
              <span style={mono(10, pillar, 700)}>CRITICAL GAP</span>
            </div>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <Body color={SOFT_INK}>
              Philosophical CEO content. Other executives invisible. Buyers cannot triangulate
              trust from a single inward voice. The fix is to activate five to seven executives
              with outcome-oriented content rhythms.
            </Body>
          </div>
        </Grid>
      </Card>
    </div>
  )
}

const EXEC_GRID: { id: keyof typeof PROFILE_VISUALS; label: string; role: string }[] = [
  { id: 'ceo', label: 'Alexi Robichaux', role: 'CEO' },
  // Amy Sole's correct title is unverified. The previous build labeled her
  // CEO (duplicate) and the polish pass labeled her CMO without source.
  // Slot marker is visible until the actual title is supplied.
  { id: 'marketing', label: 'Amy Sole', role: '[[SLOT: AMY SOLE TITLE]]' },
  { id: 'sales', label: 'Jonathan Chang', role: 'SVP SALES' },
  { id: 'accounts', label: 'Willi Mendez', role: 'VP ACCOUNTS' },
]

function CadenceSparkline({ cadence, pillar }: { cadence: number[]; pillar: string }) {
  const max = Math.max(...cadence, 1)
  return (
    <div aria-hidden style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36 }}>
      {cadence.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${Math.max(2, (v / max) * 100)}%`,
            background: v > 0 ? pillar : PARCHMENT,
            border: v === 0 ? `1px solid ${PAGE_LINE}` : 'none',
          }}
          title={`Month ${i + 1}: ${v} posts`}
        />
      ))}
    </div>
  )
}

function commenterDot(color: string, pillar: string, ghost?: boolean): string {
  if (ghost) return 'transparent'
  switch (color) {
    case 'rust':
      return pillar
    case 'red':
      return HOT
    case 'amber':
      return YELLOW
    case 'magenta':
      return '#B57BAC'
    case 'sky':
      return '#7B8FB5'
    case 'green':
      return POSITIVE
    case 'textMuted':
      return MUTED
    default:
      return MUTED
  }
}

function CommenterMixBar({ mix, pillar }: { mix: typeof ALEXI_COMMENTER_MIX; pillar: string }) {
  return (
    <div style={{ display: 'flex', height: 36, border: `1px solid ${PAGE_LINE}` }}>
      {mix.map((m) => (
        <div
          key={m.label}
          title={`${m.label}: ${m.pct}%`}
          style={{
            flex: m.pct || 0.5,
            background: m.ghost ? PARCHMENT : commenterDot(m.color, pillar),
            borderLeft: m.ghost ? `1px dashed ${MUTED}` : 'none',
            position: 'relative',
          }}
        >
          {m.ghost && (
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                ...mono(8, MUTED, 700),
                whiteSpace: 'nowrap',
              }}
            >
              0%
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function ReachHero({
  label,
  sublabel,
  value,
  max,
  color,
  format,
  strong,
}: {
  label: string
  sublabel?: string
  value: number
  max: number
  color: string
  format: string
  strong?: boolean
}) {
  const pct = Math.max(2, (value / max) * 100)
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 12,
          marginBottom: 6,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 15,
              fontWeight: strong ? 700 : 600,
              color: INK,
            }}
          >
            {label}
          </span>
          {sublabel && <span style={mono(9, MUTED, 600)}>{sublabel}</span>}
        </div>
        <span
          style={{
            fontFamily: FONT.mega,
            fontSize: strong ? 32 : 24,
            lineHeight: 0.9,
            color: strong ? INK : MUTED,
            letterSpacing: '-0.01em',
          }}
        >
          {format}
        </span>
      </div>
      <div
        style={{
          height: strong ? 24 : 16,
          background: PAPER,
          border: `1px solid ${PAGE_LINE}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${pct}%`,
            background: color,
            opacity: strong ? 1 : 0.5,
          }}
        />
      </div>
    </div>
  )
}

function VoiceCensusBar({ pillar }: { pillar: string }) {
  return (
    <div
      aria-hidden
      style={{
        display: 'flex',
        gap: 2,
        height: 22,
        border: `1px solid ${PAGE_LINE}`,
        background: PARCHMENT,
      }}
    >
      {Array.from({ length: 21 }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: i < 2 ? pillar : 'transparent',
          }}
        />
      ))}
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 10, height: 10, background: color, display: 'inline-block' }} />
      <span style={{ fontFamily: FONT.body, fontSize: 12, color: INK }}>{label}</span>
    </span>
  )
}

function CompareRow({
  label,
  buScore,
  others,
  buColor,
}: {
  label: string
  buScore: number
  others: { color: string; value: number }[]
  buColor: string
}) {
  // All four scores share a single 0–100 axis so they're visually comparable.
  // BetterUp renders as a filled bar; competitors as vertical ticks at their
  // value position. The reader sees how BetterUp stacks against each peer
  // on the same scale.
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 500, color: INK }}>{label}</span>
        <span style={mono(10, MUTED, 700)}>
          <span style={{ color: buColor }}>BU {buScore}</span>
          {' · '}
          {others.map((o, i) => (
            <span key={i} style={{ color: o.color }}>
              {o.value}
              {i < others.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </span>
      </div>
      <div
        style={{
          position: 'relative',
          height: 22,
          background: PARCHMENT,
          overflow: 'hidden',
        }}
      >
        {/* BetterUp filled bar — the primary read */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${Math.max(2, buScore)}%`,
            background: buColor,
            opacity: 0.22,
          }}
        />
        {/* BetterUp endpoint marker */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${Math.max(2, buScore)}%`,
            borderRight: `2px solid ${buColor}`,
          }}
        />
        {/* Competitor ticks on the same 0–100 axis */}
        {others.map((o, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${Math.max(2, o.value)}%`,
              borderRight: `2px solid ${o.color}`,
            }}
            title={`${o.value}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ▸ 03 — AGENTS
   AI Mirror score · Promise vs Proof · test queries
   ────────────────────────────────────────────── */

function AgentsBento() {
  const pillar = PILLAR_COLOR[3]
  const positives = ACTUALLY_SAYS.filter((s) => s.tone === 'positive')
  const negatives = ACTUALLY_SAYS.filter((s) => s.tone === 'negative')
  const summary = ACTUALLY_SAYS.find((s) => s.tone === 'summary')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Grid columns={12}>
        <Card colSpan={4}>
          <Kicker pillar={pillar}>AI MIRROR SCORE</Kicker>
          <MegaNumber value={AI_MIRROR_SCORE} suffix="/ 100" color={pillar} size={96} />
          <div style={{ marginTop: 12 }}>
            <Body size={13} color={MUTED}>
              How the buyer-facing AI agents synthesize BetterUp today. Composite read across
              ChatGPT, Claude, Perplexity, and Google AI Overview.
            </Body>
          </div>
        </Card>
        <Card colSpan={8}>
          <Kicker pillar={pillar}>WHY THIS LANDS BEFORE YOU DO</Kicker>
          <Body color={INK} size={15}>
            {AI_MIRROR_CONTEXT}
          </Body>
        </Card>
      </Grid>

      <Grid columns={12}>
        <Card colSpan={6}>
          <Kicker pillar={INK}>WHAT BETTERUP WANTS THE AGENT TO SAY</Kicker>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {WANTS_TO_SAY.map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ width: 6, height: 6, background: SOFT_INK, marginTop: 6, display: 'inline-block', flex: '0 0 auto' }} />
                <span style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.45, color: INK }}>{t}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card colSpan={6}>
          <Kicker pillar={pillar}>WHAT THE AGENT ACTUALLY SAYS</Kicker>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[...positives, ...negatives].map((s, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'baseline',
                  padding: s.tone === 'negative' ? '6px 10px 6px 12px' : 0,
                  background: s.tone === 'negative' ? 'rgba(230,25,95,0.06)' : 'transparent',
                  borderLeft: s.tone === 'negative' ? `2px solid ${pillar}` : 'none',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: s.tone === 'positive' ? POSITIVE : pillar,
                    marginTop: 6,
                    display: 'inline-block',
                    flex: '0 0 auto',
                  }}
                />
                <span style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.45, color: INK }}>{s.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Grid>

      {summary && (
        <Card background={PARCHMENT}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <span style={{ ...mono(10, pillar, 700), flex: '0 0 auto', paddingTop: 4 }}>NET READ</span>
            <Body size={16} color={INK}>
              <em style={{ fontStyle: 'italic' }}>{summary.text}</em>
            </Body>
          </div>
        </Card>
      )}

      {/* What the agent is repeating today — the specific outdated facts */}
      <Card>
        <Kicker pillar={pillar}>WHAT THE AGENT IS QUOTING TODAY</Kicker>
        <Grid columns={12}>
          {OUTDATED_FACTS.map((f, i) => (
            <div
              key={i}
              style={{
                gridColumn: 'span 4',
                padding: '16px 18px',
                background: PAPER,
                border: `1px solid ${PAGE_LINE}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <span style={mono(9, MUTED, 700)}>{f.label}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    color: MUTED,
                    textDecoration: 'line-through',
                    textDecorationColor: pillar,
                  }}
                >
                  {f.quoted}
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    fontWeight: 600,
                    color: INK,
                  }}
                >
                  {f.actual}
                </span>
              </div>
              <span style={mono(9, pillar, 700)}>FIX AT THE SOURCE</span>
            </div>
          ))}
        </Grid>
      </Card>

      <Card>
        <Kicker pillar={pillar}>RUN THE TEST YOURSELF</Kicker>
        <Body size={13} color={MUTED} maxWidth={720}>
          Paste any of these into ChatGPT, Claude, Perplexity, or Google AI Overview and compare
          what comes back to the marketing claims above.
        </Body>
        <ul
          style={{
            margin: '14px 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {TEST_QUERIES.map((q, i) => (
            <li
              key={i}
              style={{
                ...mono(13, INK, 500),
                textTransform: 'none',
                letterSpacing: 0,
                padding: '10px 14px',
                background: PARCHMENT,
                border: `1px solid ${PAGE_LINE}`,
              }}
            >
              <span style={{ color: pillar, marginRight: 12 }}>›</span>
              {q}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

const OUTDATED_FACTS: { label: string; quoted: string; actual: string }[] = [
  {
    label: 'OFFERINGS',
    quoted: 'BetterUp Lead at $14 / month, D2C tier',
    actual: 'D2C tier discontinued. Enterprise-only as of 2023.',
  },
  {
    label: 'HEADCOUNT',
    quoted: '~800 employees',
    actual: '1,200+ employees, including ~4,000 coaches in network.',
  },
  {
    label: 'CLIENT ROSTER',
    quoted: 'Legacy logos from 2020–2022',
    actual: 'Microsoft, Salesforce, Google, Hilton, NASA, Chevron, Adobe, SpaceX.',
  },
]

/* ──────────────────────────────────────────────
   ▸ 04 — CONTENT
   Category alignment chart · the one opportunity · keely reposts
   ────────────────────────────────────────────── */

function ContentBento() {
  const pillar = PILLAR_COLOR[4]
  const aiSignal = SIGNALS.find((s) => s.name === 'AI Product Signal')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Grid columns={12}>
        <Card colSpan={4}>
          <Kicker pillar={pillar}>AVG ALIGNMENT · 8 CATEGORIES</Kicker>
          <MegaNumber value={SIGNALS_AVG_ALIGNMENT} suffix="/ 100" color={pillar} size={84} />
          <div style={{ marginTop: 14 }}>
            <Body size={13} color={MUTED}>
              Seven of eight content categories score under fifty. The content reaches buyers who
              already believe; it underperforms with the ones still deciding.
            </Body>
          </div>
        </Card>
        <Card colSpan={8}>
          <Kicker pillar={INK}>FINDING</Kicker>
          <Body size={15} color={INK}>
            {SIGNALS_FINDING}
          </Body>
        </Card>
      </Grid>

      {/* Category alignment chart */}
      <Card>
        <Kicker pillar={pillar}>PER-CATEGORY ALIGNMENT WITH BUYER INTENT</Kicker>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SIGNALS.map((s) => {
            const isOpp = s.category === 'Opportunity'
            const isCrit = s.category === 'Critical Gap'
            const color = isOpp ? POSITIVE : isCrit ? HOT : RUST
            return (
              <BarRow
                key={s.name}
                label={s.name}
                value={s.alignment}
                color={color}
                trailing="%"
              />
            )
          })}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <LegendDot color={HOT} label="Critical Gap" />
          <LegendDot color={RUST} label="High Gap" />
          <LegendDot color={POSITIVE} label="Opportunity" />
        </div>
      </Card>

      {/* The single opportunity */}
      {aiSignal && (
        <Card background={PARCHMENT}>
          <Kicker pillar={POSITIVE}>THE ONE OPPORTUNITY IN THE SET</Kicker>
          <Grid columns={12}>
            <div style={{ gridColumn: 'span 4' }}>
              <MegaNumber value={aiSignal.alignment} suffix="/ 100" color={POSITIVE} size={56} />
              <div style={{ marginTop: 8 }}>
                <span style={mono(11, POSITIVE, 700)}>AI PRODUCT SIGNAL</span>
              </div>
            </div>
            <div style={{ gridColumn: 'span 8' }}>
              <Body color={SOFT_INK}>
                BetterUp Grow at 95% satisfaction is the strongest signal in the deck and the most
                underused in market communication. Lead with human, substantiate with AI, build
                outcome case studies around the hybrid.
              </Body>
            </div>
          </Grid>
        </Card>
      )}

      {/* Audience reality — Moodlight key metrics */}
      <Card>
        <Kicker pillar={pillar}>WHAT THE BUYER IS ACTUALLY FEELING</Kicker>
        <Grid columns={12}>
          {KEY_METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                gridColumn: 'span 4',
                padding: '16px 18px',
                background: PAPER,
                border: `1px solid ${PAGE_LINE}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 36,
                  lineHeight: 0.9,
                  color: pillar,
                  letterSpacing: '-0.01em',
                }}
              >
                {m.value}
              </span>
              <span style={{ fontFamily: FONT.body, fontSize: 13, color: INK, lineHeight: 1.4 }}>
                {m.label}
              </span>
              <span style={mono(9, MUTED, 700)}>{m.sub}</span>
            </div>
          ))}
        </Grid>
      </Card>

      {/* The first active tension — sharpest evidence of the buyer flatline */}
      <Card background={PARCHMENT}>
        <Kicker pillar={pillar}>WHAT THE BUYER IS HOLDING IN TENSION</Kicker>
        <div
          style={{
            fontFamily: FONT.mega,
            fontSize: 32,
            lineHeight: 1.05,
            letterSpacing: '-0.005em',
            color: INK,
            margin: '0 0 14px',
            maxWidth: 880,
          }}
        >
          {ACTIVE_TENSIONS[0].title}
        </div>
        <Body size={15} color={SOFT_INK} maxWidth={880}>
          {ACTIVE_TENSIONS[0].body}
        </Body>
      </Card>

      {/* Seller-reposts screenshot */}
      <Card>
        <Kicker pillar={pillar}>WHAT THE BUYER SEES · SELLER FEEDS</Kicker>
        <ArtifactImage
          src="/images/betterup/cascade/crop-b-keely-reposts.png"
          alt="A senior seller's LinkedIn feed showing consecutive reposts of BetterUp company-page content"
          gloss="The people closest to the customer, repeating what the company page already said. The buyer reads it as one voice, not two."
        />
      </Card>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ▸ 05 — EMPLOYEES
   Glassdoor 3.2 · Cascade break · pay-dispute themes
   ────────────────────────────────────────────── */

function EmployeesBento() {
  const pillar = PILLAR_COLOR[5]
  const breakLayer = CASCADE_LAYERS.find((l) => l.status === 'Cascade Break')
  const employeeBrand = BRAND_HEALTH.find((d) => d.dim === 'Employee Brand')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Grid columns={12}>
        <Card colSpan={5}>
          <Kicker pillar={pillar}>GLASSDOOR · WHAT THE BUYER FINDS FIRST</Kicker>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
            <span
              style={{
                fontFamily: FONT.mega,
                fontSize: 96,
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                color: pillar,
              }}
            >
              3.2
            </span>
            <span style={mono(11, MUTED, 700)}>/ 5</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <Body size={14} color={INK}>
              The pay disputes behind the rating are still public, still searchable, still
              unresolved. The buyer reads them before sales does.
            </Body>
          </div>
        </Card>

        <Card colSpan={7}>
          <Kicker pillar={pillar}>EMPLOYEE BRAND · INDUSTRY COMPARISON</Kicker>
          {employeeBrand ? (
            <CompareRow
              label="Employee Brand"
              buScore={employeeBrand.betterup}
              others={[
                { color: '#7B8FB5', value: employeeBrand.coachhub },
                { color: '#B5A77B', value: employeeBrand.torch },
                { color: '#B57BAC', value: employeeBrand.ezra },
              ]}
              buColor={pillar}
            />
          ) : null}
          <div style={{ marginTop: 16 }}>
            <Body size={13} color={MUTED}>
              BetterUp scores 32 on the Pinwheel employee-brand dimension, against estimated 55,
              62, and 58 for CoachHub, Torch, and Ezra. The contradiction is not just internal;
              it is comparable, and the gap is visible.
            </Body>
          </div>
        </Card>
      </Grid>

      {/* Cascade break — layer 4 */}
      {breakLayer && (
        <Card>
          <Kicker pillar={pillar}>CASCADE BREAK · LAYER {breakLayer.number} · {breakLayer.name.toUpperCase()}</Kicker>
          <Grid columns={12}>
            <div style={{ gridColumn: 'span 4' }}>
              <MegaNumber value={breakLayer.score} suffix={`/ 100 · ${breakLayer.status.toUpperCase()}`} color={pillar} size={56} />
            </div>
            <div style={{ gridColumn: 'span 8' }}>
              <Body color={INK}>{breakLayer.assessment}</Body>
              {breakLayer.evidence.length > 0 && (
                <ul
                  style={{
                    margin: '14px 0 0',
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {breakLayer.evidence.map((e, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ width: 5, height: 5, background: pillar, marginTop: 8, display: 'inline-block', flex: '0 0 auto' }} />
                      <span style={{ fontFamily: FONT.body, fontSize: 13, lineHeight: 1.5, color: SOFT_INK }}>{e}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
        </Card>
      )}

      {/* Employee Signal — the lowest-alignment number in the deck */}
      <Card>
        <Grid columns={12}>
          <div style={{ gridColumn: 'span 4' }}>
            <MegaNumber value="12" suffix="/ 100 EMPLOYEE SIGNAL" color={pillar} size={56} />
            <div style={{ marginTop: 8 }}>
              <span style={mono(10, pillar, 700)}>LOWEST ALIGNMENT IN THE DECK</span>
            </div>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <Body color={SOFT_INK}>
              The lowest alignment score across all eight signal categories. AI search surfaces
              employee discontent as a deal counterweight. Operational fix first: address pay,
              comms, and account-manager churn before any advocacy program will land.
            </Body>
          </div>
        </Grid>
      </Card>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ▸ 06 — THE BUYERS ARE ALREADY HERE
   12 named buyers · concentration map · tier averages
   ────────────────────────────────────────────── */

function BuyersBento() {
  const pillar = PILLAR_COLOR[6]
  const accent = COBALT
  // Count concentration on Jolen Anderson
  const onJolen = ICP_BUYERS_NAMED.filter((b) => b.appearsOn.includes('Jolen')).length
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        <Kicker pillar={pillar}>HOW TO READ THIS</Kicker>
        <Body size={15} color={INK}>
          {ICP_BUYERS_HEADLINE}
        </Body>
      </Card>

      <Grid columns={12}>
        <Card colSpan={5}>
          <Kicker pillar={pillar}>CONCENTRATION · WHO IS CATCHING THEM</Kicker>
          <MegaNumber value={onJolen} suffix={`OF ${ICP_BUYERS_NAMED.length} ON ONE VOICE`} color={accent} size={72} />
          <div style={{ marginTop: 14 }}>
            <Body size={13} color={MUTED}>
              Six of the twelve named buyers engage with BetterUp through Jolen Anderson’s feed.
              If that voice leaves, the relationships leave with it.
            </Body>
          </div>
        </Card>

        <Card colSpan={7}>
          <Kicker pillar={pillar}>TIER AVERAGES · WHERE THE SIGNAL CLUSTERS</Kicker>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TIER_AVERAGES.map((t) => (
              <div key={t.tier}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 500, color: INK }}>
                    {t.tier} <span style={{ color: MUTED }}>· n={t.n}</span>
                  </span>
                  <span style={mono(10, MUTED, 700)}>
                    AVG {t.avg} · RANGE {t.range}
                  </span>
                </div>
                <div style={{ height: 6, background: PARCHMENT, position: 'relative', overflow: 'hidden' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: `${t.avg}%`,
                      background: accent,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Jolen ICP thread — proof of buyer engagement, concentrated on one voice */}
      <Card>
        <Kicker pillar={pillar}>WHAT THE BUYER SEES · ONE VOICE CATCHING THE ROOM</Kicker>
        <ArtifactImage
          src="/images/betterup/cascade/crop-c-jolen-icp-thread.png"
          alt="Comment thread on a Jolen Anderson LinkedIn post showing named CHRO and CPO engagement"
          gloss="The buyers are reachable. They show up under one voice. If that voice leaves, the relationships go too."
        />
      </Card>

      {/* Seven things the buyer leaves a 90-second diligence pass believing */}
      <Card background={PARCHMENT}>
        <Kicker pillar={pillar}>WHAT THE BUYER LEAVES A 90-SECOND DILIGENCE PASS BELIEVING</Kicker>
        <ol
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {SEVEN_FINDINGS.map((f, i) => (
            <li key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 12, alignItems: 'baseline' }}>
              <span style={mono(11, accent, 700)}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.5, color: INK }}>{f}</span>
            </li>
          ))}
        </ol>
      </Card>

      {/* Named buyer roster */}
      <Card>
        <Kicker pillar={pillar}>THE TWELVE · NAMED, TITLED, ENGAGING</Kicker>
        <Grid columns={12}>
          {ICP_BUYERS_NAMED.map((b) => (
            <div
              key={b.name}
              style={{
                gridColumn: 'span 6',
                padding: '14px 16px',
                border: `1px solid ${PAGE_LINE}`,
                background: PAPER,
              }}
            >
              <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 600, color: INK }}>
                {b.name}
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 12, color: MUTED, marginTop: 2 }}>
                {b.title}
              </div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    background: b.appearsOn.includes('Jolen') ? accent : MUTED,
                  }}
                />
                <span style={mono(9, MUTED, 700)}>APPEARS ON · {b.appearsOn.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </Grid>
      </Card>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ▸ 07 — THE CLOSER
   Per-pillar projection · visible footprint · projection caveat
   ────────────────────────────────────────────── */

function CloserBento() {
  const pillar = PILLAR_COLOR[7]
  const pillarColors: Record<string, string> = {
    'Brand Cascade': RUST,
    'GTM Signal Chain': COBALT,
    'Content-to-Pipeline': YELLOW,
    'AI Mirror': HOT,
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Per-pillar projection */}
      <Card>
        <Kicker pillar={pillar}>PER-PILLAR TRAJECTORY · CURRENT → PROJECTED</Kicker>
        <Grid columns={12}>
          {PROJECTED_IMPACT.map((p) => {
            const color = pillarColors[p.label] ?? INK
            return (
              <div
                key={p.label}
                style={{
                  gridColumn: 'span 3',
                  padding: '18px 18px',
                  background: PAPER,
                  border: `1px solid ${PAGE_LINE}`,
                  borderTop: `3px solid ${color}`,
                }}
              >
                <div style={mono(9, MUTED, 700)}>{p.label.toUpperCase()}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
                  <span
                    style={{
                      fontFamily: FONT.mega,
                      fontSize: 40,
                      lineHeight: 0.9,
                      color: MUTED,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {p.current}
                  </span>
                  <span style={mono(11, MUTED, 600)}>→</span>
                  <span
                    style={{
                      fontFamily: FONT.mega,
                      fontSize: 56,
                      lineHeight: 0.9,
                      color,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {p.projected}
                  </span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <span style={mono(10, color, 700)}>
                    + {p.projected - p.current} POINTS
                  </span>
                </div>
              </div>
            )
          })}
        </Grid>
      </Card>

      {/* Composite trajectory */}
      <Card background={PARCHMENT}>
        <Kicker pillar={pillar}>COMPOSITE BUYER TRUST SCORE · QUARTERLY HOLD</Kicker>
        <div style={{ display: 'flex', gap: 18, alignItems: 'baseline', flexWrap: 'wrap', marginTop: 4 }}>
          {[
            { q: 'Q1', v: 32 },
            { q: 'Q2', v: 41 },
            { q: 'Q3', v: 51 },
            { q: 'Q4', v: 58 },
          ].map((step, i, arr) => (
            <div key={step.q} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={mono(11, MUTED, 700)}>{step.q}</span>
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 64,
                  lineHeight: 0.9,
                  color: i === arr.length - 1 ? INK : SOFT_INK,
                  letterSpacing: '-0.01em',
                }}
              >
                {step.v}
              </span>
              {i < arr.length - 1 && <span style={mono(11, MUTED, 600)}>→</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <Body size={13} color={MUTED} maxWidth={760}>
            Three decisions move the score from 32 to 58 and recover 12 to 18 points of
            qualified-stage pipeline. The fourth, treating it as a measurement, is what makes
            the movement repeatable.
          </Body>
        </div>
      </Card>

      {/* 90-day phased build — how the score actually moves */}
      <Card>
        <Kicker pillar={pillar}>THE 90-DAY PROGRAM · HOW 32 BECOMES 58</Kicker>
        <Grid columns={12}>
          {PHASES.map((p) => (
            <div
              key={p.number}
              style={{
                gridColumn: 'span 4',
                padding: '18px 20px',
                background: PAPER,
                border: `1px solid ${PAGE_LINE}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={mono(10, MUTED, 700)}>PHASE {p.number} · {p.weeks.toUpperCase()}</span>
                <span style={{ fontFamily: FONT.body, fontSize: 16, fontWeight: 700, color: INK, lineHeight: 1.3 }}>
                  {p.title}
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <span style={{ width: 4, height: 4, background: pillar, marginTop: 8, display: 'inline-block', flex: '0 0 auto' }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 13, lineHeight: 1.5, color: SOFT_INK }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Grid>
        {/* Program-level deliverable — what the 90 days produces, one chip
            beneath the three phases for symmetric reading */}
        <div
          style={{
            marginTop: 16,
            padding: '14px 18px',
            background: PARCHMENT,
            border: `1px solid ${PAGE_LINE}`,
            display: 'flex',
            alignItems: 'baseline',
            gap: 14,
          }}
        >
          <span style={mono(10, MUTED, 700)}>PROGRAM DELIVERABLE</span>
          <span style={{ fontFamily: FONT.body, fontSize: 14, color: INK, fontWeight: 600 }}>
            → Signal Alignment Roadmap with prioritized action plan, monthly scorecard cadence,
            and CFO-ready ROI framework.
          </span>
        </div>
      </Card>

      {/* Visible footprint */}
      <Card>
        <Kicker pillar={pillar}>WHERE THE HALO LANDS TODAY</Kicker>
        <Body size={14} color={INK} maxWidth={880}>
          {FOOTPRINT_NOTE}
        </Body>
        <ul
          style={{
            margin: '14px 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {VISIBLE_FOOTPRINT.map((f, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <span style={mono(10, MUTED, 700)}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.5, color: INK }}>{f}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Projection caveat */}
      <Card>
        <Kicker pillar={pillar}>PROJECTION CAVEAT</Kicker>
        <Body size={13} color={MUTED}>
          {PROJECTION_CAVEAT}
        </Body>
      </Card>
    </div>
  )
}
