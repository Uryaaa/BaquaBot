const axios = require("axios");

module.exports = {
  name: "happy",
  description: "Send happy gif",
  aliases: [],
  category: "Neko",
  example: "{prefix}happy",
  async execute(client, message, args) {
    await axios
      .get("https://api.waifu.pics/sfw/happy")
      .then((res) => {
        console.log(res);
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
