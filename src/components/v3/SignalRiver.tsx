// SignalRiver.tsx — §02.B "What we already run". Static grid of 24
// signal cards. Each card now carries four pieces of content: signal
// name, what it means, the activation ERA fires in response, and the
// tech stack used to detect or fire it. The thin rule between the
// "what" and the "how" visually separates description from operations.

interface Signal {
  name: string
  meaning: string
  activation: string
  tech: string
}

const SIGNALS: Signal[] = [
  // Row 1
  {
    name: 'New CX Leader',
    meaning: 'New decision-maker arrives',
    activation: 'Executive intro track',
    tech: 'Clay · Apollo',
  },
  {
    name: 'Hiring Surge',
    meaning: 'Team scaling fast',
    activation: 'Capacity expansion outreach',
    tech: 'Apollo · LinkedIn',
  },
  {
    name: 'Tech Stack Change',
    meaning: 'Just installed something new',
    activation: 'Integration partnership pitch',
    tech: 'BuiltWith · HG Insights',
  },
  {
    name: 'Funding Round',
    meaning: 'Fresh budget on the table',
    activation: 'Strategic investment outreach',
    tech: 'Crunchbase · Apollo',
  },
  {
    name: 'Traffic Spike',
    meaning: 'Buyers researching this week',
    activation: 'Warmed inbound trigger',
    tech: 'HockeyStack · RB2B',
  },
  {
    name: 'Review Sentiment',
    meaning: 'Customers complaining publicly',
    activation: 'Switch pitch sequence',
    tech: 'G2 · Trustpilot',
  },

  // Row 2
  {
    name: 'Press Announcement',
    meaning: 'New strategic direction',
    activation: 'Strategic alignment outreach',
    tech: 'Clay · Crunchbase',
  },
  {
    name: 'Social Complaint',
    meaning: 'Pain showing in public',
    activation: 'Reactive support pitch',
    tech: 'LinkedIn · Champify',
  },
  {
    name: 'Website Visit',
    meaning: 'Researching your solution',
    activation: 'Warm follow-up sequence',
    tech: 'HockeyStack · RB2B',
  },
  {
    name: 'Past Engagement',
    meaning: 'Knows you. Worth re-engaging.',
    activation: 'Re-engagement sequence',
    tech: 'HubSpot · Copper',
  },
  {
    name: 'Content Download',
    meaning: 'Exploring a solution',
    activation: 'Value-driven nurture',
    tech: 'HubSpot · HockeyStack',
  },
  {
    name: 'LinkedIn Post Reaction',
    meaning: 'Interested in the topic',
    activation: 'Topic-aligned outreach',
    tech: 'Dripify · Clay',
  },

  // Row 3
  {
    name: 'LinkedIn Comment',
    meaning: 'Engaging publicly',
    activation: 'Comment-thread engagement',
    tech: 'Dripify · Clay',
  },
  {
    name: 'LinkedIn Connection',
    meaning: 'Wants to connect',
    activation: 'Founder-led nurture',
    tech: 'Dripify · Salesforge',
  },
  {
    name: 'Email Reply',
    meaning: 'Wrote back. Interested.',
    activation: 'Multi-thread acceleration',
    tech: 'Salesforge · HubSpot',
  },
  {
    name: 'Meeting Scheduled',
    meaning: 'Booked a call',
    activation: 'Pre-meeting prep dossier',
    tech: 'HubSpot · Fireflies',
  },
  {
    name: 'Product Launch',
    meaning: 'Making strategic moves',
    activation: 'Strategic alignment outreach',
    tech: 'Crunchbase · Clay',
  },
  {
    name: 'Competitor Mention',
    meaning: 'Comparing options',
    activation: 'Differentiation pitch',
    tech: 'G2 · LinkedIn',
  },

  // Row 4
  {
    name: 'Customer Review Theme',
    meaning: 'Pattern of pain showing',
    activation: 'Pain-pattern outreach',
    tech: 'G2 · Trustpilot',
  },
  {
    name: 'Job Description Change',
    meaning: 'Role expanded. New scope.',
    activation: 'Role-aware approach',
    tech: 'Apollo · LinkedIn',
  },
  {
    name: 'Conference Attendance',
    meaning: 'Showed up to learn',
    activation: 'Event follow-up sequence',
    tech: 'LinkedIn · Apollo',
  },
  {
    name: 'Dark Social Mention',
    meaning: 'Talking about you privately',
    activation: 'Insider connection',
    tech: 'Champify · Slack',
  },
  {
    name: 'Referral Intro',
    meaning: 'Warm introduction',
    activation: 'VIP fast-track',
    tech: 'HubSpot · Slack',
  },
  {
    name: 'Renewal Window',
    meaning: 'Decision time approaching',
    activation: 'Renewal reactivation',
    tech: 'HubSpot · Copper',
  },
]

export default function SignalRiver() {
  return (
    <section id="signal-river" className="subsection">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02.B &nbsp; What we already run</div>
            <h2 className="section-h2">
              Twenty-four signals,<br />
              <span className="slab">constantly listening.</span>
            </h2>
          </div>
          <p className="section-lede">
            Twenty-four signals, each with a defined activation and a tested
            tech stack.{' '}
            <strong>We don&rsquo;t ask you to onboard tools.</strong> The
            playbook is already running.
          </p>
        </div>

        <div className="signal-grid">
          {SIGNALS.map((signal) => (
            <div key={signal.name} className="signal-chip">
              <div className="signal-name">{signal.name}</div>
              <div className="signal-meaning">{signal.meaning}</div>
              <div className="signal-rule" aria-hidden="true" />
              <div className="signal-cell">
                <div className="signal-eyebrow">Activation</div>
                <div className="signal-action">{signal.activation}</div>
              </div>
              <div className="signal-cell">
                <div className="signal-eyebrow">Tech</div>
                <div className="signal-tech">{signal.tech}</div>
              </div>
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
