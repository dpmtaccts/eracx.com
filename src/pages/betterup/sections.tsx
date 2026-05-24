import { useState } from 'react'
import { usePostHog } from '@posthog/react'
import {
  Callout,
  DimensionGauge,
  ExpandableCard,
  Gauge,
  MetricCard,
  PillBar,
  Reveal,
  Section,
  SectionHeader,
} from './components'
import { FONT, colorForScore, useTheme } from './theme'
import {
  CASCADE_ADOPTION_CALLOUT,
  CASCADE_BREAK_CALLOUT,
  CASCADE_HEADLINE,
  CASCADE_INTRO,
  CASCADE_LAYERS,
  type CascadeLayer,
} from './data/cascade'
import {
  CHANNELS,
  GTM_COMPOSITE_SCORE,
  GTM_HEADLINE,
  GTM_REFRAME,
  MOODLIGHT_CALLOUTS,
  type GTMChannel,
} from './data/gtm'
import { COMPANY_PAGE } from './data/companyPage'
import { ALEXI_COMMENTER_MIX, NETWORK_REACH, PROFILE_VISUALS } from './data/profiles'
import { BRAND_HEALTH, BRAND_HEALTH_NOTE } from './data/brandHealth'
import type { ThemePalette } from './theme'
import { BrandHealthOnly } from './dataLayer'
import { track } from './analytics'
import { SIGNALS, SIGNALS_AVG_ALIGNMENT, SIGNALS_CRITICAL_GAPS, SIGNALS_FINDING, SIGNALS_HEADLINE, SIGNALS_STRONG, type Signal } from './data/signals'

/* ──────────────────────────────────────────────
   Section 2: Brand Conviction Cascade
   ────────────────────────────────────────────── */
export function CascadeSection() {
  const { palette } = useTheme()
  const opener = betterupAudit.openers?.cascade
  return (
    <Section id="cascade" background={palette.parchment}>
      <IssueBar number="▶︎05.1" name="What employees say about you" meta={[{ label: 'Score', value: '41' }, { label: 'Weight', value: '25%' }, 'BetterUp']} />
      {opener && <SectionOpener {...opener} />}
      <SectionAnalysisDisclosure>
      <SectionHeader kicker="What employees say about you" headline={CASCADE_HEADLINE} intro={CASCADE_INTRO} shareId="cascade" />

      <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48 }}>
          {CASCADE_LAYERS.map((layer, i) => (
            <CascadeLayerRow
              key={layer.number}
              layer={layer}
              nextLayer={CASCADE_LAYERS[i + 1]}
              isLast={i === CASCADE_LAYERS.length - 1}
            />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <Callout tone="red">
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: palette.red,
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Cascade break
          </div>
          {CASCADE_BREAK_CALLOUT}
        </Callout>
      </Reveal>

      <Reveal>
        <div style={{ marginTop: 24 }}>
          <Callout tone="rust">
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: palette.rust,
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              The adoption gap
            </div>
            {CASCADE_ADOPTION_CALLOUT}
          </Callout>
        </div>
      </Reveal>

      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {CASCADE_LAYERS.map((layer) => (
          <ExpandableCard
            key={layer.number}
            trackId={`cascade-${layer.number}-${layer.name}`}
            title={
              <span>
                <span style={{ fontFamily: FONT.mono, color: palette.textDim, marginRight: 12, fontSize: 16 }}>
                  {layer.number}
                </span>
                {layer.name}
                {layer.oldName && (
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: palette.textDim,
                      marginLeft: 12,
                      fontWeight: 400,
                    }}
                  >
                    was "{layer.oldName}"
                  </span>
                )}
              </span>
            }
            meta={`${layer.question} · ${layer.score}/100 · ${layer.status}`}
          >
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              <div>
                <Label>Conviction signals we look for</Label>
                <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {layer.signals.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                <Label>BetterUp assessment</Label>
                <p style={{ margin: 0 }}>{layer.assessment}</p>
              </div>
              <div>
                <Label>Evidence</Label>
                <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {layer.evidence.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>
      </SectionAnalysisDisclosure>
    </Section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        fontFamily: FONT.body,
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: palette.textDim,
        marginBottom: 10,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  )
}

function CascadeLayerRow({ layer, nextLayer, isLast }: { layer: CascadeLayer; nextLayer?: CascadeLayer; isLast: boolean }) {
  const { palette } = useTheme()
  const stroke = colorForScore(palette, layer.score)
  const isBreak = layer.status === 'Cascade Break'
  const statusColor =
    isBreak ? palette.red
      : layer.status === 'Weak Flow' ? palette.rust
      : layer.status === 'Partial Flow' ? palette.amber
      : palette.green

  // Connector: thickness proportional to layer score (waterfall losing force)
  const connectorWidth = Math.max(2, Math.round((layer.score / 100) * 20))
  const nextStroke = nextLayer ? colorForScore(palette, nextLayer.score) : palette.border

  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      {/* gauge column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80, position: 'relative' }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: `2px solid ${stroke}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: palette.card,
            fontFamily: FONT.mono,
            fontSize: 18,
            color: palette.text,
            fontWeight: 500,
            flex: '0 0 auto',
            boxShadow: isBreak ? `0 0 0 6px ${palette.red}22, 0 0 24px ${palette.red}44` : 'none',
            zIndex: 2,
          }}
        >
          {layer.score}
        </div>
        {!isLast && (
          <div
            style={{
              width: connectorWidth,
              flex: 1,
              background: `linear-gradient(${stroke}, ${nextStroke})`,
              minHeight: 36,
              marginTop: 2,
              borderRadius: connectorWidth,
              opacity: isBreak ? 0.3 : 1,
              transition: 'all 0.6s',
            }}
          />
        )}
        {isBreak && (
          <div
            style={{
              position: 'absolute',
              top: 60,
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: '0.16em',
              color: palette.red,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            BREAK
          </div>
        )}
      </div>
      {/* content */}
      <div
        style={{
          flex: 1,
          background: palette.card,
          border: `1px solid ${isBreak ? palette.red : palette.border}`,
          borderLeft: `4px solid ${stroke}`,
          borderRadius: 4,
          padding: '20px 24px',
          marginBottom: isLast ? 0 : 16,
          boxShadow: isBreak ? `0 4px 24px ${palette.red}22` : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 6 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 12, color: palette.textDim }}>{layer.number}</span>
          <span style={{ fontFamily: FONT.display, fontSize: 22, color: palette.text }}>{layer.name}</span>
          {layer.oldName && (
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: palette.textDim,
              }}
            >
              was "{layer.oldName}"
            </span>
          )}
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: statusColor,
              border: `1px solid ${statusColor}`,
              padding: '3px 10px',
              borderRadius: 999,
              fontWeight: 600,
              background: isBreak ? palette.red : 'transparent',
              ...(isBreak ? { color: '#FFFFFF' } : {}),
            }}
          >
            {layer.status}
          </span>
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 14, color: palette.textMuted }}>{layer.question}</div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Section 3: GTM Signal Chain — visual rebuild
   ────────────────────────────────────────────── */
