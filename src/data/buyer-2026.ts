/* The 2026 B2B Buyer · Myth vs Fact
   Canonical data for /methodology. Single source of truth.
   Do not invent or round figures. Every statistic carries its primary
   source inline. Honesty constraints live at the bottom. */

export type Region = 'North America' | 'Europe' | 'UK and Ireland' | 'APAC'
export type Industry =
  | 'technology and software'
  | 'services'
  | 'manufacturing'
  | 'healthcare'
  | 'government'
  | 'telecom'

export type Study = {
  n: number
  firm: string
  title: string
  sample: string
  scope: string
  year: string
  url: string
}

export const AGGREGATE = {
  buyers: '35,000+',
  studies: 9,
  firms: 6,
  regions: 3,
  industries: 6,
  // Honesty constraint — always phrase aggregate this way.
  honestyNote:
    'Buyers and buying interactions across nine studies with distinct methodologies and possible respondent overlap across multi-year programs. Not 35,000 unique individuals.',
}

export const RESEARCH_FIRMS = [
  'Forrester',
  'Gartner',
  'McKinsey',
  '6sense',
  'TrustRadius',
  'G2',
] as const

export const REGIONS_COVERED: readonly string[] = [
  'North America',
  'Europe (incl. UK and Ireland)',
  'Asia Pacific',
]

export const INDUSTRIES_COVERED: readonly Industry[] = [
  'technology and software',
  'services',
  'manufacturing',
  'healthcare',
  'government',
  'telecom',
]

/* URLs use publisher research portals as stable fallbacks. Replace any
   `url` with a deep link to the specific report when one is available. */
export const STUDIES: readonly Study[] = [
  {
    n: 1,
    firm: 'Forrester',
    title: 'The State of Business Buying, 2026 (Buyers’ Journey Survey, 2025)',
    sample: '~18,000 global business buyers',
    scope: 'North America, Europe, Asia Pacific. Broad cross-section of industries and revenue sizes.',
    year: 'Jan 2026',
    url: 'https://www.forrester.com/blogs/category/buyer-insights/',
  },
  {
    n: 2,
    firm: 'Gartner',
    title: 'Sales Survey (2025 wave)',
    sample: '646 buyers',
    scope: 'Source of the 67% rep-free and 45% AI figures.',
    year: 'Aug to Sep 2025',
    url: 'https://www.gartner.com/en/sales/research',
  },
  {
    n: 3,
    firm: 'Gartner',
    title: 'Sales Survey (2024 wave)',
    sample: '632 buyers',
    scope: 'Source of 61% rep-free, 73% avoid irrelevant outreach, 74% unhealthy conflict.',
    year: 'Aug to Sep 2024',
    url: 'https://www.gartner.com/en/sales/research',
  },
  {
    n: 4,
    firm: 'McKinsey',
    title: 'B2B Pulse (9th annual)',
    sample: '3,942 decision-makers',
    scope: 'US plus 12 other countries.',
    year: 'Sep 2024',
    url: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights',
  },
  {
    n: 5,
    firm: '6sense',
    title: '2025 Buyer Experience Report',
    sample: '~4,760 buyers (≈4,000 main + 766 companion)',
    scope:
      'North America 46%, Continental Europe 20%, UK and Ireland 20%, APAC 14%. Tech, services, manufacturing, healthcare, government, telecom. Median deal $200k to $400k.',
    year: 'Nov 2025',
    url: 'https://6sense.com/resources/research/',
  },
  {
    n: 6,
    firm: 'TrustRadius',
    title: '2024 B2B Buying Disconnect',
    sample: '2,164 verified technology buyers plus 243 vendor professionals',
    scope: 'Software buyer-side and vendor-side comparison.',
    year: 'Jun 2024',
    url: 'https://www.trustradius.com/buyer-research',
  },
  {
    n: 7,
    firm: 'G2',
    title: '2025 Buyer Behavior Report',
    sample: '1,169 B2B decision-makers',
    scope: 'North America, EMEA, APAC.',
    year: 'Apr 2025',
    url: 'https://research.g2.com/',
  },
  {
    n: 8,
    firm: 'G2',
    title: 'The Answer Economy',
    sample: '1,076 buyers',
    scope: 'Software-buyer behavior with generative AI.',
    year: 'Mar 2026',
    url: 'https://research.g2.com/',
  },
  {
    n: 9,
    firm: 'Salesforce',
    title: 'State of the Connected Customer',
    sample: '~3,900 to 4,000 business buyers',
    scope: 'Within a broader multi-country sample.',
    year: '—',
    url: 'https://www.salesforce.com/resources/research-reports/state-of-the-connected-customer/',
  },
]

