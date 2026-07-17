import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { usePostHog } from '@posthog/react'
import {
  FONT,
  INSURETECH_ACCESS_CODE,
  INSURETECH_SESSION_KEY,
  INSURETECH_EMAIL_KEY,
} from './theme'

/* Self-contained login gate for the InsureTech Buyer View.
   Work email plus an access code, held in sessionStorage. No client logo:
   this is an industry view, not a single-client audit, so the nameplate is the
   publication itself. Matches the v4 editorial-brutalist gate of the BetterUp
   audit. */

const PARCHMENT = '#F4F1EA'
const INK = '#0A0A0A'
const HOT = '#E6195F'
const RULE_INK = 'rgba(10, 10, 10, 0.15)'
const MUTED = 'rgba(10, 10, 10, 0.55)'

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export function isAuthed(): boolean {
  try {
    return (
      sessionStorage.getItem(INSURETECH_SESSION_KEY) === '1' &&
      !!localStorage.getItem(INSURETECH_EMAIL_KEY)
    )
  } catch {
    return false
  }
}

export function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const posthog = usePostHog()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<'email' | 'code' | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(INSURETECH_EMAIL_KEY)
      if (stored) setEmail(stored)
    } catch {
      /* ignore */
    }
  }, [])

  const submit = () => {
    if (!isValidEmail(email)) {
      setError('email')
      setTimeout(() => setError(null), 1500)
      posthog?.capture('insuretech_gate_failed', { reason: 'invalid_email' })
      return
    }
    if (code !== INSURETECH_ACCESS_CODE) {
      setError('code')
      setTimeout(() => setError(null), 1500)
      posthog?.capture('insuretech_gate_failed', { reason: 'wrong_code' })
      return
    }
    try {
      localStorage.setItem(INSURETECH_EMAIL_KEY, email)
      sessionStorage.setItem(INSURETECH_SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    posthog?.identify(email, { email, audit: 'insuretech-buyerview' })
    posthog?.capture('insuretech_accessed', { email })
    onAuth()
  }

  return (
    <div style={{ minHeight: '100vh', background: PARCHMENT, color: INK, fontFamily: FONT.body, display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px',
          fontFamily: FONT.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: MUTED, borderBottom: `1px solid ${RULE_INK}`, flexWrap: 'wrap', gap: 12,
        }}
      >
        <span style={{ color: INK }}>ERA</span>
        <span>The Buyer View</span>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                fontFamily: FONT.mega, fontSize: 'clamp(34px, 6vw, 54px)', fontWeight: 400, lineHeight: 0.95,
                letterSpacing: '-0.005em', textTransform: 'uppercase', color: INK,
              }}
            >
              The core platform<br />decision
            </div>
            <div aria-hidden style={{ height: 3, background: INK, marginTop: 14 }} />
            <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, fontWeight: 600, marginTop: 12 }}>
              The Buyer View · A Revenue Signal Instrument by ERA
            </div>
          </div>

          <p style={{ fontSize: 15, color: MUTED, maxWidth: 420, marginBottom: 40, lineHeight: 1.5 }}>
            How Guidewire, Sapiens, Majesco, and Duck Creek read on the surfaces a core-platform buyer sees before contact. Restricted preview.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); submit() }} noValidate>
            <BrutalistField label="Work email" type="email" autoComplete="email" value={email} onChange={setEmail} onEnter={submit} hasError={error === 'email'} />
            <BrutalistField label="Access code" type="password" autoComplete="current-password" value={code} onChange={setCode} onEnter={submit} hasError={error === 'code'} />
            <BrutalistSubmit label="Open the view" />
          </form>
        </div>
      </div>

      <footer
        style={{
          padding: '14px 32px', fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: MUTED, fontWeight: 600, borderTop: `1px solid ${RULE_INK}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}
      >
        <span>eracx.com</span>
        <span style={{ color: HOT }}>● Draft report · restricted preview</span>
      </footer>
    </div>
  )
}

function BrutalistField({
  label, type, autoComplete, value, onChange, onEnter, hasError,
}: {
  label: string; type: 'email' | 'password'; autoComplete: string; value: string;
  onChange: (v: string) => void; onEnter: () => void; hasError: boolean
}) {
  const borderColor = hasError ? HOT : 'rgba(10, 10, 10, 0.3)'
  return (
    <div style={{ marginBottom: 28 }}>
      <label style={{ display: 'block', fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: hasError ? HOT : MUTED, fontWeight: 600, marginBottom: 10, transition: 'color 120ms ease' }}>
        {label}
      </label>
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onEnter() } }}
        style={{
          width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${borderColor}`,
          color: INK, fontFamily: FONT.body, fontSize: 18, padding: '8px 0 12px', outline: 'none', borderRadius: 0,
          transition: 'border-bottom-color 120ms ease', boxSizing: 'border-box',
        }}
        onFocus={(e) => { if (!hasError) e.currentTarget.style.borderBottomColor = INK }}
        onBlur={(e) => { if (!hasError) e.currentTarget.style.borderBottomColor = 'rgba(10, 10, 10, 0.3)' }}
      />
    </div>
  )
}

function BrutalistSubmit({ label }: { label: string }) {
  const base: CSSProperties = {
    marginTop: 12, all: 'unset', cursor: 'pointer', fontFamily: FONT.mono, fontSize: 12, fontWeight: 700,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: INK, border: `2px solid ${INK}`, padding: '14px 24px',
    display: 'inline-block', transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
  }
  return (
    <button
      type="submit"
      style={base}
      onMouseEnter={(e) => { e.currentTarget.style.background = HOT; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = HOT }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = INK }}
    >
      → {label}
    </button>
  )
}
