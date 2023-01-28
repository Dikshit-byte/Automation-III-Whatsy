const venom = require("venom-bot");

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
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } else if (message.body === "A:" || message.body === "a:") {
      client
        .sendVoice(message.from, "./song.mp3")
        .then((result) => {
          console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } else if (message.body === "I:" || message.body === "i:") {
      client
        .sendImage(message.from, "./diku.png", "diku", "My Photo")
        .then((result) => {
          console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } else if (message.body === "F:" || message.body === "f:") {
      client
        .sendFile(message.from, "./CV.pdf", "CV", "See my file in pdf")
        .then((result) => {
          console.log("Result: ", result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    }
  });
}

