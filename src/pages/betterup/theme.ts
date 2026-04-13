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
}

export const LIGHT: ThemePalette = {
  bg: '#F7F5F2',
  card: '#FFFFFF',
  cardAlt: '#FBF9F6',
  border: '#E8E4DE',
  borderSubtle: '#EFECE6',
  text: '#1A1A1A',
  textMuted: '#6B6760',
  textDim: '#9A958C',
  rust: '#C85A3A',
  rustSoft: 'rgba(200,90,58,0.08)',
  sky: '#4AADE8',
  skySoft: 'rgba(74,173,232,0.10)',
  magenta: '#E8175D',
  magentaSoft: 'rgba(232,23,93,0.08)',
  amber: '#D89438',
  red: '#C84438',
  green: '#3A9B6E',
}

export const DARK: ThemePalette = {
  bg: '#0F0F0E',
  card: '#151514',
  cardAlt: '#1B1B19',
  border: '#2A2825',
  borderSubtle: '#22201D',
  text: '#F6F5F2',
  textMuted: '#A8A39A',
  textDim: '#6E6A62',
  rust: '#D86A48',
  rustSoft: 'rgba(216,106,72,0.14)',
  sky: '#5BBAF0',
  skySoft: 'rgba(91,186,240,0.14)',
  magenta: '#F03579',
  magentaSoft: 'rgba(240,53,121,0.14)',
  amber: '#E0A24A',
  red: '#E25548',
  green: '#4FB283',
}

export const FONT = {
  display: "'Instrument Serif', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
}

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'

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
