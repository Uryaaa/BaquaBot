const moment = require("moment");
require("moment-duration-format");
const { API } = require("nhentai-api");
const NanaAPI = require("nana-api");
const nana = new NanaAPI();
const api = new API();
const fs = require("fs");
const axios = require("axios");
module.exports = {
  name: "nhrandom",
  description: "Info doujin acak dari nhentai 👀, bisa download",
  aliases: ["doujinrandom", "nhr"],
  category: "Anime",
  example: "{prefix}nhentai [id]",
  async execute(client, message, args) {
    // cursed unfriendly, dont do it, just use one package, dont be lazy like me
   const nanabook = await nana.random().catch(() => null);
    const id = nanabook.id;
   // console.log(id)
   

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
          title: "Download",
          text: "Reload page kalo ga kedownload",
          actions: [
            {
              type: "uri",
              label: "Download.zip",
              uri: `https://somethingjs.tama0612.repl.co/download/nhentai/${id}/zip`,
            },
            {
              type: "uri",
              label: "Download.cbz",
              uri: `https://somethingjs.tama0612.repl.co/download/nhentai/${id}/cbz`,
            },
          ],
        },
      },
    ]);
   // console.log(book);
  },
};
