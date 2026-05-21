import { useState, type ReactNode } from 'react'
import { Disclosure } from './Disclosure'

type Props = {
  /** Label inside the disclosure bar. Defaults to "Full analysis". */
  label?: string
  /** Flips the disclosure bar to white-on-dark when the surrounding section
   *  ground is dark. */
  ground?: 'light' | 'dark'
  children: ReactNode
}

// Wraps a section's existing detailed analysis behind a v4 disclosure.
// Collapsed by default. The reader expands to see the full evidence chain.
export function SectionAnalysisDisclosure({
  label = 'Full analysis',
  ground = 'light',
  children,
}: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Disclosure label={label} open={open} onToggle={() => setOpen((v) => !v)} ground={ground}>
      <div style={{ paddingTop: 16 }}>{children}</div>
    </Disclosure>
  )
}
