/**
 * V4Interstitial — magazine-style pull-quote interstitial that bridges
 * §01 Statement → §02 Method.
 *
 * White ground. Anton mega "Warmth compounds." with magenta accent on
 * "compounds." Small mono uppercase eyebrow above. No issue bar — pull
 * quotes don't get headers.
 *
 * Hard color transition: this section ends white, §02 begins magenta.
 * No fade, no gradient. Brutalist editorial.
 */

export function V4Interstitial() {
  return (
    <section className="v4-section v4-section--interstitial">
      <div className="v4-interstitial">
        <p className="v4-interstitial__eyebrow">§ The Thesis · Distilled</p>
        <h2 className="v4-interstitial__display">
          Warmth <em>compounds.</em>
        </h2>
      </div>
    </section>
  )
}
