const CACHE_NAME = 'lepisense-v1.0.0';
const RUNTIME_CACHE = 'lepisense-runtime';

// Resources to cache on install
const PRECACHE_URLS = [
  '/lepisense-website/',
  '/lepisense-website/index.html',
  '/lepisense-website/manifest.json',
  '/lepisense-website/deployed-ami-mini.jpeg',
  '/lepisense-website/assets/android-launchericon-48-48.png',
  '/lepisense-website/assets/android-launchericon-72-72.png',
  '/lepisense-website/assets/android-launchericon-96-96.png',
  '/lepisense-website/assets/android-launchericon-144-144.png',
  '/lepisense-website/assets/android-launchericon-192-192.png',
  '/lepisense-website/assets/android-launchericon-512-512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/WEEE_symbol_vectors.svg/338px-WEEE_symbol_vectors.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ISO_7010_W027.svg/549px-ISO_7010_W027.svg.png'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network First strategy (always try to get fresh content)
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    // Try network first
    fetch(event.request)
      .then(response => {
        // If we got a valid response, clone it and update the cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log('[ServiceWorker] Serving from cache:', event.request.url);
              return cachedResponse;
            }
            // If not in cache, return offline page or error
            return new Response('Offline - content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Listen for messages from the client to force update
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});
