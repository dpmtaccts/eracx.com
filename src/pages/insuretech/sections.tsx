import type { CSSProperties, ReactNode } from 'react'
import { FONT } from './theme'
import { Seismograph } from './Seismograph'
import {
  PLAYERS, LEDGER, CHANNEL_ORDER, COMPILED,
  type Player, type Person, type Channel, type Evidence as Ev, type ToBuild as Tb, type BuildState, type LedgerRow,
} from './data/players'
import { ACTIVITY, CAPTURE_CAVEAT, type LeaderActivity } from './data/activity'
import { formatSectionLabel } from '../../lib/section-label'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const PARCHMENT_DEEP = '#E8E3D6'
const LINE = 'rgba(10,10,10,0.15)'
const MUTED = 'rgba(10,10,10,0.55)'
const HOT = '#E6195F'
const YELLOW = '#F4C430'
const COBALT = '#1845C2'

const mono = (extra?: CSSProperties): CSSProperties => ({ fontFamily: FONT.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', ...extra })

// ---------- primitives ----------
function ToBuildBlock({ tb }: { tb: Tb }) {
  return (
    <div style={{ border: `2px dashed ${HOT}`, background: 'rgba(230,25,95,0.03)', padding: '16px 18px', marginTop: 8 }}>
      <div style={mono({ color: HOT, fontSize: 11 })}>{tb.label}</div>
      <div style={{ fontSize: 15, marginTop: 8, maxWidth: 720 }}>{tb.what}</div>
      {tb.meta && <div style={mono({ color: MUTED, fontSize: 10, letterSpacing: '0.08em', marginTop: 10 })}>{tb.meta}</div>}
    </div>
  )
}

function Evidence({ ev }: { ev: Ev }) {
  return (
    <div style={{ borderLeft: `2px solid ${LINE}`, padding: '4px 0 4px 16px', margin: '6px 0 14px' }}>
      <div style={mono({ color: MUTED, fontSize: 10, letterSpacing: '0.1em' })}>{ev.label}{ev.date ? ` · ${ev.date}` : ''}</div>
      <ul style={{ margin: '8px 0 0 18px' }}>
        {ev.items.map((it, i) => <li key={i} style={{ marginBottom: 5, fontSize: 15 }}>{it}</li>)}
      </ul>
      {ev.note && <div style={{ fontFamily: FONT.mono, fontSize: 10, color: MUTED, marginTop: 8, letterSpacing: '0.02em', textTransform: 'none', lineHeight: 1.5 }}>{ev.note}</div>}
    </div>
  )
}

const STATE_STYLE: Record<BuildState, CSSProperties> = {
  captured: { background: INK, color: PAPER, borderColor: INK },
  processing: { background: COBALT, color: PAPER, borderColor: COBALT },
  pending: { background: PAPER, color: MUTED, borderColor: LINE },
  gated: { background: YELLOW, color: INK, borderColor: INK },
}
const STATE_LABEL: Record<BuildState, string> = { captured: 'Captured', processing: 'Processing', pending: 'Pending', gated: 'Access-gated' }
function StatusChip({ state }: { state: BuildState }) {
  return <span style={{ ...mono({ fontSize: 10, letterSpacing: '0.1em' }), border: '1px solid', padding: '3px 8px', display: 'inline-block', ...STATE_STYLE[state] }}>{STATE_LABEL[state]}</span>
}

// ---------- capture caveat (stays visible wherever engagement appears) ----------
function CaptureCaveat() {
  return (
    <div style={{ border: `1px solid ${INK}`, background: 'rgba(244,196,48,0.16)', padding: '11px 14px', margin: '12px 0' }}>
      <span style={mono({ color: INK, fontSize: 10, letterSpacing: '0.1em' })}>Capture caveat · </span>
      <span style={{ fontSize: 13.5 }}>{CAPTURE_CAVEAT}</span>
    </div>
  )
}

function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div style={{ background: PAPER, padding: '13px 15px' }}>
      <div style={mono({ color: MUTED, fontSize: 9, letterSpacing: '0.1em' })}>{k}</div>
      <div style={{ fontSize: 20, fontFamily: FONT.display, marginTop: 6 }}>{v}</div>
      {sub && <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>{sub}</div>}
    </div>
  )
}
const statGrid: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1, background: LINE, border: `1px solid ${LINE}`, marginTop: 8 }

