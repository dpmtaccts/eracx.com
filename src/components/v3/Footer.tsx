// Footer.tsx — site footer for the /v3 staging homepage.
// 4-column grid: brand + tagline · Work · Company · Elsewhere.
// Bottom bar: legal + tagline + location/copyright.
// Brand uses /images/era-logo.svg at 40px height (source spec for the
// footer treatment). Copy verbatim from design/era-v3-staging.html.

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a className="footer-brand" href="#top" aria-label="ERA">
              <img src="/images/era-logo.svg" alt="ERA" />
            </a>
            <div className="footer-tagline">
              AI-powered ABM programs.<br />
              Warmth is the asset.
            </div>
          </div>
          <div className="footer-col">
            <h4>Work</h4>
            <ul>
              <li><a href="#how">How it works</a></li>
              <li><a href="#evidence">Evidence</a></li>
              <li><a href="#pov">Point of view</a></li>
              <li><a href="#operators">Operators</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Field guide</a></li>
              <li><a href="#">Aux dashboard</a></li>
              <li><a href="#cta">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <ul>
              <li>
                <a href="https://linkedin.com" rel="noopener">
                  LinkedIn
                </a>
              </li>
              <li><a href="mailto:hello@eracx.com">hello@eracx.com</a></li>
              <li><a href="https://aux.eracx.com">aux.eracx.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>ERA &nbsp;·&nbsp; Department of Loyalty LLC</div>
          <div>Warmth is the asset.</div>
          <div className="r">
            Bainbridge Island, WA &nbsp;·&nbsp; © 2026
          </div>
        </div>
      </div>
    </footer>
  )
}
