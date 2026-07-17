/* The InsureTech Buyer View — data model and seed.
   One entry per player. Every scoring judgment is left null and rendered as a
   TO BUILD block. Firmographics, named customers, competitors, and recent news
   are captured from the Clay enrichment (2026-07-10). Per-person social signal
   (followers, cadence, POV, audience, analysis) is TO BUILD from the social
   capture pass and fills in here as source lands. */

export type BuildState = 'captured' | 'processing' | 'pending' | 'gated'

/** A single dated observation assembled beneath a channel. */
export interface Evidence {
  label: string // mono eyebrow, e.g. "Owned message · 2026-07-10"
  date?: string
  items: string[]
  note?: string // flowing sentence under the list
}

/** A labeled judgment placeholder. Never filled by assembly. */
export interface ToBuild {
  label: string // e.g. "To build · transition classification"
  what: string
  meta?: string // mono needs-line
}

/** Highlight the tension the buyer will test. Kept, never composited. */
export interface Divergence {
  text: string
}

/** A resolved judgment: the transition classification for a player. */
export type ClassBand = 'controllable-lag' | 'boat-anchor' | 'convergence'
export interface Classification {
  band: string // display label
  bandKey: ClassBand
  verdict: string // one-line call
  reasoning: string // grounded reasoning
}

/** A set score for a channel, with its weighted dimensions. */
export interface ScoreDim { name: string; weight: number; points: number }
export interface ChannelScore {
  label: string
  value: number
  max: number
  interpretation: string
  dims: ScoreDim[]
}

/** Temporal congruence: how fast leaders adopt the corporate message. */
export interface TemporalScore {
  value: number
  max: number
  model: string // e.g. "Cascade model"
  lag: string // typical brand-to-leader lag
  note: string
}

export type ChannelId = 'promise' | 'exec' | 'proof' | 'sources' | 'agents' | 'verdict'

export interface Channel {
  id: ChannelId
  num: string // '01'..'06'
  name: string
  tie: string // accent color
  body?: string
  evidence: Evidence[]
  divergence?: Divergence
  analysis?: string // ERA read / judgment layer, rendered distinctly from raw evidence
  classification?: Classification // resolved transition classification (was a TO BUILD block)
  score?: ChannelScore // set channel score with weighted dimensions
  temporal?: TemporalScore // temporal congruence, brand-to-leader lag
  toBuild: ToBuild[]
}

export type PovType = 'original' | 'repost' | 'silent' | null

/** One executive. Title and tenure are captured. The four social fields are
    TO BUILD until the manual capture pass, and render as gaps when null. */
export interface Person {
  name: string
  title: string
  tenureStart: string | null // "2018-09"
  linkedin?: string
  location?: string
  anchor?: boolean // watch-first
  // --- Executive Voice, TO BUILD ---
  followers?: number | null
  cadence?: string | null // "weekly original" | "reposts only" | ...
  povType?: PovType
  audience?: string | null // taxonomy note
  analysis?: string | null // one-line read
}

export interface Cell {
  id: string
  label: string
  primary?: boolean
  benchmark?: boolean
}

export interface Player {
  slug: string
  name: string
  domain: string
  logo?: string // hosted logo PNG URL
  section: string // '04' etc, rendered via formatSectionLabel
  ownership: string
  ownershipNote?: string
  headcount: string
  growth12mo: string
  revenue: string
  funding: string
  hq: string
  customersClaimed?: string
  crawl: string // "80"
  resolved: string // "73"
  namedCustomers: string[]
  competitors: string[]
  recentNews: { date: string; item: string }[]
  // ERA's own prior brand report. Prior view, not independent evidence.
  brandReport?: { index: string; positioning: string; strength: string; risk: string; notable: string }
  cells: Cell[]
  people: Person[]
  channels: Channel[]
  band?: 'ink' | 'parchment'
}

// --- Channel scaffold factory. Seeds the six channels with whatever evidence
//     is assembled; every score stays a TO BUILD block. ---
const CH = {
  promise: (o: Partial<Channel>): Channel => ({
    id: 'promise', num: '01', name: 'Promise & transition state', tie: '#F4C430',
    evidence: [], toBuild: [], ...o,
  }),
  exec: (o: Partial<Channel>): Channel => ({
    id: 'exec', num: '02', name: 'Executive voice', tie: '#1845C2',
    evidence: [], toBuild: [], ...o,
  }),
  proof: (o: Partial<Channel>): Channel => ({
    id: 'proof', num: '03', name: 'Customers & proof', tie: '#DD5C20',
    evidence: [], toBuild: [], ...o,
  }),
  sources: (o: Partial<Channel>): Channel => ({
    id: 'sources', num: '04', name: 'Credible sources', tie: '#0A0A0A',
    evidence: [], toBuild: [], ...o,
  }),
  agents: (o: Partial<Channel>): Channel => ({
    id: 'agents', num: '05', name: 'AI & answer engines', tie: '#E6195F',
    evidence: [], toBuild: [], ...o,
  }),
  verdict: (o: Partial<Channel>): Channel => ({
    id: 'verdict', num: '06', name: 'Verdict', tie: '#E6195F',
    evidence: [], toBuild: [], ...o,
  }),
}

const VERDICT_TB: ToBuild = {
  label: 'To build · verdict',
  what: 'The whole verdict is a judgment pass. Assembled here is the evidence only. Never assembled automatically.',
  meta: 'Set after the five channels close',
}

const person = (
  name: string, title: string, tenureStart: string | null, linkedin?: string, anchor?: boolean, extra?: Partial<Person>,
): Person => ({ name, title, tenureStart, linkedin, anchor, followers: null, cadence: null, povType: null, audience: null, analysis: null, ...extra })

