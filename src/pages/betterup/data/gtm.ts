export interface DimensionScore {
  label: string
  score: number
  note?: string
}

export interface CommenterSample {
  label: string
  note: string
  list: { name: string; title: string; tag: 'coach' | 'practitioner' | 'former' | 'icp' | 'employee' }[]
}

export interface GTMChannel {
  id: 'ceo' | 'marketing' | 'sales' | 'accounts' | 'coaches' | 'champions'
  tab: string
  name: string
  title: string
  followers?: string
  score: number
  metrics: { value: string; label: string }[]
  dimensions: DimensionScore[]
  keyFinding: string
  threeThings: string[]
  commenterSample?: CommenterSample
}

export const GTM_COMPOSITE_SCORE = 24

export const GTM_HEADLINE = 'Your buyer encounters your brand through people, not through pages, and the people they meet on the way to a purchase decision are deciding whether the rest of the conversation is worth having.'

export const GTM_REFRAME = `This is less a CEO LinkedIn audit than a survey of the entire human surface area BetterUp presents to a buyer in due diligence. The question worth asking is not whether one executive is posting well, but whether the chain of people a CHRO will inevitably encounter (the CEO, the marketing leader, the seller assigned to the account, the account manager who will own the relationship after close, the coaches who will deliver the work, the client champions whose names appear in case studies) collectively builds the conviction the product deserves. Across six profiles and several months of activity, the chain is broken in nearly every link, and the breakage is consistent enough to read as a pattern rather than a personal failure.`

