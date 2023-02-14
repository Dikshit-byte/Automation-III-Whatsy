const venom = require("venom-bot");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const download = require("image-downloader");
const { spawn } = require("child_process");
const fetch = require("isomorphic-unfetch");
const { getDetails } = require("spotify-url-info")(fetch);
const youtube = require("youtube-metadata-from-url");
const search = require("youtube-search");
const yt = require("yt-converter");


// For future if there's a need for sending base64image
// const urlToBase64 = require('@aistiak/url-to-base64'); 
dotenv.config();

var currentPath = process.cwd();

// OpenAI model Api
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const configuration1 = new Configuration({
  apiKey: process.env.OPENAI_API_KEY1,
});
const openai = new OpenAIApi(configuration1);
const openai1 = new OpenAIApi(configuration1);

var opts = {
  maxResults: 2,
  key: process.env.YOUTUBE_API_KEY,
};

//& for normal searches or find the answer of any general query
async function searchNotes(topic) {
  const chatResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: topic,
    temperature: 0.3,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  return chatResponse.data.choices[0].text;
}

async function searchImage(prompt) {
  const imgResponse = await openai1.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  image_url = imgResponse.data.data[0].url;
  console.log(image_url);
  return image_url;
}

// ^ Minify the object
const books={B_1:"./books/Biography/Ikigai _ the Japanese secret to a long and happy life",B_2:"./books/Biography/Napoleon_ A Biography",B_3:"./books/Biography/Rich Dad Poor Dad",B_4:"./books/Biography/VIVEKANAND BIOGRAPHY",B_5:"./books/Biography/Wings of fire",E_1:"./books/Erotic/Dark-Desire",E_2:"./books/Erotic/rachel-g-ultimate-pleasure",E_3:"./books/Erotic/The-Roommate-by-Rosie-Danan",E_4:"./books/Erotic/You-had-me-at-hola",F_1:"./books/Fantasy/alices-adventures-in-wonderland",F_2:"./books/Fantasy/The-Adventures-of-Sherlock-Holmes",F_3:"./books/Fantasy/The-Canterville-Ghost",F_4:"./books/Fantasy/The-Ghost-Pirates",F_5:"./books/Fantasy/Treasure-Island",H_1:"./books/History/A HISTORY OF INDIA",H_2:"./books/History/A-History-of-the-Maratha-People",H_3:"./books/History/a-history-of-the-world1",N_1:"./books/Novel/Half Girlfriend by Chetan Bhagat",N_2:"./books/Novel/Healing-Her-Heart",N_3:"./books/Novel/One Indian Girl by Chetan Bhagat",N_4:"./books/Novel/The-Almost-Perfect-Murder",S_1:"./books/Spiritual/Bhagavad-Gita-Hindi",S_2:"./books/Spiritual/Chanakya Neeti",T_1:"./books/Travel/Around-the-World-in-80-Days"};


