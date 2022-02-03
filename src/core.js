const axios = require("axios")
var info = []
var _key = null;
module.exports = {
    apiKey: (key) => {
       _key = key;
    },
    getVideo:  function request(videoURL,callback) {
        info = []
        if (!videoURLl)   return console.error("No URL Provided");
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

            var request_url = `https://www.googleapis.com/youtube/v3/channels?part=id%2C+snippet,contentDetails,status,statistics&id=${_id}&key=${_key}`;
 
                axios.get(request_url).then(response => {
                    let promise = new Promise(function (resolve, reject) {

                        info.push({
                            "title": response.data.items[0].snippet.title,
                            "description": response.data.items[0].snippet.description,
                            "createdAt": response.data.items[0].snippet.publishedAt,
                            "thumbnail": response.data.items[0].snippet.thumbnails.high.url,
                            "subscribers": response.data.items[0].statistics.subscriberCount,
                            "views": response.data.items[0].statistics.viewCount,
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