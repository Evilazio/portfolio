var CACHE_NAME = 'my-web-site-cache-v7';
var urlsToCache = [
  '/index.html',
  '/output.css',
  '/js/flyer.js',
  '/js/parallax.js',
  '/js/util.js',
  'https://unpkg.com/lucide@latest',
  'https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
];

self.addEventListener('install', function (event) {
  // event.waitUntil takes a promise to know how
  // long the installation takes, and whether it 
  // succeeded or not.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // Removes all old caches when an Service worker is updated.
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  // verify if the request is not from a chrome-extension
  if (!event.request.url.startsWith('chrome-extension://')) 
  event.respondWith(
    // This method looks at the request and
    // finds any cached results from any of the
    // caches that the Service Worker has created.
    // console.log(event)
    caches.match(event.request)
    .then(function (response) {
      // If a cache is hit, we can return thre response.
      if (response) {
        return response;
      }
      
        // Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the request.
        var fetchRequest = event.request.clone();

        // A cache hasn't been hit so we need to perform a fetch,
        // which makes a network request and returns the data if
        // anything can be retrieved from the network.
        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloning the response since it's a stream as well.
            // Because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                // Add the request to the cache for future queries.
                cache.put(event.request, responseToCache);
              });


            return response;
          }
        );
      })
  );
});