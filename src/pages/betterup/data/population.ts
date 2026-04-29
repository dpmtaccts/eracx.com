/* Population-level data from the 45-voice cascade audit (21 of 45 processed).
   See docs/cascade-audit/findings.md for full methodology and caveats. */

export const POPULATION_HEADLINE =
  'Across 21 of 45 GTM voices analyzed, here is what your buyer encounters when they research you.'

export const POPULATION_SCOPE_NOTE =
  '21 of 45 priority voices had complete posts and comments captured (1 Tier 1, 5 Tier 2, 3 Tier 3, 6 Tier 4, 5 Tier 5, plus 1 anomaly). The remaining 24 are pending capture and will refine these numbers in the next pass.'

export const POPULATION_HEADLINE_METRICS = [
  { value: '~85', label: 'Original posts produced in 90 days', sub: 'Across 21 voices. Median per voice: ~2.' },
  { value: '~14%', label: 'Posts that translate to the enterprise CHRO buyer', sub: 'Most content lands with coaches, marketing peers, or BetterUp employees.' },
  { value: '3 of 21', label: 'Voices producing zero original posts in 90 days', sub: 'Lance Dai, Matt Cox, Keely Williams — all senior roles.' },
  { value: '5 of 21', label: 'Voices in pure-amplifier mode (>80% reposts)', sub: 'Reposting BetterUp company-page content does not earn algorithmic reach.' },
  { value: '12', label: 'Named ICP buyers engaging publicly', sub: 'Concentrated in 2-3 voices. Relationships exist; distribution does not.' },
]

export const TRANSLATION_BREAKDOWN = [
  { label: 'Translates to enterprise CHRO buyer', count: 12, pct: 14, color: 'green' as const },
  { label: 'Event promotion / Uplift amplification', count: 25, pct: 29, color: 'rust' as const },
  { label: 'Recruiting / hiring announcements', count: 14, pct: 16, color: 'amber' as const },
  { label: 'BetterUp marketing copy in seller voice', count: 10, pct: 12, color: 'amber' as const },
  { label: 'Personal life / anniversary / family', count: 8, pct: 9, color: 'textMuted' as const },
  { label: 'Federal/government segment', count: 8, pct: 9, color: 'sky' as const },
  { label: 'Other (engineering, marketing peers, coach community)', count: 8, pct: 9, color: 'textMuted' as const },
]

export const TIER_AVERAGES = [
  { tier: 'Tier 1 — CEO', n: 1, avg: 24, range: '24' },
  { tier: 'Tier 2 — C-Suite', n: 5, avg: 35, range: '28-50' },
  { tier: 'Tier 3 — Sales Leadership', n: 3, avg: 18, range: '10-23' },
  { tier: 'Tier 4 — VP-Level GTM', n: 6, avg: 26, range: '11-50' },
  { tier: 'Tier 5 — Sellers', n: 5, avg: 22, range: '11-32' },
]

export const ICP_BUYERS_NAMED = [
  { name: 'Manjuri Sinha', title: 'VP HR @ Miro', appearsOn: 'Most-frequent ICP commenter — Alexi, Ron Lewis, others' },
  { name: 'Christelle Borketti', title: 'Chief People Officer, Executive Committee Member', appearsOn: 'Jolen Anderson' },
  { name: 'Charman Hayes', title: 'EVP People & Capabilities, Mastercard', appearsOn: 'Jolen Anderson' },
  { name: 'Natalie Peyton-Kelly', title: 'CPO for Global Network, WPP', appearsOn: 'Jolen Anderson' },
  { name: 'Lori Adams-Brown', title: 'CHRO / CPO / VP People & Culture', appearsOn: 'Jolen Anderson' },
  { name: 'Puja Jaipal', title: 'CPO Vesta', appearsOn: 'Jolen Anderson' },
  { name: 'Nicki Cox', title: 'VP People — Global Revenue Operations & Chief of Staff at WPP', appearsOn: 'Jolen Anderson' },
  { name: 'Hannah Vallieri', title: 'Global People Strategist, CFG & Financial Services', appearsOn: 'Cameran Hetrick, Lyndsey Cochrun' },
  { name: 'Victoria L.', title: 'Founder & Principal, Victoria & Co. (CHRO/VP HR Global)', appearsOn: 'Lyndsey, Ron Lewis, Cameran' },
  { name: 'Catherine Jefferson', title: 'Founder of A Moment of Pause (CHRO advisor)', appearsOn: 'Chad Thomas' },
  { name: 'Carl Eschenbach', title: 'Sequoia partner / Workday CEO', appearsOn: 'Alexi Robichaux (Davos)' },
  { name: 'Ashley Goldsmith', title: 'CPO Workday', appearsOn: 'Alexi Robichaux (Uplift)' },
]

export const SEVEN_DAMNING_FINDINGS = [
  'Across 21 GTM voices at BetterUp, the team produced roughly 85 original posts in 90 days, 14 of which were recruiting announcements and 25 of which were event promotion; the people closest to the enterprise customer wrote, on average, just over two pieces of buyer-relevant content per person per quarter, and most of them did not.',
  'Three of 21 voices produced zero original posts in the 90-day window, despite holding titles (Regional VP of Sales, VP of Global Revenue Operations, Senior Enterprise Seller) that would lead any CHRO conducting due diligence to expect a published point of view; their LinkedIn presence is a recruiting reel and a repost feed.',
  'Approximately 86% of the original content the BetterUp GTM team produces does not translate to its actual private-sector enterprise CHRO buyer; it lands instead with coaches, marketing peers, engineering peers, federal program officers, and BetterUp employees themselves, which are the audiences the brand is already over-indexed against.',
  'Five of 21 voices operate as pure repost engines, sharing BetterUp company-page content more than ten times for every original piece they write; each repost burns a daily distribution credit on content the algorithm penalizes, in exchange for content that already reaches everyone in BetterUp\'s orbit through the company page directly.',
  'The CEO\'s commenting behavior in the 90-day window is overwhelmingly congratulating former BetterUp employees on landing roles at IBM, BCG, Workday, Salesforce, ServiceNow, Spreha, Otter, and Quantum; the talent-exodus narrative the brand health assessment flags as the Layer-4 cascade break is being authored, in real time and in public, in the CEO\'s own comment stream.',
  'The two voices with meaningful ICP-buyer engagement earn 20-35% CHRO commenter rates that are seven to ten times higher than every other voice on the team, not because they reach more people but because they have a discernible point of view on questions CHROs are asking; one of them appears to be transitioning out of BetterUp, which would leave a single voice doing the work the audit recommends.',
  'Of 12 named ICP buyers who do engage publicly with BetterUp content, exactly one — Manjuri Sinha, VP HR at Miro — appears across more than one BetterUp voice\'s threads, which means the relationships exist but are concentrated, narrow, and almost entirely captured by the two strongest voices on the team rather than distributed across the GTM organization.',
]

export const VOICE_GAP_QUOTE =
  'BetterUp built a brand around human transformation. The people closest to its customers are using their LinkedIn presence to amplify other people\'s words instead of contributing their own. That is not a personal-brand failure. It is a misunderstanding of what the buyer wants to hear and from whom. The CHRO does not want another BetterUp marketing post; she wants to know what a BetterUp seller actually thinks about why coaching works for some leadership teams and fails for others. That post does not exist on LinkedIn because the people who could write it are reposting infographics instead.'
