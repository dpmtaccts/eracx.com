// All copy for the /v2 operating-system page.
// Edit strings here; components read from this module.

export type CtaLink = { label: string; href: string }

// v8 delta item 30: six standalone destinations, no hash anchors.
// All six resolve to their own routes. /why-era, /free-tools, /contact
// are round-4 stubs and render a placeholder until copy lands.
export const nav = {
  links: [
    { label: 'Why Era', href: '/why-era' },
    { label: 'GTM Design', href: '/gtm-design' },
    { label: 'Halo', href: '/halo' },
    { label: 'Free Tools', href: '/free-tools' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Contact', href: '/contact' },
  ] as CtaLink[],
  cta: { label: 'Request an audit', href: '#entry' } as CtaLink,
}

// ─── Proof strip (sits between Hero and Ghost) ───

export type ProofColumn = {
  descriptor: string
  outcome: string
  detail: string
  // Lucide icon name. Component resolves the icon at render.
  icon: 'TrendingUp' | 'Users' | 'Target' | 'Repeat' | 'Signal' | 'CircleDashed'
  isPlaceholder?: boolean
}

export const proofStrip: { columns: ProofColumn[] } = {
  columns: [
    {
      descriptor: 'SAAS TALENT MARKETPLACE',
      outcome: '$2M',
      detail: 'in new pipeline · under 4 months',
      icon: 'TrendingUp',
    },
    {
      // TODO: confirm outcome from Netrush or Navalent engagement.
      descriptor: 'OUTCOME 2',
      outcome: '—',
      detail: 'pending · quantified outcome + time-to-result',
      icon: 'CircleDashed',
      isPlaceholder: true,
    },
    {
      // TODO: confirm outcome from Miniac or Seismic engagement.
      descriptor: 'OUTCOME 3',
      outcome: '—',
      detail: 'pending · quantified outcome + time-to-result',
      icon: 'CircleDashed',
      isPlaceholder: true,
    },
  ],
}

export const hero = {
  headline: { before: 'The modern B2B playbook. ', italic: 'Run for you.', after: '' },
  sub: 'ERA operates the signals, scoring, and outreach that shape how buyers decide before they ever contact your team.',
  primary: { label: 'Build your new playbook', href: '#entry' } as CtaLink,
  secondary: { label: 'Request an audit', href: '#entry' } as CtaLink,
  clientsLabel: 'TRUSTED BY',
  clients: ['Netrush', 'POP', 'Miniac', 'Navalent', 'Seismic'],
  pillars: [
    'AI-driven signals and buying intent data',
    'Automated outreach and follow-up sequences',
    'Real-time sales intelligence and alerts',
    'Proven playbooks, already loaded',
    'A team of GTM leaders running all of it',
  ],
}

// v8: Ghost + Stats collapsed into a single Intro section.
export const intro = {
  sectionLabel: "The decision you don't see",
  headline: 'Meet the new growth playbook.',
  body: [
    'Most B2B decisions form before a vendor is ever contacted.',
    'Buyers evaluate in the background, across AI, reviews, peer networks.',
    'The meeting is the last step, not the first.',
  ],
  stats: [
    {
      value: '95%',
      text: 'of B2B deals go to a vendor already on the Day One shortlist.',
      source: '6sense · 2025',
    },
    {
      value: '94%',
      text: 'of buyers research with AI before contacting a vendor.',
      source: 'Forrester · 2026',
    },
    {
      value: '22',
      text: 'people on the average buying committee.',
      source: 'Forrester · 2026',
    },
  ],
}

export const playbook = {
  sectionLabel: 'Two playbooks',
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

// ─── Loops (section 03 — the new v8 centerpiece) ───

export type LoopStage = {
  name: string
  lede: string
  body: string
}

// v8 delta: stage groups for the detail-panel eyebrow.
// Working assumption pending Justin confirmation:
//   1-3 Detect / Enrich / Score → "Connect"
//   4-6 Reach / Respond / Nurture → "Build Trust"
//   7-9 Close / Retain / Expand → "Grow"
export const loops = {
  sectionLabel: 'The new playbook',
  headline: { before: 'Run loops, not ', italic: 'campaigns.', after: '' },
  lede: 'Every play is designed to generate a new signal.',
  hint: 'Explore each stage',
  footerLine: 'Operational in week three. From there, the loop runs.',
  cta: { label: 'Build your new playbook', href: '#entry' } as CtaLink,
  // Auto-cycle retired per v8 delta item 4. Hover-reveal only.
  autoCycleMs: 0,
  stageGroup: ['Connect', 'Connect', 'Connect', 'Build Trust', 'Build Trust', 'Build Trust', 'Grow', 'Grow', 'Grow'] as const,
  stageIcon: ['Radar', 'Database', 'Gauge', 'Send', 'MessageCircle', 'Sprout', 'CircleCheck', 'RefreshCw', 'TrendingUp'] as const,
  stages: [
    {
      name: 'Detect',
      lede: 'Signals the moment a buying window opens.',
      body:
        'Exec hires, funding rounds, tech installs, hiring bursts. The real intent, before the form fill.',
    },
    {
      name: 'Enrich',
      lede: 'Adds the context that makes a signal actionable.',
      body:
        'ICP fit, role, team shape, tech stack. Every signal arrives scored and routed.',
    },
    {
      name: 'Score',
      lede: 'Ranks every account by warmth and readiness.',
      body: 'Fit. Wallet. Readiness. One composite, updated as signals land.',
    },
    {
      name: 'Reach',
      lede: 'Opens the first conversation on the right channel.',
      body:
        'LinkedIn, email, voice note. The opening tuned to the role and the moment.',
    },
    {
      name: 'Respond',
      lede: 'Closes the loop on every buyer action.',
      body:
        'A reply, a visit, a webinar attend. Each one triggers the next move, without waiting on a rep to remember.',
    },
    {
      name: 'Nurture',
      lede: 'Keeps the relationship warm between deals.',
      body:
        'Signal-triggered content. Not a drip. Every touch is a response to something the buyer actually did.',
    },
    {
      name: 'Close',
      lede: 'Gets the committee to consensus.',
      body:
        'Deal stall detection. Champion maps. Committee alignment plays that run whether the rep is watching or not.',
    },
    {
      name: 'Retain',
      lede: 'Keeps closed accounts confident and expanding.',
      body:
        'Post-close warmth tracking. Usage signals. The moment confidence drops, we know.',
    },
    {
      name: 'Expand',
      lede: 'Turns retention into referral and new pipeline.',
      body:
        'Champion job changes. NPS replies. The compounding layer. A closed account becomes three open ones.',
    },
  ] as LoopStage[],
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
  sectionLabel: 'The Signal River',
  headline: { before: 'Every signal ', italic: 'we watch.', after: '' },
  note:
    'Thirty active signal types across intent, relationship, product, and pipeline. Each one fires a specific outcome, on a specific cadence, through a specific stack.',
  countLabel: '24 of 47 signals shown.',
  countMeta: 'THE FULL LIBRARY SHIPS WITH EVERY AUDIT',
  closer: '',
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
  sectionLabel: 'Signal Map',
  headline: {
    before: 'Every signal becomes a move. Every move ',
    italic: 'feeds the next one.',
    after: '',
  },
  note: 'A sample of signals driving action today for a live client.',
  columns: { signal: 'Signal', play: 'Outcome', priority: 'Priority' },
  rows: [
    {
      signal: { primary: 'Exec hire at target account', meta: 'CRUNCHBASE · LINKEDIN' },
      play: { primary: '+1 exec relationship engaged within 72 hours', meta: 'SIGNAL CHAIN · 72HR' },
      score: 92,
    },
    {
      signal: { primary: 'Funding round announced', meta: 'APOLLO · PRESS' },
      play: { primary: 'Account reprioritized · 3 new touches queued', meta: 'AUX · REPLY · 5D' },
      score: 88,
    },
    {
      signal: { primary: 'Deal stalls 30 days', meta: 'HUBSPOT' },
      play: { primary: '+3 committee roles engaged · deal restarted', meta: 'SIGNAL CHAIN · CRM · 48HR' },
      score: 78,
    },
    {
      signal: { primary: 'Champion changes jobs', meta: 'LINKEDIN' },
      play: { primary: 'New account opened · warm intro carried over', meta: 'HALO · SIGNAL CHAIN · 1WK' },
      score: 71,
    },
    {
      signal: { primary: 'Customer hits 90 days post-close', meta: 'CRM' },
      play: { primary: 'Expansion conversation booked', meta: 'LOYALTY LOOP · 24HR' },
      score: 64,
    },
  ] as SignalMapRow[],
  caption: 'Live sample · 5 of 47 active rules · Score reflects buyer readiness',
}

// ─── AUX (section 06 deep dive) ───

export type AuxActivity = {
  // Redacted treatment blurs `person` text (name + role) at render. Kept
  // as realistic placeholder strings for visual weight.
  person: string
  detail: string
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
  sectionLabel: 'Inside AUX',
  headline: {
    before: 'Build the ',
    italic: 'relationship infrastructure.',
    after: ' Measured daily.',
  },
  note:
    'Campaigns are one execution. The relationship is the asset. ERA builds the infrastructure, scores every account, and tracks the whole system daily.',
  redactionNote: 'Names redacted · real client data',
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
      { person: 'Sarah Chen · Economic Buyer', detail: 'LinkedIn connect accepted', points: '+10', time: '2d', tone: 'primary' },
      { person: 'Marcus Johnson · Champion', detail: 'Content download · Q4 Trends Report', points: '+12', time: '5d', tone: 'primary' },
      { person: 'Amy Liu · Technical Evaluator', detail: 'Email reply · positive sentiment', points: '+8', time: '7d', tone: 'warm' },
      { person: 'Jordan Taylor · Executive Sponsor', detail: 'Webinar attended · AI in FinTech', points: '+15', time: '11d', tone: 'cool' },
    ] as AuxActivity[],
  },
}

