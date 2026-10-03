import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { langFromPath } from './i18n/index.jsx'
// Шрифты с нашего домена (без Google Fonts CDN — RODO); латиница + латиница-ext для польских букв
import '@fontsource/dm-serif-display/latin-400.css'
import '@fontsource/dm-serif-display/latin-ext-400.css'
import '@fontsource/jost/latin-300.css'
import '@fontsource/jost/latin-ext-300.css'
import '@fontsource/jost/latin-400.css'
import '@fontsource/jost/latin-ext-400.css'
import '@fontsource/jost/latin-500.css'
import '@fontsource/jost/latin-ext-500.css'
import './styles/variables.css'
import './styles/global.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App initialLang={langFromPath(location.pathname)} />
  </StrictMode>
)

// В продакшене HTML уже отрендерен заранее (scripts/prerender.js) — «оживляем» его
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
