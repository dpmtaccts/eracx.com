// V4Header.tsx — Bloomberg-style issue bar that sits above every v4 section.
// Renders a horizontal band: phase label on the left, meta strings on the
// right, all in JetBrains Mono uppercase 0.14em letter-spaced. Color
// inherits from the parent section, so the same component works on white,
// magenta, yellow, cobalt, and ink grounds.

interface V4HeaderProps {
  phase: string
  meta: string[]
}

export function V4Header({ phase, meta }: V4HeaderProps) {
  const phaseParts = phase.split('·').map((p) => p.trim()).filter(Boolean)

  return (
    <div className="v4-issue-bar">
      <div className="v4-issue-bar__group">
        {phaseParts.map((part) => (
          <span key={part}>{part}</span>
        ))}
      </div>
      <div className="v4-issue-bar__group">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}
