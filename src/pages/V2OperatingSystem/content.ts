// All copy for the /v2 operating-system page.
// Edit strings here; components read from this module.

export type CtaLink = { label: string; href: string }

export const nav = {
  links: [
    { label: 'System', href: '#system' },
    { label: 'Signal Map', href: '#signal-map' },
    { label: 'AUX', href: '#aux' },
    { label: 'AI Mirror', href: '#mirror' },
    { label: 'Halo', href: '#halo' },
    { label: 'Timeline', href: '#expect' },
  ] as CtaLink[],
  cta: { label: 'Start with an audit', href: '#entry' } as CtaLink,
}

// ─── Proof strip (sits between Hero and Ghost) ───

export type ProofColumn = {
  descriptor: string
  outcome: string          // the big number, e.g. "$2M"
  detail: string           // "in new pipeline · under 4 months"
  isPlaceholder?: boolean  // renders in muted treatment if true
}

export const proofStrip: { columns: ProofColumn[] } = {
  columns: [
    {
      descriptor: 'SAAS TALENT MARKETPLACE',
      outcome: '$2M',
      detail: 'in new pipeline · under 4 months',
    },
    {
      // TODO: confirm outcome from Netrush or Navalent engagement.
      descriptor: 'OUTCOME 2',
      outcome: '—',
      detail: 'pending · quantified outcome + time-to-result',
      isPlaceholder: true,
    },
    {
      // TODO: confirm outcome from Miniac or Seismic engagement.
      descriptor: 'OUTCOME 3',
      outcome: '—',
      detail: 'pending · quantified outcome + time-to-result',
      isPlaceholder: true,
    },
  ],
}

export const hero = {
  headline: { before: 'ERA runs the ', italic: 'modern', after: ' B2B playbook.' },
  sub: "Measurement, signals, and operations for the part of the buyer journey your pipeline doesn't see.",
  primary: { label: 'See the system', href: '#system' } as CtaLink,
  secondary: { label: 'Start with an audit', href: '#entry' } as CtaLink,
  clientsLabel: 'Operators in residence',
  clients: ['Netrush', 'POP', 'Miniac', 'Navalent', 'Seismic'],
}

export const ghost = {
  sectionNum: "02 · The decision you don't see",
  headline: {
    before: "That lead didn't ghost you. Their mind was ",
    italic: 'made up',
    after: ' before you met.',
  },
  body: [
    'In 2026, most B2B decisions form before a vendor is ever contacted. Buyers evaluate in the background. Across AI. Across reviews. Across peer networks.',
    'The meeting is the last step, not the first.',
    'ERA measures that environment and runs the plays that shape it.',
  ],
}

export const stats = [
  {
    number: '95',
    numberItalic: '%',
    text: 'of B2B deals go to a vendor already on the Day One shortlist.',
    source: '6sense · Buyer Experience Report · 2025',
  },
  {
    number: '94',
    numberItalic: '%',
    text: 'of buyers use AI to research vendors before they ever contact one.',
    source: 'Forrester · State of Business Buying · 2026',
  },
  {
    number: '22',
    numberItalic: '',
    text: 'people on the average buying committee.',
    source: 'Forrester · 2026',
  },
]

export const playbook = {
  sectionLabel: '03 · Two playbooks',
  headline: { before: 'Old playbook. ', italic: 'New playbook.', after: '' },
  rows: [
    ['Drive traffic. Capture MQLs.', 'Shape ambient awareness. Own the shortlist.'],
    ['Cold outbound at volume.', 'Signal-triggered outreach to named accounts.'],
    ['Content for SEO.', 'Content built for AI citation and committee share.'],
    ['Episodic ABM campaigns.', 'Account-based operations as the default.'],
    ['Sales-led qualification.', 'Signal-led prioritization before the first call.'],
    ['Dashboards measuring activity.', 'Dashboards measuring conviction, rank, penetration.'],
    ['The funnel.', 'The buyer journey.'],
  ] as [string, string][],
  closer: 'We run the right column.',
}

export type SystemComponent = {
  label: string
  name: string
  role: string
  description: string
  viz: 'river' | 'map' | 'aux' | 'mirror'
}

