import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, type Location } from 'react-router-dom'
import posthog from 'posthog-js'
import { PostHogErrorBoundary, PostHogProvider } from '@posthog/react'
import './index.css'
import App from './App.tsx'
import OurStory from './pages/OurStory.tsx'
import Admin from './pages/Admin.tsx'
import Review from './pages/Review.tsx'
import GtmDesign from './pages/GtmDesign.tsx'
import Benchmark from './pages/Benchmark.tsx'
import GtmPlanner from './pages/GtmPlanner.tsx'
import GrowthSimulator from './pages/GrowthSimulator.tsx'
import NavalentAudit from './pages/NavalentAudit.tsx'
import BetterUpAuditV2, { BetterUpAuditV2Era } from './pages/BetterUpAuditV2.tsx'
import BetterUpAdmin from './pages/BetterUpAdmin.tsx'
import SampleAssessment from './pages/SampleAssessment.tsx'
import BGLinkedInAudit from './pages/bg-audit/BGLinkedInAudit.tsx'
import BGLinkedInAuditV2 from './pages/bg-audit-v2/BGLinkedInAuditV2.tsx'
import LinkedIn from './pages/LinkedIn.tsx'
import NavalentSummary from './pages/NavalentSummary.tsx'
import VikAudit from './pages/VikAudit.tsx'
import Staging from './pages/Staging.tsx'
import V1RingZoom from './pages/staging/V1RingZoom.tsx'
import V4TimelineRibbon from './pages/staging/V4TimelineRibbon.tsx'
import V5ExpandingCards from './pages/staging/V5ExpandingCards.tsx'
import V2OperatingSystem from './pages/V2OperatingSystem/index.tsx'
import V3 from './pages/v3/V3.tsx'
import V4 from './pages/v4/V4.tsx'
import GtmPlaybook from './pages/GtmPlaybook.tsx'
import BuyerViewSystem from './pages/BuyerViewSystem.tsx'
import StubAuditExample from './pages/StubAuditExample.tsx'
import Methodology from './pages/Methodology.tsx'
import MethodologyDrawer from './components/MethodologyDrawer.tsx'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
})

function AppRoutes() {
  const location = useLocation()
  // backgroundLocation is set by the in-app trigger link. When present, the
  // underlying route stays mounted and /methodology renders as a drawer on
  // top. When absent (direct hit, shared link, crawler), /methodology
  // renders as the full standalone page.
  const state = location.state as { backgroundLocation?: Location } | null
  const backgroundLocation = state?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation ?? location}>
        {/* V4 is now the default eracx.com homepage. The legacy App is
            preserved at /legacy for one-commit revert; /v4 stays as an
            alias so existing inbound links still resolve. */}
        <Route path="/" element={<V4 />} />
        <Route path="/legacy" element={<App />} />
        <Route path="/staging" element={<Staging />} />
        <Route path="/staging/v1" element={<V1RingZoom />} />
        <Route path="/staging/v2" element={<V2OperatingSystem />} />
        <Route path="/staging/v3" element={<V3 />} />
        <Route path="/staging/v4" element={<V4TimelineRibbon />} />
        <Route path="/v3" element={<V3 />} />
        <Route path="/v4" element={<V4 />} />
        {/* /buyer-view-system is archived at /archive/buyer-view-system to
            preserve its history off any nav. /gtmplaybook 301-redirects
            there via vercel.json. The AI Mirror component is parked at
            /ai-mirror as a lead-magnet target without a nav link. */}
        <Route path="/archive/buyer-view-system" element={<BuyerViewSystem />} />
        <Route path="/ai-mirror" element={<GtmPlaybook />} />
        <Route path="/staging/v5" element={<V5ExpandingCards />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gtm-design" element={<GtmDesign />} />
        <Route path="/review/:slug" element={<Review />} />
        <Route path="/benchmark" element={<Benchmark />} />
        <Route path="/gtm-planner" element={<GtmPlanner />} />
        <Route path="/growth-simulator" element={<GrowthSimulator />} />
        <Route path="/audit/navalent" element={<NavalentAudit />} />
        {/* v2 (the seven-statement insight list) is now the canonical
            BetterUp audit at /audit/betterup. The old 8-section version
            (BetterUpAudit.tsx) is no longer routed; its shared exports
            still feed SummaryView. /audit/betterupv2 301-redirects here
            via vercel.json. */}
        <Route path="/audit/betterup" element={<BetterUpAuditV2 />} />
        <Route path="/audit/betterup/era" element={<BetterUpAuditV2Era />} />
        <Route path="/audit/betterup/admin" element={<BetterUpAdmin />} />
        <Route path="/audit/tidera" element={<SampleAssessment />} />
        <Route path="/audit/brian-gonsalves" element={<BGLinkedInAuditV2 />} />
        <Route path="/audit/brian-gonsalves-v1" element={<BGLinkedInAudit />} />
        <Route path="/linkedin" element={<LinkedIn />} />
        <Route path="/audit/navalentsummary" element={<NavalentSummary />} />
        <Route path="/audit/vik" element={<VikAudit />} />
        <Route path="/audit/_stub-example" element={<StubAuditExample />} />
        <Route path="/methodology" element={<Methodology />} />
      </Routes>

      {/* Overlay routes — only resolve when backgroundLocation is set. */}
      {backgroundLocation && (
        <Routes>
          <Route path="/methodology" element={<MethodologyDrawer />} />
        </Routes>
      )}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
    <PostHogErrorBoundary>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </PostHogErrorBoundary>
    </PostHogProvider>
  </StrictMode>,
)
