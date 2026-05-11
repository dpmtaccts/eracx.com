// V4.tsx — Default eracx.com homepage. Also served at /v4.
//
// Bloomberg / Turley brutalist redesign. Wraps every section in
// `.v4-root` so the v4 tokens (src/styles/v4-tokens.css) and component
// styles (src/styles/v4-components.css) stay isolated from /legacy
// and every other route in main.tsx.
//
// Section flow:
//   §01  Hero (V4Statement)
//   §02  THE WORK            (SectionTheWork: opening claim,
//                             FIG.01 campaign vs loop, FIG.02
//                             pentagon + FRVRD list + timeline,
//                             FIG.04 cadence)
//   §03  HOW IT WORKS        (cobalt 9-stage grid)
//   §04  EVIDENCE
//   §05  LIVE DATA SIGNALS   (was "Technology")
//   §06  LAB
//   §07  FAQ
//        Footer
//
// "What ERA Is/Isn't" was absorbed into §02's opening claim. Its
// component (V4WhatEra) is no longer rendered here.
//
// Google Fonts (Anton, Archivo Black, IBM Plex Sans, JetBrains Mono)
// are injected on mount and torn down on unmount, so they never load
// on the other routes.

import { useEffect } from 'react'
import '../../styles/v4-tokens.css'
import '../../styles/v4-components.css'
import { V4Statement } from '../../components/v4/V4Statement'
import { SectionTheWork } from '../../components/v4/SectionTheWork'
import { V4HowItWorks } from '../../components/v4/V4HowItWorks'
import { V4Evidence } from '../../components/v4/V4Evidence'
import { V4Technology } from '../../components/v4/V4Technology'
import { V4Lab } from '../../components/v4/V4Lab'
import { V4FAQ } from '../../components/v4/V4FAQ'
import { V4Footer } from '../../components/v4/V4Footer'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap'

const PRECONNECTS = [
  { href: 'https://fonts.googleapis.com', crossOrigin: false },
  { href: 'https://fonts.gstatic.com', crossOrigin: true },
]

export default function V4() {
  useEffect(() => {
    const added: HTMLLinkElement[] = []

    for (const { href, crossOrigin } of PRECONNECTS) {
      if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = href
        if (crossOrigin) link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
        added.push(link)
      }
    }

    if (!document.querySelector(`link[rel="stylesheet"][href="${FONT_HREF}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
      added.push(link)
    }

    return () => {
      for (const link of added) link.remove()
    }
  }, [])

  // Smooth-scroll for in-page anchor links. Scoped to /v4 mount so it
  // never affects other routes. The scrolling element is <html>, not
  // .v4-root, so the rule has to live on documentElement.
  useEffect(() => {
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = 'smooth'
    return () => {
      html.style.scrollBehavior = previous
    }
  }, [])

  return (
    <div className="v4-root">
      <V4Statement />
      <SectionTheWork />
      <V4HowItWorks phase="▸03 · HOW IT WORKS" />
      <V4Evidence   phase="▸04 · EVIDENCE" />
      <V4Technology phase="▸05 · LIVE DATA SIGNALS" />
      <V4Lab        phase="▸06 · LAB" />
      <V4FAQ        phase="▸07 · FAQ" />
      <V4Footer />
    </div>
  )
}