// Brand social activity, rendered inside the Promise channel.
function BrandActivity({ slug }: { slug: string }) {
  const a = ACTIVITY[slug]
  if (!a) return null
  const { x, instagram: ig } = a
  return (
    <div style={{ marginTop: 14 }}>
      <div style={mono({ color: MUTED, fontSize: 10, letterSpacing: '0.1em' })}>Brand activity · owned social · captured 2026-07-16</div>
      <div style={statGrid}>
        <Stat k={`X · @${x.handle}`} v={`${x.posts} posts`} sub={x.window} />
        <Stat k="X reach, median" v={`${x.medianViews} views`} sub={`${x.medianLikes} likes typical, floor`} />
        <Stat k="Instagram" v={`${ig.posts} posts`} sub={`${ig.medianLikes} likes / ${ig.medianViews} views median`} />
        <Stat k="IG comments captured" v={`${ig.commentsRetrievedTotal}`} sub={`${ig.postsWithZeroComments} posts showed 0`} />
      </div>
      <CaptureCaveat />
    </div>
  )
}

function LeaderRow({ ld }: { ld: LeaderActivity }) {
  const tier: Record<string, string> = { high: COBALT, steady: INK, occasional: MUTED, silent: MUTED }
  return (
    <div style={{ borderTop: `1px solid ${LINE}`, padding: '10px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
        <div>
          <span style={{ fontWeight: 600, fontSize: 15 }}>{ld.name}</span>
          <span style={{ color: MUTED, fontSize: 13 }}> · {ld.company}</span>
        </div>
        <div style={mono({ fontSize: 10, letterSpacing: '0.08em', color: tier[ld.cadence] || MUTED })}>
          {ld.posts} posts · {ld.comments} comments · {ld.cadence}
        </div>
      </div>
      {ld.sample && <div style={{ fontSize: 13, color: MUTED, marginTop: 6, maxWidth: 720 }}>“{ld.sample}…”</div>}
    </div>
  )
}

// LinkedIn leader activity, rendered inside the Executive Voice channel.
function LeaderActivityBlock({ slug }: { slug: string }) {
  const l = ACTIVITY[slug]?.linkedin
  if (!l) return null
  const top = l.leaders.filter((x) => x.posts || x.comments).slice(0, 8)
  return (
    <div style={{ marginTop: 14 }}>
      <div style={mono({ color: MUTED, fontSize: 10, letterSpacing: '0.1em' })}>Leader activity · LinkedIn · last 180 days · captured 2026-07-16</div>
      <div style={statGrid}>
        <Stat k="Leaders posting" v={`${l.posters} / ${l.employeesCaptured}`} sub="of captured employees" />
        <Stat k="Posts" v={`${l.totalPosts}`} sub="180-day window" />
        <Stat k="Comments, floor" v={`${l.totalComments}`} sub="under-counted" />
        <Stat k="External engagers" v={`${l.externalEngagers}`} sub="non-employees captured" />
      </div>
      {top.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={mono({ color: MUTED, fontSize: 9, letterSpacing: '0.1em' })}>Most active, by post and comment volume</div>
          {top.map((ld) => <LeaderRow key={ld.name} ld={ld} />)}
        </div>
      )}
      <CaptureCaveat />
    </div>
  )
}

// Match a report person to a captured LinkedIn leader by normalized name.
const normName = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '')
function findLeader(slug: string, name: string): LeaderActivity | undefined {
  const leaders = ACTIVITY[slug]?.linkedin.leaders
  if (!leaders) return undefined
  const n = normName(name)
  return leaders.find((l) => normName(l.name) === n)
}

// ---------- section frame ----------
function Section({ id, band, children }: { id?: string; band?: boolean; children: ReactNode }) {
  return <section id={id} style={{ padding: '4vw 3vw', borderBottom: `1px solid ${INK}`, background: band ? PARCHMENT : PAPER }}>{children}</section>
}
function SectionHead({ issue, title, lede }: { issue: string; title: string; lede?: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={mono({ color: HOT })}>{issue}</div>
      <h2 style={{ fontFamily: FONT.display, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.05, maxWidth: 900, marginTop: 10 }}>{title}</h2>
      {lede && <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: MUTED, maxWidth: 720, marginTop: 14 }}>{lede}</p>}
    </div>
  )
}

