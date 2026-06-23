/* ──────────────────────────────────────────────────────────────────────────
   Riiser — public sample audit data.

   Riiser is a COMPOSITE, FICTIONAL brand. Nothing here is real: every brand,
   person, score, quote, competitor, and number is invented to demonstrate the
   Buyer View audit format. This file mirrors the schema of the real BetterUp
   insight-list data (src/pages/betterup/insights/data.ts + data/moments.ts)
   but contains ZERO BetterUp-specific values.

   Narrative blocks drafted in Riiser's voice are marked // DRAFT for review.
   ────────────────────────────────────────────────────────────────────────── */

import type { ChannelId, Moment } from '../pages/betterup/data/moments'

/* ── Brand + scale ───────────────────────────────────────────────────────── */

export const RIISER = {
  name: 'Riiser',
  wordmark: 'RIISER',
  domain: 'riiser.co',
  category: 'Employee coaching and development platform',
  promise: 'help every employee rise',
  reportDate: 'June 2026',
  buyerTrust: 41,
  buyerTrustMax: 100,
  shortListThreshold: 65,
} as const

/* Scale-of-the-evidence stats for the sticky strip. Invented for the sample. */
export const SCALE_STATS = [
  { label: 'Moments', value: '198', sub: 'captured' },
  { label: 'Channels', value: '11', sub: 'surfaces' },
  { label: 'Voices', value: '18', sub: 'analyzed' },
  { label: 'Window', value: '90', sub: 'days' },
] as const

/* ── Cast (all fictional; initials avatars, portrait slot empty for now) ──── */

export const CAST = {
  cpo: { name: 'Priya Ramaswamy', initials: 'PR', title: 'Chief People Officer, Riiser', portrait: undefined as string | undefined },
  ceo: { name: 'Daniel Mercer', initials: 'DM', title: 'CEO, Riiser', portrait: undefined as string | undefined },
  cco: { name: 'Lena Ortiz', initials: 'LO', title: 'Chief Customer Officer, Riiser', portrait: undefined as string | undefined },
  critic: { name: 'Jordan Avery', initials: 'JA', title: 'Former Riiser people team', portrait: undefined as string | undefined },
} as const

/* Named buyers already in the field. Fictional people at fictional companies. */
export const NAMED_BUYERS: ReadonlyArray<{ name: string; title: string; appearsOn: string }> = [
  { name: 'Amara Osei', title: 'VP People, Northwind Logistics', appearsOn: 'LinkedIn · Reviews' },
  { name: 'Devin Walsh', title: 'Chief People Officer, Carrow Health', appearsOn: 'AI Agents' },
  { name: 'Sofia Ramos', title: 'Head of L&D, Brightline Retail', appearsOn: 'Communities' },
  { name: 'Marcus Wen', title: 'VP Talent, Hartfield Industrial', appearsOn: 'LinkedIn' },
  { name: 'Priyanka Nair', title: 'CHRO, Vela Software', appearsOn: 'Reviews · AI Agents' },
  { name: 'Tom Becker', title: 'People Operations Lead, Quorum Bank', appearsOn: 'Communities' },
  { name: 'Elena Voss', title: 'VP HR, Sundial Manufacturing', appearsOn: 'AI Agents' },
  { name: 'Hannah Cole', title: 'Director, Talent Development, Pinecrest Care', appearsOn: 'LinkedIn · Reviews' },
]

/* ── Reconstructed surface artifacts (Riiser fiction) ─────────────────────── */

/* AI agents — answer engine "Atlas" (fictional engine, no real logo). */
export const RIISER_ATLAS = {
  q1: {
    question: 'What are the best platforms for employee coaching and development?',
    // DRAFT
    answer:
      'The platforms most often cited as leaders are Vantage and Meridian, noted for breadth and enterprise adoption. A handful of smaller alternatives follow.',
    leaders: ['Vantage', 'Meridian'],
    pills: ['vantage.com', 'g2.com', 'analyst note'],
  },
  q2: {
    question: 'How does Riiser compare?',
    // DRAFT
    answer:
      'Riiser is a smaller, newer entrant in the category. Its public reviews average 2.8 out of 5, and it is cited less often than the established leaders.',
    pills: ['glassdoor.com', 'g2.com', 'riiser.co'],
  },
} as const

