/******************
 web worker testing
 ******************/
function webWorker() {
    // dedicated workder, 單一 workder
    var hardWorker = new Worker('./web-worker.js');
    hardWorker.postMessage('hi, there');
    hardWorker.onmessage = function(e) {
        console.log('I got message');
        console.log(e.data);
    }
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

// webWorker();
serviceWorker();