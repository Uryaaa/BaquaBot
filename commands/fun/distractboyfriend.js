const { URLSearchParams } = require("url");
const fetch = require("node-fetch");
module.exports = {
  name: "distract",
  description: "bikin meme distracted boyfriend",
  aliases: ["bf", "distracted"],
  category: "Fun",
  example: "{prefix}distract [text1]|[text2]|[text3]",
  async execute(client, message, args) {
    const params = new URLSearchParams();
    let [text0, text1, text2] = args.join(" ").split("|");
    if (!text1 && !text2) return message.channel.send("wrong format");
    params.append("template_id", 112126428);
    params.append("username", process.env.flipUser);
    params.append("password", process.env.flipPass);
    params.append("boxes[0][text]", text0);
    params.append("boxes[1][text]", text1);
    params.append("boxes[2][text]", text2);

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
