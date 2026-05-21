/* What Your Buyer Is Actually Seeing — five-stop journey across the GTM
   organization. Population-level analysis from the 21-voice cascade audit
   (see docs/cascade-audit/findings.md). Individual executives appear as
   evidence anchors, not as journey-stop headlines. */

export const SECTION_KICKER = 'What your buyer is actually seeing'
export const SECTION_HEADLINE = 'Your buyer is on LinkedIn right now.'

export const SECTION_SUBHEAD =
  "Not next quarter. Not when sales reaches out. Right now, on a Tuesday morning, between meetings, with a $2M coaching budget question on her plate. She isn't reading your website. She's reading your people, and not the people you'd hope she's reading."

export const SECTION_INTRO =
  "Twenty-one voices across BetterUp's senior leadership, sales and marketing leadership, and senior sellers. Here's the path your buyer walks through your organization on LinkedIn, layer by layer, and what she finds at each stop."

export type EvidenceKind = 'screenshot' | 'population'

export interface JourneyStop {
  number: string
  title: string
  voicesCount: string
  wantsFelt: string
  finds: string
  gap: string
  evidenceKind: EvidenceKind
  evidenceKicker: string
  evidenceImage?: string
  evidenceAlt?: string
  evidenceGloss?: string
  /** Identifier the page-level renderer can branch on for population-view visuals */
  populationViz?: 'gtm-grid' | 'amplification-bars'
}

export const JOURNEY_STOPS: JourneyStop[] = [
  {
    number: '01',
    title: 'What your senior executives are saying',
    voicesCount: 'CEO + C-suite · 8 voices analyzed',
    wantsFelt:
      "Your buyer wants to find a leadership team publicly engaged with the questions she cares about as a CHRO. She's looking for a CEO and C-suite who own a point of view on workforce transformation, AI, leadership development, and human performance.",
    finds:
      'She finds eight C-suite voices producing roughly two to three original posts each in 90 days, most of which amplify Uplift programming or company announcements. The Chief People Officer is the most active voice and the only one engaging with named buyers at scale. The rest of the C-suite is publicly quiet.',
    gap:
      'Cumulatively, eight C-suite voices produce roughly the same content volume in a quarter as one individual creator on LinkedIn does in two weeks. The leaders who should be most visible to the buyer are the least visible.',
    evidenceKind: 'screenshot',
    evidenceKicker: 'WHAT THE BUYER SEES · LAYER 01',
    evidenceImage: '/images/betterup/cascade/crop-a-alexi-departures.png',
    evidenceAlt: 'CEO comment stream showing short congratulations on departures to BCG, IBM, ServiceNow, and Workday',
    evidenceGloss:
      "Graceful, generous, and disproportionate. When most of a CEO's public comment behavior is short congratulations to former employees, the alumni network is visible. The engagement with the buyers he needs to win is not.",
  },
  {
    number: '02',
    title: 'What your sales and marketing leaders are publishing',
    voicesCount: 'Sales, partnerships, marketing leadership · 9 voices analyzed',
    wantsFelt:
      "Your buyer expects to find the people running BetterUp's commercial organization showing up as visible thought partners. She's looking for senior leaders who attend industry events, share what they're hearing from buyers, and give her a reason to take their sales team's call.",
    finds:
      'She finds a leadership layer where most voices are either silent or operating as repost engines for the company page. Original content is rare. Original points of view are rarer. Several senior leaders did not post at all in the 90-day window.',
    gap:
      "The commercial leadership is positioned to be the bridge between the buyer's questions and the brand's promise. Currently the bridge does not exist. She encounters titles, not perspectives.",
    evidenceKind: 'population',
    evidenceKicker: 'POPULATION VIEW · LAYER 02',
    populationViz: 'gtm-grid',
  },
  {
    number: '03',
    title: 'What your account executives are talking about',
    voicesCount: 'Senior enterprise AEs and account managers · 5 voices analyzed (of ~12 in scope)',
    wantsFelt:
      "Your buyer is looking for peers who have heard from CHROs in her role and can tell her what's actually changing in coaching at the enterprise. The people closest to her world.",
    finds:
      "She finds a seller population that has produced a small handful of original posts collectively in 90 days. Most activity skews toward recruiting announcements, personal life updates, and reposts of BetterUp marketing copy. Almost no posts about coaching outcomes, client work, or what they're hearing from their CHRO conversations.",
    gap:
      "The sellers closest to the customer are silent on the platform where most of the buying journey happens before sales contact. The conversations they're having every day, which would be uniquely valuable to the buyer, do not exist anywhere on LinkedIn.",
    evidenceKind: 'screenshot',
    evidenceKicker: 'WHAT THE BUYER SEES · LAYER 03',
    evidenceImage: '/images/betterup/cascade/crop-b-keely-reposts.png',
    evidenceAlt: "A senior seller's Posts feed showing consecutive reposts of BetterUp company-page content",
    evidenceGloss: 'The people closest to the customer, repeating what the company page already said.',
  },
  {
    number: '04',
    title: "What happens when your team shares the company's content",
    voicesCount: 'How the 21 voices show up when they do post',
    wantsFelt:
      "Your buyer is looking for translations of the brand for someone in her role. Original perspective added to whatever's reposted. Reasons to engage with a BetterUp employee's share that she hasn't already seen on the company page.",
    finds:
      'She finds that five of the 21 voices analyzed operate as pure repost engines, where more than 80% of activity is reposts of BetterUp company-page content. The rest mix amplification with occasional originals. She sees the same BetterUp marketing copy multiple times, in different voices, with no original perspective added.',
    gap:
      "Reposts of company content are penalized roughly thirty percent by the algorithm and reach seventy to ninety percent fewer people than original posts. The team's amplification behavior is invisible work that looks like loyalty and costs each individual their daily distribution credit on content the buyer has already seen.",
    evidenceKind: 'population',
    evidenceKicker: 'POPULATION VIEW · LAYER 04',
    populationViz: 'amplification-bars',
  },
  {
    number: '05',
    title: 'Which named buyers are paying attention',
    voicesCount: '12 named CHROs, CPOs, and VPs of People who engaged in the analysis window',
    wantsFelt:
      'Your buyer is looking for a community of buyers and sellers learning together. Many CHROs in the conversation. The platform feeling like a place where her peers are visible and active alongside the BetterUp team.',
    finds:
      "She finds twelve named buyers who engaged with BetterUp content in the analysis window. Eleven engaged with one BetterUp voice each. The relationships aren't distributed across the team. They're concentrated in two or three voices, primarily Jolen Anderson.",
    gap:
      "The buyers exist. The interest exists. The infrastructure to receive them across the organization does not. If the two voices carrying these relationships were to leave, the public-facing buyer relationships would collapse.",
    evidenceKind: 'screenshot',
    evidenceKicker: 'WHAT THE BUYER SEES · LAYER 05',
    evidenceImage: '/images/betterup/cascade/crop-c-jolen-icp-thread.png',
    evidenceAlt: "A thread under one BetterUp voice's post with named CHROs and CPOs commenting in substance",
    evidenceGloss: 'What it looks like when the brand promise is practiced. Found in two voices, not twenty-one.',
  },
]

