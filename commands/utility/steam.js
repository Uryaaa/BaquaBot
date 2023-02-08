const text = require("../../util/string");
const axios = require('axios')
module.exports = {
  name: "steam",
  description: "Mencari info game di steam",
  aliases: [],
  category: "Utility",
  example: "{prefix}steam [Apex legends]",
  async execute(client, message, args) {
    const query = args.join(" ") || "Doki Doki Literature Club";
    let content = []

    axios.get(`https://store.steampowered.com/api/storesearch/?cc=id&term=${query}`)
    .then((res) => {
      let data = res.data.items
      data.map((x, i) => {
        x = {
          type: "bubble",
          size: "micro",
          hero: {
            type: "image",
            url: data[i].tiny_image,
            size: "full",
            aspectMode: "cover",
            aspectRatio: "20:13",
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: data[i].name || "Can't fetch name",
                wrap: true,
                weight: "bold",
                size: "xxs",
              },
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "text",
                    text: data[i].price ? `IDR ${text.commatize(Math.round(data[i].price.final)/100)}` : "FREE",
                    size: "xxs",
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
                    size: "xxs",
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
                  text: `!steam_appId ${data[i].id}`,
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
                  label: "Steam",
                  uri: `https://store.steampowered.com/app/${data[i].id}`,
                },
              },
            ],
          },
        };
        content.push(x)
      })
      message.reply({
        type: "flex",
        altText: "Steam Search",
        contents: {
          type: "carousel",
          contents: content,
        },
      });
    })
  },
};
