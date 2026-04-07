import { useState, useEffect, useRef, type ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   TOKENS
   ═══════════════════════════════════════════════════════════════ */

const C = {
  bgDark: '#1A1A1A',
  bgLight: '#F6F5F2',
  textLight: '#F6F5F2',
  textDark: '#383838',
  secondary: '#888',
  teal: '#1FA7A2',
  oxide: '#B85C4A',
  sand: '#D6B26D',
  magenta: '#D43D8D',
  white: '#FFFFFF',
} as const

const FONT = {
  display: "'Inter Tight', 'Inter', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
}

const PASSWORD = 'dontswe@tthejourney'
const SESSION_KEY = 'navalent-summary-auth'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&family=Inter:wght@300;400;500&display=swap'

function loadFonts() {
  if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_URL
    document.head.appendChild(link)
  }
}

/* ═══════════════════════════════════════════════════════════════
   CSS (injected once)
   ═══════════════════════════════════════════════════════════════ */

const STYLES = `
  .ns-page { scroll-behavior: smooth; }
  .ns-page * { box-sizing: border-box; margin: 0; padding: 0; }

  /* fade-up */
  .ns-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .ns-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* slide-left */
  .ns-slide-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .ns-slide-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* shake */
  @keyframes ns-shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
  .ns-shake { animation: ns-shake 0.4s ease; }

  /* donut stroke animation */
  @keyframes ns-donut-fill {
    from { stroke-dashoffset: var(--ns-circumference); }
    to { stroke-dashoffset: var(--ns-target); }
  }
  .ns-donut-arc {
    stroke-dashoffset: var(--ns-circumference);
    transition: stroke-dashoffset 1.5s ease-out;
  }
  .ns-donut-arc.visible {
    stroke-dashoffset: var(--ns-target);
  }

  /* bar grow */
  .ns-bar-fill {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1.2s ease-out;
  }
  .ns-bar-fill.visible {
    transform: scaleX(1);
  }

  /* parallax hero bg */
  .ns-hero-bg {
    transition: transform 0.1s linear;
  }

  /* responsive grid helpers */
  .ns-two-col {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: center;
  }
  @media (min-width: 768px) {
    .ns-two-col { grid-template-columns: 1fr 1fr; gap: 64px; }
  }

  /* stat bar */
  .ns-stat-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  @media (min-width: 768px) {
    .ns-stat-bar { grid-template-columns: repeat(4, 1fr); gap: 48px; }
  }

  /* password input */
  .ns-pw-input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px;
    color: ${C.textLight};
    font-family: ${FONT.body};
    font-size: 15px;
    font-weight: 300;
    outline: none;
    transition: border-color 0.2s;
  }
  .ns-pw-input:focus {
    border-color: ${C.oxide};
  }
  .ns-pw-input::placeholder {
    color: rgba(255,255,255,0.25);
  }

  .ns-pw-btn {
    width: 100%;
    padding: 14px;
    background: ${C.oxide};
    color: ${C.white};
    border: none;
    border-radius: 6px;
    font-family: ${FONT.body};
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 12px;
  }
  .ns-pw-btn:hover {
    background: #a04e3e;
  }

  /* dot grid pattern */
  .ns-dot-grid {
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  /* finding cards */
  .ns-finding-card {
    background: ${C.white};
    border-radius: 8px;
    padding: 24px 28px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
    border-left: 4px solid;
    font-family: ${FONT.body};
  }

  /* action items */
  .ns-action-item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    align-items: start;
  }
  .ns-action-num {
    font-family: ${FONT.display};
    font-weight: 900;
    font-size: 32px;
    line-height: 1;
    opacity: 0.15;
  }

  /* pull quote */
  .ns-pull-quote {
    border-left: 3px solid ${C.oxide};
    padding: 24px 0 24px 28px;
    font-family: ${FONT.body};
    font-size: clamp(18px, 2.2vw, 22px);
    font-weight: 400;
    font-style: italic;
    color: ${C.oxide};
    line-height: 1.5;
    margin: 48px 0;
  }

  /* ring chart segments */
  .ns-ring-segment {
    stroke-dashoffset: var(--ns-circumference);
    transition: stroke-dashoffset 1.5s ease-out;
  }
  .ns-ring-segment.visible {
    stroke-dashoffset: var(--ns-target);
  }
`

let stylesInjected = false
function injectStyles() {
  if (stylesInjected) return
  stylesInjected = true
  const style = document.createElement('style')
  style.textContent = STYLES
  document.head.appendChild(style)
}