// ============================ SAPIENS ============================
const sapiens: Player = {
  slug: 'sapiens', name: 'Sapiens', domain: 'sapiens.com', logo: '/images/insuretech/sapiens.svg', section: '05',
  ownership: 'Advent (PE)', ownershipNote: 'Acquired by Advent for ~2.5 billion dollars, closed Dec 2025, with leadership appointments announced 2025-12-17.',
  headcount: '5,265', growth12mo: '+2.9%', revenue: '500M–1B', funding: '$0 (acquired)',
  hq: 'London / Holon', customersClaimed: '600+ · 30+ countries', crawl: '80', resolved: '73',
  namedCustomers: ['Hiscox', 'Encova', 'Hollard Risk Group'],
  competitors: ['Guidewire', 'Duck Creek', 'Majesco'],
  recentNews: [
    { date: '2025-08-13', item: 'Agreed to be acquired by Advent at a valuation near 2.5 billion dollars.' },
    { date: '2025-12-17', item: 'Leadership appointments following the close of the Advent acquisition.' },
  ],
  brandReport: {
    index: '59 / 100 · Vulnerable',
    positioning: 'The only vendor that can run a carrier’s whole business, P&C, life & annuities, and reinsurance, on one platform. The report urges Sapiens to own that "sensible simplicity" high ground rather than echo rivals’ AI-driven, future-proof language.',
    strength: 'Genuine multi-line platform depth. One of very few vendors running P&C, L&A, and reinsurance on one strategic platform, which is why multi-line carriers shortlist it.',
    risk: 'The "acquired, new CEO, new HQ" instability story competitors raise at renewal, compounded by a weak employer brand (Glassdoor 3.4, comp down 7%, an "old tech stack" theme) that contradicts the future-proof claim.',
    notable: 'Report asserts 600+ customers across 30+ countries and 5,400 employees.',
  },
  cells: [
    { id: 'p&c-core', label: 'p&c-core', primary: true },
    { id: 'life-annuity-core', label: 'life-annuity-core' },
    { id: 'reinsurance-financial-modules', label: 'reinsurance-financial-modules' },
  ],
  people: [
    person('Roni Al-Dor', 'CEO & President', '2005-11', 'https://www.linkedin.com/in/roni-al-dor-9b42165/', true, { analysis: 'One post in 180 days, and it announced he is concluding his role as CEO after the Advent close. The founder voice is winding down, not leading the transition.' }),
    person('Raj Ghuman', 'Chief Revenue Officer, EMEA & APAC', '2023-03', 'https://www.linkedin.com/in/raj-ghuman-21b8485/', true),
    person('Gary Sherne', 'Head of North America & CRO', '2022-09', 'https://www.linkedin.com/in/garysherne/', true),
    person('Udi Matot', 'SVP, Head of P&C and Reinsurance', '2024-11', 'https://www.linkedin.com/in/udi-matot-888a084/', true),
    person('Nir Asulin', 'VP, Head of Reinsurance Business Unit', '2024-11', 'https://www.linkedin.com/in/nir-asulin-1264917/'),
    person('David Pidgeon', 'Head of L&A Business Unit, North America', '2019-01', 'https://www.linkedin.com/in/david-pidgeon-184b2740/'),
    person('Gil Maletski', 'CTO', '2012-06', 'https://www.linkedin.com/in/gilmaletski/'),
    person('Ben Shory', 'Corporate CTO / Head of Digital Division', '2024-01', 'https://www.linkedin.com/in/ben-shory-703a0aa/'),
    person('Eva Skidmore', 'Chief Marketing Officer', '2026-03', 'https://www.linkedin.com/in/evaskidmore/'),
  ],
  channels: [
    CH.promise({
      body: 'The owned message positions Sapiens as intelligent insurance software across P&C, workers comp, life, reinsurance, and financial compliance, with AI and automation as the transition story. The description leans on a long global track record and a partner network rather than a single platform claim.',
      evidence: [
        { label: 'Owned message · company description', date: '2026-07-10', items: [
          'Positions across P&C, workers comp, life, reinsurance, financial & compliance, data & analytics, digital, decision management.',
          'Transition framing: AI and advanced automation, Microsoft Top 100 Partner program.',
          'Breadth-first claim, not depth-first. Many motions under one roof.',
        ] },
        { label: 'Recent news · Clay, dated, under 12 months', items: [
          '2025-08-13 · Agreed to be acquired by Advent at a valuation near 2.5 billion dollars.',
          '2025-12-17 · Leadership appointments following the close of the Advent acquisition.',
        ], note: 'The ownership change and a refreshed executive team sit directly under the transition story. A private-equity owner reframes what the AI-native claim is being built toward.' },
        { label: 'Brand launch · owned social · 2026-06', items: [
          'Introduced "hyper-relevance" and a "single insurance ontology" as the new positioning: insurance moving from periodically understanding risk to continuously understanding people, in real time.',
          'Backed by 600+ insurers in 30 countries on one framework. The most distinctive category language of the four, but concentrated at the June launch and repeated ("risk never stands still," "a world that won’t stop").',
        ], note: 'The freshest category concept in the set, and still an assertion. No named customer, decision, or outcome yet shows what hyper-relevance changed.' },
      ],
      divergence: { text: 'Website taxonomy leads with breadth across lines. LinkedIn, careers, and exec posts scan is TO BUILD. Do not composite the two into one message until both are captured.' },
      classification: {
        band: 'Boat-anchor legacy',
        bandKey: 'boat-anchor',
        verdict: 'The multi-line depth that is the strength is also the legacy weight. The transition is dragging on old architecture and a change of ownership at the same time.',
        reasoning: 'Sapiens makes the widest promise, P&C, life, and reinsurance on one platform, but it grows the slowest in the set (+2.9%), carries an "old tech stack" theme and a weak employer brand, and is mid-transition under a new PE owner with a departing founder-CEO. The prior brand report rates it Vulnerable (59). The distance between the AI-modernized claim and the reality is the furthest of the four, and closing it is not a messaging fix. The legacy breadth and the organizational instability are structural drags. Advent’s investment is the lever, but the anchor is real.',
      },
      toBuild: [],
    }),
    CH.exec({
      body: 'The crawl list resolves to a leadership bench weighted toward Israel and the go-to-market side. The 180-day LinkedIn capture, below, shows who actually carries the voice.',
      score: {
        label: 'Leader-brand congruence', value: 76, max: 100,
        interpretation: 'The most coordinated leadership narrative in the set. Multiple leaders carry the same thesis, though they repeat it more often than they prove it.',
        dims: [
          { name: 'Message alignment', weight: 25, points: 23 },
          { name: 'Leadership participation', weight: 20, points: 18 },
          { name: 'Independent interpretation', weight: 20, points: 14 },
          { name: 'Evidence and behavior', weight: 25, points: 15 },
          { name: 'Market dialogue', weight: 10, points: 6 },
        ],
      },
      temporal: {
        value: 84, max: 100,
        model: 'Cascade model',
        lag: 'same week to about two weeks',
        note: 'The clearest brand-to-leader handoff in the set. Brand definition, then urgency, governance, product, and customer activation. Several leaders extend the hyper-relevance narrative rather than reposting it once.',
      },
      analysis: 'Sapiens has the loudest leader presence in the set, 113 posts across seven of eight captured leaders and the most external engagers, but the volume is carried by marketing and sales, not the top. Persi Kanga (74 posts) and Jennifer Gamble (28 posts, 183 comments) drive event and product promotion, the AI Customer Experience Lab, Sapiens Decision, reinsurance, under a light thought-leadership frame. The founder-CEO, Roni Al-Dor, posted once in 180 days, to announce he is concluding his role after the Advent close. The company is audible but has no owner of an original point of view at the top, and the recurring theme is the new owner, brand, and London HQ rather than a market argument.',
      toBuild: [
        { label: 'To build · social capture', what: 'Manual pass across the bench. Follower counts, posting cadence, and whether each anchor publishes original point of view or reposts.', meta: 'Per executive · pending' },
        { label: 'To build · audience taxonomy', what: 'Who follows each anchor. Buyers, employees, analysts, or press. Sort the audience before weighting the voice.', meta: 'Per executive · pending' },
      ],
    }),
    CH.proof({
      body: 'The owned claim is 600 customers in more than 30 countries. Clay returned three named accounts to verify. Segment, tier, buyer title, and product scope are not yet extracted.',
      evidence: [
        { label: 'Owned claim · company description', date: '2026-07-10', items: ['600+ customers, 30+ countries.'] },
        { label: 'Named customers · Clay', date: '2026-07-10', items: ['Hiscox, Encova, Hollard Risk Group.'], note: 'Clay-returned, not yet verified against press or a reference page.' },
      ],
      analysis: 'The breadth claim has proof. Clay names real multi-line carriers, Hiscox, Encova, and Hollard, and the owned 600-plus customer count is credible. The AI-modernized claim does not have proof yet. The evidence is legacy-scale, not AI-outcome, and the prior brand report’s "old tech stack" theme cuts against the future-proof framing. The read: proof carries the platform-depth promise; it lags the AI promise. Independent reference and review capture is still pending.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Verify the three named accounts and their segment, tier, and product scope against press and case studies, and cross-reference wild-review sources.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      body: 'Presence across analysts and trade bodies is not yet assembled. Sapiens carries a dedicated analyst-relations function, which suggests coverage exists to be catalogued.',
      evidence: [{ label: 'Signal · crawl list', date: '2026-07-10', items: ['Dr. Jochen Wolf, VP Industry Analyst Relations. A named AR owner implies Gartner, Forrester, Celent, and Datos coverage to verify.'] }],
      analysis: 'Sapiens carries the lightest analyst footprint of the four. The prior brand report leans on comparison-article citations, why multi-line carriers shortlist it, rather than a Magic Quadrant Leader position, and though a dedicated analyst-relations function exists (VP AR, Jochen Wolf), the third-party authority is thinner than Guidewire’s or Majesco’s. The read: real but secondary, validated more by breadth-of-lines coverage than by top-tier placement. The independent Gartner, Forrester, Celent, and Datos check is still to run.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Run the independent presence-and-weight check across Gartner, Forrester, Celent, Datos, trade press, IASA, and NAMIC.', meta: 'Needs · web search and fetch · analyst-report references' }],
    }),
    CH.agents({
      body: 'No AEO export sits in enrichment/aeo/sapiens. The queries are not re-run here by rule. This channel stays empty until the export lands.',
      toBuild: [{ label: 'To build · answer-engine interpretation', what: 'Import the AEO export, then read how the answer engines describe Sapiens against its own claim. Interpretation is a judgment call.', meta: 'Needs · enrichment/aeo/sapiens export · do not re-run queries' }],
    }),
    CH.verdict({ toBuild: [VERDICT_TB] }),
  ],
}