export function GTMSection() {
  const { palette } = useTheme()
  const [activeTab, setActiveTab] = useState<GTMChannel['id']>('ceo')
  const channel = CHANNELS.find((c) => c.id === activeTab)!
  const opener = betterupAudit.openers?.leaders

  return (
    <Section id="leaders">
      <IssueBar number="▶︎05.2" name="What your leaders publish" meta={[{ label: 'Score', value: '24' }, { label: 'Weight', value: '35%' }, 'BetterUp']} />
      {opener && <SectionOpener {...opener} />}
      <SectionAnalysisDisclosure>
      <SectionHeader
        kicker="What your leaders publish"
        headline="Your buyer is conducting due diligence on LinkedIn right now."
        intro="She is looking at your CEO's profile, your sales team, BetterUp's company page, your coaches, and your clients. Each of those profiles is either building trust or eroding it depending on what she finds. What follows is the chain she actually encounters when she goes looking."
        shareId="leaders"
      />

      <Reveal>
        <NetworkReachVisual />
      </Reveal>

      <div style={{ height: 32 }} />

      <Reveal>
        <CompositeStrip />
      </Reveal>

      <div style={{ height: 56 }} />

      {/* Avatar tab nav */}
      <Reveal>
        <AvatarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Reveal>

      <div style={{ height: 36 }} />

      <Reveal key={activeTab}>
        <ChannelDetail channel={channel} />
      </Reveal>

      {/* Brand health scorecard — Pinwheel-sourced, hidden in ERA-only mode */}
      <BrandHealthOnly placeholder={<BrandHealthHiddenPlaceholder />}>
        <div style={{ height: 80 }} />
        <Reveal>
          <BrandHealthScorecard />
        </Reveal>
      </BrandHealthOnly>

      {/* Buyer behavior callouts (renamed from Moodlight) */}
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Reveal>
          <Callout tone="sky">
            <div style={smallLabel(palette.sky)}>Buyer behavior · Why the chain matters</div>
            {MOODLIGHT_CALLOUTS.whyChainMatters}
          </Callout>
        </Reveal>
        <Reveal>
          <Callout tone="magenta">
            <div style={smallLabel(palette.magenta)}>Buyer behavior · Why philosophy fails</div>
            {MOODLIGHT_CALLOUTS.whyPhilosophyFails}
          </Callout>
        </Reveal>
        <Reveal>
          <Callout tone="rust">
            <div style={smallLabel(palette.rust)}>Buyer behavior · The share test</div>
            {MOODLIGHT_CALLOUTS.shareTest}
          </Callout>
        </Reveal>
      </div>
      </SectionAnalysisDisclosure>
    </Section>
  )
}

/* ── Composite strip ───────────────────────── */
function CompositeStrip() {
  const { palette } = useTheme()
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 6,
        padding: '28px 32px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 32,
        alignItems: 'center',
      }}
    >
      <Gauge score={GTM_COMPOSITE_SCORE} benchmark={50} benchmarkLabel="functional floor" size={130} label="Composite Leaders score" />
      <div>
        <div style={smallLabel(palette.rust)}>{GTM_HEADLINE}</div>
        <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.6, color: palette.textMuted, margin: 0 }}>
          {GTM_REFRAME}
        </p>
      </div>
    </div>
  )
}

/* ── Network reach visual ──────────────────── */
function NetworkReachVisual() {
  const { palette } = useTheme()
  const total = NETWORK_REACH.combinedHuman
  const pageMax = Math.max(total, NETWORK_REACH.brandPage.value)
  return (
    <div
      style={{
        background: palette.text,
        color: palette.bg,
        borderRadius: 8,
        padding: '32px 36px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#D86A48',
              marginBottom: 8,
            }}
          >
            Algorithm hierarchy
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 30, lineHeight: 1.2, maxWidth: 720 }}>
            LinkedIn ranks people over pages. The real reach lives in the humans, not the brand handle.
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 56, color: '#D86A48', lineHeight: 1 }}>
            {NETWORK_REACH.multiplier}
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            human network vs page
          </div>
        </div>
      </div>

      {/* Brand page bar */}
      <ReachRow
        label="Company page"
        sublabel="LinkedIn algorithmically suppresses brand page reach"
        value={NETWORK_REACH.brandPage.value}
        max={pageMax}
        format={NETWORK_REACH.brandPage.format}
        color="rgba(255,255,255,0.25)"
      />

      <div style={{ height: 18 }} />

      {/* Combined human bar */}
      <ReachRow
        label="Combined human network"
        sublabel="Person-to-person posts get 5–10× the organic reach"
        value={total}
        max={pageMax}
        format={NETWORK_REACH.combinedHumanFormat}
        color="#D86A48"
      />

      {/* Human breakdown */}
      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}
      >
        {NETWORK_REACH.human.map((h) => (
          <div key={h.label}>
            <div style={{ fontFamily: FONT.mono, fontSize: 11, opacity: 0.55, marginBottom: 4 }}>{h.label}</div>
            <div style={{ fontFamily: FONT.display, fontSize: 22, color: '#FFFFFF' }}>{h.format}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontFamily: FONT.body,
          fontSize: 14,
          lineHeight: 1.6,
          opacity: 0.8,
          maxWidth: 820,
        }}
      >
        The LinkedIn page's 241K followers look impressive on the surface, and the algorithm quietly suppresses most of what gets posted there. The real reach multiplier is the CEO at 48K, the 4,000-plus coaches with their own networks, and the sellers and account managers a buyer is far likelier to encounter than the brand handle. What matters most is not more LinkedIn page content; it is activating the humans in the signal chain.
      </div>
    </div>
  )
}

function ReachRow({
  label, sublabel, value, max, format, color,
}: { label: string; sublabel: string; value: number; max: number; format: string; color: string }) {
  const pct = (value / max) * 100
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, gap: 12 }}>
        <div>
          <div style={{ fontFamily: FONT.body, fontSize: 14, color: '#FFFFFF', fontWeight: 600 }}>{label}</div>
          <div style={{ fontFamily: FONT.body, fontSize: 12, opacity: 0.55, marginTop: 2 }}>{sublabel}</div>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 18, color: '#FFFFFF' }}>{format}</div>
      </div>
      <div
        style={{
          height: 14,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </div>
  )
}

/* ── Avatar tabs ───────────────────────────── */
function AvatarTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: GTMChannel['id']
  setActiveTab: (id: GTMChannel['id']) => void
}) {
  const posthog = usePostHog()
  const { palette } = useTheme()
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12,
      }}
    >
      {CHANNELS.map((c) => {
        const v = PROFILE_VISUALS[c.id]
        const isActive = c.id === activeTab
        const accent = palette[v.color]
        return (
          <button
            key={c.id}
            onClick={() => { void track('tab_click', c.id, 'full'); posthog?.capture('audit_tab_clicked', { tab_id: c.id }); setActiveTab(c.id) }}
            style={{
              background: isActive ? palette.card : 'transparent',
              border: `1px solid ${isActive ? accent : palette.border}`,
              borderRadius: 6,
              padding: '16px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textAlign: 'left',
              transition: 'all 0.2s',
              fontFamily: FONT.body,
              color: palette.text,
            }}
          >
            <Avatar initials={v.initials} color={accent} active={isActive} photo={v.photo} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: 13,
                  fontWeight: 600,
                  color: palette.text,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {c.name}
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 13, color: colorForScore(palette, c.score), marginTop: 2 }}>
                {c.score}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function Avatar({
  initials,
  color,
  active,
  size = 40,
  photo,
}: {
  initials: string
  color: string
  active?: boolean
  size?: number
  photo?: string | null
}) {
  if (photo) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${active ? color : 'transparent'}`,
          boxShadow: active ? `0 0 0 1px ${color}` : 'none',
          flex: '0 0 auto',
          transition: 'all 0.2s',
          filter: active ? 'none' : 'grayscale(0.4)',
        }}
      >
        <img
          src={photo}
          alt={initials}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    )
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: active ? color : 'transparent',
        border: `1.5px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT.body,
        fontSize: size * 0.36,
        fontWeight: 600,
        color: active ? '#FFFFFF' : color,
        flex: '0 0 auto',
        letterSpacing: '0.02em',
        transition: 'all 0.2s',
      }}
    >
      {initials}
    </div>
  )
}