/* LinkedIn personal — the CPO post and the insider reply. */
export const RIISER_LINKEDIN = {
  author: CAST.cpo,
  meta: '2d',
  // DRAFT
  post:
    'Culture is not a perk you bolt on. It is the operating system everything runs on. When we say we help every employee rise, we mean it.',
  reactionsLead: 'Marcus Wen and 1,246 others',
  comments: '118 comments',
  topComment: {
    author: CAST.critic,
    likes: 64,
    // DRAFT
    body:
      'Three years on the people team here. Would love to see this reflected on the inside. The sentiment on the ground tells a different story right now.',
  },
} as const

/* Reviews — Glassdoor card. */
export const RIISER_GLASSDOOR = {
  company: RIISER.name,
  rating: 2.8,
  filledStars: 3,
  emptyStars: 2,
  reviewCount: '1,204 reviews',
  recommendPct: '41%',
  recommendLabel: 'Recommend to a friend',
  // DRAFT
  quoteTitle: '"Great mission, hard reality"',
  quoteBody:
    'Current Employee · 2+ years: leadership says one thing externally, another internally.',
} as const

/* Communities — Reddit-style thread. */
export const RIISER_REDDIT = {
  sub: 'r/humanresources',
  asker: 'u/quiet_hr_lead',
  askerAge: '14h',
  // DRAFT
  title: 'Anyone using Riiser? Considering it vs Vantage for ~800 employees',
  reply: {
    handle: 'u/two_years_in',
    age: '8h',
    // DRAFT — top reply points to Vantage, says read the Glassdoor first
    bodyLead: 'Read their ',
    glassdoorWord: 'Glassdoor',
    bodyMid: ' before you commit. Honestly ',
    rivalWord: 'Vantage',
    bodyEnd: "'s reporting is stronger if you need exec buy-in.",
    upvotes: '▲ 31',
  },
} as const

/* Content — alignment read for the content move (no real screenshots). */
export const RIISER_CONTENT = {
  // DRAFT
  headline: 'Seven of eight content themes land with people who already believe Riiser.',
  averageScore: 31,
  categories: [
    { label: 'Manager enablement', score: 64 },
    { label: 'Coaching outcomes', score: 28 },
    { label: 'Product / platform', score: 58 },
    { label: 'Culture / values', score: 22 },
    { label: 'Research / data', score: 35 },
    { label: 'Customer stories', score: 26 },
    { label: 'Hiring / employer brand', score: 18 },
    { label: 'Pricing / buying', score: 12 },
  ],
} as const

/* Closer — per-pillar trajectory and the quarterly composite hold. */
export const RIISER_TRAJECTORY = {
  composite: [
    { q: 'Now', score: 41 },
    { q: 'Q2', score: 48 },
    { q: 'Q3', score: 55 },
    { q: 'Q4', score: 61 },
  ],
  pillars: [
    { label: 'Leaders', current: 26, projected: 58 },
    { label: 'Agents', current: 34, projected: 60 },
    { label: 'Content', current: 31, projected: 54 },
    { label: 'Employees', current: 19, projected: 47 },
  ],
} as const

/* ── Seismograph moments (Riiser) ────────────────────────────────────────────
   Reuses the real seismograph's channel geometry (11 canonical channels) by
   generating bars on the same deterministic seed and channel positions, then
   attaching Riiser priority detail. Priority breaks (magenta, pointing down,
   in the credible core) land at AI AGENTS and REVIEWS; the single LinkedIn
   priority is the insider reply. Reinforcing bars dominate LinkedIn, Owned,
   and Company; Communities and Twitter/X carry shallow contradictions; Ads,
   Sponsored, Instagram, and Third-party stay ambient.
   ──────────────────────────────────────────────────────────────────────── */

type GenParams = {
  id: ChannelId
  center: number
  spread: number
  count: number
  magnitudeRange: [number, number]
  contradictionRate: number
}

