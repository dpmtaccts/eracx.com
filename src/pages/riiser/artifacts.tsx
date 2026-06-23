/* ──────────────────────────────────────────────────────────────────────────
   Riiser — reconstructed surface artifacts.

   These mirror the fidelity of the live Buyer View "Moments" cards
   (BuyerViewSystem.tsx, read-only): real platform chrome, foreign-surface
   inversion, with Riiser fiction. The CSS is ported and re-scoped under
   `.rs-art` so it never touches the live `#the-read` styles.

   People use the initials-avatar fallback. The <Avatar> takes an optional
   `portrait` so a generated headshot can drop in later with no layout shift.
   No real photos are sourced; nothing is blurred.
   ────────────────────────────────────────────────────────────────────────── */

import type { ReactNode } from 'react'
import { FONT } from '../betterup/theme'
import {
  RIISER_ATLAS,
  RIISER_GLASSDOOR,
  RIISER_LINKEDIN,
  RIISER_REDDIT,
  RIISER_CONTENT,
  RIISER_TRAJECTORY,
} from '../../data/riiser-sample'

const INK = '#0A0A0A'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const HOT = '#E6195F'
const RULE = 'rgba(10, 10, 10, 0.15)'

/* ── Avatar — initials fallback + optional portrait slot ──────────────────── */

export function Avatar({
  initials,
  portrait,
  size = 42,
  bg = 'linear-gradient(135deg,#1845C2,#0A66C2)',
  color = '#fff',
}: {
  initials: string
  /** Optional generated headshot. When present it fills the same circle with
   *  no layout shift; when absent the initials render. */
  portrait?: string
  size?: number
  bg?: string
  color?: string
}) {
  return (
    <span
      className="rs-av"
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: portrait ? '#e6e6e6' : bg,
        color,
        fontWeight: 700,
        fontSize: Math.round(size * 0.33),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {portrait ? (
        <img src={portrait} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </span>
  )
}

/* Bold the named leaders inside a sentence without dangerouslySetInnerHTML. */
function boldWords(text: string, words: readonly string[]): ReactNode[] {
  if (words.length === 0) return [text]
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(pattern).map((part, i) =>
    words.includes(part) ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>,
  )
}

/* Atlas spark mark — a fictional engine has no real logo. */
function SparkGlyph() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <path
        d="M36 14c1.9 14.2 5.8 18.1 20 20-14.2 1.9-18.1 5.8-20 20-1.9-14.2-5.8-18.1-20-20 14.2-1.9 18.1-5.8 20-20Z"
        fill="#fff"
      />
    </svg>
  )
}

/* ── LinkedIn — CPO post + insider reply ──────────────────────────────────── */

