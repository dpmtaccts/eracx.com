import { useState, useEffect } from 'react'

const RUST = '#C85A3A'
const RUST_LIGHT = '#E07B5A'
const RUST_BG = '#FBF3EF'
const G100 = '#F3F3F2'
const G200 = '#E5E5E3'
const G300 = '#CBCBC8'
const G400 = '#8B8B87'
const G500 = '#6B6B67'
const G600 = '#4A4A47'
const TEXT = '#1C1C1A'
const SKY = '#3D8FBF'
const GREEN = '#2B8C5E'
const GREEN_BG = '#F0F7F3'
const YELLOW = '#C48A1A'
const YELLOW_BG = '#FDF8EE'
const RED = '#C44040'
const RED_BG = '#FDF0F0'
const CREAM = '#F7F5F2'
const DARK = '#1A1A2E'

const serif = "'Source Serif 4', 'Source Serif Pro', 'Georgia', serif"
const sans = "'DM Sans', system-ui, sans-serif"

const PASSWORD = 'betteroutcomes'
const SESSION_KEY = 'vik-audit-auth'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,200;8..60,300;8..60,400;8..60,500&display=swap'

function loadFonts() {
  if (typeof document === 'undefined') return
  if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_URL
    document.head.appendChild(link)
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 720 : false
  )
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 720)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}

type Dot = {
  id: string
  label: string
  x: number
  y: number
  color: string
  size: number
  name: string
  type: string
  desc: string
  pulse?: boolean
}

const dots: Dot[] = [
  { id: 'nyu', label: 'NYU\nLangone', x: 72, y: 16, color: SKY, size: 54, name: 'NYU Langone Bariatric', type: 'Academic Medical Center', desc: 'Top 5 nationally in GI surgery. Endowed chair. Active fellowship. Expanding Long Island capacity.' },
  { id: 'cornell', label: 'Weill\nCornell', x: 60, y: 22, color: SKY, size: 46, name: 'Weill Cornell / NYP', type: 'Academic Medical Center', desc: 'Koch Center dedicated facility. Multidisciplinary model. Where Vikram completed his fellowship.' },
  { id: 'sinai', label: 'Mt\nSinai', x: 55, y: 28, color: SKY, size: 42, name: 'Mount Sinai', type: 'Academic Medical Center', desc: 'Large GI team. Press Ganey scores. Integrated scheduling. Strong UES presence.' },
  { id: 'lenox', label: 'Lenox\nHill', x: 38, y: 30, color: G400, size: 44, name: 'Lenox Hill Bariatric', type: 'Your Program (Northwell)', desc: 'Dr. Roslin-led. Media features. ASMBS accredited. Strong program brand, low individual surgeon digital.' },
  { id: 'nybg', label: 'NY\nBariatric\nGroup', x: 78, y: 52, color: YELLOW, size: 48, name: 'New York Bariatric Group', type: 'Private Multi-Location', desc: 'NY/NJ/CT. Video testimonials, BMI calculator, GLP-1 content, insurance tools.' },
  { id: 'dhar', label: 'Dr.\nDhar', x: 22, y: 58, color: RUST, size: 48, name: 'Dr. Vikrom Dhar', type: 'You Are Here', desc: 'Strong surgical volume (500-600/yr). Robotic surgery differentiator. Manual referral building. Minimal digital infrastructure.', pulse: true },
]

type Card = {
  name: string
  tag: string
  tagBg?: string
  tagColor?: string
  bg?: string
  border?: string
  body: string
  stats: { l: string; v: string; c?: string }[]
  img: string
  ss: string
}

