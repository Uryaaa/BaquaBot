const axios = require("axios");

module.exports = {
  name: "character",
  description: "Animanga character via MAL",
  aliases: ["anichar", "char"],
  category: "Anime",
  example: "{prefix}character [query]",
  async execute(client, message, args) {
    let searchString = args.join("_");
    if (searchString.length === 0) return message.reply("Masukkan query!");
    axios
      .get("https://api.jikan.moe/v3/search/character?q=" + searchString)
      .then((res) => {
        let b = res.data.results[0].mal_id;
        axios
          .get("https://api.jikan.moe/v3/character/" + b)
          .then((res) => {
            //console.log(res.data);
            let char = res.data;
            message.reply([
              {
                type: "image",
                originalContentUrl: char.image_url,
                previewImageUrl: char.image_url,
              },
              {
                type: "text",
                text: `Name : ${char.name}

Kanji name : ${char.name_kanji}

Nicknames : ${char.nicknames.map((i) => i)}

About : ${char.about}

Voice actors : 
${char.voice_actors.map((i) => i.name + " (" + i.language + ")").join("\n")}

=============
More info ${char.url}`,
              },
            ]);
            // console.log(res.data)
          })
          .catch((err) => {
            return message.reply("Telah terjadi error\n\n" + err);
          });
      })
      .catch((err) => {
        return message.reply("Telah terjadi error\n\n" + err);
      });
  },
};
