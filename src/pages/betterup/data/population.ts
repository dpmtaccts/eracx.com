/* What Your Buyer Is Actually Seeing — five-stop journey across the GTM
   organization. Population-level analysis from the 21-voice cascade audit
   (see docs/cascade-audit/findings.md). Individual executives appear as
   evidence anchors, not as journey-stop headlines. */

export const SECTION_KICKER = 'What Your Buyer Is Actually Seeing'
export const SECTION_HEADLINE = 'Your buyer is on LinkedIn right now.'

export const SECTION_SUBHEAD =
  'Not next quarter. Not when sales reaches out. Right now, on a Tuesday morning, between meetings, with a $2M coaching budget question on her plate. She\'s not reading your website. She\'s reading your people, and not the people you\'d hope she\'s reading.'

export const SECTION_INTRO =
  'We analyzed 21 voices across BetterUp\'s leadership, GTM leadership, and senior seller population. Here\'s the journey she takes through your organization on LinkedIn, layer by layer, and what BetterUp wants her to feel at each stop.'

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
    title: 'The leadership layer',
    voicesCount: 'CEO + C-suite · 8 voices analyzed',
    wantsFelt:
      'A leadership team publicly engaged with the questions she cares about as a CHRO; a CEO and C-suite who own a point of view on workforce transformation, AI, leadership development, and human performance.',
    finds:
      'Eight C-suite voices producing roughly two to three original posts each in 90 days, most of which amplify Uplift programming or company announcements. The Chief People Officer is the most active voice and the only one engaging with named ICP buyers at scale; the rest of the C-suite is publicly quiet.',
    gap:
      'Cumulatively, eight C-suite voices produce roughly the same content volume in a quarter as one individual creator on LinkedIn does in two weeks. The leaders who should be most visible to the buyer are the least visible.',
    evidenceKind: 'screenshot',
    evidenceKicker: 'WHAT THE BUYER SEES · LAYER 01',
    evidenceImage: '/images/betterup/cascade/crop-a-alexi-departures.png',
    evidenceAlt: 'CEO comment stream showing short congratulations on departures to BCG, IBM, ServiceNow, and Workday',
    evidenceGloss:
      'Graceful, generous, and disproportionate. When most of a CEO\'s public comment behavior is short congratulations to former employees, the alumni network is visible. The engagement with the buyers he needs to win is not.',
  },
  {
    number: '02',
    title: 'The GTM leadership layer',
    voicesCount: 'Sales, partnerships, marketing leadership · 9 voices analyzed',
    wantsFelt:
      'The people running BetterUp\'s commercial organization showing up as visible thought partners; senior leaders who attend industry events, share what they\'re hearing from buyers, and give her a reason to take their sales team\'s call.',
    finds:
      'A leadership layer where most voices are either silent or operating as repost engines for the company page. Original content is rare; original points of view are rarer. Several senior leaders did not post at all in the 90-day window.',
    gap:
      'The commercial leadership is positioned to be the bridge between the buyer\'s questions and the brand\'s promise. Currently, the bridge does not exist. The buyer encounters titles, not perspectives.',
    evidenceKind: 'population',
    evidenceKicker: 'POPULATION VIEW · LAYER 02',
    populationViz: 'gtm-grid',
  },
  {
    number: '03',
    title: 'The senior seller layer',
    voicesCount: 'Senior enterprise AEs and account managers · 5 voices analyzed (of ~12 in scope)',
    wantsFelt:
      'The people closest to her world; peers who have heard from CHROs in her role and can tell her what\'s actually changing in coaching at the enterprise.',
    finds:
      'A seller population that has produced a small handful of original posts collectively in 90 days, with most activity skewed toward recruiting announcements, personal life updates, and reposts of BetterUp marketing copy. Almost no posts about coaching outcomes, client work, or what they\'re hearing from their CHRO conversations.',
    gap:
      'The sellers closest to the customer are silent on the platform where seventy percent of the buying journey happens before sales contact. The conversations they\'re having every day, which would be uniquely valuable to the buyer, do not exist anywhere on LinkedIn.',
    evidenceKind: 'screenshot',
    evidenceKicker: 'WHAT THE BUYER SEES · LAYER 03',
    evidenceImage: '/images/betterup/cascade/crop-b-keely-reposts.png',
    evidenceAlt: 'A senior seller\'s Posts feed showing consecutive reposts of BetterUp company-page content',
    evidenceGloss: 'The people closest to the customer, repeating what the company page already said.',
  },
  {
    number: '04',
    title: 'The amplification layer',
    voicesCount: 'What happens when GTM leaders and sellers do post · 21 voices in aggregate',
    wantsFelt:
      'Translations of the brand for someone in her role; original perspective added to whatever\'s reposted; reasons to engage with a BetterUp employee\'s share that she hasn\'t already seen on the company page.',
    finds:
      'Five of 21 voices analyzed operate as pure repost engines (more than 80% of activity is reposts of BetterUp company-page content). The rest mix amplification with occasional originals. The buyer sees the same BetterUp marketing copy multiple times, in different voices, with no original perspective added.',
    gap:
      'Reposts of company content are penalized roughly thirty percent by the algorithm and reach seventy to ninety percent fewer people than original posts. The team\'s amplification behavior is invisible work that looks like loyalty and costs each individual their daily distribution credit on content the buyer has already seen.',
    evidenceKind: 'population',
    evidenceKicker: 'POPULATION VIEW · LAYER 04',
    populationViz: 'amplification-bars',
  },
  {
    number: '05',
    title: 'The buyer\'s actual reception',
    voicesCount: 'What named CHROs/CPOs/VPs of People did when they engaged · 12 ICP buyers identified',
    wantsFelt:
      'A community of buyers and sellers learning together; many CHROs in the conversation; the platform feeling like a place where her peers are visible and active alongside the BetterUp team.',
    finds:
      'Twelve named ICP buyers engaged with BetterUp content in the analysis window. Eleven engaged with one BetterUp voice each. The relationships are not distributed across the GTM team; they are concentrated in two or three voices, primarily Jolen Anderson.',
    gap:
      'The buyers exist. The interest exists. The infrastructure to receive them across the GTM organization does not. If the two voices carrying these relationships were to leave, the public-facing buyer relationships would functionally collapse.',
    evidenceKind: 'screenshot',
    evidenceKicker: 'WHAT THE BUYER SEES · LAYER 05',
    evidenceImage: '/images/betterup/cascade/crop-c-jolen-icp-thread.png',
    evidenceAlt: 'A thread under one BetterUp voice\'s post with named CHROs and CPOs commenting in substance',
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
  'Nine GTM leaders, ranked by composite signal score. The 50-line marks the functional floor for a senior commercial role on LinkedIn. Two voices clear it; seven do not.'

/* ── Layer 04 visual: Amplification Gap. ── */
export const AMPLIFICATION = {
  originalAvg: 225,
  repostAvg: 33,
  gap: 85, // % drop
  caption:
    'Where original-vs-repost engagement is directly comparable on the same profile, originals out-pull reposts by roughly seven times. The seventy-to-ninety-percent algorithmic suppression on brand-handle reshares shows up cleanly at the individual level.',
  note:
    'Sample: Jolen Anderson (the strongest comparison case in the dataset). Cameran Hetrick and Pete Stratigakis show similar ratios.',
}

/* ── Closing diagnosis ── */
export const CLOSING_DIAGNOSIS_KICKER = 'The pattern across all five stops'
export const CLOSING_DIAGNOSIS =
  'BetterUp sells the practice of continuous human contact at scale. The audit found a leadership and GTM organization where that practice shows up in some places, with some people, on some threads, but not at the scale or distribution the brand promise requires. The product is real. The expertise is real. The relationships are real. They just live in two or three voices instead of twenty-one, and the buyer who is doing her due diligence today is not landing on those two or three voices.'

/* ── 12 ICP buyers list (concentration risk framing) ── */
export const ICP_BUYERS_HEADLINE =
  'Eleven of twelve relationships are held by one or two voices, primarily Jolen Anderson. The interest exists; the distribution does not.'

export const ICP_BUYERS_NAMED = [
  { name: 'Manjuri Sinha', title: 'VP HR @ Miro', appearsOn: 'Most-frequent ICP commenter — Alexi, Ron Lewis, others' },
  { name: 'Christelle Borketti', title: 'Chief People Officer, Executive Committee Member', appearsOn: 'Jolen Anderson' },
  { name: 'Charman Hayes', title: 'EVP People & Capabilities, Mastercard', appearsOn: 'Jolen Anderson' },
  { name: 'Natalie Peyton-Kelly', title: 'CPO for Global Network, WPP', appearsOn: 'Jolen Anderson' },
  { name: 'Lori Adams-Brown', title: 'CHRO / CPO / VP People & Culture', appearsOn: 'Jolen Anderson' },
  { name: 'Puja Jaipal', title: 'CPO Vesta', appearsOn: 'Jolen Anderson' },
  { name: 'Nicki Cox', title: 'VP People — Global Revenue Operations & Chief of Staff at WPP', appearsOn: 'Jolen Anderson' },
  { name: 'Hannah Vallieri', title: 'Global People Strategist, CFG & Financial Services', appearsOn: 'Cameran Hetrick, Lyndsey Cochrun' },
  { name: 'Victoria L.', title: 'Founder & Principal, Victoria & Co. (CHRO/VP HR Global)', appearsOn: 'Lyndsey, Ron Lewis, Cameran' },
  { name: 'Catherine Jefferson', title: 'Founder of A Moment of Pause (CHRO advisor)', appearsOn: 'Chad Thomas' },
  { name: 'Carl Eschenbach', title: 'Sequoia partner / Workday CEO', appearsOn: 'Alexi Robichaux (Davos)' },
  { name: 'Ashley Goldsmith', title: 'CPO Workday', appearsOn: 'Alexi Robichaux (Uplift)' },
]

/* ── Composite signal score by tier (moved to supporting evidence). ── */
export const TIER_AVERAGES = [
  { tier: 'Tier 1 — CEO', n: 1, avg: 24, range: '24' },
  { tier: 'Tier 2 — C-Suite', n: 5, avg: 35, range: '28-50' },
  { tier: 'Tier 3 — Sales Leadership', n: 3, avg: 18, range: '10-23' },
  { tier: 'Tier 4 — VP-Level GTM', n: 6, avg: 26, range: '11-50' },
  { tier: 'Tier 5 — Sellers', n: 5, avg: 22, range: '11-32' },
]

/* ── Seven findings, rewritten as consequences the buyer takes away. ── */
export const SEVEN_FINDINGS_KICKER = 'Seven things she leaves the session believing'

export const SEVEN_FINDINGS = [
  'She leaves the session believing BetterUp is a brand whose people are mostly absent from the platform where she is researching them; the volume problem reads to her as disinterest.',
  'She concludes that the senior leaders who would naturally be buyer-facing on LinkedIn are either too busy to show up or do not consider it worth their time, both of which she will read as a reason to discount the brand\'s claim that it lives at the buyer\'s level.',
  'She comes away convinced that the BetterUp seller assigned to her account, when she gets one, will know less about her world than the LinkedIn presence of any other coaching vendor she is also evaluating, because nobody at BetterUp is publishing what they hear in her peers\' rooms.',
  'When she does see a BetterUp employee in her feed, the content is content she has already seen on the BetterUp page; she registers that as duplicate effort and her attention drops the next time the same post comes through a different name.',
  'Her impression of BetterUp\'s CEO, formed entirely from his comment behavior in her feed, is of a leader publicly congratulating his own departing employees on landing elsewhere, which leaves her uncertain whether the company is in growth mode or in talent-loss mode.',
  'She identifies, without being told to, the one or two BetterUp voices who do consistently say something buyer-relevant; she follows them; she does not register this as evidence the brand is strong, only as evidence that one or two individuals on a sales team happen to be skilled.',
  'She walks away with a weak impression of the brand and a strong impression of two specific people, which is the opposite of what BetterUp\'s go-to-market motion needs to produce in order to scale.',
]
