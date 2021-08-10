const axios = require("axios");

module.exports = {
  name: "pout",
  description: "Send pouting gif",
  aliases: [],
  category: "Neko",
  example: "{prefix}pout",
  async execute(client, message, args) {
    await axios
      .get("https://rra.ram.moe/i/r?type=pout")
      .then((res) => {
        message.reply({
          type: "image",
          originalContentUrl: `https://cdn.ram.moe/${res.data.path.replace(
            "/i/",
            ""
          )}`,
          previewImageUrl: `https://cdn.ram.moe/${res.data.path.replace(
            "/i/",
            ""
          )}`,
        });
      })
      .catch((err) => {
        message.reply("Telah terjadi error\n\n" + err);
      });
  },
};
