const axios = require("axios");
module.exports = {
  name: "image",
  description: "Cari gambar di google",
  aliases: ["gi", "gambar", "pic"],
  category: "Utility",
  example: "{prefix}image <query>",
  async execute(client, message, args) {
    let query = args.join("+");
    let page = Math.floor(Math.random() * 2);
    axios
      .get(
        `https://serpapi.com/search?q=${query}&tbm=isch&ijn=${page}&engine=google&apikey=${process.env.serp}`
      )
      .then((res) => {
        //console.log(res.data.search[0])
        images = res.data.images_results;
        let result = images[Math.floor(Math.random() * images.length)];

        message.reply({
          type: "image",
          originalContentUrl: result.original,
          previewImageUrl: result.original,
        });
      })
      .catch((e) => {
        message.reply("Telah terjadi error\n\n" + e);
      });
  },
};
