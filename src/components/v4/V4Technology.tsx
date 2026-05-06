/**
 * V4Technology — §06 of v4 marketing site.
 *
 * Ink-black-ground section. Brutalist box grid showing all 24 signals
 * ERA tracks, with their activation patterns and tech vendor mappings.
 * Each box has a colored top border that maps to category — magenta
 * for INTENT (most actionable) descending through white-alpha tints
 * for FIRMOGRAPHIC (most contextual). Scanning the grid horizontally,
 * the top-edges form a visual category map.
 *
 * Magenta returns as accent here, threading visually back to §02
 * Warmth — the section that introduced "signals compound."
 *
 * The density is the argument. Other agencies pitch their "process."
 * ERA publishes the implementation.
 *
 * Boxes are deliberately brutalist not SaaS: hard edges, no shadows,
 * no rounded corners, dense per-box content, mono number prefixes.
 * If this starts feeling like a feature grid, something has drifted.
 *
 * Signal list ported from src/components/v3/SignalRiver.tsx (24 rows).
 */

import { V4Header } from './V4Header'

type Category =
  | 'INTENT'
  | 'BEHAVIORAL'
  | 'NETWORK'
  | 'TECHNOGRAPHIC'
  | 'FIRMOGRAPHIC'

interface Signal {
  name: string
  meaning: string
  category: Category
  activation: string
  tech: string
  featured?: boolean
}

const SIGNALS: Signal[] = [
  { name: 'New CX Leader', meaning: 'New decision-maker arrives', category: 'INTENT', activation: 'Executive intro track', tech: 'Clay · Apollo' },
  { name: 'Hiring Surge', meaning: 'Team scaling fast', category: 'INTENT', activation: 'Capacity expansion outreach', tech: 'Apollo · LinkedIn' },
  { name: 'Tech Stack Change', meaning: 'Just installed something new', category: 'TECHNOGRAPHIC', activation: 'Integration partnership pitch', tech: 'BuiltWith · HG Insights' },
  { name: 'Funding Round', meaning: 'Fresh budget on the table', category: 'INTENT', activation: 'Strategic investment outreach', tech: 'Crunchbase · Apollo' },
  { name: 'Traffic Spike', meaning: 'Buyers researching this week', category: 'BEHAVIORAL', activation: 'Warmed inbound trigger', tech: 'HockeyStack · RB2B' },
  { name: 'Review Sentiment', meaning: 'Customers complaining publicly', category: 'BEHAVIORAL', activation: 'Switch pitch sequence', tech: 'G2 · Trustpilot' },
  { name: 'Press Announcement', meaning: 'New strategic direction', category: 'INTENT', activation: 'Strategic alignment outreach', tech: 'Clay · Crunchbase' },
  { name: 'Social Complaint', meaning: 'Pain showing in public', category: 'BEHAVIORAL', activation: 'Reactive support pitch', tech: 'LinkedIn · Champify' },
  { name: 'Website Visit', meaning: 'Researching your solution', category: 'BEHAVIORAL', activation: 'Warm follow-up sequence', tech: 'HockeyStack · RB2B' },
  { name: 'Past Engagement', meaning: 'Knows you. Worth re-engaging.', category: 'BEHAVIORAL', activation: 'Re-engagement sequence', tech: 'HubSpot · Copper' },
  { name: 'Content Download', meaning: 'Exploring a solution', category: 'BEHAVIORAL', activation: 'Value-driven nurture', tech: 'HubSpot · HockeyStack' },
  { name: 'LinkedIn Post Reaction', meaning: 'Interested in the topic', category: 'BEHAVIORAL', activation: 'Topic-aligned outreach', tech: 'Dripify · Clay' },
  { name: 'LinkedIn Comment', meaning: 'Engaging publicly', category: 'BEHAVIORAL', activation: 'Comment-thread engagement', tech: 'Dripify · Clay' },
  { name: 'LinkedIn Connection', meaning: 'Wants to connect', category: 'NETWORK', activation: 'Founder-led nurture', tech: 'Dripify · Salesforge' },
  { name: 'Email Reply', meaning: 'Wrote back. Interested.', category: 'BEHAVIORAL', activation: 'Multi-thread acceleration', tech: 'Salesforge · HubSpot' },
  { name: 'Meeting Scheduled', meaning: 'Booked a call', category: 'BEHAVIORAL', activation: 'Pre-meeting prep dossier', tech: 'HubSpot · Fireflies' },
  { name: 'Product Launch', meaning: 'Making strategic moves', category: 'INTENT', activation: 'Strategic alignment outreach', tech: 'Crunchbase · Clay' },
  { name: 'Competitor Mention', meaning: 'Comparing options', category: 'BEHAVIORAL', activation: 'Differentiation pitch', tech: 'G2 · LinkedIn' },
  { name: 'Customer Review Theme', meaning: 'Pattern of pain showing', category: 'BEHAVIORAL', activation: 'Pain-pattern outreach', tech: 'G2 · Trustpilot' },
  { name: 'Job Description Change', meaning: 'Role expanded. New scope.', category: 'INTENT', activation: 'Role-aware approach', tech: 'Apollo · LinkedIn' },
  { name: 'Conference Attendance', meaning: 'Showed up to learn', category: 'BEHAVIORAL', activation: 'Event follow-up sequence', tech: 'LinkedIn · Apollo' },
  { name: 'Dark Social Mention', meaning: 'Talking about you privately', category: 'NETWORK', activation: 'Insider connection', tech: 'Champify · Slack', featured: true },
  { name: 'Referral Intro', meaning: 'Warm introduction', category: 'NETWORK', activation: 'VIP fast-track', tech: 'HubSpot · Slack', featured: true },
  { name: 'Renewal Window', meaning: 'Decision time approaching', category: 'FIRMOGRAPHIC', activation: 'Renewal reactivation', tech: 'HubSpot · Copper' },
]

