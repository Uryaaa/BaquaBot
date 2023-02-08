const fs = require("fs");
const axios = require("axios");

module.exports = {
  name: "danbooru",
  description:
    "Random image dan safe rating via danbooru, i dont want to get banned",
  aliases: [],
  category: "Anime",
  example: "{prefix}danbooru [fischl_(genshin_impact)]",
  async execute(client, message, args) {
    const rating = ["e", "u", "s", "q"];
    let rrating = rating[Math.floor(Math.random() * rating.length)];
    const tags = args.join("_");
    if (!tags) return message.reply("Input tidak terdeteksi!");

    await axios
      .get(
        `http://danbooru.donmai.us/posts.json?limit=100&tags=${encodeURI(
          `${tags}+rating:s}`
        )}`
      )
      .then((res) => {
        let random = res.data[Math.floor(Math.random() * res.data.length)];
        if (random.id === undefined || random.file_url === undefined)
          return message.reply("Couldn't fetch image, sorry try again :)");
        let imgurl = random.file_url;
        axios({ url: imgurl, responseType: "stream" }).then((img) => {
          img.data.pipe(
            fs.createWriteStream(`./public/danbooru/${random.id}.jpg`)
          );

          if (random.rating === "s") random.rating === "Safe";
          if (random.rating === "q") random.rating === "Questionable";
          if (random.rating === "e") random.rating === "Explicit";
          if (random.rating === "u") random.rating === "Unrated";

          message.reply([
            {
              type: "text",
              text: `Score: ${random.score} | Rating: ${random.rating}`,
            },
            {
              type: "image",
              originalContentUrl: `${process.env.baseurl}/img/danbooru/${random.id}.jpg`,
              previewImageUrl: `${process.env.baseurl}/img/danbooru/${random.id}.jpg`,
            },
          ]);
        });
        console.log(random.file_url);
      })
      .catch((err) => {
        message.reply("Telah terjadi error\n\n" + err);
        console.log(err);
      });
  },
};
