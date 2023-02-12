const {spawn} = require('child_process');

// let link = "https://youtu.be/Sdq4T3iRV80";

let query = "Slow motion angreza";
const pyt = spawn('python',["./youtube_search.py",query]);
    pyt.stdout.on('data',(data)=>{
        console.log(data.toString());
    });