/* ── Layer 02 visual: anonymized 9-cell GTM leadership composite-score grid.
      Names removed; the cluster pattern is the evidence. ── */
export const GTM_LEADERSHIP_GRID = [
  { id: 'GTM Leader 01', score: 28 },
  { id: 'GTM Leader 02', score: 18 },
  { id: 'GTM Leader 03', score: 23 },
  { id: 'GTM Leader 04', score: 10 },
  { id: 'GTM Leader 05', score: 11 },
  { id: 'GTM Leader 06', score: 14 },
  { id: 'GTM Leader 07', score: 21 },
  { id: 'GTM Leader 08', score: 50 }, // outlier (Cameran)
  { id: 'GTM Leader 09', score: 45 }, // strong (Chad)
]
export const GTM_GRID_FUNCTIONAL_FLOOR = 50
export const GTM_GRID_NOTE =
  "Nine of your sales and marketing leaders, ranked by how much original substance they publish on LinkedIn. The 50-line is what a senior commercial leader at a category-leader company typically clears. Two of yours do. Seven don't. The agent reads this distribution as 'the company has one voice that knows what it's doing and eight that don't.'"

/* ── Layer 04 visual: Amplification Gap. ── */
export const AMPLIFICATION = {
  originalAvg: 225,
  repostAvg: 33,
  gap: 85, // % drop
  caption:
    "When the same profile publishes an original post versus a reshare of the company page, the original pulls roughly seven times the engagement. The algorithm's seventy-to-ninety-percent suppression on company-handle reshares shows up cleanly at the individual level.",
  note:
    'Sample: Jolen Anderson, the strongest comparison case in the dataset. Cameran Hetrick and Pete Stratigakis show similar ratios.',
}