const cards: Card[] = [
  { name: 'Dr. Vikrom Dhar', tag: 'You', tagBg: RUST, tagColor: '#fff', bg: RUST_BG, border: RUST, body: 'Board-certified bariatric and minimally invasive surgeon at Lenox Hill / Northwell. Robotic surgery specialist. One of the busiest general surgeons in the system.', stats: [{ l: 'Volume', v: '500-600/yr' }, { l: 'Digital', v: 'Low', c: RED }, { l: 'Referrals', v: 'Manual', c: RED }, { l: 'Self-Referral', v: '<10%', c: YELLOW }], img: '/images/vik-audit/vikram.png', ss: 'vikromdharmd.com' },
  { name: 'NYU Langone', tag: 'Academic', body: 'Division led by Dr. Christine Ren-Fielding (endowed chair, ASMBS award). Top 5 nationally for GI surgery. Actively expanding Long Island capacity.', stats: [{ l: 'National Rank', v: 'Top 5 GI' }, { l: 'Digital', v: 'High', c: GREEN }, { l: 'Research', v: 'Very High', c: GREEN }], img: '/images/vik-audit/nyulangonehealth.png', ss: 'NYU Langone bariatric page' },
  { name: 'NY Bariatric Group', tag: 'Private', body: 'Most digitally aggressive private competitor. Multi-state footprint. Video testimonials, BMI calculator, insurance tools, GLP-1 content strategy.', stats: [{ l: 'Locations', v: 'Multi-State' }, { l: 'Digital', v: 'Very High', c: GREEN }, { l: 'Nurture', v: 'Automated', c: GREEN }], img: '/images/vik-audit/nybg.png', ss: 'NYBG website' },
  { name: 'Lenox Hill Program', tag: 'Your Program', body: 'Led by Dr. Roslin (Chief) and Dr. Teixeira (Chief of MIS). National media presence. ASMBS accredited. Healthgrades 2026 GI Excellence awards. Program brand is strong. Individual surgeon brands are not.', stats: [{ l: 'Brand', v: 'Strong', c: GREEN }, { l: 'Surgeon Digital', v: 'Low', c: RED }, { l: '2026 Awards', v: '3 Healthgrades', c: GREEN }], img: '/images/vik-audit/northwelllenox.png', ss: 'nycbariatrics.com' },
]

type AuditItem = { num: string; title: string; q: string; p: 1 | 2 | 3; from: string; to: string }

const auditItems: AuditItem[] = [
  { num: '1', title: 'Local Search Visibility', q: 'How much patient volume is going to competitors by default?', p: 1, from: 'No Google Business Profile. Competitors own the local pack for "bariatric surgeon Upper East Side" and related queries. You are not appearing in the results patients see first.', to: 'Exact search volume for your target terms. Where you rank (or don\u2019t) for each. Which competitors capture that traffic today, and the realistic share you can reclaim.' },
  { num: '2', title: 'Third-Party Profile Assessment', q: 'Which profiles are helping, which are hurting, and which don\u2019t matter?', p: 1, from: 'ZocDoc says Brooklyn. Healthgrades is unclaimed. Northwell, Vitals, and WebMD each show different information. No single source of truth for a patient researching you.', to: 'A complete map of every profile, what each one says, where the inconsistencies are, and which platforms actually drive patient inquiries in your market.' },
  { num: '3', title: 'Website and AI Readiness', q: 'What does a patient see when they compare you side-by-side with NYU?', p: 2, from: 'A WordPress site with placeholder text still visible, no analytics, no email capture, no content addressing patient questions. AI agents parsing this site find lorem ipsum.', to: 'Site traffic, conversion behavior, content gaps relative to what patients search, and how AI agents evaluate and rank your site against competitors.' },
  { num: '4', title: 'Referral Network Mapping', q: 'Who should you be reaching, and in what order?', p: 1, from: 'Googling gastroenterologists in Manhattan. Going to dinners. Handing out your cell number. Effective but unscalable, untracked, and entirely dependent on your personal bandwidth.', to: 'The full landscape of GI, OB/GYN, and primary care physicians in your geography, scored by referral potential, tiered by priority, enriched with contact data and backgrounds.' },
  { num: '5', title: 'Patient Journey and Drop-off', q: 'Where are you losing patients you\u2019ve already attracted?', p: 2, from: 'From first search to surgery, at least five stages where patients drop out. Northwell\u2019s referral system adds 3-4 manual handoff layers you don\u2019t control. No visibility into where patients leave.', to: 'A mapped patient journey with identified drop-off points, estimated volume lost at each stage, and the specific workflow bottlenecks in pre-surgery coordination.' },
  { num: '6', title: 'Personal Brand vs. Program Brand', q: 'How do you grow your pipeline inside the system?', p: 3, from: 'The Lenox Hill program markets Dr. Roslin. NYU and Cornell invest in individual surgeon profiles. Your personal brand is subordinated to the program. Patients don\u2019t get a differentiated experience.', to: 'The specific gap between your digital presence and competitors\u2019. What it takes to build pipeline independence without friction with Northwell, and the long-term optionality that creates.' },
]

