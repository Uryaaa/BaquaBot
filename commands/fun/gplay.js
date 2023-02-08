const gplay = require("google-play-scraper");
const {compactNum} = require("../../util/string")
module.exports = {
  name: "playstore",
  description: "Shows google play app first result",
  aliases: ["ps", "gplay", "app"],
  category: "Utility",
  example: "{prefix}gplay [query]",
  async execute(client, message, args) {
    gplay.search({ term: args.join(" "), num: 1 }).then((res) => {
      gplay.app({ appId: res[0].appId }).then((app) => {

        message.reply({
          type: "flex",
          altText: "googleplay result",
          contents: {
            type: "carousel",
            contents: [
              {
                type: "bubble",
                header: {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "image",
                          url: app.icon,
                          align: "start",
                          size: "xs",
                        },
                      ],
                      width: "65px",
                      cornerRadius: "lg",
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "text",
                          text: app.title,
                          weight: "bold",
                          margin: "none",
                          wrap: true,
                          size: "lg",
                        },
                        {
                          type: "text",
                          text: app.developer,
                          weight: "bold",
                          size: "xs",
                          color: "#239441",
                        },
                        {
                          type: "text",
                          text: app.offersIAP
                            ? `In-app purchase ${
                                app.adSupported ? "• Contain ads" : " "
                              }`
                            : " ",
                          margin: "none",
                          size: "xs",
                        },
                      ],
                      offsetStart: "xl",
                    },
                  ],
                  flex: 50,
                  position: "relative",
                  margin: "none",
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "text",
                              text: `${app.scoreText} ★`,
                              weight: "bold",
                              align: "center",
                            },
                            {
                              type: "text",
                              text: compactNum(app.reviews),
                              align: "center",
                            },
                          ],
                          width: "120px",
                        },
                        {
                          type: "separator",
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "text",
                              text: "Downloads",
                              align: "center",
                              weight: "bold",
                            },
                            {
                              type: "text",
                              text: compactNum(app.minInstalls),
                              align: "center",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "button",
                      action: {
                        type: "uri",
                        label: app.price ? app.priceText : "Install",
                        uri: app.url,
                      },
                      style: "primary",
                      color: "#239441",
                      margin: "md",
                      height: "sm",
                    },
                    {
                      type: "separator",
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "text",
                              text: "About this app",
                              weight: "bold",
                            },
                            {
                              type: "text",
                              text: app.summary,
                              size: "xs",
                              wrap: true,
                            },
                          ],
                          offsetTop: "xs",
                        },
                      ],
                      position: "relative",
                      spacing: "md",
                      margin: "xxl",
                      offsetStart: "md",
                    },
                  ],
                },
              },
            ],
          },
        });
      });
    });
  },
};
