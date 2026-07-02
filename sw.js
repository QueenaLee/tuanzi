/* ════════════════════════════════════════════
   SERVICE WORKER - 离线缓存与更新管理
   ════════════════════════════════════════════ */

const CACHE_NAME = 'kids-learning-v28';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './install.html',
  './manifest.json',
  './sw.js',
  './src/data/words.js',
  './src/data/pinyin.js',
  './src/data/phonics.js',
  './src/data/hanzi.js',
  './src/js/common.js',
  './src/js/english.js',
  './src/js/pinyin.js',
  './src/js/hanzi.js',
  './src/js/math.js',
  './src/pages/common.html',
  './src/pages/english.html',
  './src/pages/math.html',
  './src/pages/pinyin.html',
  './src/pages/hanzi.html',
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
  const req = event.request;
  // 只对 GET 请求处理；其他方法直接走网络
  if (req.method !== 'GET') return;

  // 导航请求：网络优先，失败回退到缓存的 index.html（离线 App Shell）
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match('./index.html')) || (await cache.match(req)) || Response.error();
      })
    );
    return;
  }

  // 其他请求：缓存优先，回退网络，失败时不回退 HTML
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(response => {
        if (response.ok && new URL(req.url).origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return response;
      });
    })
  );
});
