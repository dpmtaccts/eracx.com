// V3.tsx — entry point for the /v3 staging homepage.
// Uses the Architectural Light palette (src/styles/v3-tokens.css) and the
// shared StagingLayout so the Visual Inspector is wired in consistently
// with every other staging page.
// Do not promote to / without Justin's approval.

import '../../styles/v3-tokens.css'
import '../../styles/v3-components.css'
import StagingLayout from '../../components/StagingLayout'
import Nav from '../../components/v3/Nav'
import Hero from '../../components/v3/Hero'
import Thesis from '../../components/v3/Thesis'

export default function V3() {
  return (
    <StagingLayout stagingId="v3" theme="light" className="v3-root">
      <Nav />
      <Hero />
      <Thesis />
    </StagingLayout>
  )
}
