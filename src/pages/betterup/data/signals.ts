export const SIGNALS_HEADLINE =
  'Each of these signals is either pulling a buyer toward a decision or pushing them away from one, and most of them are doing the second thing.'

export const SIGNALS_AVG_ALIGNMENT = 29
export const SIGNALS_CRITICAL_GAPS = 5
export const SIGNALS_STRONG = 1

export const SIGNALS_FINDING = `The signals BetterUp is producing land cleanly with the audience it already has (practitioners, coaches, the converted) and almost not at all with the people who actually sign the contract. Seven of the eight categories below score under fifty percent alignment with buyer intent, which is another way of saying the brand has built a broadcast tower aimed at a town that already believes, while the buyers it needs are in the next county listening for something else.`

export type SignalCategory = 'Critical Gap' | 'High Gap' | 'Opportunity'

export interface Signal {
  name: string
  alignment: number
  category: SignalCategory
  signaling: string
  buyerNeeds: string
  pipelineImpact: string
  fix: string
}

export const SIGNALS: Signal[] = [
  {
    name: 'Leadership Visibility',
    alignment: 18,
    category: 'Critical Gap',
    signaling: 'Philosophical CEO content. Other executives invisible.',
    buyerNeeds: 'Multiple credible voices speaking to enterprise outcomes.',
    pipelineImpact: 'Buyers cannot triangulate trust from a single inward voice.',
    fix: 'Activate 5-7 executives with outcome-oriented content rhythms.',
  },
  {
    name: 'Thought Leadership',
    alignment: 35,
    category: 'Critical Gap',
    signaling: 'Research and POV content optimized for L&D community.',
    buyerNeeds: 'Frameworks CFOs and CHROs can use to defend the budget.',
    pipelineImpact: 'Content that the buyer would not share internally is content that does not move pipeline.',
    fix: 'Reframe research with operational language and CFO-ready ROI hooks.',
  },
  {
    name: 'Brand Narrative',
    alignment: 25,
    category: 'Critical Gap',
    signaling: '"Live better. Lead better." Aspirational, broad.',
    buyerNeeds: 'Specific, defensible claim against CoachHub, EZRA, traditional consultants.',
    pipelineImpact: 'Without a sharpened claim, deals stall in vendor comparison.',
    fix: 'Publish a "Why BetterUp" series owning the comparison narrative.',
  },
  {
    name: 'Competitive Signal',
    alignment: 40,
    category: 'High Gap',
    signaling: 'No public competitive content. Comparison narrative ceded to competitors.',
    buyerNeeds: 'Direct, evidence-based comparison content.',
    pipelineImpact: 'Competitors shape the comparison the buyer sees first.',
    fix: 'Quarterly competitive content series. Own the matrix.',
  },
  {
    name: 'Employee Signal',
    alignment: 12,
    category: 'Critical Gap',
    signaling: 'Glassdoor 3.2/5. Public values-reality gap.',
    buyerNeeds: 'Confidence the platform vendor lives its own promise.',
    pipelineImpact: 'AI search surfaces employee discontent as a deal counterweight.',
    fix: 'Operational fix first. Address pay, comms, and AM churn before any advocacy program.',
  },
  {
    name: 'AI Product Signal',
    alignment: 65,
    category: 'Opportunity',
    signaling: 'BetterUp Grow at 95% satisfaction. Genuine differentiator.',
    buyerNeeds: 'Proof that AI + human is superior to either alone.',
    pipelineImpact: 'Strongest signal in the deck. Underused in market communication.',
    fix: 'Lead with human, substantiate with AI. Build outcome case studies around the hybrid.',
  },
  {
    name: 'Pricing Signal',
    alignment: 15,
    category: 'High Gap',
    signaling: 'Opacity. $499+/user circulates with no public framing.',
    buyerNeeds: 'Self-directed research path that does not require a discovery call.',
    pipelineImpact: '"Expensive" becomes a brand attribute by default.',
    fix: 'Publish pricing logic, ROI math, and case studies that contextualize cost.',
  },
  {
    name: 'Community Signal',
    alignment: 20,
    category: 'Critical Gap',
    signaling: '4,000+ coaches, 750+ enterprise clients, no advocacy program.',
    buyerNeeds: 'Peer voices from inside their world.',
    pipelineImpact: 'The most credible voices are unmanaged or actively detracting.',
    fix: 'Coach Ambassador program + Client Voices content series.',
  },
]
