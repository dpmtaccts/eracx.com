import { useState } from 'react'
import { FONT, useTheme } from '../../pages/betterup/theme'
import { getScoreBand, getBandColor } from '../../lib/buyerTrustScore'
import { Disclosure } from './Disclosure'

const INK = '#0A0A0A'
const HOT = '#E6195F'
const MUTED = 'rgba(10, 10, 10, 0.5)'
const PARCHMENT = '#F4F1EA'
const CREAM_WHITE = '#FFFFFF'

export type TShirtSize = 'small' | 'medium' | 'large'

export type RoadmapStageId = 'mvp' | 'then' | 'full-build'

export type RoadmapStage = {
  id: RoadmapStageId
  eyebrowOverride?: string
  headline: string
  scope: string
  size: TShirtSize
  duration: string
  scoreTarget: {
    from: number
    to: number
    band: string
  }
  deliverables: readonly string[]
  pipelineImpact?: string
}

export type AuditRoadmapProps = {
  sectionEyebrow?: string
  sectionHeadline: string
  /** Optional. Most audits omit it now that the trajectory spine carries the intro work. */
  sectionIntro?: string
  currentScore: number
  currentBand: string
  stages: readonly [RoadmapStage, RoadmapStage, RoadmapStage]
}

const DEFAULT_EYEBROWS: Record<RoadmapStageId, string> = {
  mvp: 'If you do one thing',
  then: 'What unlocks next',
  'full-build': 'The full build',
}

const SIZE_LABEL: Record<TShirtSize, { letter: string; word: string }> = {
  small: { letter: 'S', word: 'Small' },
  medium: { letter: 'M', word: 'Medium' },
  large: { letter: 'L', word: 'Large' },
}

const SIZE_BG: Record<TShirtSize, string> = {
  small: INK,
  medium: HOT,
  large: '#88122E',
}

type StageWeight = 'heavy' | 'medium' | 'light'
const STAGE_WEIGHT: Record<RoadmapStageId, StageWeight> = {
  mvp: 'heavy',
  then: 'medium',
  'full-build': 'light',
}

// v4 treatment: parchment ground for warmth; full-width section; ink + magenta
// + muted borders. Then and Full Build collapse by default behind disclosure.
export function AuditRoadmap(props: AuditRoadmapProps) {
  const { palette } = useTheme()

  for (const stage of props.stages) {
    if (stage.deliverables.length === 0 || stage.deliverables.length > 5) {
      const msg = `AuditRoadmap: stage "${stage.id}" has ${stage.deliverables.length} deliverables. Allowed range is 1-5.`
      if (import.meta.env.DEV) {
        throw new Error(msg)
      }
      if (typeof console !== 'undefined') console.warn(msg)
    }
  }

  const sectionEyebrow = props.sectionEyebrow ?? 'What to build'

  return (
    <div
      style={{
        background: PARCHMENT,
        margin: '0 calc(-1 * (50vw - 50%)) 56px',
        padding: '64px max(32px, calc(50vw - 480px))',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 32, maxWidth: 760 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          ▶︎·{sectionEyebrow}
        </div>
        <h2
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(40px, 7vw, 96px)',
            fontWeight: 400,
            lineHeight: 0.95,
            color: palette.text,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {props.sectionHeadline}
        </h2>
        {props.sectionIntro && (
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 18,
              lineHeight: 1.55,
              color: palette.text,
              margin: '20px 0 0',
              maxWidth: 600,
            }}
          >
            {props.sectionIntro}
          </p>
        )}
      </div>

      {/* Score trajectory is the visual spine: it precedes the stage blocks
         so each stage anchors visually to the trajectory node above it. */}
      <ScoreTrajectory
        currentScore={props.currentScore}
        currentBand={props.currentBand}
        stages={props.stages}
      />

      {/* Stage blocks — MVP expanded; Then and Full Build collapsed by default.
         Each stage carries a dashed connector that drops from its corresponding
         trajectory node above (POST-MVP → MVP, POST-THEN → Then, POST-FULL BUILD → Full Build). */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 0 }}>
        {props.stages.map((stage, i) => (
          <StageWithConnector key={stage.id} stage={stage} index={i} />
        ))}
      </div>
    </div>
  )
}

