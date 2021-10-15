const axios = require("axios");

module.exports = {
  name: "bonk",
  description: "Send bonk gif",
  aliases: [],
  category: "Neko",
  example: "{prefix}bonk",
  async execute(client, message, args) {
    await axios
      .get("https://api.waifu.pics/sfw/bonk")
      .then((res) => {
       
        message.reply({
          type: "image",
          originalContentUrl: res.data.url,
          previewImageUrl: res.data.url,
        });
      })
      .catch((err) => {
        message.reply("Telah terjadi error\n\n" + err);
      });
  },
};
