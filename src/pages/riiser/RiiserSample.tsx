/* Riiser — public sample audit at /sample.

   Mirrors the structure of the live BetterUp Buyer View (the v2 insight list)
   with fully fictional Riiser data. No password gate: this is a public sample
   backing the "See a sample" CTA. The real BetterUp audit is untouched. */

import { useEffect } from 'react'
import '../../styles/v4-tokens.css'
import { FONT, loadBetterUpFonts, LIGHT } from '../betterup/theme'
import { RiiserInsightList } from './RiiserInsightList'
import { ARTIFACT_CSS } from './artifacts'

export default function RiiserSample() {
  useEffect(() => {
    loadBetterUpFonts()
  }, [])

  useEffect(() => {
    document.documentElement.style.background = LIGHT.bg
    document.body.style.background = LIGHT.bg
    document.body.style.color = LIGHT.text
  }, [])

  useEffect(() => {
    const previous = document.title
    document.title = 'Riiser · Buyer View (Sample)'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="v4-root" style={{ background: LIGHT.bg, minHeight: '100vh', color: LIGHT.text, fontFamily: FONT.body }}>
      <style>{ARTIFACT_CSS}</style>
      <RiiserInsightList />
    </div>
  )
}
