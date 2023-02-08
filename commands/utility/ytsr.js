const YouTube = require("youtube-sr").default;
const axios = require("axios");
module.exports = {
  name: "ytsr",
  description: "Cari video di youtube (First result)",
  aliases: ["youtube-search", "yt"],
  category: "Utility",
  example: "{prefix}ytsr [query]",
  async execute(client, message, args) {
    let query = args.join(" ");
    if (!query) return message.reply("Masukkan query buat dicari!");

    YouTube.search(query, { limit: 10, safeSearch: false })
      .then((res) => {
        let content = [];
        res.map((x, i) => {
          if (i >= 10) return;
          // console.log(res[0])
          x = {
            type: "bubble",
            size: "kilo",
            hero: {
              type: "image",
              url: res[i].thumbnail.url,
              size: "full",
              aspectMode: "cover",
              aspectRatio: "320:213",
              action: {
                type: "uri",
                label: "Watch on youtube",
                uri: "https://www.youtube.com/watch?v=" + res[i].id,
              },
            },
            body: {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "image",
                      url: res[i].channel.icon.url,
                      align: "start",
                      size: "sm",
                      aspectMode: "fit",
                      action: {
                        type: "uri",
                        label: "Go to channel",
                        uri:
                          "https://www.youtube.com/channel/" +
                          res[i].channel.id,
                      },
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [],
                    },
                  ],
                  width: "72px",
                  height: "72px",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: res[i].title,
                      weight: "bold",
                      action: {
                        type: "uri",
                        label: "Watch on youtube",
                        uri:
                          "https://www.youtube.com/channel/" +
                          res[i].channel.id,
                      },
                      size: "xs",
                      margin: "none",
                    },
                    {
                      type: "text",
                      text: res[i].channel.name,
                      margin: "none",
                      size: "xxs",
                      action: {
                        type: "uri",
                        label: "Go to channel",
                        uri:
                          "https://www.youtube.com/channel/" +
                          res[i].channel.id,
                      },
                    },
                    {
                      type: "separator",
                    },
                    {
                      type: "text",
                      text: res[i].durationFormatted,
                      size: "xs",
                      color: "#a8a5a3",
                    },
                  ],
                  spacing: "none",
                },
              ],
              spacing: "sm",
            },
            footer: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "button",
                  action: {
                    type: "message",
                    label: "Play as audio",
                    text: "!play " + res[i].id,
                  },
                  style: "primary",
                  height: "sm",
                },
                {
                  type: "separator",
                },
                {
                  type: "button",
                  action: {
                    type: "message",
                    label: "Play as video",
                    text: "!ytmp4 " + res[i].id,
                  },
                  style: "primary",
                  height: "sm",
                  margin: "lg",
                },
                {
                  type: "button",
                  action: {
                    type: "message",
                    label: "Download options",
                    text: "!ytdl " + res[i].id,
                  },
                  height: "sm",
                  style: "primary",
                  margin: "lg",
                },
                {
                  type: "button",
                  action: {
                    type: "message",
                    label: "Get youtube url",
                    text: "https://www.youtube.com/watch?v=" + res[i].id,
                  },
                  margin: "lg",
                  style: "secondary",
                  height: "sm",
                },
              ],
            },
            styles: {
              footer: {
                separator: true,
              },
            },
          };
          content.push(x);
        });
        message.reply({
          type: "flex",
          altText: "Youtube search",
          contents: {
            type: "carousel",
            contents: content,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply("Telah terjadi error " + err);
      });
  },
};
