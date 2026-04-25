// SignalRiver.tsx — §04 signal catalog for the /v3 staging homepage.
// Static grid of 24 signal chips. No animation. Each chip has a left-edge
// color stripe matching the warmth stage most likely to fire.

interface Signal {
  name: string
  source: string
  stage: 'cold' | 'warming' | 'warm' | 'hot'
}

const SIGNALS: Signal[] = [
  { name: 'New CX Leader', source: 'LinkedIn', stage: 'cold' },
  { name: 'Hiring Surge', source: 'LinkedIn Jobs', stage: 'cold' },
  { name: 'Tech Stack Change', source: 'BuiltWith', stage: 'warming' },
  { name: 'Funding Round', source: 'Crunchbase', stage: 'warming' },
  { name: 'Traffic Spike', source: 'SimilarWeb', stage: 'cold' },
  { name: 'Review Sentiment', source: 'G2 / Trustpilot', stage: 'cold' },
  { name: 'Press Announcement', source: 'Google News', stage: 'cold' },
  { name: 'Social Complaint', source: 'X / Reddit', stage: 'cold' },
  { name: 'Website Visit', source: 'RB2B', stage: 'warming' },
  { name: 'Past Engagement', source: 'HubSpot', stage: 'warming' },
  { name: 'Content Download', source: 'HockeyStack', stage: 'warming' },
  { name: 'LinkedIn Post Reaction', source: 'LinkedIn', stage: 'cold' },
  { name: 'LinkedIn Comment', source: 'LinkedIn', stage: 'warming' },
  { name: 'LinkedIn Connection Request', source: 'LinkedIn', stage: 'warming' },
  { name: 'Email Reply', source: 'Gmail / Reply', stage: 'warm' },
  { name: 'Meeting Scheduled', source: 'Calendar', stage: 'warm' },
  { name: 'Product Launch', source: 'Company Blog', stage: 'cold' },
  { name: 'Competitor Mention', source: 'Google Alerts', stage: 'cold' },
  { name: 'Customer Review Theme', source: 'Trustpilot', stage: 'cold' },
  { name: 'Job Description Change', source: 'LinkedIn Jobs', stage: 'cold' },
  { name: 'Conference Attendance', source: 'Event Lists', stage: 'warming' },
  { name: 'Dark Social Mention', source: 'Common Room', stage: 'warming' },
  { name: 'Referral Intro', source: 'Gmail / Slack', stage: 'warm' },
  { name: 'Renewal Window', source: 'HubSpot', stage: 'warm' },
]

export default function SignalRiver() {
  return (
    <section id="signal-river">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">04 &nbsp; Signal catalog</div>
            <h2 className="section-h2">
              Twenty-four signals,<br />
              <span className="slab">constantly listening.</span>
            </h2>
          </div>
          <p className="section-lede">
            A sample of the signals we capture daily across named accounts.
            Each fires into the loop and triggers the right next action.{' '}
            <strong>Every engagement creates new signals.</strong>
          </p>
        </div>

        <div className="signal-grid">
          {SIGNALS.map((signal) => (
            <div
              key={signal.name}
              className={`signal-chip signal-chip--${signal.stage}`}
            >
              <div className="signal-name">{signal.name}</div>
              <div className="signal-source">{signal.source}</div>
            </div>
          ))}
        </div>

        <p className="signal-caption">
          Sample catalog. Signals expand with each new client.
        </p>
      </div>
    </section>
  )
}