// ---------- masthead + nav ----------
export function TocBar() {
  const links = [
    ['#situation', 'Summary'], ['#ledger', 'Evidence base'], ['#method', 'Method'], ['#rollup', 'Comparison'], ['#trajectory', 'Trajectory'],
    ...PLAYERS.map((p) => [`#${p.slug}`, p.name] as [string, string]),
  ] as [string, string][]
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: INK, color: PAPER, display: 'flex', alignItems: 'center', gap: 4, overflowX: 'auto', padding: '8px 12px' }}>
      <span style={{ ...mono({ fontSize: 11, letterSpacing: '0.1em' }), color: HOT, fontWeight: 700, padding: '6px 10px', whiteSpace: 'nowrap', borderRight: `1px solid rgba(255,255,255,0.2)`, marginRight: 4 }}>● Draft report</span>
      {links.map(([href, label]) => (
        <a key={href} href={href} style={{ ...mono({ fontSize: 11, letterSpacing: '0.08em' }), color: PAPER, textDecoration: 'none', padding: '6px 10px', whiteSpace: 'nowrap', opacity: 0.75 }}>{label}</a>
      ))}
    </nav>
  )
}

export function Masthead() {
  return (
    <header style={{ borderBottom: `3px solid ${INK}`, padding: '3vw 3vw 2vw', background: PAPER }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, flexWrap: 'wrap', borderBottom: `1px solid ${LINE}`, paddingBottom: 12, marginBottom: 24 }}>
        <span style={mono()}>The Buyer View</span>
        <span style={mono({ color: HOT })}>Draft report · scores not yet assigned</span>
      </div>
      <h1 style={{ fontFamily: FONT.mega, fontSize: 'clamp(40px,9vw,132px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>The core platform<br />decision</h1>
      <div style={{ ...mono({ color: HOT }), marginTop: 18 }}>For the insurance CIO evaluating a core replacement</div>
      <p style={{ fontSize: 'clamp(15px,1.5vw,21px)', color: MUTED, maxWidth: 780, marginTop: 12 }}>
        Guidewire, Sapiens, Majesco, and Duck Creek now make the same core claim: an AI-modernized platform. What separates them shows up before the first sales call, on surfaces they do not control. This report assembles those surfaces one vendor at a time, and holds the scoring for a separate judgment pass.
      </p>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginTop: 24 }}>
        <span style={{ ...mono(), color: MUTED }}>Market · P&amp;C and L&amp;A core platforms</span>
        <span style={{ ...mono(), color: MUTED }}>Vendors · Sapiens · Guidewire · Majesco · Duck Creek</span>
        <span style={{ ...mono(), color: MUTED }}>Compiled · {COMPILED}</span>
      </div>
    </header>
  )
}

