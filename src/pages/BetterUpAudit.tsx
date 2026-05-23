import { useEffect, useState } from 'react'
import { usePostHog } from '@posthog/react'
// v4 design system tokens. Scoped under `.v4-root` (applied below on the
// audit shell) so they coexist with other routes that ship their own theme.
import '../styles/v4-tokens.css'
import {
  Callout,
  Gauge,
  MetricCard,
  ProfileCard,
  Reveal,
  Section,
  SectionHeader,
  StepperNav,
} from './betterup/components'
import {
  FONT,
  ThemeContext,
  loadBetterUpFonts,
  useTheme,
  useThemeState,
} from './betterup/theme'
import {
  ACTUALLY_SAYS,
  AI_MIRROR_CONTEXT,
  AI_MIRROR_SCORE,
  TEST_QUERIES,
  WANTS_TO_SAY,
  WHY_IT_MATTERS,
} from './betterup/data/aiMirror'
import { SECTIONS } from './betterup/data/sections'
import { AudienceSection, BuildSection, CascadeSection, GTMSection, InvestmentSection, PopulationSection, SignalsSection } from './betterup/sections'
import { DataLayerProvider, useDataLayer, type DataLayer } from './betterup/dataLayer'
import { PasswordGate, isAuthed } from './betterup/PasswordGate'
import { startSectionTimeTracker, track } from './betterup/analytics'
import { SummaryView } from './betterup/SummaryView'
import { AnimatePresence, motion } from 'framer-motion'
import { betterupAudit } from '../data/audits/betterup'
import {
  BAND_COLORS,
  SCORE_BANDS,
  computeBuyerTrustScore,
  getScoreBand,
} from '../lib/buyerTrustScore'
import { ScoreAnatomy } from '../components/revenueSignal/ScoreAnatomy'
import { SectionOpener } from '../components/audit/SectionOpener'
import { IssueBar } from '../components/audit/IssueBar'
import { SectionAnalysisDisclosure } from '../components/audit/SectionAnalysisDisclosure'
import { RecommendationHero } from '../components/audit/RecommendationHero'
import { ImpactCardGrid, type ImpactCard } from '../components/audit/ImpactCardGrid'
import {
  CadenceTimeline,
  CardParagraph,
  CardVisual,
  CountSplit,
  DiagnosticBar,
  DiminishingReturns,
  NoiseSignal,
  QuarterlyTrajectory,
  StruckRows,
  Underline,
} from '../components/audit/InlineVisuals'
import {
  BentoTile,
  CascadeBreakStack,
  ContentColumnGraph8,
  GaugeDial,
  StarRating,
} from '../components/audit/BentoTiles'

/* ──────────────────────────────────────────────
   ▶︎01 — THE RECOMMENDATION
   ────────────────────────────────────────────── */
export function RecommendationSection() {
  return (
    <Section id="recommendation" paddingTop={64}>
      <IssueBar
        number="▶︎01"
        name="The recommendation"
        meta={['BetterUp', betterupAudit.reportDate]}
      />
      <Reveal>
        <RecommendationHero
          eyebrow="The Buyer View"
          headlineLine1="Your buyer made up her mind"
          headlineLine2="before she ever talked to you."
          standfirst="Your buyer is doing more research before she ever talks to you, and most of it happens on surfaces you don't control. She's checking what your employees say on Glassdoor. She's reading what your executives publish on LinkedIn. She's asking peer networks and AI agents what they know about you. By the time she reaches out, she's already formed most of her opinion. The marketing team is investing where the team can see the activity. The buyer is making her decision somewhere else."
          scores={betterupAudit.currentScores}
          scoreContextLine="Typical of category leaders investing heavily in awareness while losing trust in the surfaces buyers actually use."
          scoreAnchorId="why"
        />
      </Reveal>
    </Section>
  )
}

/* ──────────────────────────────────────────────
   ▶︎02 — THE PROBLEMS (bento evidence board)
   Five tiles arranged horizontally across the desktop canvas: a 12-col
   grid with mixed widths (3 / 4 / 5 / 5 / 7) and two rows of varied
   heights. Each tile carries its diagnostic color as a 3px top accent
   and frames the finding from the buyer's first-person view.
   ────────────────────────────────────────────── */
const COBALT = '#1845C2'
const RUST = '#DD5C20'
const YELLOW = '#F4C430'
const MAGENTA = '#E6195F'

