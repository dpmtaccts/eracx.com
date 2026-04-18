import { footer } from '../content'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo">
              ERA<span className="dot">◆</span>
            </div>
          </div>
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="copyright">
          <div>{footer.copyright}</div>
          <div>ERA ◆</div>
        </div>
      </div>
    </footer>
  )
}
