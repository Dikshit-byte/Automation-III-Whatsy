const venom = require("venom-bot");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const {spawn} = require("child_process");
const download = require("image-downloader");

dotenv.config();

var currentPath = process.cwd();
// OpenAI model Api
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

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
  const imgResponse = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  image_url = imgResponse.data.data[0].url;
  console.log(image_url);
  return image_url;
}

//^ For help in code
// async function codex(text) {
//   const code = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: text,
//     temperature: 0.1,
//     max_tokens: 1024,
//     top_p: 1.0,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.2,
//   });
//   return code.data.choices[0].text;
// }

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
      // await client.sendMessage(msg.from, "Hey there! I'm a bot and my boss will be available after 11 pm tonight. So keep ur messages to urself until 11😁");
      ` 
      1. Chat:  Chit chat with ai\n\n\t\tFor example:\nc: What's your name?\nC: what's your name?\n
      2. Codex:  Get a solution of any programming question\n\n\t\tFor example:\nc: Write a code for linear search in c++\nC: Write a code for linear search in c++\n
      `;
      client
        .sendText(message.from, "Hey bruh!!")
        .then((result) => {
          // console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    }

    switch (tag) {
      //& for audio files
      case "M: ":
      case "m: ":
        client
          .sendVoice(message.from, "./music/song.mp3")
          .then((result) => {
            // console.log("Result: ", result);
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
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
              client.sendImage(message.from, filename, text).catch((erro) => {
                console.error("Error when sending: ", erro);
              });
            })
            .catch((err) => console.error(err));
        }
        dlImg(img, currentPath);
        break;

      //* for documents
      case "F: ":
      case "f: ":
        client
          .sendFile(message.from, "./CV.pdf", "CV", "See my file in pdf")
          .then((result) => {
            // console.log("Result: ", result);
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
        break;

      // ~ for GPT-2.0
      case "Q: ":
      case "q: ":
        let result = await searchNotes(text);
        client
          .sendText(message.from, result)
          .then((result) => {
            // console.log("Result: ", result);
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
        break;
    }
  });
}
