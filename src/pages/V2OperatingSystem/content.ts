// All copy for the /v2 operating-system page.
// Edit strings here; components read from this module.

export type CtaLink = { label: string; href: string }

export const nav = {
  links: [
    { label: 'System', href: '#system' },
    { label: 'Signal Map', href: '#signal-map' },
    { label: 'AUX', href: '#aux' },
    { label: 'AI Mirror', href: '#mirror' },
    { label: 'Halo', href: '#halo' },
    { label: 'Timeline', href: '#expect' },
  ] as CtaLink[],
  cta: { label: 'Start with an audit', href: '#entry' } as CtaLink,
}

export const hero = {
  headline: { before: 'ERA runs the ', italic: 'modern', after: ' B2B playbook.' },
  sub: "Measurement, signals, and operations for the part of the buyer journey your pipeline doesn't see.",
  primary: { label: 'See the system', href: '#system' } as CtaLink,
  secondary: { label: 'Start with an audit', href: '#entry' } as CtaLink,
  clientsLabel: 'Operators in residence',
  clients: ['Netrush', 'POP', 'Miniac', 'Navalent', 'Seismic'],
}

export const ghost = {
  sectionNum: "02 — The decision you don't see",
  headline: {
    before: "That lead didn't ghost you. Their mind was ",
    italic: 'made up',
    after: ' before you met.',
  },
  body: [
    'In 2026, most B2B decisions form before a vendor is ever contacted. Buyers evaluate in the background. Across AI. Across reviews. Across peer networks.',
    'The meeting is the last step, not the first.',
    'ERA measures that environment and runs the plays that shape it.',
  ],
}

export const stats = [
  {
    number: '95',
    numberItalic: '%',
    text: 'of B2B deals go to a vendor already on the Day One shortlist.',
    source: '6sense · Buyer Experience Report · 2025',
  },
  {
    number: '94',
    numberItalic: '%',
    text: 'of buyers use AI to research vendors before they ever contact one.',
    source: 'Forrester · State of Business Buying · 2026',
  },
  {
    number: '22',
    numberItalic: '',
    text: 'people on the average buying committee.',
    source: 'Forrester · 2026',
  },
]

export const playbook = {
  sectionLabel: '03 — Two playbooks',
  headline: { before: 'Old playbook. ', italic: 'New playbook.', after: '' },
  rows: [
    ['Drive traffic. Capture MQLs.', 'Shape ambient awareness. Own the shortlist.'],
    ['Cold outbound at volume.', 'Signal-triggered outreach to named accounts.'],
    ['Content for SEO.', 'Content built for AI citation and committee share.'],
    ['Episodic ABM campaigns.', 'Account-based operations as the default.'],
    ['Sales-led qualification.', 'Signal-led prioritization before the first call.'],
    ['Dashboards measuring activity.', 'Dashboards measuring conviction, rank, penetration.'],
    ['The funnel.', 'The buyer journey.'],
  ] as [string, string][],
  closer: 'We run the right column.',
}

export type SystemComponent = {
  label: string
  name: string
  role: string
  description: string
  viz: 'river' | 'map' | 'aux' | 'mirror'
}

export const system = {
  sectionLabel: '04 — The system',
  headline: { before: 'Four components. ', italic: 'One operating layer.', after: '' },
  lede: 'Anyone can buy the licenses. ERA integrates them into a system that measures, scores, and moves every day.',
  components: [
    {
      label: 'Aggregation',
      name: 'Signal River',
      role: 'LINKEDIN · HUBSPOT · APOLLO · CLAY · HOCKEYSTACK',
      description:
        "Every relevant signal from every source, pulled into one feed. Dedup'd, timestamped, delivered daily.",
      viz: 'river',
    },
    {
      label: 'Decisioning',
      name: 'Signal Map',
      role: '47 RULES · SIGNAL → PLAY',
      description:
        'Exec hires fire a relationship re-anchor. Funding rounds fire ICP scoring. One rule set. Consistent execution.',
      viz: 'map',
    },
    {
      label: 'Scoring',
      name: 'AUX',
      role: 'FRVRD · FIT · WALLET · READINESS',
      description:
        'Every target account on a weighted scale. Not vanity engagement. Real buyer readiness. Updated as signals land.',
      viz: 'aux',
    },
    {
      label: 'Perception',
      name: 'AI Mirror',
      role: 'CHATGPT · CLAUDE · PERPLEXITY',
      description:
        "Monitors how the agents describe you. Traces the sources feeding each answer. Flags what's drifting.",
      viz: 'mirror',
    },
  ] as SystemComponent[],
}

export const footer = {
  columns: [
    {
      heading: 'The System',
      items: [
        { label: 'Signal River', href: '#system' },
        { label: 'Signal Map', href: '#signal-map' },
        { label: 'AUX', href: '#aux' },
        { label: 'AI Mirror', href: '#mirror' },
      ],
    },
    {
      heading: 'Engage',
      items: [
        { label: 'Halo', href: '#halo' },
        { label: 'Audit', href: '#entry' },
        { label: 'Architecture', href: '#entry' },
        { label: 'Operations', href: '#entry' },
      ],
    },
    {
      heading: 'Company',
      items: [
        { label: 'About', href: '#' },
        { label: 'Writing', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  ],
  copyright: '© 2026 Department of Loyalty LLC · Bainbridge Island, WA',
}
