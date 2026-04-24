// V3.tsx — entry point for the /v3 staging homepage.
// Uses the Architectural Light palette (src/styles/v3-tokens.css) and the
// shared StagingLayout so the Visual Inspector is wired in consistently
// with every other staging page. The Fixer renders last and is dev-only.
// Do not promote to / without Justin's approval.

import '../../styles/v3-tokens.css'
import '../../styles/v3-components.css'
import StagingLayout from '../../components/StagingLayout'
import Nav from '../../components/v3/Nav'
import Hero from '../../components/v3/Hero'
import Thesis from '../../components/v3/Thesis'
import HowItWorks from '../../components/v3/HowItWorks'
import Evidence from '../../components/v3/Evidence'
import PointOfView from '../../components/v3/PointOfView'
import Operators from '../../components/v3/Operators'
import Contact from '../../components/v3/Contact'
import Footer from '../../components/v3/Footer'
import Fixer from '../../components/v3/Fixer'

export default function V3() {
  return (
    <StagingLayout stagingId="v3" theme="light" className="v3-root">
      <Nav />
      <Hero />
      <Thesis />
      <HowItWorks />
      <Evidence />
      <PointOfView />
      <Operators />
      <Contact />
      <Footer />
      <Fixer />
    </StagingLayout>
  )
}
