import { FONT, useTheme } from '../../pages/betterup/theme'

type Meta = string | { label: string; value?: string }

type Props = {
  /** e.g. "§02" */
  number: string
  /** Section name. Uppercased automatically. */
  name: string
  /** Right-side metadata pills. Strings render as-is; objects render "LABEL VALUE". */
  meta?: Meta[]
  /** When the section ground is dark, mute color flips to white-50. */
  ground?: 'light' | 'dark'
}

// The most identifying v4 pattern. Mono uppercase band with 1px hairline below.
export function IssueBar({ number, name, meta = [], ground = 'light' }: Props) {
  const { palette } = useTheme()
  const mutedColor =
    ground === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 10, 10, 0.5)'
  const ruleColor = ground === 'dark' ? palette.ruleDark : palette.rule
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        fontFamily: FONT.mono,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: mutedColor,
        borderBottom: `1px solid ${ruleColor}`,
        marginBottom: 40,
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div>
        {number} · {name}
      </div>
      {meta.length > 0 && (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {meta.map((m, i) => {
            const text =
              typeof m === 'string'
                ? m
                : m.value
                  ? `${m.label} ${m.value}`
                  : m.label
            return <span key={i}>{text}</span>
          })}
        </div>
      )}
    </header>
  )
}