// ─── AI Mirror (section 07 static deep dive) ───

export type MirrorSegment = { text: string; flag?: boolean }

// v8 delta item 21 + 33g: sources render as icon/logo + name + detail.
// The scored-weight bar from v7 is retired; the UNLIKELY SOURCE magenta
// tag is also retired per 33g — every source is now a standard row.
export type MirrorSource = {
  // Either a Lucide icon name or a logo src from /public/images/.
  iconName?: 'globe' | 'newspaper'
  logoSrc?: string
  name: string
  detail: string
}

export const aiMirror = {
  sectionLabel: 'Inside the AI Mirror',
  headline: {
    before: 'See what the ',
    italic: 'agents',
    after: ' say. See where they got it.',
  },
  lede:
    "The first impression most B2B buyers form is a paragraph an LLM writes about you. We read every word, trace every source, and fix what's off.",
  framing:
    "The 22 people on the buying committee are hearing about you from sources you don't own.",
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
  sourcesSubtitle: 'SOURCES',
  inputPlaceholder: 'Ask a buyer question...',
  sendLabel: 'Send',
  // v8 delta item 21 + 33g: icon/logo-first source list. UNLIKELY SOURCE
  // magenta flag retired — Glassdoor and the other rows render neutral.
  sources: [
    { iconName: 'globe', name: 'helixops.com', detail: 'Company website' },
    {
      iconName: 'newspaper',
      name: 'Press & analyst coverage',
      detail: 'TechCrunch, Forrester, Business Insider',
    },
    { logoSrc: '/images/g2.svg', name: 'G2', detail: '127 reviews, 4.3 avg rating' },
    {
      logoSrc: '/images/glassdoor_logo_icon_171086.png',
      name: 'Glassdoor',
      detail: 'Employee sentiment, 3.9 rating',
    },
    { logoSrc: '/images/gong.svg', name: 'Gong', detail: 'Sales intelligence' },
    { logoSrc: '/images/clari.png', name: 'Clari', detail: 'Revenue intelligence' },
    { logoSrc: '/images/aviso.png', name: 'Aviso', detail: 'Forecasting intelligence' },
  ] as MirrorSource[],
  gap: {
    owned: { label: 'What your site says', quote: '"The fastest-to-value revenue platform."' },
    actual: { label: 'What the AI concludes', quote: '"Deep analytics, slow to deploy."' },
  },
}

