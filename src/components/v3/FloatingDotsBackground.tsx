// FloatingDotsBackground.tsx — ambient canvas of slowly-drifting dots
// behind the FRVRD section. ~100 dots at desktop, ~50 at mobile, drawn
// from --mist / --mineral-blue / --hot (magenta is rare). Dots drift
// mostly upward with light horizontal jitter; respawn at the bottom
// when they leave the visible area.
//
// IntersectionObserver pauses the animation when the section is
// off-screen so we're not burning frames the user can't see.
//
// Honors prefers-reduced-motion: reduce — dots render once, statically,
// and never animate.

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  r: number
  opacity: number
  vx: number
  vy: number
  color: string
}

export default function FloatingDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Resolve CSS variables to actual color strings so canvas can use them.
    const cs = getComputedStyle(parent)
    const mist = cs.getPropertyValue('--mist').trim() || '#C4D5DE'
    const mineral = cs.getPropertyValue('--mineral-blue').trim() || '#4E6E81'
    const hot = cs.getPropertyValue('--hot').trim() || '#C44A7A'

    let dots: Dot[] = []
    let rafId: number | null = null
    let visible = true
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const count = window.innerWidth < 820 ? 50 : 100
      dots = Array.from({ length: count }, () => {
        const r = Math.random()
        const color = r < 0.08 ? hot : r < 0.5 ? mist : mineral
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 2 + Math.random() * 2,
          opacity: 0.15 + Math.random() * 0.25,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.2,
          color,
        }
      })
    }

    const draw = () => {
      const { width, height } = parent.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      for (const dot of dots) {
        ctx.globalAlpha = dot.opacity
        ctx.fillStyle = dot.color
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      const { width, height } = parent.getBoundingClientRect()
      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.y < -dot.r) {
          dot.y = height + dot.r
          dot.x = Math.random() * width
        }
        if (dot.x < -dot.r) dot.x = width + dot.r
        if (dot.x > width + dot.r) dot.x = -dot.r
      }
      draw()
      if (visible) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = null
      }
    }

    resize()
    draw()
    if (!reduce) {
      rafId = requestAnimationFrame(tick)
    }

    const onResize = () => {
      resize()
      draw()
    }
    window.addEventListener('resize', onResize)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !reduce && rafId === null) {
          rafId = requestAnimationFrame(tick)
        }
      },
      { threshold: 0 },
    )
    io.observe(parent)

    return () => {
      window.removeEventListener('resize', onResize)
      io.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="floating-dots" aria-hidden="true" />
}
