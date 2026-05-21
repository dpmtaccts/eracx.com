import { FONT } from '../../pages/betterup/theme'

const INK = '#0A0A0A'
const YELLOW = '#F4C430'
const HOT = '#E6195F'
const CREAM_WHITE = '#FFFFFF'

export type PartnershipBlock = {
  eyebrow: string
  headline: string
  items: readonly string[]
}

export type PartnershipContact = {
  name: string
  role: string
  email: string
}

type Props = {
  eyebrow: string
  headline: string
  blocks: readonly PartnershipBlock[]
  contacts: readonly PartnershipContact[]
  /** Optional click handler for analytics on email links. */
  onContactClick?: (contact: PartnershipContact) => void
}

// §06: closes the audit on the offer. Ink ground, three vertically-stacked
// blocks. The two engagement blocks read as a peer-to-peer brief; the contact
// row converts the brief into an ask.
export function PartnershipSection({
  eyebrow,
  headline,
  blocks,
  contacts,
  onContactClick,
}: Props) {
  return (
    <section
      style={{
        background: INK,
        color: CREAM_WHITE,
        margin: '0 calc(-1 * (50vw - 50%)) 0',
        padding: '96px max(32px, calc(50vw - 600px))',
      }}
    >
      <div style={{ marginBottom: 48, maxWidth: 760 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: YELLOW,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontFamily: FONT.mega,
            fontSize: 'clamp(40px, 7vw, 96px)',
            fontWeight: 400,
            lineHeight: 0.94,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: CREAM_WHITE,
            margin: 0,
          }}
        >
          {headline}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {blocks.map((block, i) => (
          <article
            key={block.eyebrow}
            style={{
              padding: '32px 0',
              borderTop: `1px solid rgba(255, 255, 255, 0.12)`,
              borderBottom:
                i === blocks.length - 1 ? `1px solid rgba(255, 255, 255, 0.12)` : 'none',
              display: 'grid',
              gridTemplateColumns: 'minmax(220px, 1fr) minmax(0, 2fr)',
              gap: 32,
              alignItems: 'start',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.55)',
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {block.eyebrow}
              </div>
              <h3
                style={{
                  fontFamily: FONT.display,
                  fontSize: 26,
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: CREAM_WHITE,
                  margin: 0,
                }}
              >
                {block.headline}
              </h3>
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {block.items.map((item, j) => (
                <li
                  key={j}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    fontFamily: FONT.body,
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  <span
                    style={{
                      flex: '0 0 auto',
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      color: HOT,
                      fontWeight: 600,
                      paddingTop: 3,
                      minWidth: 24,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {String(j + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Contact row */}
      <div
        style={{
          marginTop: 48,
          paddingTop: 32,
          borderTop: `1px solid rgba(255, 255, 255, 0.12)`,
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 1fr) minmax(0, 2fr)',
          gap: 32,
          alignItems: 'start',
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: YELLOW,
            fontWeight: 600,
          }}
        >
          Get in touch
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {contacts.map((c) => (
            <div key={c.email}>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 18,
                  fontWeight: 400,
                  color: CREAM_WHITE,
                  margin: 0,
                  letterSpacing: '-0.005em',
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: 13,
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: 4,
                }}
              >
                {c.role}
              </div>
              <a
                href={`mailto:${c.email}`}
                onClick={() => onContactClick?.(c)}
                style={{
                  display: 'inline-block',
                  marginTop: 10,
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  color: HOT,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  borderBottom: `1px solid ${HOT}`,
                  paddingBottom: 2,
                }}
              >
                {c.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