// ============================ GUIDEWIRE ============================
const guidewire: Player = {
  slug: 'guidewire', name: 'Guidewire', domain: 'guidewire.com', logo: '/images/insuretech/guidewire.svg', section: '06', band: 'parchment',
  ownership: 'Public', ownershipNote: 'Public (NYSE: GWRE).',
  headcount: '4,329', growth12mo: '+13.5%', revenue: '1B–10B', funding: '$0',
  hq: 'San Mateo', customersClaimed: '570+ insurers · 43 countries', crawl: '96', resolved: '91',
  namedCustomers: [],
  competitors: ['Duck Creek', 'Majesco', 'Sapiens'],
  recentNews: [
    { date: '2026-04-16', item: 'Launched ProNavigator, embedded expert AI inside insurance workflows.' },
    { date: '2026-06-09', item: 'Santam went live on Guidewire.' },
    { date: '2026-06-08', item: 'Peel Mutual expands on Guidewire Cloud.' },
  ],
  brandReport: {
    index: '81 / 100 · Strong',
    positioning: 'The reference brand of the P&C core-systems category, now repositioning around AI: "The P&C Platform, Built for AI." Deep, defensible equity with no relevance or trust erosion.',
    strength: 'Category authority. Six straight years a Gartner MQ Leader, 1,700+ implementations, and a 4.6 Gartner Peer Insights rating across 105 reviews, the deepest verified customer base in the category.',
    risk: 'One persistent, competitor-weaponized perception: powerful but heavy, expensive, and slow to implement.',
    notable: 'Report cites FY2025 revenue of $1,202.5M, up 23% YoY, 570+ insurers in 40+ countries, and a 10-year Liberty Mutual cloud commitment.',
  },
  cells: [{ id: 'p&c-core', label: 'p&c-core · the benchmark', primary: true, benchmark: true }],
  people: [
    person('Brigette McInnis-Day', 'Chief People Officer', '2025-09', 'https://www.linkedin.com/in/brigettemcinnisday/', true),
    person('Ryan Mondillo', 'Group Vice President of Sales, The Americas', '2023-08', 'https://www.linkedin.com/in/ryan-mondillo-89b92312/', true),
    person('Mohammed Anzy S', 'VP and Managing Director, India', '2024-01', 'https://www.linkedin.com/in/anzy/'),
  ],
  channels: [
    CH.promise({
      body: 'The owned message is narrow and confident. Guidewire positions itself as the platform P&C insurers trust, and leans on scale of implementation as the proof rather than breadth of lines. This is the depth-first opposite of the breadth-first framing elsewhere in the market.',
      evidence: [
        { label: 'Owned message · company description', date: '2026-07-10', items: [
          'Single motion: P&C core, cloud platform, data and analytics, digital, AI.',
          'Proof-forward: 1,700+ successful projects, largest R&D and SI partner community in P&C.',
        ] },
        { label: 'Recent news · Clay, dated, under 12 months', items: [
          '2026-04-16 · Launched ProNavigator, embedded expert AI inside insurance workflows.',
          '2026-06-09 · Santam went live. 2026-06-08 · Peel Mutual expands on Guidewire Cloud.',
        ], note: 'The transition claim is carried by a steady cadence of dated product and go-live news. The tech-stack pull shows a live AI layer (OpenAI, Anthropic, LangChain, Databricks), consistent with the message.' },
        { label: 'Owned social · communication behavior', items: [
          'Translates each theme into a specific operating problem, then a product and a number: pricing in minutes against a 3-to-6-month baseline (PricingCenter), ProNavigator embedded in the workflow rather than a generic chatbot, HazardHub property risk, a claims-savings calculator, a stated $220B protection gap.',
          'Occupies the category weekly, not only at launches. The most evidence-led communicator of the four.',
        ], note: 'The edge is a behavior, not only an asset: problem, then product, then number, repeated. It is why Guidewire reads as the category leader on its owned channel.' },
      ],
      classification: {
        band: 'Controllable lag',
        bandKey: 'controllable-lag',
        verdict: 'The transition is real and Guidewire sets its own pace. The only gap is a perception, not the product. This is the least-lagged of the four.',
        reasoning: 'Guidewire is the one vendor whose AI claim is backed by a shipped product (ProNavigator), six straight years as a Gartner MQ Leader, and the deepest verified customer base (4.6 across 105 reviews). The promise does not outrun the reality. The drag is the competitor-fed perception that the platform is heavy, expensive, and slow to implement, which the scale and analyst record can offset over time rather than a structural anchor. As benchmark, its congruence is the reference the other three are read against.',
      },
      toBuild: [],
    }),
    CH.exec({
      body: 'The crawl list resolved heavily to talent-acquisition roles rather than the commercial bench, so the captured voice is thin and worth widening. The 180-day activity is below.',
      score: {
        label: 'Leader-brand congruence', value: 69, max: 100,
        interpretation: 'Strong evidence instincts and a few genuinely original leaders, but an underactivated, disconnected leadership network. The most active independent voice is not carrying the insurance narrative.',
        dims: [
          { name: 'Message alignment', weight: 25, points: 19 },
          { name: 'Leadership participation', weight: 20, points: 10 },
          { name: 'Independent interpretation', weight: 20, points: 16 },
          { name: 'Evidence and behavior', weight: 25, points: 19 },
          { name: 'Market dialogue', weight: 10, points: 5 },
        ],
      },
      temporal: {
        value: 58, max: 100,
        model: 'Corporate-publisher model',
        lag: 'often no identifiable handoff',
        note: 'Less a lag than a missing transmission mechanism. The corporate account is continuous and specific, its July 16 post ties AI to the P&L, but leaders do not visibly receive and extend each message. The lowest temporal score in the set, despite the strongest corporate evidence.',
      },
      analysis: 'Guidewire is the scale benchmark and the quietest leader voice in the set: 15 posts from six captured leaders, most of them recruiting posts or regional event notes, insureNXT in German, a SaaS-investing webinar. No C-suite voice was captured. The company that dominates on implementation count and analyst coverage is nearly absent on the surface where a buyer looks for a human point of view. That gap is the finding. It does not prove the leaders are silent everywhere, but on the captured evidence the benchmark’s personal advocacy is thin, the opposite of its market position. The brand account is the inverse. On X and Instagram, Guidewire is the most active and most evidence-led communicator of the four, translating each theme into a specific problem, product, and number. The voice is institutional, carried by the brand channel rather than by its people. Duck Creek is the mirror image.',
      toBuild: [
        { label: 'To build · widen the anchor set', what: 'The 96-record crawl skewed to recruiters. Pull the commercial and product leadership (CEO, CFO, CRO, product) before assessing executive voice.', meta: 'Needs · targeted crawl · press' },
        { label: 'To build · social capture', what: 'Follower counts and posting cadence per anchor.', meta: 'Per executive · pending' },
      ],
    }),
    CH.proof({
      body: 'The owned claim is 570 insurers across 43 countries with 1,700 projects. The Clay customer pull returned nothing, which for the scale leader is a capture gap in that one tool, not an absence of proof. Named references belong in press and case studies.',
      evidence: [{ label: 'Named customers · Clay', date: '2026-07-10', items: ['No customers returned. Cross-check with the June go-live news (Santam, Peel Mutual) and the case-study library.'] }],
      analysis: 'Guidewire has the deepest proof in the set and the best fit to its promise. Per the prior brand report: 1,700-plus implementations, 570-plus insurers, and a 4.6 Peer Insights rating across 105 reviews, plus dated 2026 AI go-lives (Santam, Peel Mutual). Clay returned no named accounts, but that is a one-tool gap, not an absence; the case-study and verified-review base is the strongest any of the four can point to. The read: the proof carries the promise, including the AI turn, more fully than its rivals. Independent verification would confirm, not change, this.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Pull named references from press and case studies to fill the Clay gap, and cross-reference reviews.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      body: 'Analyst and trade presence not yet catalogued. Guidewire is widely covered in P&C core analyst work, which the assembly should confirm rather than assume.',
      analysis: 'Guidewire holds the heaviest analyst authority in the set: six consecutive years a Gartner Magic Quadrant Leader and a 4.6 Peer Insights rating across 105 reviews per the prior brand report, the deepest verified base in the category. This is the source of its reference-brand standing and the reason rivals are framed relative to it. The read: top-tier and durable. An independent Forrester, Celent, and Datos check would confirm the pattern, not change it.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Run the independent presence check across Forrester, Celent, Datos, trade press, IASA, and NAMIC.', meta: 'Needs · web search and fetch' }],
    }),
    CH.agents({
      toBuild: [{ label: 'To build · answer-engine interpretation', what: 'Import AEO export for Guidewire and read the answer-engine description against the owned claim.', meta: 'Needs · enrichment/aeo/guidewire export' }],
    }),
    CH.verdict({ body: 'As benchmark, this verdict frames the reads on the other three.', toBuild: [VERDICT_TB] }),
  ],
}