export function ProblemsSection() {
  const { palette } = useTheme()
  return (
    <Section id="problems">
      <IssueBar
        number="▶︎02"
        name="The problems"
        meta={['BetterUp', 'Buyer-view diagnosis']}
      />
      <Reveal>
        <div style={{ maxWidth: 880, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: FONT.display,
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              color: palette.text,
              margin: '0 0 20px',
              maxWidth: 760,
            }}
          >
            We found four problems, from the buyer's view.
          </h2>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 18,
              lineHeight: 1.55,
              color: palette.textMuted,
              margin: 0,
              maxWidth: 640,
            }}
          >
            These are the gaps between what your buyer researches and what you are showing her.
          </p>
        </div>

        {/* Row 1 — three tall tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: 16,
            marginBottom: 16,
          }}
        >
          {/* Tile A — Leaders headline (span 5) */}
          <BentoTile accent={COBALT} priority="P1" diagnostic="Leaders" colSpan={5}>
            <h3
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(20px, 2vw, 26px)',
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: '-0.005em',
                color: palette.text,
                margin: '0 0 24px',
              }}
            >
              She searched for your team on LinkedIn. She found your CEO. After that, the trail went cold.
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22 }}>
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 'clamp(64px, 8vw, 96px)',
                  color: COBALT,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                }}
              >
                24
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: palette.textDim,
                  fontWeight: 600,
                }}
              >
                / 100
              </span>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <CountSplit
                leftCount={2}
                leftLabel="Original"
                rightCount={7}
                rightLabel="Reposting or silent"
                accent={COBALT}
                ground="parchment"
              />
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: palette.textMuted,
                  margin: '14px 0 0',
                }}
              >
                Two voices know what they are saying. Seven echo the company page.
              </p>
            </div>
          </BentoTile>

          {/* Tile B — Employees cascade (span 4) */}
          <BentoTile accent={RUST} priority="P2" diagnostic="Employees" colSpan={4}>
            <h3
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: '-0.005em',
                color: palette.text,
                margin: '0 0 18px',
              }}
            >
              Where her trust gave way.
            </h3>
            <CascadeBreakStack accent={RUST} />
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 13,
                lineHeight: 1.5,
                color: palette.textMuted,
                margin: '16px 0 0',
              }}
            >
              Layer 4 is where the chain broke. Your own people are where she stopped trusting.
            </p>
          </BentoTile>

          {/* Tile C — Agents gauge (span 3) */}
          <BentoTile accent={MAGENTA} priority="P4" diagnostic="Agents" colSpan={3}>
            <h3
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(16px, 1.6vw, 19px)',
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: '-0.005em',
                color: palette.text,
                margin: '0 0 14px',
              }}
            >
              She asked Perplexity. The answer cited offerings you no longer sell.
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
              <GaugeDial score={38} benchmark={65} benchmarkLabel="floor" size={140} />
            </div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 12,
                lineHeight: 1.5,
                color: palette.textMuted,
                margin: '12px 0 0',
                textAlign: 'center',
              }}
            >
              What an AI tells her, before any human on your team does.
            </p>
          </BentoTile>
        </div>

        {/* Row 2 — two wider tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: 16,
          }}
        >
          {/* Tile D — Employees Glassdoor (span 5) */}
          <BentoTile accent={RUST} priority="P2" diagnostic="Employees" colSpan={5}>
            <h3
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: '-0.005em',
                color: palette.text,
                margin: '0 0 18px',
              }}
            >
              Before she called you, she checked Glassdoor.
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  color: RUST,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                }}
              >
                41
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: palette.textDim,
                  fontWeight: 600,
                }}
              >
                / 100
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <StarRating value={3.2} color={RUST} size={20} />
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  color: RUST,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                3.2 / 5 Glassdoor
              </span>
            </div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 13,
                lineHeight: 1.55,
                color: palette.textMuted,
                margin: 0,
              }}
            >
              The reviews were searchable. They did not match your marketing.
            </p>
          </BentoTile>

          {/* Tile E — Your content column graph (span 7) */}
          <BentoTile accent={YELLOW} priority="P3" diagnostic="Your content" colSpan={7}>
            <h3
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: '-0.005em',
                color: palette.text,
                margin: '0 0 18px',
              }}
            >
              How her questions matched the categories you publish.
            </h3>
            <ContentColumnGraph8 accent={YELLOW} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 'clamp(32px, 4vw, 44px)',
                  color: YELLOW,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                }}
              >
                29
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: palette.textDim,
                  fontWeight: 600,
                }}
              >
                / 100 avg
              </span>
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: palette.textMuted,
                  margin: 0,
                  flex: '1 1 220px',
                  minWidth: 220,
                }}
              >
                Seven of eight categories landed below the line she was researching from.
              </span>
            </div>
          </BentoTile>
        </div>
      </Reveal>
    </Section>
  )
}

/* ──────────────────────────────────────────────
   ▶︎03 — P1 RESPONSES (formerly Maximum Impact)
   ────────────────────────────────────────────── */
// Each P1 response card is color-coded to the diagnostic that produced
// the recommendation, so the reader can trace recommendation back to
// evidence. The evidenceAnchor scrolls to the matching ▶︎05 sub-section.
const COLOR_LEADERS = '#1845C2'
const COLOR_AGENTS = '#E6195F'
const COLOR_YOUR_CONTENT = '#F4C430'
const COLOR_EMPLOYEES = '#DD5C20'

