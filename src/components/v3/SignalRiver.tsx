// SignalRiver.tsx — §04 signal catalog for the /v3 staging homepage.
// Static grid of 24 signal chips. No animation. Each chip has a left-edge
// color stripe matching the warmth stage most likely to fire. The subtitle
// line is plain-speak (what the signal means), not the source platform.

interface Signal {
  name: string
  meaning: string
  stage: 'cold' | 'warming' | 'warm' | 'hot'
}

const SIGNALS: Signal[] = [
  { name: 'New CX Leader', meaning: 'New decision-maker arrives', stage: 'cold' },
  { name: 'Hiring Surge', meaning: 'Team scaling fast', stage: 'cold' },
  { name: 'Tech Stack Change', meaning: 'Just installed something new', stage: 'warming' },
  { name: 'Funding Round', meaning: 'Fresh budget on the table', stage: 'warming' },
  { name: 'Traffic Spike', meaning: 'Buyers researching this week', stage: 'cold' },
  { name: 'Review Sentiment', meaning: 'Customers complaining publicly', stage: 'cold' },
  { name: 'Press Announcement', meaning: 'New strategic direction', stage: 'cold' },
  { name: 'Social Complaint', meaning: 'Pain showing in public', stage: 'cold' },
  { name: 'Website Visit', meaning: 'Researching your solution', stage: 'warming' },
  { name: 'Past Engagement', meaning: 'Knows you. Worth re-engaging.', stage: 'warming' },
  { name: 'Content Download', meaning: 'Exploring a solution', stage: 'warming' },
  { name: 'LinkedIn Post Reaction', meaning: 'Interested in the topic', stage: 'cold' },
  { name: 'LinkedIn Comment', meaning: 'Engaging publicly', stage: 'warming' },
  { name: 'LinkedIn Connection Request', meaning: 'Wants to connect', stage: 'warming' },
  { name: 'Email Reply', meaning: 'Wrote back. Interested.', stage: 'warm' },
  { name: 'Meeting Scheduled', meaning: 'Booked a call', stage: 'warm' },
  { name: 'Product Launch', meaning: 'Making strategic moves', stage: 'cold' },
  { name: 'Competitor Mention', meaning: 'Comparing options', stage: 'cold' },
  { name: 'Customer Review Theme', meaning: 'Pattern of pain showing', stage: 'cold' },
  { name: 'Job Description Change', meaning: 'Role expanded. New scope.', stage: 'cold' },
  { name: 'Conference Attendance', meaning: 'Showed up to learn', stage: 'warming' },
  { name: 'Dark Social Mention', meaning: 'Talking about you privately', stage: 'warming' },
  { name: 'Referral Intro', meaning: 'Warm introduction', stage: 'warm' },
  { name: 'Renewal Window', meaning: 'Decision time approaching', stage: 'warm' },
]

export default function SignalRiver() {
  return (
    <section id="signal-river">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">05 &nbsp; Signal catalog</div>
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
              <div className="signal-meaning">{signal.meaning}</div>
            </div>
          ))}
        </div>

        <p className="signal-caption">
          Sample catalog. Signals expand with each new customer.
        </p>
      </div>
    </section>
  )
}
