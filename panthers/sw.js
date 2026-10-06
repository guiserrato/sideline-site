const CACHE = "sideline-panthers-29e977f2ef5321f4";
const FILES = ["./", "./index.html", "./roster.enc.json", "./manifest.webmanifest", "./logo.png", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((key) => key.startsWith("sideline-panthers-") && key !== CACHE)
      .map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
