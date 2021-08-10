const moment = require("moment");
require("moment-duration-format");
const { API } = require("nhentai-api");
const api = new API();
const fs = require("fs");
const axios = require("axios");
module.exports = {
  name: "nhentai",
  description: "Doujin info dari nhentai 👀, bisa download",
  aliases: ["nh", "finddoujin", "doujin"],
  category: "Anime",
  example: "{prefix}nhentai [id]",
  async execute(client, message, args) {
    if (!args[0]) return message.reply("Input tidak terdeteksi");
    const id = args[0];
    if (isNaN(id)) return message.reply("Input nhentai ID saja 👀");

    const book = await api.getBook(id).catch(() => null);
    const {
      title: { english, japanese, pretty },
      tags,
      page,
      uploaded,
      cover,
    } = book;
    url = api.getImageURL(cover);
    axios({
      url,
      responseType: "stream",
    }).then((response) => {
      response.data.pipe(
        fs.createWriteStream(`./public/doujins/cover_${id}.jpg`)
      );
    });
    message.reply([
      {
        type: "text",
        text: `${book.title.pretty}
          
English title : ${book.title.english}

Japanese title : ${book.title.japanese}

Characters : ${
          book.tags
            .filter((l) => l.url.includes("/character/"))
            .map((x) => x.name)
            .sort()
            .join(", ") || " "
        }

Tags : ${book.tags
          .filter((l) => l.url.includes("/tag/"))
          .map((x) => x.name)
          .sort()
          .join(", ")}

Artists : ${book.tags
          .filter((l) => l.url.includes("/artist/"))
          .map((x) => x.name)
          .sort()
          .join(", ")}

Groups : ${
          book.tags
            .filter((l) => l.url.includes("/group/"))
            .map((x) => x.name)
            .sort()
            .join(", ") || " "
        }

Language : ${book.tags
          .filter((l) => l.url.includes("/language/"))
          .map((x) => x.name)
          .sort()
          .join(", ")}

Categories : ${book.tags
          .filter((l) => l.url.includes("/category/"))
          .map((x) => x.name)
          .sort()
          .join(", ")}

Parodies : ${
          book.tags
            .filter((l) => l.url.includes("/parody/"))
            .map((x) => x.name)
            .sort()
            .join(", ") || " "
        }

Pages : ${book.pages.length}

Favorite : ${book.favorites}

Uploaded on : ${moment(book.uploaded).format("dddd Do MMM YYYY")}\n${moment
          .duration(Date.now() - book.uploaded)
          .format("Y [Years] M [Months, and] D [Days]")} ago.

Link : https://nhentai.net/g/${id}`,
      },
      {
        type: "template",
        altText: "nh downloader",
        template: {
          type: "buttons",
          thumbnailImageUrl: `https://tamaline.tama0612.repl.co/img/doujins/cover_${id}.jpg`,
          title: "Nhen-dl",
          text: "Ini deskripsi",
          actions: [
            {
              type: "uri",
              label: "Download Zip",
              uri: `https://somethingjs.tama0612.repl.co/download/nhentai/${id}/zip`,
            },
          ],
        },
      },
    ]);
    console.log(book);
  },
};
