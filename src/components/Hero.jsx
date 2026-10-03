import { srcSet, img } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <img
        className="hero__bg"
        src={img('hero')}
        srcSet={srcSet('hero')}
        sizes="100vw"
        alt={h.alt}
        fetchPriority="high"
      />
      <div className="container hero__content">
        <h1 id="hero-title" className="hero__title">
          {h.title[0]}
          <br />
          {h.title[1]}
        </h1>
        <p className="hero__subtitle">{h.subtitle}</p>
        <span className="hero__rule" aria-hidden="true" />
        <p className="hero__lead">{h.lead}</p>
        <div className="hero__actions">
          <a href="#menu" className="btn btn--accent">
            {h.menu} <Icon name="arrow" size={18} />
          </a>
          <a href="#contact" className="btn btn--outline-light">
            {h.contact} <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
