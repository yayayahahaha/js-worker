var cacheList = ['v1'],
    cacheName = 'v1';

self.addEventListener('install', (event) => {
    console.log('service-worker installing');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll([]);
        }));
})


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            console.log('cache 的名字們');
            console.log(cacheNames);

            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('in map!!');
                    if (cacheList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', event => {
    console.log(`handling fetch event for ${event.request.url}`);
    return;

    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            console.log(cacheName + '曾經被快取存過!');
            return response;
        } else {
            console.log(cacheName + '沒有在快取裡面!');
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
    }));
});