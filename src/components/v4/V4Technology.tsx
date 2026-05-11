/**
 * V4Technology — ▸05 (renumbered) "24 Live Data Signals".
 *
 * Ink-black-ground section. Brutalist box grid showing all 24 signals
 * ERA tracks, with their activation patterns and tech vendor mappings.
 * Each box has a colored top border that maps to category — magenta
 * for INTENT (most actionable) descending through white-alpha tints
 * for FIRMOGRAPHIC (most contextual). Scanning the grid horizontally,
 * the top-edges form a visual category map.
 *
 * Live indicator:
 *   Each card carries a small "▌ N" indicator at top-right — a thin
 *   magenta bar (the universal "this is firing now" cue) plus a tight
 *   mono count of how many times the signal has fired today.
 *
 *   The bar pulses ambient (opacity 0.45 → 1 → 0.45 over 2.4s,
 *   staggered phase per card), so the section reads as alive even
 *   when no tick is currently firing. A central tick manager picks
 *   5-7 random "active" cards and ticks them on randomized 8-30s
 *   intervals; on tick, the count fades in (300ms) with the new
 *   value via key={count} remount. The category tag also pulses
 *   on tick for an additional confirmation cue.
 *
 *   For featured (spotlight) cards, SPOTLIGHT moves inline next to
 *   the "01 / 24" num prefix so the top-right slot is free for the
 *   live indicator.
 *
 *   Pauses on hover (cursor-over-card), on touch (pointer-down), and
 *   when the section is offscreen (IntersectionObserver). Respects
 *   prefers-reduced-motion: under that preference, no animation runs
 *   and counters render at their deterministic initial values.
 *
 *   Initial values are seeded from a hash of the signal name and
 *   persisted in sessionStorage so they don't reset jarringly on
 *   in-session navigation.
 *
 * Magenta returns as accent here, threading visually back to §02
 * Warmth — the section that introduced "signals compound."
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { V4Header } from './V4Header'

type Category =
  | 'INTENT'
  | 'BEHAVIORAL'
  | 'NETWORK'
  | 'TECHNOGRAPHIC'
  | 'FIRMOGRAPHIC'

interface Signal {
  name: string
  meaning: string
  category: Category
  activation: string
  tech: string
  featured?: boolean
}

const SIGNALS: Signal[] = [
  { name: 'New C-Level Exec Hire', meaning: 'New exec. New priorities.', category: 'INTENT', activation: 'Executive intro track', tech: 'Clay · Apollo' },
  { name: 'Hiring Surge', meaning: 'Team scaling fast', category: 'INTENT', activation: 'Capacity expansion outreach', tech: 'Apollo · LinkedIn', featured: true },
  { name: 'Tech Stack Change', meaning: 'Just installed something new', category: 'TECHNOGRAPHIC', activation: 'Integration partnership pitch', tech: 'BuiltWith · HG Insights' },
  { name: 'Funding Round', meaning: 'Fresh budget on the table', category: 'INTENT', activation: 'Strategic investment outreach', tech: 'Crunchbase · Apollo' },
  { name: 'Traffic Spike', meaning: 'Buyers researching this week', category: 'BEHAVIORAL', activation: 'Warmed inbound trigger', tech: 'HockeyStack · RB2B' },
  { name: 'Review Sentiment', meaning: 'Customers complaining publicly', category: 'BEHAVIORAL', activation: 'Switch pitch sequence', tech: 'G2 · Trustpilot' },
  { name: 'Press Announcement', meaning: 'New strategic direction', category: 'INTENT', activation: 'Strategic alignment outreach', tech: 'Clay · Crunchbase' },
  { name: 'Social Complaint', meaning: 'Pain showing in public', category: 'BEHAVIORAL', activation: 'Reactive support pitch', tech: 'LinkedIn · Champify' },
  { name: 'Website Visit', meaning: 'Researching your solution', category: 'BEHAVIORAL', activation: 'Warm follow-up sequence', tech: 'HockeyStack · RB2B', featured: true },
  { name: 'Past Engagement', meaning: 'Knows you. Worth re-engaging.', category: 'BEHAVIORAL', activation: 'Re-engagement sequence', tech: 'HubSpot · Copper' },
  { name: 'Content Download', meaning: 'Exploring a solution', category: 'BEHAVIORAL', activation: 'Value-driven nurture', tech: 'HubSpot · HockeyStack' },
  { name: 'LinkedIn Post Reaction', meaning: 'Interested in the topic', category: 'BEHAVIORAL', activation: 'Topic-aligned outreach', tech: 'Dripify · Clay' },
  { name: 'LinkedIn Comment', meaning: 'Engaging publicly', category: 'BEHAVIORAL', activation: 'Comment-thread engagement', tech: 'Dripify · Clay' },
  { name: 'LinkedIn Connection', meaning: 'Wants to connect', category: 'NETWORK', activation: 'Founder-led nurture', tech: 'Dripify · Salesforge' },
  { name: 'Email Reply', meaning: 'Wrote back. Interested.', category: 'BEHAVIORAL', activation: 'Multi-thread acceleration', tech: 'Salesforge · HubSpot' },
  { name: 'Meeting Scheduled', meaning: 'Booked a call', category: 'BEHAVIORAL', activation: 'Pre-meeting prep dossier', tech: 'HubSpot · Fireflies' },
  { name: 'Product Launch', meaning: 'Making strategic moves', category: 'INTENT', activation: 'Strategic alignment outreach', tech: 'Crunchbase · Clay' },
  { name: 'Competitor Mention', meaning: 'Comparing options', category: 'BEHAVIORAL', activation: 'Differentiation pitch', tech: 'G2 · LinkedIn' },
  { name: 'Customer Review Theme', meaning: 'Pattern of pain showing', category: 'BEHAVIORAL', activation: 'Pain-pattern outreach', tech: 'G2 · Trustpilot' },
  { name: 'Job Description Change', meaning: 'Role expanded. New scope.', category: 'INTENT', activation: 'Role-aware approach', tech: 'Apollo · LinkedIn' },
  { name: 'Conference Attendance', meaning: 'Showed up to learn', category: 'BEHAVIORAL', activation: 'Event follow-up sequence', tech: 'LinkedIn · Apollo' },
  { name: 'Dark Social Mention', meaning: 'Talking about you privately', category: 'NETWORK', activation: 'Insider connection', tech: 'Champify · Slack' },
  { name: 'Referral Intro', meaning: 'Warm introduction', category: 'NETWORK', activation: 'VIP fast-track', tech: 'HubSpot · Slack' },
  { name: 'Renewal Window', meaning: 'Decision time approaching', category: 'FIRMOGRAPHIC', activation: 'Renewal reactivation', tech: 'HubSpot · Copper' },
]

const CATEGORY_MOD: Record<Category, string> = {
  INTENT: 'v4-signal-box--intent',
  BEHAVIORAL: 'v4-signal-box--behavioral',
  NETWORK: 'v4-signal-box--network',
  TECHNOGRAPHIC: 'v4-signal-box--technographic',
  FIRMOGRAPHIC: 'v4-signal-box--firmographic',
}

// Initial-value ranges, per the buyer-feedback spec:
//   Spotlight (featured):                                   30-80
//   LinkedIn Connection, Email Reply, Content Download:     15-40
//   Tech Stack Change, Funding Round, C-Level Exec Hire:    3-12
//   Dark Social Mention, Referral Intro:                    5-20
//   Renewal Window:                                         1-8
//   Other BEHAVIORAL:                                       10-30
//   Other INTENT:                                           3-12
//   Other NETWORK:                                          5-18
//   Other TECHNOGRAPHIC:                                    3-15
//   Other FIRMOGRAPHIC:                                     1-8
const SPEC_OVERRIDES: Record<string, readonly [number, number]> = {
  'LinkedIn Connection':   [15, 40],
  'Email Reply':           [15, 40],
  'Content Download':      [15, 40],
  'Tech Stack Change':     [3, 12],
  'Funding Round':         [3, 12],
  'New C-Level Exec Hire': [3, 12],
  'Dark Social Mention':   [5, 20],
  'Referral Intro':        [5, 20],
  'Renewal Window':        [1, 8],
}

function rangeFor(s: Signal): readonly [number, number] {
  if (s.featured) return [30, 80] as const
  if (SPEC_OVERRIDES[s.name]) return SPEC_OVERRIDES[s.name]
  switch (s.category) {
    case 'BEHAVIORAL':    return [10, 30] as const
    case 'INTENT':        return [3, 12] as const
    case 'NETWORK':       return [5, 18] as const
    case 'TECHNOGRAPHIC': return [3, 15] as const
    case 'FIRMOGRAPHIC':  return [1, 8] as const
  }
}

// Deterministic seed from the signal name so initial values feel
// realistic and stable across reloads in the same session.
function seedFromName(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const STORAGE_PREFIX = 'v4-tech-count-'

function loadInitial(name: string, range: readonly [number, number]): number {
  const [min, max] = range
  try {
    const stored = sessionStorage.getItem(STORAGE_PREFIX + name)
    if (stored !== null) {
      const n = Number(stored)
      if (Number.isFinite(n) && n >= 0 && n <= 99) return n
    }
  } catch {
    // sessionStorage unavailable (private browsing in some cases) —
    // fall through to deterministic seed.
  }
  const span = max - min + 1
  return min + (seedFromName(name) % span)
}

// Live tick manager. Picks a random subset of card ids as the "active"
// set and dispatches tick events to those cards via subscriber refs.
// Rotates one card in/out of the active set every 60-90s. Pauses
// dispatch while the section is offscreen.
type TickCallback = () => void

function useSignalTickManager(
  signalIds: readonly string[],
  sectionRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const subscribers = useRef<Map<string, TickCallback>>(new Map())
  const activeSet = useRef<Set<string>>(new Set())
  const tickTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const rotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isVisible = useRef(false)

  const subscribe = useCallback((id: string, cb: TickCallback) => {
    subscribers.current.set(id, cb)
    return () => {
      subscribers.current.delete(id)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    if (signalIds.length === 0) return

    const ACTIVE_COUNT = 6
    const TICK_MIN_MS = 8_000
    const TICK_MAX_MS = 30_000
    const ROTATE_MIN_MS = 60_000
    const ROTATE_MAX_MS = 90_000

    // Seed the active subset deterministically (Fisher-Yates with
    // Math.random — order doesn't need to persist across reloads).
    const ids = [...signalIds]
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[ids[i], ids[j]] = [ids[j], ids[i]]
    }
    activeSet.current = new Set(ids.slice(0, ACTIVE_COUNT))

    const scheduleTick = (id: string) => {
      const delay = TICK_MIN_MS + Math.random() * (TICK_MAX_MS - TICK_MIN_MS)
      const t = setTimeout(() => {
        if (!activeSet.current.has(id)) return
        if (isVisible.current) {
          const cb = subscribers.current.get(id)
          if (cb) cb()
        }
        scheduleTick(id)
      }, delay)
      tickTimers.current.set(id, t)
    }

    const rotate = () => {
      const active = [...activeSet.current]
      const idle = signalIds.filter((id) => !activeSet.current.has(id))
      if (active.length === 0 || idle.length === 0) return
      const outId = active[Math.floor(Math.random() * active.length)]
      const inId = idle[Math.floor(Math.random() * idle.length)]
      const existing = tickTimers.current.get(outId)
      if (existing) clearTimeout(existing)
      tickTimers.current.delete(outId)
      activeSet.current.delete(outId)
      activeSet.current.add(inId)
      scheduleTick(inId)
    }

    const scheduleRotate = () => {
      const delay = ROTATE_MIN_MS + Math.random() * (ROTATE_MAX_MS - ROTATE_MIN_MS)
      rotateTimer.current = setTimeout(() => {
        rotate()
        scheduleRotate()
      }, delay)
    }

    activeSet.current.forEach((id) => scheduleTick(id))
    scheduleRotate()

    // Pause ticks when the section scrolls offscreen.
    const node = sectionRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible.current = entry.isIntersecting
        }
      },
      { threshold: 0 },
    )
    if (node) observer.observe(node)

    return () => {
      tickTimers.current.forEach((t) => clearTimeout(t))
      tickTimers.current.clear()
      if (rotateTimer.current) clearTimeout(rotateTimer.current)
      observer.disconnect()
    }
  }, [enabled, signalIds, sectionRef])

  return { subscribe }
}

// Individual card. Owns its own count + pulse state so a tick on
// one card doesn't re-render the other 23.
interface SignalCardProps {
  signal: Signal
  index: number
  total: number
  subscribe: (id: string, cb: TickCallback) => () => void
  reducedMotion: boolean
}

function SignalCard({ signal, index, total, subscribe, reducedMotion }: SignalCardProps) {
  const range = useMemo(() => rangeFor(signal), [signal])
  const [count, setCount] = useState<number>(() => loadInitial(signal.name, range))
  const [pulseKey, setPulseKey] = useState(0)
  const isHovered = useRef(false)

  // Persist current count to sessionStorage so reloads inside the
  // session resume from the same place.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_PREFIX + signal.name, String(count))
    } catch {
      // sessionStorage unavailable — silently skip persistence.
    }
  }, [signal.name, count])

  // Subscribe to the central tick manager. On each tick: skip if
  // hovered or reduced-motion; otherwise bump count by +1, +2, or
  // +3 (mostly +1, ~15% chance of a small burst) and trigger the
  // category pulse.
  useEffect(() => {
    if (reducedMotion) return
    return subscribe(signal.name, () => {
      if (isHovered.current) return
      setCount((prev) => {
        const burst = Math.random() < 0.15
        const inc = burst ? (Math.random() < 0.5 ? 3 : 2) : 1
        return Math.min(99, prev + inc)
      })
      setPulseKey((k) => k + 1)
    })
  }, [signal.name, subscribe, reducedMotion])

  const classes = [
    'v4-signal-box',
    CATEGORY_MOD[signal.category],
    signal.featured ? 'v4-signal-box--featured' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Stagger the ambient pulse so 24 bars don't blink in unison.
  // Negative delay starts each card mid-cycle at a different phase.
  const pulsePhase = (index % 12) * -0.2

  return (
    <article
      className={classes}
      onPointerEnter={() => {
        isHovered.current = true
      }}
      onPointerLeave={() => {
        isHovered.current = false
      }}
    >
      <div className="v4-signal-box__num">
        {String(index + 1).padStart(2, '0')} / {total}
        {signal.featured && (
          <span className="v4-signal-box__spotlight">SPOTLIGHT</span>
        )}
      </div>

      {/* Live indicator: pulsing magenta bar + tight count, top-right.
          Bar runs an ambient slow pulse via CSS keyframes; count
          remounts with key={count} so the new value fades in. */}
      <div className="v4-signal-box__live" aria-live="off">
        <span
          className="v4-signal-box__live-bar"
          style={reducedMotion ? undefined : { animationDelay: `${pulsePhase}s` }}
          aria-hidden="true"
        />
        <span key={count} className="v4-signal-box__live-num">{count}</span>
      </div>

      <div className="v4-signal-box__name">{signal.name}</div>
      <div className="v4-signal-box__meaning">{signal.meaning}</div>
      <div className="v4-signal-box__rule" aria-hidden="true" />
      <div className="v4-signal-box__activation">{signal.activation}</div>
      <div className="v4-signal-box__tech">{signal.tech}</div>

      {/* Category tag — pulses for 200ms on each tick via key={pulseKey}. */}
      <div
        key={pulseKey}
        className={`v4-signal-box__category${pulseKey > 0 && !reducedMotion ? ' is-pulsing' : ''}`}
      >
        {signal.category}
      </div>
    </article>
  )
}

