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
    let content = [];
    axios.get(`https://api.jikan.moe/v4/anime?q=${searchString}&page=1&limit=12`)
    .then((results)=> {
  
        let res = results.data
        res.data.map((x, i)=> {
          console.log(res.data[0])
                x = {
                  type: "bubble",
                  size: "micro",
                  hero: {
                    type: "image",
                    url: res.data[i].images.jpg.image_url,
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
                        text: res.data[i].title || "Can't fetch title",
                        weight: "bold",
                        size: "xxs",
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: res.data[i].type,
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
                          text: `!anime_id ${res.data[i].mal_id}`,
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
                          label: "MyAnimeList",
                          uri: `https://myanimelist.net/anime/${res.data[i].id}`,
                        },
                      },
                    ],
                  },
                };
content.push(x);
        })
    message.reply({
      type: "flex",
      altText: "Anime Search",
      contents: {
        type: "carousel",
        contents: content,
      },
    });
    })

      
  },
};
