import { getSupabase } from '../../lib/supabase'

export type AuditPage = 'full' | 'summary' | 'era'

export type AnalyticsEvent =
  | 'session_start'
  | 'section_view'
  | 'section_time'
  | 'tab_click'
  | 'card_expand'
  | 'scroll_depth'
  | 'session_duration'
  | 'theme_toggle'
  | 'layer_toggle'
  | 'view_mode_toggle'

const EMAIL_KEY = 'betterup-audit-email'
const SESSION_KEY = 'betterup-audit-auth'

export function getStoredEmail(): string | null {
  try {
    return localStorage.getItem(EMAIL_KEY)
  } catch {
    return null
  }
}

export function setStoredEmail(email: string) {
  try {
    localStorage.setItem(EMAIL_KEY, email)
  } catch {
    // noop
  }
}

export function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1' && !!getStoredEmail()
  } catch {
    return false
  }
}

export async function track(
  event_type: AnalyticsEvent,
  event_data: string | number | null,
  page: AuditPage,
) {
  const email = getStoredEmail()
  if (!email) return
  const supabase = getSupabase()
  if (!supabase) return
  try {
    await supabase.from('betterup_audit_analytics').insert({
      email,
      event_type,
      event_data: event_data == null ? null : String(event_data),
      page,
    })
  } catch (err) {
    console.warn('analytics insert failed', err)
  }
}

/** Throttled buffered tracker for high-frequency events like scroll depth. */
const lastFire: Record<string, number> = {}
export function trackThrottled(
  event_type: AnalyticsEvent,
  event_data: string | number | null,
  page: AuditPage,
  ms = 5000,
) {
  const k = `${event_type}:${event_data}`
  const now = Date.now()
  if (lastFire[k] && now - lastFire[k] < ms) return
  lastFire[k] = now
  void track(event_type, event_data, page)
}

/** Track time spent in each section. Call from a top-level effect. */
export function startSectionTimeTracker(
  sectionIds: string[],
  page: AuditPage,
): () => void {
  const seenAt: Record<string, number> = {}
  const totals: Record<string, number> = {}
  let activeId: string | null = null
  let activeSince = 0
  let pageStart = Date.now()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          // First-time view
          if (!seenAt[id]) {
            seenAt[id] = Date.now()
            void track('section_view', id, page)
          }
          // Switch active section
          if (activeId !== id) {
            commitActive()
            activeId = id
            activeSince = Date.now()
          }
        }
      }
    },
    { threshold: [0, 0.4, 0.8] },
  )

  function commitActive() {
    if (activeId && activeSince) {
      const delta = Math.round((Date.now() - activeSince) / 1000)
      totals[activeId] = (totals[activeId] ?? 0) + delta
      activeSince = 0
    }
  }

  // Observe once DOM is ready
  const wireUp = () => {
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireUp, { once: true })
  } else {
    // Defer one frame so server components have rendered
    requestAnimationFrame(wireUp)
  }

  // Scroll depth tracking
  let maxDepth = 0
  const onScroll = () => {
    const h = document.documentElement
    const total = Math.max(1, h.scrollHeight - h.clientHeight)
    const pct = Math.min(100, Math.round((window.scrollY / total) * 100))
    if (pct > maxDepth) {
      maxDepth = pct
      // Only fire at 25/50/75/100 thresholds
      const thresholds = [25, 50, 75, 100]
      const hit = thresholds.find((t) => pct >= t && maxDepth - 1 < t)
      if (hit) void track('scroll_depth', hit, page)
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  // Send time-per-section snapshot every 30s
  const flushInterval = window.setInterval(() => {
    commitActive()
    activeSince = Date.now()
    Object.entries(totals).forEach(([id, sec]) => {
      if (sec > 0) void track('section_time', `${id}:${sec}`, page)
    })
  }, 30000)

  // Final flush on unload
  const onUnload = () => {
    commitActive()
    Object.entries(totals).forEach(([id, sec]) => {
      if (sec > 0) {
        // sendBeacon for reliability on unload
        const sb = getSupabase()
        if (!sb) return
        try {
          void sb.from('betterup_audit_analytics').insert({
            email: getStoredEmail(),
            event_type: 'section_time',
            event_data: `${id}:${sec}`,
            page,
          })
        } catch {}
      }
    })
    const sessionSec = Math.round((Date.now() - pageStart) / 1000)
    void track('session_duration', sessionSec, page)
  }
  window.addEventListener('beforeunload', onUnload)

  return () => {
    observer.disconnect()
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('beforeunload', onUnload)
    window.clearInterval(flushInterval)
    onUnload()
  }
}
