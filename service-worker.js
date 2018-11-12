self.addEventListener('install', (event) => {
    console.log('service-worker installing');

    event.waitUntil(caches.open('cache_name').then(cache => cache.addAll([
        'assets/img/1.jpg',
        'assets/img/2.jpg',
        'assets/img/3.jpg',
        'assets/img/4.png',
        'assets/img/5.jpg',
        '/'
    ])));
})

self.addEventListener('activate', event => {
    console.log('now service-worker ready to handle fetches!');
});

self.addEventListener('fetch', event => {
    var url = new URL(event.request.url);
    console.log(url.pathname);

    if (url.pathname.indexOf('.jpg') !== -1 || url.pathname.indexOf('.png') !== -1) {
        // event.respondWith(caches.match(url.pathname));
        console.log(url.pathname);
        event.respondWith(caches.match('/assets/img/4.png'));
    }
    if (url.pathname === '/') {
        console.log('now loading root path');
    }
});