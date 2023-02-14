const yt = require("yt-converter");
const search = require('youtube-search');

let query = "slow motion angreza";

var opts = {
    maxResults: 5,
    key: process.env.YOUTUBE_API_KEY
  };

search(query,opts,function(err,results){
    if(err)return console.log(err);
    let link = results[0].link;
    let title_name = results[0].title;
    let title_slice = title_name.slice(0,15);
    console.log(title_slice," -> ", link);
    conversion(link,title_slice);
});
function conversion(link,title_slice){
yt.convertAudio({
    url: link,
    itag: 140,
    directoryDownload: "../testing/",
    title: title_slice
},)
}