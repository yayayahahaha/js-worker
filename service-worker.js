self.addEventListener('install', (event) => {
    console.log('service-worker installing');
    event.waitUntil(caches.open('v1').then(cache => cache.addAll([])));
})

self.addEventListener('activate', event => {
    console.log('now service-worker ready to handle fetches!');
});

self.addEventListener('fetch', event => {
    console.log(`handling fetch event for ${event.request.url}`);

    event.respondWith( caches.match(event.request).then((response) => {
        if (response) {
            console.log('曾經被快取存過!');
            return response;
        } else {
            console.log('沒有在快取裡面!');
            return fetch(event.request).then((response) => {
                return response
            });
        }
    }).catch((error) => {
        console.log(error);
    }) );
});