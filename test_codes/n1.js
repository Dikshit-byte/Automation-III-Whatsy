const { spawn } = require("child_process");
const youtube = require("youtube-metadata-from-url");
const search = require("youtube-search");

var opts = {
  maxResults: 5,
  key: process.env.YOUTUBE_API_KEY,
};

let title = undefined;
let query = "mockingbird lyrics video";

async function youtube_link(link, title) {
  const pyt = spawn("python", ["./youtube_link.py", link, title]);
  pyt.stdout.on("data", (data) => {
    console.log(data.toString());
  });
}
search(query, opts, function (err, results) {
  if (err) return console.log(err);
  link = results[0].link;
  title = results[0].title;
  console.log(title, " -> ", link);
  youtube_link(link, title);
});
