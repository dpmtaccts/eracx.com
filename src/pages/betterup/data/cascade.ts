export const CASCADE_HEADLINE =
  'Most audits measure what a brand says about itself; this one measures whether what BetterUp says, what it does, and what the market actually feels are the same thing.'

export const CASCADE_INTRO = `Conviction does not stop at the tagline. It travels from leadership through the product, into the frontline teams who carry it to customers, and out into the market that decides what to feel about it. The place where the cascade stops flowing is the place where pipeline begins to leak, and in BetterUp's case the break is visible long before a buyer ever picks up the phone.`

export type FlowStatus = 'Strong Flow' | 'Partial Flow' | 'Weak Flow' | 'Cascade Break'

export interface CascadeLayer {
  number: string
  name: string
  question: string
  score: number
  status: FlowStatus
  signals: string[]
  assessment: string
  evidence: string[]
}

export const CASCADE_LAYERS: CascadeLayer[] = [
  {
    number: '01',
    name: 'Declared Conviction',
    question: 'What you say you believe.',
    score: 35,
    status: 'Weak Flow',
    signals: [
      'Mission and vision clarity',
      'Public point of view on the category',
      'Consistency across web, sales decks, and PR',
    ],
    assessment:
      'BetterUp\'s declared conviction is "human transformation through coaching, powered by AI, at enterprise scale." The language is aspirational but rarely translated into business proof. The brand declares but does not defend.',
    evidence: [
      'Homepage leads with philosophy ("Live better. Lead better.") not outcomes',
      'Public POV on AI coaching is muted compared to category competitors',
      'Sales narrative diverges from marketing narrative according to win/loss data',
    ],
  },
  {
    number: '02',
    name: 'Leadership Embodiment',
    question: 'Do your leaders live it?',
    score: 40,
    status: 'Weak Flow',
    signals: [
      'CEO and exec content alignment with brand promise',
      'Visible engagement with buyers',
      'Executive distribution beyond CEO',
    ],
    assessment:
      'Alexi believes the message. The other executives are largely invisible. The SVP of Marketing has not posted original content in 12+ months. The brand carries on the CEO\'s back, and his attention is inward.',
    evidence: [
      'CEO comment behavior is 62% internal, 0% with enterprise buyers',
      'SVP Marketing has 3 posts in 12 months, all event promotion',
      '5+ executives could be carrying brand presence, only 1 is visible',
    ],
  },
  {
    number: '03',
    name: 'Product Experience',
    question: 'Does the product prove it?',
    score: 62,
    status: 'Partial Flow',
    signals: [
      'Customer-reported outcomes',
      'Product satisfaction scores',
      'Differentiation against competitors',
    ],
    assessment:
      'The product is the strongest layer of the cascade. BetterUp Grow at 95% satisfaction is genuine. The coaching network is real. The behavioral science is legitimate. This is the layer that should anchor everything else.',
    evidence: [
      'BetterUp Grow at 95% early satisfaction',
      '17M behavioral data points, largest dataset in category',
      'Josh Bersin and G2 reviews consistently positive on platform quality',
    ],
  },
  {
    number: '04',
    name: 'Frontline Carrier',
    question: 'Do your people carry it?',
    score: 22,
    status: 'Cascade Break',
    signals: [
      'Employee sentiment alignment with brand',
      'Coach community advocacy',
      'Customer-facing team retention',
    ],
    assessment:
      'BetterUp sells psychological safety and human transformation. Its own employees describe neither. Glassdoor reviews explicitly name the irony. Coaches report pay disputes and communication breakdowns. Account managers churn three or more times in 12 months. The conviction dies at the frontline, and the market can see it.',
    evidence: [
      'Glassdoor 3.2/5, values-reality gap is searchable',
      'Coach loyalty scored 60/100 and declining',
      'Account manager churn cited in profile and review data',
    ],
  },
  {
    number: '05',
    name: 'Market Resonance',
    question: 'Does the market feel it?',
    score: 45,
    status: 'Weak Flow',
    signals: [
      'Engagement quality with ICP',
      'Share of voice in category',
      'Sentiment in third-party press',
    ],
    assessment:
      'Awareness is strong. Resonance is weak. The market knows the brand. The market does not feel pulled toward it. Engagement is dominated by employees, coaches, and practitioners. Enterprise budget holders are absent from public engagement.',
    evidence: [
      '84% of category conversation is emotionally neutral (audience intelligence data)',
      'Curiosity is the only positive emotion with meaningful volume',
      'Disappointment outpaces admiration by 35%',
    ],
  },
  {
    number: '06',
    name: 'The AI Mirror',
    question: 'What does generative search say?',
    score: 38,
    status: 'Weak Flow',
    signals: [
      'AI-synthesized brand summary across queries',
      'Balance of strengths vs. counterweights',
      'Buyer-relevant proof points surfaced',
    ],
    assessment:
      'When a CHRO asks ChatGPT, Claude, or Perplexity about BetterUp, the answer is balanced toward caution. Product strength surfaces. Frontline failure surfaces as a counterweight. Pricing opacity surfaces. The AI is the ultimate mirror, and it is reading the cascade break.',
    evidence: [
      'AI summaries cite Glassdoor 3.2/5 alongside product strength',
      '14% YoY revenue decline raises stability questions in AI answers',
      'Pricing described as "opaque" and "expensive" across platforms',
    ],
  },
]

export const CASCADE_BREAK_CALLOUT = `The cascade breaks at Layer 4, where the people who actually carry the brand to customers stop reflecting it back. BetterUp sells psychological safety and human transformation, yet its own employees describe neither in the reviews a CHRO will read on Glassdoor before a first call. Coaches surface pay disputes and communication breakdowns in the same forums prospective buyers search; account managers churn through the same accounts three or more times in twelve months. The conviction dies at the frontline, and because every one of those signals is publicly indexed, the market can see exactly where it died.`