/* ── Posting cadence sparkline ─────────────── */
function CadenceTimeline({ data, color }: { data: number[]; color: string }) {
  const { palette } = useTheme()
  const max = Math.max(...data, 1)
  const months = ['M','A','M','J','J','A','S','O','N','D','J','F']
  return (
    <div>
      <div style={smallLabel(palette.textDim)}>Posting cadence (last 12 months)</div>
      <div
        style={{
          marginTop: 14,
          display: 'grid',
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          gap: 6,
          alignItems: 'end',
          height: 80,
        }}
      >
        {data.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%' }}>
            <div
              style={{
                flex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${(v / max) * 100}%`,
                  background: v === 0 ? palette.border : color,
                  borderRadius: 2,
                  minHeight: v === 0 ? 4 : 8,
                  opacity: v === 0 ? 0.5 : 1,
                  transition: 'height 0.6s ease',
                }}
              />
            </div>
            <div style={{ fontFamily: FONT.mono, fontSize: 9, color: palette.textDim }}>{months[i % 12]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Commenter mix bar ─────────────────────── */
function CommenterMix() {
  const { palette } = useTheme()
  return (
    <div
      style={{
        background: palette.cardAlt,
        border: `1px solid ${palette.border}`,
        borderRadius: 6,
        padding: '24px 28px',
      }}
    >
      <div style={smallLabel(palette.rust)}>Commenter breakdown · Alexi's posts</div>
      <p style={{ fontFamily: FONT.body, fontSize: 14, color: palette.textMuted, margin: '8px 0 18px' }}>
        Who is actually engaging when the CEO posts. The enterprise buyer is absent.
      </p>
      {/* stacked horizontal bar */}
      <div
        style={{
          display: 'flex',
          height: 28,
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 18,
          background: palette.border,
        }}
      >
        {ALEXI_COMMENTER_MIX.filter((s) => s.pct > 0).map((s) => {
          const c = (palette as unknown as Record<string, string>)[s.color] ?? palette.textMuted
          return (
            <div
              key={s.label}
              style={{
                width: `${s.pct}%`,
                background: c,
                transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
              }}
              title={`${s.label}: ${s.pct}%`}
            />
          )
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        {ALEXI_COMMENTER_MIX.map((s) => {
          const c = (palette as unknown as Record<string, string>)[s.color] ?? palette.textMuted
          return (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: c,
                  flex: '0 0 auto',
                  opacity: s.ghost ? 0.3 : 1,
                  border: s.ghost ? `1px dashed ${c}` : 'none',
                }}
              />
              <div style={{ fontFamily: FONT.body, fontSize: 13, color: palette.text, flex: 1 }}>{s.label}</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 13, color: s.ghost ? palette.red : palette.text }}>
                {s.pct}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Channel detail ────────────────────────── */
function ChannelDetail({ channel }: { channel: GTMChannel }) {
  const { palette } = useTheme()
  const v = PROFILE_VISUALS[channel.id]
  const accent = palette[v.color]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Profile card with avatar */}
      <div
        style={{
          background: palette.text,
          color: palette.bg,
          borderRadius: 8,
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <Avatar initials={v.initials} color={accent} active size={84} photo={v.photo} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontFamily: FONT.display, fontSize: 30, lineHeight: 1.1 }}>{channel.name}</div>
          <div style={{ fontFamily: FONT.body, fontSize: 14, opacity: 0.7, marginTop: 6 }}>{channel.title}</div>
          {channel.followers && (
            <div style={{ fontFamily: FONT.mono, fontSize: 12, opacity: 0.6, marginTop: 8, letterSpacing: '0.04em' }}>
              {channel.followers} followers
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 56, lineHeight: 1, color: colorForScore(palette, channel.score) }}>
            {channel.score}
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            Profile score / 100
          </div>
        </div>
      </div>

      {/* Hero metrics with spark bars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 16,
        }}
      >
        {channel.metrics.map((m) => (
          <SparkMetric key={m.label} value={m.value} label={m.label} accent={accent} />
        ))}
      </div>

      {/* Cadence + dimensions side-by-side */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        <div
          style={{
            background: palette.card,
            border: `1px solid ${palette.border}`,
            borderRadius: 6,
            padding: '24px 28px',
          }}
        >
          <CadenceTimeline data={v.cadence} color={accent} />
        </div>
        <div
          style={{
            background: palette.card,
            border: `1px solid ${palette.border}`,
            borderRadius: 6,
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {channel.dimensions.map((d) => (
            <DimensionGauge key={d.label} label={d.label} score={d.score} size={84} />
          ))}
        </div>
      </div>

      {/* Dimension notes */}
      <div
        style={{
          background: palette.card,
          border: `1px solid ${palette.border}`,
          borderRadius: 6,
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {channel.dimensions.map((d) => (
          d.note && (
            <div key={d.label} style={{ fontFamily: FONT.body, fontSize: 13, lineHeight: 1.55, color: palette.textMuted }}>
              <span style={{ color: palette.text, fontWeight: 600 }}>{d.label}. </span>
              {d.note}
            </div>
          )
        ))}
      </div>

      {/* Commenter mix (CEO only) */}
      {channel.id === 'ceo' && <CommenterMix />}

      {/* Key finding */}
      <Callout tone="rust">
        <div style={smallLabel(palette.rust)}>Key finding</div>
        {channel.keyFinding}
      </Callout>

      {/* If you read only this */}
      <div
        style={{
          background: palette.card,
          border: `1px solid ${palette.border}`,
          borderRadius: 6,
          padding: '28px 32px',
        }}
      >
        <div style={smallLabel(palette.textDim)}>If you read only this</div>
        <ol style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {channel.threeThings.map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 16, fontFamily: FONT.body, fontSize: 15, lineHeight: 1.55, color: palette.text }}>
              <span style={{ fontFamily: FONT.mono, color: accent, flex: '0 0 auto' }}>0{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function SparkMetric({ value, label, accent }: { value: string; label: string; accent: string }) {
  const { palette } = useTheme()
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 6,
        padding: '20px 22px',
      }}
    >
      <div style={{ fontFamily: FONT.mono, fontSize: 32, color: palette.text, lineHeight: 1, fontWeight: 500 }}>
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: palette.textMuted,
          marginTop: 8,
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      {/* decorative spark */}
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 20 }}>
        {[0.3, 0.5, 0.4, 0.7, 0.5, 0.9, 0.4, 0.6].map((h, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: `${h * 100}%`,
              background: accent,
              opacity: 0.5 + i * 0.06,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Brand health scorecard ────────────────── */
function BrandHealthHiddenPlaceholder() {
  const { palette } = useTheme()
  return (
    <div style={{ marginTop: 80 }}>
      <div
        style={{
          background: palette.cardAlt,
          border: `1px dashed ${palette.border}`,
          borderRadius: 6,
          padding: '24px 28px',
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          fontFamily: FONT.body,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.textDim} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.textDim, fontWeight: 600 }}>
            Brand Health layer hidden
          </div>
          <div style={{ fontSize: 13, color: palette.textMuted, marginTop: 4 }}>
            Competitive brand health benchmark vs. CoachHub, Torch, and Ezra appears here when the Brand Health data layer is enabled.
          </div>
        </div>
      </div>
    </div>
  )
}

function BrandHealthScorecard() {
  const { palette } = useTheme()
  return (
    <div>
      <div style={smallLabel(palette.rust)}>Competitive brand health</div>
      <h3 style={{ fontFamily: FONT.display, fontSize: 30, color: palette.text, margin: '8px 0 24px', fontWeight: 400 }}>
        BetterUp vs. CoachHub, Torch, Ezra
      </h3>
      <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.6, color: palette.textMuted, margin: '0 0 32px', maxWidth: 760 }}>
        {BRAND_HEALTH_NOTE}
      </p>

      <div
        style={{
          background: palette.card,
          border: `1px solid ${palette.border}`,
          borderRadius: 6,
          padding: '28px 32px',
        }}
      >
        {/* legend */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${palette.border}` }}>
          <LegendDot color={palette.rust} label="BetterUp" />
          <LegendDot color={palette.sky} label="CoachHub" />
          <LegendDot color={palette.amber} label="Torch" />
          <LegendDot color={palette.magenta} label="Ezra" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {BRAND_HEALTH.map((d) => (
            <BrandHealthRow key={d.dim} dim={d} palette={palette} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  const { palette } = useTheme()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
      <span style={{ fontFamily: FONT.body, fontSize: 12, color: palette.text }}>{label}</span>
    </div>
  )
}

function BrandHealthRow({ dim, palette }: { dim: typeof BRAND_HEALTH[number]; palette: ThemePalette }) {
  const series = [
    { value: dim.betterup, color: palette.rust, key: 'BU' },
    { value: dim.coachhub, color: palette.sky, key: 'CH' },
    { value: dim.torch, color: palette.amber, key: 'T' },
    { value: dim.ezra, color: palette.magenta, key: 'E' },
  ]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div style={{ fontFamily: FONT.body, fontSize: 13, color: palette.text, fontWeight: 600 }}>{dim.dim}</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 12, color: palette.textMuted }}>
          BetterUp <span style={{ color: palette.rust }}>{dim.betterup}</span>
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          height: 28,
          background: palette.cardAlt,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {series.map((s) => (
          <div
            key={s.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${s.value}%`,
              background: 'transparent',
              borderRight: `2px solid ${s.color}`,
            }}
            title={`${s.key}: ${s.value}`}
          />
        ))}
        {/* BetterUp filled bar (primary) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${dim.betterup}%`,
            background: palette.rust,
            opacity: 0.18,
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </div>
  )
}

const smallLabel = (color: string) => ({
  fontFamily: FONT.body,
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color,
  marginBottom: 12,
  fontWeight: 600 as const,
})


/* ──────────────────────────────────────────────
   Section 4: Content-to-Pipeline Signal Map
   ────────────────────────────────────────────── */
export function SignalsSection() {
  const { palette } = useTheme()
  const opener = betterupAudit.openers?.signals
  return (
    <Section id="signals">
      <IssueBar number="▶︎05.4" name="What you publish about yourself" meta={[{ label: 'Score', value: '29' }, { label: 'Weight', value: '25%' }, 'BetterUp']} />
      {opener && <SectionOpener {...opener} />}
      <SectionAnalysisDisclosure>
      <SectionHeader kicker="What you publish about yourself" headline={SIGNALS_HEADLINE} shareId="signals" />

      <Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <MetricCard value={`${SIGNALS_AVG_ALIGNMENT}%`} label="Average signal alignment" accent={palette.red} />
          <MetricCard value={SIGNALS_CRITICAL_GAPS} label="Critical signal gaps" accent={palette.red} />
          <MetricCard value={SIGNALS_STRONG} label="Strong alignment" accent={palette.green} />
        </div>
      </Reveal>

      <Reveal>
        <Callout tone="rust">{SIGNALS_FINDING}</Callout>
      </Reveal>

      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {SIGNALS.map((s) => (
          <SignalCard key={s.name} signal={s} />
        ))}
      </div>
      </SectionAnalysisDisclosure>
    </Section>
  )
}

function SignalCard({ signal }: { signal: Signal }) {
  const { palette } = useTheme()
  const [open, setOpen] = useState(false)
  const badgeColor =
    signal.category === 'Critical Gap' ? palette.red
    : signal.category === 'High Gap' ? palette.rust
    : palette.green
  // Spec color tiers: red <25, amber 26-50, blue 51-75, green 76+
  const barColor =
    signal.alignment < 26 ? palette.red
    : signal.alignment <= 50 ? palette.amber
    : signal.alignment <= 75 ? palette.sky
    : palette.green

  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '24px 28px',
          cursor: 'pointer',
          textAlign: 'left',
          color: palette.text,
          fontFamily: FONT.body,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: badgeColor,
                border: `1px solid ${badgeColor}`,
                padding: '3px 10px',
                borderRadius: 999,
                fontWeight: 600,
              }}
            >
              {signal.category}
            </span>
            <span style={{ fontFamily: FONT.display, fontSize: 22, color: palette.text }}>{signal.name}</span>
          </div>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 18,
              color: palette.textMuted,
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          >
            +
          </span>
        </div>
        <PillBar value={signal.alignment} label="Alignment with buyer intent" rightLabel={`${signal.alignment}%`} color={barColor} height={10} />
      </button>
      {open && (
        <div
          style={{
            padding: '0 28px 28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          <Quad label="What they're signaling" body={signal.signaling} palette={palette} />
          <Quad label="What the buyer needs" body={signal.buyerNeeds} palette={palette} />
          <Quad label="Pipeline impact" body={signal.pipelineImpact} palette={palette} accent={palette.red} />
          <Quad label="Signal fix" body={signal.fix} palette={palette} accent={palette.green} />
        </div>
      )}
    </div>
  )
}

function Quad({ label, body, palette, accent }: { label: string; body: string; palette: ReturnType<typeof useTheme>['palette']; accent?: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: accent ?? palette.textDim,
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.55, color: palette.text }}>{body}</div>
    </div>
  )
}

// Re-export for any future use
export { COMPANY_PAGE }

/* ──────────────────────────────────────────────
   Section 5: Audience Reality
   ────────────────────────────────────────────── */
import {
  ACTIVE_TENSIONS,
  AUDIENCE_HEADLINE,
  BUYER_JOURNEY,
  DEAD_ZONES,
  KEY_METRICS,
  VELOCITY_SHIFTS,
  WHO_THEY_THINK_VS_REAL,
} from './data/audience'

export function AudienceSection() {
  const { palette } = useTheme()
  const opener = betterupAudit.openers?.audience
  return (
    <Section id="audience" background={palette.yellow}>
      <IssueBar number="▶︎05.6" name="Audience Reality" meta={['BetterUp', 'CHRO buyer']} />
      {opener && <SectionOpener {...opener} />}
      <SectionAnalysisDisclosure>
      <SectionHeader kicker="Audience Reality" headline={AUDIENCE_HEADLINE} shareId="audience" />

      {/* Persona card — visual, not prose */}
      <Reveal>
        <PersonaCard />
      </Reveal>

      <div style={{ height: 64 }} />

      {/* Hero metric cards — bigger, bolder */}
      <Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
            marginBottom: 80,
          }}
        >
          {KEY_METRICS.map((m, i) => <HeroMetricCard key={m.label} m={m} index={i} />)}
        </div>
      </Reveal>

      {/* Thinks vs Actual */}
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div style={smallLabel(palette.rust)}>What BetterUp thinks vs. what is actually listening</div>
          <div
            style={{
              marginTop: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 16,
            }}
          >
            <ThinksVsActualCol
              label="What BetterUp thinks the audience is"
              items={WHO_THEY_THINK_VS_REAL.thinks}
              tone="muted"
            />
            <ThinksVsActualCol
              label="Who is actually listening"
              items={WHO_THEY_THINK_VS_REAL.actual}
              tone="real"
            />
          </div>
        </div>
      </Reveal>

      {/* Active tensions — tug-of-war */}
      <Reveal>
        <div style={{ marginBottom: 80 }}>
          <div style={smallLabel(palette.rust)}>Three tensions the buyer is navigating</div>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ACTIVE_TENSIONS.map((t) => <TugOfWarCard key={t.title} title={t.title} body={t.body} />)}
          </div>
        </div>
      </Reveal>

      {/* Dead zones */}
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div style={smallLabel(palette.rust)}>Dead zones · what the audience ignores</div>
          <div
            style={{
              marginTop: 16,
              background: palette.card,
              border: `1px solid ${palette.border}`,
              borderRadius: 6,
              padding: '24px 28px',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {DEAD_ZONES.map((d) => (
                <li
                  key={d}
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 15,
                    color: palette.textMuted,
                    opacity: 0.6,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: `1.5px solid ${palette.red}`,
                      color: palette.red,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: '0 0 auto',
                      marginTop: 3,
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Buyer journey */}
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div style={smallLabel(palette.rust)}>How they evaluate · the buyer journey this audience actually follows</div>
          <div
            style={{
              marginTop: 24,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 0,
              position: 'relative',
            }}
          >
            {BUYER_JOURNEY.map((s, i) => (
              <div
                key={s.stage}
                style={{
                  background: palette.card,
                  border: `1px solid ${palette.border}`,
                  borderTop: `3px solid ${palette.rust}`,
                  padding: '24px 22px',
                  position: 'relative',
                  marginLeft: i === 0 ? 0 : -1,
                }}
              >
                <JourneyIcon index={i} color={palette.rust} />
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    color: palette.rust,
                    letterSpacing: '0.12em',
                    marginBottom: 8,
                    marginTop: 14,
                  }}
                >
                  STAGE 0{i + 1}
                </div>
                <div style={{ fontFamily: FONT.display, fontSize: 20, color: palette.text, marginBottom: 12, lineHeight: 1.2 }}>
                  {s.stage}
                </div>
                <p style={{ fontFamily: FONT.body, fontSize: 13, lineHeight: 1.55, color: palette.textMuted, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Velocity shifts */}
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div style={smallLabel(palette.rust)}>Where they are drifting · velocity shifts</div>
          <div
            style={{
              marginTop: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {VELOCITY_SHIFTS.map((v) => {
              const [from, to] = v.label.includes('→') ? v.label.split('→').map((s) => s.trim()) : [v.label, '']
              return (
                <div
                  key={v.label}
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 6,
                    padding: '22px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* trend icon */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: palette.rustSoft,
                      color: palette.rust,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 14,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 17 9 11 13 15 21 7" />
                      <polyline points="14 7 21 7 21 14" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, color: palette.textDim, lineHeight: 1.5, marginBottom: 4 }}>
                    {from}
                  </div>
                  {to && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.rust} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                      <div style={{ fontFamily: FONT.body, fontSize: 14, color: palette.text, fontWeight: 600, lineHeight: 1.3 }}>
                        {to}
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      color: palette.textMuted,
                      marginTop: 10,
                      paddingTop: 10,
                      borderTop: `1px solid ${palette.border}`,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {v.note}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Platform behavior — pull quote */}
      <Reveal>
        <BehaviorPullQuote
          kicker="How BetterUp's buyers behave online"
          quote="They consume in private, decide in committee, and share only what makes them look informed, not enthusiastic."
          caption="The conversation lives in financial press and curated feeds, not in coaching communities. LinkedIn engagement signals nothing because they don't engage publicly."
          tone="sky"
        />
      </Reveal>

      {/* Turnoff — pull quote */}
      <div style={{ height: 48 }} />
      <Reveal>
        <BehaviorPullQuote
          kicker="The turnoff"
          quote="Lead with the human, substantiate with the AI. Not the other way around."
          caption="96.6% of AI-coaching conversation is emotionally neutral. Any campaign that opens with 'AI-powered' is filtered as noise."
          tone="red"
        />
      </Reveal>
      </SectionAnalysisDisclosure>
    </Section>
  )
}

/* ── Persona card ─────────────────────────── */
function PersonaCard() {
  const { palette } = useTheme()
  const traits = [
    'Mid-career operator',
    'CHRO · VP L&D · CPO',
    'Defends budget to the CFO',
    'Vendor-fatigued',
    'Buys in committee',
    'Quietly skeptical',
  ]
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 8,
        padding: '36px 40px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 32,
        alignItems: 'center',
      }}
    >
      {/* Persona icon */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: palette.rustSoft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: palette.rust,
          flex: '0 0 auto',
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
        </svg>
      </div>

      <div>
        <div style={smallLabel(palette.rust)}>The buyer</div>
        <div style={{ fontFamily: FONT.display, fontSize: 28, color: palette.text, lineHeight: 1.2, margin: '8px 0 16px' }}>
          Risk-aware enterprise operator, emotionally locked in neutral.
        </div>
        {/* Trait chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {traits.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: FONT.body,
                fontSize: 12,
                color: palette.text,
                background: palette.cardAlt,
                border: `1px solid ${palette.border}`,
                padding: '5px 12px',
                borderRadius: 999,
                letterSpacing: '0.02em',
              }}
            >
              {t}
            </span>
          ))}
        </div>
        {/* Emotional state spectrum */}
        <EmotionSpectrum />
      </div>
    </div>
  )
}

function EmotionSpectrum() {
  const { palette } = useTheme()
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.body, fontSize: 11, color: palette.textDim, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        <span>Hostile</span>
        <span style={{ color: palette.rust, fontWeight: 600 }}>Locked neutral</span>
        <span>Enthusiastic</span>
      </div>
      <div style={{ position: 'relative', height: 6, background: `linear-gradient(90deg, ${palette.red}, ${palette.amber}, ${palette.green})`, borderRadius: 3, opacity: 0.4 }}>
        <div
          style={{
            position: 'absolute',
            left: '46%',
            top: -6,
            width: 18,
            height: 18,
            background: palette.rust,
            border: `3px solid ${palette.bg}`,
            borderRadius: '50%',
            boxShadow: `0 2px 8px ${palette.rust}44`,
          }}
        />
      </div>
    </div>
  )
}

/* ── Hero metric card ─────────────────────── */
function HeroMetricCard({ m, index }: { m: { value: string; label: string; sub: string }; index: number }) {
  const { palette } = useTheme()
  const accents = [palette.rust, palette.magenta, palette.red, palette.amber, palette.sky, palette.textMuted]
  const accent = accents[index % accents.length]
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 4,
        padding: '32px 28px 28px',
        position: 'relative',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 'clamp(48px, 5vw, 64px)',
          color: accent,
          lineHeight: 0.95,
          fontWeight: 500,
          letterSpacing: '-0.02em',
        }}
      >
        {m.value}
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 14,
          color: palette.text,
          marginTop: 14,
          lineHeight: 1.35,
          fontWeight: 600,
        }}
      >
        {m.label}
      </div>
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 12,
          color: palette.textMuted,
          marginTop: 8,
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}
      >
        {m.sub}
      </div>
    </div>
  )
}

