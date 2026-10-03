import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export default function Features() {
  const { t } = useLang()
  return (
    <section className="features" aria-label={t.about.eyebrow}>
      <ul className="container features__list">
        {t.features.map((f) => (
          <li key={f.icon} className="feature" data-reveal>
            <span className="feature__icon"><Icon name={f.icon} size={30} /></span>
            <span>
              <strong className="feature__title">{f.title}</strong>
              <span className="feature__text">{f.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
