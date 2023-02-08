const axios = require("axios");
module.exports = {
  name: "manga_id",
  description: "Cari manga/anime book di MyAnimeList pake id",
  aliases: [],
  category: "self",
  example: "{prefix}manga_id [ID]",
  async execute(client, message, args) {
    let id = args;
    if (isNaN(id))
      return message.reply('Invalid number, cari judul pake "!manga"');
    axios
      .get(`https://api.jikan.moe/v4/manga/${id}/full`)
      .then((res) => {
        let results = res.data.data;
        console.log(results.published)
        message.reply([
          {
            type: "image",
            originalContentUrl: results.images.jpg.image_url,
            previewImageUrl: results.images.jpg.image_url,
          },
          {
            type: "text",
            text: `${results.title}

Synopsis : ${results.synopsis}

Type : ${results.type}

Genres : ${results.genres.map((i) => i.name).join(", ")}

Chapters : ${results.chapters}

Volumes : ${results.volumes}

Published : ${results.published.string}

Status : ${results.status}

Score : ${results.score}

Authors : ${results.authors.map((i) => i.name).join(", ")}

Serializations : ${results.serializations.map((i) => i.name)}`,
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
