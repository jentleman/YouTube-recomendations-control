/*console.log("background.js");
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    console.log(tabId, typeof(tabId), tab);
    if (tab.url && tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tabId, {text: "youtube page"});
    }
});*/