const request = require("request-promise-native");
const fetch = require("node-fetch");
const canvacord = require("canvacord");
const fs = require("fs");

module.exports = {
  name: "sus",
  category: "Fun",
  description: "RED SUS",
  aliases: ["impostor", "amogus"],
  example: "{prefix}sus [text]",
  async execute(client, message, args) {
    try {
      let text = args.slice(0).join(" ");
      if (!text)
        return message.reply({
          type: "text",
          text: "Input tidak terdeteksi,\n\n Usage: !sus [text]",
        });
      if (text.startsWith("@")) text = text.replace(/@/g, "");
      if (text.length > 20)
        return message.reply({
          type: "text",
          text: "Seingat gw nickname among us ga lebih dari 12",
        });
      const trufal = [true, false];
      let bulian = trufal[Math.floor(Math.random() * trufal.length)];
      const color = [
        "red",
        "yellow",
        "cyan",
        "lime",
        "pink",
        "purple",
        "darkgreen",
        "blue",
        "orange",
        "black",
        "white",
        "brown",
      ];
      let options = {
        url: "https://vacefron.nl/api/ejected",
        qs: {
          name: text,
          imposter: bulian,
          crewmate: color[Math.floor(Math.random() * color.length)],
        },
        encoding: null,
      };
      let response = await request(options).then((buffer) => {
        canvacord.write(buffer, `./public/${args}.png`);
        message.reply({
          type: "image",
          originalContentUrl: `https://tamaline.tama0612.repl.co/img/${args}.png`,
          previewImageUrl: `https://tamaline.tama0612.repl.co/img/${args}.png`,
        });
      });

      console.log("sended");
    } catch (error) {
      message.reply({
        type: "text",
        text: "Telah terjadi error " + error,
      });
    }
  },
};
