import { useState } from 'react'
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
import { SIGNALS, SIGNALS_AVG_ALIGNMENT, SIGNALS_CRITICAL_GAPS, SIGNALS_FINDING, SIGNALS_HEADLINE, SIGNALS_STRONG, type Signal } from './data/signals'

/* ──────────────────────────────────────────────
   Section 2: Brand Conviction Cascade
   ────────────────────────────────────────────── */
export function CascadeSection() {
  const { palette } = useTheme()
  return (
    <Section id="cascade">
      <SectionHeader kicker="The Brand Conviction Cascade" headline={CASCADE_HEADLINE} intro={CASCADE_INTRO} />

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

      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {CASCADE_LAYERS.map((layer) => (
          <ExpandableCard
            key={layer.number}
            title={
              <span>
                <span style={{ fontFamily: FONT.mono, color: palette.textDim, marginRight: 12, fontSize: 16 }}>
                  {layer.number}
                </span>
                {layer.name}
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

  return (
    <Section id="leaders">
      <SectionHeader
        kicker="Go-to-Market Signal Chain"
        headline="Your buyer is conducting due diligence on LinkedIn right now."
        intro="They are looking at your CEO's profile, your sales team, your company page, your coaches, and your clients. Every profile is either building trust or eroding it. Here is what they find when they look at yours."
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

      {/* Brand health scorecard */}
      <div style={{ height: 80 }} />
      <Reveal>
        <BrandHealthScorecard />
      </Reveal>

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
      <Gauge score={GTM_COMPOSITE_SCORE} size={130} label="Composite GTM Signal Chain" />
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
        BetterUp's 241K company page followers look impressive. The algorithm suppresses brand content. The CEO (48K), 4,000+ coaches with their own networks, sales team and account managers represent the real reach multiplier. The highest-leverage investment is not more company page content. It is activating the humans in the signal chain.
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
            onClick={() => setActiveTab(c.id)}
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
  return (
    <Section id="signals">
      <SectionHeader kicker="Content-to-Pipeline Signal Map" headline={SIGNALS_HEADLINE} />

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
  AUDIENCE_PROFILE,
  BUYER_JOURNEY,
  DEAD_ZONES,
  KEY_METRICS,
  PLATFORM_BEHAVIOR,
  TURNOFF,
  VELOCITY_SHIFTS,
  WHO_THEY_THINK_VS_REAL,
} from './data/audience'

export function AudienceSection() {
  const { palette } = useTheme()
  return (
    <Section id="audience">
      <SectionHeader kicker="Audience Reality" headline={AUDIENCE_HEADLINE} />

      <Reveal>
        <div
          style={{
            background: palette.card,
            border: `1px solid ${palette.border}`,
            borderRadius: 6,
            padding: '32px 36px',
            marginBottom: 48,
          }}
        >
          <div style={smallLabel(palette.rust)}>The real buyer profile</div>
          <p style={{ fontFamily: FONT.body, fontSize: 17, lineHeight: 1.65, color: palette.text, margin: '12px 0 0' }}>
            {AUDIENCE_PROFILE}
          </p>
        </div>
      </Reveal>

      {/* Key metrics */}
      <Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 56,
          }}
        >
          {KEY_METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                background: palette.card,
                border: `1px solid ${palette.border}`,
                borderRadius: 6,
                padding: '24px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 36,
                  color: palette.rust,
                  lineHeight: 1,
                  fontWeight: 500,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: 13,
                  color: palette.text,
                  marginTop: 12,
                  lineHeight: 1.4,
                  fontWeight: 600,
                }}
              >
                {m.label}
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 12, color: palette.textMuted, marginTop: 6 }}>
                {m.sub}
              </div>
            </div>
          ))}
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

      {/* Active tensions */}
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div style={smallLabel(palette.rust)}>Three active tensions the buyer is navigating</div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ACTIVE_TENSIONS.map((t) => (
              <ExpandableCard key={t.title} title={t.title}>
                <p style={{ margin: 0, paddingTop: 16 }}>{t.body}</p>
              </ExpandableCard>
            ))}
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

      {/* Platform behavior */}
      <Reveal>
        <div style={{ marginBottom: 32 }}>
          <Callout tone="sky">
            <div style={smallLabel(palette.sky)}>How BetterUp's buyers behave online</div>
            {PLATFORM_BEHAVIOR}
          </Callout>
        </div>
      </Reveal>

      {/* Turnoff */}
      <Reveal>
        <Callout tone="red">
          <div style={smallLabel(palette.red)}>The turnoff</div>
          {TURNOFF}
        </Callout>
      </Reveal>
    </Section>
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
   Section 7: Investment vs. Return
   ────────────────────────────────────────────── */
import {
  CONNECTED_CHANGES,
  CURRENT_INVESTMENTS,
  CURRENT_RETURNS,
  INVESTMENT_HEADLINE,
  PIPELINE_PROJECTION,
  PROJECTED_IMPACT,
  PROJECTION_CAVEAT,
} from './data/investment'

