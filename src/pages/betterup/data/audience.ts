export const AUDIENCE_HEADLINE =
  'The market your brand thinks it\'s talking to vs. the market that\'s actually listening.'

export const AUDIENCE_PROFILE = `BetterUp's actual buyer is a mid-career executive operator (CHRO, VP of Learning, Chief People Officer) who took the job believing she would be a strategic partner to the CEO and now spends most of her week defending her budget to a CFO who treats coaching as a line item to question. She is not hostile to BetterUp, but she is no longer easily moved by transformation promises from technology vendors, and her default emotional posture toward your category sits somewhere between studied neutrality and quiet exhaustion.`

export const KEY_METRICS = [
  { value: '84%', label: 'of conversation is emotionally neutral', sub: 'Not calm. Emotional lockdown.' },
  { value: '96.6%', label: 'neutral on AI coaching specifically', sub: 'The "show me" phase.' },
  { value: '35%', label: 'more disappointment than admiration', sub: 'Recent memory shaped by failure.' },
  { value: '0.77', label: 'category density (saturated)', sub: 'AI coaching is background noise.' },
  { value: '66%', label: 'of geographic data is unknown attribution', sub: 'Global ambitions, US reality.' },
  { value: '0.1/100', label: 'empathy score', sub: 'Coldest possible market environment.' },
]

export const ACTIVE_TENSIONS = [
  {
    title: '"AI will change everything" vs. "AI has changed nothing for me yet"',
    body: 'AI topic density is 0.83 (saturated). Neutral emotion at 96.6%. Your buyer has heard the AI pitch 200 times this year and their emotional response has flatlined. They want to believe AI solves their scale problem. They are exhausted by vendors claiming it does.',
  },
  {
    title: '"Invest in people" vs. "Cut costs now"',
    body: 'CPI at 3.26%, oil at $127, budget scrutiny at maximum. L&D budgets are measured against the same scrutiny as capital expenditures. The CHRO who champions a $2M coaching contract needs ironclad justification.',
  },
  {
    title: '"Consolidate vendors" vs. "Don\'t bet on one platform"',
    body: 'Consolidation requires trust. The cultural moment is defined by distrust. Mixing and matching is risk management, not laziness. Empathy at 0.1/100 means buyers are hedging on every big bet.',
  },
]

export const DEAD_ZONES = [
  'Inspirational coaching narratives without business outcomes',
  'Pure technology stories. Enterprise AI coaching is invisible in engagement data.',
  '"Future of work" narrative. In decay.',
  'Mental health as standalone value proposition. Table stakes, not differentiation.',
  '"Always-on" framing. Sounds like another system demanding attention.',
  'Remote work positioning. Scarcity 0.40, only 416 mentions, faded as a selling point.',
]

export const PLATFORM_BEHAVIOR = `This audience lives in curated information feeds, not social discourse. Yahoo Finance is the second-highest source in the data (2,081 posts). PR Newswire (1,994 posts) sits in the top three. The conversation is brand-pushed, not organically pulled. The buyer consumes in private, decides in committee, and shares only what makes them look informed, not enthusiastic.`

export const BUYER_JOURNEY = [
  {
    stage: 'Spanning the Horizon',
    body: 'Consuming through financial and business press, not coaching communities. Passive. News-media-mediated. PR Newswire is a top-three source. They are absorbing, not engaging.',
  },
  {
    stage: 'Exploring Options',
    body: 'Operational language, not aspirational. "Measurable impact on manager effectiveness," not "unlock your leadership potential." They reference retention rates, ramp-time reduction, pipeline fill rates.',
  },
  {
    stage: 'Evaluating Partnerships',
    body: 'Integration depth as trust credential (Workday, Oracle, SAP). Named enterprise outcomes with specifics. CFO-friendly language in CHRO-facing content. They will not share content that makes them sound like they drank the Kool-Aid.',
  },
  {
    stage: 'Building Partnership',
    body: 'Human coaches as quality assurance. ROI data that keeps them employed. The CHRO who positions coaching as performance infrastructure wins. The one who positions it as cost center loses.',
  },
]

export const VELOCITY_SHIFTS = [
  {
    label: 'AI capability → AI regulation and ethics',
    note: 'Scarcity 0.46, only 231 mentions. White space.',
  },
  {
    label: 'Wellness → resilience as economic survival',
    note: 'Velocity 0.44, longevity 0.86. Strongest adjacent signal.',
  },
  {
    label: 'Social media regulation → enterprise trust architecture',
    note: 'Scarcity 0.57. Platform skepticism rising.',
  },
]

export const TURNOFF = `The fastest way to lose this buyer is to lead with the AI before proving the human, because the AI conversation she is exposed to is already saturated (category density 0.83) and the emotional signature she brings to it is almost entirely flat (96.6% neutral). The warmth in the data lives in the human coaching layer, which means any campaign that opens with "AI-powered" before establishing the credibility of the people behind the platform will be filtered as noise before she finishes the headline. Lead with the human, substantiate with the AI; in that order, every time.`

export const WHO_THEY_THINK_VS_REAL = {
  thinks: [
    'CHROs at Fortune 500 enterprises actively researching coaching platforms',
    'L&D buyers ready to consolidate point solutions onto one platform',
    'Forward-thinking executives evangelizing human + AI as the future',
    'Engaged community of coaching practitioners amplifying the message',
  ],
  actual: [
    'Risk-aware enterprise operators consuming through financial press',
    'CFOs treating L&D as capex, scrutinizing every line item',
    'Buyers exhausted by AI vendor noise, withholding judgment',
    'A warmth island of converted users, not a pipeline of undecided ones',
  ],
}
