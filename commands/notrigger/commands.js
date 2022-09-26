

module.exports = (client, message) => {
  client.on("message", (message) => {
    if (message.message.type !== "text" || message.type !== "message") return;
    if (
      message.source.type !== "group" &&
      message.source.userId !== process.env.dev_id
    )
      return;

    if (message.message.text) {
      const args = message.message.text.slice("").trim();
      const commands = args.toLowerCase();

      if (
        commands.includes("awaken") ||
        commands.includes("awakening") ||
        commands.includes("pilarmen")
      ) {
        message.reply([
          {
            type: "image",
            originalContentUrl:
              "https://c.tenor.com/PbvWXTX76MYAAAAC/jojo-pillar-men.gif",
            previewImageUrl:
              "https://c.tenor.com/PbvWXTX76MYAAAAC/jojo-pillar-men.gif",
          },
          {
            type: "audio",
            originalContentUrl:
              "https://baquabot.herokuapp.com/img/audio/16442401673394.mp3",
            duration: 13000,
          },
        ]);
      }
      if(commands === "rushipeek") {
        message.reply({
          type: "image",
          originalContentUrl:
            "https://cdn.discordapp.com/attachments/752708484444848138/763062561439744020/unknown.gif",
          previewImageUrl:
            "https://cdn.discordapp.com/attachments/752708484444848138/763062561439744020/unknown.gif",
        });
      }
      if (commands === "yes") {
        message.reply([
          {
            type: "image",
            originalContentUrl:
              "https://c.tenor.com/2m1yGjnf_LUAAAAC/jotaro-kujo-yes.gif",
            previewImageUrl:
              "https://c.tenor.com/2m1yGjnf_LUAAAAC/jotaro-kujo-yes.gif",
          },
          {
            type: "audio",
            originalContentUrl:
              "https://baquabot.herokuapp.com/img/audio/16461888530455.mp3",
            duration: 4000
          },
        ]);
      }      
    }
  });
};
