// V4Header.tsx — Bloomberg-style issue bar that sits above every v4 section.
// Renders a horizontal band: phase label on the left, meta strings on the
// right with a small ERA wordmark appended at the end. Color inherits from
// the parent section, so the same component works on white, magenta, yellow,
// cobalt, parchment, and ink grounds.
//
// The wordmark appears in every section's running head — a magazine-masthead
// move that gives the page brand presence outside the symbol-only V4Nav and
// the full lockup in V4Footer.

import { V4Wordmark } from './V4Wordmark'

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
        <V4Wordmark className="v4-issue-bar__wordmark" />
      </div>
    </div>
  )
}
