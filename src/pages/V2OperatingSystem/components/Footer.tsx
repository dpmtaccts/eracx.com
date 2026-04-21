import { footer } from '../content'

// v8 delta items 13 + 15: dark-ground footer with three rows.
export default function Footer() {
  return (
    <footer className="v2-footer-dark">
      <div className="container">
        <div className="footer-nav">
          {footer.columns.map((col) => (
            <div key={col.heading} className="footer-col">
              <h4>{col.heading}</h4>
              <ul>
                {col.items.map((item) => (
                  <li key={`${col.heading}-${item.label}`}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-wordmark-row">
          <a href="#top" className="footer-wordmark" aria-label="ERA">
            <img src="/assets/era_final.png" alt="ERA" />
          </a>
          <div className="footer-tagline">{footer.tagline}</div>
        </div>

        <div className="footer-meta-row">
          <span className="footer-mark" aria-hidden="true" />
          <span className="footer-meta">{footer.meta}</span>
        </div>
      </div>
    </footer>
  )
}
