const axios = require('axios')
module.exports = {
  name: "anime_id",
  description: "Cari anime di MyAnimeList pake id",
  aliases: [],
  category: "self",
  example: "{prefix}mal_id [ID]",
  async execute(client, message, args) {
    let id = args;
    if(isNaN(id)) return message.reply('Invalid number, cari judul pake "!anime"')
    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
    .then((res) => {
        let results = res.data.data

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

Episodes : ${results.episodes}

Duration : ${results.duration}

Aired : ${results.aired.string}

Premiered : ${results.season}

Score : ${results.score}

Producers : ${results.producers.map((i) => i.name ).join(", ")}

Studios : ${results.studios.map((i) => i.name)}`,
          },
        ]);
    })
.catch((e)=>{
    console.log(e)
})
  },
};
