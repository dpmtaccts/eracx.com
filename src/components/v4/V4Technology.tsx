/**
 * V4Technology — §06 of v4 marketing site.
 *
 * Ink-black-ground section. Dense Bloomberg-grid directory of all 24
 * signals ERA tracks, with their activation patterns and tech vendor
 * mappings. Magenta returns as accent here, threading visually back
 * to §02 Warmth — the section that introduced "signals compound."
 *
 * The density is the argument. Other agencies pitch their "process."
 * ERA publishes the implementation. A reader who scrolls this section
 * concludes ERA operates at a depth competitors can't match. That's
 * the entire purpose.
 *
 * Signal name / meaning / activation / tech all ported verbatim from
 * src/components/v3/SignalRiver.tsx (24 signals, no fabrication).
 * Categories applied here for v4 directory scannability — v3 doesn't
 * categorize them, so the assignment is editorial. See report for
 * any signal where the category is debatable.
 *
 * No card backgrounds. No zebra striping. Pure rule-separated grid.
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
  { name: 'Dark Social Mention', meaning: 'Talking about you privately', category: 'NETWORK', activation: 'Insider connection', tech: 'Champify · Slack' },
  { name: 'Referral Intro', meaning: 'Warm introduction', category: 'NETWORK', activation: 'VIP fast-track', tech: 'HubSpot · Slack' },
  { name: 'Renewal Window', meaning: 'Decision time approaching', category: 'FIRMOGRAPHIC', activation: 'Renewal reactivation', tech: 'HubSpot · Copper' },
]

const CATEGORY_CLASS: Record<Category, string> = {
  INTENT: 'v4-directory__cell--category--intent',
  BEHAVIORAL: 'v4-directory__cell--category--behavioral',
  NETWORK: 'v4-directory__cell--category--network',
  TECHNOGRAPHIC: 'v4-directory__cell--category--technographic',
  FIRMOGRAPHIC: 'v4-directory__cell--category--firmographic',
}

export function V4Technology() {
  return (
    <section className="v4-section v4-section--technology" id="tech">
      <V4Header
        phase="§06 · TECHNOLOGY"
        meta={['24 SIGNALS', '24 ACTIVATIONS', 'ZERO MANUAL TRIGGERS']}
      />

      <div className="v4-technology">
        <div className="v4-technology__header">
          <h2 className="v4-technology__display">
            Twenty-four signals.<br />Zero <em>guesswork</em>.
          </h2>
          <p className="v4-technology__lede">
            ERA captures signals across every channel that matters and
            fires the right activation when the pattern is real.{' '}
            <strong>Every signal has a tech vendor behind it</strong>,
            every activation has a tested pattern, and nothing fires
            manually.
          </p>
        </div>

        <div className="v4-directory">
          <div className="v4-directory__header-row">
            <div className="v4-directory__col-label">Signal</div>
            <div className="v4-directory__col-label">Category</div>
            <div className="v4-directory__col-label">What it triggers</div>
            <div className="v4-directory__col-label">Tech</div>
          </div>

          {SIGNALS.map((s) => (
            <div key={s.name} className="v4-directory__row">
              <div className="v4-directory__cell--name">
                {s.name}
                <span className="v4-directory__cell-meaning">{s.meaning}</span>
              </div>
              <div
                className={`v4-directory__cell--category ${CATEGORY_CLASS[s.category]}`}
              >
                {s.category}
              </div>
              <div className="v4-directory__cell--activation">{s.activation}</div>
              <div className="v4-directory__cell--tech">{s.tech}</div>
            </div>
          ))}
        </div>

        <div className="v4-technology__summary">
          24 SIGNALS · 24 TECH VENDORS · ALL FIRING TODAY
        </div>
      </div>
    </section>
  )
}
