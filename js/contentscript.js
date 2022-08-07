document.onload =  a ();

let node = document.querySelector("body > ytd-app > ytd-popup-container");
let observer = new MutationObserver(mutations => {
    mutations.forEach(function(mutation) {
        console.log(mutation);
        for(let node of mutation.addedNodes) {
            //check if menuitem list appears
            if (node.matches('ytd-menu-service-item-renderer')) {
                console.log(mutation);
                let menuItem = document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(6)");
                console.log("Menu item\n", menuItem);
                const event1 = new MouseEvent('click');
                menuItem.dispatchEvent(event1);
            }
        }
    });})

observer.observe(node, {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    characterDataOldValue: true // pass old data to callback
});


document.onchange = function () {
   
};

function a () {
console.log("youtube");
//get all videos ids
let videoLinkTags = document.getElementsByClassName("yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media");

console.log(videoLinkTags);
let videoIDs =[];
for (let i = 0; i < videoLinkTags.length; i++) {

    let videoURL = new URL(videoLinkTags[i].href);
    let videoID = videoURL.searchParams.get("v")
    videoIDs.push({videoId: videoID});
}
let apiKey ="";   
console.log(videoIDs);
chrome.storage.sync.get("API_key", result => {
    if (result) {
        //show API key
        console.log("API key: ", result.API_key);
        apiKey = result.API_key;
        for (let i = 0; i < videoIDs.length; i++)
        {
            let apiCall_v = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet"+ "&id=" + videoIDs[i].videoId +"&key=" + apiKey;
            //console.log(apiCall_v);
            fetch(apiCall_v).then(function(response) {
                //wait for response
                if (response.status !== 200)
                {
                    console.log("Error " + response.status);
                }
                response.json().then(function (data) {
                        videoIDs[i].channelId = data.items[0].snippet.channelId;
                        let apiCall_c = "https://www.googleapis.com/youtube/v3/channels?part=snippet"+ "&id=" + videoIDs[i].channelId +"&key=" + apiKey;
                        //console.log(apiCall_c);
                        fetch(apiCall_c).then(function(response) {
                            //wait for response
                            if (response.status !== 200)
                            {
                                console.log("Error " + response.status);
                            }
                            response.json().then(function (data) {
                                videoIDs[i].channelTitle = data.items[0].snippet.title;
                                videoIDs[i].country = data.items[0].snippet.country;
                                videoIDs[i].image = data.items[0].snippet.thumbnails.default.url;
                                let bannedCountry = "RU";
                                if (videoIDs[i].country === bannedCountry)
                                {
                                    console.log("get selectors ", '[href="/watch?v=' + videoIDs[i].videoId +'"]');
                                    let el = document.querySelector('[href="/watch?v=' + videoIDs[i].videoId +'"]');
                                    parentElement = el.parentElement.parentElement;
                                    console.log("parent el:\n", parentElement);
                                    let button = parentElement.querySelector("#button");
                                    const event = new MouseEvent('click');
                                    button.dispatchEvent(event);
                                }                            
                            });
                        }).catch(function(err) {
                            console.log(err);
                        });                       
                });
            }).catch(function(err) {
                console.log(err);
            });
        }
    } else {
        console.log("Error: API key not found");
    }
});
}
