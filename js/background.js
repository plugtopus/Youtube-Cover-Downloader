chrome.browserAction.onClicked.addListener(function(activeTab) {
    var currentUrl = null;
    var youTubeId = null;

    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
        currentUrl = tabs[0].url;

        if (currentUrl.indexOf("www.youtube.com") == -1) {
            alert('Only works for youtube videos!');
        } else if (currentUrl.indexOf("www.youtube.com/watch") == -1) {
            alert('A youtube video must be playing on the current tab');
        } else {
            youTubeId = currentUrl.split(/=|&/)[1];
            var newURL = "https://img.youtube.com/vi/" + youTubeId + "/maxresdefault.jpg";

            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var newURL = "https://img.youtube.com/vi/" + youTubeId + "/maxresdefault.jpg";
                    chrome['downloads'].download({
                        url: newURL,
                        filename: youTubeId + ".jpg",
                        saveAs: false
                    }, function(res_id) {
                        if (typeof res_id === "undefined")
                        {
                            alert('Failed to download image');
                        } else {

                        }
                    });
                } else if (request.readyState == 4 && request.status == 404) {
                    var newURL = "https://img.youtube.com/vi/" + youTubeId + "/hqdefault.jpg";
                    chrome['downloads'].download({
                        url: newURL,
                        filename: youTubeId + ".jpg",
                        saveAs: false
                    }, function(res_id) {
                        if (typeof res_id === "undefined")
                        {
                            alert('Failed to download image');
                        } else {

                        }
                    });
                }
            }

            request.open("GET", newURL);
            request.send(null);


        }
    });
});