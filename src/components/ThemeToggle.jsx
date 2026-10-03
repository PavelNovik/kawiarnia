import { useEffect, useState } from 'react'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

const STORAGE_KEY = 'theme'
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

// Текущая тема: выбор пользователя (атрибут ставит скрипт в index.html до отрисовки) или системная
const current = () => document.documentElement.dataset.theme || (media().matches ? 'dark' : 'light')

export default function ThemeToggle() {
  const { t } = useLang()
  // До гидрации тема неизвестна — рендерим «светлую», затем уточняем
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(current())
    const m = media()
    const onChange = () => setTheme(current())
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* приватный режим — просто не запоминаем */
    }
    setTheme(next)
  }

  const dark = theme === 'dark'
  return (
    <button
      type="button"
      className={`theme-toggle${dark ? ' is-dark' : ''}`}
      aria-label={dark ? t.theme.toLight : t.theme.toDark}
      aria-pressed={dark}
      onClick={toggle}
    >
      <span className="theme-toggle__icon theme-toggle__icon--moon"><Icon name="moon" size={16} /></span>
      <span className="theme-toggle__icon theme-toggle__icon--sun"><Icon name="sun" size={16} /></span>
      <span className="theme-toggle__thumb" aria-hidden="true" />
    </button>
  )
}