const CATEGORY_MOD: Record<Category, string> = {
  INTENT: 'v4-signal-box--intent',
  BEHAVIORAL: 'v4-signal-box--behavioral',
  NETWORK: 'v4-signal-box--network',
  TECHNOGRAPHIC: 'v4-signal-box--technographic',
  FIRMOGRAPHIC: 'v4-signal-box--firmographic',
}

export function V4Technology() {
  const total = SIGNALS.length
  return (
    <section className="v4-section v4-section--technology" id="tech">
      <V4Header
        phase="§06 · TECHNOLOGY"
        meta={['24 SIGNALS', '24 ACTIVATIONS', 'ZERO MANUAL TRIGGERS']}
      />

      <div className="v4-technology">
        <div className="v4-technology__header">
          <h2 className="v4-technology__display">
            24 <em>live</em> data signals
          </h2>
          <p className="v4-technology__lede">
            ERA captures signals across every channel that matters and
            fires the right activation when the pattern is real.{' '}
            <strong>Every signal has a tech vendor behind it</strong>,
            every activation has a tested pattern, and nothing fires
            manually.
          </p>
        </div>

        <div className="v4-signal-grid">
          {SIGNALS.map((s, i) => {
            const classes = [
              'v4-signal-box',
              CATEGORY_MOD[s.category],
              s.featured ? 'v4-signal-box--featured' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <article key={s.name} className={classes}>
                {s.featured && (
                  <span className="v4-signal-box__spotlight">SPOTLIGHT</span>
                )}
                <div className="v4-signal-box__num">
                  {String(i + 1).padStart(2, '0')} / {total}
                </div>
                <div className="v4-signal-box__name">{s.name}</div>
                <div className="v4-signal-box__meaning">{s.meaning}</div>
                <div className="v4-signal-box__rule" aria-hidden="true" />
                <div className="v4-signal-box__activation">{s.activation}</div>
                <div className="v4-signal-box__tech">{s.tech}</div>
                <div className="v4-signal-box__category">{s.category}</div>
              </article>
            )
          })}
        </div>

        <div className="v4-technology__summary">
          24 SIGNALS · 24 TECH VENDORS · ALL FIRING TODAY
        </div>
      </div>
    </section>
  )
}
