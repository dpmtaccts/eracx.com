// Hero.tsx — Full-width hero for the /v3 staging homepage.
// Two-column grid at desktop, stacks below 1000px. Large italic serif
// headline with a Sans slab mix ("Warmth is the asset."), lede + two CTAs
// on the right, and a three-column Nightingale-style corner markers row
// below the grid. All text copied verbatim from design/era-v3-staging.html.

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              Revenue Through Subtraction &nbsp;·&nbsp; Bainbridge Island, WA
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
              ERA builds <strong>AI-powered ABM programs</strong> that generate
              warmth with your highest-value accounts. We measure the way
              investors measure: compounding.
            </p>
            <div className="hero-cta-row">
              <a href="#cta" className="btn-primary">
                Start a GTM sprint &nbsp;→
              </a>
              <a href="#how" className="btn-ghost">
                See how it works
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <b>GTM Design Sprint</b>$10K – $15K · 4 weeks
              </div>
              <div>
                <b>Current clients</b>Netrush · Navalent · Miniac · POP · Seismic
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
