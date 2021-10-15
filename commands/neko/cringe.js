const axios = require("axios");

module.exports = {
  name: "cringe",
  description: "Send cringe gif",
  aliases: [],
  category: "Neko",
  example: "{prefix}cringe",
  async execute(client, message, args) {
    await axios
      .get("https://api.waifu.pics/sfw/cringe")
      .then((res) => {
        console.log(res)
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