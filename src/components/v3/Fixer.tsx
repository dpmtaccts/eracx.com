// Fixer.tsx — dev-only UI Fixer panel for the /v3 staging homepage.
// Lets Justin live-tune type size, spacing, container width, and accent
// colour on the parchment palette, plus flip light/dark. All knobs write
// CSS custom properties on the wrapping .v3-root element (NOT on
// document.documentElement — the source HTML did the latter because it
// was the whole document; here the tokens live scoped under .v3-root).
//
// Keyboard shortcut: Cmd+. / Ctrl+. toggles. Esc closes when open.
// Dev-only: the component returns null in production builds (Vite strips
// the body via import.meta.env.DEV at build time).

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'

const DEFAULTS = {
  base: 16,
  scale: 1,
  pad: 96,
  maxw: 1400,
  gut: 40,
  accent: '#35505F',
}

export default function Fixer() {
  if (!import.meta.env.DEV) return null

  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [base, setBase] = useState(DEFAULTS.base)
  const [scale, setScale] = useState(DEFAULTS.scale)
  const [pad, setPad] = useState(DEFAULTS.pad)
  const [maxw, setMaxw] = useState(DEFAULTS.maxw)
  const [gut, setGut] = useState(DEFAULTS.gut)
  const [accent, setAccent] = useState(DEFAULTS.accent)

  const chipRef = useRef<HTMLButtonElement>(null)

  // Resolve the scoped .v3-root element (the one that owns the tokens).
  const getRoot = useCallback((): HTMLElement | null => {
    return document.querySelector<HTMLElement>('.v3-root')
  }, [])

  // Apply all knobs to the .v3-root element's inline style on every change.
  useEffect(() => {
    const root = getRoot()
    if (!root) return
    root.style.setProperty('--base-font-size', `${base}px`)
    root.style.setProperty('--type-scale', `${scale}`)
    root.style.setProperty('--section-padding', `${pad}px`)
    root.style.setProperty('--container-max', `${maxw}px`)
    root.style.setProperty('--container-pad', `${gut}px`)
    root.style.setProperty('--accent', accent)
    root.style.setProperty('--deep-steel', accent)
    root.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [base, scale, pad, maxw, gut, accent, dark, getRoot])

  // Keyboard: Cmd/Ctrl+. to toggle, Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const reset = () => {
    setBase(DEFAULTS.base)
    setScale(DEFAULTS.scale)
    setPad(DEFAULTS.pad)
    setMaxw(DEFAULTS.maxw)
    setGut(DEFAULTS.gut)
    setAccent(DEFAULTS.accent)
    setDark(false)
    const root = getRoot()
    if (!root) return
    for (const prop of [
      '--base-font-size',
      '--type-scale',
      '--section-padding',
      '--container-max',
      '--container-pad',
      '--accent',
      '--deep-steel',
    ]) {
      root.style.removeProperty(prop)
    }
    root.setAttribute('data-theme', 'light')
  }

  const onNum =
    (setter: (v: number) => void) => (e: ChangeEvent<HTMLInputElement>) =>
      setter(parseFloat(e.target.value))

  return (
    <>
      <button
        ref={chipRef}
        className="fixer-chip"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open UI fixer"
      >
        UI Fixer <span className="kbd">⌘ .</span>
      </button>

      <aside
        className={`fixer${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div className="fixer-head">
          <h3 className="fixer-title">UI Fixer</h3>
          <button
            className="fixer-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="fixer-body">
          <div className="fixer-group">
            <h5>Theme</h5>
            <div className="fixer-toggle-row">
              <label htmlFor="v3-theme-toggle">Dark mode</label>
              <label className="switch">
                <input
                  id="v3-theme-toggle"
                  type="checkbox"
                  checked={dark}
                  onChange={(e) => setDark(e.target.checked)}
                />
                <span className="slider-sw" />
              </label>
            </div>
          </div>

          <div className="fixer-group">
            <h5>Type</h5>
            <div className="fixer-row">
              <label>Base font size</label>
              <span className="val">{base}px</span>
              <input
                type="range"
                min={13}
                max={20}
                step={1}
                value={base}
                onChange={onNum(setBase)}
              />
            </div>
            <div className="fixer-row">
              <label>Type scale (all sizes)</label>
              <span className="val">{scale.toFixed(2)}×</span>
              <input
                type="range"
                min={0.85}
                max={1.25}
                step={0.05}
                value={scale}
                onChange={onNum(setScale)}
              />
            </div>
          </div>

          <div className="fixer-group">
            <h5>Layout</h5>
            <div className="fixer-row">
              <label>Section padding</label>
              <span className="val">{pad}px</span>
              <input
                type="range"
                min={48}
                max={160}
                step={8}
                value={pad}
                onChange={onNum(setPad)}
              />
            </div>
            <div className="fixer-row">
              <label>Container max width</label>
              <span className="val">{maxw}px</span>
              <input
                type="range"
                min={1100}
                max={1600}
                step={20}
                value={maxw}
                onChange={onNum(setMaxw)}
              />
            </div>
            <div className="fixer-row">
              <label>Side gutter</label>
              <span className="val">{gut}px</span>
              <input
                type="range"
                min={20}
                max={80}
                step={4}
                value={gut}
                onChange={onNum(setGut)}
              />
            </div>
          </div>

          <div className="fixer-group">
            <h5>Accent color swap</h5>
            <div className="fixer-row">
              <label>Primary accent</label>
              <span className="val">{accent}</span>
            </div>
            <div
              className="fixer-row"
              style={{ gridTemplateColumns: '1fr' }}
            >
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                style={{
                  width: '100%',
                  height: 40,
                  border: '1px solid var(--rule)',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          <button className="fixer-reset" onClick={reset}>
            Reset all
          </button>

          <div className="fixer-note">
            <strong>Note:</strong> The UI Fixer adjusts type size, spacing,
            and colors live in this page. Structural changes (layout, copy,
            chart data) still need a prompt.
          </div>
        </div>
      </aside>
    </>
  )
}
