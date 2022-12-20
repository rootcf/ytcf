const axios = require("axios")
var info = []
var _key = null;
module.exports = {
    apiKey: (key) => {
       _key = key;
    },
    getVideo:  function request(videoURL,callback) {
        info = []
        if (!videoURL)   return console.error("No URL Provided");
        if (!_key) return console.warn("API Key is Invalid");
        
        var _id = videoURL.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);

        if (_id && _id[7].length == 11) {

            var request_url = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet,statistics,contentDetails,status&id=${_id[7]}&key=${_key}`;
     
                axios.get(request_url).then(response => {
                    let promise = new Promise(function (resolve, reject) {

                        var duration = resolveDuration(response.data.items[0].contentDetails.duration)
                        info.push({
                            "title": response.data.items[0].snippet.title,
                            "channel": response.data.items[0].snippet.channelTitle,
                            "description": response.data.items[0].snippet.description,
                            "duration": duration,
                            "views": response.data.items[0].statistics.viewCount,
                            "likes": response.data.items[0].statistics.likeCount,
                            "comments": response.data.items[0].statistics.commentCount,
                            "thumbnail": response.data.items[0].snippet.thumbnails.maxres.url

                        })
                        resolve(info[0])
                    
                    });
                    promise.then(result => {
                        callback(result)

                    });

                });
            
      
        }
        else {
            console.log("The URL doesn't match with format")
        }
    },
    getChannel: function request(channelURL,callback) {
        info = []
        if (!channelURL) return console.error("No Channel URL Provided");
        if (!_key) return console.error("API Key is Invalid");

        var _id = channelURL.match(/(https?:\/\/)?(www\.)?youtu((\.be)|(be\..{2,5}))\/((user)|(channel))\/?([a-zA-Z0-9\-_]{1,})/);

        if (_id) {

            if (_id[6] == "user")
                var request_url = `https://www.googleapis.com/youtube/v3/channels?part=id%2C+snippet,contentDetails,status,statistics&forUsername=${_id[9]}&key=${_key}`;

            else if (_id[6] == "channel") 
                var request_url = `https://www.googleapis.com/youtube/v3/channels?part=id%2C+snippet,contentDetails,status,statistics&id=${_id[9]}&key=${_key}`;
            
            else 
                return;
            
                axios.get(request_url).then(response => {
                    let promise = new Promise(function (resolve, reject) {

                        info.push({
                            "title": response.data.items[0].snippet.title,
                            "description": response.data.items[0].snippet.description,
                            "createdAt": response.data.items[0].snippet.publishedAt,
                            "thumbnail": response.data.items[0].snippet.thumbnails.high.url,
                            "subscribers": response.data.items[0].statistics.subscriberCount,
                            "views": response.data.items[0].statistics.viewCount,
                            "videoCount": response.data.items[0].statistics.videoCount,
                            "country": response.data.items[0].snippet.country

                        })
                        resolve(info[0])

                    });
                    promise.then(result => {
                        callback(result)

                    });
    
                });
            
        }
        else {
            console.log("The URL doesn't match with format")
        }
    },
    searchVideo: (query, callback) => {
        info = []
        if (!query) return 
        if (!_key) return console.error("API Key is Invalid");


        if (query) {

            var request_url = `https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&q=${query}&key=${_key}&maxResults=15`;

            axios.get(request_url).then(response => {
                let promise = new Promise(function (resolve, reject) {
                          
                    response.data.items.forEach(element => {
                        if (element.id.playlistId) return;
                        if (element.id.channelId) return;
                        info.push([{
                            "id" : element.id.videoId,
                            "title": element.snippet.title,
                            "channel": element.snippet.channelTitle,
                            "isLive" : element.snippet.liveBroadcastContent,
                            "description": element.snippet.description,
                            "createdAt": element.snippet.publishedAt,
                            "thumbnail": element.snippet.thumbnails.high.url,

                        }])
                    });
                    resolve(info[0])

                });
                promise.then(result => {
                    callback(result)

                });

            });

        }
        else {
            return;
        }
    }
}

function resolveDuration(duration) {
    const time_extractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i;
    const extracted = time_extractor.exec(duration);
    if (extracted) {
        const days = parseInt(extracted[1], 10) || 0;
        const hours = parseInt(extracted[2], 10) || 0;
        const minutes = parseInt(extracted[3], 10) || 0;
        const seconds = parseInt(extracted[4], 10) || 0;
        return (days * 24 * 3600 * 1000) + (hours * 3600 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    }
    return 0;
}
