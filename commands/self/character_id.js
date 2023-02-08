const axios = require("axios");
const text = require("../../util/string");
module.exports = {
  name: "character_id",
  description: "Cari character di MyAnimeList pake id",
  aliases: [],
  category: "self",
  example: "{prefix}character_id [ID]",
  async execute(client, message, args) {
    let id = args;
    if (isNaN(id))
      return message.reply('Invalid number, cari nama pake "!char"');
    axios
      .get(`https://api.jikan.moe/v4/characters/${id}/full`)
      .then((res) => {
        let results = res.data.data;
        //console.log(results);
        message.reply([
          {
            type: "image",
            originalContentUrl: results.images.jpg.image_url,
            previewImageUrl: results.images.jpg.image_url,
          },
          {
            type: "text",
            text: `Name : ${results.name}

Kanji name : ${results.name_kanji}

Nicknames : ${results.nicknames.map((i) => i)}

About : ${text.textTruncate(results.about, 4000)}

`,
          },
          {
            type: "text",
            text: `Anime :\n${
              results.anime
                .map((i) => i.anime.title + " ( " + i.role + " )")
                .join("\n") || "None"
            }`,
          },
          {
            type: "text",
            text: `Manga :\n${results.manga.map((i) => i.manga.title).join("\n") || "No manga debut"} `,
          },
          {
            type:"text",
            text: `Voice Actors :\n${results.voices.map((i) => i.person.name + " ( " + i.language + " )").join("\n") || "No voice actors"}`
          }
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
