import { brand, credits } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import { openCookieSettings } from './CookieConsent.jsx'
import LangSwitcher from './LangSwitcher.jsx'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  // Один автор может снять несколько фото — показываем каждого один раз
  const authors = [...new Map(credits.map((c) => [c.author, c])).values()]
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">{brand.name}</span>
        <p className="footer__copy">
          © {new Date().getFullYear()} {brand.name}. {f.rights}
        </p>
        <ul className="footer__links">
          <li><a href="#privacy">{f.privacy}</a></li>
          <li><a href="#terms">{f.terms}</a></li>
          <li>
            <button type="button" className="link-btn" onClick={openCookieSettings}>{f.cookies}</button>
          </li>
        </ul>
        <LangSwitcher />
      </div>
      <p className="container footer__credits">
        {f.photos}:{' '}
        {authors.map((c, i) => (
          <span key={c.name}>
            {i > 0 && ', '}
            <a href={c.url} target="_blank" rel="noopener noreferrer">{c.author}</a>
          </span>
        ))}{' '}
        / Unsplash
      </p>
    </footer>
  )
}