export function LinkedInCard() {
  const d = RIISER_LINKEDIN
  return (
    <div className="rs-art">
      <div className="rs-card rs-li">
        <div className="rs-li-h">
          <Avatar initials={d.author.initials} portrait={d.author.portrait} size={42} />
          <div>
            <div className="rs-li-nm">{d.author.name} · 1st</div>
            <div className="rs-li-sub">{d.author.title} · {d.meta}</div>
          </div>
        </div>
        <div className="rs-li-body">{d.post}</div>
        <div className="rs-li-rx">
          <span>{d.reactionsLead}</span>
          <span>{d.comments}</span>
        </div>
        <div className="rs-li-cm">
          <Avatar initials={d.topComment.author.initials} portrait={d.topComment.author.portrait} size={28} bg="#5a6470" />
          <div className="rs-li-cb">
            <div className="rs-li-cn">{d.topComment.author.name} · {d.topComment.likes} likes</div>
            <div className="rs-li-ct">{d.topComment.body}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Atlas — answer engine, two questions ─────────────────────────────────── */

function AtlasChat({
  question,
  answer,
  leaders,
  pills,
}: {
  question: string
  answer: ReactNode
  leaders?: readonly string[]
  pills: readonly string[]
}) {
  void leaders
  return (
    <div className="rs-chat">
      <div className="rs-chat-top">
        <span className="rs-chat-mark" aria-hidden>
          <SparkGlyph />
        </span>
        <span className="rs-chat-name">Atlas</span>
      </div>
      <div className="rs-chat-user">
        <div className="rs-chat-ubub">{question}</div>
      </div>
      <div className="rs-chat-asst">
        <span className="rs-chat-av" aria-hidden>
          <SparkGlyph />
        </span>
        <div className="rs-chat-abody">
          <p className="rs-chat-atext">{answer}</p>
          <div className="rs-chat-pills">
            {pills.map((p) => (
              <span key={p} className="rs-chat-pill">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AtlasCards() {
  const { q1, q2 } = RIISER_ATLAS
  return (
    <div className="rs-art">
      <div className="rs-stack">
        <AtlasChat
          question={q1.question}
          answer={boldWords(q1.answer, q1.leaders)}
          pills={q1.pills}
        />
        <AtlasChat question={q2.question} answer={q2.answer} pills={q2.pills} />
      </div>
    </div>
  )
}

/* ── Glassdoor — rating card ──────────────────────────────────────────────── */

export function GlassdoorCard() {
  const d = RIISER_GLASSDOOR
  return (
    <div className="rs-art">
      <div className="rs-card rs-gd">
        <div className="rs-gd-s">
          <div className="rs-gd-co">{d.company}</div>
          <div className="rs-gd-big">{d.rating.toFixed(1)}</div>
          <div className="rs-gd-st">
            {'★'.repeat(d.filledStars)}
            <span className="rs-gd-e">{'★'.repeat(d.emptyStars)}</span>
          </div>
          <div className="rs-gd-rv">{d.reviewCount}</div>
        </div>
        <div className="rs-gd-m">
          <div className="rs-gd-pct">{d.recommendPct}</div>
          <div className="rs-gd-pctl">{d.recommendLabel}</div>
          <div className="rs-gd-rt">{d.quoteTitle}</div>
          <div className="rs-gd-rw">{d.quoteBody}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Communities — Reddit-style thread ────────────────────────────────────── */

export function RedditCard() {
  const d = RIISER_REDDIT
  return (
    <div className="rs-art">
      <div className="rs-card rs-rd">
        <div className="rs-rd-sub">
          <b>{d.sub}</b> · {d.asker} · {d.askerAge}
        </div>
        <div className="rs-rd-t">{d.title}</div>
        <div className="rs-rd-c">
          <div className="rs-rd-h">{d.reply.handle} · {d.reply.age}</div>
          <div className="rs-rd-x">
            {d.reply.bodyLead}
            <span className="rs-hl">{d.reply.glassdoorWord}</span>
            {d.reply.bodyMid}
            <span className="rs-hl">{d.reply.rivalWord}</span>
            {d.reply.bodyEnd}
          </div>
          <div className="rs-rd-v">{d.reply.upvotes}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Content — alignment bars (audit data viz, not platform chrome) ────────── */

function mono(size: number, color: string = INK, weight = 600) {
  return {
    fontFamily: FONT.mono,
    fontSize: size,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color,
    fontWeight: weight,
  }
}

export function ContentPanel() {
  const d = RIISER_CONTENT
  return (
    <div style={{ border: `1px solid ${RULE}`, background: '#fff', padding: '24px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={mono(10, MUTED, 700)}>CONTENT ALIGNMENT · 0 TO 100</span>
        <span style={mono(11, INK, 700)}>AVG {d.averageScore}</span>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {d.categories.map((c) => {
          const low = c.score < 40
          return (
            <li key={c.label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 38px', gap: 14, alignItems: 'center' }}>
              <span style={{ fontFamily: FONT.body, fontSize: 14, color: INK }}>{c.label}</span>
              <span aria-hidden style={{ height: 12, background: '#F4F1EA', position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', inset: 0, width: `${c.score}%`, background: low ? HOT : INK }} />
              </span>
              <span style={{ ...mono(11, low ? HOT : INK, 700), textAlign: 'right' }}>{c.score}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ── Closer — quarterly composite hold + per-pillar trajectory ────────────── */

export function CloserPanel() {
  const d = RIISER_TRAJECTORY
  const maxScore = 100
  return (
    <div style={{ border: `1px solid ${RULE}`, background: '#fff', padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={{ ...mono(10, MUTED, 700), marginBottom: 16 }}>BUYER TRUST · FOUR-QUARTER HOLD</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 140 }}>
          {d.composite.map((p) => (
            <div key={p.q} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={mono(11, INK, 700)}>{p.score}</span>
              <span aria-hidden style={{ width: '100%', height: `${(p.score / maxScore) * 110}px`, background: p.q === 'Now' ? INK : HOT, opacity: p.q === 'Now' ? 0.35 : 1 }} />
              <span style={mono(9, MUTED, 600)}>{p.q}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ ...mono(10, MUTED, 700), marginBottom: 14 }}>PER PILLAR · NOW → PROJECTED</div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {d.pillars.map((p) => (
            <li key={p.label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, alignItems: 'center' }}>
              <span style={{ fontFamily: FONT.body, fontSize: 14, color: INK }}>{p.label}</span>
              <span aria-hidden style={{ height: 12, background: '#F4F1EA', position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', insetBlock: 0, left: 0, width: `${p.current}%`, background: 'rgba(10,10,10,0.35)' }} />
                <span style={{ position: 'absolute', insetBlock: 0, left: `${p.current}%`, width: `${p.projected - p.current}%`, background: HOT, opacity: 0.85 }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── Scoped CSS — ported from the live Moments cards, re-prefixed rs- ─────── */

export const ARTIFACT_CSS = `
.rs-art{ --rs-ui:'Inter',system-ui,sans-serif; --rs-gd:#0caa41; }
.rs-art .rs-stack{display:flex;flex-direction:column;gap:18px;}
.rs-art .rs-card{border:1px solid #0A0A0A;background:#fff;color:#0a0a0a;}

.rs-art .rs-li{font-family:var(--rs-ui);padding:17px 19px;width:520px;max-width:100%;}
.rs-art .rs-li-h{display:flex;gap:11px;align-items:center;margin-bottom:11px;}
.rs-art .rs-li-nm{font-size:14.5px;font-weight:600;color:#1d2226;}
.rs-art .rs-li-sub{font-size:12px;color:rgba(0,0,0,.6);}
.rs-art .rs-li-body{font-size:14px;line-height:1.5;color:#1d2226;margin-bottom:11px;}
.rs-art .rs-li-rx{font-size:12px;color:rgba(0,0,0,.55);border-top:1px solid #eee;border-bottom:1px solid #eee;padding:8px 0;margin-bottom:9px;display:flex;justify-content:space-between;}
.rs-art .rs-li-cm{display:flex;gap:8px;padding:5px 0 0;}
.rs-art .rs-li-cb{background:#f2f2f2;border-radius:8px;padding:7px 10px;flex:1;border-left:3px solid #E6195F;}
.rs-art .rs-li-cn{font-size:12px;font-weight:600;color:#1d2226;}
.rs-art .rs-li-ct{font-size:12.5px;line-height:1.4;color:#1d2226;}

.rs-art .rs-rd{font-family:var(--rs-ui);padding:15px 19px;width:520px;max-width:100%;}
.rs-art .rs-rd-sub{font-size:12px;color:#7c7c7c;margin-bottom:6px;}
.rs-art .rs-rd-sub b{color:#1a1a1b;}
.rs-art .rs-rd-t{font-size:17px;font-weight:600;color:#1a1a1b;margin-bottom:13px;line-height:1.3;}
.rs-art .rs-rd-c{border-top:1px solid #edeff1;padding-top:10px;border-left:3px solid #E6195F;padding-left:11px;}
.rs-art .rs-rd-h{font-size:11.5px;color:#7c7c7c;margin-bottom:3px;}
.rs-art .rs-rd-x{font-size:13px;color:#1c1c1c;line-height:1.45;}
.rs-art .rs-rd-v{font-size:12px;font-weight:700;color:#ff4500;margin-top:5px;}
.rs-art .rs-hl{background:rgba(230,25,95,0.16);box-shadow:inset 0 -2px 0 #E6195F;padding:0 2px;}

.rs-art .rs-chat{width:540px;max-width:100%;background:#fff;border:1px solid #e6e6e6;border-radius:14px;font-family:var(--rs-ui);overflow:hidden;}
.rs-art .rs-chat-top{display:flex;align-items:center;gap:9px;padding:12px 16px;border-bottom:1px solid #efefef;}
.rs-art .rs-chat-mark{width:22px;height:22px;border-radius:6px;background:#0E9384;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.rs-art .rs-chat-mark svg{width:13px;height:13px;display:block;}
.rs-art .rs-chat-name{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(10,10,10,0.55);}
.rs-art .rs-chat-user{display:flex;justify-content:flex-end;padding:16px 16px 4px;}
.rs-art .rs-chat-ubub{background:#f4f4f5;border-radius:18px;padding:10px 15px;font-size:14px;line-height:1.45;color:#1d2226;max-width:84%;}
.rs-art .rs-chat-asst{display:flex;gap:10px;align-items:flex-start;padding:10px 16px 18px;}
.rs-art .rs-chat-av{width:30px;height:30px;border-radius:999px;background:#0E9384;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.rs-art .rs-chat-av svg{width:16px;height:16px;display:block;}
.rs-art .rs-chat-abody{flex:1;min-width:0;}
.rs-art .rs-chat-atext{font-size:14.5px;line-height:1.55;color:#26262d;margin:3px 0 0;}
.rs-art .rs-chat-atext strong{font-weight:700;}
.rs-art .rs-chat-pills{display:flex;flex-wrap:wrap;gap:6px;margin-top:13px;}
.rs-art .rs-chat-pill{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;color:#777;border:1px solid #e2e2e2;border-radius:999px;padding:5px 11px;}

.rs-art .rs-gd{font-family:var(--rs-ui);display:flex;width:540px;max-width:100%;}
.rs-art .rs-gd-s{padding:18px 24px;border-right:1px solid #e6e6e6;text-align:center;position:relative;flex-shrink:0;}
.rs-art .rs-gd-big{font-size:44px;font-weight:700;color:#1d2939;line-height:1;}
.rs-art .rs-gd-co{font-size:14px;font-weight:700;margin-bottom:8px;color:#1d2939;}
.rs-art .rs-gd-st{font-size:17px;color:var(--rs-gd);letter-spacing:1px;margin:6px 0;}
.rs-art .rs-gd-st .rs-gd-e{color:#dfe3e8;}
.rs-art .rs-gd-rv{font-size:11px;color:#596573;}
.rs-art .rs-gd-m{padding:16px 20px;flex:1;}
.rs-art .rs-gd-pct{font-size:21px;font-weight:700;color:#e8762c;}
.rs-art .rs-gd-pctl{font-size:11px;color:#596573;margin-bottom:13px;}
.rs-art .rs-gd-rt{font-size:13.5px;font-weight:700;color:#1d2939;}
.rs-art .rs-gd-rw{font-size:11.5px;color:#596573;line-height:1.4;}

@media (max-width:560px){
  .rs-art .rs-li,.rs-art .rs-rd,.rs-art .rs-chat,.rs-art .rs-gd{width:100%;}
  .rs-art .rs-gd{flex-direction:column;}
  .rs-art .rs-gd-s{border-right:none;border-bottom:1px solid #e6e6e6;}
}
`
