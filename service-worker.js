const CACHE_NAME = "diario-de-bordo-v2";

const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./script.js",
    "./style.css",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
];

// Instalação
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Ativação (limpar caches antigos)
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Interceptação (offline)
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    );
});
