import { useEffect, useRef, useState } from 'react'
import { gallery, imgSm } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Карусель на scroll-snap: свайп на телефоне, стрелки и точки — на десктопе
export default function Gallery({ onOpen }) {
  const { t } = useLang()
  const g = t.gallery
  const track = useRef(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const el = track.current
    const update = () => {
      const n = Math.max(1, Math.ceil((el.scrollWidth - 1) / el.clientWidth))
      setPages(n)
      const max = el.scrollWidth - el.clientWidth
      setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (n - 1)))
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollBy = (dir) => track.current.scrollBy({ left: dir * track.current.clientWidth * 0.9, behavior: 'smooth' })
  const goTo = (i) => {
    const el = track.current
    el.scrollTo({ left: ((el.scrollWidth - el.clientWidth) * i) / Math.max(1, pages - 1), behavior: 'smooth' })
  }

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery__head" data-reveal>
          <div>
            <p className="eyebrow">{g.eyebrow}</p>
            <h2 id="gallery-title" className="title">{g.title}</h2>
          </div>
          <button type="button" className="btn btn--outline btn--small" onClick={() => onOpen(0)}>
            {g.all} <Icon name="arrow" size={16} />
          </button>
        </div>

        <div className="gallery__carousel">
          <button type="button" className="round-btn gallery__prev" aria-label={g.prev} onClick={() => scrollBy(-1)} disabled={page === 0}>
            <Icon name="arrowLeft" size={20} />
          </button>
          <ul ref={track} className="gallery__track">
            {gallery.map((name, i) => (
              <li key={name}>
                <button type="button" className="gallery__item" onClick={() => onOpen(i)} aria-label={`${g.open}: ${g.alts[i]}`}>
                  <img src={imgSm(name)} alt="" loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="round-btn gallery__next" aria-label={g.next} onClick={() => scrollBy(1)} disabled={page >= pages - 1}>
            <Icon name="arrowRight" size={20} />
          </button>
        </div>

        {pages > 1 && (
          <div className="dots">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`dot${i === page ? ' is-active' : ''}`}
                aria-label={`${g.page} ${i + 1}`}
                aria-current={i === page ? 'true' : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
