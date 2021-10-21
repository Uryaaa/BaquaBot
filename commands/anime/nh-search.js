const nhentai = require("nana-api");
const nana = new nhentai();

module.exports = {
  name: "nhsr",
  description: "Cari doujin di nhentai dengan input keyword",
  aliases: ["nhentai-search"],
  category: "Anime",
  example: "{prefix}nhsr [keyword]",
  async execute(client, message, args) {
    let keywords = args.join(" ");
    if (!keywords) return message.reply("Input tidak terdeteksi");
    const nanabook = await nana.search(keywords).catch(() => null);
    //console.log(nanabook)

    let content = [];

    nanabook.results.map((x, i) => {
      if (i >= 10) return;
      url = nanabook.results[i].thumbnail.s;
      axios({
        url,
        responseType: "stream",
      }).then((response) => {
        response.data.pipe(
          fs.createWriteStream(
            `./public/doujins/cover_${nanabook.results[i].id}.jpg`
          )
        );
      });
      x = {
        type: "bubble",
        size: "kilo",
        hero: {
          type: "image",
          url:
            `https://tamaline.tama0612.repl.co/img/doujins/cover_${nanabook.results[i].id}.jpg` ||
            "https://img.wallpapersafari.com/tablet/1536/2048/19/44/evOxST.jpg",
          size: "full",
          aspectMode: "cover",
          aspectRatio: "2:3",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: nanabook.results[i].title || "Can't fetch title",
              weight: "bold",
              size: "sm",
            },
            {
              type: "box",
              layout: "baseline",
              contents: [
                {
                  type: "text",
                  text: nanabook.results[i].language || "Can't fetch language",
                  size: "sm",
                  color: "#8c8c8c",
                  margin: "sm",
                  flex: 0,
                },
              ],
            },
            {
              type: "box",
              layout: "baseline",
              contents: [
                {
                  type: "text",
                  text: "Hasil berdasarkan page 1 ",
                  margin: "sm",
                  size: "sm",
                  color: "#f54263",
                  style: "italic",
                },
              ],
            },
          ],
          spacing: "sm",
          paddingAll: "13px",
        },
        footer: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              action: {
                type: "message",
                label: "Lihat detail",
                text: `!nh ${nanabook.results[i].id}`,
              },
              position: "relative",
              height: "sm",
              style: "primary",
              adjustMode: "shrink-to-fit",
              gravity: "center",
            },
            {
              type: "button",
              action: {
                type: "uri",
                label: "Baca online",
                uri: `https://nhentai.net/g/${nanabook.results[i].id}/`,
              },
            },
          ],
        },
      };
      content.push(x);
      //console.log(nanabook.results[i].thumbnail.s)
    });

    message.reply({
      type: "flex",
      altText: "Nhentai results",
      contents: {
        type: "carousel",
        contents: content,
      },
    });
  },
};
