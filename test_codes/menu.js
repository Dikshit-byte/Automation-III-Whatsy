// client.onMessage(async (message) => {
//     log(message.body);
//     const cutPiece = message.body.split(": ");
//     const tag = cutPiece[0] + ": ";
//     const text = cutPiece[1];
//     if (message.body === "Hi" && message.isGroupMsg === false) {
//       `
//       *Welcome to rootbot...*\n
//       \nThere is some option which are quite handy and can help you in your day to day life...\n
//       *1*. *NanoGPT* --> Useful for queries, translation, code & much more.\n
//       *2*. *DiffusionAI* --> Useful for text to image conversion \n
//       *3*. *SpotDL* --> Useful for downloading spotify song directly from your whatsapp prompt\n
//       *4*. *YoutubeDL* --> Useful for downloading songs from youtube\n
//       *5*. *BooksQuest* --> Library for fetching some useful books\n

//       To know more about features, how to use them & limitation -> send model name like *NanoGPT* (Please keep the case of letters as it is)\n
//       `;
//       client
//         .sendText(message.from, "Hey bruh!!")
//         .then((result) => {
//           log("Done 👍\n");
//         })
//         .catch((erro) => {
//           error("Error when sending: ", erro);
//         });
//     }

`
    *NanoGPT* (help) -\n
    To use *NanoGPT*, use (Q: or q: ) followed by your query\n
    *Example* -> Q: Explain me theory of relativity \n

    *[FEATURES]*: You can even ask your query in any language, e.g. ->  q: geeta ka updesh batao \n
    *[LIMITATION]*: Getting response could take time depend on the answer length. So keep patience.\n
`
`
    *DiffusionAI* (help) -\n
    To use *DiffusionAI*, use (I: or i: ) followed by your query\n
    *Example* --> I: A digital illustration of a steampunk library with clockwork machines, 4k, detailed, trending in artstation, fantasy vivid colors
    *[FEATURES]*: It will give you image in response \n
    *[LIMITATION]*: Getting response could take time depend as on my master mobile data speed and give better output on deep details in your prompt
`

`
    *SpotDL(help)* -\n
    To use *SpotDL*, use (S: or s: )followed by your link\n
    *Example* --> S: https://open.spotify.com/track/6Fe0bY8vDxBnN7rDgu3ACE?si=29f3f01270d7488a\n
    *[FEATURES]*: Can download spotify song directly in whatsapp\n
    *[LIMITATION]*: Take max. of 30 sec to revert back the response and doesn't work on playlist. [Playlist download option will available soon].
`

`
    *YoutubeDL(help)* -\n
    To use *YoutubeDL*, use (Y1: or y1: )followed by your link or (Y2: or y2:) followed by song name/lyrics\n
    *Example* : \nY1: https://youtu.be/G7KNmW9a75Y\nY2: flowers song trending 
    *[FEATURES]*: Can download youtube song audio directly in whatsapp\n
    *[LIMITATION]*: Take max. of 15sec to revert back the response and work only on songs, not on playlist or videos. [This features will available soon].
`

`
    *BooksQuest <help>* - \n
    To use *BooksQuest*, use (B: or b: )followed by the book code by looking at below photo\n
`
`
    If you want Treasure island book then look at the front code and send it.
    *Example* : B: F_5\n
`

