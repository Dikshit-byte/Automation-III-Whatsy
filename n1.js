const {spawn} = require('child_process');
const youtube = require("youtube-metadata-from-url");
// let link = "https://youtu.be/q07RanslaGM";
const search = require('youtube-search');

var opts = {
    maxResults: 5,
    key: process.env.YOUTUBE_API_KEY
};

let title = undefined;
let query = "mockingbird lyrics video";

async function youtube_link(link,title){
const pyt = spawn('python',["./youtube_link.py",link,title]);
    pyt.stdout.on('data',(data)=>{
        console.log(data.toString());
    });
}
search(query,opts,function(err,results){
    if(err)return console.log(err);
    link = results[0].link;
    title = results[0].title;
    console.log(title," -> ", link);
    youtube_link(link,title);
});

// let title = undefined;
// console.log("Started Downloading...");
// youtube.metadata(link).then((data)=>{
//     console.log(data.title);
//     title = data.title;
//     youtube_link(title);
// },(err)=>{
//     console.log(err);
// })

// async function yt_search(query){
//     const videos = await yt.search(query);
//     console.log(videos);
// }
// yt_search(query);
    
