export const BUILD_HEADLINE =
  'A 90-day signal alignment program connecting brand, content, executive presence, and pipeline.'

export interface Phase {
  number: string
  weeks: string
  title: string
  items: string[]
  deliverable?: string
}

export const PHASES: Phase[] = [
  {
    number: '01',
    weeks: 'Weeks 1-4',
    title: 'Signal Diagnostic & Strategy',
    items: [
      'Complete Revenue Signal Audit (this document)',
      'LinkedIn leadership audit for top 5 executives, not just the CEO',
      'Content-to-pipeline gap analysis with buyer journey mapping',
      'Competitive positioning strategy',
    ],
    deliverable: 'Signal Alignment Roadmap with prioritized action plan',
  },
  {
    number: '02',
    weeks: 'Weeks 5-8',
    title: 'Content & Executive Activation',
    items: [
      'Executive content calendars for CEO and four additional leaders',
      'Company page content strategy shift to 40/35/25 funnel mix',
      'Competitive positioning content development',
      'Audience-aligned messaging framework using operational language',
      'Coach ambassador program design',
    ],
  },
  {
    number: '03',
    weeks: 'Weeks 9-12',
    title: 'Optimization & Measurement',
    items: [
      'Signal scorecard tracking, monthly cadence',
      'AI mirror monitoring across ChatGPT, Claude, Perplexity, quarterly',
      'Engagement quality reporting (ICP engagement rate, not vanity metrics)',
      'Buyer journey content mapping and optimization',
      'ROI framework for CFO-ready budget justification',
    ],
  },
]

export const TEAM = [
  {
    org: 'ERA',
    scope: 'LinkedIn intelligence, content strategy, executive coaching on brand presence, signal measurement',
  },
  {
    org: 'Pinwheel Creative',
    scope: 'Brand strategy and messaging, thought leadership content, design and visual identity, campaign development',
  },
]

export const CTA_BODY =
  'This audit was built using publicly available data in approximately 18 hours. Imagine what we could do with access to your CRM, your engagement data, and your leadership team\'s attention for 90 days.'

export const CONTACTS = [
  { name: 'Justin Marshall', role: 'ERA', email: 'justin@eracx.com' },
  { name: 'S. Todd Anthony', role: 'Pinwheel Creative', email: 'todd@pinwheelcreative.com' },
]
