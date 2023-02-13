const {spawn} = require('child_process');
const youtube = require("youtube-metadata-from-url");
let link = "https://youtu.be/q07RanslaGM";

// let query = "Slow motion angreza";
let title = undefined;
console.log("Started Downloading...");
youtube.metadata(link).then((data)=>{
    console.log(data.title);
    title = data.title;
    youtube_link(title);
},(err)=>{
    console.log(err);
})
async function youtube_link(title){
const pyt = spawn('python',["./youtube_link.py",link,title]);
    pyt.stdout.on('data',(data)=>{
        console.log(data.toString());
    });
}
