import type { AuditInstance } from './types'

/**
 * Stub audit instance used to verify that the score template (Hero + Anatomy +
 * Projection) and SectionOpener render any AuditInstance with no template
 * changes.
 *
 * Scores tuned to land in Holding for the current snapshot and Aligned for
 * the projected snapshot. Includes a populated benchmark field so the dashed
 * sub-block inside the Standard block can be visually verified.
 */
export const stubAudit: AuditInstance = {
  slug: '_stub-example',
  companyName: 'Stub Example',
  reportDate: 'TBD',
  companyFacts: {
    founded: 'TBD',
    revenue: 'TBD',
    valuation: 'TBD',
    employees: 'TBD',
    primaryBuyer: 'TBD',
    notableClients: 'TBD',
  },
  currentScores: {
    brandCascade: 55,
    gtmSignalChain: 50,
    contentToPipeline: 60,
    aiMirror: 55,
  },
  projectedScores: {
    brandCascade: 75,
    gtmSignalChain: 70,
    contentToPipeline: 78,
    aiMirror: 65,
  },
  sections: [
    { id: 'summary', label: 'Summary' },
    { id: 'score', label: 'Score' },
    { id: 'leaders', label: 'Leaders' },
  ],
  openers: {
    leaders: {
      sectionName: 'The GTM Signal Chain',
      sectionScore: 50,
      sectionHeadline:
        'Only one of six profiles your buyer expects to find is visible.',
      problemStat: { value: '5/6', label: 'Profiles silent' },
      problemHeadline: "She finds the CEO. She doesn't find anyone else.",
      problemProse:
        'SVP Marketing posts 3 times in 12 months, all event promotion. Account managers and enterprise reps are silent. The chain of trust she expects to find is not there.',
      standardStat: { value: '5–7', label: 'Voices, not one' },
      standardHeadline: 'A chain of differentiated POVs the buyer can verify.',
      standardProse:
        'Marketing leader writes strategy. Sales leaders post deal patterns. AEs add customer substance. The buyer encounters a chain, not a megaphone.',
      benchmark: {
        company: 'Gong',
        logoLetter: 'G',
        behavior:
          'Senior AEs post original customer substance and product POVs every week. The CRO, VP Sales, and VP Marketing each carry a differentiated angle.',
        estimatedScore: 71,
        estimatedBand: 'Aligned',
      },
      actionHeadline: 'Distribute the brand across executives.',
      actionSteps: [
        'Activate 5–7 executive voices on LinkedIn.',
        'Build a CHRO 100 list and engage substantively first.',
        'Equip senior AEs to post original substance, not reposts.',
      ],
    },
  },
  roadmap: {
    sectionHeadline: 'A prescribed sequence for the stub. Same template.',
    sectionIntro:
      'Demonstrates the same MVP → Then → Full Build pattern with different scores and copy. No component changes required.',
    currentScore: 55,
    currentBand: 'Holding',
    stages: [
      {
        id: 'mvp',
        headline: 'Sharpen the highest-leverage signal first.',
        scope:
          'Pick the one signal break that drags the most pipeline. Fix it cleanly. Re-measure.',
        size: 'small',
        duration: '3 weeks',
        scoreTarget: { from: 55, to: 62, band: 'Holding (improving)' },
        deliverables: [
          'Identify the highest-leverage signal break.',
          'Ship one cleanly-scoped fix.',
          'Re-measure at week 3.',
        ],
        pipelineImpact: 'Recovers 3-5% of qualified-stage drag.',
      },
      {
        id: 'then',
        headline: 'Extend the fix across adjacent signals.',
        scope:
          'Apply the MVP pattern to two adjacent signals that share the same root cause.',
        size: 'medium',
        duration: '8 weeks total',
        scoreTarget: { from: 62, to: 70, band: 'Aligned (entering)' },
        deliverables: [
          'Extend pattern to two adjacent signals.',
          'Cross-functional review of the chain end to end.',
          'Re-measure at end of stage.',
        ],
        pipelineImpact: 'Recovers an additional 4-6% of drag.',
      },
      {
        id: 'full-build',
        headline: 'Close the full signal chain.',
        scope:
          'Includes MVP and Then plus closure across all four diagnostics. Measurement framework and quarterly cadence.',
        size: 'large',
        duration: '12 weeks total',
        scoreTarget: { from: 55, to: 73, band: 'Holding → Aligned' },
        deliverables: [
          'Everything in MVP and Then.',
          'Full diagnostic closure across the four signal instruments.',
          'Quarterly measurement cadence with named owners.',
        ],
        pipelineImpact: 'Closes most of the qualified-stage drag.',
      },
    ],
  },
}
