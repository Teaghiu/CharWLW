/* sw.js — TeaGhiu PWA · 12/10/2026
   Chiến lược: điều hướng (trang) = network-first để LUÔN thấy bản mới;
   ảnh/nhạc/css/js = cache nhanh (stale-while-revalidate) để mở app mượt & xem offline ảnh đã xem. */
const CACHE = 'teaghiu-v1';
const CORE = ['./index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './style.css', './icon.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  /* mở trang: mạng trước, đứt mạng mới lấy bản cache */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* ảnh, nhạc, css, js: có cache thì đưa ngay, đồng thời cập nhật ngầm */
  e.respondWith(
    caches.match(req).then(cached => {
      const fetched = fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
