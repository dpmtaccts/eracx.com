// Nav.tsx — Sticky top navigation for the /v3 staging homepage.
// Brand wordmark on the left, section anchor links centered, CTA on the right.
// Hides the link row at ≤820px. Brand uses the Instrument Serif italic
// "ERA." wordmark per design/era-v3-staging.html; swap for an <img> when
// the production logo file is confirmed.

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">
          ERA<span className="dot">.</span>
        </a>
        <div className="nav-links">
          <a href="#thesis">Thesis</a>
          <a href="#how">How it works</a>
          <a href="#evidence">Evidence</a>
          <a href="#pov">Point of view</a>
          <a href="#operators">Operators</a>
        </div>
        <a href="#cta" className="nav-cta">Start a sprint</a>
      </div>
    </nav>
  )
}