/* ── Tug-of-war tension card ──────────────── */
function TugOfWarCard({ title, body }: { title: string; body: string }) {
  const { palette } = useTheme()
  // Title format: "X" vs. "Y"
  const match = title.match(/"([^"]+)"\s*vs\.?\s*"([^"]+)"/)
  const left = match?.[1] ?? title
  const right = match?.[2] ?? ''
  return (
    <div
      style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 6,
        padding: '24px 28px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ textAlign: 'right', fontFamily: FONT.display, fontSize: 17, color: palette.text, lineHeight: 1.3 }}>
          “{left}”
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: FONT.mono,
            fontSize: 11,
            color: palette.rust,
            letterSpacing: '0.12em',
          }}
        >
          <span style={{ fontSize: 18 }}>⇄</span>
          <span>VS</span>
        </div>
        <div style={{ fontFamily: FONT.display, fontSize: 17, color: palette.text, lineHeight: 1.3 }}>
          “{right}”
        </div>
      </div>
      {/* Spectrum bar with marker */}
      <div style={{ position: 'relative', height: 4, background: palette.border, borderRadius: 2, marginBottom: 16 }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: -5,
            transform: 'translateX(-50%)',
            width: 14,
            height: 14,
            background: palette.rust,
            border: `2px solid ${palette.bg}`,
            borderRadius: '50%',
          }}
        />
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 13, lineHeight: 1.6, color: palette.textMuted, margin: 0 }}>
        {body}
      </div>
    </div>
  )
}