/**
 * Wraps a stage block with a dashed vertical connector positioned above its
 * top edge to align with the corresponding trajectory node. The trajectory
 * is a 4-column grid; nodes sit at column centers (12.5%, 37.5%, 62.5%, 87.5%).
 * Stage 0 (MVP) → node 1 (POST-MVP, 37.5%).
 * Stage 1 (Then) → node 2 (POST-THEN, 62.5%).
 * Stage 2 (Full Build) → node 3 (POST-FULL BUILD, 87.5%).
 */
const STAGE_CONNECTOR_OFFSET = ['37.5%', '62.5%', '87.5%']
function StageWithConnector({ stage, index }: { stage: RoadmapStage; index: number }) {
  return (
    <div style={{ position: 'relative', paddingTop: 32 }}>
      {/* Dashed connector dropping from the trajectory node */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: STAGE_CONNECTOR_OFFSET[index],
          top: 0,
          height: 32,
          width: 0,
          borderLeft: `0.5px dashed ${HOT}`,
          transform: 'translateX(-0.5px)',
        }}
      />
      {/* Filled square marker at the stage block's top edge */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: STAGE_CONNECTOR_OFFSET[index],
          top: 28,
          width: 6,
          height: 6,
          background: HOT,
          transform: 'translateX(-3px)',
        }}
      />
      <StageBlockWrapper stage={stage} />
    </div>
  )
}

// MVP stays expanded by default. Then and Full Build collapse to summary row;
// reader expands to see scope, deliverables, pipeline impact.
function StageBlockWrapper({ stage }: { stage: RoadmapStage }) {
  const weight = STAGE_WEIGHT[stage.id]
  const startsCollapsed = weight !== 'heavy'
  const [expanded, setExpanded] = useState(!startsCollapsed)

  if (!startsCollapsed) {
    return <StageBlock stage={stage} weight={weight} />
  }

  return (
    <CollapsibleStageBlock
      stage={stage}
      weight={weight}
      expanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
    />
  )
}

function StageBlock({ stage, weight }: { stage: RoadmapStage; weight: StageWeight }) {
  const { palette } = useTheme()
  const borderWidth = weight === 'heavy' ? 4 : weight === 'medium' ? 3 : 2
  const borderColor = weight === 'heavy' ? INK : weight === 'medium' ? HOT : MUTED
  const padding = weight === 'heavy' ? '24px 28px' : weight === 'medium' ? '20px 24px' : '18px 22px'

  const eyebrow = stage.eyebrowOverride ?? DEFAULT_EYEBROWS[stage.id]

  return (
    <div
      style={{
        background: CREAM_WHITE,
        border: `1px solid ${palette.rule}`,
        borderLeft: `${borderWidth}px solid ${borderColor}`,
        padding,
      }}
    >
      <StageHeader stage={stage} weight={weight} eyebrow={eyebrow} />
      <MetadataStrip stage={stage} weight={weight} />
      <DeliverablesList stage={stage} weight={weight} />
    </div>
  )
}

function CollapsibleStageBlock({
  stage,
  weight,
  expanded,
  onToggle,
}: {
  stage: RoadmapStage
  weight: StageWeight
  expanded: boolean
  onToggle: () => void
}) {
  const { palette } = useTheme()
  const borderWidth = weight === 'heavy' ? 4 : weight === 'medium' ? 3 : 2
  const borderColor = weight === 'heavy' ? INK : weight === 'medium' ? HOT : MUTED
  const padding = weight === 'heavy' ? '24px 28px' : weight === 'medium' ? '20px 24px' : '18px 22px'

  const eyebrow = stage.eyebrowOverride ?? DEFAULT_EYEBROWS[stage.id]

  return (
    <div
      style={{
        background: CREAM_WHITE,
        border: `1px solid ${palette.rule}`,
        borderLeft: `${borderWidth}px solid ${borderColor}`,
        padding,
      }}
    >
      <StageHeader stage={stage} weight={weight} eyebrow={eyebrow} />

      {/* Compact summary row visible even when collapsed */}
      <CompactSummary stage={stage} weight={weight} />

      <div style={{ marginTop: 14 }}>
        <Disclosure
          label={expanded ? 'Collapse' : 'Expand details'}
          open={expanded}
          onToggle={onToggle}
        >
          <MetadataStrip stage={stage} weight={weight} />
          <DeliverablesList stage={stage} weight={weight} />
        </Disclosure>
      </div>
    </div>
  )
}

