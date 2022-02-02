# ytcf

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/62a5f5305d504e718a26efea511b55c1)](https://app.codacy.com/gh/rootcf/ytcf?utm_source=github.com&utm_medium=referral&utm_content=rootcf/ytcf&utm_campaign=Badge_Grade_Settings)

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
