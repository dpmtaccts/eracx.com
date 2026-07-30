import type { CSSProperties, ReactNode } from 'react'
import { FONT } from './theme'
import { Seismograph } from './Seismograph'
import {
  PLAYERS, LEDGER, CHANNEL_ORDER, COMPILED,
  type Player, type Person, type Channel, type Evidence as Ev, type ToBuild as Tb, type BuildState, type LedgerRow,
} from './data/players'
import { ACTIVITY, CAPTURE_CAVEAT, type LeaderActivity } from './data/activity'
import { formatSectionLabel } from '../../lib/section-label'
import { BuyerTruths } from './BuyerTruths'

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
    ['#situation', 'Summary'], ['#buyer', 'The buyer'], ['#ledger', 'Evidence base'], ['#method', 'Method'], ['#rollup', 'Comparison'], ['#trajectory', 'Congruence'],
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
        <span style={mono({ color: HOT })}>Draft report · three channels set, three open</span>
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

// ---------- the buyer (buyer intelligence layer) ----------
function Conf({ level }: { level: string }) {
  const col = level.startsWith('supported') || level.startsWith('directionally') ? COBALT
    : level.startsWith('plausible') ? MUTED
    : '#DD5C20'
  return <span style={{ ...mono({ fontSize: 9, letterSpacing: '0.1em' }), color: col, border: `1px solid ${col}`, padding: '2px 7px', display: 'inline-block' }}>{level}</span>
}

const BUYER_COMMITTEE: { role: string; concern: string; influence: string; note: string; flag?: boolean }[] = [
  { role: 'CIO / CTO', concern: 'Architecture, delivery risk', influence: 'Executive sponsor', note: 'Fragments into divisional and regional CIOs at large carriers. Reinsurance is underwriting-led.' },
  { role: 'COO / operations', concern: 'Operational continuity', influence: 'Business sponsor', note: 'Heaviest load in workers’ comp claims.' },
  { role: 'CFO, and the board above', concern: 'Cost, capital, return', influence: 'Economic approval', note: 'The board gates transformation-scale spend. Mutuals and state funds answer to policyholders, not shareholders.' },
  { role: 'Underwriting, claims, actuarial', concern: 'Workflow and product fit', influence: 'Functional authority', note: 'Actuarial and reinsurance carry weight the generic model omits, heaviest in life, annuity, reinsurance.' },
  { role: 'CISO', concern: 'Security, third-party risk', influence: 'Veto authority', note: 'Distinct from the regulatory seat.' },
  { role: 'Regulatory / compliance', concern: 'AI governance, market conduct', influence: 'Veto or delay', note: 'A seat the cross-industry model omits. NAIC AI bulletin (25 states plus DC), Colorado SB21-169, NY DFS Circular Letter 7.', flag: true },
  { role: 'Procurement / legal', concern: 'Terms, pricing, risk', influence: 'Commercial approval', note: 'Leverage raised by the eight-figure, board-approved profile.' },
  { role: 'Systems integrator', concern: 'Migration feasibility', influence: 'Shortlist-shaping', note: 'Often shapes the shortlist before the carrier speaks to a vendor. A known Sapiens gap versus Guidewire’s bench.', flag: true },
]

const BUYER_VENDORS: { name: string; color: string; finding: string; reaches: string; tension: string; conf: string }[] = [
  { name: 'Guidewire', color: INK,
    finding: 'Best fit to the buyer’s need for external proof, weakest on the burden fear.',
    reaches: 'Both buyers, anchored on the larger P&C carrier, because its proof is what the buyer validates against.',
    tension: 'The one persistent perception is powerful but heavy, expensive, and slow to implement, the exact fear the overloaded buyer carries.',
    conf: 'supported' },
  { name: 'Duck Creek', color: '#DD5C20',
    finding: 'Momentum and analyst standing, with the buyer’s delivery-risk fear sitting inside the vendor.',
    reaches: 'The P&C carrier evaluating an AI-native step, strongest momentum in the set after the Send acquisition.',
    tension: 'Employee brand health is the most acute vulnerability and surfaces as delivery-quality risk. A SaaS Gartner rating of 3.2 against Guidewire’s 4.6.',
    conf: 'directionally supported' },
  { name: 'Majesco', color: HOT,
    finding: 'The widest cloud-native span and the loudest claim, with proof still catching up.',
    reaches: 'The aggressive mid-to-large carrier attracted to span and momentum.',
    tension: 'A weak employer brand that reaches delivery, and a claim running ahead of its named proof, which the proof-hungry buyer discounts.',
    conf: 'directionally supported' },
  { name: 'Sapiens', color: COBALT,
    finding: 'The product fits the proven buyer, the voice serves the aspirational buyer, and the reach lands internal.',
    reaches: 'Neither buyer, on the observed evidence. The installed base is mid-market and mutual, but the broadcast reaches its own building.',
    tension: 'One named customer win across 211 posts. People-news averages 172 reactions, the product and AI narrative averages 23 and under 2 comments.',
    conf: 'directionally supported (bounded)' },
]

