window.onload = function() {
    //check API key  in storage
    chrome.storage.sync.get("API_key", result => {
        if (result) {
            //show API key
            console.log(result.API_key);//remove
            document.getElementById("yt-api-key").value = result.API_key;
            document.getElementById("yt-api-key").setAttribute("disabled", "disabled");
            document.getElementById("yt-api-key-submit").innerHTML ="Change";
            document.getElementById("api_status").innerHTML ="Your YouTube API key is:";
        }
    });
    //    
    const submit  = document.getElementById("yt-api-key-submit");
    submit.addEventListener('click', (event) => {
    // save or change API key
    if (submit.innerHTML == "Change") {
        document.getElementById("yt-api-key").removeAttribute("disabled");
        document.getElementById("yt-api-key-submit").innerHTML ="Save";
        document.getElementById("api_status").innerHTML ="Change Youtube API key:";
    }
    else {
        chrome.storage.sync.set({"API_key": document.getElementById("yt-api-key").value});  
        document.getElementById("yt-api-key").setAttribute("disabled", "disabled");
        document.getElementById("yt-api-key-submit").innerHTML ="Change";
    }
        
    });

    const check  = document.getElementById("yt-api-key-check");
    check.addEventListener('click', (event) => {
        
      });
}