export const SUPPORTING_NOTE =
  'Bain & Company’s 1,200-plus customer survey on shortlist behavior supports §03 but sits outside the nine-study count.'

export const CHARACTERISTICS = [
  {
    label: 'Geography',
    body:
      'North America led, with meaningful Europe (incl. UK and Ireland) and Asia Pacific representation.',
  },
  {
    label: 'Seniority',
    body: 'Decision-makers and purchase influencers, not junior researchers.',
  },
  {
    label: 'Company profile',
    body: 'Mid-market through enterprise, spanning a broad cross-section of revenue sizes.',
  },
  {
    label: 'Industry',
    body:
      'Technology and software heaviest, plus services, manufacturing, healthcare, government, and telecom.',
  },
  {
    label: 'Deal size',
    body:
      'Median considered purchase $200k to $400k (6sense), with willingness-to-spend extending past $1M.',
  },
]

/* ──────────────────────────────────────────────
   The Eight Myths
   Anchors 1 and 2 get full visual weight. The other six support. */

export type MythFact = {
  source: string // firm + year, mono
  url?: string // opens in new tab on the source attribution
  text: string
}

export type Myth = {
  n: number
  anchor: boolean // myth 1 and 2 are anchors
  myth: string // the comfortable belief
  fact: string // the contradiction
  facts: MythFact[] // attributed evidence
  anchorStat: { value: string; caption: string }
  caveat?: string // present on 5, 6, 7, 8
}

