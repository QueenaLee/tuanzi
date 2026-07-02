/* ════════════════════════════════════════════
   SERVICE WORKER - 离线缓存与更新管理
   ════════════════════════════════════════════ */

const CACHE_NAME = 'kids-learning-v3';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './install.html',
  './manifest.json',
  './sw.js',
  './data.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }),
    self.skipWaiting()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    }),
    self.clients.claim()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
