import { Link } from 'react-router-dom'
import { footer } from '../content'

// v8 delta items 13 + 15 + 33b: dark-ground footer with nav columns,
// brand row (diamond symbol + "era" wordmark left, tagline + location
// right), and a thin meta rule. Prior "shrink the wordmark, remove the
// diamond" instruction is void per 33b — both return.
export default function Footer() {
  return (
    <footer className="v2-footer-dark" data-ground="dark">
      <div className="container">
        <div className="footer-nav">
          {footer.columns.map((col) => (
            <div key={col.heading} className="footer-col">
              <h4>{col.heading}</h4>
              <ul>
                {col.items.map((item) => (
                  <li key={`${col.heading}-${item.label}`}>
                    {item.href.startsWith('/') && !item.href.startsWith('/#') ? (
                      <Link to={item.href}>{item.label}</Link>
                    ) : (
                      <a href={item.href}>{item.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-brand-row">
          <Link to="/" className="footer-brand" aria-label="ERA — home">
            <span className="footer-brand-mark" aria-hidden="true" />
            <span className="footer-brand-wordmark">era</span>
          </Link>
          <div className="footer-brand-text">
            <div className="footer-tagline">{footer.tagline}</div>
            <div className="footer-location">{footer.meta}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
