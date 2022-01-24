self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('location-remover').then((cache) => cache.addAll([
        '/location-remover/',
        '/location-remover/index.html',
        '/location-remover/src/style.css',
        '/location-remover/src/script.js',
    ])),
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
