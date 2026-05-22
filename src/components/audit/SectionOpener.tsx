import { FONT, useTheme } from '../../pages/betterup/theme'

const INK = '#0A0A0A'
const HOT = '#E6195F'
const YELLOW = '#F4C430'
const CREAM_WHITE = '#FFFFFF'

export type SectionOpenerStat = {
  value: string
  label: string
}

export type SectionBenchmarkBand =
  | 'Broken'
  | 'Leaky'
  | 'Holding'
  | 'Aligned'
  | 'Best in class'

export type SectionBenchmark = {
  company: string
  logoLetter?: string
  logoSrc?: string
  behavior: string
  estimatedScore: number
  estimatedBand: SectionBenchmarkBand
}

export type SectionOpenerProps = {
  sectionName: string
  sectionScore?: number
  sectionEyebrow?: string
  sectionHeadline: string

  problemEyebrow?: string
  problemStat: SectionOpenerStat
  problemHeadline: string
  problemProse: string

  standardEyebrow?: string
  standardStat: SectionOpenerStat
  standardHeadline: string
  standardProse: string

  benchmark?: SectionBenchmark
  benchmarkEyebrow?: string

  actionEyebrow?: string
  actionHeadline: string
  actionSteps: readonly string[]

  /** When the surrounding section ground is dark, flips the section eyebrow
   *  and headline to white. The three internal blocks are already ground-aware. */
  ground?: 'light' | 'dark'
}

const DEFAULT_PROBLEM_EYEBROW = 'What your buyer finds today'
const DEFAULT_STANDARD_EYEBROW = "What it looks like when it's working"
const DEFAULT_ACTION_EYEBROW = 'What to do first'

export function SectionOpener(props: SectionOpenerProps) {
  const { palette } = useTheme()

  if (props.actionSteps.length === 0 || props.actionSteps.length > 3) {
    const msg = `SectionOpener: actionSteps must contain 1 to 3 entries, received ${props.actionSteps.length}.`
    if (import.meta.env.DEV) {
      throw new Error(msg)
    }
    if (typeof console !== 'undefined') console.warn(msg)
  }
  const steps = props.actionSteps.slice(0, 3)

  const eyebrow =
    props.sectionEyebrow ??
    (props.sectionScore != null
      ? `${props.sectionName.toUpperCase()} · ${props.sectionScore}/100`
      : props.sectionName.toUpperCase())

  const isDark = props.ground === 'dark'
  const headerEyebrowColor = isDark ? 'rgba(255, 255, 255, 0.6)' : palette.textDim
  const headerHeadlineColor = isDark ? '#FFFFFF' : palette.text

  return (
    <div style={{ marginBottom: 56 }}>
      {/* 1. Section header — mono eyebrow + Anton mega headline */}
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: headerEyebrowColor,
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          ▶︎·{eyebrow}
        </div>
        <h2
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(40px, 7vw, 96px)',
            fontWeight: 400,
            lineHeight: 0.95,
            color: headerHeadlineColor,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            margin: 0,
            maxWidth: 1000,
          }}
        >
          {props.sectionHeadline}
        </h2>
      </div>

      {/* 2-4. Three blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ProblemBlock
          eyebrow={props.problemEyebrow ?? DEFAULT_PROBLEM_EYEBROW}
          stat={props.problemStat}
          headline={props.problemHeadline}
          prose={props.problemProse}
        />
        <StandardBlock
          eyebrow={props.standardEyebrow ?? DEFAULT_STANDARD_EYEBROW}
          stat={props.standardStat}
          headline={props.standardHeadline}
          prose={props.standardProse}
          benchmark={props.benchmark}
          benchmarkEyebrow={props.benchmarkEyebrow}
        />
        <ActionBlock
          eyebrow={props.actionEyebrow ?? DEFAULT_ACTION_EYEBROW}
          headline={props.actionHeadline}
          steps={steps}
        />
      </div>

      {/* Full analysis anchor */}
      <div
        style={{
          marginTop: 32,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255, 255, 255, 0.5)' : palette.textDim,
            fontWeight: 600,
          }}
        >
          ↓ Full analysis
        </div>
      </div>
    </div>
  )
}

function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        fontFamily: FONT.mono,
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color,
        fontWeight: 600,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  )
}

function StatBlock({
  stat,
  numberColor,
  labelColor,
}: {
  stat: SectionOpenerStat
  numberColor: string
  labelColor: string
}) {
  return (
    <div style={{ flex: '0 0 auto', minWidth: 110, paddingRight: 8 }}>
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: 36,
          fontWeight: 400,
          lineHeight: 1.02,
          color: numberColor,
          letterSpacing: '-0.01em',
          marginBottom: 8,
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: labelColor,
          fontWeight: 600,
        }}
      >
        {stat.label}
      </div>
    </div>
  )
}

