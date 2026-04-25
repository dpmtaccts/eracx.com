// Thesis.tsx — Chalk-background band with the 95/5 thesis.
// Left: italic serif question with "95% of the accounts in it" highlighted
// in the Deep Steel accent. Right: two short paragraphs (TTF compress).

export default function Thesis() {
  return (
    <section className="thesis" id="thesis">
      <div className="container">
        <div className="thesis-grid">
          <p className="thesis-q">
            What if the problem is not that your pipeline is too small, but
            that{' '}
            <span className="mark">95% of the accounts in it</span> do not
            know you, do not trust you, and are not ready to buy from anyone?
          </p>
          <div className="thesis-body">
            <p>
              At any given moment, only five in every hundred accounts in
              your market are in-market. The other ninety-five are not your
              enemy. They are your inventory.
            </p>
            <p>
              Funnel thinking wastes them. Warmth thinking treats them as
              the asset that matures.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
