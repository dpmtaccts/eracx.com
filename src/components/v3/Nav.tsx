// Nav.tsx — Sticky top navigation for the /v3 staging homepage.
// Brand logo on the left, section anchor links centered, CTA on the right.
// Hides the link row at ≤820px. Brand uses /images/era-logo.svg at 28px
// height (matches the .brand img rule in design/era-v3-staging.html).

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="ERA">
          <img src="/images/era-logo.svg" alt="ERA" />
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
