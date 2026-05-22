import {
  MaximumImpactSection,
  MinimumImpactSection,
  NextTogetherSection,
  ProblemsSection,
  RecommendationSection,
} from '../BetterUpAudit'

// SUMMARY view renders ▶︎01 → ▶︎02 (problems) → ▶︎03 (P1) → ▶︎04 (P2) → ▶︎06
// (the close). The ▶︎05 forensic record is hidden here; readers who want the
// full evidence chain switch to FULL. The score breakdown lives inline in
// the ▶︎01 bento, so the previous drawer is no longer needed.
export function SummaryView() {
  return (
    <>
      <RecommendationSection />
      <ProblemsSection />
      <MaximumImpactSection />
      <MinimumImpactSection />
      <NextTogetherSection />
    </>
  )
}
