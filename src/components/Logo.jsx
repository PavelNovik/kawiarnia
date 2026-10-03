import { brand } from '../config.js'

// Знак — росток из трёх листьев (как зерно, из которого всё начинается)
export function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M16 20c-3.2-2.6-3.2-8.4 0-12 3.2 3.6 3.2 9.4 0 12Z" />
      <path d="M15 21.5c-4.2.4-8.4-2.6-9-7.8 4.6-.4 8.2 2.8 9 7.8Z" />
      <path d="M17 21.5c4.2.4 8.4-2.6 9-7.8-4.6-.4-8.2 2.8-9 7.8Z" />
      <path d="M16 20v6" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ tag, href = '#home', size = 'md' }) {
  return (
    <a href={href} className={`logo logo--${size}`} aria-label={brand.name}>
      <LogoMark size={size === 'sm' ? 24 : 30} />
      <span className="logo__name">{brand.name}</span>
      {tag && <span className="logo__tag">{tag}</span>}
    </a>
  )
}
