// V4.tsx — Entry point for the /v4 route.
// Bloomberg / Turley brutalist redesign. Wraps every section in `.v4-root`
// so the v4 tokens (src/styles/v4-tokens.css) and component styles
// (src/styles/v4-components.css) stay isolated from /v3 and the main site.
//
// Google Fonts (Anton, Archivo Black, IBM Plex Sans, JetBrains Mono) are
// injected on mount and torn down on unmount, so they never load on /v3
// or /. Do not promote /v4 to / without Justin's approval.

import { useEffect } from 'react'
import '../../styles/v4-tokens.css'
import '../../styles/v4-components.css'
import { V4Statement } from '../../components/v4/V4Statement'
import { V4Warmth } from '../../components/v4/V4Warmth'
import { V4WhatEra } from '../../components/v4/V4WhatEra'
import { V4Evidence } from '../../components/v4/V4Evidence'
import { V4HowItWorks } from '../../components/v4/V4HowItWorks'
import { V4Technology } from '../../components/v4/V4Technology'

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

  return (
    <div className="v4-root">
      <V4Statement />
      <V4Warmth />
      <V4WhatEra />
      <V4Evidence />
      <V4HowItWorks />
      <V4Technology />
    </div>
  )
}
