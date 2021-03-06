const fs = require("fs");
const http = require("https");
const ytdl = require("ytdl-core")
const axios = require("axios")
module.exports = {
  name: "ytmp3",
  description: "Play music di LINE",
  aliases: ["yta"],
  category: "Utility",
  example: "{prefix}ytmp3 [url/VideoId]",
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
      let stream = ytdl(url)
      stream.on("info", (info)=>{
        if (info.videoDetails.isPrivate)
          return message.reply("Video yang anda maksud di private!");
        if (info.videoDetails.isLiveContent)
          return message.reply("Tidak bisa memutar Video yang sedang Live");

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

        data = info.player_response.streamingData.adaptiveFormats
        audioLo = data.filter(a => a.audioQuality == "AUDIO_QUALITY_LOW")
        audioMed = data.filter(a => a.audioQuality == "AUDIO_QUALITY_MEDIUM")

        message.reply([
          {
            type: "audio",
            originalContentUrl: audioMed[0].url,
            duration: Number(info.videoDetails.lengthSeconds * 1000),
          },
          {
            type: "text",
            text: `🎧 Now playing ${info.videoDetails.title}\n[00:00/${ret}]

Update : Audio file sekarang download langsung dari youtube, jadi ngeplaynya bakal agak lama dari sebelumnya
Pake LINE for Windows dan Headset untuk best experience,`
          },
        ]);        

        //console.log(audioMed[0].url)
      })

    } catch (error) {
      message.reply(
        "Telah terjadi error, biasanya terjadi jika url bukan video youtube, kalau kamu yakin ini video youtube, silahkan coba lagi.\n\n" +
          error
      );
      console.log(error);
    }
  },
};
