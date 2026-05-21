import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ScoreDrawerContextValue = {
  open: boolean
  setOpen: (next: boolean) => void
  toggle: () => void
}

const ScoreDrawerContext = createContext<ScoreDrawerContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
})

const SCORE_HASH = '#score'

/**
 * Owns the drawer's open state. Syncs to URL hash so `/audit/betterup#score`
 * deep-links to the drawer-open state, and removes the hash on close.
 * Provides an Escape-key close handler.
 */
export function ScoreDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.location.hash === SCORE_HASH
  })

  const setOpen = useCallback((next: boolean) => {
    setOpenState(next)
    if (typeof window === 'undefined') return
    const isHashScore = window.location.hash === SCORE_HASH
    if (next && !isHashScore) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${SCORE_HASH}`)
    } else if (!next && isHashScore) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
  }, [])

  // Listen for hash changes (browser back/forward, manual edits)
  useEffect(() => {
    const onHashChange = () => {
      setOpenState(window.location.hash === SCORE_HASH)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Escape closes the drawer when open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  // Prevent background scroll while the drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (open) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [open])

  const value = useMemo<ScoreDrawerContextValue>(
    () => ({ open, setOpen, toggle: () => setOpen(!open) }),
    [open, setOpen]
  )

  return <ScoreDrawerContext.Provider value={value}>{children}</ScoreDrawerContext.Provider>
}

export function useScoreDrawer(): ScoreDrawerContextValue {
  return useContext(ScoreDrawerContext)
}