/* ── Behavior pull quote ──────────────────── */
function BehaviorPullQuote({
  kicker,
  quote,
  caption,
  tone,
}: {
  kicker: string
  quote: string
  caption: string
  tone: 'sky' | 'red'
}) {
  const { palette } = useTheme()
  const accent = tone === 'sky' ? palette.sky : palette.red
  return (
    <div>
      <div style={smallLabel(accent)}>{kicker}</div>
      <blockquote
        style={{
          margin: '20px 0 16px',
          padding: '0 0 0 28px',
          borderLeft: `4px solid ${accent}`,
          fontFamily: FONT.display,
          fontStyle: 'italic',
          fontSize: 'clamp(26px, 3.2vw, 38px)',
          lineHeight: 1.25,
          color: palette.text,
          fontWeight: 400,
          maxWidth: 880,
        }}
      >
        {quote}
      </blockquote>
      <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.6, color: palette.textMuted, margin: '0 0 0 32px', maxWidth: 760 }}>
        {caption}
      </p>
    </div>
  )
}

function JourneyIcon({ index, color }: { index: number; color: string }) {
  const props = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  // 0 compass, 1 magnifier, 2 scales, 3 handshake
  if (index === 0) {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  }
  if (index === 1) {
    return (
      <svg {...props}>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16" y2="16" />
      </svg>
    )
  }
  if (index === 2) {
    return (
      <svg {...props}>
        <line x1="12" y1="3" x2="12" y2="21" />
        <path d="M5 8h14" />
        <path d="M3 13l3-5 3 5a3 3 0 0 1-6 0z" />
        <path d="M15 13l3-5 3 5a3 3 0 0 1-6 0z" />
      </svg>
    )
  }
  // handshake
  return (
    <svg {...props}>
      <path d="M11 17l2 2a1 1 0 0 0 1.41 0l5.59-5.59a2 2 0 0 0 0-2.83l-3.17-3.17a2 2 0 0 0-2.83 0L11 9" />
      <path d="M11 17l-3-3a1 1 0 0 1 0-1.41l5.59-5.59" />
      <path d="M3 12l3-3" />
      <path d="M3 16l4-4" />
    </svg>
  )
}