// ============================ MAJESCO ============================
const majesco: Player = {
  slug: 'majesco', name: 'Majesco', domain: 'majesco.com', logo: '/images/insuretech/majesco.svg', section: '07',
  ownership: 'Private (Thoma Bravo)', ownershipNote: 'Thoma Bravo portfolio; A.J. Rohde, Thoma Bravo Senior Partner, appears in the crawl.',
  headcount: '2,836', growth12mo: '+19.4% (fastest)', revenue: '25M–75M', funding: '$0',
  hq: 'Morristown, NJ', customersClaimed: '375+ · 1,400+ implementations', crawl: '37', resolved: '35',
  namedCustomers: ['Aon', 'CapSpecialty', 'Crum & Forster'],
  competitors: ['Guidewire', 'Duck Creek', 'Sapiens'],
  recentNews: [
    { date: '2026-02-03', item: 'Record FY25. Customers process over 100 billion dollars in direct written premium on Majesco core.' },
    { date: '2025-12-02', item: 'Announced a 2026 AI investment surge to accelerate P&C leadership.' },
  ],
  brandReport: {
    index: '68 / 100 · Moderate',
    positioning: 'The sharpest-positioned challenger. The only core platform spanning P&C, L&AH, and Pension & Retirement on cloud-native, AI-native architecture. A credible, momentum-rich brand with one clear liability.',
    strength: 'An ownable "cloud-native and AI-native, widest product span" position no incumbent can claim as cleanly, backed by analyst validation (six-time Gartner MQ Leader, 4.5 Peer Insights on the P&C Intelligent Core Suite).',
    risk: 'A weak employer brand that reaches delivery. Glassdoor 3.0, 45% recommending, senior management 2.7, surfacing as delivery-quality variability. The report calls this its single most important operational finding.',
    notable: 'Report cites platform-processed premium growing from $36B to over $100B in roughly two years, ~$500M revenue under Thoma Bravo, and the Vitech acquisition closing January 2026.',
  },
  cells: [
    { id: 'p&c-core', label: 'p&c-core', primary: true },
    { id: 'life-annuity-core', label: 'life-annuity-core · L&AH' },
  ],
  people: [
    person('Adam Elster', 'CEO', '2018-09', 'https://www.linkedin.com/in/adam-elster-bb8192a/', true, { analysis: 'An actually present CEO, five posts on customer value, partnerships, and board roles. On-message and visible, more advocate than original theorist, but the top of the house shows up.' }),
    person('Ed Ossie', 'Chief Operating Officer', '2015-01', 'https://www.linkedin.com/in/ed-ossie-705b071/'),
    person('Denise Garth', 'Chief Strategy Officer', '2020-09', 'https://www.linkedin.com/in/denise-garth-383769/', true),
    person('Keith Palmieri', 'Chief Revenue Officer', '2025-04', 'https://www.linkedin.com/in/keith-palmieri-2105a27/', true),
    person('Arun Kalyanaraman', 'SVP & GM, Global L&AH & Distribution', '2024-07', 'https://www.linkedin.com/in/arun-kalyanaraman-720b193/'),
    person('Joe Aho', 'Chief Financial Officer', '2020-10', 'https://www.linkedin.com/in/joe-aho-882971b0/'),
    person('John Brown', 'Chief Information Officer', '2022-01', 'https://www.linkedin.com/in/jdbit/'),
    person('Michael Mendelsohn', 'CISO, VP Information Technology', '2022-09', 'https://www.linkedin.com/in/microbmen/'),
    person('Laura Drake', 'Chief Marketing Officer', '2026-05', 'https://www.linkedin.com/in/laura-drake-87013210/'),
  ],
  channels: [
    CH.promise({
      body: 'Majesco makes the most aggressive transition claim in the set. The owned message calls the company AI-native and born in the cloud, and puts agentic AI across core, underwriting, distribution, digital, and pension and retirement. The claim is louder than the revenue band, which is the tension the buyer will test.',
      evidence: [
        { label: 'Owned message · company description', date: '2026-07-10', items: [
          'Positions as AI-native and cloud-native across P&C, L&AH, and pension & retirement.',
          'Agentic AI stated across the product portfolio. Strongest AI framing of the four.',
        ] },
        { label: 'Recent news · Clay, dated, under 12 months', items: [
          '2026-02-03 · Record FY25. Customers process over 100 billion dollars in direct written premium.',
          '2025-12-02 · Announced a 2026 AI investment surge. 2026 · Spring ’26 release.',
        ], note: 'The premium-volume figure is the load-bearing proof under the AI-native claim. Majesco also grew headcount faster than the other three over the last year.' },
      ],
      divergence: { text: 'The AI-native promise sits against a 25M–75M revenue band and a Thoma Bravo ownership structure, alongside the fastest headcount growth in the set and a 100 billion dollar premium-volume claim. The signals point in different directions. Hold the gap open. Whether the claim is credible reach or overreach is a judgment call.' },
      classification: {
        band: 'Controllable lag',
        bandKey: 'controllable-lag',
        verdict: 'The claim is the loudest and runs ahead of the delivery, but the momentum to close the gap is real and self-directed.',
        reasoning: 'Majesco makes the most aggressive AI-native claim on the smallest revenue base, and the prior brand report’s sharpest risk is delivery-quality variability tied to a weak employer brand. The promise is ahead of the delivery. But the direction is right and controllable: the fastest headcount growth in the set (+19.4%), premium processed on the core rising from $36B to over $100B, active AI investment, and leaders who carry a genuine point of view rather than only promotion. The watch is whether delivery quality catches up to the ambition before a buyer notices the gap.',
      },
      toBuild: [],
    }),
    CH.exec({
      body: 'A compact, senior, US-weighted bench with a visible strategy voice. The 180-day activity is below.',
      score: {
        label: 'Leader-brand congruence', value: 61, max: 100,
        interpretation: 'Leaders support the AI-native, outcome-oriented direction, but the story is still emerging and leans on assertion, corporate amplification, events, and awards. The brand is moving faster than the proof system around it.',
        dims: [
          { name: 'Message alignment', weight: 25, points: 21 },
          { name: 'Leadership participation', weight: 20, points: 11 },
          { name: 'Independent interpretation', weight: 20, points: 10 },
          { name: 'Evidence and behavior', weight: 25, points: 15 },
          { name: 'Market dialogue', weight: 10, points: 4 },
        ],
      },
      temporal: {
        value: 67, max: 100,
        model: 'Repositioning model',
        lag: 'days for campaigns, one to three months for the strategic narrative',
        note: 'Campaign content, releases, events, and awards, is amplified within days. The deeper AI-native, customer-value argument takes one to three months to move across functions, consistent with a repositioning still being built.',
      },
      analysis: 'Majesco’s leaders track the corporate AI-native message more closely than any other vendor’s, and the bench is anchored by a present CEO. Adam Elster posts on customer value and partnerships, Utkarsh Raka carries a genuine point of view ("Spring 26 release, so what," pressing value over feature-shipping), and Denise Garth’s Frontier Insurer research is amplified repeatedly, including the "82% believe AI will define the industry, 14% have integrated it" stat. Brian McGushin is a heavy commenter (74) more than a poster. The read: on-message, AI-forward, CEO-present, with two or three leaders producing original argument rather than promotion. The voice supports the aggressive positioning better than the revenue band would predict.',
      toBuild: [
        { label: 'To build · social capture', what: 'Follower counts and cadence per anchor. Denise Garth first, given Garth’s external profile.', meta: 'Per executive · pending' },
        { label: 'To build · audience taxonomy', what: 'Audience mix per anchor.', meta: 'Per executive · pending' },
      ],
    }),
    CH.proof({
      body: 'The owned claim is 375 customers and 1,400 implementations, with over 100 billion dollars in premium processed on the core. Clay returned three named accounts to verify.',
      evidence: [{ label: 'Named customers · Clay', date: '2026-07-10', items: ['Aon, CapSpecialty, Crum & Forster.'], note: 'Clay-returned, not yet verified. Aon is a broker rather than a carrier, so segment and product scope matter before the name counts as core-platform proof.' }],
      analysis: 'The volume proof is strong. Premium processed on the core rose from $36B to over $100B, and the P&C Intelligent Core holds a 4.5 Peer Insights rating per the prior brand report. That backs the platform-scale claim. The AI-native claim rests more on investment and momentum than on shipped outcomes, and the brand report’s delivery-quality risk (Glassdoor 3.0, 45% recommend) is the crack a reference check will find. Aon, among the Clay-named accounts, is a broker rather than a carrier, so segment must be verified before it counts as core-platform proof. The read: proof carries the scale claim; the AI claim runs ahead of its evidence.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Verify the three names and their segment (Aon is a broker, not a carrier), then close the reference and review capture.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      analysis: 'Majesco’s analyst authority is stronger than its revenue band predicts: a six-time Gartner Magic Quadrant Leader with a 4.5 Peer Insights rating on the P&C Intelligent Core per the prior brand report, plus owned research, the Frontier Insurer program, that its leaders amplify. The read: high, and a genuine asset for a challenger. The item to verify is whether the validation covers the full AI-native, multi-line span it claims or concentrates in P&C core. Independent check pending.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Confirm analyst coverage across the full L&AH and Pension span, not only P&C core. Denise Garth as CSO likely anchors trade-press presence, to verify.', meta: 'Needs · web search and fetch' }],
    }),
    CH.agents({
      toBuild: [{ label: 'To build · answer-engine interpretation', what: 'Import AEO export. The AI-native claim makes the answer-engine read especially load-bearing here.', meta: 'Needs · enrichment/aeo/majesco export' }],
    }),
    CH.verdict({ toBuild: [VERDICT_TB] }),
  ],
}