const priorityStyles: Record<1 | 2 | 3, { bg: string; color: string; label: string }> = {
  1: { bg: RED_BG, color: RED, label: 'Priority 1' },
  2: { bg: YELLOW_BG, color: YELLOW, label: 'Priority 2' },
  3: { bg: GREEN_BG, color: GREEN, label: 'Priority 3' },
}

function DotMark({ d }: { d: Dot }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setHover((v) => !v)}
      style={{ position: 'absolute', left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%,-50%)', zIndex: hover ? 10 : 2, cursor: 'default' }}
    >
      <div style={{
        width: d.size, height: d.size, borderRadius: '50%', background: d.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `2px solid #fff`, boxShadow: '0 2px 8px rgba(0,0,0,.08)',
        transform: hover ? 'scale(1.15)' : 'scale(1)', transition: 'transform .2s',
        animation: d.pulse ? 'vikPulse 2.5s ease-in-out infinite' : 'none',
      }}>
        <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line' }}>{d.label}</span>
      </div>
      {hover && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          background: '#fff', border: `1px solid ${G200}`, borderRadius: 8, padding: '14px 16px',
          width: 210, boxShadow: '0 8px 24px rgba(0,0,0,.08)', zIndex: 20,
        }}>
          <strong style={{ fontSize: 12, display: 'block', marginBottom: 3 }}>{d.name}</strong>
          <div style={{ fontSize: 10, color: G400, marginBottom: 6 }}>{d.type}</div>
          <p style={{ fontSize: 10, color: G500, lineHeight: 1.5, margin: 0 }}>{d.desc}</p>
        </div>
      )}
    </div>
  )
}

function Arrow({ vertical }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 0' }}>
        <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
          <line x1="12" y1="0" x2="12" y2="24" stroke={G300} strokeWidth="2" />
          <polygon points="6,24 18,24 12,32" fill={RUST} />
        </svg>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
        <line x1="0" y1="12" x2="24" y2="12" stroke={G300} strokeWidth="2" />
        <polygon points="24,6 32,12 24,18" fill={RUST} />
      </svg>
    </div>
  )
}

