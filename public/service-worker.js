if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.min.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

var cacheName = 'performance-matters-jamal';
var urlsToCache = [
    '/',
    '/css/style.css',
    '/js/bundle.js',
    '/offline.html',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function (cache) {
            console.log('Opened cache')
            return cache.addAll(urlsToCache)
        })
        .catch(err => console.error(err))
    )
    event.waitUntil(self.skipWaiting())
})

// self.addEventListener('fetch', function (event) {
//     console.log('Fetch');
//     event.respondWith(
//         // Try the cache
//         caches.match(event.request).then(function (response) {
//             console.log(event.request, response);
//             // Fall back to network
//             return response;
//         }).catch(function () {
//             // If both fail, show a generic fallback:
//             return caches.match('/offline.html');
//         })
//     );
// });

self.addEventListener('fetch', function (event) {
    // request.mode = navigate isn't supported in all browsers
    // so include a check for Accept: text/html header.
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                // Return the offline page
                return caches.match('/offline.html');
            })
        );
    } else {
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});