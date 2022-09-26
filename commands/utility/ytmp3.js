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

        //Duration get
        var hrs = ~~(info.videoDetails.lengthSeconds / 3600);
        var mins = ~~((info.videoDetails.lengthSeconds % 3600) / 60);
        var secs = ~~info.videoDetails.lengthSeconds % 60;
        var ret = "";
        if (hrs > 0) {
          ret += (hrs < 10 ? "0" : "") + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        message.reply([
          {
            type: "audio",
            originalContentUrl: `${process.env.baseurl}/img/audio/${info.videoDetails.videoId}.mp3`,
            duration: Number(info.videoDetails.lengthSeconds * 1000),
          },
          {
            type: "text",
            text: `🎧 Now playing ${info.videoDetails.title}\n[00:00/${ret}]

Audio terpotong saat di play? coba pake !ytmp3 [url/VideoId] (DEPRECATED) atau play audio lewat LINE FOR WINDOWS`,
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
