export const AI_MIRROR_SCORE = 38

export const AI_MIRROR_CONTEXT = `An increasing share of enterprise buyers now begin a vendor evaluation by typing a question into ChatGPT, Claude, Perplexity, or Google's AI Overview, and the answer they receive is not a recitation of BetterUp's marketing copy. It is a composite the model assembles in real time from the website, Glassdoor, G2, press archives, competitor comparison pages, LinkedIn, Reddit, and analyst commentary, weighted by what the broader internet appears to believe. For a CHRO weighing a platform priced north of $499 per seat, that composite is often the first impression of BetterUp she will form, and she will form it before anyone in your sales organization has a chance to shape it.`

export const WANTS_TO_SAY = [
  'Category pioneer in digital coaching',
  'AI + human coaching at enterprise scale',
  '95% satisfaction on BetterUp Grow',
  'Fortune 500 clients: Google, Salesforce, Microsoft, NASA',
  '17M behavioral data points, largest dataset in the world',
  'Science-backed, evidence-based methodology',
]

export const ACTUALLY_SAYS = [
  { tone: 'positive', text: 'Category pioneer, consistently referenced as the benchmark.' },
  { tone: 'positive', text: 'Strong coaching quality, well-designed platform (Josh Bersin, G2 users).' },
  { tone: 'positive', text: 'BetterUp Grow AI coaching at 95% early satisfaction. Genuine differentiator.' },
  { tone: 'negative', text: 'Glassdoor 3.2/5. Employees say company doesn\'t practice what it preaches.' },
  { tone: 'negative', text: 'Pricing described as opaque and expensive across review platforms.' },
  { tone: 'negative', text: '14% YoY revenue decline raises stability questions for enterprise procurement.' },
  { tone: 'negative', text: 'Prince Harry association noted as polarizing.' },
  { tone: 'negative', text: 'Account manager churn and coach community dissatisfaction cited in reviews.' },
  { tone: 'summary', text: 'Net AI impression: strong product, questionable organizational integrity, proceed with caution.' },
] as const

export const WHY_IT_MATTERS = `What the AI does, in effect, is collapse every layer of the cascade into a single paragraph delivered to your buyer at the worst possible moment, which is before she has met you. The product conviction in Layer 3 shows up as praise; the frontline failure in Layer 4 shows up as a counterweight, and the model balances them honestly. There is no version of this in which the model can be argued with or briefed; it reads what is publicly true and reports it back, and the only real lever you have is to change what it can read.`

export const TEST_QUERIES = [
  'Tell me about BetterUp',
  'Is BetterUp worth it for enterprise coaching?',
  'BetterUp vs CoachHub',
  'BetterUp employee reviews',
]