function ThinksVsActualCol({ label, items, tone }: { label: string; items: string[]; tone: 'muted' | 'real' }) {
  const { palette } = useTheme()
  const isReal = tone === 'real'
  return (
    <div
      style={{
        background: isReal ? palette.card : palette.cardAlt,
        border: `1px solid ${isReal ? palette.rust : palette.border}`,
        borderRadius: 6,
        padding: '24px 28px',
        opacity: isReal ? 1 : 0.7,
      }}
    >
      <div style={smallLabel(isReal ? palette.rust : palette.textDim)}>{label}</div>
      <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              fontFamily: FONT.body,
              fontSize: 14,
              lineHeight: 1.5,
              color: isReal ? palette.text : palette.textMuted,
              display: 'flex',
              gap: 10,
            }}
          >
            <span style={{ color: isReal ? palette.rust : palette.textDim, flex: '0 0 auto' }}>›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Section: Where the brand is concentrated today
   (was "Investment vs. Return". Reframed April 2026 to describe
   visible footprint only, not internal spend or ROI.)
   ────────────────────────────────────────────── */
import {
  FOOTPRINT_NOTE,
  INVESTMENT_HEADLINE,
  PROJECTION_CAVEAT,
  VISIBLE_FOOTPRINT,
} from './data/investment'
import { betterupAudit } from '../../data/audits/betterup'
import { SignalConnectionProjection } from '../../components/revenueSignal'
import { SectionOpener } from '../../components/audit/SectionOpener'
import { IssueBar } from '../../components/audit/IssueBar'
import { SectionAnalysisDisclosure } from '../../components/audit/SectionAnalysisDisclosure'
import { EditorialClosingDiagnosis } from '../../components/audit/EditorialClosingDiagnosis'

