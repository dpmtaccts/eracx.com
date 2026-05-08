/**
 * V4PullQuote — editorial pull-forward of the Lorikeet customer quote.
 *
 * Sits between ▸01 (white hero) and ▸02 (magenta) as a standalone white
 * band. Surfaces the strongest extractable line from the Nate Houghton
 * testimonial in §04, framed as the operating thesis the rest of the
 * site has to back up. Typography only — no card, no border, no glyph
 * quotes. The full attributed quote stays in §04.
 */

export function V4PullQuote() {
  return (
    <section className="v4-section v4-section--customer-quote">
      <div className="v4-customer-quote">
        <p className="v4-customer-quote__eyebrow">WHAT CUSTOMERS SAY</p>
        <p className="v4-customer-quote__text">
          ERA builds things most consultants just talk about.
        </p>
        <div className="v4-customer-quote__attr">
          NATE HOUGHTON / LORIKEET
        </div>
      </div>
    </section>
  )
}