// ---------- situation (the opening memo) ----------
export function Situation() {
  const para: CSSProperties = { fontSize: 'clamp(15px,1.15vw,17px)', maxWidth: 780, marginBottom: 16, lineHeight: 1.6 }
  const sub: CSSProperties = { ...mono({ color: HOT, fontSize: 11 }), marginBottom: 8, marginTop: 4 }
  return (
    <Section id="situation">
      <SectionHead issue={formatSectionLabel('00', 'Executive summary')} title="The four vendors now sell the same promise." />
      <div style={sub}>The buyer</div>
      <p style={para}>
        The buyer is the CIO or transformation lead at a property and casualty or life insurer replacing a core policy, billing, and claims system. The replacement runs 10 to 15 years and touches underwriting, claims, finance, and every downstream report, so the choice is close to a one-way door. The shortlist is these four. Guidewire, Sapiens, Majesco, and Duck Creek name each other as the alternatives, and the enrichment confirms all four list the other three as competitors.
      </p>
      <div style={sub}>Why the decision is hard</div>
      <p style={para}>
        The four now lead with the same claim, an AI-modernized core. Guidewire shipped ProNavigator, an embedded AI capability, in April 2026. Majesco announced a 2026 increase in AI investment and describes its platform as AI-native. Duck Creek acquired Send Technology, an AI-native vendor, in July 2026. Sapiens frames its platform around AI and automation. When every vendor says the same thing, the claim stops separating them, and the buyer is left to judge which vendor can support the claim it makes.
      </p>
      <div style={sub}>How the decision gets made</div>
      <p style={para}>
        A buyer forms most of a view before the first sales call, from sources the vendor does not control: what the vendor’s executives publish, what named customers report, what analysts and answer engines repeat. These sources are harder to manage than a website, so they expose the distance between what a vendor claims and what it can back up. This report reads those sources for each vendor across six channels.
      </p>
      <div style={sub}>The question none of them answers yet</div>
      <p style={para}>
        None of the four owns the category’s most important question: what measurable change happens after the platform goes live. All four assert value. None routinely publishes verified customer economics, time to change a rate, loss ratio, quote-to-bind conversion, implementation time, the share of decisions augmented by AI. Guidewire comes closest and still talks mostly in potential. The first vendor to make post-go-live economics a consistent, published proof system, rather than an occasional case-study detail, would separate itself from the entire category. That opening is the clearest strategic finding in this assessment.
      </p>
      <div style={sub}>Scope and boundaries</div>
      <p style={para}>
        This report assembles evidence. Two judgments are now set, the transition classification and the leader-brand congruence score. The rest of the scoring is a separate judgment pass, and every open score is left as a labeled block until that pass runs. Keeping assembly and scoring apart lets a reader check the inputs before trusting a number.
      </p>
      <div style={sub}>Coverage and open items</div>
      <p style={{ ...para, marginBottom: 0 }}>
        The brand social activity and the LinkedIn leader activity have landed, and the Promise and Executive Voice channels below now use them. Three gaps remain before scoring. First, the engagement is a floor. Comments hidden behind the "Load more comments" links are not yet captured, and the LinkedIn window stops at 180 days, so every comment and reaction count here understates the real total. Second, the answer-engine exports and the third-party review capture from Glassdoor and G2 are not in. Third, the analyst-coverage check across Gartner, Forrester, Celent, and Datos is not done. The data ledger below tracks each one.
      </p>
    </Section>
  )
}

// ---------- data ledger ----------
export function DataLedger() {
  const cells = [
    { num: '270', label: 'Contact records ingested', note: 'Executive crawl lists across four vendors.' },
    { num: '4', label: 'Company firmographic pulls', note: 'Clay, seven data points each.' },
    { num: '8', label: 'Brand social captures', note: 'X and Instagram per brand.' },
    { num: '32', label: 'LinkedIn leader feeds', note: 'Posts and comments, 180 days. Comments under-counted.' },
    { num: '0', label: 'AEO exports', note: 'Pending import to enrichment/aeo.', pending: true },
  ]
  return (
    <Section id="ledger">
      <SectionHead issue={formatSectionLabel('01', 'Evidence base')} title="The evidence behind this assessment."
        lede="This section counts every observation the assessment rests on. Captured sources are folded into the vendor sections below. Pending and access-gated sources are named, not zeroed, so a reader can weigh the coverage before trusting a verdict." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 1, background: LINE, border: `1px solid ${LINE}` }}>
        {cells.map((c) => (
          <div key={c.label} style={{ background: PAPER, padding: '22px 18px' }}>
            <div style={{ fontFamily: FONT.mega, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 1, color: c.pending ? MUTED : INK }}>{c.num}</div>
            <div style={mono({ color: MUTED, fontSize: 10, letterSpacing: '0.12em', marginTop: 10 })}>{c.label}</div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>{c.note}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 26, borderTop: `1px solid ${LINE}` }}>
        {LEDGER.map((r: LedgerRow, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr 1.2fr', gap: 16, padding: '12px 4px', borderBottom: `1px solid ${LINE}`, alignItems: 'baseline' }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>{r.src}</span>
            <span style={{ fontFamily: FONT.mono, fontSize: 13 }}>{r.count}</span>
            <span><StatusChip state={r.state} /> {r.note && <span style={{ color: MUTED, fontSize: 13 }}> {r.note}</span>}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ---------- method + seismograph ----------
export function Method() {
  return (
    <Section id="method" band>
      <SectionHead issue={formatSectionLabel('02', 'Assessment model')} title="Each vendor is read across six evidence channels."
        lede="The first five channels are the sources a self-directed buyer or an AI agent pulls from before contact. The sixth is the verdict those five produce. The seismograph orders the channels from ambient noise into the most direct and most credible signal, then back out." />
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', paddingTop: 16, marginTop: 18, borderTop: `1px solid ${LINE}` }}>
        <Legend swatch={PARCHMENT_DEEP} label="Ideal congruence" />
        <Legend swatch={COBALT} label="Signal reinforcing" />
        <Legend swatch={HOT} label="Priority break" />
      </div>
      <Seismograph />
      <div style={{ ...mono({ color: MUTED }), marginTop: 20 }}>
        {CHANNEL_ORDER.map((c) => `${c.num} ${c.name}`).join('  ·  ')}
      </div>
    </Section>
  )
}
function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...mono({ fontSize: 10, letterSpacing: '0.12em', color: MUTED }) }}>
      <div style={{ width: 26, height: 14, background: swatch }} />
      <span>{label}</span>
    </div>
  )
}

