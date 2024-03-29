const axios = require("axios");

module.exports = {
  name: "ytdl",
  description: "Download music dari LINE",
  aliases: [],
  category: "Utility",
  example: "{prefix}ytdl [YT Video Url/ID]",
  async execute(client, message, args) {
    try {
      let query = args.join(" ");
      if (!query)
        return message.reply({
          type: "text",
          text: "Input YOUTUBE URL/VIDEO ID dengan benar",
        });

      if (query.startsWith("https"))
        query = query.match(
          /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|shorts\/|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
        )[1];
      let data = await axios.get(`https://tama0612.repl.co/api/info/${query}`);
      data = data.data;
      var hrs = ~~(data.info.lengthSeconds / 3600);
      var mins = ~~((data.info.lengthSeconds % 3600) / 60);
      var secs = ~~data.info.lengthSeconds % 60;
      var ret = "";
      if (hrs > 0) {
        ret += (hrs < 10 ? "0" : "") + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      if (data.info.isPrivate)
        return message.reply("Video yang anda maksud diprivate!");
      if (data.info.isLiveContent)
        return message.reply("Tidak bisa mendownload Livestream");

      message.reply({
        type: "flex",
        altText: "Help panel",
        contents: {
          type: "bubble",
          size: "kilo",
          hero: {
            type: "image",
            url: data.info.thumbnail.thumbnails.pop().url,
            aspectMode: "cover",
            size: "full",
            aspectRatio: "320:213",
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Kualitas yang tersedia",
                weight: "bold",
              },
              {
                type: "text",
                text: `Video download | ${ret}`,
              },
              {
                type: "separator",
                margin: "md",
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "Audio only",
                  uri: `https://tama0612.repl.co/api/download/${query}/audioOnly/default`,
                },
                style: "primary",
                height: "sm",
                margin: "sm",
              },
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "Video (360p)",
                  uri: `https://tama0612.repl.co/api/download/${query}/default/${data.video[0].qualityLabel}`,
                },
                style: "primary",
                height: "sm",
                margin: "md",
              },
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "Video only (720p)",
                  uri: `https://tama0612.repl.co/api/download/${query}/videoOnly/${data.videoOnly[1].qualityLabel}`,
                },
                style: "primary",
                height: "sm",
                margin: "md",
              },
            ],
          },
        },
      });
      //console.log(data.info)
    } catch (error) {
      message.reply({
        type: "text",
        text: "telah terjadi error " + error,
      });
      console.log(error);
    }
  },
};
