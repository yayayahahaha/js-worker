self.addEventListener('install', (event) => {
    console.log('service-worker installing');

    event.waitUntil(caches.open('static-v1').then((cache) => {
        cache.add('/waht');
    }));
})

self.addEventListener('activate', event => {
    console.log('now service-worker ready to handle fetches!');
});

self.addEventListener('fetch', event => {
    var url = new URL(event.request.url);
    console.log(url);
});