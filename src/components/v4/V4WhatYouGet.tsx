/**
 * V4WhatYouGet — ▸02b "WHAT YOU GET" parchment band.
 *
 * Standalone parchment-ground section that names the operating model in
 * concrete weekly terms. Sits between ▸02 (magenta, three figures) and
 * ▸03 (white, what ERA is/isn't). Breaking up the magenta run with
 * parchment also signals the editorial gear-shift from "here is the
 * approach" to "here is what ERA does each week."
 *
 * Four timeline blocks: WEEK 01-02, WEEK 03-04, WEEK 05-08, ONGOING.
 * The ONGOING label intentionally has no special styling. Its placement
 * at the bottom is what makes the operating model legible.
 */

import { V4Header } from './V4Header'

const ROWS = [
  {
    label: 'WEEK 01-02',
    body:
      'A signal map of your top 50 accounts. Every buying trigger captured, every contact enriched, every relationship path drawn.',
  },
  {
    label: 'WEEK 03-04',
    body:
      'Plays written for each account, routed to your sellers in HubSpot. Your team opens Monday with a ranked queue, not a cold list.',
  },
  {
    label: 'WEEK 05-08',
    body:
      'The loop runs daily. Your sellers walk into conversations that started warming weeks before they arrived.',
  },
  {
    label: 'ONGOING',
    body:
      'We run the system with your team. Weekly play reviews, signal tuning, message refinement, account additions. Your sellers get sharper inputs. The loop gets smarter. Pipeline compounds.',
  },
]

export function V4WhatYouGet() {
  return (
    <section className="v4-section v4-section--whatyouget" id="whatyouget">
      <V4Header
        phase="▸02b · WHAT YOU GET"
        meta={['INSTALL THEN RUN', 'WEEKLY CADENCE', 'COMPOUNDS']}
      />

      <div className="v4-whatyouget">
        <div className="v4-whatyouget__header">
          <h2 className="v4-whatyouget__display">
            Not a project.<br />An operating layer.
          </h2>
          <p className="v4-whatyouget__subhead">
            We install the system, then run it with your team every week.
          </p>
        </div>

        <div className="v4-whatyouget__timeline">
          {ROWS.map(({ label, body }) => (
            <div key={label} className="v4-whatyouget__row">
              <div className="v4-whatyouget__label">{label}</div>
              <div className="v4-whatyouget__body">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
