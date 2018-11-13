/******************
 web worker testing
 ******************/

function serviceWorkerFunction() {
    var self = this,
        cacheList = ['v1', 'v2', 'v3', 'v4', 'v5'],
        cacheName = 'v3';

    self.addEventListener('install', (event) => {
        console.log('service-worker installing');
        event.waitUntil(
            caches.open(cacheName)
            .then(cache => {
                cache.addAll([]);

                // 防止等待?
                skipWaiting();
            }));
    })

    self.addEventListener('activate', event => {
        console.log('現在service-worker activate 了');

        event.waitUntil(
            caches.keys().then((cacheNames) => {
                console.log('cache 的名字們');
                console.log(cacheNames);

                return Promise.all(
                    cacheNames.map((cacheName) => {
                        console.log('in map!!');
                        if (cacheList.indexOf(cacheName) === -1) {
                            console.log(`${ cacheList.indexOf(cacheName) }`);
                            console.log(`${ cacheName } will be remove`);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });

    self.addEventListener('fetch', event => {
        console.log(`handling fetch event for ${event.request.url}`);

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
}

function webWorkerFunciton() {
    var worker = this;

    worker.onmessage = function(e) {
        console.log('got message!!');
        console.log(`message from main.js: ${ e.data }`);

        for (var i = 0; i < 1000000000; i++) {
            if (i % 100000000 === 0) {
                console.log(i);
            }
        }

        worker.postMessage('I got it, please wait');
    }
}

function run(fn) {
    fn = fn ? fn : Function.prototype;
    return new Worker(URL.createObjectURL(new Blob(['(' + fn + ')()'])));
}

function webWorker() {
    // dedicated workder, 單一 workder

    // 一般的靜態檔寫法
    // var hardWorker = new Worker('./web-worker.js');
    // 動態的function 寫法
    var hardWorker = run(webWorkerFunciton);

    hardWorker.postMessage('hi, there');
    hardWorker.onmessage = function(e) {
        console.log('I got message');
        console.log(e.data);
    }

    /*
        // 用來測試thread 與否的差異檔
        for (var i = 0; i < 1000000000; i++) {
            if (i % 100000000 === 0) {
                console.log(i);
            }
        }
        return;
    */
}


/**********************
 service worker testing
 **********************/
function serviceWorker() {
    if (!navigator || !navigator.serviceWorker) {
        console.warn('this browser doesn\'t support service-worker');
        return;
    }
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => {
            console.log('load service-worker success!!!!');
        })
        .catch(() => {
            console.log('catch catch catch');
        });
}

webWorker();
// serviceWorker();