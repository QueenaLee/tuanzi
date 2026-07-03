/* ════════════════════════════════════════════
   SERVICE WORKER - 离线缓存与更新管理
   ════════════════════════════════════════════ */

const CACHE_NAME = 'kids-learning-v43';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
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
  // 逐个缓存，单个失败不影响其他资源，避免 addAll 整体回滚
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'reload' });
            if (res.ok) await cache.put(url, res.clone());
          } catch (e) {
            console.warn('[SW] precache miss:', url, e);
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
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

  // 同源静态资源：网络优先 + 缓存回退；网络失败时用缓存兜底
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    return; // 第三方资源（字体、CDN）不拦截
  }

  event.respondWith(
    (async () => {
      try {
        const netRes = await fetch(req);
        if (netRes.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, netRes.clone());
        }
        return netRes;
      } catch (e) {
        const cached = await caches.match(req);
        if (cached) return cached;
        // 子页面片段拿不到时返回空文档，避免 DOMParser 解析失败导致整页交互挂掉
        if (req.destination === 'document' || url.pathname.endsWith('.html')) {
          return new Response('<!DOCTYPE html><html><body></body></html>', {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
        return Response.error();
      }
    })()
  );
});