const MAX_IMPACT_CARDS: ImpactCard[] = [
  {
    ordinal: '01',
    ordinalLabel: 'P1',
    headline: 'Get your executives publishing original content on LinkedIn.',
    body: "When a buyer asks an AI agent about BetterUp, the agent reads your executives' LinkedIn activity as a signal of who you are. Today, only two of your executives publish original content. Five publish reposts or nothing at all. The agent reads this as inconsistency and lowers its confidence in your brand. The fix is to get five to seven executives posting original content weekly, with the new exec comms hire owning the program.",
    richContent: (
      <>
        <CardParagraph ground="ink">
          When a buyer asks an AI agent about BetterUp, the agent reads your executives' LinkedIn activity as a signal of who you are.
        </CardParagraph>
        <CardVisual>
          <DiagnosticBar label="Leaders" score={24} accent={COLOR_LEADERS} ground="ink" />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          Today,{' '}
          <Underline color={COLOR_LEADERS}>only two of your executives publish original content</Underline>. Five publish reposts or nothing at all.
        </CardParagraph>
        <CardVisual>
          <CountSplit
            leftCount={2}
            leftLabel="Original"
            rightCount={7}
            rightLabel="Repost or silent"
            accent={COLOR_LEADERS}
            ground="ink"
          />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          The agent reads this as inconsistency and lowers its confidence in your brand.
        </CardParagraph>
        <CardParagraph ground="ink" marginTop={24}>
          The fix is to get five to seven executives posting original content weekly, with the new exec comms hire owning the program.
        </CardParagraph>
      </>
    ),
    indicator: '~30% reach lift · Originals vs. reshares',
    accentColor: COLOR_LEADERS,
    evidenceAnchor: 'leaders',
  },
  {
    ordinal: '02',
    ordinalLabel: 'P1',
    headline: 'Fix the wrong data that agents are repeating.',
    body: "Agents pull from public sources, then synthesize. Right now they're pulling discontinued D2C offerings, wrong employee counts, and outdated client logos. The buyer who asks Perplexity about BetterUp encounters those inaccuracies before she ever sees the website. The fix is a data hygiene pass on the high-traffic public sources: Crunchbase, LinkedIn company page, Wikipedia, G2, and the BetterUp website's structured data. It's cheap, it's high-leverage, and it changes the answer the buyer gets.",
    richContent: (
      <>
        <CardParagraph ground="ink">
          Agents pull from public sources, then synthesize.
        </CardParagraph>
        <CardVisual>
          <DiagnosticBar label="Agents" score={38} accent={COLOR_AGENTS} ground="ink" />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          Right now they're pulling{' '}
          <Underline color={COLOR_AGENTS}>discontinued D2C offerings, wrong employee counts, and outdated client logos</Underline>. The buyer who asks Perplexity about BetterUp encounters those inaccuracies before she ever sees the website.
        </CardParagraph>
        <CardVisual>
          <StruckRows
            rows={[
              'D2C offerings — discontinued',
              '800 employees — actual 1,200+',
              'Legacy logos — updated roster missing',
            ]}
            accent={COLOR_AGENTS}
            ground="ink"
          />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          The fix is a data hygiene pass on the high-traffic public sources: Crunchbase, LinkedIn company page, Wikipedia, G2, and the BetterUp website's structured data.
        </CardParagraph>
        <CardParagraph ground="ink" marginTop={24}>
          It's cheap, it's high-leverage, and it changes the answer the buyer gets.
        </CardParagraph>
      </>
    ),
    indicator: 'Agents score +15 projected · Data hygiene only',
    accentColor: COLOR_AGENTS,
    evidenceAnchor: 'mirror',
  },
  {
    ordinal: '03',
    ordinalLabel: 'P1',
    headline: 'Make it easy for your people to publish.',
    body: "The reason your executives and sellers aren't publishing isn't lack of ideas. It's lack of time. Sales reps prioritize closing, not writing. A weekly ghostwritten post per key executive and rep, distributed through BetterUp's existing Claude tool with vertical-specific templates, removes the writing burden. The cascade you've already built starts working because adoption stops being the bottleneck.",
    richContent: (
      <>
        <CardParagraph ground="ink">
          The reason your executives and sellers aren't publishing isn't lack of ideas. It's lack of time.
        </CardParagraph>
        <CardVisual>
          <DiagnosticBar label="Your content" score={29} accent={COLOR_YOUR_CONTENT} ground="ink" />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          Sales reps prioritize closing, not writing.{' '}
          <Underline color={COLOR_YOUR_CONTENT}>A weekly ghostwritten post per key executive and rep</Underline>, distributed through BetterUp's existing Claude tool with vertical-specific templates, removes the writing burden.
        </CardParagraph>
        <CardVisual>
          <CadenceTimeline
            points={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
            caption="Per executive · 5–10 execs"
            captionPosition="above"
            accent={COLOR_YOUR_CONTENT}
            ground="ink"
          />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          The cascade you've already built starts working because adoption stops being the bottleneck.
        </CardParagraph>
      </>
    ),
    indicator: '5–10 execs · Weekly cadence · Tool already in production',
    accentColor: COLOR_YOUR_CONTENT,
    evidenceAnchor: 'signals',
  },
  {
    ordinal: '04',
    ordinalLabel: 'P1',
    headline: 'Treat this as a measurement, not a project.',
    body: 'A one-time audit catches a moment. Trust drifts over time, and the surfaces that produce it (Glassdoor reviews, LinkedIn activity, AI agent answers) change continuously. A quarterly re-measurement turns the audit from a one-time exercise into a governance system. The board can budget against the score the way it budgets against revenue. The CMO can defend marketing spend with a quantitative read on whether trust is rising or falling.',
    richContent: (
      <>
        <CardParagraph ground="ink">
          A one-time audit catches a moment. Trust drifts over time, and the surfaces that produce it (Glassdoor reviews, LinkedIn activity, AI agent answers) change continuously.
        </CardParagraph>
        <CardVisual>
          <DiagnosticBar label="Employees" score={41} accent={COLOR_EMPLOYEES} ground="ink" />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          A quarterly re-measurement turns the audit from a one-time exercise into a governance system.{' '}
          <Underline color={COLOR_EMPLOYEES}>The board can budget against the score the way it budgets against revenue</Underline>.
        </CardParagraph>
        <CardVisual>
          <QuarterlyTrajectory
            points={[
              { label: 'Q1', value: 32 },
              { label: 'Q2', value: 41 },
              { label: 'Q3', value: 51 },
              { label: 'Q4', value: 58 },
            ]}
            accent={COLOR_EMPLOYEES}
            ground="ink"
          />
        </CardVisual>
        <CardParagraph ground="ink" marginTop={16}>
          The CMO can defend marketing spend with a quantitative read on whether trust is rising or falling.
        </CardParagraph>
      </>
    ),
    indicator: 'Quarterly cadence · Governance artifact',
    accentColor: COLOR_EMPLOYEES,
    evidenceAnchor: 'cascade',
  },
]

export function MaximumImpactSection() {
  return (
    <Section id="do" background="#0A0A0A">
      <div style={{ color: '#FFFFFF' }}>
        <IssueBar
          number="▶︎03"
          name="P1"
          meta={['BetterUp', '4 of 4 fixes']}
          ground="dark"
        />
        <Reveal>
          <ImpactCardGrid
            eyebrow="▶︎03 · P1"
            headline="The four moves with the most leverage on what your buyer reads."
            cards={MAX_IMPACT_CARDS}
            ground="ink"
          />
        </Reveal>
      </div>
    </Section>
  )
}

/* ──────────────────────────────────────────────
   ▶︎04 — P2 (formerly Minimum Impact)
   ────────────────────────────────────────────── */
// P2 cards do not get diagnostic colors. A single muted-ink accent reads as
// "this is the resist column," visually distinct from the ▶︎03 P1 cards.
const COLOR_MIN_ACCENT = 'rgba(10, 10, 10, 0.55)'

const MIN_IMPACT_CARDS: ImpactCard[] = [
  {
    ordinal: '01',
    ordinalLabel: 'P2',
    headline: 'More MQL tuning or vanity dashboard work.',
    body: "Without a way to attribute revenue to specific buyers, optimizing further on MQLs just adds noise. The team is already over-instrumented at the form-fill stage. Tightening that further produces cleaner reports about a model that doesn't capture how the buyer actually decides. The work doesn't move the needle on what's broken.",
    richContent: (
      <>
        <CardParagraph ground="parchment">
          Without a way to attribute revenue to specific buyers, optimizing further on MQLs just adds noise.
        </CardParagraph>
        <CardVisual>
          <DiminishingReturns
            topLabel="MQL volume"
            bottomLabel="Qualified pipeline"
            ground="parchment"
          />
        </CardVisual>
        <CardParagraph ground="parchment" marginTop={16}>
          The team is already over-instrumented at the form-fill stage.{' '}
          <Underline color={COLOR_MIN_ACCENT}>Tightening that further produces cleaner reports about a model that doesn't capture how the buyer actually decides</Underline>.
        </CardParagraph>
        <CardParagraph ground="parchment" marginTop={24}>
          The work doesn't move the needle on what's broken.
        </CardParagraph>
      </>
    ),
    indicator: 'Attribution before trust signal repair inverts the order. Fix what the agent reads first, then measure what arrives.',
    indicatorLabel: 'Why not now',
  },
  {
    ordinal: '02',
    ordinalLabel: 'P2',
    headline: 'Hiring 3 to 4 more social media specialists immediately.',
    body: "More headcount can't fix an adoption problem. The bottleneck isn't capacity, it's that executives and sellers aren't publishing. Adding specialists who write on behalf of the brand doesn't move the signal that an agent reads as authoritative, which is the individual executive's voice. Scale staffing into a system that's already working, not into a system that hasn't started yet.",
    richContent: (
      <>
        <CardParagraph ground="parchment">
          More headcount can't fix an adoption problem.
        </CardParagraph>
        <CardVisual>
          <DiminishingReturns
            topLabel="Headcount"
            bottomLabel="Executive activity"
            ground="parchment"
          />
        </CardVisual>
        <CardParagraph ground="parchment" marginTop={16}>
          The bottleneck isn't capacity,{' '}
          <Underline color={COLOR_MIN_ACCENT}>it's that executives and sellers aren't publishing</Underline>. Adding specialists who write on behalf of the brand doesn't move the signal that an agent reads as authoritative, which is the individual executive's voice.
        </CardParagraph>
        <CardParagraph ground="parchment" marginTop={24}>
          Scale staffing into a system that's already working, not into a system that hasn't started yet.
        </CardParagraph>
      </>
    ),
    indicator: 'Headcount before adoption produces a bigger team executing the same broken motion.',
    indicatorLabel: 'Why not now',
  },
  {
    ordinal: '03',
    ordinalLabel: 'P2',
    headline: 'More events and webinars layered on top of the existing cadence.',
    body: "Events drive leads, and BetterUp's existing event cadence is doing its job. But events don't fix the trust signal that an agent reads when it researches you. The buyer who's been to your event still asks Perplexity about you before she reaches out. Doubling event spend doesn't change what Perplexity sees.",
    richContent: (
      <>
        <CardParagraph ground="parchment">
          Events drive leads, and BetterUp's existing event cadence is doing its job.
        </CardParagraph>
        <CardVisual>
          <CadenceTimeline
            points={['Q1 event', 'Q2 event', 'Q3 event', 'Q4 event']}
            caption="Existing cadence · working"
            captionPosition="below"
            accent={COLOR_MIN_ACCENT}
            ground="parchment"
          />
        </CardVisual>
        <CardParagraph ground="parchment" marginTop={16}>
          But events don't fix the trust signal that an agent reads when it researches you.{' '}
          <Underline color={COLOR_MIN_ACCENT}>The buyer who's been to your event still asks Perplexity about you before she reaches out</Underline>.
        </CardParagraph>
        <CardParagraph ground="parchment" marginTop={24}>
          Doubling event spend doesn't change what Perplexity sees.
        </CardParagraph>
      </>
    ),
    indicator: "Events are downstream of trust. The agent's read is upstream of the event.",
    indicatorLabel: 'Why not now',
  },
  {
    ordinal: '04',
    ordinalLabel: 'P2',
    headline: 'Trying to perfectly attribute the $30M marketing spend to new logos.',
    body: "The attribution model you'd need to perfectly trace $30M to new logos requires a longer feedback loop than your current trust signals have produced. You can't attribute revenue to signals you haven't fixed yet. Build the score-movement read first, then layer attribution on top of a signal infrastructure that's known to be working.",
    richContent: (
      <>
        <CardParagraph ground="parchment">
          The attribution model you'd need to perfectly trace $30M to new logos requires a longer feedback loop than your current trust signals have produced.
        </CardParagraph>
        <CardVisual>
          <NoiseSignal
            topLabel="Attribution input"
            bottomLabel="Signal output"
            ground="parchment"
          />
        </CardVisual>
        <CardParagraph ground="parchment" marginTop={16}>
          You can't attribute revenue to signals you haven't fixed yet.{' '}
          <Underline color={COLOR_MIN_ACCENT}>Build the score-movement read first</Underline>, then layer attribution on top of a signal infrastructure that's known to be working.
        </CardParagraph>
      </>
    ),
    indicator: 'Attribution before signal repair is precision applied to noise.',
    indicatorLabel: 'Why not now',
  },
]

export function MinimumImpactSection() {
  return (
    <Section id="dont" background="#F4F1EA">
      <IssueBar number="▶︎04" name="P2" meta={['BetterUp', 'Resist these']} />
      <Reveal>
        <ImpactCardGrid
          eyebrow="▶︎04 · P2"
          headline="The four motions that look productive and don't move what the buyer reads."
          cards={MIN_IMPACT_CARDS}
          ground="parchment"
        />
      </Reveal>
    </Section>
  )
}


/* ──────────────────────────────────────────────
   ▶︎05 — THE PROOF intro (sub-sections render after)
   The methodology rows and band legend live here, not behind a drawer in
   ▶︎01. They sit at the head of the forensic record because that is where
   the reader who wants to verify the scoring math is already looking.
   ────────────────────────────────────────────── */
function ProofSectionIntro() {
  const { palette } = useTheme()
  return (
    <Section id="proof">
      <IssueBar
        number="▶︎05"
        name="The proof"
        meta={['BetterUp', 'Forensic record']}
      />
      <Reveal>
        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: palette.textDim,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            ▶︎05 · The proof
          </div>
          <h2
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(40px, 7vw, 96px)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: palette.text,
              margin: '0 0 20px',
            }}
          >
            Four separate readings of what the buyer is encountering. They all point the same way.
          </h2>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 18,
              lineHeight: 1.55,
              color: palette.text,
              margin: 0,
              maxWidth: 640,
            }}
          >
            Each sub-section opens with what the buyer finds today, what it looks like when the chain is intact, and what to do first. The detailed evidence sits beneath. The roadmap at ▶︎05.8 lands the four P1 moves above.
          </p>
        </div>
      </Reveal>

      {/* Methodology and band legend, surfaced from the old ▶︎01 drawer. */}
      <div style={{ marginTop: 64 }}>
        <ScoreAnatomy scores={betterupAudit.currentScores} />
        <BandLegendStrip currentScore={computeBuyerTrustScore(betterupAudit.currentScores)} />
      </div>
    </Section>
  )
}

