// V4Nav.tsx — Main navigation for the /v4 route. Logo on the left in
// Archivo Black, mono uppercase letter-spaced links in the middle, solid
// CTA on the right. Border-bottom of 1px currentColor so the rule color
// follows the section it lives inside.

export function V4Nav() {
  return (
    <nav className="v4-nav">
      <a href="#top" className="v4-nav__logo">ERA</a>
      <div className="v4-nav__links">
        <a href="#warmth">Warmth</a>
        <a href="#evidence">Evidence</a>
        <a href="#how">How it works</a>
        <a href="#engagement">Engagement</a>
        <a href="#tech">Tech</a>
      </div>
      <a href="#cta" className="v4-nav__cta"><span>Get started</span></a>
    </nav>
  )
}
