// PointOfViewScroller.tsx — Desktop-only horizontal pinned scroll wrapper
// for §04 Point of view. Five principle panels move horizontally as the
// user scrolls vertically through a 5×100vh tall outer container; the
// inner sticky child pins for 4×100vh of that range and translates the
// flex track from 0% to -80% (= -400vw of the 500vw track).
//
// Mobile (≤767px) falls back to vertical stacking via CSS overrides — no
// JS UA detection. Sticky disables, the track becomes a flex column, and
// the framer-motion inline transform is suppressed with !important.

import { useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

interface Props {
  panels: ReactNode[]
}

export default function PointOfViewScroller({ panels }: Props) {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Track is 500vw wide (5 panels × 100vw). Translating from 0% to -80%
  // moves it 400vw left, landing panel 5 in the viewport.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(panels.length - 1, Math.max(0, Math.floor(latest * panels.length)))
    setActiveIndex(next)
  })

  return (
    <div className="pov-scroller" ref={outerRef}>
      <div className="pov-scroller-sticky">
        <div className="pov-scroller-progress" aria-hidden="true">
          <span className="pov-scroller-counter">
            {String(activeIndex + 1).padStart(2, '0')} / {String(panels.length).padStart(2, '0')}
          </span>
          <div className="pov-scroller-dots">
            {panels.map((_, i) => (
              <span
                key={i}
                className={`pov-scroller-dot${i === activeIndex ? ' is-active' : ''}`}
              />
            ))}
          </div>
        </div>
        <motion.div className="pov-scroller-track" style={{ x }}>
          {panels.map((panel, i) => (
            <div className="pov-scroller-panel" key={i}>
              <div className="container pov-scroller-panel-inner">{panel}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
