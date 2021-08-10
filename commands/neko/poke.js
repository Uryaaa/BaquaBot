const axios = require("axios");
module.exports = {
  name: "poke",
  description: "Send poke gif",
  aliases: [],
  category: "Neko",
  example: "{prefix}poke",
  async execute(client, message, args) {
    axios
      .get("https://nekos.life/api/v2/img/poke")
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
