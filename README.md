# ytcf
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/81b65003c93d4286ad7257957ba72d5f)](https://www.codacy.com/gh/rootcf/ytcf/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rootcf/ytcf&amp;utm_campaign=Badge_Grade)

Very simple way to use YouTube Data API V3,

It's not finished yet all. But you can use it.

# Usage

**Install**
```js
npm install ytcf 
```
**Use**

__Get Video by Video URL__
```js
const ytcf = require("ytcf")

ytcf.apiKey("YOUR API KEY")
ytcf.getVideo(videoURL,function(video){
    console.log(`The video's title is ${video.title}`)
})
```

__Get Channel Information by Channel URL__
```js
const ytcf = require("ytcf")

ytcf.apiKey("YOUR API KEY")
ytcf.getChannel(channelURL,function(channel){
    console.log(`The channel's title is ${channel.title}`)
})
```
