import { useEffect } from 'react'
import '../styles/v4-tokens.css'
import {
  RevenueSignalScoreHero,
  ScoreAnatomy,
  SignalConnectionProjection,
} from '../components/revenueSignal'
import { SectionOpener } from '../components/audit/SectionOpener'
import { AuditRoadmap } from '../components/audit/AuditRoadmap'
import { stubAudit } from '../data/audits/_stub-example'
import {
  FONT,
  LIGHT,
  ThemeContext,
  loadBetterUpFonts,
  useThemeState,
} from './betterup/theme'

/**
 * Gated stub route — proves the score template renders any AuditInstance
 * without touching the scoring module or the reusable components. Linked from
 * nowhere; reachable only by direct URL.
 */
export default function StubAuditExample() {
  const theme = useThemeState()

  useEffect(() => {
    loadBetterUpFonts()
  }, [])

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className="v4-root"
        style={{
          background: LIGHT.bg,
          minHeight: '100vh',
          color: LIGHT.text,
          fontFamily: FONT.body,
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 32px 120px' }}>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: LIGHT.rust,
              marginBottom: 16,
            }}
          >
            Stub Audit · {stubAudit.companyName}
          </div>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 14,
              color: LIGHT.textMuted,
              maxWidth: 640,
              marginTop: 0,
              marginBottom: 40,
            }}
          >
            This page renders the Revenue Signal Score template for the stub audit instance.
            It exists to verify the template is fully data-driven. No content edits, no overrides.
          </p>

          <RevenueSignalScoreHero
            scores={stubAudit.currentScores}
            anchorTargetId="score"
            verdictOverride={stubAudit.verdictOverride}
          />
          <ScoreAnatomy scores={stubAudit.currentScores} />

          {stubAudit.openers?.leaders && (
            <div style={{ marginTop: 64 }}>
              <SectionOpener {...stubAudit.openers.leaders} />
            </div>
          )}

          <SignalConnectionProjection
            currentScores={stubAudit.currentScores}
            projectedScores={stubAudit.projectedScores}
          />

          {stubAudit.roadmap && (
            <div style={{ marginTop: 64 }}>
              <AuditRoadmap {...stubAudit.roadmap} />
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}