// ─── Integrations ───

// ─── Audit (section 08 · Start here — new in v8) ───

export type AuditLoop = 'connection' | 'trust' | 'loyalty'

export type AuditShot = {
  src: string
  alt: string
  clientName: string
  domain: string
  tierBadge: string       // e.g. "T1 · DIAGNOSTIC"
  loopTag: string         // e.g. "CONNECTION LOOP"
  loop: AuditLoop
  pullMetric: { value: string; label: string }
  finding: string         // one-line closing finding
}

export const audit = {
  sectionLabel: 'Start here',
  headline: {
    before: 'AI and automation without strategy is ',
    italic: 'noise.',
    after: '',
  },
  lede:
    'Every company is stacking AI. The ones winning are starting with the playbook. The GTM audit is 14 days. You leave with a scored gap analysis, a new playbook, and a 90-day operating plan.',
  caption: "These are from audits we've delivered. Yours would look like this, scored against your stack.",
  cta: { label: 'Get your audit', href: '#entry' } as CtaLink,
  // TODO: confirm loop tag for each client audit with Justin. Current
  // mapping is a best-guess placeholder: Navalent → Connection (relationship
  // acquisition diagnostic), BetterUp → Trust (committee engagement), third
  // audit → Loyalty.
  shots: [
    {
      src: '/images/audit_screenshots/convictioncascade.png',
      alt: 'Sample audit · conviction cascade view (anonymized)',
      clientName: 'Anonymized · Leadership Advisory',
      domain: 'navalent-style-engagement',
      tierBadge: 'T1 · DIAGNOSTIC',
      loopTag: 'CONNECTION LOOP',
      loop: 'connection',
      pullMetric: { value: '7,800', label: 'CONTACTS ENRICHED' },
      finding:
        'The CRM has a strong foundation. Now it needs to tell you what to do next.',
    },
    {
      src: '/images/audit_screenshots/dashboard.png',
      alt: 'Sample audit · dashboard view (anonymized)',
      clientName: 'Anonymized · Coaching Platform',
      domain: 'betterup-style-engagement',
      tierBadge: 'T1 · DIAGNOSTIC',
      loopTag: 'TRUST LOOP',
      loop: 'trust',
      pullMetric: { value: '14/48', label: 'COMMITTEE ROLES' },
      finding:
        'Deals stall mid-committee. The trust loop rebuilds pressure at every stage.',
    },
    {
      src: '/images/audit_screenshots/agentic.png',
      alt: 'Sample audit · agentic visibility view (anonymized)',
      clientName: 'Anonymized · RevOps SaaS',
      domain: 'loyalty-style-engagement',
      tierBadge: 'T1 · DIAGNOSTIC',
      loopTag: 'LOYALTY LOOP',
      loop: 'loyalty',
      pullMetric: { value: '+3x', label: 'EXPANSION PIPELINE' },
      finding:
        'The customer base is the next growth engine. The loyalty loop operates it.',
    },
  ] as AuditShot[],
}

