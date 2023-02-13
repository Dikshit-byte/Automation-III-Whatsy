const {spawn} = require('child_process');
const youtube = require("youtube-metadata-from-url");
let link = "https://youtu.be/q07RanslaGM";
const yt = require('youtube-search-without-api-key');

let query = "Slow motion angreza";
let title = undefined;
console.log("Started Downloading...");
// youtube.metadata(link).then((data)=>{
//     console.log(data.title);
//     title = data.title;
//     youtube_link(title);
// },(err)=>{
//     console.log(err);
// })

async function yt_search(query){
    const videos = await yt.search(query);
    console.log(videos);
}
yt_search(query);
    

// async function youtube_link(title){
// const pyt = spawn('python',["./youtube_link.py",link,title]);
//     pyt.stdout.on('data',(data)=>{
//         console.log(data.toString());
//     });
// }
