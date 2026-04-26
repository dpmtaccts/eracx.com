// Thesis.tsx — §01 section for the /v3 staging homepage.
// Single-column vertical stack: small mono eyebrow, smaller setup
// line ("Forget vanity metrics."), giant italic-serif conclusion
// ("Build warmer pipeline."), then a body paragraph. The conclusion
// is the visual focal point — treat it like a hero moment.

export default function Thesis() {
  return (
    <section className="thesis" id="thesis">
      <div className="container">
        <div className="thesis-stack">
          <div className="eyebrow">01 &nbsp; The thesis</div>
          <p className="thesis-setup">Forget vanity metrics.</p>
          <h2 className="thesis-conclusion">Build warmer pipeline.</h2>
          <p className="thesis-body">
            Forms filled and demos booked aren&rsquo;t pipeline.{' '}
            <strong className="thesis-accent">Real pipeline</strong> is the
            relationship you build with ideal buyers{' '}
            <em className="thesis-emph">eighteen months</em> before
            they&rsquo;re ready to sign.
          </p>
        </div>
      </div>
    </section>
  )
}
