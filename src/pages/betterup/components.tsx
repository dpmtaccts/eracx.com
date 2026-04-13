import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FONT,
  colorForScore,
  gradeFromScore,
  useTheme,
  type ThemePalette,
} from './theme'

/* ──────────────────────────────────────────────
   Scroll reveal
   ────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode
  delay?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   AnimatedNumber (rAF counter, in-view triggered)
   ────────────────────────────────────────────── */
export function AnimatedNumber({
  value,
  duration = 1600,
  decimals = 0,
  suffix = '',
  prefix = '',
  style,
}: {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} style={style}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ──────────────────────────────────────────────
   Gauge (circular score, animates when in view)
   ────────────────────────────────────────────── */
export function Gauge({
  score,
  size = 140,
  label,
  thickness = 8,
}: {
  score: number
  size?: number
  label?: string
  thickness?: number
}) {
  const { palette } = useTheme()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(score * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, score])

  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const offset = c - (progress / 100) * c
  const stroke = colorForScore(palette, score)

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg ref={ref} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={palette.border}
            strokeWidth={thickness}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth={thickness}
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 60ms linear' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT.mono,
          }}
        >
          <span style={{ fontSize: size * 0.28, color: palette.text, fontWeight: 500, lineHeight: 1 }}>
            {Math.round(progress)}
          </span>
          <span style={{ fontSize: size * 0.09, color: palette.textDim, marginTop: 4 }}>/ 100</span>
        </div>
      </div>
      {label && (
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: palette.textMuted,
            textAlign: 'center',
            maxWidth: size + 40,
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────
   DimensionGauge — small circular gauge with letter grade (Brian's audit style)
   ────────────────────────────────────────────── */
export function DimensionGauge({
  label,
  score,
  size = 96,
}: {
  label: string
  score: number
  size?: number
}) {
  const { palette } = useTheme()
  const grade = gradeFromScore(score)
  const stroke = palette[grade.color]
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(score * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, score])

  const thickness = 6
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const offset = c - (progress / 100) * c

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg ref={ref} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={palette.border} strokeWidth={thickness} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth={thickness}
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT.display,
          }}
        >
          <span style={{ fontSize: size * 0.42, color: stroke, lineHeight: 1 }}>{grade.letter}</span>
          <span style={{ fontSize: 10, color: palette.textDim, fontFamily: FONT.mono, marginTop: 2 }}>
            {Math.round(progress)}
          </span>
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: palette.textMuted,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   PillBar — horizontal score bar with label
   ────────────────────────────────────────────── */
export function PillBar({
  value,
  max = 100,
  label,
  rightLabel,
  height = 8,
  color,
}: {
  value: number
  max?: number
  label?: string
  rightLabel?: string
  height?: number
  color?: string
}) {
  const { palette } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const fill = color ?? colorForScore(palette, (value / max) * 100)
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {(label || rightLabel) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6,
            fontFamily: FONT.body,
            fontSize: 12,
            color: palette.textMuted,
          }}
        >
          <span style={{ letterSpacing: '0.04em' }}>{label}</span>
          <span style={{ fontFamily: FONT.mono, color: palette.text }}>{rightLabel}</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          background: palette.border,
          borderRadius: height,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: inView ? `${pct}%` : '0%',
            background: fill,
            borderRadius: height,
            transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  )
}

export function SignalBar(props: Parameters<typeof PillBar>[0]) {
  return <PillBar {...props} />
}

/* ──────────────────────────────────────────────
   MetricCard
   ────────────────────────────────────────────── */
export function MetricCard({
  value,
  label,
  sublabel,
  accent,
  mono = true,
}: {
  value: ReactNode
  label: string
  sublabel?: string
  accent?: string
  mono?: boolean
}) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 6,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          fontFamily: mono ? FONT.mono : FONT.display,
          fontSize: 36,
          color: accent ?? palette.text,
          lineHeight: 1,
          fontWeight: mono ? 500 : 400,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: palette.textMuted,
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div style={{ fontFamily: FONT.body, fontSize: 13, color: palette.textDim }}>{sublabel}</div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────
   ExpandableCard
   ────────────────────────────────────────────── */
export function ExpandableCard({
  title,
  meta,
  children,
  defaultOpen = false,
}: {
  title: ReactNode
  meta?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}) {
  const { palette } = useTheme()
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          color: palette.text,
          fontFamily: FONT.body,
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: FONT.display, fontSize: 22, color: palette.text }}>{title}</div>
          {meta && <div style={{ fontSize: 13, color: palette.textMuted }}>{meta}</div>}
        </div>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 18,
            color: palette.textMuted,
            transition: 'transform 0.3s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: '0 24px 24px',
            color: palette.textMuted,
            fontFamily: FONT.body,
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────
   ProfileCard (dark style for GTM channels)
   ────────────────────────────────────────────── */