function StageHeader({
  stage,
  weight,
  eyebrow,
}: {
  stage: RoadmapStage
  weight: StageWeight
  eyebrow: string
}) {
  const { palette } = useTheme()
  const headlineSize = weight === 'heavy' ? 32 : weight === 'medium' ? 24 : 22
  const headlineColor = weight === 'light' ? palette.textMuted : palette.text
  const eyebrowColor = weight === 'heavy' ? INK : weight === 'medium' ? HOT : palette.textDim
  return (
    <>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: eyebrowColor,
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        {eyebrow}
      </div>
      <h3
        style={{
          fontFamily: FONT.display,
          fontSize: headlineSize,
          fontWeight: 400,
          lineHeight: 1.15,
          color: headlineColor,
          margin: '0 0 12px',
          letterSpacing: '-0.01em',
        }}
      >
        {stage.headline}
      </h3>
      {weight === 'heavy' && (
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 15,
            lineHeight: 1.55,
            color: palette.textMuted,
            margin: '0 0 20px',
            maxWidth: 720,
          }}
        >
          {stage.scope}
        </p>
      )}
    </>
  )
}

function CompactSummary({ stage, weight }: { stage: RoadmapStage; weight: StageWeight }) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        alignItems: 'baseline',
        flexWrap: 'wrap',
        paddingTop: 4,
        color: palette.textMuted,
        fontFamily: FONT.mono,
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 600,
      }}
    >
      <span>{SIZE_LABEL[stage.size].word}</span>
      <span>{stage.duration}</span>
      <span>
        {stage.scoreTarget.from} → {stage.scoreTarget.to}
      </span>
      {weight !== 'heavy' && stage.pipelineImpact && (
        <span style={{ textTransform: 'none', letterSpacing: '0.02em', fontFamily: FONT.body, fontSize: 13 }}>
          {stage.pipelineImpact}
        </span>
      )}
    </div>
  )
}

function MetadataStrip({ stage, weight }: { stage: RoadmapStage; weight: StageWeight }) {
  const { palette } = useTheme()
  const labelStyle = {
    fontFamily: FONT.mono,
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: palette.textDim,
    fontWeight: 600,
    marginBottom: 6,
  }
  const valueStyle = {
    fontFamily: FONT.display,
    fontSize: weight === 'heavy' ? 22 : weight === 'medium' ? 19 : 17,
    color: palette.text,
    lineHeight: 1.1,
    fontWeight: 400,
    letterSpacing: '-0.005em',
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 16,
        padding: '16px 0',
        borderTop: `1px solid ${palette.rule}`,
        borderBottom: `1px solid ${palette.rule}`,
        marginBottom: 18,
      }}
    >
      <SizeCell size={stage.size} />
      <div>
        <div style={labelStyle}>Duration</div>
        <div style={valueStyle}>{stage.duration}</div>
      </div>
      <div>
        <div style={labelStyle}>Score moves</div>
        <div style={valueStyle}>
          {stage.scoreTarget.from} → {stage.scoreTarget.to}
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            color: palette.textDim,
            marginTop: 4,
            letterSpacing: '0.04em',
          }}
        >
          {stage.scoreTarget.band}
        </div>
      </div>
      {stage.pipelineImpact && (
        <div>
          <div style={labelStyle}>Pipeline impact</div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 13,
              color: palette.text,
              lineHeight: 1.45,
            }}
          >
            {stage.pipelineImpact}
          </div>
        </div>
      )}
    </div>
  )
}

function SizeCell({ size }: { size: TShirtSize }) {
  const meta = SIZE_LABEL[size]
  const bg = SIZE_BG[size]
  return (
    <div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: MUTED,
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        Size
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          aria-label={`T-shirt size ${meta.word}`}
          style={{
            width: 24,
            height: 24,
            background: bg,
            color: CREAM_WHITE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT.mono,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {meta.letter}
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
            fontWeight: 600,
          }}
        >
          {meta.word}
        </div>
      </div>
    </div>
  )
}

