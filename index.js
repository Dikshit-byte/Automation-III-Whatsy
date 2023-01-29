const venom = require("venom-bot");
const dotenv = require("dotenv");
const {Configuration,OpenAIApi} = require("openai");
const wget = require("node-wget");
// const PythonShell = require('python-shell').PythonShell;
const exec = require('child_process').exec;
const download = require('image-downloader');

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
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  return chatResponse.data.choices[0].text;
}

function dlImg(url, filepath) {
  options = {
    url: url,
    dest: filepath,         // will be saved to /path/to/dest/photo
    extractFilename: true,
  };
   download.image(options)
  .then(({ filename }) => {
    console.log('Saved to', filename)}).catch((err) => console.error(err));
}

async function searchImage(topic){
  const imgResponse = await openai.createImage({
    prompt: topic,
    n: 1,
    size: "1024x1024",
  });
  image_url = imgResponse.data.data[0].url;
  let result = dlImg(image_url,currentPath);
  console.log(result);
  // return result;
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

venom.create({
    session: "session-name",
    multidevice: true,
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async(message) => {
    console.log(message.body);
    const cutPiece = message.body.split(": ");
    const tag = cutPiece[0]+": ";
    const text = cutPiece[1];
    if (message.body === "Hi" && message.isGroupMsg === false) {
      // await client.sendMessage(msg.from, "Hey there! I'm a bot and my boss will be available after 11 pm tonight. So keep ur messages to urself until 11😁");
      ` 
      1. Chat:  Chit chat with ai\n\n\t\tFor example:\nc: What's your name?\nC: what's your name?\n
      2. Codex:  Get a solution of any programming question\n\n\t\tFor example:\nc: Write a code for linear search in c++\nC: Write a code for linear search in c++\n
      `
      client
        .sendText(message.from, "Elliot")
        .then((result) => {
          // console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } 
    
    switch(tag){

      //& for audio files
      case "A: "||"a: ":
        client
        .sendVoice(message.from, "./song.mp3")
        .then((result) => {
          // console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
        break;
      

      // ! for images
      case "I: "|| "i: ":
        let img = await searchImage(text);
        client
        // .sendImage (message.from, img, text)
        .sendText(message.from, "Image")
        .then((result) => {
          // console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });

        break;

      //* for documents
      case "F: "||"f: ":
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
      case "Q: "||"q: ":
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

