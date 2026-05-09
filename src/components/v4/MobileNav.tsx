// MobileNav.tsx — mobile-only nav for the /v4 route. Replaces the
// horizontal V4Nav at <768px viewports. Closed state: era logo on the
// left, mono-uppercase MENU label on the right (no hamburger). Open
// state: full-screen parchment overlay with five large stacked nav
// items, the last one (Get started) gets a magenta CTA treatment.
//
// CSS in v4-components.css toggles which nav (V4Nav vs MobileNav) is
// rendered via display:none on the desktop nav at <=768px, so only one
// is visible per viewport. Both stay in the DOM for a11y.
//
// Keyboard: Escape closes the overlay. Body scroll locks while open.

import { useEffect, useState } from 'react'

interface NavItem {
  label: string
  href: string
  desc: string
  cta?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Warmth.',       href: '/#warmth',   desc: '▸ THE PRACTICE' },
  { label: 'Evidence.',     href: '/#evidence', desc: '▸ CUSTOMER PROOF' },
  { label: 'How it works.', href: '/#how',      desc: '▸ THE LOOP IN NINE STAGES' },
  { label: 'Lab.',          href: '/#lab',      desc: '▸ FREE TOOLS' },
  { label: 'Get started.',  href: '/#contact',  desc: '▸ TALK TO US', cta: true },
]

function EraSymbol() {
  return (
    <svg
      className="v4-mobile-nav__logo-mark"
      viewBox="0 0 4386 4387"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M3176.89 0C3844.43 0.000221299 4385.58 541.15 4385.58 1208.69V4387H1208.69C541.151 4387 0 3845.85 0 3178.31V0H3176.89ZM2244.51 2387.12C2244.51 2768.52 2553.7 3077.7 2935.1 3077.7H3657.25V2071.64H2244.51V2387.12ZM725.491 725.499V1069.83C725.491 1432.17 1019.22 1725.89 1381.55 1725.89H3657.24V1416.09C3657.24 1034.69 3348.06 725.499 2966.65 725.499H725.491Z"
      />
    </svg>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)

  // Body scroll lock while overlay is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Escape key closes.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <nav className="v4-mobile-nav" aria-label="Mobile navigation">
        <a href="/" className="v4-mobile-nav__logo" aria-label="ERA">
          <EraSymbol />
        </a>
        <button
          type="button"
          className="v4-mobile-nav__trigger"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-nav-overlay"
        >
          MENU
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav-overlay"
          className="v4-mobile-nav__overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="v4-mobile-nav__overlay-inner">
            <div className="v4-mobile-nav__overlay-top">
              <a
                href="/"
                className="v4-mobile-nav__logo"
                aria-label="ERA"
                onClick={() => setOpen(false)}
              >
                <EraSymbol />
              </a>
              <button
                type="button"
                className="v4-mobile-nav__trigger"
                onClick={() => setOpen(false)}
                autoFocus
              >
                CLOSE
              </button>
            </div>

            <ul className="v4-mobile-nav__list">
              {NAV_ITEMS.map(({ label, href, desc, cta }) => (
                <li
                  key={href}
                  className={
                    cta
                      ? 'v4-mobile-nav__item v4-mobile-nav__item--cta'
                      : 'v4-mobile-nav__item'
                  }
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="v4-mobile-nav__item-link"
                  >
                    <span className="v4-mobile-nav__item-title">{label}</span>
                    <span className="v4-mobile-nav__item-desc">{desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
