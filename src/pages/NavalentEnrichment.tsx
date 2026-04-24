import { useEffect, useRef, useState } from 'react'

const PASSWORD = 'transformation'
const SESSION_KEY = 'navalent-enrichment-auth'
const CONTENT_URL = '/audit/navalent-enrichment.html'

function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function Gate({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submit = () => {
    if (value.trim().toLowerCase() === PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* no-op */
      }
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0E0E10',
        color: '#F1ECE2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: 380, width: '100%', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#B3ADA4',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              background: '#C85A3A',
              transform: 'rotate(45deg)',
            }}
          />
          ERA · Navalent
        </div>
        <div
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 32,
            lineHeight: 1.1,
            marginBottom: 28,
            letterSpacing: '-0.02em',
          }}
        >
          Enrichment opportunity.
        </div>

        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Password"
          style={{
            width: '100%',
            padding: '14px 18px',
            background: '#17171A',
            border: `1px solid ${error ? '#C84438' : '#2A2A30'}`,
            color: '#F1ECE2',
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 15,
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
            color: '#0E0E10',
            border: 'none',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
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

export default function NavalentEnrichment() {
  const [authed, setAuthed] = useState(() => isAuthed())

  if (!authed) return <Gate onAuth={() => setAuthed(true)} />

  return (
    <iframe
      src={CONTENT_URL}
      title="Navalent Enrichment Opportunity"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        background: '#0E0E10',
      }}
    />
  )
}
