// HowItWorksHeader.tsx — Section opener for §02 (How it works).
// Sits above FrvrdSection in V3.tsx and carries the umbrella narrative
// for the four 02.x subsections that follow (Why warmth, What we listen
// for, How the loop runs, One account six weeks). Anchor target #how
// lives here so the top-nav "How it works" link lands on this header
// before scrolling into the FRVRD pinned animation.

export default function HowItWorksHeader() {
  return (
    <div className="how-header" id="how">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02 &nbsp; How it works</div>
            <h2 className="section-h2">
              We install systems that know what happens
              when activity runs.
            </h2>
          </div>
          <p className="section-lede">
            Most agencies enable activity. We install the loop underneath it.
            Every activation generates a signal. Every signal triggers the
            next activation.{' '}
            <strong>
              Warmth compounds because the system never stops listening.
            </strong>
          </p>
        </div>
      </div>
    </div>
  )
}