export const system = {
  sectionLabel: '04 · The system',
  headline: { before: 'Four components. ', italic: 'One operating layer.', after: '' },
  lede: 'Anyone can buy the licenses. ERA integrates them into a system that measures, scores, and moves every day.',
  components: [
    {
      label: 'Aggregation',
      name: 'Signal River',
      role: 'LINKEDIN · HUBSPOT · APOLLO · CLAY · HOCKEYSTACK',
      description:
        "Every relevant signal from every source, pulled into one feed. Dedup'd, timestamped, delivered daily.",
      viz: 'river',
    },
    {
      label: 'Decisioning',
      name: 'Signal Map',
      role: '47 RULES · SIGNAL → PLAY',
      description:
        'Exec hires fire a relationship re-anchor. Funding rounds fire ICP scoring. One rule set. Consistent execution.',
      viz: 'map',
    },
    {
      label: 'Scoring',
      name: 'AUX',
      role: 'FRVRD · FIT · WALLET · READINESS',
      description:
        'Every target account on a weighted scale. Not vanity engagement. Real buyer readiness. Updated as signals land.',
      viz: 'aux',
    },
    {
      label: 'Perception',
      name: 'AI Mirror',
      role: 'CHATGPT · CLAUDE · PERPLEXITY',
      description:
        "Monitors how the agents describe you. Traces the sources feeding each answer. Flags what's drifting.",
      viz: 'mirror',
    },
  ] as SystemComponent[],
}

// ─── Signal Library ───

export type SignalTile = {
  name: string
  tools: string
  play: string
  tone: 'primary' | 'warm' | 'cool'
}

export const signalLibrary = {
  sectionLabel: 'The library',
  headline: { before: 'Every signal we watch. ', italic: 'Every play it fires.', after: '' },
  note:
    'Thirty active signal types across intent, relationship, product, and pipeline. Each one fires a specific play, on a specific cadence, through a specific stack.',
  countLabel: '24 of 47 signals shown · full library in the audit',
  closer: 'Every signal becomes a move.',
  tiles: [
    { name: 'Exec Hire', tools: 'Apollo · LinkedIn', play: 'Relationship re-anchor', tone: 'primary' },
    { name: 'Funding Round', tools: 'Crunchbase · Apollo', play: 'ICP scoring update', tone: 'primary' },
    { name: 'New Hire', tools: 'LinkedIn · Clay', play: 'Hiring signal sequence', tone: 'primary' },
    { name: 'Tech Install', tools: 'BuiltWith · Clay', play: 'Competitor displacement', tone: 'primary' },
    { name: 'Website Visit', tools: 'RB2B · HockeyStack', play: 'Warm outreach trigger', tone: 'primary' },
    { name: 'CRM Inactivity', tools: 'HubSpot · Apollo', play: 'Re-engagement sequence', tone: 'primary' },
    { name: 'Deal Stall', tools: 'HubSpot · Apollo', play: 'Multi-thread expansion', tone: 'warm' },
    { name: 'Champion ID', tools: 'LinkedIn · Clay', play: 'Stakeholder map update', tone: 'warm' },
    { name: 'Content Engage', tools: 'HockeyStack', play: 'Intent scoring update', tone: 'warm' },
    { name: 'No Reply', tools: 'Apollo · Reply', play: 'Silence detection play', tone: 'warm' },
    { name: 'Demo Request', tools: 'HubSpot · Apollo', play: 'High-intent sequence', tone: 'warm' },
    { name: 'Pricing View', tools: 'RB2B · HockeyStack', play: 'Urgency sequence trigger', tone: 'warm' },
    { name: 'Renewal Window', tools: 'HubSpot · CRM', play: 'Renewal sequence start', tone: 'cool' },
    { name: 'Team Growth', tools: 'LinkedIn · Clay', play: 'Seat expansion trigger', tone: 'cool' },
    { name: 'Champion Move', tools: 'LinkedIn · Clay', play: 'Relationship re-anchor', tone: 'cool' },
    { name: 'Low Engage', tools: 'HubSpot · HockeyStack', play: 'Risk alert sequence', tone: 'cool' },
    { name: 'Referral Signal', tools: 'HubSpot · CRM', play: 'Referral ask trigger', tone: 'cool' },
    { name: 'NPS Response', tools: 'HubSpot · Clay', play: 'Advocate sequence', tone: 'cool' },
    { name: 'Usage Drop', tools: 'Product · HubSpot', play: 'Churn risk alert', tone: 'primary' },
    { name: 'Competitor Eval', tools: 'HockeyStack · Clay', play: 'Displacement play', tone: 'primary' },
    { name: 'Exec Sponsor', tools: 'LinkedIn · CRM', play: 'Executive alignment', tone: 'primary' },
    { name: 'Series A', tools: 'Crunchbase · Clay', play: 'New ICP account flag', tone: 'primary' },
    { name: 'Slack Connect', tools: 'Clay · LinkedIn', play: 'Champion warmth signal', tone: 'primary' },
    { name: 'Proposal Sent', tools: 'CRM · Clay', play: 'Committee sequence start', tone: 'primary' },
  ] as SignalTile[],
}

