// Скачивает фото из scripts/images.json (Unsplash) и сохраняет в public/images
// два WebP-варианта: <name>.webp (полный размер) и <name>-sm.webp (для мобильных и превью).
// Запуск: npm run images. Свои фото — просто положите <name>.webp и <name>-sm.webp в public/images.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const list = JSON.parse(fs.readFileSync(path.resolve('scripts/images.json'), 'utf8'))
const out = path.resolve('public/images')
fs.mkdirSync(out, { recursive: true })

for (const [name, img] of Object.entries(list)) {
  const res = await fetch(`${img.src}?w=${img.width}&q=90&fm=jpg`)
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf).webp({ quality: 78 }).toFile(path.join(out, `${name}.webp`))
  await sharp(buf).resize({ width: Math.round(img.width / 2) }).webp({ quality: 74 }).toFile(path.join(out, `${name}-sm.webp`))
  const meta = await sharp(buf).metadata()
  console.log(`  ${name}  ${meta.width}×${meta.height}`)
}
