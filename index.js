const { apiKey, getVideo , getChannel, searchVideo} = require("./src/core.js")

const main = {
    /**
     * @param {string} key The YouTube Data API v3 key to use
     */
    apiKey,

   /** 
   * Get a video by URL.
   * You need Provide your API Key to use
   * @example
    ytcf.getVideo(videoURL, function(video) {
              console.log(`The video's title is ${video.title}`)
        })
   */
    getVideo,
    /**
* Get channel information by Channel URL.
* You need Provide your API Key to use.
* @example
 ytcf.getChannel(channelURL, function(channel) {
           console.log(`The channel's title is ${channel.title}`)
     })
*/
    getChannel,
    /**
* Search first 15 videos of specified query.
* You need Provide your API Key to use.
* @example
ytcf.searchVideo(query, function(response) {
       console.log(`First video's title is ${response[0].title}!`)
 })
*/
    searchVideo
    
}

module.exports = main;





