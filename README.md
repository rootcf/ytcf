# ytcf
Very simple way to use YouTube Data API V3,

It's not finished yet all. But you can use it.

# Usage
```js
const ytcf = require("ytcf")

ytcf.key = "YOUR API KEY"
ytcf.url = "YouTube Video URL"
ytcf.get(function(video){
    console.log(`The video's title is ${video.title}`)
})
```