export function InvestmentSection() {
  const { palette } = useTheme()
  return (
    <Section id="investment">
      <IssueBar number="▶︎05.7" name="Concentration" meta={['BetterUp']} />
      <SectionHeader
        kicker="Where the brand is concentrated today"
        headline={INVESTMENT_HEADLINE}
        shareId="investment"
      />

      {/* Visible footprint */}
      <Reveal>
        <div style={smallLabel(palette.rust)}>Where the halo lives</div>
        <div
          style={{
            marginTop: 16,
            background: palette.card,
            border: `1px solid ${palette.border}`,
            borderRadius: 6,
            padding: '28px 32px',
            marginBottom: 32,
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {VISIBLE_FOOTPRINT.map((item, idx) => (
              <li
                key={item}
                style={{
                  fontFamily: FONT.body,
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: palette.text,
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <InvestmentIcon index={idx} color={palette.rust} />
                <span style={{ marginTop: 1 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* What concentration alone does and doesn't reach */}
      <Reveal>
        <Callout tone="rust">
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: palette.rust,
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            What concentration alone reaches
          </div>
          {FOOTPRINT_NOTE}
        </Callout>
      </Reveal>

      <div style={{ marginTop: 56 }}>
        <SignalConnectionProjection
          currentScores={betterupAudit.currentScores}
          projectedScores={betterupAudit.projectedScores}
        />
      </div>

      <Reveal>
        <p style={{ marginTop: 24, fontFamily: FONT.body, fontSize: 12, color: palette.textDim, lineHeight: 1.5, fontStyle: 'italic' }}>
          {PROJECTION_CAVEAT}
        </p>
      </Reveal>
    </Section>
  )
}

function InvestmentIcon({ index, color }: { index: number; color: string }) {
  const props = {
    width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: color,
    strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    style: { flex: '0 0 auto' as const, marginTop: 2 },
  }
  // 0 conf, 1 racing, 2 person, 3 article, 4 team, 5 chip
  switch (index) {
    case 0: return <svg {...props}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 22h8M12 18v4" /></svg>
    case 1: return <svg {...props}><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M9 17h6M6 14V8h12v6" /></svg>
    case 2: return <svg {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" /></svg>
    case 3: return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
    case 4: return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    case 5: return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></svg>
    default: return <svg {...props}><circle cx="12" cy="12" r="8" /></svg>
  }
}

/* ──────────────────────────────────────────────
   Section 8: What We'd Build Together
   ────────────────────────────────────────────── */
import { CONTACTS, TEAM } from './data/build'
import { AuditRoadmap } from '../../components/audit/AuditRoadmap'

export function BuildSection() {
  const posthog = usePostHog()
  const { palette } = useTheme()
  const roadmap = betterupAudit.roadmap
  return (
    <Section id="build">
      <IssueBar number="▶︎05.8" name="What we'd build" meta={['BetterUp', 'MVP · THEN · FULL BUILD']} />
      {/* Prescriptive roadmap (MVP → Then → Full Build) */}
      {roadmap && (
        <Reveal>
          <AuditRoadmap {...roadmap} />
        </Reveal>
      )}

      {/* Team */}
      <Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
            marginBottom: 56,
          }}
        >
          {TEAM.map((t, i) => {
            const accent = i === 0 ? palette.rust : palette.magenta
            const logoSrc = t.org === 'ERA' ? '/images/era_symbol.svg' : '/assets/pinwheel_agency_logo.jpg'
            return (
              <div
                key={t.org}
                style={{
                  background: palette.cardAlt,
                  border: `1px solid ${palette.border}`,
                  padding: '28px 32px',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: '#FFFFFF',
                    border: `1px solid ${palette.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0 0 auto',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={logoSrc}
                    alt={t.org}
                    style={{
                      maxWidth: '72%',
                      maxHeight: '72%',
                      width: 'auto',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: FONT.display, fontSize: 22, color: palette.text, marginBottom: 4 }}>{t.org}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 12, fontWeight: 600 }}>
                    {i === 0 ? 'Signal & strategy' : 'Brand & creative'}
                  </div>
                  <div style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.55, color: palette.textMuted }}>
                    {t.scope}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div
          style={{
            background: palette.text,
            color: palette.bg,
            borderRadius: 8,
            padding: '40px 44px',
          }}
        >
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#D86A48',
              marginBottom: 24,
            }}
          >
            Next step
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {CONTACTS.map((c) => (
              <div key={c.email}>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: '#FFFFFF', fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 12, opacity: 0.6, marginTop: 4 }}>{c.role}</div>
                <a
                  href={`mailto:${c.email}`}
                  onClick={() => posthog?.capture('audit_cta_email_clicked', { contact_name: c.name, contact_role: c.role, email: c.email })}
                  style={{
                    display: 'inline-block',
                    marginTop: 8,
                    fontFamily: FONT.mono,
                    fontSize: 13,
                    color: '#D86A48',
                    textDecoration: 'none',
                  }}
                >
                  {c.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}


/* ──────────────────────────────────────────────
   What Your Buyer Is Actually Seeing — five-stop journey
   ────────────────────────────────────────────── */
import {
  AMPLIFICATION,
  CLOSING_DIAGNOSIS_KICKER,
  GTM_GRID_FUNCTIONAL_FLOOR,
  GTM_GRID_NOTE,
  GTM_LEADERSHIP_GRID,
  ICP_BUYERS_NAMED,
  JOURNEY_STOPS,
  SECTION_HEADLINE,
  SECTION_INTRO,
  SECTION_KICKER,
  SECTION_SUBHEAD,
  SEVEN_FINDINGS,
  SEVEN_FINDINGS_KICKER,
  TIER_AVERAGES,
  type JourneyStop,
} from './data/population'

export function PopulationSection() {
  const { palette } = useTheme()

  return (
    <Section id="population" background={palette.ink}>
      <div style={{ color: '#FFFFFF' }}>
      <IssueBar number="▶︎05.3" name="Population" meta={['BetterUp', 'Commenter mix']} ground="dark" />
      {/* Section opener — explicit white text on the ink ground to prevent
          inline palette colors from inheriting their light-mode dark values. */}
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: palette.yellow,
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            {SECTION_KICKER}
          </div>
          <h2
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(40px, 7vw, 96px)',
              lineHeight: 0.95,
              color: '#FFFFFF',
              margin: 0,
              maxWidth: 920,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
          >
            {SECTION_HEADLINE}
          </h2>
          <p
            style={{
              margin: '32px 0 28px',
              padding: '4px 0 4px 24px',
              borderLeft: `4px solid ${palette.rust}`,
              fontFamily: FONT.display,
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              lineHeight: 1.25,
              color: '#FFFFFF',
              maxWidth: 880,
              letterSpacing: '-0.005em',
            }}
          >
            {SECTION_SUBHEAD}
          </p>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.75)',
              margin: 0,
              maxWidth: 760,
            }}
          >
            {SECTION_INTRO}
          </p>
        </div>
      </Reveal>

      {/* The five journey stops */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {JOURNEY_STOPS.map((stop, i) => (
          <JourneyStopCard key={stop.number} stop={stop} isLast={i === JOURNEY_STOPS.length - 1} />
        ))}
      </div>

      {/* Closing diagnosis — editorial pull-quote with ratio visual */}
      <Reveal>
        <EditorialClosingDiagnosis
          kicker={CLOSING_DIAGNOSIS_KICKER}
          headline="The product is real, the expertise is real, and the relationships are real. They all live in two or three voices instead of twenty-one."
          headlineAccent="two or three voices instead of twenty-one"
          bodyLines={[
            'BetterUp sells the practice of continuous human contact at scale.',
            'The audit found a sales and marketing organization where that practice shows up in some places, with some people, on some threads, but not at the scale the brand promise requires.',
            'The buyer doing her due diligence today is not landing on the two or three voices that do carry the promise, because there are not enough of them and they are not on the surfaces she checks.',
          ]}
          ratio={{ heard: 2, total: 21, label: 'The brand promise needs twenty-one voices on the surfaces buyers check. Right now the buyer hears two.' }}
        />
      </Reveal>
      {/* CLOSING_DIAGNOSIS prose preserved on the data file for future surfaces; the editorial component above renders the same argument with a visual companion. */}

      {/* 12 named buyers — reframed from concentration risk to existing demand */}
      <Reveal>
        <div style={{ marginBottom: 96 }}>
          {/* Anton mega headline + standfirst */}
          <h3
            style={{
              fontFamily: FONT.mega,
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              lineHeight: 0.98,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0 0 24px',
              fontWeight: 400,
              maxWidth: 1000,
            }}
          >
            Twelve senior buyers are already paying attention.
          </h3>
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.78)',
              margin: '0 0 40px',
              maxWidth: 880,
            }}
          >
            These are not researchers poking around. They are VPs of HR, Chief People Officers, and a sitting CEO, the exact people BetterUp sells to, and they are engaging unprompted, today, with no cold outreach. The attention already exists. The problem is what they find when they look. Six voices are catching all of it, and every one of them sits above the leadership line.
          </p>

          {/* Concentration callout — two stacked stats on the section ground */}
          <div
            style={{
              border: `1px solid rgba(255, 255, 255, 0.25)`,
              marginBottom: 32,
              maxWidth: 720,
            }}
          >
            <ConcentrationStat value="12" label="Senior buyers paying attention" />
            <div style={{ borderTop: `1px solid rgba(255, 255, 255, 0.18)` }} />
            <ConcentrationStat value="6" label="BetterUp voices catching them, all above the leadership line" />
          </div>

          {/* The twelve, with the buyer as the heaviest element */}
          <div
            style={{
              background: palette.card,
              border: `1px solid ${palette.border}`,
              padding: '8px 0',
            }}
          >
            {ICP_BUYERS_NAMED.map((b, i) => (
              <div
                key={b.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '36px minmax(0, 1.4fr) minmax(0, 1fr)',
                  alignItems: 'center',
                  padding: '20px 28px',
                  borderBottom: i === ICP_BUYERS_NAMED.length - 1 ? 'none' : `1px solid ${palette.borderSubtle}`,
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    color: palette.textDim,
                    letterSpacing: '0.04em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      color: palette.text,
                      fontWeight: 700,
                      lineHeight: 1.15,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {b.name}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 14,
                      color: palette.textMuted,
                      lineHeight: 1.45,
                    }}
                  >
                    {b.title}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: palette.textDim,
                    textAlign: 'right',
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {b.appearsOn}
                </span>
              </div>
            ))}
          </div>

          {/* Bridge line connecting the table to the recommendation */}
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: 17,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.78)',
              margin: '40px 0 0',
              maxWidth: 880,
            }}
          >
            These twelve are doing the watching. Nobody at BetterUp is doing the catching. The fix is not more names. It is more people worth watching, so the buyers who are already here have somewhere to land.
          </p>
        </div>
      </Reveal>

      {/* Composite signal score by tier — supporting evidence, after closing */}
      <Reveal>
        <div style={{ marginBottom: 96 }}>
          <div style={smallLabel(palette.rust)}>Composite signal score by tier · supporting evidence</div>
          <div
            style={{
              marginTop: 20,
              background: palette.card,
              border: `1px solid ${palette.border}`,
              borderRadius: 6,
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {TIER_AVERAGES.map((t) => (
              <div key={t.tier} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: FONT.body, fontSize: 13, color: palette.text, width: 200, fontWeight: 500 }}>
                  {t.tier}
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 11, color: palette.textDim, width: 30 }}>n={t.n}</span>
                <div style={{ flex: 1, height: 8, background: palette.border, borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${t.avg}%`,
                      height: '100%',
                      background: colorForScore(palette, t.avg),
                      borderRadius: 4,
                      transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 14,
                    color: palette.text,
                    width: 32,
                    textAlign: 'right',
                    fontWeight: 600,
                  }}
                >
                  {t.avg}
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 11, color: palette.textMuted, width: 60, textAlign: 'right' }}>
                  ({t.range})
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Seven things she leaves believing — rust numerals at full opacity for
          contrast against the ink ground; white body in IBM Plex without italic
          since synthesized italic on Archivo Black reads as broken. */}
      <Reveal>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: palette.yellow,
            marginBottom: 0,
            fontWeight: 600,
          }}
        >
          {SEVEN_FINDINGS_KICKER}
        </div>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {SEVEN_FINDINGS.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 32,
                  color: '#DD5C20',
                  lineHeight: 1,
                  flex: '0 0 auto',
                  width: 56,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  paddingTop: 4,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 'clamp(16px, 1.6vw, 18px)',
                  lineHeight: 1.55,
                  color: 'rgba(255, 255, 255, 0.92)',
                  margin: 0,
                  paddingLeft: 24,
                  borderLeft: `3px solid #DD5C20`,
                  maxWidth: 880,
                }}
              >
                {f}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
      </div>
    </Section>
  )
}

function JourneyStopCard({ stop, isLast }: { stop: JourneyStop; isLast: boolean }) {
  const { palette } = useTheme()
  return (
    <Reveal>
      <div style={{ paddingBottom: isLast ? 0 : 56 }}>
        <div
          style={{
            background: palette.card,
            border: `1px solid ${palette.border}`,
            borderRadius: 8,
            padding: '40px 44px',
          }}
        >
          {/* Stop number + title */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: FONT.display,
                fontStyle: 'italic',
                fontSize: 'clamp(56px, 6vw, 80px)',
                color: palette.rust,
                opacity: 0.18,
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                flex: '0 0 auto',
              }}
            >
              {stop.number}
            </span>
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: palette.rust,
                fontWeight: 600,
              }}
            >
              Stop {stop.number}
            </span>
          </div>

          <h3
            style={{
              fontFamily: FONT.display,
              fontSize: 'clamp(28px, 3.4vw, 38px)',
              lineHeight: 1.15,
              color: palette.text,
              margin: '0 0 8px',
              fontWeight: 400,
            }}
          >
            {stop.title}
          </h3>

          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              color: palette.textDim,
              marginBottom: 36,
              letterSpacing: '0.02em',
            }}
          >
            {stop.voicesCount}
          </div>

          {/* 3-column ladder */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 28,
              marginBottom: 40,
            }}
          >
            <LadderColumn
              kicker="Wants felt"
              kickerColor={palette.rust}
              variant="serif"
              text={stop.wantsFelt}
            />
            <LadderColumn
              kicker="Finds"
              kickerColor={palette.textMuted}
              variant="body"
              text={stop.finds}
            />
            <LadderColumn
              kicker="The gap"
              kickerColor={palette.red}
              variant="gap"
              text={stop.gap}
            />
          </div>

          {/* Evidence — divider + visual */}
          <div
            style={{
              borderTop: `1px solid ${palette.borderSubtle}`,
              paddingTop: 32,
            }}
          >
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: palette.textMuted,
                marginBottom: 20,
              }}
            >
              {stop.evidenceKicker}
            </div>

            {stop.evidenceKind === 'screenshot' && stop.evidenceImage && (
              <ScreenshotEvidence
                src={stop.evidenceImage}
                alt={stop.evidenceAlt ?? ''}
                gloss={stop.evidenceGloss ?? ''}
              />
            )}

            {stop.evidenceKind === 'population' && stop.populationViz === 'gtm-grid' && (
              <GTMLeadershipGridViz />
            )}

            {stop.evidenceKind === 'population' && stop.populationViz === 'amplification-bars' && (
              <AmplificationGapViz />
            )}
          </div>
        </div>

        {/* Connector dot between stops */}
        {!isLast && (
          <div
            aria-hidden
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '24px 0',
            }}
          >
            <div style={{ width: 1, height: 24, background: palette.rust, opacity: 0.4 }} />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: palette.rust,
                opacity: 0.6,
              }}
            />
          </div>
        )}
      </div>
    </Reveal>
  )
}

