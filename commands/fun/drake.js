const { URLSearchParams } = require("url");
const fetch = require("node-fetch");
module.exports = {
  name: "drake",
  description: "bikin drake yes no meme",
  aliases: [],
  category: "Fun",
  example: "{prefix}drake [text1]|[text2]",
  async execute(client, message, args) {
    const params = new URLSearchParams();
    let [text0, text1] = args.join(" ").split("|");
    if (!text1) return message.channel.send("wrong format");
    params.append("template_id", 181913649);
    params.append("username", process.env.flipUser);
    params.append("password", process.env.flipPass);
    params.append("boxes[0][text]", text0);
    params.append("boxes[1][text]", text1);

    const response = await fetch(
      `https://api.imgflip.com/caption_image?${params}`
    );
    const data = await response.json();
    console.log(data.data);
    message.reply({
      type: "image",
      originalContentUrl: data.data.url,
      previewImageUrl: data.data.url,
    });
  },
};
