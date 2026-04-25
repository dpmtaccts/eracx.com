// Thesis.tsx — Chalk-background band with the binary-choice thesis.
// Left: italic serif question forcing vanity-vs-relationships. Right: a
// single two-sentence paragraph; "Real pipeline" bold-accented and
// "eighteen months" italic-accented.

export default function Thesis() {
  return (
    <section className="thesis" id="thesis">
      <div className="container">
        <div className="thesis-grid">
          <p className="thesis-q">
            You can invest in <span className="mark">vanity metrics</span> or
            invest in building relationships with the buyers who&rsquo;ll
            actually pay you. Which one is your pipeline funded for?
          </p>
          <div className="thesis-body">
            <p>
              Forms filled and demos booked aren&rsquo;t pipeline.{' '}
              <strong className="thesis-accent">Real pipeline</strong> is the
              relationship you build with ideal buyers{' '}
              <em className="thesis-emph">eighteen months</em> before
              they&rsquo;re ready to sign.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