/* ═══════════════════════════════════════════════════════════════
   HOOKS & UTILITIES
   ═══════════════════════════════════════════════════════════════ */

function useCountUp(end: number, duration = 1500, decimals = 0) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(parseFloat((eased * end).toFixed(decimals)))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, decimals])

  return { ref, value }
}

/* ═══════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

function Reveal({ children, className = '', delay = 0, slide = false }: { children: ReactNode; className?: string; delay?: number; slide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}ms`
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`${slide ? 'ns-slide-left' : 'ns-reveal'} ${className}`}>
      {children}
    </div>
  )
}

function Section({ dark, children, style, id }: { dark?: boolean; children: ReactNode; style?: React.CSSProperties; id?: string }) {
  return (
    <section
      id={id}
      style={{
        background: dark ? C.bgDark : C.bgLight,
        color: dark ? C.textLight : C.textDark,
        padding: 'clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        ...style,
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

function Kicker({ children, color = C.oxide }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: FONT.body,
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      color,
      marginBottom: 16,
    }}>
      {children}
    </div>
  )
}

function Headline({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{
      fontFamily: FONT.display,
      fontWeight: 900,
      fontSize: 'clamp(32px, 5vw, 56px)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      marginBottom: 24,
      ...style,
    }}>
      {children}
    </h2>
  )
}

function Body({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: FONT.body,
      fontWeight: 300,
      fontSize: 'clamp(16px, 1.8vw, 18px)',
      lineHeight: 1.7,
      ...style,
    }}>
      {children}
    </p>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SVG CHARTS
   ═══════════════════════════════════════════════════════════════ */

function DonutChart({ value1, value2, label1, label2, color1, color2 }: {
  value1: number; value2: number; label1: string; label2: string; color1: string; color2: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)
  const r = 80
  const circumference = 2 * Math.PI * r

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const offset1 = circumference - (value1 / 100) * circumference

  return (
    <div style={{ textAlign: 'center' }}>
      <svg ref={ref} viewBox="0 0 200 200" style={{ width: '100%', maxWidth: 280 }}>
        {/* bg ring */}
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="20" />
        {/* value1 arc */}
        <circle
          cx="100" cy="100" r={r} fill="none"
          stroke={color1} strokeWidth="20" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={visible ? offset1 : circumference}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        {/* value2 inner arc */}
        <circle
          cx="100" cy="100" r={58} fill="none"
          stroke={color2} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 58}
          strokeDashoffset={visible ? (2 * Math.PI * 58) - (value2 / 100) * (2 * Math.PI * 58) : 2 * Math.PI * 58}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out 0.3s', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 16, fontFamily: FONT.body, fontSize: 13, fontWeight: 400 }}>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: color1, marginRight: 6 }} />{label1}</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: color2, marginRight: 6 }} />{label2}</span>
      </div>
    </div>
  )
}