export const MYTHS: readonly Myth[] = [
  {
    n: 1,
    anchor: true,
    myth: 'Buyers trust your latest case study or first-party content most.',
    fact:
      'Vendor content is consulted but no longer most trusted or most influential. Peers, third-party reviews, and AI synthesis outrank it.',
    facts: [
      {
        source: 'Forrester · Jan 2026',
        url: 'https://www.forrester.com/blogs/category/buyer-insights/',
        text:
          'Twice as many buyers named generative AI or conversational search their most meaningful information source than any other, outpacing vendor websites, product experts, and sales.',
      },
      {
        source: 'TrustRadius · 2024',
        url: 'https://www.trustradius.com/buyer-research',
        text:
          'Top sources are product demos, buyers’ own prior experience, and user reviews. Vendor websites slipped to fifth at 47 percent. Analyst reports hit an all-time low of 14 percent, a 60 percent drop since 2022.',
      },
      {
        source: 'G2 · 2025',
        url: 'https://research.g2.com/',
        text:
          'Generative-AI chatbots are the number-one shortlist influence at 17.1 percent, then review sites at 15.1 percent. Both rank above vendor sites at 12.8 percent and salespeople at 8.8 percent.',
      },
    ],
    anchorStat: { value: '2×', caption: 'AI cited over any other source (Forrester)' },
  },
  {
    n: 2,
    anchor: true,
    myth: 'Our salespeople make a huge impact on the decision.',
    fact:
      'Most of the decision is complete before sales engages. Time with reps mostly confirms a pre-existing preference.',
    facts: [
      {
        source: 'Gartner',
        url: 'https://www.gartner.com/en/sales/research',
        text:
          'Buyers spend 17 percent of the journey with suppliers, roughly 5 percent with any single rep.',
      },
      {
        source: '6sense · 2025',
        url: 'https://6sense.com/resources/research/',
        text:
          '94 percent of buying groups rank their shortlist before contacting a seller. The first vendor contacted wins 77 percent of deals. 95 percent of winners were on the Day One shortlist. When buyers had not pre-ranked, first contact won only 57 percent, proving contact reflects preference, not persuasion.',
      },
      {
        source: 'Gartner · 2025',
        url: 'https://www.gartner.com/en/sales/research',
        text: '67 percent of buyers prefer a rep-free buying experience.',
      },
    ],
    anchorStat: { value: '77%', caption: 'First vendor contacted wins (6sense)' },
  },
  {
    n: 3,
    anchor: false,
    myth: 'The buying journey is linear.',
    fact: 'It is nonlinear, fragmented, and looping.',
    facts: [
      {
        source: 'Gartner',
        url: 'https://www.gartner.com/en/sales/research',
        text:
          'Buyers work six buying jobs more or less simultaneously, looping back through each. No clean handoff from marketing to sales.',
      },
      {
        source: '6sense · 2025',
        url: 'https://6sense.com/resources/research/',
        text:
          'Reframed to a 60/40 Selection/Validation split. First contact moved from 69 percent to 61 percent of the journey, about six to seven weeks earlier.',
      },
    ],
    anchorStat: { value: '6', caption: 'Buying jobs done in parallel (Gartner)' },
  },
  {
    n: 4,
    anchor: false,
    myth: 'One champion carries the deal.',
    fact: 'Buying is done by large groups and fluid networks, and conflict is the default.',
    facts: [
      {
        source: 'Forrester · 2026',
        url: 'https://www.forrester.com/blogs/category/buyer-insights/',
        text:
          '13 internal stakeholders and 9 external influencers per decision. 73 percent of purchases involve three or more departments.',
      },
      {
        source: 'Gartner',
        url: 'https://www.gartner.com/en/sales/research',
        text:
          'Groups of 5 to 16 people. 74 percent of teams show unhealthy conflict. Teams that reach consensus are 2.5× more likely to report a high-quality deal.',
      },
    ],
    anchorStat: { value: '13 + 9', caption: 'Internal plus external influencers (Forrester)' },
  },
  {
    n: 5,
    anchor: false,
    myth: 'AI is not yet a meaningful part of B2B buying.',
    fact: 'AI is near-universal in the process. It augments, it does not yet replace, human validation.',
    facts: [
      {
        source: 'Forrester · 6sense · Gartner · G2',
        url: 'https://www.forrester.com/blogs/category/buyer-insights/',
        text:
          '94 percent of buyers use AI in the process. 6sense reports 94 percent use LLMs. Gartner reports 45 percent used AI in a recent purchase. G2 reports 51 percent of software buyers now start with an AI chatbot more often than Google.',
      },
    ],
    anchorStat: { value: '94%', caption: 'Buyers use AI in the process (Forrester)' },
    caveat:
      'Buyers fact-check AI. 20 percent felt less confident due to unreliable AI output (Forrester). Winning-vendor interactions barely changed (16 vs 17 per person, 6sense).',
  },
  {
    n: 6,
    anchor: false,
    myth: 'Digital self-service is only for small, simple purchases.',
    fact: 'Self-service is central even in large, complex deals.',
    facts: [
      {
        source: 'Gartner',
        url: 'https://www.gartner.com/en/sales/research',
        text: '75 percent prefer a rep-free experience for at least parts of the journey.',
      },
      {
        source: 'McKinsey',
        url: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights',
        text:
          '20 percent will spend over $1M in a single self-serve or remote transaction, 39 percent over $500k, 73 percent over $50k. The rule of thirds (in-person, remote, self-serve) holds across deal sizes.',
      },
    ],
    anchorStat: { value: '20%', caption: 'Will self-serve a $1M-plus deal (McKinsey)' },
    caveat:
      'Hybrid wins. Buyers who pair digital tools with a rep are 1.8× more likely to complete a high-quality deal. McKinsey figures are willingness-to-spend, not realized transactions.',
  },
  {
    n: 7,
    anchor: false,
    myth: 'Personalization is optional.',
    fact:
      'Relevance is the price of entry, and irrelevance has a measurable cost. Aim it at the group, not the individual.',
    facts: [
      {
        source: 'Gartner',
        url: 'https://www.gartner.com/en/sales/research',
        text:
          '73 percent of buyers actively avoid suppliers who send irrelevant outreach. 69 percent report inconsistencies between vendor sites and what sellers tell them.',
      },
    ],
    anchorStat: { value: '73%', caption: 'Avoid irrelevant suppliers (Gartner)' },
    caveat:
      'Buying-group-level relevance lifts consensus 20 percent. Individual-level personalization had a 59 percent negative impact on consensus by entrenching divergent views.',
  },
  {
    n: 8,
    anchor: false,
    myth: 'The demographics of B2B buyers are unchanged.',
    fact: 'Millennials and Gen Z are now the clear majority.',
    facts: [
      {
        source: 'Forrester',
        url: 'https://www.forrester.com/blogs/category/buyer-insights/',
        text:
          'Millennials and Gen Z are 71 percent of B2B buyers, up from 64 percent in 2022. 90 percent of younger buyers reported dissatisfaction with a vendor versus 71 percent of older buyers.',
      },
    ],
    anchorStat: { value: '71%', caption: 'Millennial and Gen Z share of B2B buyers (Forrester)' },
    caveat:
      '6sense found buyer age has only trivial correlation with actual journey behavior. The population skewed younger, but age alone does not dictate journey mechanics. State both.',
  },
]

