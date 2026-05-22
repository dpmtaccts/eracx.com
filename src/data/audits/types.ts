import type { DiagnosticScores } from '../../lib/buyerTrustScore'
import type { SectionOpenerProps } from '../../components/audit/SectionOpener'
import type { AuditRoadmapProps } from '../../components/audit/AuditRoadmap'

export type AuditCompanyFacts = {
  founded: string
  revenue: string
  valuation: string
  employees: string
  primaryBuyer: string
  notableClients: string
}

export type AuditSection = {
  id: string
  label: string
}

/**
 * Per-section opener content. Keyed by section id on the audit instance.
 * `sectionEyebrow` is derived at render time from `sectionName` and
 * `sectionScore`; data layer supplies the name, score, headline, and the
 * three blocks.
 */
export type SectionOpenerData = Omit<SectionOpenerProps, 'sectionEyebrow'>


export type AuditInstance = {
  slug: string
  companyName: string
  reportDate: string
  companyFacts: AuditCompanyFacts
  currentScores: DiagnosticScores
  projectedScores: DiagnosticScores
  sections: AuditSection[]
  /**
   * Optional override for the verdict sub-line in the score hero. If unset,
   * the hero falls back to the default copy keyed off the score's band.
   */
  verdictOverride?: string
  /**
   * Optional per-section opener content keyed by section id (e.g. "cascade",
   * "leaders", "signals", "mirror", "audience"). Sections without an opener
   * render the existing detailed analysis without a four-block intro.
   */
  openers?: Record<string, SectionOpenerData>
  /**
   * Per-instance prescriptive roadmap (MVP, Then, Full Build). When present,
   * the audit replaces the legacy 90-day program section with this template.
   */
  roadmap?: AuditRoadmapProps
}