function BlockBody({
  headline,
  prose,
  textColor,
  textMuted,
}: {
  headline: string
  prose: string
  textColor: string
  textMuted: string
}) {
  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <h3
        style={{
          fontFamily: FONT.display,
          fontSize: 19,
          fontWeight: 400,
          lineHeight: 1.2,
          color: textColor,
          margin: '0 0 10px',
          letterSpacing: '-0.005em',
        }}
      >
        {headline}
      </h3>
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: 14,
          lineHeight: 1.55,
          color: textMuted,
          margin: 0,
        }}
      >
        {prose}
      </p>
    </div>
  )
}

// Problem block: ink ground with white text and 4px hot magenta left border
function ProblemBlock({
  eyebrow,
  stat,
  headline,
  prose,
}: {
  eyebrow: string
  stat: SectionOpenerStat
  headline: string
  prose: string
}) {
  return (
    <div
      style={{
        background: INK,
        borderLeft: `4px solid ${HOT}`,
        padding: '20px 22px',
        color: CREAM_WHITE,
      }}
    >
      <Eyebrow color={HOT}>{eyebrow}</Eyebrow>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <StatBlock
          stat={stat}
          numberColor={HOT}
          labelColor="rgba(255, 255, 255, 0.5)"
        />
        <BlockBody
          headline={headline}
          prose={prose}
          textColor={CREAM_WHITE}
          textMuted="rgba(255, 255, 255, 0.7)"
        />
      </div>
    </div>
  )
}

// Standard block: white ground with ink text and 4px ink left border
function StandardBlock({
  eyebrow,
  stat,
  headline,
  prose,
  benchmark,
  benchmarkEyebrow,
}: {
  eyebrow: string
  stat: SectionOpenerStat
  headline: string
  prose: string
  benchmark?: SectionBenchmark
  benchmarkEyebrow?: string
}) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.rule}`,
        borderLeft: `4px solid ${INK}`,
        padding: '20px 22px',
      }}
    >
      <Eyebrow color={INK}>{eyebrow}</Eyebrow>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <StatBlock
          stat={stat}
          numberColor={INK}
          labelColor="rgba(10, 10, 10, 0.55)"
        />
        <BlockBody
          headline={headline}
          prose={prose}
          textColor={palette.text}
          textMuted={palette.textMuted}
        />
      </div>

      {benchmark && (
        <BenchmarkSubBlock
          benchmark={benchmark}
          eyebrow={
            benchmarkEyebrow ?? `${benchmark.company.toUpperCase()} IS DOING THIS WELL`
          }
        />
      )}
    </div>
  )
}

function BenchmarkSubBlock({
  benchmark,
  eyebrow,
}: {
  benchmark: SectionBenchmark
  eyebrow: string
}) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 14,
        borderTop: `1px dashed ${palette.rule}`,
      }}
    >
      <Eyebrow color={INK}>{eyebrow}</Eyebrow>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <div
          style={{
            flex: '0 0 auto',
            width: 32,
            height: 32,
            background: INK,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {benchmark.logoSrc ? (
            <img
              src={benchmark.logoSrc}
              alt={`${benchmark.company} logo`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 16,
                color: CREAM_WHITE,
                lineHeight: 1,
              }}
            >
              {benchmark.logoLetter ?? benchmark.company.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div
          style={{
            flex: '1 1 200px',
            fontFamily: FONT.body,
            fontSize: 13,
            lineHeight: 1.55,
            color: palette.text,
          }}
        >
          {benchmark.behavior}
        </div>

        <div
          style={{
            flex: '0 0 auto',
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 6,
            padding: '4px 10px',
            border: `1px solid ${INK}`,
            color: INK,
            fontFamily: FONT.mono,
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Est. {benchmark.estimatedScore}
          <span style={{ opacity: 0.6 }}>· {benchmark.estimatedBand}</span>
        </div>
      </div>
    </div>
  )
}

// Action block: ink ground, yellow eyebrow per v4 spec
function ActionBlock({
  eyebrow,
  headline,
  steps,
}: {
  eyebrow: string
  headline: string
  steps: string[]
}) {
  return (
    <div
      style={{
        background: INK,
        color: CREAM_WHITE,
        padding: '20px 22px',
      }}
    >
      <Eyebrow color={YELLOW}>{eyebrow}</Eyebrow>
      <h3
        style={{
          fontFamily: FONT.display,
          fontSize: 22,
          fontWeight: 400,
          lineHeight: 1.2,
          color: CREAM_WHITE,
          margin: '0 0 16px',
          letterSpacing: '-0.005em',
        }}
      >
        {headline}
      </h3>
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
        {steps.map((step, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              fontFamily: FONT.body,
              fontSize: 14,
              lineHeight: 1.55,
              color: CREAM_WHITE,
            }}
          >
            <span
              style={{
                flex: '0 0 auto',
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                color: YELLOW,
                fontWeight: 600,
                paddingTop: 2,
                minWidth: 22,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
