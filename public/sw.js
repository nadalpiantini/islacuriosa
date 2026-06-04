/* Isla Curiosa — service worker (offline-friendly, RD-data-aware).
 * Precache: light shell + light assets only. Heavy videos = runtime cache-on-use.
 * Defensive: per-item precache (one failure can't abort install). */
var CACHE = 'isla-v1';

var PRECACHE = [
  '/', '/experiencia.html', '/mapa.html', '/manifest.json', '/logo.webp',
  // game images
  '/juegos/mapa-isla-curiosa.webp', '/juegos/fuzzy-hero.webp', '/juegos/fuzzy-pointing-t.webp',
  '/juegos/fuzzy-celebrate.webp', '/juegos/fuzzy-confused-t.webp', '/juegos/fuzzy-lost.webp',
  '/juegos/fuzzy-map-walk.webp',
  // game narration voices
  '/juegos/voz/g1-intro.mp3', '/juegos/voz/g2-intro.mp3', '/juegos/voz/g3-intro.mp3',
  '/juegos/voz/g4-intro.mp3', '/juegos/voz/bien.mp3', '/juegos/voz/otravez.mp3',
  '/juegos/voz/q-selva.mp3', '/juegos/voz/q-bahia.mp3', '/juegos/voz/q-manglares.mp3',
  '/juegos/voz/q-coral.mp3', '/juegos/voz/q-tesoro.mp3',
  // sfx + ambient
  '/fuzzy/sfx/amb-beach.mp3', '/fuzzy/sfx/amb-birds.mp3', '/fuzzy/sfx/whoosh.mp3',
  '/fuzzy/sfx/map-unroll.mp3', '/fuzzy/sfx/chime.mp3', '/fuzzy/sfx/sparkle.mp3',
  '/fuzzy/sfx/cheer.mp3', '/fuzzy/sfx/glow.mp3',
  // experience voices (light)
  '/fuzzy/voz/telefono.mp3', '/fuzzy/voz/saludo.mp3', '/fuzzy/voz/chiste.mp3',
  '/fuzzy/voz/celebra.mp3', '/fuzzy/voz/despedida.mp3'
];

// Heavy media: cached only after first use (kept out of install to stay light on RD data).
function isHeavyMedia(url) {
  return /\.(mp4|webm|mov)$/i.test(url) || /-celebrate\.png$|landing\.png$/i.test(url);
}

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // add each item individually so one 404 can't abort the whole install
      return Promise.all(PRECACHE.map(function (u) {
        return cache.add(u).catch(function () { /* ignore single failures */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Only handle same-origin; let cross-origin (fonts, ElevenLabs, etc.) pass through.
  if (url.origin !== self.location.origin) return;

  // Heavy media: runtime cache-on-use (cache-first after first fetch).
  if (isHeavyMedia(url.pathname)) {
    e.respondWith(
      caches.open(CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req).then(function (res) {
            try { if (res && res.ok) cache.put(req, res.clone()); } catch (_) {}
            return res;
          }).catch(function () { return hit; });
        });
      })
    );
    return;
  }

  // Navigations: network-first, fall back to cache (offline).
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match('/experiencia.html') || caches.match('/');
        });
      })
    );
    return;
  }

  // Everything else same-origin: cache-first, fall back to network (and cache it).
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        try {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
        } catch (_) {}
        return res;
      }).catch(function () { return hit; });
    })
  );
});
