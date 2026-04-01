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
import SampleAssessment from './pages/SampleAssessment.tsx'
import BGLinkedInAudit from './pages/bg-audit/BGLinkedInAudit.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gtm-design" element={<GtmDesign />} />
        <Route path="/review/:slug" element={<Review />} />
        <Route path="/benchmark" element={<Benchmark />} />
        <Route path="/gtm-planner" element={<GtmPlanner />} />
        <Route path="/growth-simulator" element={<GrowthSimulator />} />
        <Route path="/audit/navalent" element={<NavalentAudit />} />
        <Route path="/audit/tidera" element={<SampleAssessment />} />
        <Route path="/audit/brian-gonsalves" element={<BGLinkedInAudit />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
