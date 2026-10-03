import { useRef, useState } from 'react'
import { img, imgSm, menuCategories } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export default function Menu() {
  const { t } = useLang()
  const m = t.menu
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('coffee')
  const panel = useRef(null)
  const tabs = useRef({})

  // Карточка категории — раскрываем полное меню на нужной вкладке
  const show = (id) => {
    setTab(id)
    setOpen(true)
    requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  // Стрелки ←/→ переключают вкладки (паттерн ARIA tabs)
  const onTabKey = (e) => {
    const ids = menuCategories.map((c) => c.id)
    const i = ids.indexOf(tab)
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = ids[(i + step + ids.length) % ids.length]
    setTab(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="menu" className="section section--dark menu" aria-labelledby="menu-title">
      <div className="container">
        <div className="menu__grid">
          <div className="menu__intro" data-reveal>
            <p className="eyebrow">{m.eyebrow}</p>
            <h2 id="menu-title" className="title">{m.title}</h2>
            <p className="menu__lead">{m.lead}</p>
            <button
              type="button"
              className="btn btn--accent"
              aria-expanded={open}
              aria-controls="menu-full"
              onClick={() => (open ? setOpen(false) : show(tab))}
            >
              {open ? m.hide : m.full} <Icon name="arrow" size={18} className={open ? 'is-up' : undefined} />
            </button>
          </div>

          <ul className="menu__cards">
            {menuCategories.map((c) => {
              const cat = m.categories[c.id]
              return (
                <li key={c.id} data-reveal>
                  <button type="button" className="menu-card" onClick={() => show(c.id)} aria-controls="menu-full">
                    <img src={imgSm(c.image)} alt={cat.alt} loading="lazy" />
                    <span className="menu-card__body">
                      <span className="menu-card__title">{cat.title}</span>
                      <span className="visually-hidden">— {m.open}</span>
                      <Icon name="arrow" size={18} />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div id="menu-full" ref={panel} className={`menu-full${open ? ' is-open' : ''}`} inert={!open}>
          <div className="menu-full__inner">
            <div className="menu-full__tabs" role="tablist" aria-label={m.tabs} onKeyDown={onTabKey}>
              {menuCategories.map((c) => (
                <button
                  key={c.id}
                  ref={(el) => (tabs.current[c.id] = el)}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={tab === c.id}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={tab === c.id ? 0 : -1}
                  className="menu-full__tab"
                  onClick={() => setTab(c.id)}
                >
                  {m.categories[c.id].title}
                </button>
              ))}
            </div>

            {menuCategories.map((c) => {
              const cat = m.categories[c.id]
              return (
                <div
                  key={c.id}
                  role="tabpanel"
                  id={`panel-${c.id}`}
                  aria-labelledby={`tab-${c.id}`}
                  hidden={tab !== c.id}
                  className="menu-full__panel"
                >
                  <img src={img(c.image)} alt="" loading="lazy" className="menu-full__img" />
                  <ul className="menu-list">
                    {cat.items.map((item) => (
                      <li key={item.name} className="menu-item">
                        <span className="menu-item__name">{item.name}</span>
                        <span className="menu-item__dots" aria-hidden="true" />
                        <span className="menu-item__price">
                          {item.price} {m.currency}
                        </span>
                        <span className="menu-item__desc">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <p className="menu-full__note">{m.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
