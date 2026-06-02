import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MethodologyContent } from './MethodologyContent'
import { FONT } from '../pages/betterup/theme'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const LINE = 'rgba(10, 10, 10, 0.15)'

const TITLE_ID = 'methodology-drawer-title'

/* Slide-over rendered when /methodology is hit with a `backgroundLocation`
   in state. Wraps the same MethodologyContent the standalone page uses. */
export default function MethodologyDrawer() {
  const navigate = useNavigate()
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<Element | null>(null)
  const prefersReducedMotion = useRef(false)

  // Capture the trigger element so we can return focus to it on close.
  useEffect(() => {
    previouslyFocused.current = document.activeElement
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }, [])

  const close = () => {
    navigate(-1)
    requestAnimationFrame(() => {
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus()
      }
    })
  }

  // ESC to close, scroll lock, body focus trap, focus-into-drawer on open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    // Move focus into the drawer after mount so screen readers announce it.
    requestAnimationFrame(() => {
      panelRef.current?.focus()
    })

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const transition = prefersReducedMotion.current ? 'none' : 'transform 0.22s ease-out, opacity 0.18s ease'

  return (
    <>
      {/* Scrim */}
      <div
        onClick={close}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.42)',
          zIndex: 9998,
          transition: 'opacity 0.18s ease',
        }}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(640px, 100vw)',
          height: '100vh',
          background: PAPER,
          borderLeft: `1px solid ${INK}`,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          transition,
          outline: 'none',
        }}
      >
        {/* Sticky header — title + close */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: PAPER,
            borderBottom: `1px solid ${LINE}`,
            padding: '14px 22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <span
            id={TITLE_ID}
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: INK,
            }}
          >
            The 2026 B2B Buyer · Myth vs Fact
          </span>
          <button
            onClick={close}
            aria-label="Close methodology drawer"
            style={{
              background: 'transparent',
              border: 'none',
              color: MUTED,
              cursor: 'pointer',
              padding: 6,
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span aria-hidden>×</span> close
          </button>
        </div>

        {/* Scrolling body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <MethodologyContent titleId={TITLE_ID + '-h1'} />
        </div>
      </aside>
    </>
  )
}