// Channel geometry copied from the seismograph so generated bars sit inside the
// hardcoded channel zones. This is layout math, not BetterUp data.
const GEN: readonly GenParams[] = [
  { id: 'ads', center: 175, spread: 52, count: 28, magnitudeRange: [1, 3], contradictionRate: 0.2 },
  { id: 'sponsored', center: 305, spread: 52, count: 24, magnitudeRange: [2, 4], contradictionRate: 0.22 },
  { id: 'owned', center: 435, spread: 52, count: 22, magnitudeRange: [3, 6], contradictionRate: 0.3 },
  { id: 'linkedin', center: 590, spread: 52, count: 20, magnitudeRange: [5, 12], contradictionRate: 0.2 },
  { id: 'agents', center: 745, spread: 50, count: 16, magnitudeRange: [8, 14], contradictionRate: 0.7 },
  { id: 'reviews', center: 880, spread: 52, count: 18, magnitudeRange: [9, 14], contradictionRate: 0.8 },
  { id: 'company', center: 1015, spread: 50, count: 22, magnitudeRange: [3, 6], contradictionRate: 0.3 },
  { id: 'instagram', center: 1135, spread: 48, count: 16, magnitudeRange: [2, 4], contradictionRate: 0.25 },
  { id: 'twitter', center: 1255, spread: 48, count: 20, magnitudeRange: [2, 5], contradictionRate: 0.35 },
  { id: 'communities', center: 1370, spread: 48, count: 22, magnitudeRange: [3, 7], contradictionRate: 0.45 },
  { id: 'thirdparty', center: 1485, spread: 48, count: 24, magnitudeRange: [2, 5], contradictionRate: 0.3 },
]

const PRIORITY_COUNT = 12

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

function generate(): Moment[] {
  const rand = mulberry32(42)
  const rnd = (a: number, b: number) => a + rand() * (b - a)
  const out: Moment[] = []
  for (const ch of GEN) {
    for (let i = 0; i < ch.count; i++) {
      const magnitude = rnd(ch.magnitudeRange[0], ch.magnitudeRange[1])
      const reinforces = rand() >= ch.contradictionRate
      const x = ch.center + rnd(-ch.spread, ch.spread)
      out.push({
        id: `r-${ch.id}-${String(i).padStart(3, '0')}`,
        channelId: ch.id,
        x,
        magnitude,
        reinforces,
        isPriority: false,
        capturedDay: Math.ceil(rand() * 90),
      })
    }
  }
  const contradicts = out.filter((m) => !m.reinforces).sort((a, b) => b.magnitude - a.magnitude)
  contradicts.slice(0, PRIORITY_COUNT).forEach((m) => (m.isPriority = true))
  return out
}

const BASE_MOMENTS: Moment[] = generate()

type PriorityDetail = {
  description: string
  promise?: string
  proof?: string
  buyerNames: string[]
  trustImpact: number
  recommendationId: 'rec-leaders' | 'rec-agents' | 'rec-content' | 'rec-employees'
  artifactName: string
}