// ─── Signal Map (section 05 deep dive) ───

export type SignalMapRow = {
  signal: { primary: string; meta: string }
  play: { primary: string; meta: string }
  score: number
}

export const signalMap = {
  sectionLabel: '05 · Inside the Signal Map',
  headline: {
    before: 'Every signal becomes a move. Every move ',
    italic: 'feeds the next one.',
    after: '',
  },
  note: 'A sample of what the Signal Map is running for a live client today.',
  columns: { signal: 'Signal', play: 'Play', priority: 'Priority' },
  rows: [
    {
      signal: { primary: 'Exec hire at target account', meta: 'CRUNCHBASE · LINKEDIN' },
      play: { primary: 'Relationship re-anchor', meta: 'SIGNAL CHAIN · 72HR' },
      score: 92,
    },
    {
      signal: { primary: 'Funding round announced', meta: 'APOLLO · PRESS' },
      play: { primary: 'ICP re-scoring + outreach', meta: 'AUX · REPLY' },
      score: 88,
    },
    {
      signal: { primary: 'Deal stalls 30 days', meta: 'HUBSPOT' },
      play: { primary: 'Multi-thread expansion', meta: 'SIGNAL CHAIN · CRM' },
      score: 78,
    },
    {
      signal: { primary: 'Champion changes jobs', meta: 'LINKEDIN' },
      play: { primary: 'Congrats + new account entry', meta: 'HALO · SIGNAL CHAIN' },
      score: 71,
    },
    {
      signal: { primary: 'Customer hits 90 days post-close', meta: 'CRM' },
      play: { primary: 'Expansion conversation trigger', meta: 'LOYALTY LOOP' },
      score: 64,
    },
  ] as SignalMapRow[],
  caption: 'Live sample · 5 of 47 active rules · Score reflects buyer readiness',
}

// ─── AUX (section 06 deep dive) ───

export type AuxActivity = {
  name: string
  action: string
  points: string
  time: string
  tone: 'primary' | 'warm' | 'cool'
}

export type AuxScore = {
  label: string
  value: number
  color: 'rust' | 'gold'
}

export type AuxTier = {
  tier: 1 | 2 | 3
  tag: string
  label: string
  widthPct: number
  count: number
}

export const aux = {
  sectionLabel: '06 · Inside AUX',
  headline: { before: 'A warmth score for every account. ', italic: 'Updated daily.', after: '' },
  note: 'Five dimensions. Three sub-scores. One composite. What most teams guess at, AUX measures.',
  account: {
    name: 'Capital One',
    domain: 'capitalone.com',
    warmth: 76,
    warmthTrend: '↑ +14 · 30d',
    rolesEngaged: 14,
    rolesTotal: 48,
    rolesNote: 'buying committee',
    tierBadge: 'T1 · Active',
    // FRVRD values 0-100 drive the pentagon radar.
    frvrd: {
      frequency: 85,
      recency: 72,
      value: 90,
      responsiveness: 65,
      density: 58,
    },
    scores: [
      { label: 'Fit', value: 91, color: 'rust' },
      { label: 'Wallet', value: 65, color: 'gold' },
      { label: 'Readiness', value: 78, color: 'rust' },
    ] as AuxScore[],
    composite: 79,
    activity: [
      { name: 'Carly Stein', action: 'LinkedIn connect accepted · Economic Buyer', points: '+10', time: '2d ago', tone: 'primary' },
      { name: 'Marcus Johnson', action: 'Content download · Amazon audit template', points: '+12', time: '5d ago', tone: 'primary' },
      { name: 'Amy Liu', action: 'Email reply · Positive to content', points: '+8', time: '7d ago', tone: 'warm' },
      { name: 'Marcus Johnson', action: 'Webinar attended · Amazon strategy', points: '+15', time: '11d ago', tone: 'cool' },
    ] as AuxActivity[],
  },
  tierDist: {
    titleLeft: 'Tier distribution · 132 target accounts',
    titleRight: 'ICP1 · Beauty & Wellness',
    tiers: [
      { tier: 1, tag: 'T1', label: 'Active', widthPct: 9, count: 12 },
      { tier: 2, tag: 'T2', label: 'Light', widthPct: 26, count: 34 },
      { tier: 3, tag: 'T3', label: 'Dormant', widthPct: 65, count: 86 },
    ] as AuxTier[],
  },
}