function DeliverablesList({ stage, weight }: { stage: RoadmapStage; weight: StageWeight }) {
  const { palette } = useTheme()
  const counterColor = weight === 'light' ? palette.textDim : HOT
  return (
    <div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: counterColor,
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        What you get
      </div>
      <ol
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {stage.deliverables.slice(0, 5).map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              fontFamily: FONT.body,
              fontSize: 14,
              lineHeight: 1.55,
              color: palette.text,
            }}
          >
            <span
              style={{
                flex: '0 0 auto',
                fontFamily: FONT.mono,
                fontSize: 11,
                color: counterColor,
                fontWeight: 600,
                paddingTop: 2,
                minWidth: 22,
                letterSpacing: '0.04em',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ScoreTrajectory({
  currentScore,
  currentBand,
  stages,
}: {
  currentScore: number
  currentBand: string
  stages: readonly [RoadmapStage, RoadmapStage, RoadmapStage]
}) {
  const { palette } = useTheme()
  const nodes = [
    { label: 'Now', score: currentScore, band: currentBand, color: getBandColor(currentScore) },
    {
      label: 'Post-MVP',
      score: stages[0].scoreTarget.to,
      band: getScoreBand(stages[0].scoreTarget.to).label,
      color: getBandColor(stages[0].scoreTarget.to),
    },
    {
      label: 'Post-Then',
      score: stages[1].scoreTarget.to,
      band: getScoreBand(stages[1].scoreTarget.to).label,
      color: getBandColor(stages[1].scoreTarget.to),
    },
    {
      label: 'Post-Full Build',
      score: stages[2].scoreTarget.to,
      band: getScoreBand(stages[2].scoreTarget.to).label,
      color: getBandColor(stages[2].scoreTarget.to),
    },
  ]

  return (
    <div
      style={{
        marginTop: 0,
        marginBottom: 0,
        background: CREAM_WHITE,
        border: `1px solid ${palette.rule}`,
        padding: '22px 28px',
      }}
    >
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: palette.textDim,
          fontWeight: 600,
          marginBottom: 18,
        }}
      >
        Score trajectory
      </div>
      <div style={{ position: 'relative', paddingBottom: 4 }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '6%',
            right: '6%',
            top: 14,
            height: 1,
            background: INK,
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${nodes.length}, 1fr)`,
            position: 'relative',
          }}
        >
          {nodes.map((node, i) => (
            <div
              key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: node.color,
                  color: node.color === INK ? CREAM_WHITE : INK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  border: `2px solid ${PARCHMENT}`,
                  position: 'relative',
                  zIndex: 1,
                  letterSpacing: '0.04em',
                }}
              >
                {node.score}
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: palette.textDim,
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                {node.label}
              </div>
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: 11,
                  color: palette.textMuted,
                  textAlign: 'center',
                }}
              >
                {node.band}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Condensed version for the SUMMARY view: MVP expanded; one-liners for Then/Full Build. */
export function AuditRoadmapCondensed({ roadmap }: { roadmap: AuditRoadmapProps }) {
  const { palette } = useTheme()
  const [mvp, then, fullBuild] = roadmap.stages

  return (
    <div
      style={{
        background: PARCHMENT,
        margin: '0 calc(-1 * (50vw - 50%)) 56px',
        padding: '48px max(32px, calc(50vw - 480px))',
      }}
    >
      <div style={{ marginBottom: 28, maxWidth: 760 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          ▶︎·{roadmap.sectionEyebrow ?? 'What to build'}
        </div>
        <h2
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 400,
            lineHeight: 0.95,
            color: palette.text,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {roadmap.sectionHeadline}
        </h2>
      </div>

      <StageBlock stage={mvp} weight="heavy" />

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CondensedLine label="And then" headline={then.headline} accent={HOT} />
        <CondensedLine label="And then" headline={fullBuild.headline} accent={MUTED} />
      </div>

      <ScoreTrajectory
        currentScore={roadmap.currentScore}
        currentBand={roadmap.currentBand}
        stages={roadmap.stages}
      />
    </div>
  )
}

function CondensedLine({
  label,
  headline,
  accent,
}: {
  label: string
  headline: string
  accent: string
}) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'baseline',
        background: CREAM_WHITE,
        border: `1px solid ${palette.rule}`,
        borderLeft: `2px solid ${accent}`,
        padding: '12px 18px',
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: palette.textDim,
          fontWeight: 600,
          flex: '0 0 auto',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT.display,
          fontSize: 16,
          color: palette.text,
          lineHeight: 1.25,
          letterSpacing: '-0.005em',
        }}
      >
        {headline}
      </span>
    </div>
  )
}
