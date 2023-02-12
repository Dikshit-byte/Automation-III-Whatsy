
let prompt = "https://open.spotify.com/track/2RttW7RAu5nOAfq6YFvApB?si=c88a25e2b3754556";

let name;
getDetails(prompt)
  .then(data => {
   name = `${data.preview.artist} - ${data.preview.title}`;
   console.log(name);
   return name;
  }).then(data=>console.log(data + "Leaving "));


let filter_prompt = prompt.split("/");

console.log(filter_prompt[3]);


async function spot_track_dl(){
const pyt = await spawn('python',["./spot_tracks.py",prompt]);
    pyt.stdout.on('data',(data)=>{
    console.log(data.toString());
});
}
spot_track_dl();

// switch(filter_prompt[3]){
//     case 'playlist':
//         console.log("\nEntering Playlist");
//         const pyt = spawn('python',["./spot_playlist.py",prompt]);
//         pyt.stdout.on('data',(data)=>{
//         console.log("Done",data.toString())
// });
//     break;

//     case 'track':
//         console.log("\nEntering Tracks")
//         const pyt1 = spawn('python',["./spot_tracks.py",prompt]);
//         pyt1.stdout.on('data',(data)=>{
//         console.log("Done",data.toString())
//     });
//         break;
    
//         default:
//             console.log("Sorry, But pass the link or correct link");
//             break;
// }
console.log("Done")