function AuditCard({ item, isActive, onClick, isMobile }: { item: AuditItem; isActive: boolean; onClick: () => void; isMobile: boolean }) {
  const ps = priorityStyles[item.p]
  return (
    <div
      onClick={onClick}
      style={{ borderBottom: `1px solid ${G200}`, padding: isMobile ? '24px 0' : '32px 0', cursor: 'pointer', userSelect: 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? 12 : 16 }}>
        <div style={{
          fontFamily: serif, fontSize: isMobile ? 36 : 48, fontWeight: 300, lineHeight: 1, flexShrink: 0, width: isMobile ? 40 : 56,
          letterSpacing: '-0.03em', color: isActive ? RUST : G200, transition: 'color .4s',
        }}>{item.num}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: serif, fontSize: isMobile ? 18 : 22, fontWeight: 400, lineHeight: 1.3, marginBottom: 4,
            color: isActive ? RUST : TEXT, transition: 'color .3s',
          }}>{item.title}</div>
          <div style={{
            fontFamily: serif, fontSize: isMobile ? 13 : 14, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5,
            color: isActive ? RUST_LIGHT : G400, transition: 'color .3s',
          }}>{item.q}</div>
          {!isActive && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11, color: G400 }}>
              <span style={{ display: 'inline-flex', width: 20, height: 20, borderRadius: '50%', background: G100, alignItems: 'center', justifyContent: 'center', fontSize: 11, color: G400 }}>&rarr;</span>
              {isMobile ? 'Tap to explore' : 'Click to explore'}
            </div>
          )}
        </div>
        <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, padding: '5px 10px', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0, marginTop: 4, background: ps.bg, color: ps.color }}>{isMobile ? `P${item.p}` : ps.label}</div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 48px 1fr',
        marginTop: isActive ? (isMobile ? 16 : 24) : 0,
        marginLeft: isMobile ? 0 : 72,
        maxHeight: isActive ? 1200 : 0, overflow: 'hidden', opacity: isActive ? 1 : 0,
        transition: 'max-height .5s cubic-bezier(.4,0,.2,1), opacity .4s ease, margin-top .4s ease',
        gap: isMobile ? 0 : undefined,
      }}>
        <div style={{ padding: isMobile ? 16 : 20, borderRadius: 8, background: G100 }}>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 10, color: G400 }}>Where You Are</div>
          <div style={{ fontFamily: serif, fontSize: isMobile ? 13 : 14, lineHeight: 1.7, color: G600, fontWeight: 300 }}>{item.from}</div>
        </div>
        <Arrow vertical={isMobile} />
        <div style={{ padding: isMobile ? 16 : 20, borderRadius: 8, background: RUST_BG }}>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 10, color: RUST }}>What the Audit Reveals</div>
          <div style={{ fontFamily: serif, fontSize: isMobile ? 13 : 14, lineHeight: 1.7, color: G600, fontWeight: 300 }}>{item.to}</div>
        </div>
      </div>
    </div>
  )
}

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
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: sans,
      padding: '24px',
      position: 'relative',
    }}>
      <img
        src="/images/era_final.png"
        alt="ERA"
        style={{
          position: 'absolute',
          top: 32,
          left: 32,
          height: 24,
          width: 'auto',
        }}
      />

      <div style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
        <h1 style={{
          fontFamily: serif,
          fontSize: 28,
          fontWeight: 300,
          lineHeight: 1.25,
          letterSpacing: '-0.015em',
          color: TEXT,
          margin: '0 0 12px',
        }}>
          This document is confidential.
        </h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          color: G500,
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}>
          Enter the password to continue.
        </p>

        <input
          type="password"
          placeholder="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          autoFocus
          style={{
            width: '100%',
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 400,
            color: TEXT,
            background: '#fff',
            border: `1px solid ${error ? RED : G200}`,
            borderRadius: 6,
            padding: '14px 16px',
            outline: 'none',
            transition: 'border-color .2s',
            marginBottom: 12,
            boxSizing: 'border-box',
          }}
          onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = RUST }}
          onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = G200 }}
        />

        <button
          onClick={submit}
          style={{
            width: '100%',
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 600,
            color: '#fff',
            background: RUST,
            border: 'none',
            borderRadius: 6,
            padding: '14px 16px',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'background .15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#B14D30' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = RUST }}
        >
          Enter
        </button>

        {error && (
          <div style={{ marginTop: 14, fontSize: 13, color: RED, fontWeight: 400 }}>
            Incorrect password
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 32,
        fontSize: 11,
        color: G400,
        letterSpacing: '0.02em',
      }}>
        ERA &middot; Prepared for Dr. Vikrom Dhar
      </div>
    </div>
  )
}

