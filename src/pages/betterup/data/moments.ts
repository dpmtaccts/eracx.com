/* Moments — the discrete bars the seismograph renders.
   Generated once at module load from a deterministic seed so positions
   stay stable across renders. The top twelve contradictions by magnitude
   are tagged as priorities and receive hand-authored detail. */

export type ChannelId =
  | 'ads'
  | 'sponsored'
  | 'owned'
  | 'linkedin'
  | 'agents'
  | 'reviews'
  | 'company'
  | 'instagram'
  | 'twitter'
  | 'communities'
  | 'thirdparty'

export type Moment = {
  id: string
  channelId: ChannelId
  x: number
  magnitude: number
  reinforces: boolean
  isPriority: boolean
  capturedDay: number
  // Rich detail — only populated for the twelve priorities.
  description?: string
  promise?: string
  proof?: string
  buyerNames?: string[]
  trustImpact?: number
  artifactPath?: string
  sourceUrl?: string
  recommendationId?: 'rec-leaders' | 'rec-agents' | 'rec-content' | 'rec-employees'
  artifactName?: string // shown in placeholder until screenshot drops
}

type GenParams = {
  id: ChannelId
  center: number
  spread: number
  count: number
  magnitudeRange: [number, number]
  contradictionRate: number
}

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
        id: `m-${ch.id}-${String(i).padStart(3, '0')}`,
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

/* Hand-authored detail for the twelve priorities. Identified by index
   within their channel's priority list (priorityIndex = 0 is the highest-
   magnitude priority in that channel). We attach detail to the actual
   priority moments by walking the generated array in priority order. */

type PriorityDetail = {
  description: string
  promise?: string
  proof?: string
  buyerNames: string[]
  trustImpact: number
  recommendationId: 'rec-leaders' | 'rec-agents' | 'rec-content' | 'rec-employees'
  artifactName: string
  sourceUrl?: string
}