// ============================ DUCK CREEK ============================
const duckcreek: Player = {
  slug: 'duckcreek', name: 'Duck Creek', domain: 'duckcreek.com', logo: '/images/insuretech/duckcreek.svg', section: '08', band: 'parchment',
  ownership: 'Private (Vista)', ownershipNote: 'Vista Equity Partners portfolio.',
  headcount: '1,873', growth12mo: 'flat', revenue: '200M–500M', funding: '$120M',
  hq: 'Boston', customersClaimed: 'P&C / general · cloud, evergreen', crawl: '57', resolved: '54',
  namedCustomers: ['HDFC ERGO', 'Society Insurance', 'Gainsco'],
  competitors: ['Guidewire', 'Majesco', 'Insurity'],
  recentNews: [
    { date: '2026-07-08', item: 'Acquired Send Technology Solutions, an AI-native provider.' },
    { date: '2026-04-27', item: "Formation '26 cited double-digit new customer wins and expansions." },
  ],
  brandReport: {
    index: '65 / 100 · Moderate, trending up',
    positioning: 'One of the two names defining enterprise P&C core software in North America and, after the Send acquisition, owner of the only agentic underwriting-to-core platform. Moving fast on the agentic-AI narrative.',
    strength: 'Category authority and analyst validation. Gartner Leader (2025 SaaS P&C core, NA), Everest Group Leader, plus Celent and IDC recognition on a deep enterprise base.',
    risk: 'Employee brand health is the most acute vulnerability. Post-Vista (2023, $2.6B take-private) layoffs, a "pressure cooker" culture, and leadership-trust erosion; secondarily the subordinate "Guidewire’s closest competitor" framing in AI and third-party sources.',
    notable: 'Report cites 370+ carriers including 33 of the top 50 North American insurers, and a SaaS-segment Gartner rating of 3.2 (17 reviews) against Guidewire’s 4.6 (105).',
  },
  cells: [{ id: 'p&c-core', label: 'p&c-core', primary: true }],
  people: [
    person('Hardeep Gulati', 'Chief Executive Officer', '2025-10', 'https://www.linkedin.com/in/hardeepgulati/', true, { analysis: 'A genuinely active new CEO: customer meetings (California FAIR Plan), an India trip, the Send acquisition, personal notes. Customer-facing rather than promotional, the most authentic CEO voice in the set.' }),
    person('Michael Jackowski', 'Vice Chairman', '2011-08', 'https://www.linkedin.com/in/michael-jackowski-b97b2636/', true),
    person('Rajesh Raheja', 'Chief Technology Officer', '2025-11', 'https://www.linkedin.com/in/rajeshraheja/', true),
    person('Christian Erickson', 'Managing Director, APAC', '2024-05', 'https://www.linkedin.com/in/christian-erickson-b554b821/'),
    person('Johan Nelis', 'Senior Director, International Solution Consulting', '2023-07', 'https://www.linkedin.com/in/johannelis/'),
  ],
  channels: [
    CH.promise({
      body: 'Duck Creek positions on P&C and general insurance with the cloud as the transition, and uses evergreen and OnDemand as the recurring frame. The message is narrower than Sapiens or Majesco and reads closer to Guidewire’s single-motion focus.',
      evidence: [
        { label: 'Owned message · company description', date: '2026-07-10', items: [
          'P&C and general insurance, cloud platform, agile and evergreen operations, Duck Creek OnDemand.',
          'Single-motion framing. No life or reinsurance claim.',
        ] },
        { label: 'Recent news · Clay, dated, under 12 months', items: [
          '2026-07-08 · Acquired Send Technology Solutions, an AI-native provider. The AI capability is being bought in, not only built.',
          "2026-04-27 · Formation '26 cited double-digit new customer wins and expansions.",
        ], note: 'Headcount is flat over the last year while the company acquires AI capability. That pairing is a signal for the transition read.' },
      ],
      classification: {
        band: 'Competitive convergence',
        bandKey: 'convergence',
        verdict: 'The position is defined relative to Guidewire and the AI capability was bought in, so the promise mirrors the category rather than setting it apart. The execution is strong; the position is derivative.',
        reasoning: 'Duck Creek executes the transition well: a coherent, CEO-led narrative around the Send acquisition and the Intelligent Core, with brand health trending up. But the agentic-AI capability is acquired (Send, July 2026) rather than native, and the prior brand report finds Duck Creek framed as "Guidewire’s closest competitor" in AI and third-party sources. The promise converges on the category leader’s rather than differentiating from it. The employer-brand drag from the Vista era is a secondary anchor.',
      },
      toBuild: [],
    }),
    CH.exec({
      body: 'A new CEO and a new CTO make the voice pattern a moving target worth dating carefully. The 180-day activity is below.',
      score: {
        label: 'Leader-brand congruence', value: 65, max: 100,
        interpretation: 'Corporate strategy and actions are coherent, but too few leaders visibly interpret or carry the story. Broad raw activity, concentrated on one theme rather than independent argument.',
        dims: [
          { name: 'Message alignment', weight: 25, points: 22 },
          { name: 'Leadership participation', weight: 20, points: 11 },
          { name: 'Independent interpretation', weight: 20, points: 10 },
          { name: 'Evidence and behavior', weight: 25, points: 18 },
          { name: 'Market dialogue', weight: 10, points: 4 },
        ],
      },
      temporal: {
        value: 73, max: 100,
        model: 'Strategic-moment model',
        lag: 'same day to a week around major announcements, two to six weeks otherwise',
        note: 'Excellent synchronization around events, the Send acquisition produced same-week CEO-and-leader alignment, and weak continuity between them. Alignment spikes at announcements, then falls off.',
      },
      analysis: 'Duck Creek shows broad raw activity, twelve of sixteen captured leaders posting, but it concentrates on one theme more than independent interpretation. Nearly every post ties to the same story: the Send acquisition, the Intelligent Core, and agentic underwriting. The new CEO, Hardeep Gulati, is genuinely active and customer-facing rather than promotional, and GTM leaders William Genard (17 posts) and Gabe Cossio carry original point of view linking AI to the core, "AI is only as powerful as the core it runs on." The read: a coordinated, CEO-led, acquisition-driven voice with the tightest message discipline in the set, consistent with the transition signal that Duck Creek is buying AI capability and building a story around it. The brand account is the inverse: on X, Duck Creek barely posts, four in the window, and much of the older data is stale. The energy sits in the people, not the brand channel. Guidewire is the mirror image, a loud brand account and quiet executives.',
      toBuild: [
        { label: 'To build · social capture', what: 'Follower counts and cadence. A new CEO and new CTO make the voice pattern a moving target. Full 57-record resolve is on disk.', meta: 'Per executive · pending' },
        { label: 'To build · audience taxonomy', what: 'Audience mix per anchor.', meta: 'Per executive · pending' },
      ],
    }),
    CH.proof({
      body: 'No customer count stated in the owned description. The Clay pull returned three named accounts to verify.',
      evidence: [{ label: 'Named customers · Clay', date: '2026-07-10', items: ['HDFC ERGO, Society Insurance, Gainsco.'], note: 'Clay-returned, not yet verified. HDFC ERGO points to India and general insurance, worth noting for segment spread.' }],
      analysis: 'The installed-base proof is strong: 370-plus carriers including 33 of the top 50 North American insurers, plus Gartner and Everest Leader positions per the prior brand report. But the promise is modern SaaS and agentic AI, and that is where the proof is thin. The SaaS-segment Peer Insights rating is 3.2 across 17 reviews against Guidewire’s 4.6 across 105, and the agentic capability (Send) was acquired weeks ago, so it is promise, not proof. The read: proof carries the legacy-scale claim; the modern-delivery and AI claims run ahead of the evidence.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Verify the three named accounts and segment, and track whether the SaaS-segment review base deepens past its thin 17.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      analysis: 'Duck Creek has solid analyst placement, a Gartner Leader position (2025 SaaS P&C, North America), Everest Group Leader, and Celent and IDC recognition per the prior brand report, but two things cut the weight. The verified-review base is thin, 3.2 across 17 Peer Insights reviews against Guidewire’s 4.6 across 105, and third-party AI sources frame Duck Creek as "Guidewire’s closest competitor," a subordinate position. The read: real analyst credibility, undercut by a shallow customer-voice base and a derivative framing. The trade-body check (IASA, NAMIC) is still to run.',
      toBuild: [{ label: 'To build · confirm the read', what: 'Run the trade-body check (IASA, NAMIC) and confirm whether third-party sources still frame Duck Creek relative to Guidewire.', meta: 'Needs · web search and fetch' }],
    }),
    CH.agents({
      toBuild: [{ label: 'To build · answer-engine interpretation', what: 'Import AEO export and read the answer-engine description against the owned claim.', meta: 'Needs · enrichment/aeo/duckcreek export' }],
    }),
    CH.verdict({ toBuild: [VERDICT_TB] }),
  ],
}