// ---------- cross-player rollup ----------
export function Rollup() {
  return (
    <Section id="rollup">
      <SectionHead issue={formatSectionLabel('03', 'Vendor comparison')} title="The four vendors across the six channels."
        lede="Channels down the side, vendors across the top. Guidewire is the benchmark cell for P&C core because it is the scale leader the other three are measured against. Nothing is averaged here. Two rows are now set, the transition classification and the leader-brand congruence score. Each remaining cell holds a labeled block until the judgment pass reaches it." />
      <div style={{ overflowX: 'auto', border: `1px solid ${INK}` }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 720 }}>
          <thead>
            <tr>
              <th style={thStyle}>Channel</th>
              {PLAYERS.map((p) => (
                <th key={p.slug} style={thStyle}>{p.name}{p.cells.some((c) => c.benchmark) ? <span style={{ ...mono({ fontSize: 10, letterSpacing: '0.1em' }), color: HOT, marginLeft: 6 }}>Benchmark</span> : null}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHANNEL_ORDER.map((c) => (
              <tr key={c.num}>
                <th style={rowHeadStyle}>{c.num} {c.name}</th>
                {PLAYERS.map((p) => {
                  const cls = c.num === '01' ? p.channels.find((ch) => ch.id === 'promise')?.classification : undefined
                  const score = c.num === '02' ? p.channels.find((ch) => ch.id === 'exec')?.score : undefined
                  if (cls) {
                    const col = cls.bandKey === 'boat-anchor' ? '#DD5C20' : cls.bandKey === 'convergence' ? HOT : COBALT
                    return <td key={p.slug} style={tdStyle}><span style={{ ...mono({ fontSize: 10, letterSpacing: '0.08em' }), color: col, border: `1px solid ${col}`, padding: '6px 8px', display: 'inline-block' }}>{cls.band}</span></td>
                  }
                  if (score) {
                    return <td key={p.slug} style={tdStyle}><span style={{ ...mono({ fontSize: 11, letterSpacing: '0.06em' }), color: INK, border: `1px solid ${INK}`, padding: '6px 8px', display: 'inline-block' }}>{score.value} / {score.max}</span></td>
                  }
                  return <td key={p.slug} style={tdStyle}><span style={{ ...mono({ fontSize: 10, letterSpacing: '0.1em', color: MUTED }), border: `1px dashed ${LINE}`, padding: '6px 8px', display: 'inline-block' }}>To build</span></td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, color: MUTED, marginTop: 18, letterSpacing: '0.02em', lineHeight: 1.5 }}>
        Competitor set confirmed · Clay lists all four naming each other. Sapiens, Guidewire, Duck Creek, and Majesco each carry the other three as competitors, so the comparison grid is the market’s own frame, not one imposed on it.
      </div>
    </Section>
  )
}
const thStyle: CSSProperties = { border: `1px solid ${LINE}`, padding: '14px 16px', textAlign: 'left', verticalAlign: 'top', background: INK, color: PAPER, ...mono({ fontSize: 11, letterSpacing: '0.1em' }) }
const rowHeadStyle: CSSProperties = { border: `1px solid ${LINE}`, padding: '14px 16px', textAlign: 'left', verticalAlign: 'top', fontFamily: FONT.display, fontSize: 14, background: PARCHMENT, width: 210 }
const tdStyle: CSSProperties = { border: `1px solid ${LINE}`, padding: '14px 16px', textAlign: 'left', verticalAlign: 'top' }

// ---------- person card (the per-person layer) ----------
function tenureLabel(start: string | null): string {
  if (!start) return 'tenure unknown'
  const yr = start.slice(0, 4)
  return `since ${yr}`
}
function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
  const empty = value === null || value === undefined || value === ''
  return (
    <div style={{ minWidth: 130 }}>
      <div style={mono({ color: MUTED, fontSize: 9, letterSpacing: '0.1em' })}>{label}</div>
      {empty
        ? <div style={{ ...mono({ color: HOT, fontSize: 9, letterSpacing: '0.08em' }), border: `1px dashed ${HOT}`, padding: '3px 6px', display: 'inline-block', marginTop: 5 }}>To build</div>
        : <div style={{ fontSize: 14, fontWeight: 600, marginTop: 5 }}>{value}</div>}
    </div>
  )
}
function PersonCard({ p, act }: { p: Person; act?: LeaderActivity }) {
  const povLabel = p.povType == null ? null : p.povType === 'original' ? 'Original POV' : p.povType === 'repost' ? 'Reposts only' : 'Silent'
  const cadenceVal = act ? `${act.posts} posts · ${act.comments} comments` : (p.cadence ?? null)
  const followerVal = p.followers ?? act?.followers ?? null
  return (
    <div style={{ border: `1px solid ${LINE}`, padding: '16px 18px', background: PAPER }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: FONT.display, fontSize: 16 }}>{p.name}
            {p.anchor && <span style={{ ...mono({ fontSize: 9, letterSpacing: '0.1em' }), color: COBALT, marginLeft: 10 }}>Watch first</span>}
            {act && <span style={{ ...mono({ fontSize: 9, letterSpacing: '0.1em' }), color: HOT, marginLeft: 8 }}>LinkedIn captured</span>}
          </div>
          <div style={{ fontSize: 14, color: MUTED, marginTop: 3 }}>{p.title}</div>
        </div>
        {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" style={mono({ fontSize: 9, letterSpacing: '0.1em', color: MUTED })}>LinkedIn →</a>}
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 14, paddingTop: 12, borderTop: `1px solid ${LINE}` }}>
        <Field label="Tenure" value={tenureLabel(p.tenureStart)} />
        <Field label="Followers" value={followerVal} />
        <Field label="Cadence, 180d" value={cadenceVal} />
        <Field label="POV vs repost" value={povLabel} />
        <Field label="Audience" value={p.audience ?? null} />
      </div>
      {act?.sample && (
        <div style={{ marginTop: 10 }}>
          <div style={mono({ color: MUTED, fontSize: 9, letterSpacing: '0.1em' })}>Recent post, verbatim</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 5, maxWidth: 720 }}>“{act.sample}…”</div>
        </div>
      )}
      <div style={{ marginTop: 10 }}>
        <div style={mono({ color: MUTED, fontSize: 9, letterSpacing: '0.1em' })}>Analysis</div>
        {p.analysis
          ? <div style={{ fontSize: 14, marginTop: 5, maxWidth: 720 }}>{p.analysis}</div>
          : <div style={{ ...mono({ color: HOT, fontSize: 9, letterSpacing: '0.08em' }), border: `1px dashed ${HOT}`, padding: '3px 6px', display: 'inline-block', marginTop: 5 }}>To build</div>}
      </div>
    </div>
  )
}

