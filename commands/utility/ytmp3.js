const fs = require("fs");
const ytdl = require("ytdl-core");
const axios = require("axios");
module.exports = {
  name: "audio",
  description: "ytmp3 tapi load lebih cepat",
  aliases: ["ytp", "play"],
  category: "Utility",
  example: "{prefix}audio [url/VideoId]",
  async execute(client, message, args) {
    try {
      let query = args.join(" ");
      if (!query)
        return message.reply(
          "Masukkan link youtube! \n\nProtip : !ytsr [judul lagu]"
        );
      if (query.startsWith("https"))
        query = query.match(
          /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|shorts\/|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
        )[1];
      let url = `https://www.youtube.com/watch?v=${query}`;

      ytdl.getInfo(url).then((info) => {
        if (info.videoDetails.isPrivate)
          return message.reply("Video yang anda maksud di private!");
        if (info.videoDetails.isLiveContent)
          return message.reply("Tidak bisa memutar Video yang sedang Live");
        ytdl(url, {
          filter: "audioonly",
          format: "mp3",
          highWaterMark: 1 << 62,
          quality: "highestaudio",
        }).pipe(
          fs.createWriteStream(
            `./public/audio/${info.videoDetails.videoId}.mp3`,
            { encoding: null }
          )
        );

        message.reply([
          {
            type: "audio",
            originalContentUrl: `${process.env.baseurl}/img/audio/${info.videoDetails.videoId}.mp3`,
            duration: Number(info.videoDetails.lengthSeconds * 1000),
          },
          {
            type: "text",
            text: `🎧 Now playing ${info.videoDetails.title}

Audio terpotong saat di play? coba play audio lewat LINE FOR WINDOWS`,
          },
        ]);
        console.log("request receive!");
      });
    } catch (error) {
      message.reply(
        "Telah terjadi error, biasanya terjadi jika url bukan video youtube, kalau kamu yakin ini video youtube, silahkan coba lagi.\n\n" +
          error
      );
      console.log(error);
    }
  },
};
