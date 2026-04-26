// FrvrdSection.tsx — §02 framework section. Pinned 4×100vh container
// that teaches FRVRD via a scroll-driven visual metaphor.
//
// The outer wrapper is 4 viewports tall. Inner content is
// position: sticky / 100vh, freezing in place while the page scrolls
// through the wrapper's height. scrollProgress (0..1) is computed from
// the wrapper's bounding rect on a rAF-throttled scroll listener and
// drives every animated element in the section:
//   - BuildingFrvrdRadar:  noise → highlighted FRVRD dots → migrate
//                          to pentagon → polygon completes; cold→warm
//                          color shift across the layer.
//   - Static headline:     "Five signals turn noise into pipeline."
//                          Color lerps cold→warm with scrollProgress.
//   - Static subtitle:     "FRVRD measures warmth across every named
//                          account..."
//   - FrvrdDimensionPanel: five dimension definitions, one per dot
//                          arrival window.
//   - Bottom progress bar: continuous fill on a cold→warm gradient.
//
// Below 820px the pin disables (height: auto) and the inner content
// scrolls normally; the canvas still renders and the dots still
// migrate based on whatever scrollProgress lands on.

import { useEffect, useRef, useState } from 'react'
import BuildingFrvrdRadar, { VERTICES } from './BuildingFrvrdRadar'
import FrvrdDimensionPanel from './FrvrdDimensionPanel'

// Color stops for the static headline — same arc as the radar layer
// so the word reaches magenta at the end of the section.
const WORD_STOPS: { p: number; rgb: [number, number, number] }[] = [
  { p: 0.0, rgb: [53, 80, 95] }, // deep steel
  { p: 0.7, rgb: [53, 80, 95] }, // hold
  { p: 1.0, rgb: [196, 74, 122] }, // hot magenta
]

function wordColorAt(progress: number): string {
  const x = Math.max(0, Math.min(1, progress))
  for (let i = 0; i < WORD_STOPS.length - 1; i++) {
    const a = WORD_STOPS[i]
    const b = WORD_STOPS[i + 1]
    if (x <= b.p) {
      const t = (x - a.p) / Math.max(1e-6, b.p - a.p)
      const r = Math.round(a.rgb[0] + (b.rgb[0] - a.rgb[0]) * t)
      const g = Math.round(a.rgb[1] + (b.rgb[1] - a.rgb[1]) * t)
      const bl = Math.round(a.rgb[2] + (b.rgb[2] - a.rgb[2]) * t)
      return `rgb(${r}, ${g}, ${bl})`
    }
  }
  const last = WORD_STOPS[WORD_STOPS.length - 1].rgb
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`
}

interface VertexPos {
  x: number
  y: number
}

// Migration windows from BuildingFrvrdRadar, kept in sync via the
// MIGRATION_WINDOWS export. Only the end values matter here so we know
// when each dot has finished arriving (= label fades in).
const MIGRATION_END = [0.35, 0.45, 0.55, 0.65, 0.75]

export default function FrvrdSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [vertices, setVertices] = useState<VertexPos[]>([])

  useEffect(() => {
    let rafId: number | null = null
    const update = () => {
      const node = wrapperRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) {
        // Mobile / no-pin layout — derive progress from how far the
        // wrapper has scrolled past the viewport top.
        const visible = Math.max(
          0,
          Math.min(rect.height, window.innerHeight - rect.top),
        )
        setScrollProgress(Math.max(0, Math.min(1, visible / rect.height)))
        return
      }
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setScrollProgress(p)
    }
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  // Position offsets for the HTML axis labels relative to each vertex.
  // Each side picks a translate so the label sits clear of the dot.
  const labelOffset = (side: (typeof VERTICES)[number]['side']) => {
    switch (side) {
      case 'top':
        return { transform: 'translate(-50%, calc(-100% - 16px))' }
      case 'right':
        return { transform: 'translate(16px, -50%)' }
      case 'br':
        return { transform: 'translate(8px, 8px)' }
      case 'bl':
        return { transform: 'translate(calc(-100% - 8px), 8px)' }
      case 'left':
        return { transform: 'translate(calc(-100% - 16px), -50%)' }
    }
  }

  return (
    <div className="frvrd-pinned" ref={wrapperRef}>
      <div className="frvrd-pinned-sticky">
        <header className="frvrd-pinned-top">
          <div className="eyebrow">02 &nbsp; The framework</div>
          <a className="frvrd-pinned-skip" href="#how">
            Skip the framework &rarr;
          </a>
        </header>

        <div className="frvrd-pinned-stage">
          <BuildingFrvrdRadar
            scrollProgress={scrollProgress}
            onVertexPositions={setVertices}
          />

          {/* HTML axis labels positioned at each vertex */}
          {vertices.length === 5 && (
            <div className="frvrd-pinned-labels" aria-hidden="true">
              {VERTICES.map((v, i) => {
                const opacity =
                  scrollProgress >= MIGRATION_END[i] ? 1 : 0
                return (
                  <span
                    key={v.name}
                    className="frvrd-pinned-label"
                    style={{
                      left: `${vertices[i].x}px`,
                      top: `${vertices[i].y}px`,
                      opacity,
                      ...labelOffset(v.side),
                    }}
                  >
                    {v.name}
                  </span>
                )
              })}
            </div>
          )}

          <div className="frvrd-pinned-text">
            <h2
              className="frvrd-statement"
              style={{ color: wordColorAt(scrollProgress) }}
            >
              Five signals turn noise into pipeline.
            </h2>
            <p className="frvrd-statement-sub">
              FRVRD measures warmth across every named account.
              Compounding, continuous, scored automatically.
            </p>
          </div>

          <FrvrdDimensionPanel
            scrollProgress={scrollProgress}
            visible={scrollProgress > 0.25}
          />
        </div>

        <div className="frvrd-pinned-progress">
          <span className="frvrd-pinned-progress-cap frvrd-pinned-progress-cap--cold">
            COLD
          </span>
          <div className="frvrd-pinned-progress-track">
            <div
              className="frvrd-pinned-progress-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="frvrd-pinned-progress-cap frvrd-pinned-progress-cap--warm">
            WARM
          </span>
          <div className="frvrd-pinned-progress-dots" aria-hidden="true">
            {MIGRATION_END.map((end, i) => (
              <span
                key={i}
                className={`frvrd-pinned-progress-dot${
                  scrollProgress >= end ? ' is-filled' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