// Riiser priority detail, authored per channel and mapped in magnitude order.
const PRIORITY_DETAILS: Record<ChannelId, PriorityDetail[]> = {
  agents: [
    {
      // DRAFT
      description: 'A buyer asked Atlas for the best coaching platforms. The agent named Vantage and Meridian, not Riiser.',
      promise: 'A category leader.',
      proof: 'Atlas names Vantage and Meridian as leaders and leaves Riiser out.',
      buyerNames: ['Devin Walsh', 'Elena Voss'],
      trustImpact: -12,
      recommendationId: 'rec-agents',
      artifactName: 'Atlas answer naming the category leaders',
    },
    {
      // DRAFT
      description: 'A buyer asked Atlas how Riiser compares. The agent called it smaller and newer, with reviews at 2.8.',
      promise: 'An established enterprise platform.',
      proof: 'Atlas frames Riiser as a smaller, newer entrant cited less than the leaders.',
      buyerNames: ['Priyanka Nair'],
      trustImpact: -11,
      recommendationId: 'rec-agents',
      artifactName: 'Atlas comparison answer about Riiser',
    },
    {
      // DRAFT
      description: 'A buyer asked Atlas for proof of outcomes. The agent could not cite a current Riiser result.',
      promise: 'Measurable behavior change.',
      proof: 'Atlas returns no current Riiser outcome and points to competitor case studies.',
      buyerNames: ['Devin Walsh'],
      trustImpact: -10,
      recommendationId: 'rec-agents',
      artifactName: 'Atlas outcomes answer about Riiser',
    },
    {
      // DRAFT
      description: 'A buyer asked Atlas about pricing. The agent described the model as unclear and gave a wide range.',
      promise: 'Straightforward enterprise pricing.',
      proof: 'Atlas describes Riiser pricing as unpublished and speculative.',
      buyerNames: ['Elena Voss'],
      trustImpact: -9,
      recommendationId: 'rec-agents',
      artifactName: 'Atlas pricing answer about Riiser',
    },
    {
      // DRAFT
      description: 'A buyer asked Atlas for alternatives to Vantage. Riiser appeared third, after two rivals.',
      promise: 'The first name in coaching.',
      proof: 'Atlas ranks two competitors ahead of Riiser in its alternatives list.',
      buyerNames: ['Priyanka Nair'],
      trustImpact: -10,
      recommendationId: 'rec-agents',
      artifactName: 'Atlas alternatives list',
    },
  ],
  reviews: [
    {
      // DRAFT
      description: 'A buyer opened Riiser on Glassdoor before the first call. The page reads 2.8 of 5.',
      promise: 'Help every employee rise.',
      proof: 'Glassdoor rating sits at 2.8 / 5 across 1,204 reviews.',
      buyerNames: ['Amara Osei', 'Priyanka Nair'],
      trustImpact: -14,
      recommendationId: 'rec-employees',
      artifactName: 'Riiser Glassdoor 2.8 / 5 page',
    },
    {
      // DRAFT
      description: 'A buyer read the recommend-rate. Only 41 percent of reviewers would recommend Riiser to a friend.',
      promise: 'A place people are proud to work.',
      proof: 'Only 41 percent of Glassdoor reviewers recommend Riiser to a friend.',
      buyerNames: ['Hannah Cole'],
      trustImpact: -12,
      recommendationId: 'rec-employees',
      artifactName: 'Riiser recommend-rate',
    },
    {
      // DRAFT
      description: 'A buyer read the top review. It describes a gap between the external message and the internal experience.',
      promise: 'Culture comes first.',
      proof: 'The top review says leadership says one thing externally and another internally.',
      buyerNames: ['Amara Osei'],
      trustImpact: -11,
      recommendationId: 'rec-employees',
      artifactName: 'Top Riiser Glassdoor review',
    },
    {
      // DRAFT
      description: 'A buyer compared Riiser on a review aggregator. It scored below two listed competitors.',
      promise: 'The trusted choice for enterprise.',
      proof: 'Aggregated review scores place Riiser below two competitors on enterprise fit.',
      buyerNames: ['Priyanka Nair'],
      trustImpact: -10,
      recommendationId: 'rec-employees',
      artifactName: 'Riiser on a review aggregator',
    },
    {
      // DRAFT
      description: 'A buyer scanned recent reviews. The newest entries repeat the message-versus-reality theme.',
      promise: 'A mission people live by.',
      proof: 'Recent reviews repeat a gap between the external message and the internal experience.',
      buyerNames: ['Hannah Cole'],
      trustImpact: -9,
      recommendationId: 'rec-employees',
      artifactName: 'Recent Riiser reviews',
    },
    {
      // DRAFT
      description: 'A buyer checked leadership approval inside the reviews. It trails the category median.',
      promise: 'Founder-led and mission-driven.',
      proof: 'Leadership approval inside the reviews trails the category median.',
      buyerNames: ['Amara Osei'],
      trustImpact: -9,
      recommendationId: 'rec-employees',
      artifactName: 'Riiser leadership approval',
    },
  ],
  linkedin: [
    {
      // DRAFT
      description: 'A buyer read the CPO post on culture. The most-liked reply is a former insider who disagrees.',
      promise: 'Culture comes first.',
      proof: 'The top reply on the CPO post is a former people-team member who says the inside differs.',
      buyerNames: ['Marcus Wen', 'Hannah Cole'],
      trustImpact: -8,
      recommendationId: 'rec-leaders',
      artifactName: 'Priya Ramaswamy LinkedIn post and top reply',
    },
  ],
  ads: [], sponsored: [], owned: [], company: [], instagram: [], twitter: [],
  communities: [], thirdparty: [],
}

