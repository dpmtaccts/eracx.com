// InteractionStage.tsx — single full-height stage section for the
// vertical scrollytelling layout. Three-column at desktop (visual mock,
// chain content, radar slot). On mobile the radar is sticky elsewhere
// so this component only renders the visual + chain stacked. Uses
// IntersectionObserver to bubble its index up to the parent so the
// radar can morph.

import { useEffect, useRef, type ReactNode } from 'react'

interface Captured {
  signal: string
  source: string
}

interface FiredNext {
  name: string
  explainer: string
}

interface Props {
  stageIndex: number
  stageNumber: string
  weekLabel: string
  warmthBefore: number
  warmthAfter: number
  delta: string
  visualMock: ReactNode
  captured: Captured
  dimensionsMoved: string[]
  firedNext: FiredNext
  stageColor: 'cold' | 'warming' | 'warm' | 'hot'
  onActive: (index: number) => void
}

export default function InteractionStage({
  stageIndex,
  stageNumber,
  weekLabel,
  warmthBefore,
  warmthAfter,
  delta,
  visualMock,
  captured,
  dimensionsMoved,
  firedNext,
  stageColor,
  onActive,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const onActiveRef = useRef(onActive)
  onActiveRef.current = onActive

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          onActiveRef.current(stageIndex)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [stageIndex])

  return (
    <section
      ref={sectionRef}
      className={`vstage vstage--${stageColor}`}
      data-stage-index={stageIndex}
    >
      <div className="vstage-grid">
        <div className="vstage-visual">{visualMock}</div>
        <div className="vstage-chain">
          <div className="vstage-chain-head">
            <div className="vstage-chain-num">{stageNumber}</div>
            <div className="vstage-chain-week">{weekLabel}</div>
          </div>
          <div className="vstage-chain-warmth">
            <span className="vstage-chain-warmth-before">{warmthBefore}</span>
            <span className="vstage-chain-warmth-arrow">&rarr;</span>
            <span className="vstage-chain-warmth-after">{warmthAfter}</span>
            <span className="vstage-chain-warmth-delta">{delta}</span>
          </div>
          <div className="vstage-chain-row">
            <div className="vstage-chain-label">CAPTURED</div>
            <div className="vstage-chain-value">
              <b>{captured.signal}</b>
              <span>{captured.source}</span>
            </div>
          </div>
          <div className="vstage-chain-row">
            <div className="vstage-chain-label">DIMENSIONS MOVED</div>
            <div className="vstage-chain-dims">
              {dimensionsMoved.map((d) => (
                <span key={d} className="vstage-chain-dim">
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="vstage-chain-row">
            <div className="vstage-chain-label">FIRED NEXT</div>
            <div className="vstage-chain-value">
              <b>{firedNext.name}</b>
              <span>{firedNext.explainer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
