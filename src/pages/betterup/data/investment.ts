export const INVESTMENT_HEADLINE =
  'BetterUp is already spending the money required to win; the question is whether the signals those investments produce are connecting to the buyers they were meant to reach, and what the return looks like if they do.'

export const CURRENT_INVESTMENTS = [
  'Uplift conference (Adam Grant, Brene Brown, Shonda Rhimes)',
  'Mercedes-AMG F1 partnership',
  'Prince Harry as Chief Impact Officer',
  'Thought leadership content engine (blog, research reports)',
  'Enterprise sales team (4-5 reorgs in recent years)',
  'AI product development (BetterUp Grow, MCP Server)',
]

export const CURRENT_RETURNS = [
  { label: 'Category awareness',     state: 'Strong',     tone: 'positive' as const },
  { label: 'Consideration conversion',state: 'Weak',      tone: 'negative' as const },
  { label: 'Enterprise deal velocity', state: 'Slow (30-45 day extended cycles)', tone: 'negative' as const },
  { label: 'Competitive win rate',   state: 'Declining',  tone: 'negative' as const },
  { label: 'Employee advocacy',      state: 'Net detractor', tone: 'negative' as const },
  { label: 'AI search impression',   state: 'Mixed (product praised, organization questioned)', tone: 'negative' as const },
]

export const CONNECTED_CHANGES = [
  'CEO content shifts from philosophy to outcome language. CHRO engagement rises.',
  '5-7 executives carrying the brand, not just the CEO. Distributed trust.',
  'Company page funnel mix shifts to 40/35/25. Consideration content reaches undecided buyers.',
  'Competitive positioning content published. BetterUp owns the comparison narrative.',
  'Coach ambassador program launched. 4,000 organic advocates instead of 4,000 detractors.',
  'Pricing transparency introduced. Self-directed buyer research unblocked.',
  'Glassdoor addressed operationally. AI search results shift within 6-12 months.',
  'Content aligned to buyer journey stages. Right message reaches right buyer at right moment.',
]

export const PROJECTED_IMPACT = [
  { label: 'Brand Conviction Cascade', current: 41, projected: 62 },
  { label: 'GTM Signal Chain',         current: 24, projected: 58 },
  { label: 'Content-to-Pipeline',      current: 29, projected: 55 },
  { label: 'AI Mirror',                current: 38, projected: 58 },
]

export const PIPELINE_PROJECTION =
  '15-25% improvement in qualified opportunity conversion at the due diligence stage.'

export const PROJECTION_CAVEAT =
  'Projections based on ERA\'s experience with comparable B2B enterprise clients. Actual results depend on operational execution, particularly addressing the internal brand crisis (Layer 4) which is a prerequisite for sustainable signal improvement.'
