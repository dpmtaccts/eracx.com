import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import BetterUpAudit, { BetterUpAuditEra } from './pages/BetterUpAudit.tsx'
import BetterUpAdmin from './pages/BetterUpAdmin.tsx'
import SampleAssessment from './pages/SampleAssessment.tsx'
import BGLinkedInAudit from './pages/bg-audit/BGLinkedInAudit.tsx'
import BGLinkedInAuditV2 from './pages/bg-audit-v2/BGLinkedInAuditV2.tsx'
import LinkedIn from './pages/LinkedIn.tsx'
import NavalentSummary from './pages/NavalentSummary.tsx'
import VikAudit from './pages/VikAudit.tsx'
import Staging from './pages/Staging.tsx'
import V1RingZoom from './pages/staging/V1RingZoom.tsx'
import V2MagazineSpreads from './pages/staging/V2MagazineSpreads.tsx'
import V3ColorBlocks from './pages/staging/V3ColorBlocks.tsx'
import V4TimelineRibbon from './pages/staging/V4TimelineRibbon.tsx'
import V5ExpandingCards from './pages/staging/V5ExpandingCards.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/staging" element={<Staging />} />
        <Route path="/staging/v1" element={<V1RingZoom />} />
        <Route path="/staging/v2" element={<V2MagazineSpreads />} />
        <Route path="/staging/v3" element={<V3ColorBlocks />} />
        <Route path="/staging/v4" element={<V4TimelineRibbon />} />
        <Route path="/staging/v5" element={<V5ExpandingCards />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gtm-design" element={<GtmDesign />} />
        <Route path="/review/:slug" element={<Review />} />
        <Route path="/benchmark" element={<Benchmark />} />
        <Route path="/gtm-planner" element={<GtmPlanner />} />
        <Route path="/growth-simulator" element={<GrowthSimulator />} />
        <Route path="/audit/navalent" element={<NavalentAudit />} />
        <Route path="/audit/betterup" element={<BetterUpAudit />} />
        <Route path="/audit/betterup/era" element={<BetterUpAuditEra />} />
        <Route path="/audit/betterup/admin" element={<BetterUpAdmin />} />
        <Route path="/audit/tidera" element={<SampleAssessment />} />
        <Route path="/audit/brian-gonsalves" element={<BGLinkedInAuditV2 />} />
        <Route path="/audit/brian-gonsalves-v1" element={<BGLinkedInAudit />} />
        <Route path="/linkedin" element={<LinkedIn />} />
        <Route path="/audit/navalentsummary" element={<NavalentSummary />} />
        <Route path="/audit/vik" element={<VikAudit />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