/* ──────────────────────────────────────────────
   §03 Synthesis — three structural implications */

export type Implication = { n: number; title: string; body: string }

export const IMPLICATIONS: readonly Implication[] = [
  {
    n: 1,
    title: 'Visibility precedes persuasion.',
    body:
      'The first vendor contacted wins around 77 percent and 95 percent of winners are on the Day One shortlist, so the battle is won in the anonymous Selection Phase. Brand presence, earned third-party proof, and AI-citation visibility now do the work the sales pitch used to do.',
  },
  {
    n: 2,
    title: 'Proof must be external and validatable.',
    body:
      'Buyers discover with AI, then validate against peers, reviews, and experts. A claim that cannot be corroborated off your own domain is a liability, not a marketing asset.',
  },
  {
    n: 3,
    title: 'The buyer is a system, not a person.',
    body:
      'With 13 internal plus 9 external influencers and 74 percent of teams in conflict, consensus is the scarce resource. Every touchpoint has to survive being forwarded, debated, and fact-checked inside a committee you never meet.',
  },
]

/* ──────────────────────────────────────────────
   §04 Honest flags + closing credibility line */

export const HONEST_FLAGS: readonly { label: string; body: string }[] = [
  {
    label: '“80% of buying happens before sales”',
    body:
      'The round shorthand traces to a 2015 projection. Use the defensible primary figures instead: 17 percent of buyer time with suppliers (Gartner), first contact at around 61 percent of the journey (6sense), pre-contact favorite wins around 77 percent (6sense).',
  },
  {
    label: 'Demographics versus behavior',
    body:
      'Forrester ties shifts to younger buyers. 6sense finds age trivially correlated with behavior. Present both.',
  },
  {
    label: 'Software-buyer specificity',
    body:
      'G2’s “start with AI” and “number-one source” figures are software-buyer specific. Do not over-generalize to all B2B.',
  },
]

export const CREDIBILITY_LINE =
  'We built The Buyer View on independent research covering more than 35,000 B2B buyers and buying interactions, across nine primary studies from six of the world’s leading research firms: Forrester, Gartner, McKinsey, 6sense, TrustRadius, and G2. The research spans North America, Europe, and Asia Pacific and industries from software and manufacturing to healthcare and government.'