export function V4Technology({ phase = '▸06 · TECHNOLOGY' }: { phase?: string } = {}) {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const total = SIGNALS.length

  const ids = useMemo(() => SIGNALS.map((s) => s.name), [])
  const { subscribe } = useSignalTickManager(ids, sectionRef, !reducedMotion)

  return (
    <section ref={sectionRef} className="v4-section v4-section--technology" id="tech">
      <V4Header
        phase={phase}
        meta={['24 SIGNALS', '24 ACTIVATIONS', 'ZERO MANUAL TRIGGERS']}
      />

      <div className="v4-technology">
        <div className="v4-technology__header">
          <h2 className="v4-technology__display">
            24 <em>live</em> data signals
          </h2>
          <p className="v4-technology__lede">
            ERA captures signals across every channel that matters and
            fires the right activation when the pattern is real.{' '}
            <strong>Every signal has a tech vendor behind it</strong>,
            every activation has a tested pattern, and nothing fires
            manually.
          </p>
        </div>

        <div className="v4-signal-grid">
          {SIGNALS.map((s, i) => (
            <SignalCard
              key={s.name}
              signal={s}
              index={i}
              total={total}
              subscribe={subscribe}
              reducedMotion={!!reducedMotion}
            />
          ))}
        </div>

        <div className="v4-technology__summary">
          24 SIGNALS · 24 TECH VENDORS · ALL FIRING TODAY
        </div>
      </div>
    </section>
  )
}
