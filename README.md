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
```js
const ytcf = require("ytcf")

ytcf.key = "YOUR API KEY"
ytcf.url = "YouTube Video URL"
ytcf.get(function(video){
    console.log(`The video's title is ${video.title}`)
})
```
