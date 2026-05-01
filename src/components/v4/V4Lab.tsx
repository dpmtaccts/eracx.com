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
    url: 'linkedin.eracx.com',
    status: 'BETA',
    description:
      'A two-minute audit of your LinkedIn presence. Posts, comments, signal density. The same lens we use on customer accounts, pointed at yours.',
    cta: '→ AUDIT YOUR LINKEDIN',
    href: 'https://linkedin.eracx.com',
  },
  {
    name: 'Signal River',
    url: 'signals.eracx.com',
    status: 'LIVE',
    description:
      'A live feed of buyer signals across the public web. Funding rounds, leadership changes, expansion announcements. The same signals ERA captures for customers, made visible.',
    cta: '→ WATCH THE FEED',
    href: 'https://signals.eracx.com',
  },
  {
    name: 'Map',
    url: 'map.eracx.com',
    status: 'BETA',
    description:
      'A buying committee builder. Drop in a target account and ERA maps the full decision tree by name, role, and warmth. Find the people before you reach out.',
    cta: '→ BUILD A MAP',
    href: 'https://map.eracx.com',
  },
  {
    name: 'AI Mirror',
    url: 'eracx.com/mirror',
    status: 'COMING SOON',
    description:
      "A buyer-side audit. Most GTM tools are built for sellers. This one is built for buyers. Run it on a vendor, see what they actually look like.",
    cta: '→ NOTIFY ME',
    href: '#mirror-notify',
  },
]

export function V4Lab() {
  return (
    <section className="v4-section v4-section--lab" id="lab">
      <V4Header
        phase="§07 · LAB"
        meta={['4 TOOLS', '3 LIVE', 'MORE COMING']}
      />

      <div className="v4-lab">
        <div className="v4-lab__header">
          <h2 className="v4-lab__display">
            Tools we built<br />so you can <em>try us</em>.
          </h2>
          <p className="v4-lab__lede">
            Instead of asking you to trust ERA on faith, we built free
            tools that <strong>show what we do when we do it ourselves</strong>.
            Use them. Audit yourself. Then come talk.
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
                <h3 className="v4-tool-tile__name">{t.name}</h3>
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
          USE THEM · NO LOGIN · NO SALES PITCH
        </div>
      </div>
    </section>
  )
}
