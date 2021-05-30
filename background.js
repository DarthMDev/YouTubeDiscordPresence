var nativePort = chrome.runtime.connectNative("com.ytdp.staller");

chrome.runtime.onConnect.addListener(function(port){
    console.assert(port.name == "dataChannel");
    port.onMessage.addListener(function(msg){
        port.postMessage({status: "received by background.js: " + msg.title + " and more"});
        if (msg.title != "") {
            nativePort.postMessage({
                title: msg.title,
                currentTime: msg.currentTime,
                duration: msg.duration,
                channelName: msg.channelName,
                channelImage: msg.channelImage,
                notPlayingAd: msg.notPlayingAd
            });
        }
    });
});