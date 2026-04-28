export const CASCADE_HEADLINE = 'Does What You Believe Show Up in What You Do?'

export const CASCADE_INTRO = `Most brand audits measure perception. This one measures whether your brand promise flows through your leadership, your product, your people, and what AI tells your buyer about you.`

export type FlowStatus = 'Strong Flow' | 'Partial Flow' | 'Weak Flow' | 'Cascade Break'

export interface CascadeLayer {
  number: string
  name: string
  /** The original term Pinwheel/ERA used for this layer; surfaced as a subhead so
   *  brand readers see the bridge between plain-language framing and category jargon. */
  oldName?: string
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
    name: 'What You Say You Believe',
    oldName: 'Declared Conviction',
    question: 'In your marketing, website, social channels, and sales materials.',
    score: 35,
    status: 'Weak Flow',
    signals: [
      'Mission and vision clarity',
      'Public point of view on the category',
      'Consistency across web, sales decks, and PR',
    ],
    assessment:
      'BetterUp\'s stated promise is "human transformation through coaching, powered by AI, at enterprise scale." The language reads aspirational, but it rarely gets translated into business proof a CHRO can put in front of her CFO. The brand declares the position; it does not defend it.',
    evidence: [
      'Homepage leads with philosophy ("Live better. Lead better.") not outcomes',
      'Public POV on AI coaching is muted compared to category competitors',
      'Sales narrative diverges from marketing narrative according to win/loss data',
    ],
  },
  {
    number: '02',
    name: 'Do Your Leaders Live It?',
    oldName: 'Leadership Embodiment',
    question: 'Is leadership behavior on LinkedIn consistent with your stated brand promise?',
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
    name: 'Does Your Product Prove It?',
    oldName: 'Product Experience',
    question: 'When someone uses BetterUp, do they feel what the brand promises?',
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
    name: 'Do Your People Carry It?',
    oldName: 'Frontline Carrier',
    question: 'Do sales reps, coaches, and account managers carry the promise into customer interactions?',
    score: 22,
    status: 'Cascade Break',
    signals: [
      'Employee sentiment alignment with brand',
      'Coach community advocacy',
      'Customer-facing team retention',
    ],
    assessment:
      'BetterUp sells psychological safety and human transformation, and its own employees describe neither when asked anonymously. Glassdoor reviews call out the irony directly. Coaches report pay disputes and communication breakdowns in the same forums prospective buyers search. Account managers churn through the same accounts three or more times in twelve months. The promise dies at the frontline, and the market can see it.',
    evidence: [
      'Glassdoor 3.2/5, values-reality gap is searchable',
      'Coach loyalty scored 60/100 and declining',
      'Account manager churn cited in profile and review data',
    ],
  },
  {
    number: '05',
    name: 'Does the Market Feel It?',
    oldName: 'Market Resonance',
    question: 'Do clients, analysts, and peers describe what you describe?',
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
    name: 'What Does AI Tell Your Buyer?',
    oldName: 'The AI Mirror',
    question: 'When a CHRO asks ChatGPT or Claude about you, does the answer help or hurt?',
    score: 38,
    status: 'Weak Flow',
    signals: [
      'AI-synthesized brand summary across queries',
      'Balance of strengths vs. counterweights',
      'Buyer-relevant proof points surfaced',
    ],
    assessment:
      'When a CHRO asks ChatGPT, Claude, or Perplexity about BetterUp, the answer comes back balanced toward caution: product strength shows up, frontline failure shows up as a counterweight, pricing opacity shows up alongside both. The model is reading the cascade break the same way a careful buyer would, and it is putting that read directly in front of the person you most want to convince.',
    evidence: [
      'AI summaries cite Glassdoor 3.2/5 alongside product strength',
      '14% YoY revenue decline raises stability questions in AI answers',
      'Pricing described as "opaque" and "expensive" across platforms',
    ],
  },
]

export const CASCADE_BREAK_CALLOUT = `The cascade breaks at Layer 4, where the people who actually carry the brand to customers stop reflecting it back. BetterUp sells psychological safety and human transformation, yet its own employees describe neither in the reviews a CHRO will read on Glassdoor before a first call. Coaches surface pay disputes and communication breakdowns in the same forums prospective buyers search; account managers churn through the same accounts three or more times in twelve months. The promise dies at the frontline, and because every one of those signals is publicly indexed, the market can see exactly where it died.`