function PageContent() {
  const [activeAudit, setActiveAudit] = useState<number | null>(null)
  const isMobile = useIsMobile()

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: isMobile ? '40px 20px 60px' : '60px 32px 80px',
      fontFamily: sans,
      color: TEXT,
      background: '#fff',
    }}>
      <style>{`
        @keyframes vikPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(200,90,58,.35), 0 2px 8px rgba(0,0,0,.08); }
          50% { box-shadow: 0 0 0 12px rgba(200,90,58,0), 0 2px 8px rgba(0,0,0,.08); }
        }
        html, body { background: #fff; }
      `}</style>

      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'flex-start',
        gap: isMobile ? 20 : 0,
        paddingBottom: isMobile ? 28 : 40,
        borderBottom: `1px solid ${G200}`,
        marginBottom: isMobile ? 44 : 64,
      }}>
        <div>
          <img src="/images/era_final.png" alt="ERA" style={{ height: 24, width: 'auto', marginBottom: 20, display: 'block' }} />
          <h1 style={{
            fontFamily: serif,
            fontSize: isMobile ? 32 : 44,
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 10px',
          }}>Competitive Landscape</h1>
          <p style={{ fontSize: isMobile ? 14 : 15, color: G500, lineHeight: 1.5, margin: 0 }}>
            Manhattan Bariatric Surgery Market<br />Dr. Vikrom Dhar, MD
          </p>
        </div>
        <div style={{
          textAlign: isMobile ? 'left' : 'right',
          fontSize: 12,
          color: G400,
          lineHeight: 1.8,
          flexShrink: 0,
          paddingTop: isMobile ? 0 : 6,
        }}>
          <div style={{ color: G600, fontWeight: 600 }}>April 9, 2026</div>
          <div>Signal Intelligence Brief</div>
          <div>Confidential</div>
        </div>
      </div>

      {/* Quadrant */}
      <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: RUST, fontWeight: 700, marginBottom: 14 }}>Market Position</div>
      <h2 style={{
        fontFamily: serif,
        fontSize: isMobile ? 26 : 32,
        fontWeight: 300,
        lineHeight: 1.25,
        letterSpacing: '-0.015em',
        margin: '0 0 12px',
      }}>Where you sit today.</h2>
      <p style={{
        fontFamily: serif,
        fontSize: isMobile ? 15 : 17,
        lineHeight: 1.75,
        color: G500,
        maxWidth: 680,
        marginBottom: isMobile ? 32 : 48,
        fontWeight: 300,
      }}>
        Every major bariatric surgery provider in the New York metro area, mapped by digital patient acquisition sophistication and institutional brand strength.
      </p>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 720,
        height: isMobile ? 360 : 480,
        margin: '0 auto 20px',
        background: CREAM,
        border: `1px solid ${G200}`,
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 36, right: 36, height: 1, background: G300 }} />
        <div style={{ position: 'absolute', left: '50%', top: 36, bottom: 36, width: 1, background: G300 }} />
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', fontSize: isMobile ? 9 : 10, letterSpacing: 1.5, textTransform: 'uppercase', color: G400, fontWeight: 500, whiteSpace: 'nowrap' }}>Digital Patient Acquisition &rarr;</div>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left center', fontSize: isMobile ? 9 : 10, letterSpacing: 1.5, textTransform: 'uppercase', color: G400, fontWeight: 500, whiteSpace: 'nowrap' }}>&larr; Brand &amp; Research</div>
        {!isMobile && (
          <>
            <div style={{ position: 'absolute', top: 56, left: 60, fontSize: 9, color: G300, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Strong Brand<br />Low Digital</div>
            <div style={{ position: 'absolute', top: 56, right: 60, fontSize: 9, color: G300, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textAlign: 'right' }}>Strong Brand<br />Strong Digital</div>
            <div style={{ position: 'absolute', bottom: 56, left: 60, fontSize: 9, color: G300, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Emerging<br />Low Digital</div>
            <div style={{ position: 'absolute', bottom: 56, right: 60, fontSize: 9, color: G300, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textAlign: 'right' }}>Digitally Led<br />Lower Brand</div>
          </>
        )}
        {dots.map((d) => <DotMark key={d.id} d={d} />)}
      </div>
      <p style={{ fontSize: 12, color: G400, textAlign: 'center', marginBottom: isMobile ? 36 : 48, fontStyle: 'italic' }}>
        Position estimated from publicly available digital presence, brand signals, and research output.
      </p>

      <div style={{ height: 1, background: `linear-gradient(to right, ${G200}, transparent)`, margin: isMobile ? '40px 0' : '64px 0' }} />

      {/* Competitor Cards */}
      <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: RUST, fontWeight: 700, marginBottom: 14 }}>Detailed View</div>
      <h2 style={{
        fontFamily: serif,
        fontSize: isMobile ? 26 : 32,
        fontWeight: 300,
        lineHeight: 1.25,
        margin: '0 0 12px',
      }}>Who you're up against.</h2>
      <p style={{
        fontFamily: serif,
        fontSize: isMobile ? 15 : 17,
        lineHeight: 1.75,
        color: G500,
        maxWidth: 680,
        marginBottom: isMobile ? 32 : 48,
        fontWeight: 300,
      }}>
        What patients and AI agents see when they search for bariatric surgery in Manhattan today.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 16 : 20,
        marginBottom: 16,
      }}>
        {cards.map((c, i) => (
          <div key={i} style={{ border: `1px solid ${c.border || G200}`, borderRadius: 8, padding: isMobile ? 20 : 24, background: c.bg || '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, padding: '3px 8px', borderRadius: 4, fontWeight: 600, background: c.tagBg || G100, color: c.tagColor || G500, whiteSpace: 'nowrap' }}>{c.tag}</div>
            </div>
            <div style={{ fontFamily: serif, fontSize: 13, lineHeight: 1.7, color: G500, marginBottom: 16, fontWeight: 300 }}>{c.body}</div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {c.stats.map((s, j) => (
                <div key={j}>
                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, color: G400, marginBottom: 2 }}>{s.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: s.c || TEXT }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, background: CREAM, border: `1px solid ${G200}`, borderRadius: 6, height: isMobile ? 160 : 180, overflow: 'hidden' }}>
              <img src={c.img} alt={c.ss} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: `linear-gradient(to right, ${G200}, transparent)`, margin: isMobile ? '40px 0' : '64px 0' }} />

      {/* Assessment Scope */}
      <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: RUST, fontWeight: 700, marginBottom: 14 }}>Assessment Scope</div>
      <h2 style={{
        fontFamily: serif,
        fontSize: isMobile ? 26 : 32,
        fontWeight: 300,
        lineHeight: 1.25,
        margin: '0 0 12px',
      }}>What we need to understand.</h2>
      <p style={{
        fontFamily: serif,
        fontSize: isMobile ? 15 : 17,
        lineHeight: 1.75,
        color: G500,
        maxWidth: 680,
        marginBottom: isMobile ? 32 : 48,
        fontWeight: 300,
      }}>
        The landscape tells us where you sit. It cannot tell us how much each gap costs or which to close first. {isMobile ? 'Tap' : 'Click'} any area below to see where you are today and what the audit reveals.
      </p>

      <div>
        {auditItems.map((item, i) => (
          <AuditCard
            key={i}
            item={item}
            isActive={activeAudit === i}
            onClick={() => setActiveAudit(activeAudit === i ? null : i)}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* CTA */}
      <div style={{
        background: DARK,
        borderRadius: 10,
        padding: isMobile ? '32px 24px' : '40px 44px',
        marginTop: isMobile ? 48 : 64,
        color: '#fff',
      }}>
        <div style={{
          fontFamily: serif,
          fontSize: isMobile ? 22 : 24,
          fontWeight: 300,
          marginBottom: 12,
          letterSpacing: '-0.01em',
        }}>Patient Acquisition Assessment</div>
        <div style={{
          fontFamily: serif,
          fontSize: isMobile ? 14 : 15,
          lineHeight: 1.8,
          color: 'rgba(255,255,255,.6)',
          fontWeight: 300,
          maxWidth: 640,
        }}>
          The competitive landscape tells us where you sit. The assessment tells us what to do about it. It covers all six areas, delivers a prioritized action plan with expected impact, timeline, and sequencing, and gives you a clear blueprint regardless of whether we do additional work together.
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: isMobile ? 36 : 48,
        paddingTop: 24,
        borderTop: `1px solid ${G200}`,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 6 : 0,
        justifyContent: 'space-between',
        fontSize: 11,
        color: G400,
      }}>
        <div>ERA &middot; Earned Revenue Architecture &middot; Justin Marshall</div>
        <div>Confidential &middot; Prepared for Dr. Vikrom Dhar</div>
      </div>
    </div>
  )
}

export default function VikAudit() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) === '1'
  })

  useEffect(() => {
    loadFonts()
    document.body.style.background = '#fff'
    document.title = 'Competitive Landscape — Dr. Vikrom Dhar'
    return () => { document.body.style.background = '' }
  }, [])

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <PageContent />
}
