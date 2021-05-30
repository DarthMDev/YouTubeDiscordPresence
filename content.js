// https://developer.chrome.com/docs/extensions/mv3/messaging/
// to get an element, inspect it and copy its JS path

var port = chrome.runtime.connect({name: "dataChannel"});

port.onMessage.addListener(function(msg){
    console.log(msg.status);
});

setInterval(function() {
    if (document.URL.startsWith("https://www.youtube.com/watch?v=") && document.readyState == "complete") {
        port.postMessage({
            title: document.querySelector("#container > h1 > yt-formatted-string").innerText,
            currentTime: document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span.ytp-time-current").innerText,
            duration: document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span.ytp-time-duration").innerText,
            channelName: document.querySelector("#text > a").innerText,
            channelImage: document.querySelector("#img").src,
            notPlayingAd: document.querySelector("div.ytp-ad-player-overlay-instream-info") == null
        });
    }
    console.log("message was sent by content.js");
}, 250);