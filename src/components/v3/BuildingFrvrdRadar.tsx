// BuildingFrvrdRadar.tsx — canvas centerpiece for the FRVRD framework
// section. A field of ~200-300 background "noise" dots drifts behind
// the section. Five highlighted FRVRD dots start in the field and
// migrate, one at a time, to fixed pentagon vertices as the user
// scrolls. Once a dot arrives at its vertex, the connecting pentagon
// segments fade in. After all five have arrived, the polygon fills.
// Colors on the FRVRD layer shift cold → warm across the section.
// Background dots stay neutral throughout.
//
// scrollProgress is the single source of truth: 0 = noise, 1 = warmth.
// Per-frame state lives on the dot objects directly, no React state.
//
// Honors prefers-reduced-motion: reduce — background dots stop
// drifting; the FRVRD dots still migrate (because that's data, driven
// by scrollProgress) but the scale/glow flourish on arrival is
// suppressed.

import { useEffect, useRef } from 'react'

interface BgDot {
  x: number
  y: number
  r: number
  opacity: number
  vx: number
  vy: number
  color: [number, number, number]
}

interface FrvrdDot {
  // Drift state (used before migration starts).
  x: number
  y: number
  vx: number
  vy: number
  // Captured drift position at the moment migration begins (so the
  // migration interpolation has a stable starting point even though
  // the dot was drifting up to that frame).
  startX: number | null
  startY: number | null
  // Vertex info.
  vertexIdx: number
  // Migration window (scrollProgress 0..1).
  migrationStart: number
  migrationEnd: number
  // Cached vertex pixel coords, recomputed on resize.
  targetX: number
  targetY: number
  // Display radius (slightly larger than background dots).
  r: number
  baseOpacity: number
}

const BG_PALETTE_KEYS = ['--mist', '--mineral-blue', '--hot'] as const

// Color stops for the cold→warm shift on the FRVRD layer.
const COLOR_STOPS: { p: number; rgb: [number, number, number] }[] = [
  { p: 0.0, rgb: [196, 213, 222] }, // mist
  { p: 0.5, rgb: [196, 213, 222] }, // hold mist
  { p: 0.7, rgb: [78, 110, 129] }, // mineral
  { p: 0.85, rgb: [53, 80, 95] }, // deep steel
  { p: 1.0, rgb: [196, 74, 122] }, // hot magenta
]

interface VertexLabel {
  name: string
  // Direction the label sits relative to the vertex (cardinal).
  side: 'top' | 'right' | 'br' | 'bl' | 'left'
}
const VERTICES: VertexLabel[] = [
  { name: 'FREQUENCY', side: 'top' },
  { name: 'RECENCY', side: 'right' },
  { name: 'VALUE', side: 'br' },
  { name: 'RESPONSIVENESS', side: 'bl' },
  { name: 'DENSITY', side: 'left' },
]

// Migration windows: 5 dots, sequential, 0.10 wide each.
const MIGRATION_WINDOWS = [
  [0.25, 0.35],
  [0.35, 0.45],
  [0.45, 0.55],
  [0.55, 0.65],
  [0.65, 0.75],
] as const

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function colorAt(progress: number): [number, number, number] {
  const p = Math.max(0, Math.min(1, progress))
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const a = COLOR_STOPS[i]
    const b = COLOR_STOPS[i + 1]
    if (p <= b.p) {
      const t = (p - a.p) / Math.max(1e-6, b.p - a.p)
      return [
        Math.round(lerp(a.rgb[0], b.rgb[0], t)),
        Math.round(lerp(a.rgb[1], b.rgb[1], t)),
        Math.round(lerp(a.rgb[2], b.rgb[2], t)),
      ]
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1].rgb
}

function rgba([r, g, b]: [number, number, number], a: number): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

interface Props {
  scrollProgress: number
  onVertexPositions?: (vertices: { x: number; y: number }[]) => void
}

