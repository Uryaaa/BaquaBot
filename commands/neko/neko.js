const axios = require("axios");
module.exports = {
  name: "neko",
  description: "Send neko gif/jpg",
  aliases: [],
  category: "Neko",
  example: "{prefix}neko",
  async execute(client, message, args) {
    axios
      .get("https://nekos.life/api/v2/img/neko")
      .then(async (res) => {
        let image = await res.data.url;
        message.reply({
          type: "image",
          originalContentUrl: image,
          previewImageUrl: image,
        });
      })
      .catch((error) => {
        message.reply("Telah terjadi error " + error);
        console.log(error);
      });
  },
};
