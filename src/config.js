// Общие настройки, не зависящие от языка. Тексты — в src/i18n/*.js
import photos from '../scripts/images.json'

export const brand = {
  name: 'Ziarno',
  fullName: 'Ziarno — Kawiarnia',
  // Боевой адрес сайта — для canonical, sitemap, hreflang и Schema.org.
  // При сборке на Vercel подставляется домен проекта (см. vite.config.js).
  siteUrl: __SITE_URL__ || 'https://ziarno.pl',
  email: 'kontakt@ziarno.pl',
  phone: '+48 123 456 789',
  street: 'ul. Kwiatowa 12',
  postalCode: '60-123',
  city: 'Poznań',
  country: 'PL',
  geo: { lat: 52.4064, lng: 16.9252 },
  // Часы работы для Schema.org (тексты для людей — в i18n contact.hours)
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '20:00' },
    { days: ['Saturday', 'Sunday'], opens: '08:00', closes: '21:00' },
  ],
  social: {
    instagram: 'https://instagram.com/ziarno.kawiarnia',
    facebook: 'https://facebook.com/ziarno.kawiarnia',
    tiktok: 'https://tiktok.com/@ziarno.kawiarnia',
  },
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${brand.street}, ${brand.postalCode} ${brand.city}`
)}`

export const img = (name) => `/images/${name}.webp`
export const imgSm = (name) => `/images/${name}-sm.webp`
export const srcSet = (name) => `${imgSm(name)} ${Math.round(photos[name].width / 2)}w, ${img(name)} ${photos[name].width}w`

// Автор и ссылка на фото Unsplash — для подписи в футере
export const credits = Object.entries(photos).map(([name, p]) => ({ name, author: p.author, url: `https://unsplash.com/@${p.user}` }))

// Ключи совпадают с menu.categories в i18n
export const menuCategories = [
  { id: 'coffee', image: 'menu-coffee' },
  { id: 'desserts', image: 'menu-desserts' },
  { id: 'snacks', image: 'menu-snacks' },
  { id: 'seasonal', image: 'menu-seasonal' },
]

// Порядок как в gallery.alts
export const gallery = ['g-interior', 'g-espresso', 'g-pastry', 'g-terrace', 'g-flowers', 'g-bar']

// Слайдшоу «Zobacz klimat naszego miejsca» — порядок как в about.tourAlts
export const tour = ['about', 'hero', 'g-interior', 'g-bar', 'g-terrace']

export const navIds = ['home', 'about', 'menu', 'gallery', 'contact']
