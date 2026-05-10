// V4Preview.tsx — /v4-preview route. Parallel to /v4 with the §02
// consolidation hypothesis applied: a single denser SectionTheWork
// absorbs the production §02 (Approach), §02b (What you get), §03
// (What ERA Is/Isn't), and §05 (How it works). All other sections
// render identically to /v4.
//
// Section flow after refinements:
//   §01  Hero
//        Lorikeet pull-quote
//   §02  THE WORK              (new consolidated section)
//   §03  HOW IT WORKS          (restored cobalt 9-stage grid; was §05)
//   §04  EVIDENCE              (was §04)
//   §05  LIVE DATA SIGNALS     (was §06 / "Technology")
//   §06  LAB                   (was §07)
//   §07  FAQ                   (was §08)
//        Footer
//
// "What ERA Is/Isn't" stays cut. Its content does not render here.
//
// /v4 is intentionally untouched. The same imports are used; the four
// renumbered sections accept an optional `phase` prop that overrides
// their default — /v4 doesn't pass it and stays bit-identical.
//
// This route is preview-only: the page injects a noindex/nofollow
// meta tag on mount and the public/robots.txt disallows /v4-preview
// for production crawlers.

import { useEffect } from 'react'
import '../../styles/v4-tokens.css'
import '../../styles/v4-components.css'
import { V4Statement } from '../../components/v4/V4Statement'
import { V4PullQuote } from '../../components/v4/V4PullQuote'
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

export default function V4Preview() {
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

  // Preview-only: noindex/nofollow so this route can't accidentally
  // get indexed even if a backlink leaks. Clean up on unmount so the
  // tag doesn't persist on subsequent navigation.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)

    const previousTitle = document.title
    document.title = 'ERA · /v4-preview'

    return () => {
      meta.remove()
      document.title = previousTitle
    }
  }, [])

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
      <V4PullQuote />
      <SectionTheWork />
      <V4HowItWorks phase="▸03 · HOW IT WORKS" />
      <V4Evidence   phase="▸04 · EVIDENCE" />
      <V4Technology phase="▸05 · LIVE DATA SIGNALS" />
      <V4Lab        phase="▸06 · LAB" />
      <V4FAQ        phase="▸07 · FAQ" />
      <V4Footer />

      <a
        className="v4-preview-compare"
        href="/v4"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open /v4 in a new tab to compare"
      >
        ▸ COMPARE TO /v4
      </a>
    </div>
  )
}
