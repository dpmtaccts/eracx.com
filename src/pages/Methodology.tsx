import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MethodologyContent } from '../components/MethodologyContent'
import { FONT, loadBetterUpFonts } from './betterup/theme'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const LINE = 'rgba(10, 10, 10, 0.15)'

export default function Methodology() {
  useEffect(() => {
    loadBetterUpFonts()
    const previous = document.title
    document.title = 'The Buyer View · Methodology'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div style={{ background: PAPER, color: INK, minHeight: '100vh' }}>
      {/* Lightweight chrome — keeps the page navigable when hit directly
          or shared. The drawer wraps its own close affordance. */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: PAPER,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 36px',
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: INK,
              textDecoration: 'none',
            }}
          >
            ERA · The Buyer View
          </Link>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: MUTED,
            }}
          >
            Methodology
          </span>
        </div>
      </header>

      <MethodologyContent titleId="methodology-page-title" />
    </div>
  )
}