// ─── AI Mirror (section 07 static deep dive) ───

export type MirrorSegment = { text: string; flag?: boolean }

export type MirrorSource = {
  name: string
  detail: string
  weight: number
  tone: 'primary' | 'negative' | 'neutral'
}

export const aiMirror = {
  sectionLabel: '07 · Inside the AI Mirror',
  headline: { before: 'See what the ', italic: 'agents', after: ' say. See where they got it.' },
  lede:
    'The first impression most B2B buyers form is a paragraph an LLM writes about you. We read every word, trace every source, and fix what\'s off.',
  demoHeader: 'era / ai-mirror / helix-ops.com',
  queryLabel: 'Buyer query',
  query:
    '"How does Helix Ops compare to other platforms for mid-market B2B revenue teams?"',
  responseLabel: 'Synthesized response · ChatGPT, Claude, Perplexity',
  response: [
    [
      {
        text:
          'Helix Ops is a mid-market revenue operations platform competing primarily with Clari and Gong. Reviews on G2 and TrustRadius indicate strong satisfaction with the analytics engine.',
      },
    ],
    [
      { text: 'Users consistently flag implementation complexity', flag: true },
      { text: ' and longer onboarding than competitors, particularly below 200 seats.' },
    ],
    [
      { text: 'Glassdoor reviews suggest growing pains in customer success', flag: true },
      { text: ', with three of the last ten reviews citing understaffing.' },
    ],
    [
      {
        text:
          'For buyers prioritizing depth of analytics, Helix rates highly. For buyers needing quick time-to-value, ',
      },
      { text: 'alternatives are typically faster to deploy', flag: true },
      { text: '.' },
    ],
  ] as MirrorSegment[][],
  sourcesTitle: 'What fed this answer',
  sources: [
    { name: 'G2 reviews', detail: '2,847 reviews · 4.2 avg', weight: 28, tone: 'primary' },
    { name: 'Glassdoor', detail: '3.2 avg · themes: pace, CS', weight: 19, tone: 'negative' },
    { name: 'Competitor comparison pages', detail: 'Clari, Gong, Aviso', weight: 17, tone: 'primary' },
    { name: 'helixops.com', detail: 'owned content', weight: 14, tone: 'neutral' },
    { name: 'Reddit, Hacker News', detail: '14 threads, 6 months', weight: 11, tone: 'negative' },
    { name: 'Press and analyst', detail: 'Forrester, TechCrunch', weight: 7, tone: 'primary' },
  ] as MirrorSource[],
  gap: {
    owned: { label: 'What your site says', quote: '"The fastest-to-value revenue platform."' },
    actual: { label: 'What the AI concludes', quote: '"Deep analytics, slow to deploy."' },
  },
}

// ─── Integrations ───

export const integrations = {
  sectionLabel: '08 · The stack we operate',
  headline: { before: 'We integrate with the tools ', italic: 'you already have.', after: '' },
  note: "The licenses are commodity. The operating layer is what you're paying for.",
  closer: "If we don't integrate with it yet, we build the bridge.",
  columns: [
    { category: 'Enrichment & intent', tools: ['Clay', 'Apollo', 'Unify', 'HockeyStack'] },
    { category: 'CRM', tools: ['HubSpot', 'Copper', 'Day.ai'] },
    { category: 'Outreach', tools: ['Reply', 'Salesforge', 'Dripify'] },
    { category: 'Automation', tools: ['Zapier', 'Custom pipes'] },
  ],
}

