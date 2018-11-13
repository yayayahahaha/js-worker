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