function attachPriorityDetail(): Moment[] {
  const byChannel = new Map<ChannelId, Moment[]>()
  for (const m of BASE_MOMENTS) {
    if (!m.isPriority) continue
    const arr = byChannel.get(m.channelId) ?? []
    arr.push(m)
    byChannel.set(m.channelId, arr)
  }
  for (const [chId, arr] of byChannel) {
    arr.sort((a, b) => b.magnitude - a.magnitude)
    const details = PRIORITY_DETAILS[chId] ?? []
    arr.forEach((m, i) => {
      const d = details[i]
      if (!d) return
      m.description = d.description
      m.promise = d.promise
      m.proof = d.proof
      m.buyerNames = d.buyerNames
      m.trustImpact = d.trustImpact
      m.recommendationId = d.recommendationId
      m.artifactName = d.artifactName
    })
  }
  return BASE_MOMENTS
}

export const RIISER_MOMENTS: readonly Moment[] = attachPriorityDetail()

/* ── The seven statements ────────────────────────────────────────────────── */

export type ImpactLevel = 'low' | 'medium' | 'medium-high' | 'high' | 'very-high'
export type ScopeLevel = 'low' | 'low-medium' | 'medium' | 'high'
export type StatementKind = 'frame' | 'move' | 'urgency' | 'closer'
export type EvidenceKind =
  | 'seismograph'
  | 'linkedin'
  | 'atlas'
  | 'glassdoor'
  | 'reddit'
  | 'content'
  | 'closer'

export type ExecuteStep = string | { title: string; body: string | readonly string[] }

export type ExecuteBlock = {
  from: string
  to: string
  steps: readonly ExecuteStep[]
  effort?: string
  boundary?: string
}

export type RiiserStatement = {
  n: number
  kind: StatementKind
  anchor: string
  /** DOM id the seismograph "view recommendation" button scrolls to. */
  recId?: string
  headline: string
  leadLine?: string
  goDos?: readonly string[]
  impact: ImpactLevel | null
  scope: ScopeLevel | null
  verdict: string
  highestLeverage?: boolean
  drawer: {
    insight: string
    meaning: string
    execute: ExecuteBlock
    assumptions: string
    evidence: EvidenceKind
  }
}