// ─── Halo ───

export const halo = {
  sectionLabel: '09 · The productized surface',
  headline: 'Halo.',
  subtitle: 'The LinkedIn operating layer',
  tagline: 'The operating layer for executive presence on LinkedIn.',
  sideBody: [
    'Halo plugs one executive, or a whole GTM team, into the Signal River and Signal Map. Voice discovery builds the content engine. Warmth scoring triggers the outreach. Every post and every DM is operated by ERA.',
    'Standalone. Or the first surface of the full system.',
  ],
  features: [
    {
      num: '01',
      heading: 'Voice-tuned, not ghostwritten.',
      body:
        "Your voice trained into the content engine. Not a contractor's best guess. Every post reads like you wrote it, because the model did.",
    },
    {
      num: '02',
      heading: 'Plugged into the Signal River.',
      body:
        'Every post, every DM, every comment is triggered by real buyer signals. Not a content calendar. Not a posting schedule.',
    },
    {
      num: '03',
      heading: 'Operated, not advised.',
      body:
        'Weekly output. Monthly scoring. Quarterly review. You approve, we ship. No training programs, no "best practices" decks.',
    },
  ],
  price: 'From $999/mo',
  duration: 'ongoing',
  priceNote: 'Scope varies by team size.',
  cta: { label: 'See if Halo fits', href: '#entry' } as CtaLink,
}

// ─── What to Expect ───

export const expect = {
  sectionLabel: '10 · What to expect',
  headline: { before: 'The return in month ten is ', italic: 'structurally different', after: ' from month three.' },
  sub: "This is infrastructure, not a sprint. The system compounds. Here's what the first year actually looks like.",
  markers: ['Months 1 – 2', 'Months 3 – 4', 'Months 5 – 12+'],
  phases: [
    {
      label: 'Phase 1',
      name: 'Design + Install',
      months: 'Months 1–2',
      desc:
        'Signal architecture defined by week two. First outreach live by week three. Measurable activity before month two ends.',
    },
    {
      label: 'Phase 2',
      name: 'First Results',
      months: 'Months 3–4',
      desc:
        'Pipeline moves. Stalled deals re-engage. The signal library is fully active. This is the minimum window. Most clients know what they have by month four.',
    },
    {
      label: 'Phase 3',
      name: 'Infrastructure Compounds',
      months: 'Months 5–12+',
      desc:
        'The relationship database deepens. Referral loops activate. Warm pipeline grows without added spend. The return in month ten is structurally different from month three.',
    },
  ],
  closer: 'Compounding, not linear.',
}

// ─── Clients ───

export type ClientCard = {
  name: string
  title: string
  plays: string
  quote: string
  quoteIsPlaceholder?: boolean
}

export const clients = {
  sectionLabel: '11 · Who trusts us',
  headline: { before: 'The people we work ', italic: 'with.', after: '' },
  items: [
    {
      name: 'Stephen Roesler',
      title: 'FOUNDER, CEO · MINIAC',
      plays: 'Signal River · AUX · Halo',
      quote:
        '"They built the content engine and signal system. I stopped running cold outbound and started operating on warmth."',
    },
    {
      name: 'Ron Carucci',
      title: 'CO-FOUNDER · NAVALENT',
      plays: 'Signal River · AUX · Signal Map',
      quote:
        '"ERA took 7,800 unsegmented contacts and turned them into a tiered champion network. The difference is operational, not cosmetic."',
    },
    {
      name: 'Brian Gonsalves',
      title: 'HEAD OF GROWTH · NETRUSH',
      plays: 'Halo · Signal Map · AI Mirror',
      quote: '[Real quote pending · pull from current case material.]',
      quoteIsPlaceholder: true,
    },
    {
      name: 'Nate Houghton',
      title: 'HEAD OF REVENUE · LORIKEET',
      plays: 'AI Mirror · AUX · Signal Map',
      quote: '[Real quote pending · pull from current case material.]',
      quoteIsPlaceholder: true,
    },
  ] as ClientCard[],
}

// ─── Engage (pricing tiers) ───