// Brutalist stat row used inside the concentration callout above the
// twelve-buyers table. Renders on the section's dark ink ground, so the
// numerals and labels are white with hairline rules separating the rows.
function ConcentrationStat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 160px) 1fr',
        alignItems: 'center',
        gap: 32,
        padding: '24px 28px',
      }}
    >
      <div
        style={{
          fontFamily: FONT.mega,
          fontSize: 'clamp(64px, 7vw, 96px)',
          fontWeight: 400,
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.72)',
          fontWeight: 600,
          lineHeight: 1.55,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function LadderColumn({
  kicker,
  kickerColor,
  variant,
  text,
}: {
  kicker: string
  kickerColor: string
  variant: 'serif' | 'body' | 'gap'
  text: string
}) {
  const { palette } = useTheme()
  const baseTextStyle =
    variant === 'serif'
      ? {
          fontFamily: FONT.display,
          fontStyle: 'italic' as const,
          fontSize: 17,
          lineHeight: 1.55,
          color: palette.textMuted,
        }
      : variant === 'gap'
        ? {
            fontFamily: FONT.body,
            fontSize: 14,
            lineHeight: 1.6,
            color: palette.text,
            fontStyle: 'italic' as const,
            paddingLeft: 14,
            borderLeft: `3px solid ${palette.red}`,
          }
        : {
            fontFamily: FONT.body,
            fontSize: 14,
            lineHeight: 1.6,
            color: palette.text,
          }

  return (
    <div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: kickerColor,
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        {kicker}
      </div>
      <p style={{ ...baseTextStyle, margin: 0 }}>{text}</p>
    </div>
  )
}

function ScreenshotEvidence({ src, alt, gloss }: { src: string; alt: string; gloss: string }) {
  const { palette } = useTheme()
  return (
    <div>
      <div
        style={{
          background: palette.cardAlt,
          border: `1px solid ${palette.border}`,
          borderRadius: 6,
          padding: 16,
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: 4,
          }}
        />
      </div>
      <p
        style={{
          fontFamily: FONT.display,
          fontStyle: 'italic',
          fontSize: 17,
          lineHeight: 1.55,
          color: palette.text,
          margin: '20px auto 0',
          maxWidth: 720,
          textAlign: 'left',
        }}
      >
        {gloss}
      </p>
    </div>
  )
}

function GTMLeadershipGridViz() {
  const { palette } = useTheme()
  const max = 100
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {GTM_LEADERSHIP_GRID.map((leader) => {
          const fill = colorForScore(palette, leader.score)
          const clearsFloor = leader.score >= GTM_GRID_FUNCTIONAL_FLOOR
          return (
            <div
              key={leader.id}
              style={{
                background: '#1A1A1A',
                border: `1px solid ${clearsFloor ? fill : 'rgba(255, 255, 255, 0.15)'}`,
                padding: '16px 18px',
                color: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 11, color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {leader.id}
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: fill, fontWeight: 600 }}>{leader.score}</span>
              </div>
              <div style={{ position: 'relative', height: 6, background: 'rgba(255, 255, 255, 0.15)', overflow: 'visible' }}>
                <div
                  style={{
                    width: `${(leader.score / max) * 100}%`,
                    height: '100%',
                    background: fill,
                    transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
                {/* Functional-floor reference line */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: `${GTM_GRID_FUNCTIONAL_FLOOR}%`,
                    top: -3,
                    width: 1,
                    height: 12,
                    background: 'rgba(255, 255, 255, 0.35)',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 18,
          alignItems: 'center',
          marginBottom: 14,
          fontFamily: FONT.body,
          fontSize: 11,
          color: palette.textMuted,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 1, background: palette.textMuted }} />
          Functional floor (50/100) for a senior commercial role
        </span>
      </div>
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: 13,
          color: palette.textMuted,
          lineHeight: 1.55,
          margin: 0,
          maxWidth: 720,
        }}
      >
        {GTM_GRID_NOTE}
      </p>
    </div>
  )
}

function AmplificationGapViz() {
  const { palette } = useTheme()
  const max = AMPLIFICATION.originalAvg
  return (
    <div>
      <div style={{ marginBottom: 28, maxWidth: 720 }}>
        <AmplificationBar
          label="Original post · avg engagement"
          value={AMPLIFICATION.originalAvg}
          max={max}
          color={palette.rust}
          palette={palette}
        />
        <div style={{ height: 14 }} />
        <AmplificationBar
          label="Repost on the same content · avg engagement on the share"
          value={AMPLIFICATION.repostAvg}
          max={max}
          color={palette.textDim}
          palette={palette}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 'clamp(36px, 4vw, 56px)',
            color: palette.red,
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          −{AMPLIFICATION.gap}%
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 13, color: palette.textMuted, maxWidth: 540, lineHeight: 1.5 }}>
          {AMPLIFICATION.caption}
        </div>
      </div>
      <p
        style={{
          fontFamily: FONT.body,
          fontStyle: 'italic',
          fontSize: 12,
          color: palette.textDim,
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 720,
        }}
      >
        {AMPLIFICATION.note}
      </p>
    </div>
  )
}

function AmplificationBar({
  label,
  value,
  max,
  color,
  palette,
}: {
  label: string
  value: number
  max: number
  color: string
  palette: ThemePalette
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 6,
        }}
      >
        <span style={{ fontFamily: FONT.body, fontSize: 13, color: palette.text, fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: FONT.mono, fontSize: 14, color: palette.text, fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 12, background: palette.border, borderRadius: 4, overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: color,
            borderRadius: 4,
            transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </div>
  )
}
