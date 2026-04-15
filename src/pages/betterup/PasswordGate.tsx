import { useEffect, useState } from 'react'
import { usePostHog } from '@posthog/react'
import { FONT } from './theme'
import { getStoredEmail, setStoredEmail, track, type AuditPage } from './analytics'

const SESSION_KEY = 'betterup-audit-auth'
const PASSWORD = 'transformation'

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1' && !!getStoredEmail()
  } catch {
    return false
  }
}

export function PasswordGate({ onAuth, page }: { onAuth: () => void; page: AuditPage }) {
  const posthog = usePostHog()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<'email' | 'password' | null>(null)

  // Pre-fill from storage if user has been here before
  useEffect(() => {
    const stored = getStoredEmail()
    if (stored) setEmail(stored)
  }, [])

  const submit = () => {
    if (!isValidEmail(email)) {
      setError('email')
      setTimeout(() => setError(null), 1500)
      posthog?.capture('audit_password_failed', { reason: 'invalid_email', audit_page: page })
      return
    }
    if (password !== PASSWORD) {
      setError('password')
      setTimeout(() => setError(null), 1500)
      posthog?.capture('audit_password_failed', { reason: 'wrong_password', audit_page: page })
      return
    }
    setStoredEmail(email)
    sessionStorage.setItem(SESSION_KEY, '1')
    void track('session_start', null, page)
    posthog?.identify(email, { email, audit_page: page })
    posthog?.capture('audit_accessed', { email, audit_page: page })
    onAuth()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F7F5F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 380, width: '100%', textAlign: 'center', fontFamily: FONT.body }}>
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6B6760',
            marginBottom: 18,
          }}
        >
          Revenue Signal Audit built for
        </div>
        <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'center' }}>
          <img
            src="/images/betterup/bu_logo_black.svg"
            alt="BetterUp"
            style={{ height: 36, width: 'auto', display: 'block' }}
          />
        </div>

        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Your work email"
          style={{
            width: '100%',
            padding: '14px 18px',
            background: '#FFFFFF',
            border: `1px solid ${error === 'email' ? '#C84438' : '#E8E4DE'}`,
            borderRadius: 4,
            fontFamily: FONT.body,
            fontSize: 15,
            color: '#1A1A1A',
            outline: 'none',
            marginBottom: 10,
            transition: 'border-color 0.3s',
            boxSizing: 'border-box',
          }}
        />

        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Password"
          style={{
            width: '100%',
            padding: '14px 18px',
            background: '#FFFFFF',
            border: `1px solid ${error === 'password' ? '#C84438' : '#E8E4DE'}`,
            borderRadius: 4,
            fontFamily: FONT.body,
            fontSize: 15,
            color: '#1A1A1A',
            outline: 'none',
            marginBottom: 12,
            transition: 'border-color 0.3s',
            boxSizing: 'border-box',
          }}
        />

        <button
          onClick={submit}
          style={{
            width: '100%',
            padding: '14px',
            background: '#C85A3A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 4,
            fontFamily: FONT.body,
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Enter
        </button>
      </div>
    </div>
  )
}
