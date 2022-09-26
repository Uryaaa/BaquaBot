const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const string = require("../../util/string");
module.exports = {
  name: "removebg",
  description:
    "Hapus background gambar (background polos hasilnya lebih bersih)",
  aliases: [],
  category: "Utility",
  example: "{prefix}removebg [url.com/gambar.jpg]",
  async execute(client, message, args) {
    let query = args.join(" ");
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", query);

    axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.removebg_api,
      },
      encoding: null,
    })
      .then((response) => {
        if (response.status != 200)
          return message.reply("Error:", response.status);
        let filename = string.RandomFileName(5);
        fs.writeFileSync(`./public/${filename}.png`, response.data);
        message.reply({
          type:"image",
          originalContentUrl: `https://baquabot.herokuapp.com/img/${filename}.png`,
          previewImageUrl: `https://baquabot.herokuapp.com/img/${filename}.png`,
        });
      console.log(`https://baquabot.herokuapp.com/img/${filename}.png`)
      })

      .catch((error) => {
        return message.reply("Request failed:", error);
      });
  },
};
