import type { AuditRoadmapProps } from '../../components/audit/AuditRoadmap'

/**
 * Prescriptive roadmap for the BetterUp audit. Replaces the legacy 90-day
 * three-phase program. Durations are cumulative program length when stopping
 * at that stage (MVP only = 4 weeks, MVP + Then = 10 weeks, Full Build = 12
 * weeks of the full scope).
 *
 * Score targets are declared per stage, not computed from component-score
 * deltas. When the deep scoring model lands, these can be regenerated from
 * the underlying diagnostic shifts.
 */
export const BETTERUP_ROADMAP: AuditRoadmapProps = {
  sectionHeadline: 'How the score moves.',
  currentScore: 32,
  currentBand: 'Leaky',
  stages: [
    {
      id: 'mvp',
      headline: "Reframe the CEO's content from philosophy to operational outcomes.",
      scope:
        "The CEO's content engine is the single most important repair in the audit, so the work is to shift 60% of CEO posts from human-potential framing to retention, manager effectiveness, and coaching ROI, then build a CHRO 100 list of named enterprise buyers and engage substantively with their content before expecting any engagement back.",
      size: 'small',
      duration: '4 weeks',
      scoreTarget: {
        from: 32,
        to: 41,
        band: 'Leaky → Leaky (improving)',
      },
      deliverables: [
        '60/40 content reframe across 12 CEO posts in 4 weeks.',
        'CHRO 100 list with named enterprise buyers and engagement plan.',
        'Comment substantively on 30+ CHRO posts before expecting reciprocity.',
        'Weekly content calendar tied to retention, ROI, and manager effectiveness.',
        'Score re-measurement at week 4.',
      ],
      pipelineImpact: 'Recovers 4-6% of qualified-stage drag.',
    },
    {
      id: 'then',
      headline: 'Distribute the brand across 5-7 executive voices.',
      scope:
        "Once the CEO's content is landing, the next bottleneck is concentration, so the work is to activate the marketing leader, product leader, CSO, and 2 to 3 senior AEs with differentiated POVs on the buyer's actual problems, until the buyer encounters a chain of voices instead of a single megaphone.",
      size: 'medium',
      duration: '10 weeks total',
      scoreTarget: {
        from: 41,
        to: 51,
        band: 'Leaky → Holding (entering)',
      },
      deliverables: [
        'Content calendars for 4 additional executive voices.',
        'Differentiated POV framework per executive (no overlap).',
        'Coach ambassador program design with 5-10 named coaches.',
        'Competitive positioning content: BetterUp vs. CoachHub vs. Torch vs. Ezra.',
        'Score re-measurement at end of stage.',
      ],
      pipelineImpact: 'Recovers an additional 5-8% of drag.',
    },
    {
      id: 'full-build',
      headline: 'Close the chain across signal, content, and measurement.',
      scope:
        'The Full Build includes everything in MVP and Then, layered with four additional workstreams: pricing transparency introduced at the right altitude, AI mirror monitoring across the four major LLMs, an ROI framework that holds up in a CFO-ready budget justification, and engagement-quality reporting tied to named-buyer engagement rather than vanity metrics.',
      size: 'large',
      duration: '12 weeks total',
      scoreTarget: {
        from: 32,
        to: 58,
        band: 'Leaky → Holding',
      },
      deliverables: [
        'Everything in MVP and Then.',
        'Pricing transparency framework introduced at the right altitude.',
        'Agent monitoring across ChatGPT, Claude, Perplexity, Google AI Overview (quarterly).',
        'Named-buyer engagement quality reporting (not vanity metrics).',
        'ROI framework for CFO-ready budget justification.',
      ],
      pipelineImpact: 'Closes most of the 15-25% qualified-stage drag.',
    },
  ],
}