function BandLegendStrip({ currentScore }: { currentScore: number }) {
  const { palette } = useTheme()
  const activeBand = getScoreBand(currentScore).id
  return (
    <div style={{ marginTop: 48 }}>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: palette.textDim,
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        The band system
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SCORE_BANDS.length}, minmax(0, 1fr))`,
          gap: 6,
          maxWidth: 760,
        }}
      >
        {SCORE_BANDS.map((b) => {
          const isActive = b.id === activeBand
          const color = BAND_COLORS[b.id]
          return (
            <div
              key={b.id}
              style={{
                border: `1px solid ${isActive ? color : palette.rule}`,
                background: isActive ? `${color}14` : 'transparent',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: 4, background: color }} />
              <div style={{ padding: '10px 10px 12px' }}>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 12,
                    fontWeight: 600,
                    color: isActive ? color : palette.text,
                    marginBottom: 4,
                  }}
                >
                  {b.label}
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: '0.04em',
                    color: palette.textMuted,
                  }}
                >
                  {b.range[0]}&ndash;{b.range[1]}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ▶︎06 — THE CONNECTION
   Close on parchment so the two firm marks at the foot sit on a calm,
   native-color ground rather than fighting an ink background. Argument
   structure: BetterUp already owns the parts. The work is the connection.
   ────────────────────────────────────────────── */
export function NextTogetherSection() {
  return (
    <Section id="together" background="#F4F1EA">
      <IssueBar
        number="▶︎06"
        name="The connection"
        meta={['BetterUp', betterupAudit.reportDate]}
      />
      <Reveal>
        <div style={{ maxWidth: 880 }}>
          {/* Headline — Anton mega, sentence case with period */}
          <h2
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(56px, 10vw, 144px)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#0A0A0A',
              margin: '0 0 40px',
            }}
          >
            You are one connection away.
          </h2>

          {/* Body — parts-versus-connection argument, with the reallocation
              cue threaded in: every part on the list is already a budget
              line, so the connection is a small share of money already in
              motion rather than a new ask. */}
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 22,
              lineHeight: 1.55,
              color: '#0A0A0A',
              margin: '0 0 28px',
              maxWidth: 720,
            }}
          >
            You already have the content. Pinwheel produces it, and it is good. You already have the intent, executives with a real point of view, and buyers who are already paying attention, as the last twelve names showed. What you do not have yet is the system that connects them. Something that carries the right content to the surfaces your buyer actually uses, on a cadence she can trust, without taking hours back from the people whose time is worth the most.
          </p>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 22,
              lineHeight: 1.55,
              color: '#0A0A0A',
              margin: '0 0 40px',
              maxWidth: 720,
            }}
          >
            Every part on that list is already a line in the budget. The connection costs a fraction of any one of them, and it is the line that decides whether the rest land in front of the buyer. The parts are not the problem. The connection is. That is the work, and it is the part that compounds.
          </p>

          {/* Quiet handoff line, set apart visually */}
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.55,
              color: 'rgba(10, 10, 10, 0.65)',
              margin: '0 0 56px',
              paddingTop: 24,
              borderTop: '1px solid rgba(10, 10, 10, 0.18)',
              maxWidth: 640,
            }}
          >
            Moving this is a program, not a campaign. It runs in quarters, and it gets stronger the longer it runs.
          </p>

          {/* 90-day plan — what the first quarter actually looks like */}
          <NinetyDayPlan />

          {/* Co-sign block — two firm marks as peers, ERA symbol + Pinwheel logo */}
          <CoSign />
        </div>
      </Reveal>
    </Section>
  )
}

function NinetyDayPlan() {
  const items = [
    'Fix the inaccurate public data so the agent stops repeating it.',
    'Activate three executives with ghostwritten posts on a weekly cadence.',
    'Measure engagement lift across the activated voices and the data hygiene pass.',
    'Re-run the audit at week 12 and report the Buyer Trust Score movement.',
  ] as const
  return (
    <div style={{ marginBottom: 64 }}>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(10, 10, 10, 0.6)',
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        The 90-day plan
      </div>
      <h3
        style={{
          fontFamily: FONT.display,
          fontSize: 'clamp(24px, 3vw, 32px)',
          fontWeight: 400,
          lineHeight: 1.18,
          letterSpacing: '-0.005em',
          color: '#0A0A0A',
          margin: '0 0 28px',
          maxWidth: 720,
        }}
      >
        Stand up the four P1 moves and measure what they actually move.
      </h3>
      <ol
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          maxWidth: 720,
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr',
              alignItems: 'baseline',
              gap: 16,
              paddingTop: 14,
              borderTop: '1px solid rgba(10, 10, 10, 0.15)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(10, 10, 10, 0.55)',
                fontWeight: 600,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 17,
                lineHeight: 1.5,
                color: '#0A0A0A',
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function CoSign() {
  return (
    <div style={{ paddingTop: 48, borderTop: '2px solid #0A0A0A' }}>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(10, 10, 10, 0.6)',
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        Co-signed by
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <img
          src="/images/era_symbol.svg"
          alt="ERA"
          style={{
            height: 56,
            width: 'auto',
            display: 'block',
          }}
        />
        <div
          aria-hidden
          style={{
            width: 1,
            height: 56,
            background: 'rgba(10, 10, 10, 0.25)',
          }}
        />
        <img
          src="/assets/pinwheel_agency_logo.jpg"
          alt="Pinwheel"
          style={{
            height: 56,
            width: 'auto',
            display: 'block',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(10, 10, 10, 0.55)',
          fontWeight: 600,
          marginTop: 20,
        }}
      >
        ERA · Pinwheel
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Section 6: AI Mirror
   ────────────────────────────────────────────── */
function AIMirror() {
  const { palette } = useTheme()
  const opener = betterupAudit.openers?.mirror
  return (
    <Section id="mirror" background={palette.cobalt}>
      <div style={{ color: '#FFFFFF' }}>
      <IssueBar number="▶︎05.5" name="What agents say about you" meta={[{ label: 'Score', value: '38' }, { label: 'Weight', value: '15%' }, 'BetterUp']} ground="dark" />
      {opener && <SectionOpener {...opener} ground="dark" />}
      <SectionAnalysisDisclosure ground="dark">
      <SectionHeader
        kicker="What agents say about you"
        headline="When a CHRO asks ChatGPT or Claude about BetterUp, the answer balances praise with caution."
        shareId="mirror"
      />

      <Reveal>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E8E4DE',
            borderRadius: 0,
            padding: '28px 32px',
            fontFamily: FONT.body,
            fontSize: 16,
            lineHeight: 1.65,
            color: '#1A1A1A',
            marginBottom: 48,
          }}
        >
          {AI_MIRROR_CONTEXT}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 20,
          }}
        >
          <ChatColumn
            tone="aspirational"
            title="What you want the agent to say"
            items={WANTS_TO_SAY.map((t) => ({ tone: 'aspirational', text: t }))}
          />
          <ChatColumn
            tone="real"
            title="What the agent actually says"
            items={[...ACTUALLY_SAYS]}
          />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Gauge score={AI_MIRROR_SCORE} benchmark={65} benchmarkLabel="high-performing floor" label="Agents score" size={180} />
        </div>
      </Reveal>

      <div style={{ marginTop: 48 }}>
        <Reveal>
          <Callout tone="rust">
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.7,
                marginBottom: 12,
              }}
            >
              Why this matters
            </div>
            {WHY_IT_MATTERS}
          </Callout>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <BuyerPromptCard />
      </Reveal>

      <Reveal delay={0.1}>
        <TestYourself />
      </Reveal>
      </SectionAnalysisDisclosure>
      </div>
    </Section>
  )
}

const BUYER_PROMPT = `I am a CHRO at a Fortune 500 company evaluating enterprise coaching platforms. I have a $2M annual budget for leadership development and need to justify the spend to my CFO. Tell me about BetterUp. Include pricing, employee reviews, competitive alternatives, and whether the ROI evidence is strong enough to present to a board.`

function BuyerPromptCard() {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(BUYER_PROMPT) } catch {}
    setCopied(true)
    void track('prompt_copy', 'buyer_prompt', 'full')
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <div
      style={{
        marginTop: 48,
        background: '#FBF9F6',
        border: '1px solid #E8E4DE',
        borderRadius: 0,
        padding: '28px 32px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C85A3A', fontWeight: 600, marginBottom: 6 }}>
            See what your buyer sees
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 22, color: '#1A1A1A', lineHeight: 1.25 }}>
            Paste this into ChatGPT, Claude, or Perplexity.
          </div>
        </div>
        <button
          onClick={onCopy}
          style={{
            background: '#1A1A1A',
            color: '#F7F5F2',
            border: 'none',
            borderRadius: 0,
            padding: '10px 18px',
            fontFamily: FONT.body,
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : 'Copy to clipboard'}
        </button>
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 14,
          lineHeight: 1.6,
          color: '#1A1A1A',
          background: '#FFFFFF',
          border: '1px solid #E8E4DE',
          borderRadius: 0,
          padding: '20px 24px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {BUYER_PROMPT}
      </div>
    </div>
  )
}

function ChatColumn({
  title,
  items,
  tone,
}: {
  title: string
  tone: 'aspirational' | 'real'
  items: { tone: string; text: string }[]
}) {
  const isAspirational = tone === 'aspirational'

  // For real column, separate the summary line out
  const summaryItem = items.find((i) => i.tone === 'summary')
  const bodyItems = items.filter((i) => i.tone !== 'summary')

  return (
    <div
      style={{
        background: isAspirational ? '#FBF9F6' : '#FFFFFF',
        border: `1px solid #E8E4DE`,
        borderRadius: 0,
        padding: '24px 26px 28px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isAspirational ? 'none' : '0 8px 32px rgba(0,0,0,0.06)',
        position: 'relative',
      }}
    >
      {/* Header — chat avatar for the AI side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        {isAspirational ? (
          <div
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#E8E4DE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT.body, fontSize: 11, color: '#6B6760', fontWeight: 600, letterSpacing: '0.04em',
            }}
          >
            BU
          </div>
        ) : (
          <div
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#1A1A1A', color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        )}
        <div>
          <div
            style={{
              fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: isAspirational ? '#9A958C' : '#C85A3A',
              fontWeight: 600,
            }}
          >
            {isAspirational ? 'Marketing copy' : 'Composite AI answer'}
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 11, color: '#9A958C', marginTop: 2 }}>
            {isAspirational ? 'What BetterUp tells the world' : 'ChatGPT · Claude · Perplexity · Google AI'}
          </div>
        </div>
      </div>

      <div style={{ fontFamily: FONT.display, fontSize: 20, color: '#1A1A1A', marginBottom: 20, lineHeight: 1.25 }}>
        {title}
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {bodyItems.map((item, i) => {
          const isPositive = item.tone === 'positive'
          const isNegative = item.tone === 'negative'
          const dotColor = isPositive ? '#3A9B6E' : isNegative ? '#C84438' : '#9A958C'
          return (
            <li
              key={i}
              style={{
                fontFamily: FONT.body,
                fontSize: isNegative ? 15 : 14,
                lineHeight: 1.5,
                color: '#1A1A1A',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                padding: isNegative ? '6px 12px 6px 14px' : '4px 0',
                background: isNegative ? 'rgba(200,68,56,0.04)' : 'transparent',
                borderLeft: isNegative ? '2px solid #C84438' : 'none',
                borderRadius: isNegative ? 2 : 0,
                fontWeight: isNegative ? 500 : 400,
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: dotColor,
                  flex: '0 0 auto', marginTop: 8,
                }}
              />
              <span>{item.text}</span>
            </li>
          )
        })}
      </ul>

      {/* Summary callout */}
      {summaryItem && (
        <div
          style={{
            marginTop: 22,
            padding: '16px 18px',
            background: '#1A1A1A',
            color: '#FFFFFF',
            borderRadius: 0,
            fontFamily: FONT.body,
            fontSize: 14,
            lineHeight: 1.5,
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontFamily: FONT.body, fontSize: 9, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#D86A48',
              fontWeight: 600, flex: '0 0 auto', marginTop: 3, whiteSpace: 'nowrap',
            }}
          >
            Net read
          </div>
          <span style={{ fontStyle: 'italic' }}>{summaryItem.text}</span>
        </div>
      )}
    </div>
  )
}