// ---------- channel block ----------
function ChannelBlock({ ch, people, slug }: { ch: Channel; people?: Person[]; slug: string }) {
  return (
    <div style={{ borderTop: `1px solid ${INK}`, padding: '22px 0', display: 'grid', gridTemplateColumns: 'minmax(0,220px) 1fr', gap: 28 }}>
      <div>
        <div style={{ fontFamily: FONT.mega, fontSize: 40, lineHeight: 1, color: PARCHMENT_DEEP }}>{ch.num}</div>
        <div style={{ fontFamily: FONT.display, fontSize: 16, marginTop: 6 }}>{ch.name}</div>
        <div style={{ width: 34, height: 6, marginTop: 10, background: ch.tie }} />
      </div>
      <div>
        {ch.body && <p style={{ maxWidth: 760, marginBottom: 12 }}>{ch.body}</p>}
        {ch.score && (
          <div style={{ border: `2px solid ${INK}`, padding: '16px 18px', margin: '4px 0 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
              <div style={mono({ fontSize: 10, letterSpacing: '0.12em', color: MUTED })}>{ch.score.label} · score set</div>
              <div style={{ fontFamily: FONT.mega, fontSize: 44, lineHeight: 1 }}>{ch.score.value}<span style={{ fontSize: 18, color: MUTED }}> / {ch.score.max}</span></div>
            </div>
            <div style={{ fontSize: 14, color: MUTED, marginTop: 8, maxWidth: 760 }}>{ch.score.interpretation}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginTop: 16 }}>
              {ch.score.dims.map((d) => (
                <div key={d.name}>
                  <div style={mono({ fontSize: 9, letterSpacing: '0.08em', color: MUTED })}>{d.name}</div>
                  <div style={{ fontSize: 16, fontFamily: FONT.display, marginTop: 4 }}>{d.points}<span style={{ fontSize: 12, color: MUTED }}> / {d.weight}</span></div>
                  <div style={{ height: 4, background: LINE, marginTop: 6 }}><div style={{ height: 4, background: INK, width: `${Math.round((d.points / d.weight) * 100)}%` }} /></div>
                </div>
              ))}
            </div>
            {ch.temporal && (
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
                  <div style={mono({ fontSize: 10, letterSpacing: '0.1em', color: MUTED })}>Temporal congruence · {ch.temporal.model}</div>
                  <div style={{ fontFamily: FONT.display, fontSize: 20 }}>{ch.temporal.value}<span style={{ fontSize: 12, color: MUTED }}> / {ch.temporal.max}</span></div>
                </div>
                <div style={{ fontSize: 13, color: MUTED, marginTop: 6, maxWidth: 760 }}>Typical brand-to-leader lag: {ch.temporal.lag}. {ch.temporal.note}</div>
              </div>
            )}
          </div>
        )}
        {ch.evidence.map((ev, i) => <Evidence key={i} ev={ev} />)}
        {ch.divergence && (
          <div style={{ background: PARCHMENT, border: `1px solid ${LINE}`, padding: '14px 16px', margin: '10px 0' }}>
            <div style={mono({ color: '#DD5C20', fontSize: 10, letterSpacing: '0.1em' })}>Divergence to preserve</div>
            <div style={{ marginTop: 6 }}>{ch.divergence.text}</div>
          </div>
        )}
        {/* Owned social activity lives in the Promise channel */}
        {ch.id === 'promise' && <BrandActivity slug={slug} />}
        {/* Executive voice channel renders the LinkedIn rollup and the per-person layer */}
        {ch.id === 'exec' && <LeaderActivityBlock slug={slug} />}
        {ch.id === 'exec' && people && people.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12, margin: '12px 0 16px' }}>
            {people.map((p) => <PersonCard key={p.name} p={p} act={findLeader(slug, p.name)} />)}
          </div>
        )}
        {ch.analysis && (
          <div style={{ border: `1px solid ${COBALT}`, background: 'rgba(24,69,194,0.05)', padding: '14px 16px', margin: '12px 0' }}>
            <div style={mono({ color: COBALT, fontSize: 10, letterSpacing: '0.1em' })}>ERA analysis · the read</div>
            <div style={{ marginTop: 8, maxWidth: 760, lineHeight: 1.55 }}>{ch.analysis}</div>
          </div>
        )}
        {ch.classification && (() => {
          const c = ch.classification
          const col = c.bandKey === 'boat-anchor' ? '#DD5C20' : c.bandKey === 'convergence' ? HOT : COBALT
          return (
            <div style={{ border: `2px solid ${col}`, padding: '16px 18px', margin: '12px 0' }}>
              <div style={mono({ color: col, fontSize: 10, letterSpacing: '0.12em' })}>Transition classification · set</div>
              <div style={{ fontFamily: FONT.display, fontSize: 19, marginTop: 8, color: col }}>{c.band}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 8, maxWidth: 760 }}>{c.verdict}</div>
              <div style={{ fontSize: 14, marginTop: 8, maxWidth: 760, lineHeight: 1.55, color: MUTED }}>{c.reasoning}</div>
            </div>
          )
        })()}
        {ch.toBuild.map((tb, i) => <ToBuildBlock key={i} tb={tb} />)}
      </div>
    </div>
  )
}

