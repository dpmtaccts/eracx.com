import { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

export interface ThemePalette {
  bg: string
  card: string
  cardAlt: string
  border: string
  borderSubtle: string
  text: string
  textMuted: string
  textDim: string
  rust: string
  rustSoft: string
  sky: string
  skySoft: string
  magenta: string
  magentaSoft: string
  amber: string
  red: string
  green: string
  /** v4 ink (#0A0A0A near-black) — explicit ground for ink-on-white sections. */
  ink: string
  /** v4 parchment (#F4F1EA) — warm off-white ground. */
  parchment: string
  /** v4 yellow (#F4C430) — newsroom yellow. */
  yellow: string
  /** v4 cobalt (#1845C2) — deep blue ground. */
  cobalt: string
  /** v4 hot magenta (#E6195F) — italic accent, CTA hover. */
  hot: string
  /** Rule colors mapped from v4 (1px, semi-transparent). */
  rule: string
  ruleDark: string
}

// v4-aligned palette. The legacy `red`/`green`/`amber`/`sky` slots are kept
// for the semantic spots that referenced them across the audit, but every
// value now points at a v4 token so a single sweep snaps the audit's color
// language to the marketing site.
export const LIGHT: ThemePalette = {
  bg: '#FFFFFF',
  card: '#FFFFFF',
  cardAlt: '#F4F1EA',
  border: 'rgba(10, 10, 10, 0.15)',
  borderSubtle: 'rgba(10, 10, 10, 0.08)',
  text: '#0A0A0A',
  textMuted: 'rgba(10, 10, 10, 0.7)',
  textDim: 'rgba(10, 10, 10, 0.5)',
  rust: '#DD5C20',
  rustSoft: 'rgba(221, 92, 32, 0.08)',
  sky: '#1845C2',
  skySoft: 'rgba(24, 69, 194, 0.08)',
  magenta: '#E6195F',
  magentaSoft: 'rgba(230, 25, 95, 0.08)',
  amber: '#F4C430',
  red: '#E6195F',
  green: '#0A0A0A',
  ink: '#0A0A0A',
  parchment: '#F4F1EA',
  yellow: '#F4C430',
  cobalt: '#1845C2',
  hot: '#E6195F',
  rule: 'rgba(10, 10, 10, 0.15)',
  ruleDark: 'rgba(255, 255, 255, 0.15)',
}

// Dark mode maps the v4 ink ground; muted text uses the v4 white-at-50% rule.
export const DARK: ThemePalette = {
  bg: '#0A0A0A',
  card: '#0A0A0A',
  cardAlt: '#1A1A1A',
  border: 'rgba(255, 255, 255, 0.15)',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  text: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  textDim: 'rgba(255, 255, 255, 0.5)',
  rust: '#DD5C20',
  rustSoft: 'rgba(221, 92, 32, 0.18)',
  sky: '#1845C2',
  skySoft: 'rgba(24, 69, 194, 0.22)',
  magenta: '#E6195F',
  magentaSoft: 'rgba(230, 25, 95, 0.18)',
  amber: '#F4C430',
  red: '#E6195F',
  green: '#FFFFFF',
  ink: '#0A0A0A',
  parchment: '#F4F1EA',
  yellow: '#F4C430',
  cobalt: '#1845C2',
  hot: '#E6195F',
  rule: 'rgba(255, 255, 255, 0.15)',
  ruleDark: 'rgba(10, 10, 10, 0.15)',
}

// v4 typography stack. `mega` is Anton (display only). `display` is Archivo
// Black for mid-scale hierarchy. `body` is IBM Plex Sans. `mono` is JetBrains
// Mono with the critical 0.14em tracking applied at usage sites.
export const FONT = {
  mega: "'Anton', 'Helvetica Neue Condensed', sans-serif",
  display: "'Archivo Black', 'Helvetica Neue', sans-serif",
  body: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
}

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap'

let fontsLoaded = false
export function loadBetterUpFonts() {
  if (fontsLoaded || typeof document === 'undefined') return
  fontsLoaded = true
  if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_URL
    document.head.appendChild(link)
  }
}

const STORAGE_KEY = 'betterup-audit-theme'

export interface ThemeContextValue {
  mode: ThemeMode
  palette: ThemePalette
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  palette: LIGHT,
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeState(): ThemeContextValue {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (stored === 'light' || stored === 'dark') setMode(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  return {
    mode,
    palette: mode === 'light' ? LIGHT : DARK,
    toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
  }
}

export function gradeFromScore(score: number): { letter: string; color: keyof ThemePalette } {
  if (score >= 80) return { letter: 'A', color: 'green' }
  if (score >= 65) return { letter: 'B', color: 'sky' }
  if (score >= 50) return { letter: 'C', color: 'amber' }
  if (score >= 30) return { letter: 'D', color: 'rust' }
  return { letter: 'F', color: 'red' }
}

export function colorForScore(p: ThemePalette, score: number): string {
  if (score >= 65) return p.green
  if (score >= 50) return p.amber
  if (score >= 30) return p.rust
  return p.red
}
