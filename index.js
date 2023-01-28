// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

venom
  .create({
    session: "session-name", //name of session
    multidevice: true, // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    } else if (message.body === "A:" || message.body === "a:") {
      client
        .sendVoice("918860439648@c.us", "./song.mp3")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    } else if (message.body === "I:" || message.body === "i:") {
      client
        .sendImage("918860439648@c.us", "./diku.png", "diku", "My Photo")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    } else if (message.body === "F:" || message.body === "f:") {
      client
        .sendFile(
          "918860439648@c.us",
          "./CV.pdf",
          "CV",
          "See my file in pdf"
        )
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