export function InvestmentSection() {
  const { palette } = useTheme()
  return (
    <Section id="investment">
      <SectionHeader kicker="Investment vs. Return" headline={INVESTMENT_HEADLINE} />

      <Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 24,
            marginBottom: 64,
          }}
        >
          {/* Current state */}
          <div
            style={{
              background: palette.cardAlt,
              border: `1px solid ${palette.border}`,
              borderRadius: 6,
              padding: '28px 32px',
              opacity: 0.8,
            }}
          >
            <div style={smallLabel(palette.textDim)}>Current state · what BetterUp invests in</div>
            <ul style={{ listStyle: 'none', margin: '14px 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CURRENT_INVESTMENTS.map((i) => (
                <li key={i} style={{ fontFamily: FONT.body, fontSize: 14, color: palette.textMuted, display: 'flex', gap: 10 }}>
                  <span style={{ color: palette.textDim }}>›</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div style={smallLabel(palette.textDim)}>What the return looks like</div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CURRENT_RETURNS.map((r) => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontFamily: FONT.body, fontSize: 13, color: palette.textMuted }}>{r.label}</span>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 12,
                      color: r.tone === 'positive' ? palette.green : palette.red,
                      textAlign: 'right',
                    }}
                  >
                    {r.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected changes */}
          <div
            style={{
              background: palette.card,
              border: `1px solid ${palette.rust}`,
              borderRadius: 6,
              padding: '28px 32px',
              boxShadow: `0 8px 32px ${palette.rustSoft}`,
            }}
          >
            <div style={smallLabel(palette.rust)}>What connected signals would change</div>
            <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CONNECTED_CHANGES.map((c) => (
                <li key={c} style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.5, color: palette.text, display: 'flex', gap: 10 }}>
                  <span style={{ color: palette.rust, flex: '0 0 auto' }}>→</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Projected impact */}
      <Reveal>
        <div style={smallLabel(palette.rust)}>Projected impact</div>
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}
        >
          {PROJECTED_IMPACT.map((p) => {
            const delta = Math.round(((p.projected - p.current) / p.current) * 100)
            return (
              <div
                key={p.label}
                style={{
                  background: palette.card,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 6,
                  padding: '24px 24px',
                }}
              >
                <div style={{ fontFamily: FONT.body, fontSize: 12, color: palette.textMuted, marginBottom: 12 }}>
                  {p.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontFamily: FONT.mono, fontSize: 22, color: palette.textDim, textDecoration: 'line-through' }}>
                    {p.current}
                  </span>
                  <span style={{ fontFamily: FONT.mono, color: palette.rust, fontSize: 14 }}>→</span>
                  <span style={{ fontFamily: FONT.mono, fontSize: 32, color: palette.rust, fontWeight: 500 }}>
                    {p.projected}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 12,
                    color: palette.green,
                    marginTop: 8,
                    letterSpacing: '0.04em',
                  }}
                >
                  +{delta}%
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>

      <Reveal>
        <Callout tone="rust">
          <div style={smallLabel(palette.rust)}>Estimated pipeline impact</div>
          {PIPELINE_PROJECTION}
        </Callout>
      </Reveal>

      <Reveal>
        <p
          style={{
            marginTop: 24,
            fontFamily: FONT.body,
            fontSize: 12,
            color: palette.textDim,
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          {PROJECTION_CAVEAT}
        </p>
      </Reveal>
    </Section>
  )
}

/* ──────────────────────────────────────────────
   Section 8: What We'd Build Together
   ────────────────────────────────────────────── */
import { BUILD_HEADLINE, CONTACTS, CTA_BODY, PHASES, TEAM } from './data/build'

export function BuildSection() {
  const { palette } = useTheme()
  return (
    <Section id="build">
      <SectionHeader kicker="What We'd Build Together" headline={BUILD_HEADLINE} />

      {/* Phases */}
      <Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
            marginBottom: 56,
          }}
        >
          {PHASES.map((phase) => (
            <div
              key={phase.number}
              style={{
                background: palette.card,
                border: `1px solid ${palette.border}`,
                borderTop: `3px solid ${palette.rust}`,
                borderRadius: 4,
                padding: '28px 28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 28, color: palette.rust, fontWeight: 500 }}>
                  {phase.number}
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: palette.textMuted,
                  }}
                >
                  {phase.weeks}
                </span>
              </div>
              <div style={{ fontFamily: FONT.display, fontSize: 22, color: palette.text, marginBottom: 18, lineHeight: 1.2 }}>
                {phase.title}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {phase.items.map((item) => (
                  <li key={item} style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.5, color: palette.textMuted, display: 'flex', gap: 10 }}>
                    <span style={{ color: palette.rust, flex: '0 0 auto' }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {phase.deliverable && (
                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: `1px solid ${palette.border}`,
                    fontFamily: FONT.body,
                    fontSize: 12,
                    color: palette.text,
                  }}
                >
                  <span style={{ color: palette.rust, fontWeight: 600 }}>Deliverable. </span>
                  {phase.deliverable}
                </div>
              )}
            </div>
          ))}
        </div>
      </Reveal>

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
          {TEAM.map((t) => (
            <div
              key={t.org}
              style={{
                background: palette.cardAlt,
                border: `1px solid ${palette.border}`,
                borderRadius: 6,
                padding: '24px 28px',
              }}
            >
              <div style={{ fontFamily: FONT.display, fontSize: 22, color: palette.text, marginBottom: 8 }}>{t.org}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.55, color: palette.textMuted }}>
                {t.scope}
              </div>
            </div>
          ))}
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
              marginBottom: 18,
            }}
          >
            Next step
          </div>
          <p style={{ fontFamily: FONT.display, fontSize: 26, lineHeight: 1.35, margin: '0 0 32px', maxWidth: 800 }}>
            {CTA_BODY}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {CONTACTS.map((c) => (
              <div key={c.email}>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: '#FFFFFF', fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 12, opacity: 0.6, marginTop: 4 }}>{c.role}</div>
                <a
                  href={`mailto:${c.email}`}
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
