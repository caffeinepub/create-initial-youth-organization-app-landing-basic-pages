// Service Worker for PWA support - Version 19
const CACHE_NAME = 'yfo-cache-v19';
const STATIC_ASSETS = [
  '/manifest.webmanifest',
  '/assets/generated/yfo-logo.dim_512x512.png',
  '/assets/generated/youth-hero.dim_1600x900.png',
  '/assets/generated/yfo-pwa-icon.dim_192x192.png',
  '/assets/generated/yfo-pwa-icon.dim_512x512.png',
  '/ads.txt',
];

// Install event - cache static assets (excluding HTML to ensure fresh content)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.error('Failed to cache assets during install:', error);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, fallback to cache (never cache HTML/navigation)
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // For navigation requests (HTML pages), always fetch from network
  // This ensures users always get the latest version after deployment
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => {
          // Only on network failure, try cache as last resort
          return caches.match('/index.html').then((cachedResponse) => {
            return cachedResponse || new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
            });
          });
        })
    );
    return;
  }

  // For all other resources (JS, CSS, images, etc.), use network-first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        const responseToCache = response.clone();
        
        // Cache successful responses (but not HTML)
        if (response.status === 200 && !event.request.url.includes('.html')) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
      })
  );
});
