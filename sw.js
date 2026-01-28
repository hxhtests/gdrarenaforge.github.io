const CACHE_NAME = 'hxh-gdr-arena-forge-v1.0.2';

// Path base della app (funziona sia in root che in sottocartella, es. GitHub Pages)
function getBaseUrl() {
    const path = self.location.pathname.replace(/\/[^/]*$/, '/');
    return self.location.origin + path;
}

const ASSET_PATHS = [
    'index.html',
    'npc.html',
    'role.html',
    'incontro.html',
    'style.css',
    'script.js',
    'manifest.json',
    'images/hunter-x-logo.png',
    'offline.html'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
    const base = getBaseUrl();
    const fullUrls = ASSET_PATHS.map(p => base + p);
    if (base.replace(/\/$/, '') !== self.location.origin) {
        fullUrls.unshift(base);
    }
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache aperta');
                return cache.addAll(fullUrls.map(url => new Request(url, { redirect: 'follow' }))).catch((err) => {
                    console.warn('Alcuni asset non cachati:', err);
                });
            })
            .catch((error) => {
                console.error('Errore durante il caching:', error);
            })
    );
    self.skipWaiting();
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cn) => cn !== CACHE_NAME).map((cacheName) => {
                    console.log('Rimozione vecchia cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Gestione delle richieste di rete
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone della richiesta
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // Controlla se abbiamo ricevuto una risposta valida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone della risposta
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Non cachare le richieste API
                                if (!event.request.url.includes('/api/')) {
                                    cache.put(event.request, responseToCache);
                                }
                            });

                        return response;
                    })
                    .catch(() => {
                        // Offline fallback solo per navigazione (pagina), non per immagini/asset
                        if (event.request.mode === 'navigate') {
                            const base = getBaseUrl();
                            return caches.match(base + 'offline.html').then(r => r || caches.match('offline.html'));
                        }
                        return Promise.reject(new Error('Network failed'));
                    });
            })
    );
}); 