export const CHANNELS: GTMChannel[] = [
  {
    id: 'ceo',
    tab: 'CEO',
    name: 'Alexi Robichaux',
    title: 'CEO & Co-Founder, BetterUp',
    followers: '~48K',
    score: 24,
    metrics: [
      { value: '~11', label: 'Posts (12 mo)' },
      { value: '270', label: 'Avg reactions' },
      { value: '6%', label: 'ICP commenter match' },
      { value: '2', label: 'Original posts' },
    ],
    dimensions: [
      { label: 'Authority', score: 62, note: 'Recognized as category creator, but content does not demonstrate enterprise expertise.' },
      { label: 'Trust', score: 30, note: 'Builds brand awareness, not buyer trust.' },
      { label: 'Distribution', score: 25, note: 'Engagement is internal orbit, not reaching buyer feeds.' },
      { label: 'Relationship', score: 20, note: '62% of comment behavior is internal, 0% with buyers.' },
      { label: 'Funnel Mix', score: 15, note: '100% top of funnel, zero consideration or decision content.' },
      { label: 'Business Impact', score: 20, note: 'Zero ROI data, zero client outcomes with metrics.' },
    ],
    keyFinding:
      'Alexi\'s conviction is real. His attention is inward. 62% of his comment engagement goes to current or former BetterUp employees. The enterprise buyer who would write a $2M check does not appear in his engagement data.',
    commenterSample: {
      label: 'Sample of recent commenters on Alexi\'s posts',
      note: '6% ICP match. Coaches and former employees dominate. One verified buyer (Manjuri Sinha, VP HR at Miro) across the entire dataset.',
      list: [
        { name: 'Joe Komara', title: 'BetterUp Coach', tag: 'coach' },
        { name: 'Sukh Mishraa', title: 'BetterUp Coach', tag: 'coach' },
        { name: 'Kelly Labrecque', title: 'BetterUp Coach', tag: 'coach' },
        { name: 'Jennifer B.', title: 'L&D practitioner', tag: 'practitioner' },
        { name: 'Lauren R.', title: 'Former BetterUp employee', tag: 'former' },
        { name: 'Manjuri Sinha', title: 'VP HR, Miro', tag: 'icp' },
      ],
    },
    threeThings: [
      'Shift 60% of content from philosophy to outcome language. Every post about human potential needs a companion post about retention rates, manager effectiveness, or coaching ROI.',
      'Build a CHRO 100 list. Ten strategic connection requests per week to CHROs at target accounts. Comment substantively on their content before expecting them to engage with his.',
      'Stop congratulating departures. Every "Congrats on the new role" comment on a former employee\'s departure post reinforces the turnover narrative that Glassdoor already documents.',
    ],
  },
  {
    id: 'marketing',
    tab: 'MARKETING',
    name: 'Amy Spieth',
    title: 'SVP of Marketing, BetterUp',
    score: 18,
    metrics: [
      { value: '3', label: 'Posts (12 mo)' },
      { value: '44', label: 'Avg reactions' },
      { value: '0%', label: 'ICP commenter match' },
      { value: '0', label: 'Original (12+ mo)' },
    ],
    dimensions: [
      { label: 'Authority', score: 10, note: 'The SVP of Marketing has no visible thought leadership.' },
      { label: 'Trust', score: 12, note: 'Content is event promotion only.' },
      { label: 'Distribution', score: 20, note: 'Low volume means low algorithmic reach.' },
      { label: 'Relationship', score: 8, note: 'No visible engagement with buyers, analysts, or industry voices.' },
      { label: 'Funnel Mix', score: 10, note: '100% event promotion.' },
      { label: 'Business Impact', score: 5, note: 'Zero buyer-relevant content.' },
    ],
    keyFinding:
      'The person responsible for BetterUp\'s market narrative is invisible on the platform where enterprise buyers research. Her LinkedIn headline still references her previous employer. This is a critical signal gap.',
    threeThings: [
      'Publish one original post per week with a point of view on the enterprise coaching market. Not company announcements. Original thinking.',
      'Update the headline. "SVP of Marketing at BetterUp, ex-Upwork" tells the buyer nothing about what she brings to the conversation.',
      'Engage with five industry voices per week (analysts, CHROs, L&D leaders). Build visibility before expecting visibility in return.',
    ],
  },
  {
    id: 'sales',
    tab: 'SALES',
    name: 'Jonathan Chang',
    title: 'Senior Enterprise Account Manager, BetterUp',
    score: 15,
    metrics: [
      { value: '3', label: 'Posts (12 mo)' },
      { value: '80', label: 'Avg reactions' },
      { value: '0%', label: 'ICP match post-hire' },
      { value: '1', label: 'Original post' },
    ],
    dimensions: [
      { label: 'Authority', score: 10, note: 'No visible expertise on coaching, leadership development, or enterprise HR.' },
      { label: 'Trust', score: 8, note: 'No content that would make a CHRO take a meeting.' },
      { label: 'Distribution', score: 10, note: 'Posting too infrequently for algorithmic reach.' },
      { label: 'Relationship', score: 20, note: 'New-position commenters include ICP-adjacent contacts he has not engaged with since.' },
      { label: 'Funnel Mix', score: 5, note: 'No funnel-relevant content.' },
      { label: 'Business Impact', score: 5, note: 'Zero client outcomes, zero ROI content.' },
    ],
    keyFinding:
      'A senior enterprise seller whose LinkedIn generates zero pipeline signal. In a world where 70% of the buying journey happens before sales contact, this profile is not building pre-sale trust.',
    threeThings: [
      'Post one client outcome story per month, anonymized if needed. "A Fortune 500 CHRO told me..." is more valuable than any company repost.',
      'Comment on three to five CHRO or CLO posts per week. Substantive comments (50+ words) that demonstrate understanding of their challenges.',
      'Share the "why BetterUp" story in his own words. Not the company page version. His version, informed by the conversations he has with buyers every day.',
    ],
  },
  {
    id: 'accounts',
    tab: 'ACCOUNTS',
    name: 'Willi Miller',
    title: 'Sr. Account Manager, BetterUp',
    score: 28,
    metrics: [
      { value: '~10', label: 'Posts (18 mo)' },
      { value: '48', label: 'Avg reactions' },
      { value: '0%', label: 'ICP commenter match' },
      { value: '2', label: 'Original posts' },
    ],
    dimensions: [
      { label: 'Authority', score: 25, note: 'No visible expertise content.' },
      { label: 'Trust', score: 40, note: 'Authentic voice, genuine enthusiasm, but not directed at buyer.' },
      { label: 'Distribution', score: 30, note: 'Personal content gets decent reach within network.' },
      { label: 'Relationship', score: 25, note: 'Engagement is personal network and BetterUp colleagues.' },
      { label: 'Funnel Mix', score: 15, note: 'No consideration or decision content.' },
      { label: 'Business Impact', score: 25, note: 'ButcherBox repost is the closest thing to proof content across all profiles.' },
    ],
    keyFinding:
      'Willi has the ingredients: authentic voice, genuine conviction, real client relationships, Presidents Club performance. What\'s missing is a strategy for converting personal credibility into buyer-facing content.',
    threeThings: [
      'Turn client relationships into content. One post per month about what a client is achieving, why it matters, and what she learned from the engagement.',
      'Share the "what I wish CHROs knew" perspective. Her daily conversations with enterprise buyers contain insights no marketing team can replicate.',
      'Keep the personal voice. The Mexico photos and Presidents Club celebrations show a real human. Don\'t lose that. Layer buyer-relevant content alongside it.',
    ],
  },
  {
    id: 'coaches',
    tab: 'COACHES',
    name: 'Coach Network',
    title: '4,000+ certified coaches across 75+ languages',
    score: 30,
    metrics: [
      { value: '2,712', label: 'LinkedIn-associated coaches' },
      { value: '60', label: 'Loyalty score (declining)' },
      { value: '~10%', label: 'Posting actively' },
      { value: '400+', label: 'Latent ambassadors' },
    ],
    dimensions: [
      { label: 'Authority', score: 45, note: 'Individual coaches carry credibility within their networks.' },
      { label: 'Trust', score: 35, note: 'Glassdoor and Indeed reviews show declining sentiment.' },
      { label: 'Distribution', score: 30, note: 'No coordinated content amplification.' },
      { label: 'Relationship', score: 30, note: 'Coaches are connected to HR leaders but not engaged on BetterUp\'s behalf.' },
      { label: 'Funnel Mix', score: 20, note: 'No structured content program.' },
      { label: 'Business Impact', score: 20, note: 'Outcome stories live with coaches, not in market.' },
    ],
    keyFinding:
      '4,000+ coaches are BetterUp\'s most visible human touchpoint. Each one has their own network of HR leaders, L&D practitioners, and enterprise buyers. If 10% were actively posting about BetterUp outcomes, that\'s 400 organic pipeline generators. Currently, they are an unmeasured, unmanaged, and increasingly disengaged channel.',
    threeThings: [
      'Launch a Coach Ambassador program with fair compensation, communication transparency, content templates, and platform governance input.',
      'Address the Glassdoor and Indeed pay disputes operationally before any content program. Detractors don\'t become advocates.',
      'Build a content library coaches can adapt: outcome stories, framework explainers, point-of-view posts. Make sharing easy.',
    ],
  },
  {
    id: 'champions',
    tab: 'CHAMPIONS',
    name: 'Client Champions',
    title: '750+ enterprise clients, ~25 high-leverage CHRO advocates',
    score: 20,
    metrics: [
      { value: '750+', label: 'Enterprise clients' },
      { value: '1', label: 'Verified ICP commenter (across all profiles)' },
      { value: '0', label: 'Active advocacy program' },
      { value: '25', label: 'High-leverage targets' },
    ],
    dimensions: [
      { label: 'Authority', score: 55, note: 'CHROs at Pfizer, Lumen, Patagonia carry peer credibility.' },
      { label: 'Trust', score: 45, note: 'Client voice is the most credible voice in the category.' },
      { label: 'Distribution', score: 15, note: 'No platform exists to surface their voice.' },
      { label: 'Relationship', score: 20, note: 'Relationships exist offline, not on LinkedIn.' },
      { label: 'Funnel Mix', score: 10, note: 'No co-authored content, no client spotlight series.' },
      { label: 'Business Impact', score: 15, note: 'Outcomes are not being told publicly by the people who lived them.' },
    ],
    keyFinding:
      'Client champions are the most credible voice in BetterUp\'s go-to-market. A CHRO at Pfizer posting about coaching outcomes carries more weight with a peer CHRO than any BetterUp employee post. This channel exists in theory but is not being activated on LinkedIn.',
    threeThings: [
      'Identify 25 client-side champions (CHROs, CLOs, VP Talent at current accounts). Build a quarterly engagement cadence.',
      'Launch a Client Voices content program: co-authored posts, case study spotlights, Uplift recap content featuring their perspective.',
      'Reframe the goal. The point is not to get them to promote BetterUp. The point is to give them a platform to talk about what they\'re achieving, with BetterUp as the enabler.',
    ],
  },
]

export const MOODLIGHT_CALLOUTS = {
  whyChainMatters:
    'The enterprise buyer BetterUp targets lives in curated information feeds, not social discourse. They consume in private, decide in committee, and share only what makes them look informed, not enthusiastic. The GTM team must produce content the buyer would save and share internally, not content that generates public likes.',
  whyPhilosophyFails:
    '84% of conversation around BetterUp\'s category is emotionally neutral. Curiosity is the only positive emotion with meaningful volume, and even it\'s "cool curiosity," the kind that reads the article but doesn\'t share it. Philosophical content does not penetrate this emotional lockdown. Proof content does.',
  whatBuyerWants:
    'The audience speaks in operational language, not aspirational language. They signal trust through "measurable impact on manager effectiveness," "consolidated tech stack," "integration with our existing HRIS," "time-to-productivity for new managers," "we replaced three vendors with one platform." The GTM team is speaking none of this language on LinkedIn.',
  shareTest:
    'The buyer will not share content that makes them sound like they drank the coaching Kool-Aid. They will share content that makes them sound like a sharp operator who found an efficiency. Every piece of LinkedIn content from BetterUp\'s GTM team should pass this test.',
}
