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
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => {
            console.log('then then then');
        })
        .catch(() => {
            console.log('catch catch catch');
        });
}

serviceWorker();