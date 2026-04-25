// Hero.tsx — Full-width hero for the /v3 staging homepage.
// Two-column grid at desktop, stacks below 1000px. Large italic serif
// headline with a Sans slab mix ("Warmth is the asset."), lede + two CTAs
// on the right, and a three-column Nightingale-style corner markers row
// below the grid.

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              Revenue Through Subtraction
            </div>
            <h1 className="hero-title">
              Cold outbound
              <br />
              is done.
              <br />
              <span className="slab">
                Warmth is <span className="accent">the asset.</span>
              </span>
            </h1>
          </div>
          <div className="hero-side">
            <p className="hero-lede">
              ERA builds <strong>signal-driven ABM programs</strong> that generate
              warmth with your highest-value accounts. We measure the way
              investors measure: compounding.
            </p>
            <div className="hero-cta-row">
              <a href="#cta" className="btn-primary">
                Get Started &nbsp;→
              </a>
              <a href="#how" className="btn-ghost">
                Evaluate your GTM
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <b>Outcome</b>Reduces 80% of wasted growth actions
              </div>
              <div>
                <b>Current customers</b>Netrush · Navalent · Miniac · POP · Seismic
              </div>
            </div>
          </div>
        </div>
        <div className="hero-corners">
          <div className="hero-corner">
            <b>Fig. 1.0</b>Six-week account trajectory
          </div>
          <div className="hero-corner">
            <b>Fig. 2.0</b>Twenty-four signal types
          </div>
          <div className="hero-corner">
            <b>Fig. 3.0</b>Warmth, updated daily
          </div>
        </div>
      </div>
    </header>
  )
}