// ---------- player section ----------
export function PlayerSection({ player }: { player: Player }) {
  const firmo: [string, ReactNode][] = [
    ['Ownership', <>{player.ownership} <small style={{ fontWeight: 400, color: MUTED, fontSize: 13 }}>{player.ownershipNote ? '' : ''}</small></>],
    ['Headcount', <>{player.headcount} <small style={{ fontWeight: 400, color: MUTED, fontSize: 13 }}>{player.growth12mo} 12mo</small></>],
    ['Annual revenue', <>{player.revenue} <small style={{ fontWeight: 400, color: MUTED, fontSize: 13 }}>USD band, Clay</small></>],
    ['Latest funding', <>{player.funding}</>],
    ['HQ', <>{player.hq}</>],
    ['Crawl list', <>{player.crawl} <small style={{ fontWeight: 400, color: MUTED, fontSize: 13 }}>{player.resolved} resolved</small></>],
  ]
  return (
    <Section id={player.slug} band={player.band === 'parchment'}>
      <div style={{ borderTop: `3px solid ${INK}`, paddingTop: 6 }}>
        <div style={mono({ color: HOT })}>{formatSectionLabel(player.section, player.cells.some((c) => c.benchmark) ? 'Vendor · benchmark' : 'Vendor')}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          {player.logo && (
            <img
              src={player.logo}
              alt={`${player.name} logo`}
              width={56}
              height={56}
              loading="lazy"
              style={{ width: 56, height: 56, objectFit: 'contain', display: 'block', background: PAPER, border: `1px solid ${LINE}`, padding: 6 }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <div style={{ fontFamily: FONT.mega, fontSize: 'clamp(34px,6vw,84px)', lineHeight: 0.95, textTransform: 'uppercase' }}>{player.name}</div>
        </div>
      </div>
      {player.ownershipNote && <p style={{ fontSize: 14, color: MUTED, maxWidth: 760, marginTop: 10 }}>{player.ownershipNote}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1, background: LINE, border: `1px solid ${LINE}`, marginTop: 22 }}>
        {firmo.map(([k, v]) => (
          <div key={k} style={{ background: PAPER, padding: 16 }}>
            <div style={mono({ color: MUTED, fontSize: 10, letterSpacing: '0.1em' })}>{k}</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>{v}</div>
          </div>
        ))}
      </div>
      {player.brandReport && (
        <div style={{ border: `1px solid ${LINE}`, background: PARCHMENT, padding: '18px 20px', marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'baseline' }}>
            <div style={mono({ color: MUTED, fontSize: 10, letterSpacing: '0.1em' })}>Prior view · ERA brand report</div>
            <div style={mono({ color: INK, fontSize: 11 })}>Brand Health Index · {player.brandReport.index}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginTop: 14 }}>
            {([['Positioning', player.brandReport.positioning], ['Strength', player.brandReport.strength], ['Risk', player.brandReport.risk]] as [string, string][]).map(([k, v]) => (
              <div key={k}>
                <div style={mono({ color: MUTED, fontSize: 9, letterSpacing: '0.1em' })}>{k}</div>
                <div style={{ fontSize: 14, marginTop: 5, lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: MUTED }}>{player.brandReport.notable} ERA’s own prior view, not independent evidence.</div>
        </div>
      )}
      <div style={{ marginTop: 6 }}>
        {player.cells.map((c) => (
          <span key={c.id} style={{ ...mono({ fontSize: 11, letterSpacing: '0.08em' }), display: 'inline-block', border: `1px solid ${INK}`, padding: '6px 10px', margin: '22px 8px 4px 0', background: c.primary ? INK : PAPER, color: c.primary ? PAPER : INK }}>Cell · {c.label}</span>
        ))}
      </div>
      <div style={{ marginTop: 22 }}>
        {player.channels.map((ch) => <ChannelBlock key={ch.id} ch={ch} slug={player.slug} people={ch.id === 'exec' ? player.people : undefined} />)}
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer style={{ padding: '4vw 3vw', background: INK, color: PAPER, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
      <span style={mono({ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' })}>The Buyer View · A Revenue Signal Instrument by ERA</span>
      <span style={mono({ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' })}>Draft · scores not yet assigned · {COMPILED}</span>
    </footer>
  )
}

export function AllPlayers() {
  return <>{PLAYERS.map((p) => <PlayerSection key={p.slug} player={p} />)}</>
}
