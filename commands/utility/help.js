module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Menampilkan help panel",
  category: "Utility",
  example: "{prefix}help <command name>",
  execute(client, message, args) {
    if (!args[0]) {
      const utility = client.commands
        .filter((x) => x.category == "Utility")
        .map((x) => "[" + x.name + "]")
        .join(", ");
      const fun = client.commands
        .filter((x) => x.category == "Fun")
        .map((x) => "[" + x.name + "]")
        .join(", ");
      const anime = client.commands
        .filter((x) => x.category == "Anime")
        .map((x) => "[" + x.name + "]")
        .join(", ");
      //   const deprecated = client.commands
      //     .filter((x) => x.category == "Deprecated")
      //     .map((x) => "[" + x.name + "]")
      //     .join(", ");

      message.reply({
        type: "flex",
        altText: "Help panel",
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
                    type: "text",
                    text: "HELP MENU ❓",
                    size: "xl",
                    weight: "bold",
                    adjustMode: "shrink-to-fit",
                    color: "#00FF00",
                    contents: [],
                    wrap: false,
                  },
                ],
                background: {
                  type: "linearGradient",
                  angle: "0deg",
                  startColor: "#F0F8FF",
                  endColor: "#ffffff",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: 'Seluruh command diawali dengan "!"',
                    size: "sm",
                    weight: "bold",
                  },
                  {
                    type: "separator",
                  },
                  {
                    type: "text",
                    text: '- Ketik !help "Nama Command" untuk keterangan tentang command tersebut',
                    size: "sm",
                    wrap: true,
                    margin: "md",
                  },
                  {
                    type: "text",
                    text: '- Tanda "[ ]" menandakan input wajib sedangkan "< >" opsional',
                    size: "sm",
                    wrap: true,
                    margin: "xl",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "- Kategori command",
                        size: "sm",
                      },
                      {
                        type: "text",
                        text: '"Deprecated" ',
                        size: "sm",
                        weight: "bold",
                        wrap: true,
                      },
                    ],
                    spacing: "none",
                    margin: "lg",
                  },
                  {
                    type: "text",
                    text: "Menandakan command tidak mendapat update improvisasi lagi",
                    size: "sm",
                    wrap: true,
                  },
                ],
              },
            },
            {
              type: "bubble",
              header: {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "ANIME 🍙",
                    size: "xl",
                    weight: "bold",
                    adjustMode: "shrink-to-fit",
                    color: "#00FF00",
                    contents: [],
                    wrap: false,
                  },
                ],
                background: {
                  type: "linearGradient",
                  angle: "0deg",
                  startColor: "#F0F8FF",
                  endColor: "#ffffff",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: 'Seluruh command diawali dengan "!"',
                    size: "sm",
                    weight: "bold",
                  },
                  {
                    type: "separator",
                  },
                  {
                    type: "text",
                    text: `${anime}`,
                    size: "md",
                    margin: "md",
                    wrap: true,
                  },
                ],
              },
            },
            {
              type: "bubble",
              header: {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "FUN 🎲",
                    size: "xl",
                    weight: "bold",
                    adjustMode: "shrink-to-fit",
                    color: "#00FF00",
                    contents: [],
                    wrap: false,
                  },
                ],
                background: {
                  type: "linearGradient",
                  angle: "0deg",
                  startColor: "#F0F8FF",
                  endColor: "#ffffff",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: 'Seluruh command diawali dengan "!"',
                    size: "sm",
                    weight: "bold",
                  },
                  {
                    type: "separator",
                  },
                  {
                    type: "text",
                    text: `${fun}`,
                    size: "md",
                    margin: "md",
                    wrap: true,
                  },
                ],
              },
            },
            {
              type: "bubble",
              header: {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "UTILITY 📂",
                    size: "xl",
                    weight: "bold",
                    adjustMode: "shrink-to-fit",
                    color: "#00FF00",
                    contents: [],
                    wrap: false,
                  },
                ],
                background: {
                  type: "linearGradient",
                  angle: "0deg",
                  startColor: "#F0F8FF",
                  endColor: "#ffffff",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: 'Seluruh command diawali dengan "!"',
                    size: "sm",
                    weight: "bold",
                  },
                  {
                    type: "separator",
                  },
                  {
                    type: "text",
                    text: `${utility}`,
                    size: "md",
                    margin: "md",
                    wrap: true,
                  },
                ],
              },
            },
            {
              type: "bubble",
              header: {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "BOT SUPPORT 🤖",
                    size: "xl",
                    weight: "bold",
                    adjustMode: "shrink-to-fit",
                    color: "#00FF00",
                    contents: [],
                    wrap: false,
                  },
                ],
                background: {
                  type: "linearGradient",
                  angle: "0deg",
                  startColor: "#F0F8FF",
                  endColor: "#ffffff",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "Untuk error reporting, sertakan reproduce nya ",
                    size: "sm",
                    weight: "bold",
                    wrap: true,
                    align: "center",
                  },
                  {
                    type: "separator",
                  },
                  {
                    type: "text",
                    text: "LINE ID : Aldi0905 ",
                    size: "md",
                    margin: "md",
                    wrap: true,
                    align: "start",
                    position: "relative",
                    color: "#551A8B",
                    weight: "regular",
                    style: "normal",
                    decoration: "underline",
                    action: {
                      type: "uri",
                      label: "action",
                      uri: "http://line.me/ti/p/~Aldi0905",
                    },
                  },
                  {
                    type: "text",
                    text: "Cara reproduce error",
                    margin: "xl",
                    weight: "bold",
                  },
                  {
                    type: "text",
                    text: "Versi LINE yang dipakai saat error terjadi :",
                    size: "xs",
                    wrap: true,
                  },
                  {
                    type: "text",
                    text: "Commands/Keywords yang bermasalah :",
                    size: "xs",
                    wrap: true,
                  },
                  {
                    type: "text",
                    text: "Screenshot error atau penjelasan lebih lanjut :",
                    size: "xs",
                    wrap: true,
                  },
                ],
              },
            },
          ],
        },
      });
    } else {
      try {
        const command =
          client.commands.get(args.join(" ").toLowerCase()) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args.join(" ").toLowerCase())
          );
        if (!command) return message.reply("command tidak ada");
        message.reply({
          type: "text",
          text: `❓ Panel informasi command ❓\n\nKeterangan: input wajib ditandai dengan [ ], sedangkan opsional ditandai dengan < >\n\n⚙Command: ${
            command.name
          }\n\n⚡Aliases: ${
            command.aliases.length < 1 ? "None" : command.aliases.join(", ")
          }\n\n📝Desc: ${
            command.description
          }\n\n✅Example: ${command.example.replace(
            "{prefix}",
            process.env.prefix
          )}`,
        });
      } catch (error) {
        message.reply("Command mungkin tidak tersedia atau error");
        console.log(error);
      }
    }
  },
};
