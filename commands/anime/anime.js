const axios = require("axios");
module.exports = {
  name: "anime",
  description: "Informasi anime via MAL",
  aliases: ["nime"],
  category: "Anime",
  example: "{prefix}anime [query]",
  async execute(client, message, args) {
    let searchString = args.join(" ");
    if (searchString.length === 0) return message.reply("Masukkan query!");
    axios
      .get("https://api.jikan.moe/v4/anime?q=" + searchString)
      .then((res) => {
       let b = res.data.data[0].mal_id;
      //console.log(res.data)
        axios.get("https://api.jikan.moe/v4/anime/" + b).then((a) => {
           console.log(a.data.data.aired)
          message.reply([
            {
              type: "image",
              originalContentUrl: a.data.data.images.jpg.image_url,
              previewImageUrl: a.data.data.images.jpg.image_url,
            },
            {
              type: "text",
              text: `Title : ${a.data.data.title}
                  
Synopsis : ${a.data.data.synopsis}

Type : ${a.data.data.type}

Episodes : ${a.data.data.episodes}

Status : ${a.data.data.status}

Aired : ${a.data.data.aired.string}

Studios : ${a.data.data.studios.map((i) => i.name).join(", ")}

Source : ${a.data.data.source}

Genres : ${a.data.data.genres.map((j) => j.name).join(", ")}

Duration : ${a.data.data.duration}

Rating : ${a.data.data.rating}

Score : ${a.data.data.score}

============
See more : ${a.data.data.url}`,
            },
          ]);
        });
      });
  },
};