/* ── Closing diagnosis ── */
export const CLOSING_DIAGNOSIS_KICKER = 'The pattern across all five stops'
export const CLOSING_DIAGNOSIS =
  "BetterUp sells the practice of continuous human contact at scale. The audit found a leadership and sales organization where that practice shows up in some places, with some people, on some threads, but not at the scale the brand promise requires. The product is real. The expertise is real. The relationships are real. They just live in two or three voices instead of twenty-one, and the buyer doing her due diligence today is not landing on those two or three voices."

/* ── 12 ICP buyers list (concentration risk framing) ── */
export const ICP_BUYERS_HEADLINE =
  "Twelve named CHROs, CPOs, and VPs of People who have engaged with BetterUp content in the last 90 days. They exist. They're paying attention. They're concentrated in two or three voices on your team, primarily Jolen Anderson. If those two or three voices leave, the relationships go with them. The infrastructure to receive these buyers across the organization does not exist."

export const ICP_BUYERS_NAMED = [
  { name: 'Manjuri Sinha', title: 'VP HR @ Miro', appearsOn: 'Most-frequent named-buyer commenter across Alexi, Ron Lewis, and others' },
  { name: 'Christelle Borketti', title: 'Chief People Officer, Executive Committee Member', appearsOn: 'Jolen Anderson' },
  { name: 'Charman Hayes', title: 'EVP People & Capabilities, Mastercard', appearsOn: 'Jolen Anderson' },
  { name: 'Natalie Peyton-Kelly', title: 'CPO for Global Network, WPP', appearsOn: 'Jolen Anderson' },
  { name: 'Lori Adams-Brown', title: 'CHRO / CPO / VP People & Culture', appearsOn: 'Jolen Anderson' },
  { name: 'Puja Jaipal', title: 'CPO Vesta', appearsOn: 'Jolen Anderson' },
  { name: 'Nicki Cox', title: 'VP People · Global Revenue Operations & Chief of Staff at WPP', appearsOn: 'Jolen Anderson' },
  { name: 'Hannah Vallieri', title: 'Global People Strategist, CFG & Financial Services', appearsOn: 'Cameran Hetrick, Lyndsey Cochrun' },
  { name: 'Victoria L.', title: 'Founder & Principal, Victoria & Co. (CHRO/VP HR Global)', appearsOn: 'Lyndsey, Ron Lewis, Cameran' },
  { name: 'Catherine Jefferson', title: 'Founder of A Moment of Pause (CHRO advisor)', appearsOn: 'Chad Thomas' },
  { name: 'Carl Eschenbach', title: 'Sequoia partner / Workday CEO', appearsOn: 'Alexi Robichaux (Davos)' },
  { name: 'Ashley Goldsmith', title: 'CPO Workday', appearsOn: 'Alexi Robichaux (Uplift)' },
]

/* ── Composite signal score by tier (moved to supporting evidence). ── */
export const TIER_AVERAGES = [
  { tier: 'Tier 1 · CEO', n: 1, avg: 24, range: '24' },
  { tier: 'Tier 2 · C-Suite', n: 5, avg: 35, range: '28-50' },
  { tier: 'Tier 3 · Sales Leadership', n: 3, avg: 18, range: '10-23' },
  { tier: 'Tier 4 · VP-Level GTM', n: 6, avg: 26, range: '11-50' },
  { tier: 'Tier 5 · Sellers', n: 5, avg: 22, range: '11-32' },
]

/* ── Seven things the buyer leaves a 90-second LinkedIn diligence pass believing. ── */
export const SEVEN_FINDINGS_KICKER = 'Seven things she leaves the session believing'

export const SEVEN_FINDINGS = [
  'The CEO is a real person with real conviction about human potential.',
  "The brand is associated with high-profile cultural figures, but I can't tell if it's currently working.",
  'The product was an early mover in the category, but newer entrants have caught up.',
  "The pricing is unclear, and the speculation I've seen is high.",
  'The employee experience is mixed, and the contradiction is searchable.',
  'My peers know one or two people at BetterUp, mostly the same ones.',
  'If I ask an AI agent, the answer is balanced but cautious.',
]