export type IntegrationTool = {
  name: string
  src?: string  // logo path; falls back to text if absent
}

export const integrations = {
  sectionLabel: 'The stack we operate',
  headline: { before: 'Built to ', italic: 'maximize outcomes.', after: '' },
  note:
    'These are the tools we use and integrate. ERA is the operating layer between them and your revenue.',
  closer: "If we don't integrate with it yet, we build the bridge.",
  // v8 delta item 8: real logos from /public/images/apps/. "Custom pipes"
  // has no logo; rendered as text. Text-only fallbacks allowed per-tool.
  tools: [
    { name: 'Clay', src: '/images/apps/68dd418739aadd6263219522_clay-logo.png' },
    { name: 'Apollo', src: '/images/apps/Apollo.Io-Logo-Vector.svg-.png' },
    { name: 'Unify', src: '/images/apps/67d87bbaa7748700619e5277_Unify.png' },
    { name: 'HockeyStack', src: '/images/apps/hockeystack-logo-new.png' },
    { name: 'HubSpot', src: '/images/apps/hubspot-inc-business-logo-inbound-marketing-portable-network-graphics-business.jpg' },
    { name: 'Copper', src: '/images/apps/383-3835182_icon-logo-dark-copper-copper-crm-logo-hd.png.jpeg' },
    { name: 'Day.ai', src: '/images/apps/dayai-black.svg' },
    { name: 'Zapier', src: '/images/apps/zapier-logo-VY4evj0B.jpg' },
    { name: 'Claude', src: '/images/apps/Claude_AI_logo.svg.png' },
    { name: 'Reply', src: '/images/apps/reply_company_logo_5a3ec05946.png' },
    { name: 'Salesforge', src: '/images/apps/Salesforge-Logo-PNG-SVG-Vector-01-300x300.png' },
    { name: 'Custom pipes' },
  ] as IntegrationTool[],
}

// ─── Halo ───

export const halo = {
  sectionLabel: 'The productized surface',
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
        'Output ships weekly, the system gets scored monthly, and strategy gets reviewed every quarter. You approve each delivery and we run the play. We do not sell training programs or best-practices decks.',
    },
  ],
  price: 'From $999/mo',
  duration: 'ongoing',
  priceNote: 'Scope varies by team size.',
  cta: { label: 'See if Halo fits', href: '#entry' } as CtaLink,
  // v8 delta item 10: bento layout. [0] = main large tile (2/3 width),
  // [1] + [2] = stacked secondary tiles (1/3 width each, half height).
  screenshots: [
    { src: '/images/halo_screenshots/dashboard.png', alt: 'Halo · dashboard view' },
    { src: '/images/halo_screenshots/engagement.png', alt: 'Halo · engagement view' },
    { src: '/images/halo_screenshots/score.png', alt: 'Halo · warmth score view' },
  ],
  linkedinLogo: '/images/apps/LinkedIn_logo_initials.png',
}

// ─── What to Expect ───

