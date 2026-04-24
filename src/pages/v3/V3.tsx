// V3.tsx — entry point for the /v3 staging homepage.
// Uses the Architectural Light palette (src/styles/v3-tokens.css).
// Do not promote to / without Justin's approval.

import '../../styles/v3-tokens.css'
import '../../styles/v3-components.css'
import Nav from '../../components/v3/Nav'
import Hero from '../../components/v3/Hero'
import Thesis from '../../components/v3/Thesis'

export default function V3() {
  return (
    <div className="v3-root" data-theme="light">
      <Nav />
      <Hero />
      <Thesis />
    </div>
  )
}
