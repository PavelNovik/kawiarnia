import { img, srcSet } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export default function About({ onTour }) {
  const { t } = useLang()
  const a = t.about
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__text" data-reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 id="about-title" className="title">{a.title}</h2>
          <p className="subtitle">{a.subtitle}</p>
          {a.text.map((p) => (
            <p key={p} className="about__p">{p}</p>
          ))}
          <a href="#menu" className="btn btn--outline">
            {a.more} <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="about__media" data-reveal>
          <img src={img('about')} srcSet={srcSet('about')} sizes="(max-width: 900px) 100vw, 55vw" alt={a.photoAlt} loading="lazy" />
          <button type="button" className="about__tour" onClick={onTour}>
            <span className="about__play"><Icon name="play" size={26} /></span>
            <span>
              <strong>{a.tour}</strong>
              <small>{a.tourSub}</small>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
