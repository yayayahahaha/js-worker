/******************
 web worker testing
 ******************/

// dedicated workder, 單一 workder
var hardWorker = new Worker('./worker.js');

hardWorker.postMessage('hi, there');

hardWorker.onmessage = function(e) {
    console.log('I got message');
    console.log(e.data);
}


/**********************
 service worker testing
 **********************/

