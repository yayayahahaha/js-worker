var worker = this;

worker.onmessage = function(e) {
    console.log('got message!!');
    console.log(`message from main.js: ${ e.data }`);

    worker.postMessage('I got it, please wait');
    return;
    // 如果關了，node 的程式也會結束
    worker.close();
}