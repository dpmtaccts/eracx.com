// StagingLayout.tsx — shared wrapper for every named staging page at eracx.com.
// Anchors the Visual Inspector with a per-page stagingId so overrides never
// collide across pages. Dev-only inspector gated via import.meta.env.DEV inside
// VisualInspector itself.

import type { ReactNode } from 'react'
import VisualInspector from './v3/VisualInspector'

interface StagingLayoutProps {
  stagingId: string
  theme?: 'light' | 'dark'
  className?: string
  children: ReactNode
}

export default function StagingLayout({
  stagingId,
  theme = 'light',
  className = '',
  children,
}: StagingLayoutProps) {
  return (
    <div
      data-inspector-root={stagingId}
      data-theme={theme}
      className={className}
    >
      {children}
      <VisualInspector stagingId={stagingId} />
    </div>
  )
}
