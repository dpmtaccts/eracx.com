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

export type ChannelId = 'promise' | 'exec' | 'proof' | 'sources' | 'agents' | 'verdict'

export interface Channel {
  id: ChannelId
  num: string // '01'..'06'
  name: string
  tie: string // accent color
  body?: string
  evidence: Evidence[]
  divergence?: Divergence
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
  name: string, title: string, tenureStart: string | null, linkedin?: string, anchor?: boolean,
): Person => ({ name, title, tenureStart, linkedin, anchor, followers: null, cadence: null, povType: null, audience: null, analysis: null })

// ============================ SAPIENS ============================
const sapiens: Player = {
  slug: 'sapiens', name: 'Sapiens', domain: 'sapiens.com', logo: '/images/insuretech/sapiens.png', section: '04',
  ownership: 'Advent (PE)', ownershipNote: 'Acquired by Advent for ~2.5 billion dollars, closed Dec 2025, with leadership appointments announced 2025-12-17.',
  headcount: '5,265', growth12mo: '+2.9%', revenue: '500M–1B', funding: '$0 (acquired)',
  hq: 'London / Holon', customersClaimed: '600+ · 30+ countries', crawl: '80', resolved: '73',
  namedCustomers: ['Hiscox', 'Encova', 'Hollard Risk Group'],
  competitors: ['Guidewire', 'Duck Creek', 'Majesco'],
  recentNews: [
    { date: '2025-08-13', item: 'Agreed to be acquired by Advent at a valuation near 2.5 billion dollars.' },
    { date: '2025-12-17', item: 'Leadership appointments following the close of the Advent acquisition.' },
  ],
  cells: [
    { id: 'p&c-core', label: 'p&c-core', primary: true },
    { id: 'life-annuity-core', label: 'life-annuity-core' },
    { id: 'reinsurance-financial-modules', label: 'reinsurance-financial-modules' },
  ],
  people: [
    person('Roni Al-Dor', 'CEO & President', '2005-11', 'https://www.linkedin.com/in/roni-al-dor-9b42165/', true),
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
      ],
      divergence: { text: 'Website taxonomy leads with breadth across lines. LinkedIn, careers, and exec posts scan is TO BUILD. Do not composite the two into one message until both are captured.' },
      toBuild: [{ label: 'To build · transition classification', what: 'Classify the promise as controllable lag, boat-anchor legacy, or competitive convergence, once the LinkedIn and careers scan confirm whether the AI-native claim is carried or contradicted, and how the Advent ownership reframes it.', meta: 'Needs · LinkedIn · careers · exec posts · press divergence scan' }],
    }),
    CH.exec({
      body: 'The crawl list resolves to a leadership bench weighted toward Israel and the go-to-market side. Watch the founder-CEO, the regional revenue leaders, and the business-unit heads that map to the three cells first. Per-person social signal is below.',
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
      toBuild: [{ label: 'To build · proof versus promise', what: 'Verify the three named accounts, then extract segment, tier, buyer title, and product scope and cross-reference wild-review sources. Verdict on whether proof carries the breadth claim is a judgment call.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      body: 'Presence across analysts and trade bodies is not yet assembled. Sapiens carries a dedicated analyst-relations function, which suggests coverage exists to be catalogued.',
      evidence: [{ label: 'Signal · crawl list', date: '2026-07-10', items: ['Dr. Jochen Wolf, VP Industry Analyst Relations. A named AR owner implies Gartner, Forrester, Celent, and Datos coverage to verify.'] }],
      toBuild: [{ label: 'To build · source presence and weighting', what: 'Mark present or absent across Gartner, Forrester, Celent, Datos, trade press, IASA, NAMIC. Weighting across sources is a judgment call.', meta: 'Needs · web search and fetch · analyst-report references' }],
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
  slug: 'guidewire', name: 'Guidewire', domain: 'guidewire.com', logo: '/images/insuretech/guidewire.png', section: '05', band: 'parchment',
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
      ],
      toBuild: [{ label: 'To build · transition classification', what: 'Classify against the LinkedIn and careers scan. As benchmark, its congruence sets the reference the other three read against.', meta: 'Needs · owned-message divergence scan' }],
    }),
    CH.exec({
      body: 'The crawl list resolved heavily to talent-acquisition and recruiting roles rather than the commercial bench, so the anchor set here is thin and worth widening before weighting the voice. Per-person social signal is below.',
      toBuild: [
        { label: 'To build · widen the anchor set', what: 'The 96-record crawl skewed to recruiters. Pull the commercial and product leadership (CEO, CFO, CRO, product) before assessing executive voice.', meta: 'Needs · targeted crawl · press' },
        { label: 'To build · social capture', what: 'Follower counts and posting cadence per anchor.', meta: 'Per executive · pending' },
      ],
    }),
    CH.proof({
      body: 'The owned claim is 570 insurers across 43 countries with 1,700 projects. The Clay customer pull returned nothing, which for the scale leader is a capture gap in that one tool, not an absence of proof. Named references belong in press and case studies.',
      evidence: [{ label: 'Named customers · Clay', date: '2026-07-10', items: ['No customers returned. Cross-check with the June go-live news (Santam, Peel Mutual) and the case-study library.'] }],
      toBuild: [{ label: 'To build · proof versus promise', what: 'Pull named references from press and case studies, then cross-reference reviews. Verdict is a judgment call.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      body: 'Analyst and trade presence not yet catalogued. Guidewire is widely covered in P&C core analyst work, which the assembly should confirm rather than assume.',
      toBuild: [{ label: 'To build · source presence and weighting', what: 'Present or absent across Gartner, Forrester, Celent, Datos, trade press, IASA, NAMIC.', meta: 'Needs · web search and fetch' }],
    }),
    CH.agents({
      toBuild: [{ label: 'To build · answer-engine interpretation', what: 'Import AEO export for Guidewire and read the answer-engine description against the owned claim.', meta: 'Needs · enrichment/aeo/guidewire export' }],
    }),
    CH.verdict({ body: 'As benchmark, this verdict frames the reads on the other three.', toBuild: [VERDICT_TB] }),
  ],
}

// ============================ MAJESCO ============================
const majesco: Player = {
  slug: 'majesco', name: 'Majesco', domain: 'majesco.com', logo: '/images/insuretech/majesco.png', section: '06',
  ownership: 'Private (Thoma Bravo)', ownershipNote: 'Thoma Bravo portfolio; A.J. Rohde, Thoma Bravo Senior Partner, appears in the crawl.',
  headcount: '2,836', growth12mo: '+19.4% (fastest)', revenue: '25M–75M', funding: '$0',
  hq: 'Morristown, NJ', customersClaimed: '375+ · 1,400+ implementations', crawl: '37', resolved: '35',
  namedCustomers: ['Aon', 'CapSpecialty', 'Crum & Forster'],
  competitors: ['Guidewire', 'Duck Creek', 'Sapiens'],
  recentNews: [
    { date: '2026-02-03', item: 'Record FY25. Customers process over 100 billion dollars in direct written premium on Majesco core.' },
    { date: '2025-12-02', item: 'Announced a 2026 AI investment surge to accelerate P&C leadership.' },
  ],
  cells: [
    { id: 'p&c-core', label: 'p&c-core', primary: true },
    { id: 'life-annuity-core', label: 'life-annuity-core · L&AH' },
  ],
  people: [
    person('Adam Elster', 'CEO', '2018-09', 'https://www.linkedin.com/in/adam-elster-bb8192a/', true),
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
      toBuild: [{ label: 'To build · transition classification', what: 'Classify the AI-native claim as controllable lag, boat-anchor, or convergence once the owned-message scan and proof are in.', meta: 'Needs · LinkedIn · careers · press scan' }],
    }),
    CH.exec({
      body: 'A compact, senior, US-weighted bench with a visible strategy voice. Denise Garth is the most externally visible anchor and worth watching first. Per-person social signal is below.',
      toBuild: [
        { label: 'To build · social capture', what: 'Follower counts and cadence per anchor. Denise Garth first, given Garth’s external profile.', meta: 'Per executive · pending' },
        { label: 'To build · audience taxonomy', what: 'Audience mix per anchor.', meta: 'Per executive · pending' },
      ],
    }),
    CH.proof({
      body: 'The owned claim is 375 customers and 1,400 implementations, with over 100 billion dollars in premium processed on the core. Clay returned three named accounts to verify.',
      evidence: [{ label: 'Named customers · Clay', date: '2026-07-10', items: ['Aon, CapSpecialty, Crum & Forster.'], note: 'Clay-returned, not yet verified. Aon is a broker rather than a carrier, so segment and product scope matter before the name counts as core-platform proof.' }],
      toBuild: [{ label: 'To build · proof versus promise', what: 'Verify the three names and their segment, then test whether the proof carries the AI-native promise or trails it.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      toBuild: [{ label: 'To build · source presence and weighting', what: 'Present or absent across analysts and trade bodies. Denise Garth as CSO likely anchors trade-press presence, to confirm.', meta: 'Needs · web search and fetch' }],
    }),
    CH.agents({
      toBuild: [{ label: 'To build · answer-engine interpretation', what: 'Import AEO export. The AI-native claim makes the answer-engine read especially load-bearing here.', meta: 'Needs · enrichment/aeo/majesco export' }],
    }),
    CH.verdict({ toBuild: [VERDICT_TB] }),
  ],
}

// ============================ DUCK CREEK ============================
const duckcreek: Player = {
  slug: 'duckcreek', name: 'Duck Creek', domain: 'duckcreek.com', logo: '/images/insuretech/duckcreek.png', section: '07', band: 'parchment',
  ownership: 'Private (Vista)', ownershipNote: 'Vista Equity Partners portfolio.',
  headcount: '1,873', growth12mo: 'flat', revenue: '200M–500M', funding: '$120M',
  hq: 'Boston', customersClaimed: 'P&C / general · cloud, evergreen', crawl: '57', resolved: '54',
  namedCustomers: ['HDFC ERGO', 'Society Insurance', 'Gainsco'],
  competitors: ['Guidewire', 'Majesco', 'Insurity'],
  recentNews: [
    { date: '2026-07-08', item: 'Acquired Send Technology Solutions, an AI-native provider.' },
    { date: '2026-04-27', item: "Formation '26 cited double-digit new customer wins and expansions." },
  ],
  cells: [{ id: 'p&c-core', label: 'p&c-core', primary: true }],
  people: [
    person('Hardeep Gulati', 'Chief Executive Officer', '2025-10', 'https://www.linkedin.com/in/hardeepgulati/', true),
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
      toBuild: [{ label: 'To build · transition classification', what: 'Test whether the Send acquisition is folded into the promise as capability or still sits outside it, and whether the cloud claim is carried or lagged.', meta: 'Needs · LinkedIn · careers · press scan' }],
    }),
    CH.exec({
      body: 'A new CEO and a new CTO make the voice pattern a moving target worth dating carefully. Per-person social signal is below.',
      toBuild: [
        { label: 'To build · social capture', what: 'Follower counts and cadence. A new CEO and new CTO make the voice pattern a moving target. Full 57-record resolve is on disk.', meta: 'Per executive · pending' },
        { label: 'To build · audience taxonomy', what: 'Audience mix per anchor.', meta: 'Per executive · pending' },
      ],
    }),
    CH.proof({
      body: 'No customer count stated in the owned description. The Clay pull returned three named accounts to verify.',
      evidence: [{ label: 'Named customers · Clay', date: '2026-07-10', items: ['HDFC ERGO, Society Insurance, Gainsco.'], note: 'Clay-returned, not yet verified. HDFC ERGO points to India and general insurance, worth noting for segment spread.' }],
      toBuild: [{ label: 'To build · proof versus promise', what: 'Verify the three names, extract segment and product scope, and cross-reference reviews.', meta: 'Needs · press · site · reviews capture' }],
    }),
    CH.sources({
      toBuild: [{ label: 'To build · source presence and weighting', what: 'Present or absent across analysts and trade bodies.', meta: 'Needs · web search and fetch' }],
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
  { src: 'Contact crawl lists · Clay resolve + work-history / thought-leadership', count: '253 / 270', state: 'processing', note: 'All four players resolved to LinkedIn profiles. 17 unresolved.' },
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
