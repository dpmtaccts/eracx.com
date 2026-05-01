// V4Nav.tsx — Main navigation for the /v4 route. Inline SVG ERA symbol
// mark on the left (path from public/images/era_symbol.svg), mono
// uppercase letter-spaced links in the middle, solid currentColor CTA
// on the right. Border-bottom of 1px currentColor.
//
// The symbol uses fill="currentColor" so it inherits the section's
// text color. On the white statement section it renders as ink. On
// magenta/cobalt/ink sections it renders white without any additional
// code.

export function V4Nav() {
  return (
    <nav className="v4-nav">
      <a href="/" className="v4-nav__logo" aria-label="ERA">
        <svg
          className="v4-nav__logo-mark"
          viewBox="0 0 4386 4387"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M3176.89 0C3844.43 0.000221299 4385.58 541.15 4385.58 1208.69V4387H1208.69C541.151 4387 0 3845.85 0 3178.31V0H3176.89ZM2244.51 2387.12C2244.51 2768.52 2553.7 3077.7 2935.1 3077.7H3657.25V2071.64H2244.51V2387.12ZM725.491 725.499V1069.83C725.491 1432.17 1019.22 1725.89 1381.55 1725.89H3657.24V1416.09C3657.24 1034.69 3348.06 725.499 2966.65 725.499H725.491Z"
          />
        </svg>
      </a>
      <div className="v4-nav__links">
        <a href="#warmth">Warmth</a>
        <a href="#evidence">Evidence</a>
        <a href="#how">How it works</a>
        <a href="#tech">Tech</a>
        <a href="#lab">Lab</a>
      </div>
      <a href="mailto:hello@eracx.com" className="v4-nav__cta"><span>Get started</span></a>
    </nav>
  )
}
