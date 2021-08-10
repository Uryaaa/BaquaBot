const moment = require("moment");
const fs = require("fs");
const path = require("path");
const Enmap = require("enmap");
const express = require("express");
const app = express();
const server = require("https").createServer(app);
const line = require("linebot");
let client = line({
  channelId: process.env.id,
  channelSecret: process.env.channel,
  channelAccessToken: process.env.secret,
});
const axios = require("axios");
client.commands = new Enmap();

fs.readdirSync("./commands").forEach((dirs) => {
  const commands = fs
    .readdirSync(`./commands/${dirs}`)
    .filter((files) => files.endsWith(".js"));

  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    console.log(`Loading command ${file}`);
    client.commands.set(command.name.toLowerCase(), command);
  }
});

const events = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of events) {
  console.log(`memuat event ${file}`);
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
}

client.on("message", (event) => {
  if (event.source.type !== "user") return;
  if (event.message.type !== "text" || event.type !== "message") return;
  if (event.source.userId === process.env.dev_id) return;

  const args = event.message.text.slice("").trim();
  const kalimat = args.toLowerCase();

  axios
    .get(
      `https://api.affiliateplus.xyz/api/chatbot?message=${kalimat}&botname=BaquaBot&ownername=Tama-chan&user=1`
    )
    .then((res) => {
      event.reply(res.data.message);
    })
    .catch((err) => {
      console.log(err);
      event.reply("Something went wrong!\n\n" + err);
    });
});

app.use("/img", express.static(path.join(__dirname, "public")));
const linebotParser = client.parser();

app.post("/callback", linebotParser);
app.listen(3000);
console.log("bot ready");
app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Tama server for replit ping");
});
