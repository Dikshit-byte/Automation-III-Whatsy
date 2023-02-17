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

let log = console.log;
let error = console.error;

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
  log(image_url);
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
    log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    log(message.body);
    const cutPiece = message.body.split(": ");
    const tag = cutPiece[0] + ": ";
    const text = cutPiece[1];


    // Switch cases for menu and help
    switch (message.body) {
      case "Hi":
        client
          .sendText(message.from, `*Hey* bruh!! I'm *Rootbot* - a advanced AI bot. I was made by my master *'Doma'* or you know him by *Dikshit*`)
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;

      case "Menu":
      case "menu":
        client
          .sendText(
            message.from,
            ` 
              *Welcome to rootbot...*\n
              \nThere is some option which are quite handy and can help you in your day to day life...\n
              *1*. *NanoGPT* --> Useful for queries, translation, code & much more.\n
              *2*. *DiffusionAI* --> Useful for text to image conversion \n
              *3*. *SpotDL* --> Useful for downloading spotify song directly from your whatsapp prompt\n
              *4*. *YoutubeDL* --> Useful for downloading songs from youtube\n
              *5*. *BooksQuest* --> Library for fetching some useful books\n
              *~[NOTE]~* -> To know more about features, limitation & how to use them -> send model name like *NanoGPT* (Please keep the case of letters as it is)\n
              `
          )
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;

      case "NanoGPT":
        client
          .sendText(
            message.from,
            `
          *NanoGPT <help>* -\n
          To use *NanoGPT*, use (Q: or q: ) followed by your query\n
          *Example* --> Q: Explain me theory of relativity \n
          *[FEATURES]*: You can even ask your query in any language, e.g. ->  q: geeta ka updesh batao \n
          *[LIMITATION]*: Getting response could take time depend on the answer length. So keep patience.\n
      `
          )
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;

      case "DiffusionAI":
        client
          .sendText(
            message.from,
            `
        *DiffusionAI <help>* -\n
        To use *DiffusionAI*, use (I: or i: ) followed by your query\n
        *Example* --> I: A digital illustration of a steampunk library with clockwork machines, 4k, detailed, trending in artstation, fantasy vivid colors
        *[FEATURES]*: It will give you image in response \n
        *[LIMITATION]*: Getting response could take time depend as on my master mobile data speed and give better output on deep details in your prompt
    `
          )
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;

      case "SpotDL":
        client
          .sendText(
            message.from,
            `
        *SpotDL <help>* -\n
        To use *SpotDL*, use (S: or s: )followed by your link\n
        *Example* --> S: https://open.spotify.com/track/6Fe0bY8vDxBnN7rDgu3ACE?si=29f3f01270d7488a\n
        *[FEATURES]*: Can download spotify song directly in whatsapp\n
        *[LIMITATION]*: Take max. of 30 sec to revert back the response and doesn't work on playlist. [Playlist download option will available soon].
    `
          )
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;

      case "YoutubeDL":
        client
          .sendText(
            message.from,
            `
          *YoutubeDL <help>* -\n
          To use *YoutubeDL*, use (Y1: or y1: )followed by your link or (Y2: or y2:) followed by song name/lyrics\n
          *Example* --> \nY1: https://youtu.be/G7KNmW9a75Y\nY2: flowers song trending 
          *[FEATURES]*: Can download youtube song audio directly in whatsapp\n
          *[LIMITATION]*: Take max. of 15sec to revert back the response and work only on songs, not on playlist or videos. [This features will available soon].
      `
          )
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;

      case "BooksQuest":
        await client
          .sendText(
            message.from,
            `
              *BooksQuest <help>* - \n
              To use *BooksQuest*, use (B: or b: )followed by the book code by looking at below photo\n
          `
          )
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        await client
          .sendImage(message.from, "./books/shelf_index.png", "Books Code")
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        await client
          .sendText(
            message.from,
            `
          If you want Treasure island book then look at the front code and send it.
          *Example* --> B: F_5\n
        `
          )
          .then((result) => {
            // log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;

      default:
        break;
    }

    // Switch cases for features
    switch (tag) {
      // ~ for GPT-2.0
      case "Q: ":
      case "q: ":
        let result = await searchNotes(text);
        log("Sending...➡️\n");
        client
          .sendText(message.from, result)
          .then((result) => {
            log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
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
          const pyt = spawn("python", ["./dl/spot_tracks.py", text, name]);
          setTimeout(music_s, 30000);
          pyt.stdout.on("data", (data) => {
            log(data.toString());
          });
        }
        function music_s() {
          getDetails(text)
            .then((data) => {
              let name = `${data.preview.artist} - ${data.preview.title}`;
              log(name);
              return name;
            })
            .then((data) => {
              log("Sending...➡️\n");
              client
                .sendVoice(message.from, `./music/${data}.mp3`)
                .then((result) => {
                  log("Done 👍\n");
                })
                .catch((erro) => {
                  error("Error when sending: ", erro);
                });
            });
        }
        break;

      // ~ for youtube_audio
      case "Y1: ":
      case "y1: ":
        function youtube_link(link, title_slice) {
          log("Started Downloading... -> ", title_slice);
          try {
            yt.convertAudio({
              url: link,
              itag: 140,
              directoryDownload: "./ytMusic/",
              title: title_slice,
            });
          } catch (err) {
            error(err);
          }
        }
        async function searching(link) {
          await youtube.metadata(link).then(
            (data) => {
              title = data.title;
              let title_slice = title.slice(1, 6);
              youtube_link(text, title_slice);
              setTimeout(music_y, 30000);
            },
            function (err) {
              log(err);
            }
          );
        }
        async function music_y() {
          log("Sending...➡️\n");
          await youtube.metadata(text).then(
            (data) => {
              title = data.title;
              let title_slice = title.slice(1, 6);
              client
                .sendVoice(message.from, `./ytMusic/${title_slice}.mp3`)
                .then((result) => {
                  log("Done 👍\n");
                })
                .catch((erro) => {
                  error("Error when sending: ", erro);
                });
            },
            (err) => {
              log(err);
            }
          );
        }
        searching(text);
        break;

      // ^for youtube search link
      case "Y2: ":
      case "y2: ":
        function youtube_link1(link, title_slice) {
          log("Started Downloading... -> ", title_slice);
          try {
            yt.convertAudio({
              url: link,
              itag: 140,
              directoryDownload: "./ytMusic/",
              title: title_slice,
            });
          } catch (err) {
            error(err);
          }
        }
        async function searching1() {
          await search(text, opts, function (err, results) {
            if (err) log(err);
            let link = results[0].link;
            let title_name = results[0].title;
            let title_slice = title_name.slice(0, 5);
            log(title_slice, " -> ", link);
            youtube_link1(link, title_slice);
            setTimeout(music_y1, 30000);
          });
        }
        async function music_y1() {
          await search(text, opts, function (err, results) {
            if (err) log(err);
            let title_name = results[0].title;
            let title_slice = title_name.slice(0, 5);
            log("Sending...➡️\n");
            client
              .sendVoice(message.from, `./ytMusic/${title_slice}.mp3`)
              .then((result) => {
                log("Done 👍\n");
              })
              .catch((erro) => {
                error("Error when sending: ", erro);
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
              log(filename);
              client
                .sendImage(message.from, filename, text)
                .then((result) => {
                  log("Done 👍\n");
                })
                .catch((erro) => {
                  error("Error when sending: ", erro);
                });
            })
            .catch((err) => error(err));
        }
        dlImg(img, currentPath);
        break;

      //* for books pdf
      case "B: ":
      case "b: ":
        let book_name = books[text].split("/");
        log(book_name[3]);
        client
          .sendFile(message.from, `${books[text]}.pdf`, `${books[text]}`)
          .then((result) => {
            log("Done 👍\n");
          })
          .catch((erro) => {
            error("Error when sending: ", erro);
          });
        break;
    }
  });
}
