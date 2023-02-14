const {spawn} = require('child_process');
const fetch = require("isomorphic-unfetch");
const { getDetails } = require('spotify-url-info')(fetch);

let prompt = "https://open.spotify.com/track/1zpFTApsJK8n8FO9XUeGJW?si=b97dbca2a69447b8";

let name;
getDetails(prompt)
  .then(data => {
    console.log(data);
   name = `${data.preview.artist} - ${data.preview.title}`;
   console.log(name);
   return name;
  }).then(data=>{
    spot_track_dl(data);
  });

async function spot_track_dl(name){
const pyt = await spawn('python',["./spot_tracks.py",prompt,name]);
    pyt.stdout.on('data',(data)=>{  
    console.log(data.toString());
});
}


console.log("Done");