// Channel-specific authored details. The seismograph maps these onto the
// priority moments in each channel in magnitude order. If a channel has
// more priorities than authored details, the extras stay basic.
const PRIORITY_DETAILS: Record<ChannelId, PriorityDetail[]> = {
  agents: [
    {
      description: 'A buyer asked Perplexity about BetterUp. The agent named two competitors first.',
      promise: 'AI-native coaching platform.',
      proof: 'Perplexity cites two competitors before mentioning BetterUp.',
      buyerNames: ['Christelle Borketti', 'Charman Hayes'],
      trustImpact: -12,
      recommendationId: 'rec-agents',
      artifactName: 'Perplexity answer about BetterUp',
      sourceUrl: 'https://www.perplexity.ai/',
    },
    {
      description: 'A buyer asked ChatGPT for pricing. The agent quoted a discontinued D2C offering.',
      promise: 'Enterprise coaching at scale.',
      proof: 'ChatGPT quotes a sunset D2C tier as the entry point.',
      buyerNames: ['Natalie Peyton-Kelly', 'Lori Adams-Brown'],
      trustImpact: -11,
      recommendationId: 'rec-agents',
      artifactName: 'ChatGPT pricing answer about BetterUp',
    },
    {
      description: 'A buyer asked Claude about ROI. The agent answered with last-year case studies.',
      promise: 'Measurable behavior change.',
      proof: 'Claude cites a 2023 client outcome with no current proof point.',
      buyerNames: ['Puja Jaipal'],
      trustImpact: -10,
      recommendationId: 'rec-agents',
      artifactName: 'Claude ROI answer about BetterUp',
    },
    {
      description: 'A buyer asked Google AI Overview about company size. The agent reported 800 employees.',
      promise: 'Trusted by leading enterprises.',
      proof: 'Google AI Overview lists outdated headcount and missing logos.',
      buyerNames: ['Nicki Cox', 'Hannah Vallieri'],
      trustImpact: -9,
      recommendationId: 'rec-agents',
      artifactName: 'Google AI Overview on BetterUp',
    },
    {
      description: 'A buyer asked Perplexity for alternatives. The agent recommended BetterUp third.',
      promise: 'The category leader in coaching.',
      proof: 'Perplexity ranks two competitors ahead of BetterUp in its alternatives list.',
      buyerNames: ['Victoria L.'],
      trustImpact: -10,
      recommendationId: 'rec-agents',
      artifactName: 'Perplexity competitive comparison',
    },
  ],
  reviews: [
    {
      description: 'A buyer searched Glassdoor before her first call. The page is 2.8 of 5.',
      promise: 'Elevate the employee experience.',
      proof: 'Glassdoor rating sits at 2.8 / 5. Pay disputes remain unresolved.',
      buyerNames: ['Christelle Borketti', 'Manjuri Sinha'],
      trustImpact: -14,
      recommendationId: 'rec-employees',
      artifactName: 'BetterUp Glassdoor 2.8 / 5 page',
      sourceUrl: 'https://www.glassdoor.com/',
    },
    {
      description: 'A buyer read recent BetterUp Glassdoor reviews. Two of the top three describe layoffs.',
      promise: 'A culture that lifts people up.',
      proof: 'Top Glassdoor reviews from the last 90 days center on layoffs and morale.',
      buyerNames: ['Charman Hayes'],
      trustImpact: -12,
      recommendationId: 'rec-employees',
      artifactName: 'Recent BetterUp Glassdoor reviews',
    },
    {
      description: 'A buyer compared BetterUp on G2. The platform scored below two listed competitors.',
      promise: 'The trusted coaching choice for enterprise.',
      proof: 'G2 ranks BetterUp below two competitors on enterprise-fit scores.',
      buyerNames: ['Catherine Jefferson'],
      trustImpact: -11,
      recommendationId: 'rec-employees',
      artifactName: 'BetterUp on G2',
    },
    {
      description: 'A buyer checked Indeed for current employee sentiment. The page surfaces a recent severance dispute.',
      promise: 'A workplace people are proud of.',
      proof: 'Indeed shows a recent severance dispute thread at the top of the page.',
      buyerNames: ['Lori Adams-Brown'],
      trustImpact: -10,
      recommendationId: 'rec-employees',
      artifactName: 'BetterUp Indeed page',
    },
    {
      description: 'A buyer read the BetterUp Glassdoor CEO approval. It sits below the industry median.',
      promise: 'Founder-led, mission-driven.',
      proof: 'CEO approval rating on Glassdoor is below the SaaS industry median.',
      buyerNames: ['Puja Jaipal'],
      trustImpact: -9,
      recommendationId: 'rec-employees',
      artifactName: 'BetterUp CEO approval rating',
    },
    {
      description: 'A buyer scanned Comparably for diversity scores. The numbers undercut the brand narrative.',
      promise: 'A diverse, inclusive culture.',
      proof: 'Comparably scores trail BetterUp’s public DEI commitments.',
      buyerNames: ['Hannah Vallieri'],
      trustImpact: -9,
      recommendationId: 'rec-employees',
      artifactName: 'BetterUp Comparably page',
    },
  ],
  linkedin: [
    {
      description: 'A buyer followed BetterUp’s CEO. He posted twice in 30 days, both reshares.',
      promise: 'Executive thought leadership.',
      proof: 'Alexi Robichaux’s last 30 days on LinkedIn: two reshares, no originals.',
      buyerNames: ['Carl Eschenbach', 'Ashley Goldsmith'],
      trustImpact: -8,
      recommendationId: 'rec-leaders',
      artifactName: 'Alexi Robichaux LinkedIn profile',
      sourceUrl: 'https://www.linkedin.com/',
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
      m.sourceUrl = d.sourceUrl
    })
  }
  return BASE_MOMENTS
}

export const MOMENTS: readonly Moment[] = attachPriorityDetail()
