const CACHE_NAME = 'bunny-v1';
const ASSETS = [
  'https://xiaojiubi.github.io/pet-garden/',
  'https://xiaojiubi.github.io/pet-garden/index.html',
  'https://xiaojiubi.github.io/pet-garden/manifest.json',
  'https://xiaojiubi.github.io/pet-garden/icon-192.png',
  'https://xiaojiubi.github.io/pet-garden/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});