// DRAFT — all statement narrative below is drafted in Riiser's voice for review.
export const STATEMENTS: readonly RiiserStatement[] = [
  {
    n: 1,
    kind: 'frame',
    anchor: 'frame',
    headline: 'Your buyer decides across eleven surfaces before they ever talk to you.',
    leadLine:
      'Buyer Trust Score: 41 of 100. The short list starts at 65. The gap is the work, and almost all of it forms on surfaces you do not own.',
    impact: null,
    scope: null,
    verdict: '41 scattered across surfaces',
    drawer: {
      insight:
        'A people leader evaluating Riiser rarely starts with a sales call. They start with a LinkedIn post, an AI answer, a review page, and a peer thread, and they reach a working opinion before anyone at Riiser knows they are looking.',
      meaning:
        'The composite reads 41 because the surfaces a buyer trusts most are the ones contradicting the promise. The brand controlled channels look healthy. The credible core does not.',
      execute: {
        from: 'A score scattered across eleven surfaces with no owner.',
        to: 'One number the team watches, with the two breaks named and assigned.',
        steps: [
          'Adopt the Buyer Trust Score as the single read of how the market sees Riiser.',
          'Name the two priority breaks, AI agents and reviews, as the first two pieces of work.',
          'Review the score on a fixed cadence rather than at campaign launches.',
        ],
        effort: 'Adoption, not build. The instrument already exists.',
      },
      assumptions:
        'Figures describe publicly visible brand presence, not internal spend. Pipeline movement is directional, based on patterns across comparable engagements.',
      evidence: 'seismograph',
    },
  },
  {
    n: 2,
    kind: 'move',
    anchor: 'leaders',
    recId: 'rec-leaders',
    headline: 'Your most visible post says culture comes first. The top reply says otherwise.',
    leadLine: 'The promise: culture comes first. The proof a buyer reads first: an insider who disagrees, with more likes than the post earned defenders.',
    goDos: [
      'Keep the leadership voice. The post is good. The reply is the problem.',
      'Close the gap the reply names instead of arguing with it in the thread.',
      'Give two or three other leaders a reason to show up beside the CPO.',
    ],
    impact: 'high',
    scope: 'low',
    verdict: 'HIGH IMPACT · LOW EFFORT · HIGHEST LEVERAGE',
    highestLeverage: true,
    drawer: {
      insight:
        'The Chief People Officer publishes a clear, well-written case for culture. The most-liked comment is from a former people-team member who says the inside does not match. A single credible reply is read more closely than the praise above it.',
      meaning:
        'The buyer does not weigh the post against the reply evenly. The reply carries an insider tag, and that tag makes it the more trusted line on the page.',
      execute: {
        from: 'A strong post undercut by its most-liked reply.',
        to: 'A leadership presence the buyer reads as consistent inside and out.',
        steps: [
          { title: 'Answer the reply with action, not words', body: 'Identify the specific gap the insider names and fix the part that is fixable this quarter.' },
          { title: 'Widen the bench', body: 'Bring two or three other named leaders into the conversation so the CPO is not the only voice carrying the promise.' },
        ],
        effort: 'Estimated 20 to 45 hours of leadership and people-team time.',
      },
      assumptions:
        'The post and reply are public. The reply is treated as a genuine insider account, not verified employment.',
      evidence: 'linkedin',
    },
  },
  {
    n: 3,
    kind: 'move',
    anchor: 'agents',
    recId: 'rec-agents',
    headline: 'When the buyer asks an AI which platforms lead, it names two rivals and leaves you out.',
    leadLine: 'The promise: a category leader. The proof: the agent answers in your place and names Vantage and Meridian.',
    goDos: [
      'Treat the AI answer as a surface you can move, not weather you accept.',
      'Publish the current, citable facts the agent is missing.',
      'Track the answer the way you track a ranking.',
    ],
    impact: 'high',
    scope: 'low',
    verdict: 'HIGH IMPACT · LOW EFFORT',
    drawer: {
      insight:
        'Asked for the best coaching and development platforms, the answer engine names Vantage and Meridian as leaders. Asked specifically about Riiser, it calls the company smaller and newer and cites the 2.8 review average. The agent is answering for Riiser, and the answer is cautious.',
      meaning:
        'The agent is repeating the most citable public record it can find. Right now that record is thin and dated, so the safe answer points elsewhere.',
      execute: {
        from: 'An AI answer that names two rivals and frames Riiser as the cautious choice.',
        to: 'An answer grounded in current, citable Riiser facts.',
        steps: [
          'Publish the current proof points the agent is missing: live outcomes, real client references, a clear pricing posture.',
          'Make the facts citable on surfaces agents read, not buried in a deck.',
          'Re-run the queries monthly and watch the answer move.',
        ],
        effort: 'Estimated 20 to 45 hours across content and product marketing.',
      },
      assumptions:
        'Atlas is a representative answer engine. The exact phrasing varies by tool and date; the pattern is consistent.',
      evidence: 'atlas',
    },
  },
  {
    n: 4,
    kind: 'move',
    anchor: 'content',
    recId: 'rec-content',
    headline: 'The content you publish reaches the people who already believe you.',
    leadLine: 'Seven of eight content themes land with the converted. The themes a buyer needs to see score lowest.',
    goDos: [
      'Shift weight from culture and values posts toward outcomes and buying.',
      'Write for the person signing the contract, not the practitioner applauding.',
      'Lead with proof a skeptic can check.',
    ],
    impact: 'medium',
    scope: 'medium',
    verdict: 'MEDIUM IMPACT · MEDIUM EFFORT',
    drawer: {
      insight:
        'Content averages 31 of 100 on buyer alignment. The strongest themes, manager enablement and product, reach the audience that is already convinced. The themes a buyer weighs, outcomes, pricing, and customer proof, score lowest.',
      meaning:
        'The library is built for the believer, not the buyer. It reassures the room that already trusts Riiser and says little to the person deciding whether to.',
      execute: {
        from: 'A content library written for the converted.',
        to: 'A library that answers the buyer’s open questions in order.',
        steps: [
          { title: 'Rebalance the calendar', body: 'Move weight toward outcomes, customer proof, and a clear buying story.' },
          { title: 'Write for the signer', body: 'Address the budget owner’s questions directly rather than the practitioner’s.' },
        ],
        effort: 'Estimated 45 to 90 hours across a quarter of content.',
      },
      assumptions:
        'Alignment is scored against the questions buyers raise in the category, not against engagement.',
      evidence: 'content',
    },
  },
  {
    n: 5,
    kind: 'move',
    anchor: 'employees',
    recId: 'rec-employees',
    headline: 'Your own employees rate the promise 2.8, and it is the first thing a buyer reads.',
    leadLine: 'The promise: help every employee rise. The proof: a 2.8 review page and a 41 percent recommend rate, public and searchable.',
    goDos: [
      'Treat the review page as a buyer surface, not only an HR metric.',
      'Close the message-versus-reality gap the reviews name.',
      'Respond to reviews in a way a prospect would respect.',
    ],
    impact: 'high',
    scope: 'high',
    verdict: 'HIGH IMPACT · HIGH EFFORT · STRUCTURAL',
    drawer: {
      insight:
        'A buyer vetting Riiser opens the Glassdoor page and finds 2.8 of 5 across 1,204 reviews, with 41 percent recommending. The top review names a gap between the external message and the internal experience. For a company whose promise is to help every employee rise, the contradiction lands hard.',
      meaning:
        'The review page is the proof a skeptic trusts most, because employees have the least reason to flatter. A coaching company graded low by its own people raises the exact doubt the category is meant to resolve.',
      execute: {
        from: 'A public review page that contradicts the promise.',
        to: 'A review page a buyer can read without flinching.',
        steps: [
          { title: 'Fix the named gap', body: 'Address the message-versus-reality theme inside the company before answering it outside.' },
          { title: 'Respond in public', body: 'Reply to reviews the way a prospect would want a future vendor to respond.' },
          { title: 'Earn fresh reviews', body: 'Give satisfied employees a reason and a moment to add a current account.' },
        ],
        effort: 'Estimated 20 to 45 hours of agency-executable scope, with internal work alongside.',
      },
      assumptions:
        'Review figures are public. Internal change is required for the external number to move, and that change is the company’s to make.',
      evidence: 'glassdoor',
    },
  },
  {
    n: 6,
    kind: 'urgency',
    anchor: 'buyers',
    headline: 'Named buyers are already in the field, and the threads are pointing them to Vantage.',
    leadLine: 'A people leader sizing Riiser against Vantage for eight hundred employees gets one reply: read the Glassdoor, and the rival reports better.',
    impact: null,
    scope: null,
    verdict: 'WHY NOW',
    drawer: {
      insight:
        'In a community thread, a people leader weighs Riiser against Vantage for an eight-hundred-person rollout. The top reply tells them to read the Glassdoor first and says the rival’s reporting is stronger. Named buyers are visible across LinkedIn, reviews, and AI answers at the same time.',
      meaning:
        'These are not future prospects. They are in the consideration window now, and the surfaces they trust are nudging them away before a seller is in the room.',
      execute: {
        from: 'Live buyers steered toward the rival by the surfaces they trust.',
        to: 'Buyers who meet a consistent Riiser before they meet a seller.',
        steps: [
          'Fix the two priority breaks first so the surfaces stop working against the brand.',
          'Equip sellers with the proof points buyers are asking peers for.',
          'Move while these named buyers are still deciding.',
        ],
        effort: 'Estimated 20 to 45 hours, sequenced behind the two breaks.',
      },
      assumptions:
        'Buyer names and threads are illustrative of the pattern, drawn from the sample, not a live account list.',
      evidence: 'reddit',
    },
  },
  {
    n: 7,
    kind: 'closer',
    anchor: 'closer',
    headline: 'Treat this as a number you hold, not a project you finish.',
    leadLine: 'The work moves Buyer Trust from 41 toward 61 over four quarters and turns the list into a program the team runs.',
    impact: null,
    scope: null,
    verdict: 'COMPOUNDS · TURNS THE LIST INTO A PROGRAM',
    drawer: {
      insight:
        'Each break closed lifts the composite, and the surfaces reinforce one another once they agree. The path runs 41, 48, 55, 61 across four quarters as the credible core stops contradicting the promise.',
      meaning:
        'The score is a measurement to hold, not a campaign to ship. Held steadily, it compounds, because a buyer who meets a consistent Riiser on one surface trusts the next one more.',
      execute: {
        from: 'A one-time audit that ages out.',
        to: 'A standing program with a number the team watches.',
        steps: [
          'Hold the score on a fixed review cadence.',
          'Work the breaks in priority order and re-measure.',
          'Let the reinforcing surfaces compound rather than chasing new channels.',
        ],
        effort: 'Ongoing. The cost is attention, not a rebuild.',
      },
      assumptions:
        'The trajectory is directional, based on patterns across comparable B2B engagements, not a guarantee.',
      evidence: 'closer',
    },
  },
]
