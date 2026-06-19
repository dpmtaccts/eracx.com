import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { V4Wordmark } from '../components/v4/V4Wordmark'

/* Person-First Framework — gated landing page for Dan Pearce (Sovereign
   Silver). Soft, client-side password gate that mirrors the BetterUp audit
   pattern. After auth the framework renders full-viewport from the static
   /person-first-framework.html asset; the URL stays /person-first-framework.
   The static page carries a matching guard so direct hits bounce here. */

const SESSION_KEY = 'pff-auth'
const PASSWORD = 'empathyinaction'
const ASSET_URL = '/person-first-framework.html'

// v4 publication tokens, kept local so the gate is self-contained.
const PARCHMENT = '#F4F1EA'
const INK = '#0A0A0A'
const HOT = '#E6195F'
const RULE_INK = 'rgba(10, 10, 10, 0.15)'
const MUTED = 'rgba(10, 10, 10, 0.55)'

const FONT = {
  mega: "'Anton', 'Helvetica Neue Condensed', sans-serif",
  body: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
}

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap'

function loadFonts() {
  if (typeof document === 'undefined') return
  if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_URL
    document.head.appendChild(link)
  }
}

function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function PersonFirstFramework() {
  const [authed, setAuthed] = useState(isAuthed)

  useEffect(() => {
    loadFonts()
    const previous = document.title
    document.title = 'The Buyer View · Person-First Framework'
    return () => {
      document.title = previous
    }
  }, [])

  if (authed) {
    return (
      <iframe
        title="Person-First Framework"
        src={ASSET_URL}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    )
  }

  return <Gate onAuth={() => setAuthed(true)} />
}

function Gate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (password !== PASSWORD) {
      setError(true)
      setTimeout(() => setError(false), 1500)
      return
    }
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // noop — gate still opens for this view
    }
    onAuth()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: PARCHMENT,
        color: INK,
        fontFamily: FONT.body,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px',
          fontFamily: FONT.mono,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: MUTED,
          borderBottom: `1px solid ${RULE_INK}`,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ color: INK, display: 'inline-flex', alignItems: 'center' }}>
          <V4Wordmark style={{ height: 18, width: 'auto', display: 'block' }} />
        </div>
        <span>The Buyer View</span>
      </header>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                fontFamily: FONT.mega,
                fontSize: 'clamp(34px, 5.5vw, 52px)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-0.005em',
                textTransform: 'uppercase',
                color: INK,
              }}
            >
              The Person-First Framework
            </div>
            <div aria-hidden style={{ height: 3, background: INK, marginTop: 14 }} />
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: MUTED,
                fontWeight: 600,
                marginTop: 12,
              }}
            >
              A Revenue Signal Instrument by ERA
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 48,
            }}
          >
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: MUTED,
                fontWeight: 600,
              }}
            >
              Prepared for
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: INK,
                fontWeight: 600,
              }}
            >
              Dan Pearce · Sovereign Silver
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
            noValidate
          >
            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: error ? HOT : MUTED,
                  fontWeight: 600,
                  marginBottom: 10,
                  transition: 'color 120ms ease',
                }}
              >
                Access code
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    submit()
                  }
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `1px solid ${error ? HOT : 'rgba(10, 10, 10, 0.3)'}`,
                  color: INK,
                  fontFamily: FONT.body,
                  fontSize: 18,
                  padding: '8px 0 12px',
                  outline: 'none',
                  borderRadius: 0,
                  transition: 'border-bottom-color 120ms ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderBottomColor = INK
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderBottomColor = 'rgba(10, 10, 10, 0.3)'
                }}
              />
            </div>

            <Submit label="Open the view" />
          </form>
        </div>
      </div>

      <footer
        style={{
          padding: '14px 32px',
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: MUTED,
          fontWeight: 600,
          borderTop: `1px solid ${RULE_INK}`,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span>eracx.com</span>
        <span>Restricted preview</span>
      </footer>
    </div>
  )
}

function Submit({ label }: { label: string }) {
  const base: CSSProperties = {
    marginTop: 12,
    all: 'unset',
    cursor: 'pointer',
    fontFamily: FONT.mono,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: INK,
    border: `2px solid ${INK}`,
    padding: '14px 24px',
    display: 'inline-block',
    transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
  }
  return (
    <button
      type="submit"
      style={base}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = HOT
        e.currentTarget.style.color = '#FFFFFF'
        e.currentTarget.style.borderColor = HOT
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = INK
        e.currentTarget.style.borderColor = INK
      }}
    >
      → {label}
    </button>
  )
}
