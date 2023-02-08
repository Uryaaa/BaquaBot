const axios = require('axios')
const html2md = require('html2markdown')
const text = require("../../util/string")
const {decode} = require("he")
module.exports = {
  name: "steam_appId",
  description: "Cari anime di MyAnimeList pake id",
  aliases: [],
  category: "self",
  example: "{prefix}mal_id [ID]",
  async execute(client, message, args) {
    let id = args;
    if(isNaN(id)) return message.reply('Invalid number, cari judul pake "!anime"')
    axios.get(`https://store.steampowered.com/api/appdetails/?cc=id&appids=${id}`)
    .then((res) => {
        let data = res.data[id].data
        const url = data.header_image;
        const strippedUrl = url.split('.jpg')[0] + '.jpg';

        const platformrequirements = {
          windows: "pc_requirements",
          mac: "mac_requirements",
          linux: "linux_requirements",
        };
      
        const platforms = Object.entries(data.platforms)
        .filter(([platform, has]) => has)
        .map(([platform]) => {
          return {
            text: `System Requirements : ${
              decode(html2md(data[platformrequirements[platform]].minimum)).split(
                "Additional Notes:"
              )[0]
            }`,
          };
        });

        let desc = platforms[0].text;

        message.reply([
          {
            type: "image",
            originalContentUrl:strippedUrl,
            previewImageUrl:strippedUrl,
          },
          {
            type: "text",
            text: `${data.name}

Original price : ${data.price_overview ? `IDR ${text.commatize(Math.round(data.price_overview.initial)/100)}` : `FREE`}

Final price : ${data.price_overview ? `IDR ${text.commatize(Math.round(data.price_overview.final)/100)}` : `FREE`}

Metascore : ${data.metacritic ? data.metacritic.score : "N/A"}

Release date : ${data.release_date ? data.release_date.date : "N/A"}

Developers : ${data.developers.map((m) => `${m}`).join(", ")}

Categories : ${data.categories.map((m) => `${m.description}`).join(", ")}

Genres : ${data.genres.map((m) => `${m.description}`).join(", ")}

${text.truncate(
  decode(data.detailed_description.replace(/(<([^>]+)>)/gi, " ")),
  980
)}
`
          },
          {
            type:"text",
            text:desc.replace(/\*\*/g, "")
          }
        ]);
    })
.catch((e)=>{
    console.log(e)
})
  },
};
