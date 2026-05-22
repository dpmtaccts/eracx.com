import {
  MaximumImpactSection,
  MinimumImpactSection,
  NextTogetherSection,
  RecommendationSection,
} from '../BetterUpAudit'

// SUMMARY view renders ▶︎01 → ▶︎02 → ▶︎03 → ▶︎06. The ▶︎05 forensic record is
// hidden here; readers who want the full evidence chain switch to FULL. The
// score breakdown is reachable from the gauge drawer in ▶︎01, which makes the
// previous standalone ▶︎04 obsolete.
export function SummaryView() {
  return (
    <>
      <RecommendationSection />
      <MaximumImpactSection />
      <MinimumImpactSection />
      <NextTogetherSection />
    </>
  )
}
