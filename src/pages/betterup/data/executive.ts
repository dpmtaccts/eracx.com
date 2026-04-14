export const COMPANY = {
  name: 'BetterUp',
  url: 'betterup.com',
  date: 'April 2026',
  founded: '2013, Austin TX',
  category: 'B2B Enterprise AI + Human Coaching',
  revenue: '~$214.6M ARR (2024, est. ~14% YoY decline)',
  valuation: '$4.7B (Oct 2021)',
  funding: '$628M raised',
  employees: '~2,751',
  notableClients: 'Microsoft, Salesforce, Google, Hilton, NASA, Chevron, Adobe, SpaceX',
  primaryBuyer: 'CHRO, CLO, VP of Talent at 1,000+ employee enterprises',
}

export const HERO_GAUGES = [
  {
    label: 'Brand Conviction Cascade',
    score: 41,
    description: 'Does what you believe flow through everything you do?',
  },
  {
    label: 'GTM Signal Chain',
    score: 24,
    description: 'Are the right people showing up where your buyer looks?',
  },
  {
    label: 'Content-to-Pipeline',
    score: 29,
    description: 'Is your content moving buyers or just filling feeds?',
  },
] as const

export const CORE_FINDING_PARAGRAPHS: string[] = [
  'BetterUp built something real. The coaching delivers outcomes users call transformative, the AI was developed with patience and rigor no competitor can match, and the behavioral science underneath it all is legitimate.',
  'None of that is in question.',
  'What\'s in question is whether any of it reaches the buyer before the deal is lost.',
  'The CEO speaks in philosophy when the CHRO needs a business case for Monday morning. The company page talks to people who already believe, not the budget holders who don\'t. The sellers and account managers closest to the customer are invisible on LinkedIn, or worse, reinforcing a narrative the brand can\'t afford.',
  'When a CHRO asks an AI about BetterUp, it reads everything: the Glassdoor scores, the coach complaints, the pricing speculation, the competitor comparison pages. It synthesizes all of it into one answer balanced toward caution.',
]

export const PULL_QUOTE_1 =
  'What\'s in question is whether any of it reaches the buyer before the deal is lost.'

export const PULL_QUOTE_2 =
  'A category pioneer leaking pipeline not because the product fails, but because the go-to-market doesn\'t carry the conviction far enough.'

/* Retained for the Summary page (single-paragraph version). */
export const CORE_FINDING = CORE_FINDING_PARAGRAPHS.join(' ')

export const STRENGTHS = [
  'Category authority. Invented digital coaching, still the benchmark.',
  'AI product momentum. BetterUp Grow at 95% satisfaction, 4+ years of responsible development.',
  'Data moat. 17M behavioral data points, the largest professional development dataset in the world.',
]

export const VULNERABILITIES = [
  'Internal brand crisis. Glassdoor 3.2/5, the values-reality gap is public and searchable.',
  'Leadership signal misalignment. CEO content speaks to coaches, not to enterprise buyers.',
  'Pricing opacity. $499+/user estimates circulate with no public context, "expensive" is a dominant brand attribute.',
]
