import { useState } from 'react'
import { brand, mapsUrl } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

const { lat, lng } = brand.geo
const bbox = [lng - 0.012, lat - 0.005, lng + 0.012, lat + 0.005].map((n) => n.toFixed(4)).join('%2C')
const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  // Карта со стороннего сервера грузится только по клику (RODO: без передачи IP заранее)
  const [map, setMap] = useState(false)

  const socials = [
    ['instagram', 'Instagram'],
    ['facebook', 'Facebook'],
    ['tiktok', 'TikTok'],
  ]

  return (
    <section id="contact" className="contact section--dark" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__brand" data-reveal>
          <Logo tag={t.logoTag} />
          <p className="contact__tagline">{c.tagline}</p>
          <ul className="socials" aria-label={c.social}>
            {socials.map(([key, label]) => (
              <li key={key}>
                <a href={brand.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label} className="round-btn">
                  <Icon name={key} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__info" data-reveal>
          <h2 id="contact-title" className="eyebrow">{c.eyebrow}</h2>
          <address>
            <ul className="contact__list">
              <li>
                <Icon name="pin" size={20} />
                <span><span className="visually-hidden">{c.address}: </span>{brand.street}, {brand.postalCode} {brand.city}</span>
              </li>
              <li>
                <Icon name="clock" size={20} />
                <span>
                  <span className="visually-hidden">{c.hoursLabel}: </span>
                  {c.hours.map((h) => (
                    <span key={h} className="contact__line">{h}</span>
                  ))}
                </span>
              </li>
              <li>
                <Icon name="phone" size={20} />
                <a href={`tel:${brand.phone.replace(/\s/g, '')}`}><span className="visually-hidden">{c.phone}: </span>{brand.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={20} />
                <a href={`mailto:${brand.email}`}><span className="visually-hidden">{c.email}: </span>{brand.email}</a>
              </li>
            </ul>
          </address>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline-light btn--stack">
            <span>
              {c.directions}
              <small>{c.directionsSub}</small>
            </span>
            <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="contact__map" data-reveal>
          {map ? (
            <iframe title={c.mapTitle} src={osmUrl} loading="lazy" referrerPolicy="no-referrer" />
          ) : (
            <div className="map-placeholder">
              <span className="map-placeholder__pin">
                <Icon name="pin" size={30} />
                <strong>{brand.name}</strong>
              </span>
              <span className="map-placeholder__city" aria-hidden="true">{brand.city.toUpperCase()}</span>
              <button type="button" className="btn btn--accent btn--small" onClick={() => setMap(true)}>
                <Icon name="map" size={16} /> {c.mapLoad}
              </button>
              <small>{c.mapNote}</small>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
