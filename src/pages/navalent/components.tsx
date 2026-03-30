import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Brand tokens ─── */
export const COLORS = {
  charcoal: '#383838',
  bgDark: '#141414',
  offWhite: '#F6F5F2',
  divider: '#D7DADD',
  secondary: '#5B6670',
  white: '#FFFFFF',
  teal: '#1FA7A2',
  oxide: '#B85C4A',
  sand: '#D6B26D',
  magenta: '#D43D8D',
} as const

export const FONT = {
  body: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
  display: "'Arial Black', 'Arial', system-ui, sans-serif",
}

/* ─── Font loader (injects link tag once) ─── */
const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,700;0,800;1,300&display=swap'

let fontLoaded = false
export function loadFonts() {
  if (fontLoaded) return
  fontLoaded = true
  if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_URL
    document.head.appendChild(link)
  }
}

/* ─── Scroll-triggered wrapper ─── */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Staggered group ─── */
export function StaggerGroup({
  children,
  stagger = 0.15,
  className = '',
}: {
  children: ReactNode[]
  stagger?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Animated counter ─── */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2,
  color,
  size = 'large',
  label,
  dark = true,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  color: string
  size?: 'large' | 'medium'
  label?: string
  dark?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      // easeOutCubic — decelerates as it approaches target
      const eased = 1 - Math.pow(1 - t, 3)
      const current = eased * value
      if (decimals > 0) {
        setDisplay(current.toFixed(decimals))
      } else {
        setDisplay(Math.round(current).toLocaleString())
      }
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value, duration, decimals])

  const fontSize = size === 'large' ? 'text-7xl md:text-8xl' : 'text-5xl md:text-6xl'

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        className={`${fontSize}`}
        style={{ color, fontFamily: FONT.body, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}
      >
        {prefix}
        {display}
        {suffix}
      </div>
      {label && (
        <div
          className="mt-3 text-sm md:text-base"
          style={{ color: dark ? 'rgba(246,245,242,0.75)' : COLORS.secondary, fontFamily: FONT.body, fontWeight: 400 }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

/* ─── Section wrapper ─── */
export function Section({
  dark = false,
  accent,
  children,
  id,
  fullHeight = false,
  className = '',
}: {
  dark?: boolean
  accent?: string
  children: ReactNode
  id?: string
  fullHeight?: boolean
  className?: string
}) {
  return (
    <section
      id={id}
      style={{
        background: dark ? COLORS.bgDark : COLORS.offWhite,
        color: dark ? COLORS.offWhite : COLORS.charcoal,
        fontFamily: FONT.body,
        position: 'relative',
        minHeight: fullHeight ? '100vh' : undefined,
        display: fullHeight ? 'flex' : undefined,
        flexDirection: fullHeight ? 'column' : undefined,
        justifyContent: fullHeight ? 'center' : undefined,
      }}
      className={className}
    >
      {accent && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: accent,
          }}
        />
      )}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px', width: '100%' }}>
        {children}
      </div>
    </section>
  )
}

/* ─── Kicker (small caps label) ─── */
export function Kicker({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div
      style={{
        color,
        fontFamily: FONT.body,
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: '3px',
        textTransform: 'uppercase',
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Section headline ─── */
export function Headline({
  children,
  color,
  size = 'h2',
}: {
  children: ReactNode
  color?: string
  size?: 'h1' | 'h2' | 'h3'
}) {
  const sizeMap = { h1: 'text-4xl md:text-5xl', h2: 'text-3xl md:text-[42px]', h3: 'text-2xl md:text-3xl' }
  return (
    <h2
      className={`${sizeMap[size]} font-bold mb-6`}
      style={{ color, fontFamily: FONT.body, lineHeight: 1.15 }}
    >
      {children}
    </h2>
  )
}

/* ─── Display type (eyebrow + massive headline + optional subtitle) ─── */
export function DisplayType({ children, color, subtitle, subtitleColor, eyebrow, dark = true }: { children: ReactNode; color?: string; subtitle?: string; subtitleColor?: string; eyebrow?: string; dark?: boolean }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {eyebrow && (
        <div
          style={{
            color: color || (dark ? COLORS.offWhite : COLORS.charcoal),
            fontFamily: FONT.body,
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-4xl md:text-5xl"
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          color: dark ? COLORS.offWhite : COLORS.charcoal,
          margin: 0,
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <div
          className="text-lg md:text-xl mt-6"
          style={{
            fontFamily: FONT.body,
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: subtitleColor || (dark ? 'rgba(246,245,242,0.65)' : COLORS.secondary),
            maxWidth: 800,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  )
}

/* ─── Callout bar (left accent + quote) ─── */
export function Callout({
  children,
  color,
  textColor,
}: {
  children: ReactNode
  color: string
  textColor?: string
}) {
  return (
    <div style={{ display: 'flex', gap: 20, margin: '32px 0' }}>
      <div style={{ width: 4, flexShrink: 0, background: color, borderRadius: 2 }} />
      <div
        className="text-lg md:text-xl"
        style={{
          fontFamily: FONT.body,
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.6,
          color: textColor || COLORS.offWhite,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ─── Verdict box ─── */
export function VerdictBox({
  verdict,
  detail,
  accent,
  dark = false,
}: {
  verdict: string
  detail: string
  accent: string
  dark?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: 40,
        padding: '24px 28px',
        borderLeft: `4px solid ${accent}`,
        borderRadius: '0 8px 8px 0',
        background: dark
          ? `linear-gradient(135deg, ${accent}08, ${accent}04)`
          : `linear-gradient(135deg, ${accent}06, ${accent}03)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: accent,
          marginBottom: 10,
        }}
      >
        VERDICT
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          fontSize: 17,
          color: dark ? COLORS.offWhite : COLORS.charcoal,
          marginBottom: 8,
        }}
      >
        {verdict}
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 300,
          fontSize: 16,
          lineHeight: 1.65,
          fontStyle: 'italic',
          color: dark ? 'rgba(246,245,242,0.85)' : COLORS.secondary,
        }}
      >
        {detail}
      </div>
    </motion.div>
  )
}

/* ─── Body text ─── */
export function Body({
  children,
  dark = false,
  className = '',
}: {
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <div
      className={className}
      style={{
        fontFamily: FONT.body,
        fontWeight: 300,
        fontSize: 18,
        lineHeight: 1.65,
        color: dark ? COLORS.offWhite : COLORS.charcoal,
        maxWidth: 720,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Body with margin stat ─── */
export function BodyWithMargin({
  children,
  dark = false,
  stat,
  statLabel,
  statSublabel,
  statColor,
  statIcon,
}: {
  children: ReactNode
  dark?: boolean
  stat: string
  statLabel: string
  statSublabel?: string
  statColor?: string
  statIcon?: ReactNode
}) {
  const color = statColor || COLORS.teal
  return (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 300,
          fontSize: 18,
          lineHeight: 1.65,
          color: dark ? COLORS.offWhite : COLORS.charcoal,
          flex: '1 1 0',
          minWidth: 0,
        }}
      >
        {children}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:flex"
        style={{
          flex: '0 0 320px',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '36px 28px',
          borderRadius: 12,
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        {statIcon && <div style={{ marginBottom: 12 }}>{statIcon}</div>}
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1,
            color: color,
            textAlign: 'center',
          }}
        >
          {stat}
        </div>
        <div
          style={{
            fontFamily: FONT.body,
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '0.08em',
            color: dark ? 'rgba(246,245,242,0.6)' : COLORS.secondary,
            marginTop: 10,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          {statLabel}
        </div>
        {statSublabel && (
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 300,
              fontSize: 13,
              color: dark ? 'rgba(246,245,242,0.5)' : 'rgba(0,0,0,0.45)',
              marginTop: 4,
              textAlign: 'center',
            }}
          >
            {statSublabel}
          </div>
        )}
      </motion.div>
    </div>
  )
}

/* ─── From / To transformation table ─── */
export function TransformationTable({
  rows,
}: {
  rows: { today: string; future: string }[]
}) {
  return (
    <div style={{ margin: '48px 0' }}>
      {/* Column headers — desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex"
        style={{ alignItems: 'center', marginBottom: 16 }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: COLORS.oxide,
              padding: '6px 18px',
              borderRadius: 20,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
            <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#fff' }}>
              Today
            </span>
          </div>
        </div>
        <div style={{ width: 72, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: COLORS.teal,
              padding: '6px 18px',
              borderRadius: 20,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
            <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#fff' }}>
              With Infrastructure
            </span>
          </div>
        </div>
      </motion.div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            {/* Desktop: left — animated arrow — right */}
            <div className="hidden md:flex" style={{ alignItems: 'stretch' }}>
              {/* Today (left) */}
              <div
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  background: '#fff',
                  border: `1px solid ${COLORS.divider}`,
                  borderRadius: '8px 0 0 8px',
                  borderRight: 'none',
                  fontFamily: FONT.body,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: COLORS.secondary,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 28,
                    lineHeight: 1,
                    color: 'rgba(56,56,56,0.05)',
                    position: 'absolute',
                    top: 8,
                    right: 10,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {row.today}
              </div>

              {/* Animated connector */}
              <div
                style={{
                  width: 72,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Line that draws in */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '100%',
                    height: 2,
                    background: `linear-gradient(90deg, ${COLORS.oxide}, ${COLORS.teal})`,
                    transformOrigin: 'left center',
                    borderRadius: 1,
                  }}
                />
                {/* Arrow head */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.5 + i * 0.08 }}
                  style={{
                    position: 'absolute',
                    right: -1,
                    width: 0,
                    height: 0,
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: `7px solid ${COLORS.teal}`,
                  }}
                />
              </div>

              {/* Future (right) */}
              <div
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  background: '#fff',
                  border: `1px solid ${COLORS.divider}`,
                  borderRadius: '0 8px 8px 0',
                  borderLeft: 'none',
                  fontFamily: FONT.body,
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: COLORS.charcoal,
                }}
              >
                {row.future}
              </div>
            </div>

            {/* Mobile: stacked with arrow between */}
            <div
              className="md:hidden"
              style={{
                background: '#fff',
                border: `1px solid ${COLORS.divider}`,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '14px 16px', borderBottom: `1px solid ${COLORS.divider}` }}>
                <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: COLORS.oxide, marginBottom: 4 }}>Today</div>
                <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 14, color: COLORS.secondary, lineHeight: 1.5 }}>{row.today}</div>
              </div>
              <div style={{ padding: '6px 16px', display: 'flex', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M8 13l3-3M8 13l-3-3" stroke={COLORS.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: COLORS.teal, marginBottom: 4 }}>With Infrastructure</div>
                <div style={{ fontFamily: FONT.body, fontWeight: 400, fontSize: 14, color: COLORS.charcoal, lineHeight: 1.5 }}>{row.future}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Horizontal bar chart ─── */
export function HorizontalBar({
  label,
  value,
  maxValue,
  color,
  suffix = '%',
  dark = false,
}: {
  label: string
  value: number
  maxValue: number
  color: string
  suffix?: string
  dark?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const pct = (value / maxValue) * 100

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
          fontFamily: FONT.body,
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        <span style={{ color: dark ? COLORS.offWhite : COLORS.charcoal }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>
          {value}
          {suffix}
        </span>
      </div>
      <div
        style={{
          height: 8,
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', background: color, borderRadius: 4 }}
        />
      </div>
    </div>
  )
}

/* ─── Donut chart ─── */
export function DonutChart({
  segments,
  size = 200,
  strokeWidth = 28,
}: {
  segments: { label: string; value: number; color: string }[]
  size?: number
  strokeWidth?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((s, seg) => s + seg.value, 0)

  let offset = 0

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
        {segments.map((seg, i) => {
          const pct = seg.value / total
          const dash = circumference * pct
          const currentOffset = offset
          offset += dash
          return (
            <motion.circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-currentOffset}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            />
          )
        })}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontFamily: FONT.body }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
            <span style={{ fontWeight: 400 }}>
              {seg.label}{' '}
              <span style={{ fontWeight: 700 }}>({((seg.value / total) * 100).toFixed(1)}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Simple line/bar mini chart ─── */
export function MiniBarChart({
  data,
  color,
  dark = false,
}: {
  data: { label: string; value: number }[]
  color: string
  dark?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div
      ref={ref}
      style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 160 }}
    >
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: `${(d.value / max) * 120}px` } : {}}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: 64,
              background: color,
              borderRadius: '4px 4px 0 0',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -24,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: FONT.body,
                color: dark ? COLORS.offWhite : COLORS.charcoal,
                whiteSpace: 'nowrap',
              }}
            >
              {d.value >= 1000 ? `${(d.value / 1000).toFixed(0)}K` : d.value}
            </div>
          </motion.div>
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              fontFamily: FONT.body,
              color: dark ? 'rgba(246,245,242,0.75)' : COLORS.secondary,
            }}
          >
            {d.label}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Profile card (for champion data) ─── */
export function ProfileCard({
  name,
  previousRole,
  previousCompany,
  newRole,
  newCompany,
  employees,
  startDate,
  note,
  accent,
  dark = false,
}: {
  name: string
  previousRole: string
  previousCompany: string
  newRole: string
  newCompany: string
  employees?: string
  startDate?: string
  note?: string
  accent: string
  dark?: boolean
}) {
  return (
    <div
      style={{
        padding: '20px 24px',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : COLORS.divider}`,
        borderRadius: 8,
        borderTop: `3px solid ${accent}`,
        background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
      }}
    >
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 12,
          color: dark ? COLORS.offWhite : COLORS.charcoal,
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 13, fontFamily: FONT.body, color: COLORS.secondary, lineHeight: 1.8 }}>
        <div>
          <span style={{ fontWeight: 700, color: accent }}>From:</span> {previousRole} at {previousCompany}
        </div>
        <div>
          <span style={{ fontWeight: 700, color: accent }}>To:</span> {newRole} at {newCompany}
        </div>
        {employees && (
          <div>
            <span style={{ fontWeight: 700, color: accent }}>Size:</span> {employees} employees
          </div>
        )}
        {startDate && (
          <div>
            <span style={{ fontWeight: 700, color: accent }}>Started:</span> {startDate}
          </div>
        )}
        {note && (
          <div style={{ marginTop: 8, fontStyle: 'italic', fontSize: 12, lineHeight: 1.5, color: dark ? 'rgba(246,245,242,0.6)' : COLORS.secondary }}>
            {note}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Navalent Logo ─── */
export function NavalentLogo({ size = 180, dark = true }: { size?: number; dark?: boolean }) {
  const src = dark
    ? '/images/navalent/navalent-white-logo.svg'
    : '/images/navalent/navalent-logo.png'

  return (
    <div style={{ display: 'inline-block' }}>
      <img
        src={src}
        alt="Navalent"
        style={{
          height: size * 0.25,
          width: 'auto',
          display: 'block',
          opacity: dark ? 0.85 : 1,
        }}
        onError={(e) => {
          const t = e.target as HTMLImageElement
          t.style.display = 'none'
          t.parentElement!.innerHTML = `<span style="font-family:'Source Sans 3',system-ui,sans-serif;font-weight:300;font-size:${size * 0.18}px;color:${dark ? 'rgba(246,245,242,0.85)' : '#383838'};letter-spacing:0.08em;text-transform:lowercase">navalent</span>`
        }}
      />
    </div>
  )
}

/* ─── Commenter type icon ─── */
export function CommenterIcon({ type, color }: { type: string; color: string }) {
  const icons: Record<string, string> = {
    coach: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
    consultant: 'M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z',
    author: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
    founder: 'M9.5 3L6 6.5l3.5 3.5L11 8.5 9.5 3zm5 0L11 8.5 12.5 10 16 6.5 14.5 3zM5 12l-2 8h18l-2-8H5z',
    academic: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
    hr: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    vp: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
    csuite: 'M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z',
    other: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  }
  const path = icons[type] || icons.other
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d={path} />
    </svg>
  )
}

/* ─── LinkedIn reaction icons ─── */
export function LinkedInReactions({ size = 20 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {/* Like */}
      <div style={{ width: size, height: size, borderRadius: '50%', background: '#378FE9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 16 16" fill="white">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm1.97 3.97a.75.75 0 0 0-1.08.022L4.324 9.384a.75.75 0 0 0 1.06 1.06L8 7.837l2.616 2.607a.75.75 0 0 0 1.06-1.06L8.97 3.97z" />
        </svg>
      </div>
      {/* Celebrate */}
      <div style={{ width: size, height: size, borderRadius: '50%', background: '#44B37F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.55 }}>
        👏
      </div>
      {/* Support */}
      <div style={{ width: size, height: size, borderRadius: '50%', background: '#D4637C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.55 }}>
        ❤️
      </div>
      {/* Insightful */}
      <div style={{ width: size, height: size, borderRadius: '50%', background: '#E7A33E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.55 }}>
        💡
      </div>
    </div>
  )
}

/* ─── Timeline item ─── */
export function TimelineItem({
  label,
  period,
  color,
  items,
  isLast = false,
}: {
  label: string
  period: string
  color: string
  items: string[]
  isLast?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* Timeline rail */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: color,
            border: `3px solid ${color}`,
            boxShadow: `0 0 0 4px rgba(214,178,109,0.15)`,
          }}
        />
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: 2, flex: 1, background: `${color}40` }}
          />
        )}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 40 }}>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 14, color: color, fontWeight: 700, marginBottom: 12, letterSpacing: '0.05em' }}>
          {period}
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, listStyleType: 'disc', fontFamily: FONT.body, fontSize: 15, lineHeight: 1.8, color: COLORS.secondary }}>
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─── Section divider (full-width dark band between hypotheses) ─── */
export function SectionDivider({
  number,
  title,
  subtitle,
  color,
  id,
  scope,
  impact,
  impactLevel,
}: {
  number: string
  title: string
  subtitle?: string
  color: string
  id?: string
  scope?: string
  impact?: string
  impactLevel?: 'Critical' | 'High' | 'Moderate'
}) {
  const impactColor = impactLevel === 'Critical' ? COLORS.magenta : impactLevel === 'High' ? COLORS.oxide : COLORS.sand

  // Extract numeric portion for background display (e.g. "HYPOTHESIS 01" → "01")
  const bgNum = number.match(/\d+/)?.[0] || ''

  return (
    <div
      id={id}
      style={{
        background: COLORS.charcoal,
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large background number */}
      {bgNum && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            right: '-2%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: FONT.display,
            fontWeight: 900,
            fontSize: 'clamp(200px, 28vw, 400px)',
            lineHeight: 1,
            color,
            opacity: 0.07,
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: '-0.04em',
          }}
        >
          {bgNum}
        </motion.div>
      )}
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color,
              marginBottom: 20,
            }}
          >
            {number}
          </div>
          <div
            style={{
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 1.05,
              color: COLORS.offWhite,
              maxWidth: 900,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontFamily: FONT.body,
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 18,
                lineHeight: 1.6,
                color: 'rgba(246,245,242,0.65)',
                maxWidth: 700,
                marginTop: 20,
              }}
            >
              {subtitle}
            </div>
          )}
          {(scope || impact) && (
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              {scope && (
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(246,245,242,0.6)',
                    border: '1px solid rgba(246,245,242,0.15)',
                    borderRadius: 20,
                    padding: '5px 14px',
                  }}
                >
                  {scope}
                </span>
              )}
              {impact && (
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: impactColor,
                    border: `1px solid ${impactColor}40`,
                    borderRadius: 20,
                    padding: '5px 14px',
                  }}
                >
                  {impact}
                </span>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Floating "Contents" navigation with scroll spy ─── */
const NAV_ITEMS = [
  { id: 'framing', label: 'Assessment Framing' },
  { id: 'h1', label: 'Hypothesis 1: Relationships' },
  { id: 'h2', label: 'Hypothesis 2: HubSpot' },
  { id: 'h3', label: 'Hypothesis 3: Network' },
  { id: 'h4', label: 'Hypothesis 4: Champion Signals' },
  { id: 'h5', label: 'Hypothesis 5: Content' },
  { id: 'editorial', label: "What's Happening Here" },
  { id: 'next', label: 'What Comes Next' },
  { id: 'appendices', label: 'Appendices' },
]

export function SideNav() {
  const [activeId, setActiveId] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(true)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    )

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const checkBg = () => {
      setScrolled(window.scrollY > 200)
      if (!btnRef.current) return
      const rect = btnRef.current.getBoundingClientRect()
      const el = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height + 4)
      if (!el) return
      const bg = window.getComputedStyle(el).backgroundColor
      if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return
      const m = bg.match(/\d+/g)
      if (m) {
        const lum = (parseInt(m[0]) * 299 + parseInt(m[1]) * 587 + parseInt(m[2]) * 114) / 1000
        setOnDark(lum < 128)
      }
    }

    window.addEventListener('scroll', checkBg, { passive: true })
    checkBg()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', checkBg)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  const navItems = NAV_ITEMS.map(({ id, label }) => {
    const isActive = activeId === id
    return (
      <button
        key={id}
        onClick={() => scrollTo(id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '9px 20px',
          width: '100%',
          textAlign: 'left',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget.style.background = 'rgba(255,255,255,0.04)') }}
        onMouseLeave={(e) => { (e.currentTarget.style.background = 'none') }}
      >
        <div
          style={{
            width: 2,
            height: 16,
            borderRadius: 1,
            background: isActive ? COLORS.oxide : 'transparent',
            flexShrink: 0,
            transition: 'background 0.2s ease',
          }}
        />
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 13,
            fontWeight: isActive ? 600 : 400,
            color: isActive ? COLORS.offWhite : 'rgba(246,245,242,0.55)',
            transition: 'color 0.2s ease',
            letterSpacing: isActive ? '0.02em' : '0.01em',
          }}
        >
          {label}
        </span>
      </button>
    )
  })

  const textColor = onDark ? COLORS.offWhite : COLORS.charcoal
  const borderColor = onDark ? 'rgba(246,245,242,0.25)' : COLORS.divider

  return (
    <>
      {/* Top-right controls — appears after scrolling past cover */}
      <div
        className="no-print"
        style={{
          position: 'fixed',
          top: 20,
          right: 24,
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Download PDF button */}
        <button
          onClick={() => window.print()}
          style={{
            background: 'none',
            border: `1px solid ${borderColor}`,
            borderRadius: 6,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            transition: 'border-color 0.3s ease, color 0.3s ease',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v7M6 8L3 5.5M6 8l3-2.5" stroke={textColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 10h8" stroke={textColor} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              fontWeight: 600,
              color: textColor,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
          >
            PDF
          </span>
        </button>

        {/* Contents button */}
        <button
          ref={btnRef}
          onClick={() => setOpen(!open)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 0',
          }}
        >
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              fontWeight: 600,
              color: textColor,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
          >
            Contents
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{
              transition: 'transform 0.3s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <path d="M2 3.5L5 6.5L8 3.5" stroke={textColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      {open && scrolled && (
        <>
          <div
            className="no-print"
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 999 }}
          />
          <nav
            className="no-print"
            style={{
              position: 'fixed',
              top: 44,
              right: 24,
              zIndex: 1000,
              width: 260,
              background: 'rgba(40,40,40,0.97)',
              backdropFilter: 'blur(20px)',
              borderRadius: 8,
              padding: '6px 0',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {navItems}
          </nav>
        </>
      )}
    </>
  )
}

/* ─── Recommendation card ─── */
export function RecommendationCard({
  number,
  title,
  description,
  accent,
}: {
  number: number
  title: string
  description: string
  accent: string
}) {
  return (
    <div
      style={{
        padding: '24px 28px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: `3px solid ${accent}`,
        borderRadius: 8,
      }}
    >
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: accent,
          marginBottom: 8,
        }}
      >
        0{number}
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          fontSize: 18,
          color: COLORS.offWhite,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 300,
          fontSize: 15,
          lineHeight: 1.6,
          color: 'rgba(246,245,242,0.88)',
        }}
      >
        {description}
      </div>
    </div>
  )
}
