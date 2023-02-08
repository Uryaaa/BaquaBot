const moment = require("moment");
const fs = require("fs");
const notrigger = require("./commands/notrigger/commands");
const path = require("path");
const Enmap = require("enmap");
const express = require("express");
const app = express();
const server = require("https").createServer(app);
const line = require("@waynechang65/linebot");
require("dotenv").config();
let client = line({
  channelId: process.env.id,
  channelSecret: process.env.channel,
  channelAccessToken: process.env.secret,
});
const axios = require("axios");

client.commands = new Enmap();
//

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
//
const events = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of events) {
  console.log(`memuat event ${file}`);
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
}

app.use("/img", express.static(path.join(__dirname, "public")));
const linebotParser = client.parser();

app.post("/callback", linebotParser);

app.set("port", process.env.PORT || 3000); // Process.env.PORT change automatically the port IF 3000 port is being used.
app.listen(app.get("port"), () =>
  console.log(`Node server listening on port ${app.get("port")}!`)
);

app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Tama server for replit ping");
});
//CHAT CONSOLE
let y = process.openStdin();
y.addListener("data", (res) => {
  let x = res.toString().trim().split(/ +/g);
  client.push(process.env.consoleguild, x.join(" "));
});
notrigger(client);
//Unhandled rejection
process.on("unhandledRejection", (err) => {
  console.error(err);
});
process.on("uncaughtException", function (err) {
  console.error(err);
});

//err

client
  .on("disconnect", () => console.log("Bot is disconnecting...", "warn"))
  .on("reconnecting", () => console.log("Bot reconnecting...", "log"))
  .on("error", (e) => console.log(e, "error"))
  .on("warn", (info) => console.log(info, "warn"));
