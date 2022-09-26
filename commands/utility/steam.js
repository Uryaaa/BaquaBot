const fetch = require("node-fetch");
const html2md = require("html2markdown");
const { decode } = require("he");
const text = require("../../util/string");
module.exports = {
  name: "steam",
  description: "Mencari info game di steam",
  aliases: [],
  category: "Utility",
  example: "{prefix}steam [Apex legends]",
  async execute(client, message, args) {
    const query = args.join(" ") || "Doki Doki Literature Club";

    const res = await fetch(
      `https://store.steampowered.com/api/storesearch/?cc=us&l=en&term=${encodeURI(
        query
      )}`
    )
      .then((res) => res.json())
      .catch(() => null);

    if (!res || !res.total) {
      return message.reply(`\\❌ Tidak dapat menemukan ${query} di steam`);
    }

    const body = await fetch(
      `https://store.steampowered.com/api/appdetails/?cc=us&l=en&appids=${res.items[0].id}`
    )
      .then((res) => res.json())
      .catch(() => null);

    if (!body) {
      return message.reply(`\\❌ Tidak dapat menemukan ${query} di steam`);
    }

    const data = body[res.items[0].id].data;
    const platformrequirements = {
      windows: "pc_requirements",
      mac: "mac_requirements",
      linux: "linux_requirements",
    };
    const current = (data.price_overview?.final || "Free").toLocaleString(
      "en-US",
      { style: "currency", currency: "USD" }
    );
    const original = (data.price_overview?.initial || "Free").toLocaleString(
      "en-US",
      { style: "currency", currency: "USD" }
    );
    const price = current === original ? current : `~${original}~~ ${current}`;
    const platforms = Object.entries(data.platforms)
      .filter(([platform, has]) => has)
      .map(([platform]) => {
        return {
          text: `System Requirements : ${
            decode(html2md(data[platformrequirements[platform]].minimum)).split(
              "* **Additional Notes:"
            )[0]
          }`,
        };
      });

    message.reply([
      {
        type: "image",
        originalContentUrl: res.items[0].tiny_image,
        previewImageUrl: res.items[0].tiny_image,
      },
      {
        type: "text",
        text: `Title : ${data.name}

Price : ${price}

Metascore : ${data.metacritic ? data.metacritic.score : "N/A"}

Release date : ${data.release_date ? data.release_date.date : "N/A"}

Developers : ${data.developers.map((m) => `${m}`).join(", ")}

Categories : ${data.categories.map((m) => `${m.description}`).join(", ")}

Genres : ${data.genres.map((m) => `${m.description}`).join(", ")}

${text.truncate(
  decode(data.detailed_description.replace(/(<([^>]+)>)/gi, " ")),
  980
)}

Supported Languages : ${text.truncate(html2md(data.supported_languages), 997)}

Link : https://store.steampowered.com/app/${data.steam_appid}`,
      },
      {
        type: "text",
        text: platforms[0].text,
      },
    ]);
  },
};