export const expect = {
  sectionLabel: 'What to expect',
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

// v8 delta item 26: Clients 2x2 grid replaced with two testimonial cards.
export type Testimonial = {
  stars: number
  quote: string
  photo: string
  photoAlt: string
  name: string
  role: string
  companyLogo: string
  companyLogoAlt: string
}

export const clients = {
  sectionLabel: 'Clients',
  headline: { before: 'Leaders talking about ', italic: 'the work.', after: '' },
  sub: "Two leaders who've seen the system run inside their companies.",
  items: [
    {
      stars: 5,
      quote:
        'Justin builds the thing most consultants just talk about. Actual operational systems. Scoring, enrichment, sequencing, CRM. When he hands it off, your team can run it.',
      photo: '/images/betterup/nathaniel-houghton.jpeg',
      photoAlt: 'Nate Houghton',
      name: 'Nate Houghton',
      role: 'Head of Sales, Americas',
      companyLogo: '/images/navalent/Lorikeet_logo_color.png',
      companyLogoAlt: 'Lorikeet',
    },
    {
      stars: 5,
      // TODO: confirm with Justin whether (a) Lara approved this ERA-adapted
      // quote or it needs a refresh, and (b) which affiliation ships —
      // historical Publicist (when the work happened) or current Assemble.
      quote:
        'Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, customer success, and account management.',
      photo: '/images/lara-vandenberg.jpeg',
      photoAlt: 'Lara Vandenberg',
      name: 'Lara Vandenberg',
      role: 'Founder, Publicist',
      companyLogo: '/assets/clients/publicist.png',
      companyLogoAlt: 'Publicist',
    },
  ] as Testimonial[],
}

// ─── Engage (pricing tiers) ───

// v8 delta item 33j: 2x2 pricing card grid. Each card carries its own
// descriptor, price, summary, and CTA. The Revenue Signal Audit card is
// the recommended tier — magenta top border + recommended label + magenta
// CTA fill. Feature bullets are BLOCKED pending finalization from Justin;
// cards render without the bullet row until `features` is populated.
export type Tier = {
  name: string
  descriptor: string               // mono uppercase 11px 0.25em tracking
  price: string                    // Instrument Sans 700 32px Deep Steel
  timing?: string                  // mono subtext below price (e.g. "· ongoing", "· 14 days")
  summary: string                  // 14px body
  features?: string[]              // 3-4 short bullets. Empty = skip bullet row.
  cta: { label: string; href: string }
  recommended?: boolean            // Revenue Signal Audit
}

export const engage = {
  sectionLabel: 'Engage',
  headline: { before: 'Four ways ', italic: 'in.', after: '' },
  note: "Most start with the audit. We'll tell you within 48 hours which one fits.",
  fitLine:
    'Built for B2B companies $10M to $100M. Not for B2C, companies under $5M, or teams shopping for a content agency.',
  tiers: [
    {
      name: 'Halo',
      descriptor: 'THE LINKEDIN OPERATING LAYER',
      price: 'From $999/mo',
      timing: '· ongoing',
      summary:
        'Voice-tuned content and signal-triggered outreach, operated on LinkedIn.',
      features: [],  // TODO (Justin): finalize 3 bullets for Halo card
      cta: { label: 'See if Halo fits', href: '/halo' },
    },
    {
      name: 'Revenue Signal Audit',
      descriptor: 'THE DIAGNOSTIC · 14 DAYS',
      price: '$15,000',
      timing: '· one-time',
      summary:
        'A diagnostic against the new playbook. See where you stand and what to change first. Includes GTM strategy and playbook, delivered as a written deliverable.',
      features: [],  // TODO (Justin): finalize 3 bullets for the recommended card
      cta: { label: 'Get your audit', href: '#close' },
      recommended: true,
    },
    {
      name: 'Signal Only',
      descriptor: 'INTEL + WEEKLY REVIEW',
      price: 'By engagement',
      timing: '· ongoing',
      summary:
        'Signal River and AUX, delivered with weekly analyst review. Your team acts on what we surface.',
      features: [],  // TODO (Justin): finalize 3 bullets for Signal Only card
      cta: { label: 'Start signal intake', href: '#close' },
    },
    {
      name: 'The System',
      descriptor: 'THREE PRICING TIERS TO MEET YOUR NEEDS',
      price: 'From $15,000/month',
      timing: '· ongoing',
      summary:
        'Strategy and execution. We design the playbook and operate it for you.',
      features: [],  // TODO (Justin): finalize 3 bullets for The System card
      cta: { label: 'Start the conversation', href: '#close' },
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

// v8 delta item 24 (revised): homepage Founder slot becomes a leader-bench
// credibility block. Terminology matters here — ERA *operates*, but the
// homepage block refers to *leaders* (GTM executives, founders, business
// leaders), not operators. Keep that distinction consistent.
export const founder = {
  sectionLabel: 'Who runs it',
  headline: {
    before: 'Decades of ',
    italic: 'growth,',
    after: ' now built into one system.',
  },
  lede:
    "ERA is built by GTM executives, business leaders, and founders with decades of experience across Fortune 500 enterprises. We've led the data-driven growth programs at some of the largest B2B companies in the world. Now we operate that experience as a system inside yours.",
  credentialsLabel: 'Led growth at:',
  credentials: [
    { name: 'Microsoft', src: '/images/navalent/microsoft.png' },
    { name: 'Chase', src: '/images/navalent/chase-logo.png' },
    { name: 'P&G', src: '/images/navalent/P&G_logo 1.png' },
    { name: 'IHG', src: '/images/navalent/InterContinental_Hotels_Group.svg 1.png' },
    { name: 'Amazon', src: '/images/navalent/Amazon_logo.svg 1.png' },
    // TODO: source Intel logo asset. Rendering as text until file lands.
    { name: 'Intel', src: '' },
    { name: 'T-Mobile', src: '/images/navalent/tmobile.png' },
  ],
  cta: { label: 'Read our approach', href: '/our-story' } as CtaLink,
}

// v8 delta item 25: dedicated /our-story page.
// Copy status:
//   - preamble: TODO — Justin's "Hey there" short founder-voice intro
//   - manifesto: TODO — full "On Focus" essay body
//   - profiles: Justin confirmed; Jen Anderson placeholder, confirm before
//     flipping the feature flag.
export const ourStory = {
  // v8 delta item 25: preamble renders as italic serif. Each array entry is
  // a paragraph so the note reads with vertical rhythm, not a single block.
  preamble: {
    body: [
      'Hey there,',
      'Thanks for being here.',
      'I want to set expectations early.',
      'Era exists for one reason: the relationships that matter most to your growth are the ones you keep meaning to follow up on.',
      "Between the meetings you didn't plan, the priorities that shift by Wednesday, and the conversations that pile up in a founder's week, something always gives. Usually it's the follow-up.",
      "Most GTM tools assume you'll stop what you're doing, open a dashboard, and run the play. That rarely happens.",
      "Era is built to work when you're busy.",
      'We run the system. You keep the focus.',
      "It's more than a tool, not another platform to babysit, and just a reliable way to make sure the right people keep hearing from you, even when you're not thinking about them.",
      "If Era does its job, you'll notice one thing first: you're back to doing the work only you can do.",
      "That's the goal.",
    ],
    signature: 'Justin',
  },
  manifesto: {
    eyebrow: 'On Focus',
    body: [
      "The best leaders I've ever worked with share one trait: ruthless about what they don't do.",
      'It\'s infuriating how they say "No," to the meeting that could be an email. "No," to the introduction that goes nowhere. "No," to the conference, the panel, the offsite that everyone else wants an invite to, unless it serves one thing: the objective. They say "No," because they\'ve raised their floor. And because they say no to almost everything, when they say, "Yes," it means something.',
      "We built Era to work alongside those people. Leaders who know exactly what they're building and who they're building it for. Executives who wake up thinking about their product, their team, their customers.",
      'They are missional. And that focus is what makes them great.',
      'Our job is to protect it.',
      "If you have a good product and a strong sales team, you don't need to spend your time evaluating GTM tools, interviewing BDR candidates, managing CRM workflows, or managing agencies who report on vanity metrics. You need a system that builds and maintains the relationships that matter. One that runs without pulling you into it.",
      "That's what Era is.",
      'We are built on focus. Our playbook is built to connect with real people, in real companies, with real problems that your product actually solves. We build toward that relationship deliberately: from unknown to known, from known to trusted, from trusted to the kind of relationship that generates referrals, expansions, and renewals without anyone having to remember to follow up.',
      'We also believe the best companies know exactly who they serve. Every system we build is designed around that principle. Who are we trying to reach? Who are we building trust with? Who do we want to still be talking to in three years?',
      "Focus isn't a strategy. It's a discipline. And it's the hardest thing to maintain when growth feels urgent.",
      "We use the best in AI and automation to make that discipline scalable. Growth is hard enough. We're not here to make it harder. We're here to make sure the hard work you've already done compounds into something that keeps working.",
      "That's why we built Era.",
    ],
    pullQuotes: [
      'We built Era to work alongside those people.',
      "Focus isn't a strategy. It's a discipline.",
    ],
    signature: { name: 'Justin Marshall', role: 'Founder' },
  },
  whoRunsIt: {
    sectionLabel: 'Who runs it',
    headline: 'The bench behind the system.',
    profiles: [
      {
        enabled: true,
        name: 'Justin Marshall',
        role: 'Founder',
        // TODO: replace with a headshot hosted at /public/images/. bio2.jpg
        // stands in for now since it is the most recent confirmed shot.
        imageSrc: '/images/bio2.jpg',
        imageAlt: 'Justin Marshall',
        credential:
          'Built growth programs across Microsoft, Chase, P&G, IHG, Amazon, Intel, T-Mobile',
        bio:
          'Built ERA to turn decades of enterprise growth experience into a system that runs inside B2B companies.',
      },
      {
        // TODO: confirm Jen Anderson's listing (name, title, credentials, bio,
        // headshot). Render placeholder only until enabled.
        enabled: false,
        name: 'Jen Anderson',
        role: 'Customer Intelligence',
        imageSrc: '',
        imageAlt: 'Jen Anderson',
        credential:
          'Ran Customer Intelligence at T-Mobile. [Other credentials TBD]',
        bio: '[Bio TBD from Jen\'s CV — pending her confirmation for public listing.]',
      },
    ],
    closer:
      'Supported by a bench of GTM leaders and advisors across the US and EU.',
  },
  cta: {
    headline: 'Ready to focus?',
    link: { label: 'Start a conversation', href: '/#close' } as CtaLink,
  },
}

// ─── GTM Design (standalone /gtm-design page) ───

// v8 delta item 30 + round-3 build: copy sourced verbatim from
// "Era — GTM Systems for B2B Companies.pdf" in /docs/v8/. The Three Loops
// (Connection/Trust/Loyalty) section from the PDF is retired per item 27 —
// loop taxonomy is no longer part of the v8 palette or narrative.
export const gtmDesign = {
  hero: {
    eyebrow: 'FIXED-SCOPE GTM SPRINT',
    headline: {
      before: "Your pipeline shouldn't depend on who the ",
      italic: 'founder knows.',
      after: '',
    },
    sub:
      'Set your growth trajectory with a complete go-to-market blueprint, designed for immediate implementation and scale.',
    meta: '3 weeks · 4 deliverables',
    cta: { label: 'Start the conversation', href: '#close' } as CtaLink,
    summaryEyebrow: 'GTM DESIGN',
    summaryLine: '4 deliverables · 3 weeks · fixed scope',
    summaryItems: [
      { num: '01', name: 'PIPELINE MAP', detail: 'Full revenue pipeline, end-to-end' },
      {
        num: '02',
        name: 'ICP + SCORED LIST',
        detail: 'Firmographic, behavioral, relational criteria',
      },
      {
        num: '03',
        name: 'CAMPAIGN ARCHITECTURE',
        detail: 'Channel logic, sequence, and message design',
      },
      { num: '04', name: 'GTM BLUEPRINT DOC', detail: 'Operator-ready system document' },
    ],
  },
  problem: {
    eyebrow: 'The real problem',
    headline: {
      before: "Most B2B companies don't have a go-to-market problem. They have a ",
      italic: 'clarity',
      after: ' problem.',
    },
    sub:
      'GTM Design solves for the three gaps we see in nearly every B2B company between $5M and $50M.',
  },
  gaps: [
    {
      eyebrow: 'SIGNAL-BASED PIPELINE',
      title: 'Pipeline built on signals, not relationships',
      body:
        "Most B2B revenue at the $5–50M stage is driven by founder relationships and referrals. That works — until it doesn't. When those relationships plateau, there's no underlying system to fall back on. The pipeline dries up and nobody knows why.",
      stat: {
        value: '68%',
        line: 'of B2B companies cite pipeline generation as their top growth challenge.',
        source: 'FORRESTER, 2025',
      },
      closer:
        "We map your full pipeline from first signal to closed deal — so growth doesn't depend on who picks up the phone.",
    },
    {
      eyebrow: 'DEFINED ICP + SCORED LIST',
      title: 'ICP defined by criteria, not gut feel',
      body:
        '"Companies like our best customers" is not an ICP. Without defined firmographic, behavioral, and relational criteria, every rep qualifies differently, every campaign targets differently, and nothing compounds. You get inconsistency at scale.',
      stat: {
        value: '22%',
        line: 'of B2B companies say they have a clearly defined and documented ICP.',
        source: 'GARTNER, 2024',
      },
      closer:
        'We define your ICP with scored criteria and deliver a ranked prospect list you can act on the day you receive it.',
    },
    {
      eyebrow: 'CAMPAIGN ARCHITECTURE',
      title: 'Outbound with a map, not just a message',
      body:
        "Most B2B outbound is launched before the pipeline architecture exists. Sequences go out, responses come back, and there's no system to route, score, or prioritize what happens next. Activity without architecture produces noise, not revenue.",
      stat: {
        value: '<5%',
        line: 'of cold outreach gets a response. The volume playbook stopped working.',
        source: 'BELKINS, 2025',
      },
      closer:
        'We design the channel logic, sequence, and message architecture so every touchpoint has a reason and a next step.',
    },
  ],
  deliverables: {
    eyebrow: 'What you get',
    headline: {
      before: 'A complete go-to-market system. Built in ',
      italic: 'weeks',
      after: ', not quarters.',
    },
    sub:
      'GTM Design is a fixed-scope sprint. Four interconnected deliverables that map, define, and sequence your entire revenue motion.',
    items: [
      {
        num: '01',
        title: 'Pipeline Map',
        body:
          'We diagram your full revenue pipeline from first signal to closed deal to expansion motion. Every stage, every handoff, every gap. Most companies have never seen their pipeline drawn end-to-end — this alone changes how leadership thinks about where to invest.',
        meta: 'LIVE SIGNAL FEED FROM SIGNALS.ERACX.COM',
      },
      {
        num: '02',
        title: 'ICP Definition and Scored Prospect List',
        body:
          "We define your Ideal Customer Profile using firmographic, behavioral, and relational criteria — then build a scored prospect list using ERA's FRVRD scoring model (Frequency, Recency, Value, Responsiveness, Density). Delivered as a live, ranked list you can act on immediately, tracked in real time at aux.eracx.com.",
        meta: 'SCORED PROSPECT LIST FROM SIGNALS.ERACX.COM',
      },
      {
        num: '03',
        title: 'Campaign Architecture',
        body:
          'We design the logic for your primary go-to-market motion: which channels, in what sequence, with what message at each stage of the buying journey. Built specifically around your pipeline map and ICP — not adapted from a template.',
        meta: 'CHANNEL · SEQUENCE · MESSAGE',
      },
      {
        num: '04',
        title: 'GTM Blueprint Document',
        body:
          'Everything tied together in a single operator-ready document: ICP criteria, scoring rationale, pipeline stage definitions, campaign sequences, and prioritized next actions. Formatted to hand off to an ops team, a new hire, or inform a full ERA engagement.',
        meta: 'ICP · SCORING · PIPELINE · SEQUENCES · NEXT ACTIONS',
      },
    ],
  },
  engagement: {
    eyebrow: 'How the engagement works',
    headline: 'Three weeks. Three phases. One handoff.',
    phases: [
      {
        num: '01',
        label: 'DIAGNOSTIC',
        when: 'Week 1',
        title: 'Diagnostic Call',
        body:
          "We start by understanding your current revenue motion: what's working, what's stalled, and what's never been built. We map your existing pipeline, gather ICP input from sales and leadership, and identify the highest-leverage design decisions.",
      },
      {
        num: '02',
        label: 'BUILD',
        when: 'Weeks 1–2',
        title: 'Blueprint Build',
        body:
          'We build the four deliverables in sequence — pipeline map first, ICP second, campaign architecture third, blueprint document last. Each informs the next. You receive a draft for review at the midpoint.',
      },
      {
        num: '03',
        label: 'HANDOFF',
        when: 'Week 3',
        title: 'Handoff and Walkthrough',
        body:
          'We deliver the final GTM Blueprint package in a live working session. We walk through each component, answer questions, and document recommended next actions. You leave with a system ready to implement.',
      },
    ],
  },
  fit: {
    eyebrow: 'Who this is for',
    headline: 'Built for B2B companies that have traction but not a system.',
    rangeLabels: ['EARLY', 'GTM DESIGN RANGE', 'ENTERPRISE'],
    rangeMarkers: ['$2M', '$50M'],
    body:
      "GTM Design is designed for B2B companies between $2M and $50M in revenue — past early traction, short of a full growth infrastructure. You have a product that works and customers who bought it. What you don't have is a repeatable, scalable system for finding more of them. This engagement is the architectural starting point.",
    checklistLabel: "YOU'RE A FIT IF…",
    checklist: [
      'Your pipeline is inconsistent quarter to quarter',
      'Your ICP is defined informally or not at all',
      "Outbound exists but isn't producing predictable results",
      "You're preparing for a hiring push and need a system before adding headcount",
      "You've tried tools and tactics but haven't built the underlying architecture",
    ],
  },
  close: {
    headline: 'Ready to build the system?',
    sub: 'GTM Design is a fixed-scope engagement. Delivered in three weeks.',
    cta: { label: 'Start the Conversation', href: '#close' } as CtaLink,
  },
}

// ─── Close ───

export const close = {
  headline: { before: "The pipeline doesn't ", italic: 'build itself.', after: '' },
  sub: 'ERA builds the system that does.',
  conversation: {
    label: 'Start a conversation',
    email: 'hello@eracx.com',
  },
  form: {
    fields: [
      { id: 'name', label: 'Your name', type: 'text', required: true },
      { id: 'company', label: 'Company', type: 'text', required: true },
      { id: 'email', label: 'Work email', type: 'email', required: true },
      { id: 'message', label: 'What are you trying to solve?', type: 'textarea', required: true },
    ] as const,
    submitLabel: 'Send',
  },
  // Legacy CTA kept in case a tile-only variant is needed elsewhere.
  cta: { label: 'Build your new playbook', href: '#entry' } as CtaLink,
}

// v8 delta items 13 + 15: dark-ground 3-row footer, copyright line removed.
export const footer = {
  columns: [
    // v8 delta item 30: footer nav mirrors the six standalone pages.
    {
      heading: 'NAVIGATE',
      items: [
        { label: 'Why ERA', href: '/why-era' },
        { label: 'GTM Design', href: '/gtm-design' },
        { label: 'Halo', href: '/halo' },
        { label: 'Free Tools', href: '/free-tools' },
        { label: 'Our Story', href: '/our-story' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      heading: 'PRODUCTS',
      items: [
        { label: 'AUX', href: '/#aux' },
        { label: 'AI Mirror', href: '/#mirror' },
        { label: 'Signal Map', href: '/#aux' },
        { label: 'Halo', href: '/halo' },
      ],
    },
    {
      heading: 'ENGAGE',
      items: [
        { label: 'Revenue Signal Audit', href: '/#entry' },
        { label: 'The System', href: '/#entry' },
        { label: 'Signal Only', href: '/#entry' },
        { label: 'Halo', href: '/halo' },
      ],
    },
    {
      heading: 'COMPANY',
      items: [
        { label: 'Our Story', href: '/our-story' },
        { label: 'Contact', href: '/contact' },
        { label: 'hello@eracx.com', href: 'mailto:hello@eracx.com' },
      ],
    },
  ],
  tagline: 'The modern B2B playbook, run for you.',
  meta: 'Bainbridge Island, WA',
}