export function ProfileCard({
  name,
  title,
  followers,
  score,
}: {
  name: string
  title: string
  followers?: string
  score?: number
}) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        background: palette.text,
        color: palette.bg,
        borderRadius: 8,
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}
    >
      <div>
        <div style={{ fontFamily: FONT.display, fontSize: 32, lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontFamily: FONT.body, fontSize: 14, opacity: 0.7, marginTop: 6 }}>{title}</div>
        {followers && (
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              opacity: 0.6,
              marginTop: 10,
              letterSpacing: '0.04em',
            }}
          >
            {followers} followers
          </div>
        )}
      </div>
      {score !== undefined && (
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 56, lineHeight: 1, color: colorForScore(palette, score) }}>
            {score}
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            Score / 100
          </div>
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────
   SectionHeader
   ────────────────────────────────────────────── */
export function SectionHeader({
  kicker,
  headline,
  intro,
}: {
  kicker: string
  headline: string
  intro?: string
}) {
  const { palette } = useTheme()
  return (
    <Reveal>
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: palette.rust,
            marginBottom: 16,
          }}
        >
          {kicker}
        </div>
        <h2
          style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.1,
            color: palette.text,
            margin: 0,
            maxWidth: 920,
            fontWeight: 400,
          }}
        >
          {headline}
        </h2>
        {intro && (
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.6,
              color: palette.textMuted,
              marginTop: 24,
              maxWidth: 760,
            }}
          >
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  )
}

/* ──────────────────────────────────────────────
   Section wrapper
   ────────────────────────────────────────────── */
export function Section({
  id,
  children,
  background,
}: {
  id: string
  children: ReactNode
  background?: string
}) {
  const { palette } = useTheme()
  return (
    <section
      id={id}
      style={{
        background: background ?? palette.bg,
        padding: '120px 0',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>{children}</div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Callout (rust left border, soft background)
   ────────────────────────────────────────────── */
export function Callout({
  children,
  tone = 'rust',
}: {
  children: ReactNode
  tone?: 'rust' | 'red' | 'sky' | 'magenta'
}) {
  const { palette } = useTheme()
  const colorMap: Record<string, { border: string; bg: string }> = {
    rust: { border: palette.rust, bg: palette.rustSoft },
    red: { border: palette.red, bg: 'rgba(200,68,56,0.08)' },
    sky: { border: palette.sky, bg: palette.skySoft },
    magenta: { border: palette.magenta, bg: palette.magentaSoft },
  }
  const c = colorMap[tone]
  return (
    <div
      style={{
        borderLeft: `4px solid ${c.border}`,
        background: c.bg,
        padding: '24px 28px',
        borderRadius: 4,
        fontFamily: FONT.body,
        fontSize: 17,
        lineHeight: 1.6,
        color: palette.text,
      }}
    >
      {children}
    </div>
  )
}

/* ──────────────────────────────────────────────
   StepperNav (fixed top, scroll-tracked)
   ────────────────────────────────────────────── */
export interface StepperItem {
  id: string
  label: string
}

export function StepperNav({
  items,
  onToggleTheme,
  themeMode,
}: {
  items: StepperItem[]
  onToggleTheme: () => void
  themeMode: 'light' | 'dark'
}) {
  const { palette } = useTheme()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    const onScroll = () => {
      const y = window.scrollY + 200
      let current = 0
      sections.forEach((el, i) => {
        if (el.offsetTop <= y) current = i
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: palette.bg + 'F0',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${palette.borderSubtle}`,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <a href="/" aria-label="ERA" style={{ display: 'flex', alignItems: 'center', marginRight: 12 }}>
          <img
            src="/era-symbol.png"
            alt="ERA"
            style={{
              height: 22,
              width: 'auto',
              display: 'block',
              filter: themeMode === 'dark' ? 'invert(1)' : 'none',
            }}
          />
        </a>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            gap: 4,
            overflowX: 'auto',
          }}
        >
          {items.map((item, i) => {
            const isActive = i === active
            const isPast = i < active
            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
                <button
                  onClick={() => goto(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: FONT.body,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: isActive || isPast ? palette.rust : 'transparent',
                      border: `1.5px solid ${isActive || isPast ? palette.rust : palette.border}`,
                      transition: 'all 0.3s',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: isActive ? palette.text : palette.textMuted,
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
                {i < items.length - 1 && (
                  <div
                    style={{
                      width: 16,
                      height: 1,
                      background: isPast ? palette.rust : palette.border,
                      transition: 'background 0.3s',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
        <button
          onClick={onToggleTheme}
          aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          style={{
            background: 'transparent',
            border: `1px solid ${palette.border}`,
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: palette.textMuted,
            transition: 'all 0.2s',
            flex: '0 0 auto',
          }}
        >
          {themeMode === 'light' ? (
            // Sun icon (currently light, click to go dark)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            // Moon icon (currently dark, click to go light)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export type { ThemePalette }
