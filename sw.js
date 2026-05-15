const CACHE = 'kickstart-v1'
const ASSETS = [
  '/three-minute-spark/',
  '/three-minute-spark/index.html',
  '/three-minute-spark/manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  )
})
