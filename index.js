const axios = require("axios")
const info = new Map();
var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

const main = {
    /**
     * @param {string} key The YouTube Data API v3 key to use
     */
    "key": "undefined",
    /**
     * @param {string} url YouTube Video URL 
     */
    "url": "undefined",
    /**
   * Get a video by URL.
   * You need Provide your API Key and Video URL
   * @example
    ytcf.get(function(video) {
              console.log(`The video's title is ${video.title}`)
        })
   */
    "get": function request(callback) {

        if (this.url == "undefined")
            return console.log("No URL Provided");

        if (this.key == "undefined")
            return console.log("API Key is Invalid");
        
        
        var _id = this.url.match(regExp);

        if (_id && _id[7].length == 11) {

            var request_url = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet,statistics,contentDetails,status&id=${_id[7]}&key=${this.key}`;
            
          
            axios.get(request_url).then(response => {
                let promise = new Promise(function (resolve, reject) {
                    //Video Title
                    info.set("title", response.data.items[0].snippet.title)
                    //Video's Author
                    info.set("channel", response.data.items[0].snippet.channelTitle)
                    //Video Description
                    info.set("description", response.data.items[0].snippet.description)
                    //Video Duration
                    info.set("duration", resolveDuration(response.data.items[0].contentDetails.duration))
                    //Video's View Count
                    info.set("views", response.data.items[0].statistics.viewCount)
                    //Video's Likes
                    info.set("likes", response.data.items[0].statistics.likeCount)
                     //Video's Comment Count
                    info.set("comments", response.data.items[0].statistics.commentCount)

                    resolve(info)

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
module.exports = main;
  