venom
  .create({
    session: "session-name",
    multidevice: true,
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    console.log(message.body);
    const cutPiece = message.body.split(": ");
    const tag = cutPiece[0] + ": ";
    const text = cutPiece[1];
    if (message.body === "Hi" && message.isGroupMsg === false) {
      ` 
      1. Chat:  Chit chat with ai\n\n\t\tFor example:\nc: What's your name?\nC: what's your name?\n
      2. Codex:  Get a solution of any programming question\n\n\t\tFor example:\nc: Write a code for linear search in c++\nC: Write a code for linear search in c++\n
      `;
      client
        .sendText(message.from, "Hey bruh!!")
        .then((result) => {
          console.log("Done 👍\n");
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    }

    switch (tag) {
      // ~ for GPT-2.0
      case "Q: ":
      case "q: ":
        let result = await searchNotes(text);
        client
          .sendText(message.from, result)
          .then((result) => {
            console.log("Done 👍\n");
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
        break;


      //& for audio files
      case "S: ":
      case "s: ":
        let name = undefined;
        getDetails(text)
          .then((data) => {
            let name = `${data.preview.artist} - ${data.preview.title}`;
            return name;
          })
          .then((data) => {
            spot_track_dl(data);
          });
        function spot_track_dl(name) {
          const pyt = spawn("python", [
            "./dl/spot_tracks.py",
            text,
            name,
          ]);
          setTimeout(music_s, 30000);
          pyt.stdout.on("data", (data) => {
            console.log(data.toString());
          });
        }
        function music_s() {
          getDetails(text)
            .then((data) => {
              let name = `${data.preview.artist} - ${data.preview.title}`;
              console.log(name);
              return name;
            })
            .then((data) => {
               client
                .sendVoice(message.from, `./music/${data}.mp3`)
                .then((result) => {
                  console.log("Done 👍\n");
                })
                .catch((erro) => {
                  console.error("Error when sending: ", erro);
                });
            });
        }
        break;


      // ~ for youtube_audio
      case "Y1: ":
      case "y1: ":
        function youtube_link(link, title_slice) {
          console.log("Started Downloading... -> ", title_slice);
          try {
            yt.convertAudio({
              url: link,
              itag: 140,
              directoryDownload: "./ytMusic/",
              title: title_slice,
            });
          } catch (err) {
            console.error(err);
          }
        }
        async function searching(link) {
          await youtube.metadata(link).then(
            (data) => {
              title = data.title;
              let title_slice = title.slice(1, 6);
              youtube_link(text, title_slice);
              setTimeout(music_y, 15000);
            },
            function (err) {
              console.log(err);
            }
          );
        }
        async function music_y() {
          console.log("Sending...");
          await youtube.metadata(text).then(
            (data) => {
              title = data.title;
              let title_slice = title.slice(1, 6);
              client
                .sendVoice(message.from, `./ytMusic/${title_slice}.mp3`)
                .then((result) => {
                  console.log("Done 👍\n");
                })
                .catch((erro) => {
                  console.error("Error when sending: ", erro);
                });
            },
            (err) => {
              console.log(err);
            }
          );
        }
        searching(text);
        break;


      // ^for youtube search link
      case "Y2: ":
      case "y2: ":
        function youtube_link1(link, title_slice) {
          console.log("Started Downloading... -> ", title_slice);
          try {
            yt.convertAudio({
              url: link,
              itag: 140,
              directoryDownload: "./ytMusic/",
              title: title_slice,
            });
          } catch (err) {
            console.error(err);
          }
        }
        async function searching1() {
          await search(text, opts, function (err, results) {
            if (err) console.log(err);
            let link = results[0].link;
            let title_name = results[0].title;
            let title_slice = title_name.slice(0, 5);
            console.log(title_slice, " -> ", link);
            youtube_link1(link, title_slice);
            setTimeout(music_y1, 15000);
          });
        }
        async function music_y1() {
          await search(text, opts, function (err, results) {
            if (err) console.log(err);
            let title_name = results[0].title;
            let title_slice = title_name.slice(0, 5);
            console.log("Sending...");
            client
              .sendVoice(message.from, `./ytMusic/${title_slice}.mp3`)
              .then((result) => {
                console.log("Done 👍\n");
              })
              .catch((erro) => {
                console.error("Error when sending: ", erro);
              });
          });
        }
        searching1();
        break;


      // ! for images
      case "I: ":
      case "i: ":
        let img = await searchImage(text);
        async function dlImg(url, filepath) {
          options = {
            url: url,
            dest: filepath + "\\img",
            extractFilename: true,
          };
          await download
            .image(options)
            .then(({ filename }) => {
              console.log(filename);
              client.sendImage(message.from, filename, text)
              .then((result)=>{
                console.log("Done 👍\n");
              })
              .catch((erro) => {
                console.error("Error when sending: ", erro);
              });
            })
            .catch((err) => console.error(err));
        }
        dlImg(img, currentPath);
        break;

        
      //* for books pdf
      case "B: ":
      case "b: ":
        let book_name = books[text].split("/");
        console.log(book_name[3]);
        client
          .sendFile(message.from, `${books[text]}.pdf`, `${books[text]}`)
          .then((result) => {
            console.log("Done 👍\n");
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
        break;
    }
  });
}
