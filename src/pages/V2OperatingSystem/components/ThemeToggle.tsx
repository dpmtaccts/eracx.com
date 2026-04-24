import type { Dispatch, SetStateAction } from 'react'

type Props = {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}

// v8 delta item 28: visible Light / Dark pill chip in the nav,
// glassmorphic surface, not a hidden icon button.
export default function ThemeToggle({ theme, setTheme }: Props) {
  return (
    <div
      className="theme-chip"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        className={`theme-chip-option${theme === 'light' ? ' active' : ''}`}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
      >
        Light
      </button>
      <button
        type="button"
        className={`theme-chip-option${theme === 'dark' ? ' active' : ''}`}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
      >
        Dark
      </button>
    </div>
  )
}
