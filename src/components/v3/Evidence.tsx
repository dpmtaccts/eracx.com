// Evidence.tsx — §02 section for the /v3 staging homepage.
// Four big-number tiles (warmth lift, reply rate, time to live, handoff),
// followed by two client testimonials sourced verbatim from the v2
// Clients section (src/pages/V2OperatingSystem/content.ts → clients.items):
// Nate Houghton (Lorikeet) and Lara Vandenberg (Publicist).

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

interface Testimonial {
  quote: string
  photo: string
  photoAlt: string
  name: string
  role: string
  companyLogo: string
  companyLogoAlt: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Justin builds the thing most consultants just talk about. Actual operational systems. Scoring, enrichment, sequencing, CRM. When he hands it off, your team can run it.',
    photo: '/images/betterup/nathaniel-houghton.jpeg',
    photoAlt: 'Nate Houghton',
    name: 'Nate Houghton',
    role: 'Head of Sales, Americas',
    companyLogo: '/images/navalent/Lorikeet_logo_color.png',
    companyLogoAlt: 'Lorikeet',
  },
  {
    quote:
      'Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, customer success, and account management.',
    photo: '/images/lara-vandenberg.jpeg',
    photoAlt: 'Lara Vandenberg',
    name: 'Lara Vandenberg',
    role: 'Founder, Publicist',
    companyLogo: '/assets/clients/publicist.png',
    companyLogoAlt: 'Publicist',
  },
]

export default function Evidence() {
  return (
    <section id="evidence">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02 &nbsp; Evidence</div>
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

        <div className="testimonials">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="testimonial">
              <div className="testimonial-mark">&ldquo;</div>
              <blockquote className="testimonial-quote">{t.quote}</blockquote>
              <figcaption className="testimonial-meta">
                <img
                  className="testimonial-photo"
                  src={t.photo}
                  alt={t.photoAlt}
                />
                <div className="testimonial-attrib">
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </div>
                <img
                  className="testimonial-company-logo"
                  src={t.companyLogo}
                  alt={t.companyLogoAlt}
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
