const {spawn} = require('child_process');

let link = "https://youtu.be/Sdq4T3iRV80";

const pyt = spawn('python',["./youtube_link.py",link]);
    pyt.stdout.on('data',(data)=>{
        console.log(data.toString());
    });

