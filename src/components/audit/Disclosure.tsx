import { type ReactNode } from 'react'
import { FONT, useTheme } from '../../pages/betterup/theme'

type Props = {
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
  /** Optional ground for the expanded panel ("dark" inverts mono color to white-50). */
  ground?: 'light' | 'dark'
}

// v4-native disclosure: thin mono uppercase bar with +/- indicator.
// Instant expand (no easing). Expanded content sits below a 1px hairline rule.
export function Disclosure({
  label,
  open,
  onToggle,
  children,
  ground = 'light',
}: Props) {
  const { palette } = useTheme()
  const labelColor = ground === 'dark' ? 'rgba(255,255,255,0.7)' : palette.text
  const ruleColor = ground === 'dark' ? palette.ruleDark : palette.rule
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '12px 0',
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: labelColor,
          borderTop: `1px solid ${ruleColor}`,
          borderBottom: open ? 'none' : `1px solid ${ruleColor}`,
        }}
      >
        <span>→ {label}</span>
        <span style={{ fontFamily: FONT.mono, fontSize: 14, lineHeight: 1 }}>
          {open ? '—' : '+'}
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: '16px 0',
            borderBottom: `1px solid ${ruleColor}`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
