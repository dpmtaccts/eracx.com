// InteractionChain.tsx — Figure 02 of How it works.
// 5-card grid (one per touchpoint): Step → did → captured → dimensions → fired next.
// Each card has a left-edge warmth-stage color stripe (cold/cold/warming/warm/hot)
// and a warmth delta badge top-right. Data copied verbatim from the source HTML.

type Stage = 's1' | 's2' | 's3' | 's4' | 's5'

interface Link {
  stage: Stage
  step: string
  delta: string
  did: { name: string; kind: string }
  captured: { signal: string; source: string }
  dims: string[]
  fired: { name: string; arrow: string }
}

const LINKS: Link[] = [
  {
    stage: 's1',
    step: 'Step 01  ·  Week 1',
    delta: '+4',
    did: { name: 'Post', kind: 'One → many  ·  broadcast' },
    captured: { signal: 'Attention signal', source: 'LinkedIn · HockeyStack' },
    dims: ['Frequency'],
    fired: {
      name: 'Nothing. We waited.',
      arrow: 'Broadcasts earn the right to be read. Not replied to.',
    },
  },
  {
    stage: 's2',
    step: 'Step 02  ·  Week 2',
    delta: '+9',
    did: { name: 'Comment', kind: 'Public  ·  reciprocation' },
    captured: { signal: 'Reciprocation signal', source: 'LinkedIn · Clay' },
    dims: ['Frequency', 'Responsiveness'],
    fired: {
      name: 'Named-account tag applied',
      arrow: 'VP Growth identified. Added to the watch list.',
    },
  },
  {
    stage: 's3',
    step: 'Step 03  ·  Week 3',
    delta: '+10',
    did: { name: 'Landing page', kind: 'Solo  ·  research' },
    captured: { signal: 'Intent signal', source: 'HockeyStack · RB2B' },
    dims: ['Recency', 'Density'],
    fired: {
      name: 'Warm outreach trigger',
      arrow: 'Two visits, four-minute dwell. Not an accident.',
    },
  },
  {
    stage: 's4',
    step: 'Step 04  ·  Week 4–5',
    delta: '+12',
    did: { name: 'Email · parallel', kind: 'Private  ·  multi-thread' },
    captured: { signal: 'Disclosure signal', source: 'Apollo · HubSpot' },
    dims: ['Velocity', 'Density', 'Responsiveness'],
    fired: {
      name: 'Stakeholder map update',
      arrow: 'Champion + economic buyer engaged on same thread.',
    },
  },
  {
    stage: 's5',
    step: 'Step 05  ·  Week 6',
    delta: '+5',
    did: { name: 'Meeting', kind: 'Sync  ·  high-bandwidth' },
    captured: { signal: 'Commitment signal', source: 'HubSpot · Gong' },
    dims: ['Velocity', 'Frequency', 'Density'],
    fired: {
      name: 'Trust-loop invitation',
      arrow: 'Advisor dinner, six peers. No pitch. No deck.',
    },
  },
]

export default function InteractionChain() {
  return (
    <div className="chain">
      {LINKS.map((link) => (
        <div key={link.stage} className={`link ${link.stage}`}>
          <div className="link-step">{link.step}</div>
          <div className="link-delta">{link.delta}</div>
          <div className="link-did">
            <div className="link-did-label">What we did</div>
            <div className="link-did-name">{link.did.name}</div>
            <div className="link-did-kind">{link.did.kind}</div>
          </div>
          <div className="link-captured">
            <div className="link-captured-label">What we captured</div>
            <div className="link-signal">{link.captured.signal}</div>
            <div className="link-source">{link.captured.source}</div>
          </div>
          <div className="link-dims-wrap">
            <div className="link-dims-label">Dimensions moved</div>
            <div className="link-dims">
              {link.dims.map((dim) => (
                <span key={dim} className="link-dim">{dim}</span>
              ))}
            </div>
          </div>
          <div className="link-fired">
            <div className="link-fired-label">What fired next</div>
            <div className="link-fired-name">{link.fired.name}</div>
            <div className="link-fired-arrow">{link.fired.arrow}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
