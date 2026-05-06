/**
 * V4Warmth — §02 The Method.
 *
 * Magenta-ground positioning section. Replaces the prior pentagon +
 * timeline + stat-band treatment that visualized FRVRD. The marketing
 * site now sells the system; FRVRD's geometry stays in the Halo product
 * UI and audit reports.
 *
 * Structure:
 *  - Issue bar
 *  - Anton mega two-line headline ("Buyers left the funnel. / We rebuilt
 *    go-to-market without it.")
 *  - IBM Plex standfirst on buyer behavior
 *  - 3-column WHAT / HOW / WHY block, mono labels with 1px white-30
 *    rule, IBM Plex body
 *
 * The §06 Technology section still uses the FRVRD framework names; the
 * pentagon visualization is intentionally gone here.
 */

import { V4Header } from './V4Header'

const COLUMNS = [
  {
    label: 'WHAT',
    body:
      'We design the GTM system around your accounts: which signals to watch, which loops to run, which moments to act on. Then we run it with your team.',
  },
  {
    label: 'HOW',
    body:
      'AI captures buyer signals across email, calendar, content, social, and deal motion. Five dimensions feed a daily relationship score: frequency, recency, value, responsiveness, density. Built on decades of enterprise GTM experience.',
  },
  {
    label: 'WHY',
    body:
      'Pipeline measures activity. The warmth score measures the relationship itself, and direction predicts closing better than stage does.',
  },
]

export function V4Warmth() {
  return (
    <section className="v4-section v4-section--warmth" id="warmth">
      <V4Header
        phase="§ 02 · THE METHOD"
        meta={['ACCOUNT 047', 'MULTI-INPUT TRAJECTORY', '14 WEEKS']}
      />

      <div className="v4-warmth">
        <h2 className="v4-warmth__display">
          Buyers left the funnel.<br />
          We rebuilt go-to-market without it.
        </h2>

        <p className="v4-warmth__standfirst">
          Today's B2B buyers research in private, decide before talking to
          sales, and ignore cold outreach. We help mid-market companies
          build GTM systems that meet buyers where they actually are: in
          feeds, peer chats, and Slack channels you'll never see.
        </p>

        <div className="v4-method">
          {COLUMNS.map(({ label, body }) => (
            <div key={label} className="v4-method__col">
              <p className="v4-method__label">{label}</p>
              <p className="v4-method__body">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