function TestYourself() {
  return (
    <div
      style={{
        marginTop: 48,
        background: '#1A1A1A',
        color: '#F7F5F2',
        borderRadius: 0,
        padding: '32px 36px',
      }}
    >
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#D86A48',
          marginBottom: 16,
        }}
      >
        Run the test yourself
      </div>
      <div style={{ fontFamily: FONT.display, fontSize: 24, marginBottom: 24, lineHeight: 1.3 }}>
        Ask ChatGPT, Claude, Perplexity, or Google AI Overview:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TEST_QUERIES.map((q, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 0,
            }}
          >
            <span style={{ color: '#D86A48', marginRight: 12 }}>›</span>
            {q}
          </div>
        ))}
      </div>
    </div>
  )
}


/* ──────────────────────────────────────────────
   Page shell
   ────────────────────────────────────────────── */
const VIEW_MODE_KEY = 'betterup-audit-view-mode'

function AuditShell({ eraMode }: { eraMode: boolean }) {
  const posthog = usePostHog()
  const theme = useThemeState()
  const [layer, setLayer] = useState<DataLayer>(eraMode ? 'era' : 'era-plus-bh')
  const page = eraMode ? 'era' : 'full'

  // View mode (Summary | Full) — only used on the main route. Default Summary on first visit.
  const [viewMode, setViewMode] = useState<'summary' | 'full'>(() => {
    if (eraMode) return 'full'
    try {
      const stored = localStorage.getItem(VIEW_MODE_KEY)
      if (stored === 'summary' || stored === 'full') return stored
    } catch {}
    return 'full'
  })

  useEffect(() => {
    if (!eraMode) {
      try { localStorage.setItem(VIEW_MODE_KEY, viewMode) } catch {}
    }
  }, [viewMode, eraMode])

  useEffect(() => {
    document.documentElement.style.background = theme.palette.bg
    document.body.style.background = theme.palette.bg
    document.body.style.color = theme.palette.text
  }, [theme.palette])

  // Browser tab title: the publication name is fixed as "The Buyer View"
  // across every instance. Company ownership is established by the "Built
  // for" lockup, not by the title itself.
  useEffect(() => {
    const previous = document.title
    document.title = 'The Buyer View'
    return () => {
      document.title = previous
    }
  }, [])

  // Behavioral analytics: only run the section observer when the full sections are mounted.
  useEffect(() => {
    if (eraMode || viewMode === 'full') {
      const cleanup = startSectionTimeTracker(SECTIONS.map((s) => s.id), page)
      return cleanup
    }
  }, [page, viewMode, eraMode])

  const handleLayerSet = (l: DataLayer) => {
    void track('layer_toggle', l, page)
    posthog?.capture('audit_data_layer_changed', { layer: l, audit_page: page })
    setLayer(l)
  }

  const handleViewModeSet = (m: 'summary' | 'full') => {
    void track('view_mode_toggle', m, page)
    posthog?.capture('audit_view_mode_changed', { view_mode: m, audit_page: page })
    setViewMode(m)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ThemeContext.Provider value={theme}>
      <DataLayerProvider defaultLayer={eraMode ? 'era' : 'era-plus-bh'} showLayerToggle={eraMode}>
        <DataLayerSync layer={layer} setLayer={setLayer} />
        <div className="v4-root" style={{ background: theme.palette.bg, minHeight: '100vh', color: theme.palette.text, fontFamily: FONT.body }}>
          <StepperNav
            items={SECTIONS}
            themeMode={theme.mode}
            layerToggle={eraMode ? { layer, onSet: handleLayerSet } : undefined}
            viewModeToggle={!eraMode ? { mode: viewMode, onSet: handleViewModeSet } : undefined}
          />
          <div style={{ paddingTop: 60 }}>
            <AnimatePresence mode="wait">
              {!eraMode && viewMode === 'summary' ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SummaryView />
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* ▶︎01 — Recommendation lead. The integrated bento on the
                      right column of the hero carries the full score breakdown
                      inline; methodology and band legend live in ▶︎05. */}
                  <RecommendationSection />
                  {/* ▶︎02 — The problems (named, no fixes) */}
                  <ProblemsSection />
                  {/* ▶︎03 — P1 (do this) */}
                  <MaximumImpactSection />
                  {/* ▶︎04 — P2 (don't do this) */}
                  <MinimumImpactSection />
                  {/* ▶︎05 — Full forensic record, with existing analytical sections as ▶︎05.1–▶︎05.8 */}
                  <ProofSectionIntro />
                  <CascadeSection />
                  <GTMSection />
                  <PopulationSection />
                  <SignalsSection />
                  <AIMirror />
                  <AudienceSection />
                  <InvestmentSection />
                  <BuildSection />
                  {/* ▶︎06 — Partnership ask */}
                  <NextTogetherSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DataLayerProvider>
    </ThemeContext.Provider>
  )
}

/** Bridges the local toggle state in AuditShell into the DataLayerProvider context. */
function DataLayerSync({ layer, setLayer }: { layer: DataLayer; setLayer: (l: DataLayer) => void }) {
  const ctx = useDataLayer()
  useEffect(() => {
    if (ctx.layer !== layer) ctx.setLayer(layer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer])
  // Also: if the context changes (e.g. via the pill), pull it back into local state
  useEffect(() => {
    if (ctx.layer !== layer) setLayer(ctx.layer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.layer])
  return null
}

function BetterUpAuditPage({ eraMode }: { eraMode: boolean }) {
  const [authed, setAuthed] = useState(false)
  const page = eraMode ? 'era' : 'full'

  useEffect(() => {
    loadBetterUpFonts()
    if (isAuthed()) setAuthed(true)
  }, [])

  if (!authed) return <PasswordGate page={page} onAuth={() => setAuthed(true)} />
  return <AuditShell eraMode={eraMode} />
}

export default function BetterUpAudit() {
  return <BetterUpAuditPage eraMode={false} />
}

export function BetterUpAuditEra() {
  return <BetterUpAuditPage eraMode />
}

// MetricCard re-export to satisfy data-driven future sections
export { MetricCard, ProfileCard }
