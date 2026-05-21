/**
 * V4Lab — §07 of v4 marketing site.
 *
 * Parchment-ground section showing ERA's four free tools / lab products
 * as a 2×2 grid of ink-black tiles. Rust accents tie the tiles back to
 * ERA's broader brand palette (rust + parchment per CLAUDE.md), while
 * the brutalist treatment keeps them feeling editorial rather than
 * promotional.
 *
 * Tiles default to ink ground with white type and rust accents (status
 * pills, URLs, CTA arrows). Hover inverts the tile to parchment with
 * ink text — accents stay rust through the transition.
 *
 * The hover treatment is the strongest in v4 — earned because Lab is
 * where readers move from "I should think about ERA" to "I should try
 * ERA."
 *
 * Tools: Halo (LinkedIn audit, BETA), Signal River (live signal feed,
 * LIVE), Map (buying committee builder, BETA), AI Mirror (buyer-side
 * audit, COMING SOON).
 */

import { V4Header } from './V4Header'

type Status = 'LIVE' | 'BETA' | 'COMING SOON'

interface Tool {
  name: string
  headline: string
  url: string
  status: Status
  description: string
  cta: string
  href: string
}

const STATUS_MOD: Record<Status, string> = {
  LIVE: 'v4-tool-tile__status--live',
  BETA: 'v4-tool-tile__status--beta',
  'COMING SOON': 'v4-tool-tile__status--soon',
}

const TOOLS: Tool[] = [
  {
    name: 'Halo',
    headline: 'A LinkedIn audit.',
    url: 'linkedin.eracx.com',
    status: 'BETA',
    description:
      "We score how your LinkedIn presence drives deals. Posts, comments, signal density, voice. A surface read using public data. The full audit pulls from signals you can't see yourself.",
    cta: '→ TRY HALO',
    href: 'https://linkedin.eracx.com',
  },
  {
    name: 'Signal River',
    headline: 'A live feed of buyer signals.',
    url: 'signals.eracx.com',
    status: 'LIVE',
    description:
      'Funding rounds, leadership changes, expansion announcements. The same public signals ERA monitors for customers, open for you to watch.',
    cta: '→ WATCH THE FEED',
    href: 'https://signals.eracx.com',
  },
  {
    name: 'Map',
    headline: 'A buying committee builder.',
    url: 'map.eracx.com',
    status: 'BETA',
    description:
      'Drop in a target account. We surface the decision tree by name, role, and warmth. The full map adds the people and signals only ERA can see.',
    cta: '→ BUILD A MAP',
    href: 'https://map.eracx.com',
  },
  {
    name: 'AI Mirror',
    headline: 'A free GTM assessment.',
    url: 'eracx.com/gtmplaybook',
    status: 'BETA',
    description:
      'Twelve questions, ten minutes, one report. A starting point against the framework ERA runs with paying customers.',
    cta: '→ START THE ASSESSMENT',
    href: '/gtmplaybook',
  },
]

export function V4Lab({ phase = '▸07 · LAB' }: { phase?: string } = {}) {
  return (
    <section className="v4-section v4-section--lab" id="lab">
      <V4Header
        phase={phase}
        meta={['4 TOOLS', '3 LIVE', 'MORE COMING']}
      />

      <div className="v4-lab">
        <div className="v4-lab__header">
          <h2 className="v4-lab__display">
            Tools in our <em>lab</em>
          </h2>
          <p className="v4-lab__lede">
            Free tools that show how ERA thinks. Each one uses public
            data. The full work happens with signals only we can see.
          </p>
        </div>

        <div className="v4-tool-grid">
          {TOOLS.map((t) => (
            <div key={t.name} className="v4-tool-tile">
              <div className="v4-tool-tile__top">
                <span
                  className={`v4-tool-tile__status ${STATUS_MOD[t.status]}`}
                >
                  {t.status}
                </span>
                <span className="v4-tool-tile__url">{t.url}</span>
                <div className="v4-tool-tile__title">
                  <h3 className="v4-tool-tile__headline">{t.headline}</h3>
                  <p className="v4-tool-tile__name">{t.name}</p>
                </div>
              </div>
              <div className="v4-tool-tile__bottom">
                <p className="v4-tool-tile__desc">{t.description}</p>
                <a className="v4-tool-tile__cta" href={t.href}>
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="v4-lab__closing">
          USE THEM · NO LOGIN
        </div>
      </div>
    </section>
  )
}
