// https://github.com/discord/discord-rpc
// MAIN VARIABLE INITIALIZATION

const LOGGING = true;

const NMF = { // NMF = NATIVE_MESSAGE_FORMAT
    TITLE: ":TITLE001:",
    AUTHOR: ":AUTHOR002:",
    TIME_LEFT: ":TIMELEFT003:",
    END: ":END004:",
    IDLE: "#*IDLE*#"
}

const IDLE_TIME_REQUIREMENT = 1500;

var nativePort = chrome.runtime.connectNative("com.ytdp.discord.presence");
var lastUpdated = 0;

// LISTENER FOR CONTENT.JS

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "document-data-pipe");
    port.onMessage.addListener(function(message) {
        if (message.title && message.author && message.timeLeft) {
            if (LOGGING) {
                console.log("Data was received by background.js: ['" + message.title + "', '" + message.author + "', '" + message.timeLeft + "']");
            }
            nativePort.postMessage(NMF.TITLE + message.title + NMF.AUTHOR + message.author + NMF.TIME_LEFT + message.timeLeft + NMF.END);
            lastUpdated = new Date().getTime();
        }
    });
});

// COMMUNICATION WITH NATIVE APP

console.log("background.js created")
var pipeInteravl = setInterval(function() {
    if ((new Date().getTime()) - lastUpdated > IDLE_TIME_REQUIREMENT) {
        if (LOGGING) {
            console.log("Idle data sent: " + NMF.TITLE + NMF.IDLE + NMF.AUTHOR + NMF.IDLE + NMF.TIME_LEFT + NMF.IDLE + NMF.END);
        }
        nativePort.postMessage(NMF.TITLE + NMF.IDLE + NMF.AUTHOR + NMF.IDLE + NMF.TIME_LEFT + NMF.IDLE + NMF.END);
    }
}, 1000);