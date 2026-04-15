import { useState, useMemo, useEffect, useCallback } from 'react'
import { usePostHog } from '@posthog/react'
import GrowthSimulatorChart from '../components/GrowthSimulatorChart'
import SimulatorInputsComponent from '../components/SimulatorInputs'
import {
  computeSimulation,
  DEFAULT_INPUTS,
  type SimulatorInputs,
  type ToggleMode,
} from '../lib/simulatorEngine'

// ── Constants ───────────────────────────────────────────────────────────────

const COLORS = {
  charcoal: '#383838',
  offWhite: '#F6F5F2',
  teal: '#1FA7A2',
  oxide: '#B85C4A',
  gray: '#8A8A8A',
}

const FONT = "'Source Sans 3', sans-serif"

// ── Toggle Component (v12: Conventional scaling / System-led scaling) ───────

function ModeToggle({
  mode,
  onChange,
}: {
  mode: ToggleMode
  onChange: (m: ToggleMode) => void
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      marginBottom: 16,
    }}>
      <button
        onClick={() => onChange('conventional')}
        style={{
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: mode === 'conventional' ? 700 : 400,
          color: mode === 'conventional' ? COLORS.offWhite : COLORS.gray,
          backgroundColor: mode === 'conventional' ? COLORS.charcoal : 'transparent',
          border: `1px solid ${mode === 'conventional' ? COLORS.charcoal : '#D0CDC8'}`,
          borderRadius: '6px 0 0 6px',
          padding: '10px 24px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        Conventional scaling
      </button>
      <button
        onClick={() => onChange('system')}
        style={{
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: mode === 'system' ? 700 : 400,
          color: mode === 'system' ? COLORS.offWhite : COLORS.gray,
          backgroundColor: mode === 'system' ? COLORS.teal : 'transparent',
          border: `1px solid ${mode === 'system' ? COLORS.teal : '#D0CDC8'}`,
          borderRadius: '0 6px 6px 0',
          padding: '10px 24px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          marginLeft: -1,
        }}
      >
        System-led scaling
      </button>
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────

export default function GrowthSimulator() {
  const posthog = usePostHog()
  const [inputs, setInputs] = useState<SimulatorInputs>({ ...DEFAULT_INPUTS })

  useEffect(() => {
    document.title = 'Build Profitable Growth | Era'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'Model your GTM investment: see how cost structure, team shape, and growth approach compound over time. Compare conventional scaling vs. system-led scaling.')
    }

    if (!document.querySelector('link[href*="Source+Sans+3"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  const update = useCallback((patch: Partial<SimulatorInputs>) => {
    setInputs(prev => ({ ...prev, ...patch }))
  }, [])

  const output = useMemo(() => computeSimulation(inputs), [inputs])

  const handleToggle = useCallback((mode: ToggleMode) => {
    update({ toggleMode: mode })
    posthog?.capture('growth_simulator_mode_toggled', { mode })
  }, [update, posthog])

  const handleRevenueChange = useCallback((v: number) => {
    update({ revenueTarget: v })
  }, [update])

  const handleTimelineChange = useCallback((v: number) => {
    update({ timelineQuarters: v })
  }, [update])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.offWhite,
      fontFamily: FONT,
      fontWeight: 300,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderBottom: '1px solid #E0DDD8',
        backgroundColor: '#FFFFFF',
      }}>
        <a href="/" style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: '0.3em',
          color: COLORS.oxide, textDecoration: 'none',
        }}>
          ERA
        </a>
        <span style={{
          fontFamily: FONT, fontWeight: 300, fontSize: 11, color: COLORS.gray,
        }}>
          eracx.com
        </span>
      </div>

      {/* Page content */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px 24px',
      }}>
        {/* Header (v12: title change) */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 28,
            color: COLORS.charcoal,
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}>
            Build Profitable Growth
          </h1>
          <p style={{
            fontFamily: FONT,
            fontWeight: 300,
            fontSize: 15,
            color: COLORS.gray,
            margin: 0,
            maxWidth: 560,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.5,
          }}>
            Set your ambition. Watch the cost structure reshape. See the difference between conventional scaling and system-led scaling.
          </p>
        </div>

        {/* Toggle */}
        <ModeToggle mode={inputs.toggleMode} onChange={handleToggle} />

        {/* Chart */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          border: '1px solid #E0DDD8',
          padding: '20px 16px 12px',
          marginBottom: 28,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <GrowthSimulatorChart
            quarters={output.quarters}
            qoqLifts={output.qoqLifts}
            quarterlyCards={output.quarterlyCards}
            toggleMode={inputs.toggleMode}
            revenueTarget={inputs.revenueTarget}
            timelineQuarters={inputs.timelineQuarters}
            annotation={inputs.toggleMode === 'conventional' ? output.conventionalAnnotation : output.systemAnnotation}
            profitCallout={output.profitCallout}
            inflection={output.inflection}
            terminology={output.terminology}
            onRevenueTargetChange={handleRevenueChange}
            onTimelineChange={handleTimelineChange}
          />
        </div>

        {/* Input Modules */}
        <SimulatorInputsComponent
          inputs={inputs}
          insight={output.insight}
          profitComparison={output.profitComparison}
          inputAnnotation={output.inputAnnotation}
          terminology={output.terminology}
          onUpdate={update}
        />
      </div>
    </div>
  )
}