export const PLAYERS: Player[] = [sapiens, guidewire, majesco, duckcreek]

export const CHANNEL_ORDER: { num: string; name: string }[] = [
  { num: '01', name: 'Promise & transition' },
  { num: '02', name: 'Executive voice' },
  { num: '03', name: 'Customers & proof' },
  { num: '04', name: 'Credible sources' },
  { num: '05', name: 'AI & answer engines' },
  { num: '06', name: 'Verdict' },
]

export interface LedgerRow { src: string; count: string; state: BuildState; note?: string }
export const LEDGER: LedgerRow[] = [
  { src: 'Contact crawl lists · Clay resolve + work-history / thought-leadership', count: '253 / 270', state: 'processing', note: 'All four vendors resolved to LinkedIn profiles. 17 unresolved.' },
  { src: 'Company firmographics · Clay (revenue, funding, headcount, news, customers, competitors, tech stack)', count: '28 / 28', state: 'captured', note: 'All seven points complete for all four. Normalized to enrichment/companies.' },
  { src: 'Brand reports · Sapiens roadmap, Sapiens brand health, Guidewire, Majesco, Duck Creek', count: '5', state: 'captured', note: 'ERA-authored, treated as prior view.' },
  { src: 'Brand social activity · X and Instagram, one capture each per brand', count: '8 captures', state: 'captured', note: 'Cadence and engagement floors. Instagram comments mostly showed 0 captured.' },
  { src: 'LinkedIn leader activity · posts and comments, last 180 days', count: '32 leaders', state: 'captured', note: 'GTM leaders posting across four brands, plus 152 external engagers. Comments behind "Load more" not yet captured.' },
  { src: 'Press and analyst mentions · web search and fetch', count: '0', state: 'pending' },
  { src: 'Reddit · site search, buyer-language modifiers', count: '0', state: 'pending' },
  { src: 'Glassdoor / G2 / Peer Insights / Capterra · direct capture', count: '0', state: 'gated', note: 'No screenshots on disk yet.' },
  { src: 'PitchBook · license-gated export', count: '0', state: 'gated' },
  { src: 'AEO exports · answer-engine queries', count: '0', state: 'pending' },
]

export const COMPILED = '2026-07-16'