const SAPIENS_OWN: { title: string; body: string }[] = [
  { title: 'Modernization without overwhelming the organization', body: 'For the proven mid-market and mutual buyer. The proof is the internal staffing required, the implementation timeline, the migration approach, the vendor-managed burden, and time to first value, not another feature list.' },
  { title: 'Confidence to move, not fear of change', body: 'Prove that similar insurers did it and lived, that delivery can be staged and continuity protected, that value shows before the full transformation completes, and that Sapiens carries a real share of the operational burden.' },
  { title: 'Insurance-specific peer proof', body: 'Evidence organized by carrier type, business problem, solution purchased, buyer role, and quantified outcome, so a buyer immediately finds someone like us who solved the problem we have.' },
]
const SAPIENS_ACTIONS: string[] = [
  'Separate the two growth motions: distinct buyer, message, proof, and channel for the proven buyer and the aspirational buyer.',
  'Map the full committee per deal type: champion, economic buyer, functional authorities, technical validators, veto holders, and outside influencers.',
  'Build a peer-proof system organized by carrier type, problem, role, and quantified outcome.',
  'Lead with implementation confidence: publish realistic resources, migration paths, timelines, and time to value.',
  'Make committee-ready materials: separate proof for the CFO, COO, CIO, CISO, functional leaders, and board.',
  'Address inertia directly with an independently validated cost-of-waiting, not the vendor-authored figure.',
  'Strengthen SI influence where integrators shape target-carrier shortlists.',
  'Earn the enterprise AI story: treat the larger-carrier position as an ambition until named, at-scale production proof exists.',
]

