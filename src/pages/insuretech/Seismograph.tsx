import { useMemo } from 'react'

/* Adapted seismograph for the industry view. The x-axis is the six evaluation
   channels rather than attention surfaces. The parchment silhouette is the
   shape of congruence. Bars are held as a faint illustrative field because the
   magnitudes come from scoring, which is TO BUILD. Deterministic, no runtime
   randomness, so it renders identically on every load. */

const CHANNELS = [
  { id: 'promise', label: 'Promise', center: 250, color: '#F4C430' },
  { id: 'exec', label: 'Exec voice', center: 520, color: '#1845C2' },
  { id: 'agents', label: 'AI agents', center: 800, color: '#E6195F' },
  { id: 'proof', label: 'Proof', center: 1000, color: '#DD5C20' },
  { id: 'sources', label: 'Sources', center: 1250, color: '#0A0A0A' },
  { id: 'verdict', label: 'Verdict', center: 1460, color: '#E6195F' },
]

const ZERO = 440
const MAXH = 240
const MU = 800
const SIGMA = 300
const PEAK = 260

function bellY(x: number) {
  const n = Math.exp(-((x - MU) ** 2) / (2 * SIGMA ** 2))
  return ZERO - n * PEAK
}

// Deterministic pseudo-random from an integer seed, so bars are stable.
function seeded(i: number) {
  const t = Math.sin(i * 12.9898) * 43758.5453
  return t - Math.floor(t)
}

export function Seismograph() {
  const { curve, bars } = useMemo(() => {
    let d = `M 100 ${ZERO} `
    for (let x = 100; x <= 1500; x += 4) d += `L ${x} ${bellY(x)} `
    d += `L 1500 ${ZERO} Z`

    const SPREAD = 70
    const BW = 5
    const rects: { x: number; y: number; h: number; color: string }[] = []
    let k = 1
    for (const ch of CHANNELS) {
      for (let i = 0; i < 14; i++) {
        const x = ch.center + (seeded(k++) * 2 - 1) * SPREAD
        const h = 20 + seeded(k++) * (MAXH * 0.5)
        rects.push({ x: x - BW / 2, y: ZERO - h, h, color: ch.color })
      }
    }
    return { curve: d, bars: rects }
  }, [])

  return (
    <div style={{ width: '100%', margin: '2vw 0 0', position: 'relative' }}>
      <svg viewBox="0 0 1600 720" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <path d={curve} fill="#E8E3D6" opacity="0.7" />
        <line x1="100" y1={ZERO} x2="1500" y2={ZERO} stroke="#0A0A0A" strokeWidth="2" />
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width="5" height={b.h} fill={b.color} opacity="0.18" />
        ))}
        <text x="800" y="150" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="1.4" fontWeight="600" fill="#A39884">
          ↑ THE SHAPE OF CONGRUENCE
        </text>
        <line x1="100" y1="600" x2="1500" y2="600" stroke="#0A0A0A" strokeWidth="1" />
        {CHANNELS.map((ch) => {
          const core = ['exec', 'agents', 'proof'].includes(ch.id)
          return (
            <text key={ch.id} x={ch.center} y="632" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="1.2" fill="#0A0A0A" fontWeight="600" opacity={core ? 1 : 0.55}>
              {ch.label.toUpperCase()}
            </text>
          )
        })}
        <text x="100" y="675" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.4" fill="#6B6760" fontWeight="500">←  AMBIENT</text>
        <text x="800" y="675" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.4" fill="#E6195F" fontWeight="600">MOST DIRECT · MOST CREDIBLE</text>
        <text x="1500" y="675" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.4" fill="#6B6760" fontWeight="500">AMBIENT  →</text>
      </svg>
      <div style={{ position: 'absolute', top: '34%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(16px,2vw,26px)', color: '#E6195F' }}>Bars set after scoring</div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.55)', marginTop: 6 }}>
          Illustrative silhouette · magnitudes are TO BUILD
        </div>
      </div>
    </div>
  )
}