export type Tier = {
  name: string
  subtitle?: string
  price: string               // primary price, bold
  duration?: string           // "one-time" | "ongoing" | null — rendered with same weight as price
  time?: string               // delivery window, muted (e.g. "14 days")
  priceIsInquire?: boolean
  desc: string
  descSupplement?: string     // optional second line for tiers that need extra clarity
}

export const engage = {
  sectionLabel: '12 · Engage',
  headline: { before: 'Four ways ', italic: 'in.', after: '' },
  note: "Most start with the audit. We'll tell you within 48 hours which one fits.",
  tiers: [
    {
      name: 'Revenue Signal Audit',
      subtitle: 'THE DIAGNOSTIC',
      price: '$15,000',
      duration: 'one-time',
      time: '14 days',
      desc:
        'A diagnostic against the new playbook. See where you stand and what to change first. Includes GTM strategy and playbook, delivered as a written deliverable.',
    },
    {
      name: 'Halo',
      subtitle: 'THE LINKEDIN OPERATING LAYER',
      price: 'From $999/mo',
      duration: 'ongoing',
      desc: 'Voice-tuned content and signal-triggered outreach, operated on LinkedIn.',
    },
    {
      // TODO: confirm Signal Only duration tag (open in v7 spec). Pricing
      // screenshot shared by Justin shows $8.5K/mo with 3-month minimum; v7
      // spec writes "By engagement". Using v7 spec wording pending confirmation.
      name: 'Signal Only',
      subtitle: 'INTEL + WEEKLY REVIEW',
      price: 'By engagement',
      priceIsInquire: true,
      duration: 'ongoing',
      desc:
        'Signal River and AUX, delivered with weekly analyst review. Your team acts on what we surface.',
    },
    {
      name: 'The System',
      subtitle: 'THREE PRICING TIERS TO MEET YOUR NEEDS',
      price: 'From $15,000/month',
      duration: 'ongoing',
      desc:
        'Strategy and execution. We design the playbook and operate it for you.',
    },
  ] as Tier[],
}

// ─── Fit ───

export const fit = {
  sectionLabel: '13 · Fit',
  headline: { before: 'Who this is ', italic: 'for.', after: '' },
  forItems: [
    'B2B companies between $10M and $100M',
    'Founders, CGOs, CMOs, VPs of sales and marketing',
    'Pipelines that are plateauing or thinning at the top',
    'Leaders ready to replace old tools and reassign headcount',
  ],
  notForItems: [
    'B2C',
    'Companies under $5M',
    'Teams shopping for a content agency',
    'Leaders looking to add one more thing on top',
  ],
}

// ─── Founder ───

export const founder = {
  sectionLabel: '14 · Who runs it',
  headline: { before: 'Justin Marshall. ', italic: 'Twenty years in direct response.', after: '' },
  imageAlt: 'Justin Marshall',
  // TODO: add a real photograph of Justin to /public and update imageSrc.
  imageSrc: '',
  body:
    'Justin ran enterprise accounts at a major direct marketing agency for two decades, back when marketing was measured by how many envelopes got opened. Every buyer interaction in 2026 is still direct response. ERA applies that lens to the current market.',
  advisors: [
    { name: 'Ron Carucci', role: 'Co-founder, Navalent' },
    { name: 'Ryan Hammill', role: 'Former CMO' },
  ],
}

// ─── Close ───

export const close = {
  headline: { before: 'See what your ', italic: 'buyers see.', after: '' },
  cta: { label: 'Start with an audit', href: '#entry' } as CtaLink,
}

export const footer = {
  columns: [
    {
      heading: 'The System',
      items: [
        { label: 'Signal River', href: '#system' },
        { label: 'Signal Map', href: '#signal-map' },
        { label: 'AUX', href: '#aux' },
        { label: 'AI Mirror', href: '#mirror' },
      ],
    },
    {
      heading: 'Engage',
      items: [
        { label: 'Halo', href: '#halo' },
        { label: 'Audit', href: '#entry' },
        { label: 'Architecture', href: '#entry' },
        { label: 'Operations', href: '#entry' },
      ],
    },
    {
      heading: 'Company',
      items: [
        { label: 'About', href: '#' },
        { label: 'Writing', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  ],
  copyright: '© 2026 Department of Loyalty LLC · Bainbridge Island, WA',
}