export function TheBuyer() {
  const para: CSSProperties = { fontSize: 'clamp(15px,1.15vw,17px)', maxWidth: 800, marginBottom: 16, lineHeight: 1.6 }
  const sub: CSSProperties = { ...mono({ color: HOT, fontSize: 11 }), marginBottom: 10, marginTop: 30 }
  const th: CSSProperties = { ...mono({ fontSize: 10, letterSpacing: '0.1em' }), background: INK, color: PAPER, textAlign: 'left', padding: '11px 14px', border: `1px solid ${LINE}` }
  const td: CSSProperties = { padding: '11px 14px', border: `1px solid ${LINE}`, verticalAlign: 'top', fontSize: 14 }
  const band = (title: string, color: string, items: string[]) => (
    <div style={{ border: `1px solid ${LINE}`, borderTop: `4px solid ${color}`, background: PAPER, padding: '16px 18px' }}>
      <div style={mono({ color, fontSize: 11 })}>{title}</div>
      <ul style={{ margin: '12px 0 0 16px', padding: 0 }}>
        {items.map((it, i) => <li key={i} style={{ fontSize: 14, marginBottom: 9, lineHeight: 1.5 }}>{it}</li>)}
      </ul>
    </div>
  )
  return (
    <Section id="buyer">
      <SectionHead issue={formatSectionLabel('01', 'The buyer')} title="The buyer is not a committee. It is a system in motion."
        lede="A temporary coalition is basic knowledge; every large purchase, an SI-shaped one most of all, has one. The sharper truth is that the coalition is a system that reshapes itself across a multi-year transformation, driven by the five forces below. Who holds the power, where the budget sits, and which fear dominates all shift over weeks, months, and years. Against that motion, the one thing a vendor controls is whether its narrative holds, consistent, present, and free of contradiction, a fixed point of certainty in a decision defined by risk. Confidence is graded; vendor-authored figures are flagged." />

      <div style={{ borderTop: `3px solid ${INK}`, borderBottom: `1px solid ${INK}`, padding: '14px 0', margin: '6px 0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={mono({ color: HOT })}>Part one · The buyer system</div>
          <div style={{ fontFamily: FONT.display, fontSize: 'clamp(18px,2vw,26px)', marginTop: 6 }}>What shapes the buyer, day to day</div>
        </div>
        <div style={{ fontSize: 13, color: MUTED, maxWidth: 440 }}>The research. Not a committee of leaders, but a system that evolves over time under five forces.</div>
      </div>

      <div style={{ marginBottom: 20 }}><BuyerTruths /></div>

      <div style={sub}>The caricature</div>
      <p style={para}>
        The proven buyer is a technology or operations leader at a mid-market or mutual carrier. Not shopping, but managing a legacy core that eats most of the budget with a team too small for the ambition on the plate. The board has read the modernization headline, so the pressure comes from above. The people who know the legacy system are retiring, and the cloud, data, and AI roles to replace them are unfilled. The inbox is a wall of vendors all saying the same three letters, so the buyer hears noise where the vendor intends signal.
      </p>
      <p style={para}>
        Who does this person believe. Not the advertisement, and not the AI answer that lists ten vendors. They believe the other carrier leader who already did this and lived, the analyst report the board respects, and the reference they can call. The whole decision reduces to one instinct: who like me has done this, and can I talk to them. <Conf level="directionally supported" />
      </p>

      <div style={sub}>Two buyers, tagged</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
        <div style={{ border: `2px solid ${INK}`, padding: '16px 18px' }}>
          <div style={{ fontFamily: FONT.display, fontSize: 19 }}>The proven buyer</div>
          <div style={{ ...mono({ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }), margin: '6px 0 10px' }}>Who signs</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>The mid-market and mutual technology, operations, or finance leader. Pragmatic, SaaS-favoring, builds the data foundation first, reference-driven, allergic to hype. For Sapiens this is who the installed base shows it winning. <Conf level="supported" /></p>
        </div>
        <div style={{ border: `2px solid ${LINE}`, padding: '16px 18px' }}>
          <div style={{ fontFamily: FONT.display, fontSize: 19 }}>The aspirational buyer</div>
          <div style={{ ...mono({ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }), margin: '6px 0 10px' }}>Who the brand chases</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>The larger carrier’s transformation office chasing AI at scale with a bigger team and budget. Who the agentic-AI brand is aimed at, and a stretch for current proof. Inferred from positioning, not won deals. <Conf level="plausible but unmeasured" /></p>
        </div>
      </div>

      <div style={sub}>The buying committee, insurance-specific</div>
      <p style={{ ...para, marginBottom: 14 }}>
        The cross-industry model is the starting point. Two corrections change strategy, marked below: the systems integrator is a shortlist-maker, not an informal influence, and regulatory and compliance is a full veto seat the generic model does not carry.
      </p>
      <div style={{ overflowX: 'auto', border: `1px solid ${LINE}` }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 680 }}>
          <thead><tr><th style={th}>Role</th><th style={th}>Concern</th><th style={th}>Influence</th><th style={th}>Insurance-specific note</th></tr></thead>
          <tbody>
            {BUYER_COMMITTEE.map((r) => (
              <tr key={r.role} style={r.flag ? { background: 'rgba(244,196,48,0.18)' } : undefined}>
                <th style={{ ...td, fontFamily: FONT.display, fontSize: 14.5, fontWeight: 400, background: r.flag ? 'transparent' : PARCHMENT, borderLeft: r.flag ? `3px solid ${YELLOW}` : `1px solid ${LINE}` }}>{r.role}</th>
                <td style={td}>{r.concern}</td>
                <td style={{ ...td, ...(r.flag ? mono({ fontSize: 10, letterSpacing: '0.06em', color: INK }) : {}) }}>{r.influence}</td>
                <td style={{ ...td, color: MUTED }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 13, color: MUTED, marginTop: 10, maxWidth: 800 }}>
        Committee size holds for insurance as a large, cross-functional, conflict-prone group. A published insurance-specific headcount to rival the general benchmark of 13 internal plus 9 external was not found, so the exact number is held unknown, not imported.
      </p>

      {/* PART TWO — the unfair advantage (the hinge from research to results) */}
      <div style={{ background: INK, color: PAPER, padding: '30px 30px', margin: '30px 0 24px' }}>
        <div style={mono({ fontSize: 11, letterSpacing: '0.14em', color: YELLOW })}>Part two · The unfair advantage</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0, 300px)', gap: 30, alignItems: 'center', marginTop: 14 }}>
          <div>
            <div style={{ fontFamily: FONT.display, fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.08, maxWidth: 720 }}>The system erodes every claim. Consistency is the only thing that survives it.</div>
            <p style={{ fontSize: 'clamp(14px,1.15vw,17px)', color: 'rgba(255,255,255,0.72)', marginTop: 14, maxWidth: 640, lineHeight: 1.6 }}>
              Membership shifts, the budget tightens, the team turns over, inertia pulls back, and the claim decays. A vendor controls none of it. It controls one thing: whether, from the first anonymous search to the board vote years later, the buyer meets the same conviction, the same proof, and no contradiction. The category leader’s edge is not a bigger promise. It is confidence without over-promise, stability, presence, and no contradiction, held steady while everything else moves. That consistency is the unfair advantage, and it is what the Buyer View measures.
            </p>
            <div style={{ ...mono({ fontSize: 10, letterSpacing: '0.1em', color: YELLOW }), marginTop: 16, border: '1px solid rgba(244,196,48,0.45)', padding: '8px 12px', display: 'inline-block' }}>Today, Guidewire comes closest to holding it. See part three.</div>
          </div>
          <svg viewBox="0 0 300 150" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <path d="M16 40 C 120 46, 200 112, 284 120" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
            <path d="M16 56 C 120 62, 200 120, 284 128" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path d="M16 72 C 120 78, 200 112, 284 118" fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="1.5" />
            <path d="M16 88 C 120 94, 200 124, 284 132" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" />
            <path d="M16 102 C 120 106, 200 118, 284 124" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
            <line x1="16" y1="66" x2="284" y2="66" stroke="#F4C430" strokeWidth="2.5" />
            <circle cx="284" cy="66" r="3" fill="#F4C430" />
            <text x="282" y="59" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#F4C430">THE BRAND HOLDS</text>
            <text x="16" y="144" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.5)">FIVE FORCES DECAY OVER TIME</text>
          </svg>
        </div>
      </div>

      {/* PART THREE — how each brand shows up (the results) */}
      <div style={{ borderTop: `3px solid ${INK}`, borderBottom: `1px solid ${INK}`, padding: '14px 0', margin: '10px 0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={mono({ color: HOT })}>Part three · The Buyer View</div>
          <div style={{ fontFamily: FONT.display, fontSize: 'clamp(18px,2vw,26px)', marginTop: 6 }}>How each brand shows up through the consistency lens</div>
        </div>
        <div style={{ fontSize: 13, color: MUTED, maxWidth: 440 }}>The results. Read each vendor for whether it holds the constant or erodes with the system. The vendors separate on proof and reach, not on premium band.</div>
      </div>

      <div style={{ border: `1px solid ${LINE}`, background: PARCHMENT, padding: '18px 20px 12px', marginBottom: 16 }}>
        <div style={mono({ fontSize: 10, letterSpacing: '0.1em', color: MUTED, marginBottom: 4 })}>Where each brand sits today</div>
        <svg viewBox="0 0 900 130" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <line x1="60" y1="78" x2="836" y2="78" stroke={INK} strokeWidth="1.5" />
          <path d="M840 78 l -9 -4.5 l 0 9 z" fill={INK} />
          <text x="60" y="112" fontFamily="JetBrains Mono, monospace" fontSize="12" fill={MUTED} letterSpacing="1">OVER-PROMISE</text>
          <text x="836" y="112" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="12" fill={INK} letterSpacing="1">CONSISTENCY AND PROOF</text>
          {[
            { x: 292, c: HOT, n: 'Majesco', up: false },
            { x: 378, c: COBALT, n: 'Sapiens', up: true },
            { x: 560, c: '#DD5C20', n: 'Duck Creek', up: false },
            { x: 812, c: INK, n: 'Guidewire', up: true },
          ].map((v) => (
            <g key={v.n}>
              <line x1={v.x} y1={78} x2={v.x} y2={v.up ? 50 : 100} stroke={v.c} strokeWidth="1" />
              <circle cx={v.x} cy={78} r="7" fill={v.c} />
              <text x={v.x} y={v.up ? 44 : 116} textAnchor="middle" fontFamily={FONT.display} fontSize="17" fill={v.c}>{v.n}</text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {BUYER_VENDORS.map((v) => (
          <div key={v.name} style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${v.color}`, padding: '15px 18px', background: PAPER }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: FONT.display, fontSize: 20, color: v.color }}>{v.name}</div>
              <Conf level={v.conf} />
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 600, marginTop: 8, maxWidth: 820 }}>{v.finding}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 12 }}>
              <div><span style={mono({ fontSize: 9, letterSpacing: '0.1em', color: MUTED })}>Reaches</span><div style={{ fontSize: 14, marginTop: 4, lineHeight: 1.45 }}>{v.reaches}</div></div>
              <div><span style={mono({ fontSize: 9, letterSpacing: '0.1em', color: MUTED })}>Tension</span><div style={{ fontSize: 14, marginTop: 4, lineHeight: 1.45 }}>{v.tension}</div></div>
            </div>
          </div>
        ))}
      </div>

      <div style={sub}>What our research validates, builds on, or contradicts</div>
      <p style={{ ...para, marginBottom: 14 }}>
        Against the all-up Buyer View, the 2026 B2B Buyer myth-versus-fact evidence base of more than 35,000 buyers across nine studies.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        {band('Validates', COBALT, [
          'The buyer is a conflicted committee, not a person (Myth 4 holds).',
          'Proof must be external and validatable, confirmed vendor-side by the Sapiens capture, whose own broadcast is claim-heavy and does not reach buyers.',
          'The favorite is chosen before deep vendor engagement (Myth 2, first half).',
        ])}
        {band('Builds on', YELLOW, [
          'Analyst reports invert in insurance. The general research shows analyst usage at an all-time low of 14 percent; in insurance core selection the Gartner MQ, Celent, and Datos evaluations are among the highest-weight trust instruments.',
          'The systems integrator is a shortlist-making seat the general model omits.',
          'Two buyers, not one undifferentiated buyer.',
          'A regulatory and compliance veto seat, insurance-specific.',
        ])}
        {band('Contradicts or cannot confirm', '#DD5C20', [
          'The journey is a stage-gated RFP and POC funnel, not the nonlinear loop the general research describes (breaks).',
          'The buyer skews older, not younger; carrier leadership is Gen X and older (breaks).',
          'Self-service does not describe an eight-figure, board-approved core replacement (not imported).',
          'AI in the buying process is unproven for insurance and was not transferred.',
        ])}
      </div>

      <div style={sub}>What Sapiens can own</div>
      <div style={{ background: PARCHMENT, border: `1px solid ${INK}`, padding: '20px 22px' }}>
        <p style={{ fontSize: 'clamp(15px,1.2vw,18px)', maxWidth: 830, margin: 0, lineHeight: 1.55 }}>
          The category is short on capacity, confidence, and internal agreement, not ambition. The opening is not to be the loudest company on AI. It is to become the company that makes a complicated modernization decision feel achievable, defensible, and provable to the entire buying committee.
        </p>
        <div style={{ ...mono({ fontSize: 9, letterSpacing: '0.1em', color: MUTED }), border: `1px solid ${LINE}`, padding: '3px 8px', display: 'inline-block', marginTop: 12 }}>Recommendation · validate against Sapiens pipeline and win-loss</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 18 }}>
          {SAPIENS_OWN.map((t) => (
            <div key={t.title} style={{ background: PAPER, border: `1px solid ${LINE}`, padding: '14px 16px' }}>
              <div style={{ fontFamily: FONT.display, fontSize: 16, lineHeight: 1.15 }}>{t.title}</div>
              <div style={{ fontSize: 13.5, color: MUTED, marginTop: 8, lineHeight: 1.5 }}>{t.body}</div>
            </div>
          ))}
        </div>

        <div style={{ ...mono({ color: HOT, fontSize: 10 }), marginTop: 22, marginBottom: 12 }}>Recommended actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px 28px' }}>
          {SAPIENS_ACTIONS.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 9, alignItems: 'baseline' }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 11, fontWeight: 700, color: HOT }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.45 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12.5, color: MUTED, marginTop: 22, maxWidth: 900, lineHeight: 1.55 }}>
Reasoned from the insurance buyer research synthesis and its strategic readout, the buyer-intelligence layer (a roster of 277 carrier executives, the pressure map, and the divergence table), the six-channel vendor assessment, and the first-party Sapiens observed capture, disclosed as first-party and point-in-time. The Sapiens reach finding is bounded: commenter identity in the capture is name-only, so 16 of 628 unique commenters were resolvable, and the call rests on comment content and engagement pattern rather than resolved titles. Vendor-authored figures, including the premium-band tiering, are flagged and held insufficiently supported.
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
      <SectionHead issue={formatSectionLabel('02', 'Evidence base')} title="The evidence behind this assessment."
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
      <SectionHead issue={formatSectionLabel('03', 'Assessment model')} title="Each vendor is read across six evidence channels."
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
      <SectionHead issue={formatSectionLabel('04', 'Vendor comparison')} title="The four vendors across the six channels."
        lede="Channels down the side, vendors across the top. Guidewire is the benchmark cell for P&C core because it is the scale leader the other three are measured against. Nothing is averaged here. Three rows are now set, the transition classification, the leader-brand congruence score, and the verdict. Each remaining cell holds a labeled block until the judgment pass reaches it." />
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
                  const verdict = c.num === '06' ? p.channels.find((ch) => ch.id === 'verdict')?.verdictCall : undefined
                  if (cls) {
                    const col = cls.bandKey === 'boat-anchor' ? '#DD5C20' : cls.bandKey === 'convergence' ? HOT : COBALT
                    return <td key={p.slug} style={tdStyle}><span style={{ ...mono({ fontSize: 10, letterSpacing: '0.08em' }), color: col, border: `1px solid ${col}`, padding: '6px 8px', display: 'inline-block' }}>{cls.band}</span></td>
                  }
                  if (score) {
                    return <td key={p.slug} style={tdStyle}><span style={{ ...mono({ fontSize: 11, letterSpacing: '0.06em' }), color: INK, border: `1px solid ${INK}`, padding: '6px 8px', display: 'inline-block' }}>{score.value} / {score.max}</span></td>
                  }
                  if (verdict) {
                    return <td key={p.slug} style={tdStyle}><span style={{ ...mono({ fontSize: 10, letterSpacing: '0.06em' }), color: PAPER, background: INK, padding: '6px 8px', display: 'inline-block', lineHeight: 1.35 }}>{verdict.stance}</span></td>
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
        {ch.verdictCall && (() => {
          const vc = ch.verdictCall
          return (
            <div style={{ border: `3px solid ${INK}`, padding: '20px 22px', margin: '4px 0 12px' }}>
              <div style={mono({ fontSize: 10, letterSpacing: '0.12em', color: MUTED })}>The call · set</div>
              <div style={{ fontFamily: FONT.mega, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.02, marginTop: 8 }}>{vc.stance}</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 12, maxWidth: 780, lineHeight: 1.4 }}>{vc.call}</div>
              <div style={{ fontSize: 14, marginTop: 10, maxWidth: 780, lineHeight: 1.55, color: MUTED }}>{vc.rationale}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
                <div>
                  <div style={mono({ fontSize: 9, letterSpacing: '0.1em', color: COBALT })}>Shortlist when</div>
                  <div style={{ fontSize: 14, marginTop: 5, lineHeight: 1.45 }}>{vc.shortlistWhen}</div>
                </div>
                <div>
                  <div style={mono({ fontSize: 9, letterSpacing: '0.1em', color: '#DD5C20' })}>Reconsider when</div>
                  <div style={{ fontSize: 14, marginTop: 5, lineHeight: 1.45 }}>{vc.reconsiderWhen}</div>
                </div>
              </div>
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
      <span style={mono({ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' })}>Draft · three channels set, three open · {COMPILED}</span>
    </footer>
  )
}

export function AllPlayers() {
  return <>{PLAYERS.map((p) => <PlayerSection key={p.slug} player={p} />)}</>
}
