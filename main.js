/******************
 web worker testing
 ******************/

function sayHi() {
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
    var hardWorker = run(sayHi);

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