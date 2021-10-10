const fs = require("fs");
const http = require("https");
const ytdl = require("ytdl-core");
const axios = require("axios");
module.exports = {
  name: "ytmp4",
  description: "Play video di LINE",
  aliases: ["ytv"],
  category: "Utility",
  example: "{prefix}ytmp4 [url/VideoId]",
  async execute(client, message, args) {
    try {
      let query = args.join(" ");
      if (!query)
        return message.reply(
          "Masukkan link youtube! \n\nProtip : !ytsr [judul lagu]"
        );
      if (query.startsWith("https"))
        query = query.match(
          /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
        )[1];
      let url = `https://www.youtube.com/watch?v=${query}`;

      ytdl.getInfo(url).then((info) => {
        if (info.videoDetails.isPrivate)
          return message.reply("Video yang anda maksud di private!");
        if (info.videoDetails.lengthSeconds > 700)
          return message.reply('Video tidak boleh lebih dari 11 menit!')
        if (info.videoDetails.isLiveContent)
          return message.reply("Tidak bisa memutar Video yang sedang Live");
        ytdl(url).pipe(
          fs.createWriteStream(
            `./public/video/${info.videoDetails.videoId}.mp4`
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
            type: "video",
            originalContentUrl: `https://tamaline.tama0612.repl.co/img/video/${info.videoDetails.videoId}.mp4`,
            previewImageUrl: info.videoDetails.thumbnails[0].url
            
          },
          {
            type: "text",
            text: `🎧 Now playing ${info.videoDetails.title}\n[00:00/${ret}]

*Use LINE for Windows and headset for best experience`,
          },
        ]);
        console.log(info.player_response.streamingData.formats)
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