function HorizontalBars({ bars }: { bars: { label: string; value: number; display: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {bars.map((bar, i) => (
        <div key={bar.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.body, fontSize: 14, fontWeight: 400, marginBottom: 6, color: C.textDark }}>
            <span>{bar.label}</span>
            <span style={{ fontWeight: 500 }}>{bar.display}</span>
          </div>
          <div style={{ height: 8, background: '#E5E5E2', borderRadius: 4, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: C.textDark,
                borderRadius: 4,
                width: `${bar.value}%`,
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: `transform 1.2s ease-out ${i * 0.15}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function DecayRing() {
  const ref = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)
  const r = 80
  const circ = 2 * Math.PI * r

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 31.5% different company, 23.7% new role (overlap possible, show as separate arcs)
  const seg1 = 0.315
  const seg2 = 0.237

  return (
    <div style={{ textAlign: 'center' }}>
      <svg ref={ref} viewBox="0 0 200 200" style={{ width: '100%', maxWidth: 260 }}>
        {/* unchanged */}
        <circle
          cx="100" cy="100" r={r} fill="none"
          stroke="rgba(0,0,0,0.08)" strokeWidth="24"
          strokeDasharray={circ}
          strokeDashoffset={0}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        {/* different company */}
        <circle
          cx="100" cy="100" r={r} fill="none"
          stroke={C.magenta} strokeWidth="24"
          strokeDasharray={`${seg1 * circ} ${circ - seg1 * circ}`}
          strokeDashoffset={visible ? 0 : seg1 * circ}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        {/* new role */}
        <circle
          cx="100" cy="100" r={r} fill="none"
          stroke="#E878B4" strokeWidth="24"
          strokeDasharray={`${seg2 * circ} ${circ - seg2 * circ}`}
          strokeDashoffset={visible ? -seg1 * circ : seg2 * circ - seg1 * circ}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out 0.3s', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        {/* center text */}
        <text x="100" y="92" textAnchor="middle" style={{ fontFamily: FONT.display, fontWeight: 900, fontSize: 28, fill: C.textDark }}>55.2%</text>
        <text x="100" y="114" textAnchor="middle" style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 11, fill: C.secondary }}>contacts changed</text>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12, fontFamily: FONT.body, fontSize: 12, fontWeight: 400, color: C.textDark }}>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: C.magenta, marginRight: 6 }} />Different company (31.5%)</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#E878B4', marginRight: 6 }} />New role (23.7%)</span>
      </div>
    </div>
  )
}

function DisparityViz() {
  const ref = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <svg ref={ref} viewBox="0 0 240 240" style={{ width: '100%', maxWidth: 280 }}>
        {/* large circle: impressions */}
        <circle
          cx="120" cy="120" r={visible ? 100 : 0}
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"
          style={{ transition: 'r 1s ease-out' }}
        />
        <text x="120" y="110" textAnchor="middle" style={{ fontFamily: FONT.display, fontWeight: 900, fontSize: 18, fill: C.textLight, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.8s' }}>101,399</text>
        <text x="120" y="128" textAnchor="middle" style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 10, fill: C.secondary, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.8s' }}>impressions</text>

        {/* tiny dot: 1 known commenter */}
        <circle
          cx="120" cy="170" r={visible ? 4 : 0}
          fill={C.oxide}
          style={{ transition: 'r 0.4s ease-out 1.2s' }}
        />
        <text x="120" y="190" textAnchor="middle" style={{ fontFamily: FONT.body, fontWeight: 500, fontSize: 10, fill: C.oxide, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 1.4s' }}>1 known client commenter</text>
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   STAT COUNTER
   ═══════════════════════════════════════════════════════════════ */

function StatCounter({ end, prefix = '', suffix = '', color, label, decimals = 0 }: {
  end: number; prefix?: string; suffix?: string; color: string; label: string; decimals?: number
}) {
  const { ref, value } = useCountUp(end, 1500, decimals)

  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={ref} style={{ fontFamily: FONT.display, fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', color, lineHeight: 1 }}>
        {prefix}{decimals > 0 ? value.toFixed(decimals) : value}{suffix}
      </div>
      <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 14, marginTop: 8, opacity: 0.7 }}>
        {label}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PASSWORD GATE
   ═══════════════════════════════════════════════════════════════ */

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 600)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bgDark,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT.body,
      position: 'relative',
    }}>
      {/* ERA mark */}
      <div style={{
        position: 'absolute', top: 32, left: 32,
        fontFamily: FONT.display, fontWeight: 900, fontSize: 18,
        color: C.textLight, letterSpacing: '0.08em',
      }}>
        ERA
      </div>

      <div className={error ? 'ns-shake' : ''} style={{ width: '100%', maxWidth: 320, padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 300, color: 'rgba(246,245,242,0.4)', marginBottom: 32, letterSpacing: '0.02em' }}>
          Enter password to continue
        </div>
        <input
          className="ns-pw-input"
          type="password"
          placeholder="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          autoFocus
        />
        <button className="ns-pw-btn" onClick={submit}>
          Enter
        </button>
        {error && (
          <div style={{ marginTop: 12, fontSize: 13, color: C.oxide, fontWeight: 300 }}>
            Incorrect password
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

const findings = [
  { color: C.oxide, text: 'The relationship is the revenue engine, not marketing' },
  { color: C.teal, text: 'The CRM has a strong foundation. Now it needs to tell you what to do next.' },
  { color: C.sand, text: 'You are underleveraged on your existing network' },
  { color: C.magenta, text: 'Your relationship network is changing faster than you can see' },
  { color: C.oxide, text: "The firm's content builds brand, but there is no system to capture the demand it creates" },
]

const actions = [
  { num: '01', title: 'Enrich the contact database', body: 'Append current title, company, seniority, and LinkedIn URL to 7,876 corporate contacts. If sample rates hold, roughly 200 actionable signals exist in HubSpot today that nobody can see.' },
  { num: '02', title: 'Build signal detection as a permanent capability', body: "A recurring intelligence layer that surfaces role changes, executive hires, and company events within 48 hours. When someone in the network moves into a position where they need Navalent's help, the firm knows that week." },
  { num: '03', title: 'Connect all content to the CRM', body: 'When an ICP executive engages with a LinkedIn post, reads an HBR article, or listens to a podcast appearance, that signal flows into HubSpot as relationship intelligence. Context changes the conversation.' },
  { num: '04', title: 'Design post-engagement nurture', body: 'Every person touched during discovery and delivery enters a quarterly nurture path. A warm, relevant touch that replaces the need for any single partner to personally maintain 5,000 relationships.' },
  { num: '05', title: 'Measure warmth, not pipeline', body: 'Shift from "what deals are in motion" to "which relationships are getting warmer." Warmth across the top 100 accounts becomes the leading indicator.' },
]

function PageContent() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY
        heroRef.current.style.transform = `translateY(${y * 0.15}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="ns-page" style={{ fontFamily: FONT.body }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: C.bgDark,
        color: C.textLight,
        padding: 'clamp(100px, 15vw, 180px) clamp(24px, 5vw, 80px) clamp(80px, 12vw, 140px)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div ref={heroRef} className="ns-dot-grid" style={{
          position: 'absolute', inset: '-20% -10%',
          opacity: 0.5, pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <Kicker>Executive Summary</Kicker>
          </Reveal>
          <Reveal delay={100}>
            <Headline style={{ fontSize: 'clamp(40px, 7vw, 72px)', marginBottom: 16 }}>
              Making the Invisible Visible
            </Headline>
          </Reveal>
          <Reveal delay={200}>
            <p style={{
              fontFamily: FONT.body, fontWeight: 400, fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 24px)', color: C.oxide, marginBottom: 32, lineHeight: 1.4,
            }}>
              Five findings about what exists, what's missing, and what to build
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p style={{
              fontFamily: FONT.body, fontWeight: 300, fontSize: 14,
              color: 'rgba(246,245,242,0.4)', letterSpacing: '0.02em',
            }}>
              Prepared for Navalent &nbsp;|&nbsp; March 2026 &nbsp;|&nbsp; Confidential
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── THE BOTTOM LINE ── */}
      <Section>
        <Reveal>
          <Headline style={{ maxWidth: 800 }}>
            Every touchpoint builds trust. None of them are connected.
          </Headline>
        </Reveal>
        <Reveal delay={100}>
          <p style={{
            fontFamily: FONT.display, fontWeight: 800,
            fontSize: 'clamp(20px, 2.8vw, 28px)', lineHeight: 1.35,
            marginBottom: 24, maxWidth: 860,
          }}>
            LinkedIn posts, HBR articles, podcast appearances, client interviews, partner conversations. Every one creates an impression. None of them feed a system that remembers, follows up, or compounds over time.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Body style={{ maxWidth: 780, color: '#5B6670' }}>
            $56.9 million in lifetime revenue. A 79% win rate on returning clients. Thirteen organizations accounting for nearly 80% of all billings. A founder whose content reaches 100,000 people a quarter. And no repeatable system connecting the two engines that drive it all: the relationships and the content. The infrastructure to do that — to keep the firm present with the right people at the right time — is what this assessment is about.
          </Body>
        </Reveal>
      </Section>

      {/* ── STAT BAR ── */}
      <Section dark>
        <div className="ns-stat-bar">
          <Reveal><StatCounter end={79} suffix="%" color={C.teal} label="Win rate on returning client deals" /></Reveal>
          <Reveal delay={100}><StatCounter end={6} suffix="%" color={C.oxide} label="Win rate on website-originated deals" /></Reveal>
          <Reveal delay={200}><StatCounter end={56.9} prefix="$" suffix="M" color={C.sand} label="Lifetime revenue across 101 clients" decimals={1} /></Reveal>
          <Reveal delay={300}><StatCounter end={13} color={C.magenta} label="Clients account for 78.8% of all revenue" /></Reveal>
        </div>
      </Section>

      {/* ── FIVE FINDINGS OVERVIEW ── */}
      <Section>
        <Reveal>
          <Kicker color={C.textDark}>What the data confirmed</Kicker>
          <Headline>What the data confirmed.</Headline>
          <Body style={{ marginBottom: 40, color: '#5B6670' }}>Five hypotheses. Five confirmations.</Body>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {findings.map((f, i) => (
            <Reveal key={i} delay={i * 80} slide>
              <div className="ns-finding-card" style={{ borderLeftColor: f.color }}>
                <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 14, opacity: 0.3, marginRight: 12 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontWeight: 400, fontSize: 16 }}>{f.text}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── FINDING 01: RELATIONSHIPS ── */}
      <Section dark>
        <div className="ns-two-col">
          <div>
            <Reveal>
              <Kicker>Finding 01</Kicker>
              <Headline>Relationships are the revenue engine.</Headline>
            </Reveal>
            <Reveal delay={100}>
              <Body style={{ color: 'rgba(246,245,242,0.7)' }}>
                Returning clients close at 79% with a $239K average deal size. Website-originated leads close at 6%, with only 1 closed-won deal out of 20 in the CRM — and that deal had zero recorded revenue. Across 101 clients and $56.9M in total revenue, 13 clients ($1M+ each) account for 78.8% of all billings. The top 5 alone represent 55% of lifetime revenue.
              </Body>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <DonutChart
              value1={79} value2={6}
              label1="Returning (79%)" label2="Website (6%)"
              color1={C.teal} color2={C.oxide}
            />
          </Reveal>
        </div>
        <Reveal delay={300}>
          <div className="ns-pull-quote" style={{ color: C.oxide, borderLeftColor: C.oxide }}>
            "Every dollar invested in relationship infrastructure compounds at roughly 13x the rate of inbound lead generation."
          </div>
        </Reveal>
      </Section>

      {/* ── FINDING 02: CRM ENRICHMENT ── */}
      <Section>
        <div className="ns-two-col">
          <Reveal>
            <HorizontalBars bars={[
              { label: 'Have job title', value: 6.8, display: '6.8%' },
              { label: 'Have LinkedIn URL', value: 4.3, display: '4.3%' },
              { label: 'Have industry', value: 0.5, display: '0%' },
              { label: 'Have seniority', value: 0.5, display: '0%' },
            ]} />
          </Reveal>
          <div>
            <Reveal>
              <Kicker color={C.teal}>Finding 02</Kicker>
              <Headline>The CRM has a strong foundation. Now it needs to drive action.</Headline>
            </Reveal>
            <Reveal delay={100}>
              <Body style={{ color: '#5B6670' }}>
                13,647 contacts in the database. 93% are ready for activity tracking. But the fields that make contacts actionable are mostly empty: 6.8% have a job title, 4.3% have a LinkedIn URL, and 0% have industry or seniority data. 96% of contacts default to "Lead" with no lifecycle differentiation. The database needs automated enrichment to become a system of intelligence, not just a contact list.
              </Body>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── FINDING 03: NETWORK ── */}
      <Section dark>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <Kicker color={C.sand}>Finding 03</Kicker>
            <Headline>5,000 executives. No system to stay connected.</Headline>
          </Reveal>
          <Reveal delay={100}>
            <Body style={{ color: 'rgba(246,245,242,0.7)', marginBottom: 56 }}>
              Roughly 5,000 executives have experienced Navalent's work over 21 years. There is no repeatable system connecting those relationships to ongoing engagement.
            </Body>
          </Reveal>
          <Reveal delay={200}>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: 'clamp(32px, 5vw, 56px)',
              marginBottom: 24,
            }}>
              <p style={{
                fontFamily: FONT.display, fontWeight: 900,
                fontSize: 'clamp(22px, 3vw, 32px)',
                lineHeight: 1.3, color: C.sand,
              }}>
                A 200-contact sample surfaced 5 HOT opportunities from just 2.5% of the database.
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <Body style={{ color: 'rgba(246,245,242,0.45)', fontStyle: 'italic' }}>
              The other 97.5% is sitting in HubSpot. Invisible.
            </Body>
          </Reveal>
        </div>
      </Section>

      {/* ── FINDING 04: NETWORK DECAY ── */}
      <Section>
        <div className="ns-two-col">
          <Reveal>
            <DecayRing />
          </Reveal>
          <div>
            <Reveal>
              <Kicker color={C.magenta}>Finding 04</Kicker>
              <Headline>Your network is changing faster than you can see.</Headline>
            </Reveal>
            <Reveal delay={100}>
              <Body style={{ color: '#5B6670', marginBottom: 20 }}>
                23.7% of matched contacts started a new role in the last year. 31.5% are now at a different company than what HubSpot shows. The CRM is decaying in real time, and without enrichment, it drifts further from reality every quarter.
              </Body>
            </Reveal>
            <Reveal delay={200}>
              <Body style={{ color: '#5B6670', marginBottom: 20 }}>
                Job changes are just one signal. New executive hires, company acquisitions, funding events, org restructures — these are all triggers that indicate when someone in the network might need Navalent's help. The infrastructure to detect these signals and route them to the right partner is what turns occasional happy accidents into a repeatable pattern.
              </Body>
            </Reveal>
            <Reveal delay={300}>
              <Body style={{ color: '#5B6670' }}>
                But the signals only matter when you can distinguish a budget holder from a design team participant. That requires relationship segmentation: buyers, finders, advocates, and cultivators — each with different engagement strategies and different time horizons. The enrichment and segmentation work is what makes every other signal actionable.
              </Body>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── FINDING 05: CONTENT GAP ── */}
      <Section dark>
        <Reveal>
          <Kicker>Finding 05</Kicker>
          <Headline>101,000 views. One known buyer.</Headline>
        </Reveal>
        <div className="ns-two-col" style={{ marginTop: 32 }}>
          <div>
            <Reveal delay={100}>
              <Body style={{ color: 'rgba(246,245,242,0.7)', marginBottom: 20 }}>
                198 unique commenters in 12 months, only 1 from a Navalent client company. The visible engagement layer — coaches, consultants, peers — and the buying layer are almost completely separate populations.
              </Body>
            </Reveal>
            <Reveal delay={200}>
              <Body style={{ color: 'rgba(246,245,242,0.7)', marginBottom: 20 }}>
                Senior buyers lurk. They read the posts and form impressions. But there is no infrastructure to identify which of those views came from ICP contacts, and no system to capture them into a nurture path.
              </Body>
            </Reveal>
            <Reveal delay={300}>
              <Body style={{ color: 'rgba(246,245,242,0.7)' }}>
                The problem is not targeting. It is visibility. And the solution is connecting ALL content creation — LinkedIn posts, HBR articles, podcast appearances, Forbes pieces — to the relationship engine so that every impression compounds into relationship intelligence, regardless of which partner created it.
              </Body>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <DisparityViz />
          </Reveal>
        </div>
      </Section>

      {/* ── WHAT COMES NEXT ── */}
      <Section>
        <Reveal>
          <Kicker color={C.sand}>What Comes Next</Kicker>
          <Headline>From assessment to action.</Headline>
          <Body style={{ color: '#5B6670', marginBottom: 48 }}>
            Phase 2 is a 120-day build across four 30-day sprints.
          </Body>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {actions.map((a, i) => (
            <Reveal key={a.num} delay={i * 80}>
              <div className="ns-action-item">
                <div className="ns-action-num" style={{ color: C.textDark }}>{a.num}</div>
                <div>
                  <h3 style={{
                    fontFamily: FONT.display, fontWeight: 800,
                    fontSize: 'clamp(18px, 2.2vw, 22px)', marginBottom: 8,
                  }}>
                    {a.title}
                  </h3>
                  <Body style={{ color: '#5B6670' }}>{a.body}</Body>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── CLOSING ── */}
      <Section dark style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontFamily: FONT.display, fontWeight: 900,
              fontSize: 'clamp(24px, 4vw, 42px)',
              lineHeight: 1.2, marginBottom: 32,
            }}>
              Infrastructure that takes the patterns that produced $56.9 million in revenue and makes them visible, measurable, and repeatable.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              fontFamily: FONT.body, fontWeight: 400, fontStyle: 'italic',
              fontSize: 18, color: C.oxide,
            }}>
              Not marketing. Not campaigns. Relationship infrastructure.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{
              marginTop: 64, paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              fontFamily: FONT.body, fontWeight: 300, fontSize: 13,
              color: 'rgba(246,245,242,0.3)', letterSpacing: '0.03em',
            }}>
              ERA &nbsp;|&nbsp; eracx.com &nbsp;|&nbsp; Confidential
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function NavalentSummary() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  useEffect(() => {
    loadFonts()
    injectStyles()

    // Override global body styles from index.css
    const prev = document.body.style.cssText
    document.body.style.backgroundColor = C.bgDark
    document.body.style.color = C.textLight
    document.body.style.margin = '0'
    return () => { document.body.style.cssText = prev }
  }, [])

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <PageContent />
}
