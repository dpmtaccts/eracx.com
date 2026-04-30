// Hero.tsx — Minimal typographic hero for the /v3 staging homepage.
// Single-column stack: italic-serif two-line headline, sans-serif subhead,
// two CTAs. No animation, no callout boxes, no figure references — the
// argument lands, then Section 02 carries the evidence.

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-stack">
          <h1 className="hero-title">
            Clicks don't close.
            <br />
            Relationships do.
          </h1>
          <p className="hero-lede">
            Era is a new way to build pipeline. A go-to-market system designed
            and operated by experts who measure what actually closes deals:
            warmth with the buyers who matter, not clicks that end up on a
            slide.
          </p>
          <div className="hero-cta-row">
            <a href="#cta" className="btn-primary">
              Get Started &nbsp;→
            </a>
            <a href="#how" className="btn-ghost">
              Evaluate your GTM
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
