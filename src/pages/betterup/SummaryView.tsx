import {
  MaximumImpactSection,
  MinimumImpactSection,
  NextTogetherSection,
  RecommendationSection,
} from '../BetterUpAudit'

// SUMMARY view renders ▶︎01 (the bento page that names the problems inline)
// → ▶︎03 (The Four Decisions) → ▶︎04 (The Four Motions) → ▶︎06 (the close).
// The ▶︎05 forensic record is hidden here; readers who want the full
// evidence chain switch to FULL.
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
