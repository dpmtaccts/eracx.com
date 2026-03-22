import { useState, useEffect, useRef, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

type Section = 'hero' | 'interstitial' | 'questionnaire' | 'results'
type Status = 'On Track' | 'Needs Attention' | 'At Risk'

interface Answers {
  opportunities: string
  dealSize: string
  salesCycle: string
  stallRate: number
  singleMeetingClose: string
  whoCloses: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const COLORS = {
  charcoal: '#383838',
  offWhite: '#F6F5F2',
  divider: '#D7DADD',
  secondary: '#5B6670',
  white: '#FFFFFF',
  teal: '#1FA7A2',
  oxide: '#B85C4A',
  sand: '#D6B26D',
  magenta: '#D43D8D',
}

const STATUS_COLOR: Record<Status, string> = {
  'At Risk': COLORS.oxide,
  'Needs Attention': COLORS.sand,
  'On Track': COLORS.teal,
}

const DEAL_SIZE_OPTIONS = ['Under $10K', '$10K-$25K', '$25K-$75K', '$75K+']
const SALES_CYCLE_OPTIONS = ['Under 30 days', '30-60 days', '60-90 days', '90-120 days', '120+ days']
const SINGLE_MEETING_OPTIONS = ['Less than 10%', '10-25%', '25-50%', 'More than 50%']
const WHO_CLOSES_OPTIONS = ['Founder/CEO', 'Dedicated sales team', 'Mixed', 'No clear answer']

// ── Scoring Logic ──────────────────────────────────────────────────────────

function scorePipelineVelocity(dealSize: string, cycle: string): Status {
  const ds = DEAL_SIZE_OPTIONS.indexOf(dealSize)
  const cl = SALES_CYCLE_OPTIONS.indexOf(cycle)

  if (ds === 0) { // Under $10K
    if (cl <= 1) return 'On Track'
    if (cl === 2) return 'Needs Attention'
    return 'At Risk'
  }
  if (ds === 1) { // $10K-$25K
    if (cl <= 2) return 'On Track'
    if (cl === 3) return 'Needs Attention'
    return 'At Risk'
  }
  if (ds === 2) { // $25K-$75K
    if (cl <= 2) return 'On Track'
    if (cl === 3) return 'Needs Attention'
    return 'At Risk'
  }
  // $75K+
  if (cl <= 3) return 'On Track'
  return 'Needs Attention'
}

function scoreMidProcessHealth(stallRate: number, singleMeeting: string): Status {
  if (stallRate < 30) return 'On Track'
  if (stallRate > 60) return 'At Risk'
  // 30-60%
  const smIdx = SINGLE_MEETING_OPTIONS.indexOf(singleMeeting)
  if (smIdx <= 0) return 'At Risk' // Less than 10%
  return 'Needs Attention'
}

function scoreGtmDependency(whoCloses: string, dealSize: string): Status {
  if (whoCloses === 'Dedicated sales team') return 'On Track'
  if (whoCloses === 'Mixed' || whoCloses === 'No clear answer') return 'Needs Attention'
  // Founder/CEO
  const ds = DEAL_SIZE_OPTIONS.indexOf(dealSize)
  if (ds >= 2) return 'At Risk' // $25K-$75K or $75K+
  return 'Needs Attention'
}

// ── Interpretation Copy ────────────────────────────────────────────────────

const VELOCITY_COPY: Record<Status, string> = {
  'At Risk': "Your cycle is running longer than mid-market average for deals your size. That gap almost always lives in the middle: between first meeting and proposal, where there's no structured motion keeping things moving.",
  'Needs Attention': "You're within range, but trending toward the longer end. Worth building mid-process infrastructure before it becomes a pattern.",
  'On Track': "Your velocity is solid relative to deal size. The question is whether it holds as volume increases.",
}

const MIDPROCESS_COPY: Record<Status, string> = {
  'At Risk': "More than half your deals are stalling before proposal. That's not a follow-up problem: it's a process problem. There's no infrastructure keeping deals moving between meetings.",
  'Needs Attention': "You're seeing stalls but not at a level that breaks the business. Building a mid-process nurture motion now prevents it from compounding.",
  'On Track': "Stall rate is healthy. Keep it systematic, not personality-dependent.",
}

const GTM_COPY: Record<Status, string> = {
  'At Risk': "The business closes when you close. That's a ceiling, not a strategy. At your deal size, this is the highest-leverage problem to solve.",
  'Needs Attention': "You're in the deal more than you should be. It's manageable now, but it doesn't scale and it's costing you time you don't have.",
  'On Track': "Your team is carrying the close motion. Make sure the system is documented well enough that it survives turnover.",
}

// ── Animated Counter Component ─────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '%', color }: { target: number; suffix?: string; color: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    if (animated.current) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const start = performance.now()
          const duration = 800
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} style={{ color, fontSize: 48, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif" }}>
      {value}{suffix}
    </span>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Benchmark() {
  const [section, setSection] = useState<Section>('hero')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    opportunities: '',
    dealSize: '',
    salesCycle: '',
    stallRate: 50,
    singleMeetingClose: '',
    whoCloses: '',
  })
  const [transitioning, setTransitioning] = useState(false)
  const [visible, setVisible] = useState(true)
  const [emailName, setEmailName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [resultsVisible, setResultsVisible] = useState([false, false, false])
  const interstitialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Section transition ──
  const goToSection = useCallback((next: Section) => {
    setTransitioning(true)
    setVisible(false)
    setTimeout(() => {
      setSection(next)
      setVisible(true)
      setTransitioning(false)
    }, 300)
  }, [])

  // ── Interstitial auto-advance ──
  useEffect(() => {
    if (section === 'interstitial') {
      interstitialTimerRef.current = setTimeout(() => {
        goToSection('questionnaire')
      }, 8000)
      return () => {
        if (interstitialTimerRef.current) clearTimeout(interstitialTimerRef.current)
      }
    }
  }, [section, goToSection])

  // ── Stagger result cards ──
  useEffect(() => {
    if (section === 'results') {
      setResultsVisible([false, false, false])
      const timers = [
        setTimeout(() => setResultsVisible(p => [true, p[1], p[2]]), 100),
        setTimeout(() => setResultsVisible(p => [p[0], true, p[2]]), 200),
        setTimeout(() => setResultsVisible(p => [p[0], p[1], true]), 300),
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [section])

  // ── Set page title ──
  useEffect(() => {
    document.title = 'Mid-Market Pipeline Benchmark | Era'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Six questions. Three dimensions. See how your pipeline infrastructure compares to mid-market companies selling $50K+ deals.')
  }, [])

  // ── Question navigation ──
  const canAdvance = (): boolean => {
    if (questionIndex === 0) return answers.opportunities.trim() !== ''
    if (questionIndex === 1) return answers.dealSize !== ''
    if (questionIndex === 2) return answers.salesCycle !== ''
    if (questionIndex === 3) return true // slider always has value
    if (questionIndex === 4) return answers.singleMeetingClose !== ''
    if (questionIndex === 5) return answers.whoCloses !== ''
    return false
  }

  const nextQuestion = () => {
    if (!canAdvance()) return
    if (questionIndex < 5) {
      setTransitioning(true)
      setVisible(false)
      setTimeout(() => {
        setQuestionIndex(i => i + 1)
        setVisible(true)
        setTransitioning(false)
      }, 200)
    } else {
      goToSection('results')
    }
  }

  const prevQuestion = () => {
    setTransitioning(true)
    setVisible(false)
    setTimeout(() => {
      setQuestionIndex(i => i - 1)
      setVisible(true)
      setTransitioning(false)
    }, 200)
  }

  const retake = () => {
    setAnswers({
      opportunities: '',
      dealSize: '',
      salesCycle: '',
      stallRate: 50,
      singleMeetingClose: '',
      whoCloses: '',
    })
    setQuestionIndex(0)
    setSubmitted(false)
    setEmailName('')
    setEmailAddress('')
    goToSection('questionnaire')
  }

  // ── Scoring ──
  const velocityStatus = scorePipelineVelocity(answers.dealSize, answers.salesCycle)
  const midprocessStatus = scoreMidProcessHealth(answers.stallRate, answers.singleMeetingClose)
  const gtmStatus = scoreGtmDependency(answers.whoCloses, answers.dealSize)

  const atRiskCount = [velocityStatus, midprocessStatus, gtmStatus].filter(s => s === 'At Risk').length
  const needsAttentionCount = [velocityStatus, midprocessStatus, gtmStatus].filter(s => s === 'Needs Attention').length

  let summaryLine: string
  if (atRiskCount >= 2) {
    summaryLine = "There's a pattern here. It's fixable, but it needs a system, not a hire."
  } else if (atRiskCount === 1) {
    summaryLine = "One area worth building around before it compounds."
  } else if (needsAttentionCount > 0) {
    summaryLine = "Solid foundation. A few areas to tighten before the next growth push."
  } else {
    summaryLine = "Solid across the board. The question is whether this holds at 2x volume."
  }

  // ── Email submit ──
  const handleEmailSubmit = async () => {
    if (!emailName.trim() || !emailAddress.trim()) return
    setSubmitting(true)
    try {
      await fetch('https://hooks.zapier.com/hooks/catch/24079580/ux8f8fd/', {
        method: 'POST',
        body: JSON.stringify({
          source: 'benchmark_tool',
          name: emailName,
          email: emailAddress,
          pipeline_velocity: velocityStatus,
          midprocess_health: midprocessStatus,
          gtm_dependency: gtmStatus,
          answers: {
            opportunities_last_quarter: answers.opportunities,
            avg_deal_size: answers.dealSize,
            avg_sales_cycle: answers.salesCycle,
            stall_rate: `${answers.stallRate}%`,
            single_meeting_close: answers.singleMeetingClose,
            who_closes: answers.whoCloses,
          },
        }),
      })
      setSubmitted(true)
    } catch {
      // Silently handle — Zapier webhooks don't return CORS-friendly responses
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  // ── Shared styles ──
  const fontFamily = "'Source Sans 3', sans-serif"
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: COLORS.charcoal,
    color: COLORS.offWhite,
    fontFamily,
    fontWeight: 300,
  }
  const contentWrap: React.CSSProperties = {
    maxWidth: 720,
    margin: '0 auto',
    padding: '0 24px',
  }
  const sectionTransition: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 300ms ease-out, transform 300ms ease-out',
  }
  const buttonStyle: React.CSSProperties = {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.05em',
    padding: '14px 32px',
    borderRadius: 2,
    border: 'none',
    cursor: 'pointer',
    fontFamily,
  }
  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: `1px solid rgba(215,218,221,0.2)`,
    borderRadius: 2,
    color: COLORS.offWhite,
    fontSize: 14,
    fontFamily,
    fontWeight: 300,
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%235B6670' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    backgroundSize: '12px 8px',
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO SECTION
  // ═══════════════════════════════════════════════════════════════════════════
  if (section === 'hero') {
    return (
      <div style={containerStyle}>
        <div style={{ ...sectionTransition, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* ERA wordmark */}
          <div style={{ padding: '32px 40px' }}>
            <span style={{
              fontFamily, fontWeight: 700, fontSize: 12, letterSpacing: '0.3em',
              color: COLORS.oxide,
            }}>ERA</span>
          </div>

          {/* Center content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            <div style={{
              fontFamily, fontWeight: 700, fontSize: 9, letterSpacing: '0.15em',
              color: COLORS.teal, textTransform: 'uppercase' as const, marginBottom: 16,
            }}>
              MID-MARKET PIPELINE BENCHMARK
            </div>
            <h1 style={{
              fontFamily, fontWeight: 700, fontSize: 36, color: COLORS.offWhite,
              maxWidth: 600, textAlign: 'center', margin: '0 0 20px', lineHeight: 1.2,
            }}>
              How does your pipeline infrastructure compare?
            </h1>
            <p style={{
              fontFamily, fontWeight: 300, fontSize: 16, color: COLORS.secondary,
              maxWidth: 500, textAlign: 'center', margin: '0 0 40px', lineHeight: 1.5,
            }}>
              Six questions. Three dimensions. Benchmarked against mid-market companies selling $50K+ deals.
            </p>
            <button
              onClick={() => goToSection('interstitial')}
              style={buttonStyle}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              Start the benchmark
            </button>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '24px 40px', fontSize: 9, color: COLORS.divider,
          }}>
            <span style={{ fontFamily, letterSpacing: '0.05em' }}>
              Connection Loops · Trust Loops · Loyalty Loops
            </span>
            <span style={{ fontFamily }}>eracx.com</span>
          </div>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INTERSTITIAL SECTION
  // ═══════════════════════════════════════════════════════════════════════════
  if (section === 'interstitial') {
    return (
      <div style={containerStyle}>
        <div style={{ ...sectionTransition, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...contentWrap, paddingTop: 80, paddingBottom: 80 }}>
            <h2 style={{ fontFamily, fontWeight: 700, fontSize: 28, color: COLORS.offWhite, margin: '0 0 24px' }}>
              Before you start.
            </h2>
            <p style={{
              fontFamily, fontWeight: 300, fontSize: 15, color: COLORS.offWhite,
              lineHeight: 1.6, maxWidth: 600, margin: '0 0 48px',
            }}>
              Across the companies we work with, more than half are navigating the same headwind: AI is reshaping how buyers allocate capital. Whether it's a freeze on new vendor spend, reallocation toward internal AI initiatives, or risk committees that didn't exist two years ago, the buying environment is harder than the pipeline numbers show. You're not behind. The game changed.
            </p>

            {/* Stat cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 24,
              marginBottom: 32,
            }}>
              {[
                { value: 50, label: 'of mid-market companies redirected budget toward AI initiatives in 2024-2025', source: 'Era partner network', color: COLORS.teal },
                { value: 61, label: 'of buyers complete most of their journey before contacting a vendor', source: '6sense 2025', color: COLORS.oxide },
                { value: 73, label: 'of buyers actively avoid vendors sending irrelevant outreach', source: 'Gartner 2025', color: COLORS.sand },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(215,218,221,0.15)',
                  padding: 24,
                  borderRadius: 2,
                }}>
                  <div style={{ marginBottom: 8 }}>
                    <AnimatedCounter target={stat.value} color={stat.color} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 300, color: COLORS.secondary, lineHeight: 1.5, marginBottom: 8 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 9, fontStyle: 'italic', color: stat.color }}>
                    {stat.source}
                  </div>
                </div>
              ))}
            </div>

            <p style={{
              fontSize: 12, fontWeight: 300, color: COLORS.secondary,
              fontStyle: 'italic', maxWidth: 600,
            }}>
              Your score is relative to where mid-market teams actually are right now, not where they were three years ago.
            </p>
          </div>

          {/* Skip link */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 40px 24px' }}>
            <button
              onClick={() => {
                if (interstitialTimerRef.current) clearTimeout(interstitialTimerRef.current)
                goToSection('questionnaire')
              }}
              style={{
                background: 'none', border: 'none', color: COLORS.secondary,
                fontSize: 13, fontFamily, cursor: 'pointer', fontWeight: 300,
              }}
            >
              Skip to questions →
            </button>
          </div>

          {/* Progress line */}
          <div style={{ height: 2, backgroundColor: 'rgba(215,218,221,0.1)' }}>
            <div style={{
              height: '100%',
              backgroundColor: COLORS.teal,
              animation: 'interstitial-progress 8s linear forwards',
            }} />
          </div>
          <style>{`
            @keyframes interstitial-progress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTIONNAIRE SECTION
  // ═══════════════════════════════════════════════════════════════════════════
  if (section === 'questionnaire') {
    const questions = [
      // Q1
      <div key="q1">
        <h3 style={{ fontFamily, fontWeight: 700, fontSize: 22, color: COLORS.offWhite, margin: '0 0 32px' }}>
          How many net-new opportunities did your team create last quarter?
        </h3>
        <input
          type="number"
          placeholder="e.g. 24"
          value={answers.opportunities}
          onChange={e => setAnswers(a => ({ ...a, opportunities: e.target.value }))}
          onKeyDown={e => e.key === 'Enter' && nextQuestion()}
          autoFocus
          style={{
            ...selectStyle,
            maxWidth: 200,
          }}
        />
      </div>,

      // Q2
      <div key="q2">
        <h3 style={{ fontFamily, fontWeight: 700, fontSize: 22, color: COLORS.offWhite, margin: '0 0 32px' }}>
          What's your average deal size?
        </h3>
        <select
          value={answers.dealSize}
          onChange={e => setAnswers(a => ({ ...a, dealSize: e.target.value }))}
          style={selectStyle}
        >
          <option value="" disabled>Select deal size</option>
          {DEAL_SIZE_OPTIONS.map(o => <option key={o} value={o} style={{ backgroundColor: COLORS.charcoal }}>{o}</option>)}
        </select>
      </div>,

      // Q3
      <div key="q3">
        <h3 style={{ fontFamily, fontWeight: 700, fontSize: 22, color: COLORS.offWhite, margin: '0 0 32px' }}>
          What's your average sales cycle right now?
        </h3>
        <select
          value={answers.salesCycle}
          onChange={e => setAnswers(a => ({ ...a, salesCycle: e.target.value }))}
          style={selectStyle}
        >
          <option value="" disabled>Select cycle length</option>
          {SALES_CYCLE_OPTIONS.map(o => <option key={o} value={o} style={{ backgroundColor: COLORS.charcoal }}>{o}</option>)}
        </select>
      </div>,

      // Q4 - Slider
      <div key="q4">
        <h3 style={{ fontFamily, fontWeight: 700, fontSize: 22, color: COLORS.offWhite, margin: '0 0 32px' }}>
          What percentage of deals stall between first meeting and proposal?
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="range"
              min={0}
              max={100}
              value={answers.stallRate}
              onChange={e => setAnswers(a => ({ ...a, stallRate: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: COLORS.oxide, height: 44, cursor: 'pointer' }}
            />
          </div>
          <span style={{
            fontFamily, fontWeight: 700, fontSize: 24, color: COLORS.oxide,
            minWidth: 60, textAlign: 'right',
          }}>
            {answers.stallRate}%
          </span>
        </div>
      </div>,

      // Q5
      <div key="q5">
        <h3 style={{ fontFamily, fontWeight: 700, fontSize: 22, color: COLORS.offWhite, margin: '0 0 32px' }}>
          How often do your deals close without a second meeting?
        </h3>
        <select
          value={answers.singleMeetingClose}
          onChange={e => setAnswers(a => ({ ...a, singleMeetingClose: e.target.value }))}
          style={selectStyle}
        >
          <option value="" disabled>Select frequency</option>
          {SINGLE_MEETING_OPTIONS.map(o => <option key={o} value={o} style={{ backgroundColor: COLORS.charcoal }}>{o}</option>)}
        </select>
      </div>,

      // Q6
      <div key="q6">
        <h3 style={{ fontFamily, fontWeight: 700, fontSize: 22, color: COLORS.offWhite, margin: '0 0 32px' }}>
          Who's primarily responsible for closing new business right now?
        </h3>
        <select
          value={answers.whoCloses}
          onChange={e => setAnswers(a => ({ ...a, whoCloses: e.target.value }))}
          style={selectStyle}
        >
          <option value="" disabled>Select answer</option>
          {WHO_CLOSES_OPTIONS.map(o => <option key={o} value={o} style={{ backgroundColor: COLORS.charcoal }}>{o}</option>)}
        </select>
      </div>,
    ]

    return (
      <div style={containerStyle}>
        {/* Progress bar */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, backgroundColor: 'rgba(215,218,221,0.1)', zIndex: 10 }}>
          <div style={{
            height: '100%',
            backgroundColor: COLORS.teal,
            width: `${((questionIndex + 1) / 6) * 100}%`,
            transition: 'width 300ms ease-out',
          }} />
        </div>

        <div style={{
          ...contentWrap,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={sectionTransition}>
            {questions[questionIndex]}

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
              {questionIndex > 0 && (
                <button
                  onClick={prevQuestion}
                  style={{
                    background: 'none', border: 'none', color: COLORS.secondary,
                    fontSize: 14, fontFamily, cursor: 'pointer', fontWeight: 300,
                  }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={nextQuestion}
                disabled={!canAdvance() || transitioning}
                style={{
                  ...buttonStyle,
                  opacity: canAdvance() ? 1 : 0.4,
                  cursor: canAdvance() ? 'pointer' : 'default',
                }}
                onMouseEnter={e => canAdvance() && (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                {questionIndex === 5 ? 'See results' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS SECTION
  // ═══════════════════════════════════════════════════════════════════════════
  const resultCards: Array<{
    status: Status
    title: string
    copy: string
    benchmark: string
  }> = [
    {
      status: velocityStatus,
      title: 'Pipeline Velocity',
      copy: VELOCITY_COPY[velocityStatus],
      benchmark: 'Mid-market deals average 90-180 days. 43% of sales leaders say cycles got longer in the past year. Source: Outreach/Martal 2025',
    },
    {
      status: midprocessStatus,
      title: 'Mid-Process Health',
      copy: MIDPROCESS_COPY[midprocessStatus],
      benchmark: '86% of deals experience at least one stall. Buyers are 61% through their journey before first seller contact. Source: Forrester / 6sense 2025',
    },
    {
      status: gtmStatus,
      title: 'GTM Dependency',
      copy: GTM_COPY[gtmStatus],
      benchmark: 'Founders without GTM systems spend 30-40% of their week on revenue activity. Referrals close at 26% vs. significantly lower for cold outreach. Source: Era internal / Landbase 2025',
    },
  ]

  return (
    <div style={containerStyle}>
      <div style={{ ...contentWrap, paddingTop: 80, paddingBottom: 80 }}>
        <div style={sectionTransition}>
          {/* ERA wordmark */}
          <div style={{ marginBottom: 48 }}>
            <span style={{
              fontFamily, fontWeight: 700, fontSize: 12, letterSpacing: '0.3em',
              color: COLORS.oxide,
            }}>ERA</span>
          </div>

          <div style={{
            fontFamily, fontWeight: 700, fontSize: 9, letterSpacing: '0.15em',
            color: COLORS.teal, textTransform: 'uppercase' as const, marginBottom: 12,
          }}>
            YOUR BENCHMARK RESULTS
          </div>

          <h2 style={{
            fontFamily, fontWeight: 700, fontSize: 28, color: COLORS.offWhite,
            margin: '0 0 40px',
          }}>
            Three dimensions. Here's where you stand.
          </h2>

          {/* Result cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            marginBottom: 40,
          }}>
            {resultCards.map((card, i) => (
              <div
                key={card.title}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(215,218,221,0.12)',
                  borderLeft: `4px solid ${STATUS_COLOR[card.status]}`,
                  padding: 24,
                  borderRadius: 2,
                  opacity: resultsVisible[i] ? 1 : 0,
                  transform: resultsVisible[i] ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 300ms ease-out, transform 300ms ease-out',
                }}
              >
                <div style={{
                  fontFamily, fontWeight: 700, fontSize: 10, letterSpacing: '0.15em',
                  color: STATUS_COLOR[card.status], textTransform: 'uppercase' as const,
                  marginBottom: 8,
                }}>
                  {card.status}
                </div>
                <div style={{
                  fontFamily, fontWeight: 700, fontSize: 18, color: COLORS.offWhite,
                  marginBottom: 12,
                }}>
                  {card.title}
                </div>
                <div style={{
                  fontFamily, fontWeight: 300, fontSize: 14, color: COLORS.offWhite,
                  lineHeight: 1.5, marginBottom: 16,
                }}>
                  {card.copy}
                </div>
                <div style={{
                  borderTop: `1px solid ${COLORS.divider}33`,
                  paddingTop: 12,
                  fontSize: 11, fontStyle: 'italic', color: COLORS.secondary,
                  lineHeight: 1.5,
                }}>
                  {card.benchmark}
                </div>
              </div>
            ))}
          </div>

          {/* Summary line */}
          <p style={{
            fontFamily, fontWeight: 300, fontSize: 16, color: COLORS.offWhite,
            textAlign: 'center', maxWidth: 600, margin: '0 auto 64px', lineHeight: 1.5,
          }}>
            {summaryLine}
          </p>

          {/* Email capture */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(215,218,221,0.12)',
            padding: 32,
            borderRadius: 2,
            maxWidth: 500,
            margin: '0 auto 32px',
          }}>
            {!submitted ? (
              <>
                <h3 style={{
                  fontFamily, fontWeight: 700, fontSize: 22, color: COLORS.offWhite,
                  margin: '0 0 12px',
                }}>
                  Want to compare notes?
                </h3>
                <p style={{
                  fontFamily, fontWeight: 300, fontSize: 14, color: COLORS.secondary,
                  maxWidth: 500, margin: '0 0 24px', lineHeight: 1.5,
                }}>
                  We run a quarterly roundtable for mid-market revenue leaders working through the same problems. No pitch, no follow-up sequence. Just operators comparing notes.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={emailName}
                    onChange={e => setEmailName(e.target.value)}
                    style={{ ...selectStyle }}
                  />
                  <input
                    type="email"
                    placeholder="your@company.com"
                    value={emailAddress}
                    onChange={e => setEmailAddress(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                    style={{ ...selectStyle }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={submitting || !emailName.trim() || !emailAddress.trim()}
                    style={{
                      ...buttonStyle,
                      backgroundColor: COLORS.magenta,
                      width: '100%',
                      opacity: (!emailName.trim() || !emailAddress.trim()) ? 0.4 : 1,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
                  >
                    {submitting ? 'Sending...' : 'Add me to the list'}
                  </button>
                </div>
              </>
            ) : (
              <p style={{
                fontFamily, fontWeight: 300, fontSize: 14, color: COLORS.teal,
                margin: 0,
              }}>
                You're on the list. We'll reach out when the next one's scheduled.
              </p>
            )}
          </div>

          {/* Retake link */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={retake}
              style={{
                background: 'none', border: 'none', color: COLORS.teal,
                fontSize: 14, fontFamily, cursor: 'pointer', fontWeight: 300,
              }}
            >
              Retake the benchmark →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
