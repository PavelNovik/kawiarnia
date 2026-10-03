import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import About from './components/About.jsx'
import Menu from './components/Menu.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Lightbox from './components/Lightbox.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import { gallery, tour } from './config.js'
import { useReveal } from './hooks/useReveal.js'
import { LangProvider, dictionaries, langFromPath, langPath, useLang } from './i18n/index.jsx'
import { applyHead } from './seo.js'

export default function App({ initialLang }) {
  const [lang, setLangState] = useState(initialLang)
  // Один lightbox на два набора фото: галерея и «экскурсия» из блока «O nas»
  const [viewer, setViewer] = useState({ set: 'gallery', index: null })
  useReveal(lang)

  // Смена языка без перезагрузки: меняем URL (/ или /en/) и <head>
  const setLang = useCallback((next) => {
    if (next === lang) return
    history.pushState(null, '', langPath(next) + location.hash)
    setLangState(next)
  }, [lang])

  useEffect(() => {
    applyHead(lang)
  }, [lang])

  useEffect(() => {
    const onPop = () => setLangState(langFromPath(location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const t = dictionaries[lang]
  const sets = {
    gallery: gallery.map((image, i) => ({ image, alt: t.gallery.alts[i] })),
    tour: tour.map((image, i) => ({ image, alt: t.about.tourAlts[i] })),
  }
  const setIndex = (next) =>
    setViewer((v) => ({ ...v, index: typeof next === 'function' ? next(v.index) : next }))

  return (
    <LangProvider lang={lang} setLang={setLang}>
      <SkipLink />
      <CookieConsent />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Features />
        <About onTour={() => setViewer({ set: 'tour', index: 0 })} />
        <Menu />
        <Gallery onOpen={(i) => setViewer({ set: 'gallery', index: i })} />
        <Contact />
      </main>
      <Footer />
      <Lightbox items={sets[viewer.set]} index={viewer.index} setIndex={setIndex} />
    </LangProvider>
  )
}

function SkipLink() {
  const { t } = useLang()
  return <a href="#main" className="skip-link">{t.nav.skip}</a>
}
