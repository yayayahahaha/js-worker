var cacheName = 'v15';

self.addEventListener('install', (event) => {
    console.log('service-worker installing');
    event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([])));
})

self.addEventListener('activate', event => {
    console.log('now service-worker ready to handle fetches!');
});

self.addEventListener('fetch', event => {
    console.log(`handling fetch event for ${event.request.url}`);

    return;
    event.respondWith( caches.match(event.request).then((response) => {
        if (response) {
            console.log('曾經被快取存過!' + cacheName);
            return response;
        } else {
            console.log('沒有在快取裡面!' + cacheName);
            return fetch(event.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        }
    }).catch((error) => {
        console.error('發生其他錯誤啦');
        console.error(error);
    }) );
});