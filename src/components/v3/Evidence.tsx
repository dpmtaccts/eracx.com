// Evidence.tsx — §02 section for the /v3 staging homepage.
// Four big-number tiles (warmth lift, reply rate, time to live, handoff),
// a client logo wall (wordmarks for now; swap for raster logos later),
// and a single pull quote. Copy + labels verbatim from the source HTML.

interface BigNum {
  label: string
  value: string
  unit: string
  context: React.ReactNode
}

const BIG_NUMBERS: BigNum[] = [
  {
    label: 'Warmth lift',
    value: '+40',
    unit: 'pts',
    context: (
      <>
        Average composite lift per <b>engaged named account</b>, 90 days after
        handoff.
      </>
    ),
  },
  {
    label: 'Reply rate',
    value: '3.2',
    unit: '×',
    context: (
      <>
        Reply rate on warmed accounts vs. <b>baseline cold sequences</b>,
        matched ICP.
      </>
    ),
  },
  {
    label: 'Time to live',
    value: '4',
    unit: 'wk',
    context: (
      <>
        Audit to live system. Fixed scope. <b>One sprint, no extensions.</b>
      </>
    ),
  },
  {
    label: 'Handoff rate',
    value: '100',
    unit: '%',
    context: (
      <>
        Client teams running the system <b>without ERA in the room</b> at week
        five.
      </>
    ),
  },
]

interface Logo {
  name: string
  tag: string
}

const LOGOS: Logo[] = [
  { name: 'Netrush', tag: 'E-commerce · BD' },
  { name: 'Navalent', tag: 'Consulting · GTM' },
  { name: 'Miniac', tag: 'SaaS · Content' },
  { name: 'POP', tag: 'Agency · Systems' },
  { name: 'Seismic', tag: 'Enterprise · ABM' },
]

export default function Evidence() {
  return (
    <section id="evidence">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">§02 &nbsp; Evidence</div>
            <h2 className="section-h2">
              The numbers<br />
              <span className="slab">
                before <span className="accent">the narrative.</span>
              </span>
            </h2>
          </div>
          <div className="section-lede">
            <p>
              Audited results across engagements. Quotes come after the
              numbers, not before.
            </p>
          </div>
        </div>

        <div className="big-numbers">
          {BIG_NUMBERS.map((n) => (
            <div key={n.label} className="big-num">
              <div className="big-num-label">{n.label}</div>
              <div className="big-num-value">
                {n.value}
                <span className="big-num-unit">{n.unit}</span>
              </div>
              <p className="big-num-context">{n.context}</p>
            </div>
          ))}
        </div>

        <div className="logo-wall-head">
          <div className="logo-wall-title">
            <b>Current</b> engagements.
          </div>
          <div className="logo-wall-meta">
            [ client marks to replace wordmarks ]
          </div>
        </div>
        <div className="logo-wall">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="logo-cell">
              <div className="logo-mark">
                {logo.name}
                <small>{logo.tag}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="pull-quote">
          <div className="pull-quote-mark">&ldquo;</div>
          <div className="pull-quote-text">
            We had a pipeline problem. Turns out we had{' '}
            <em>a warmth problem.</em>
          </div>
          <div className="pull-quote-attrib">
            <b>[ Client name ]</b>
            <small>[ Role · Company ]</small>
          </div>
        </div>
      </div>
    </section>
  )
}
