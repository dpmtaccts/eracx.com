import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import OurStory from './pages/OurStory.tsx'
import Admin from './pages/Admin.tsx'
import Review from './pages/Review.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/review/:slug" element={<Review />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