export default function BuildingFrvrdRadar({
  scrollProgress,
  onVertexPositions,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const progressRef = useRef(scrollProgress)
  const onVerticesRef = useRef(onVertexPositions)

  // Keep refs in sync with latest prop values without triggering effects.
  progressRef.current = scrollProgress
  onVerticesRef.current = onVertexPositions

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = window.devicePixelRatio || 1

    // Resolve CSS variables to RGB tuples for canvas fillStyle.
    const cs = getComputedStyle(parent)
    const parseHex = (raw: string): [number, number, number] => {
      const hex = raw.replace('#', '').trim()
      if (hex.length !== 6) return [200, 200, 200]
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ]
    }
    const bgColors: [number, number, number][] = BG_PALETTE_KEYS.map((k) =>
      parseHex(cs.getPropertyValue(k)),
    )

    let bgDots: BgDot[] = []
    let frvrdDots: FrvrdDot[] = []
    let vertices: { x: number; y: number }[] = []
    let cssWidth = 0
    let cssHeight = 0

    const computeVertices = () => {
      const cx = cssWidth / 2
      const cy = cssHeight / 2
      // Pentagon radius — fit within the smaller dimension with breathing
      // room for vertex labels.
      const radius = Math.min(cssWidth, cssHeight) * 0.28
      vertices = [0, 1, 2, 3, 4].map((i) => {
        const angle = -Math.PI / 2 + i * ((2 * Math.PI) / 5)
        return {
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle),
        }
      })
      // Sync FRVRD dots' targets to the new vertex positions.
      frvrdDots.forEach((dot) => {
        dot.targetX = vertices[dot.vertexIdx].x
        dot.targetY = vertices[dot.vertexIdx].y
      })
      // Notify the parent so it can place HTML labels.
      onVerticesRef.current?.(vertices.map((v) => ({ ...v })))
    }

    const initDots = () => {
      const isMobile = window.innerWidth < 820
      const bgCount = isMobile ? 80 : 220
      bgDots = Array.from({ length: bgCount }, () => {
        const r = Math.random()
        const colorIdx = r < 0.08 ? 2 : r < 0.55 ? 0 : 1
        return {
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight,
          r: 1.5 + Math.random() * 2,
          opacity: 0.15 + Math.random() * 0.3,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.2,
          color: bgColors[colorIdx],
        }
      })
      frvrdDots = MIGRATION_WINDOWS.map(([start, end], idx) => ({
        x: Math.random() * cssWidth,
        y: Math.random() * cssHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        startX: null,
        startY: null,
        vertexIdx: idx,
        migrationStart: start,
        migrationEnd: end,
        targetX: vertices[idx]?.x ?? cssWidth / 2,
        targetY: vertices[idx]?.y ?? cssHeight / 2,
        r: 5 + Math.random() * 1.5,
        baseOpacity: 0.85,
      }))
    }

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      cssWidth = rect.width
      cssHeight = rect.height
      canvas.width = Math.max(1, Math.floor(cssWidth * dpr))
      canvas.height = Math.max(1, Math.floor(cssHeight * dpr))
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${cssHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      computeVertices()
      if (bgDots.length === 0) initDots()
    }

    const driftAndWrap = (dot: { x: number; y: number; vx: number; vy: number; r: number }) => {
      dot.x += dot.vx
      dot.y += dot.vy
      const m = dot.r + 4
      if (dot.x < -m) dot.x = cssWidth + m
      if (dot.x > cssWidth + m) dot.x = -m
      if (dot.y < -m) dot.y = cssHeight + m
      if (dot.y > cssHeight + m) dot.y = -m
    }

    const draw = () => {
      const sp = Math.max(0, Math.min(1, progressRef.current))
      const accent = colorAt(sp)

      ctx.clearRect(0, 0, cssWidth, cssHeight)

      // 1. Background noise dots
      for (const d of bgDots) {
        if (!reduce) driftAndWrap(d)
        ctx.globalAlpha = d.opacity
        ctx.fillStyle = rgba(d.color, 1)
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Pentagon fill — fades in 0.75..0.90, max alpha 0.15
      const fillT = Math.max(0, Math.min(1, (sp - 0.75) / 0.15))
      if (fillT > 0 && vertices.length === 5) {
        ctx.globalAlpha = 0.15 * fillT
        ctx.fillStyle = rgba(accent, 1)
        ctx.beginPath()
        ctx.moveTo(vertices[0].x, vertices[0].y)
        for (let i = 1; i < 5; i++) ctx.lineTo(vertices[i].x, vertices[i].y)
        ctx.closePath()
        ctx.fill()
      }

      // 3. Pentagon stroke — segments fade in as both endpoints settle
      if (vertices.length === 5) {
        // Compute per-vertex migration progress.
        const vertexT = frvrdDots.map((d) => {
          const t =
            (sp - d.migrationStart) /
            Math.max(1e-6, d.migrationEnd - d.migrationStart)
          return Math.max(0, Math.min(1, t))
        })
        ctx.lineWidth = 1.5
        ctx.strokeStyle = rgba(accent, 1)
        for (let i = 0; i < 5; i++) {
          const j = (i + 1) % 5
          const segAlpha = Math.min(vertexT[i], vertexT[j])
          if (segAlpha <= 0) continue
          ctx.globalAlpha = segAlpha
          ctx.beginPath()
          ctx.moveTo(vertices[i].x, vertices[i].y)
          ctx.lineTo(vertices[j].x, vertices[j].y)
          ctx.stroke()
        }
      }

      // 4. FRVRD dots — drift, then migrate, then settle
      for (const dot of frvrdDots) {
        let x = dot.x
        let y = dot.y
        let scaleBoost = 1
        let glowBoost = 0

        if (sp < dot.migrationStart) {
          // Pre-migration: drift like bg dots
          if (!reduce) driftAndWrap(dot)
          dot.startX = null
          dot.startY = null
          x = dot.x
          y = dot.y
        } else if (sp <= dot.migrationEnd) {
          // Capture starting point on the first frame of migration
          if (dot.startX === null || dot.startY === null) {
            dot.startX = dot.x
            dot.startY = dot.y
          }
          const t =
            (sp - dot.migrationStart) /
            Math.max(1e-6, dot.migrationEnd - dot.migrationStart)
          const eased = easeInOutCubic(Math.max(0, Math.min(1, t)))
          x = lerp(dot.startX, dot.targetX, eased)
          y = lerp(dot.startY, dot.targetY, eased)
          dot.x = x
          dot.y = y
          if (!reduce) {
            // Scale flourish: peaks at midpoint, ends at 1
            scaleBoost = 1 + 0.3 * Math.sin(eased * Math.PI)
            glowBoost = 0.3 * Math.sin(eased * Math.PI)
          }
        } else {
          // Post-migration: locked at vertex
          x = dot.targetX
          y = dot.targetY
          dot.x = x
          dot.y = y
        }

        const r = dot.r * scaleBoost

        // Outer halo
        ctx.globalAlpha = (dot.baseOpacity * 0.4 + glowBoost) * 0.6
        ctx.fillStyle = rgba(accent, 1)
        ctx.beginPath()
        ctx.arc(x, y, r * 1.8, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.globalAlpha = Math.min(1, dot.baseOpacity + glowBoost)
        ctx.fillStyle = rgba(accent, 1)
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    let rafId: number | null = null
    let visible = true
    const loop = () => {
      draw()
      if (visible) rafId = requestAnimationFrame(loop)
      else rafId = null
    }

    resize()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && rafId === null) rafId = requestAnimationFrame(loop)
      },
      { threshold: 0 },
    )
    io.observe(parent)

    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', onResize)
      io.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="frvrd-canvas" aria-hidden="true" />
}

// Re-export VERTICES so the parent can render HTML labels with matching
// dimension names + side info. Vertex pixel positions are reported via
// the onVertexPositions callback as the canvas resizes.
export { VERTICES, MIGRATION_WINDOWS }
