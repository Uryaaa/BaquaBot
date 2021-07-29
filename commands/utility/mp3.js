const fs = require("fs")
const http = require("https")
const ytdl = require("ytdl-core")
const axios = require("axios")
module.exports = {
    name: 'ytmp3',
    description: 'Play music di LINE, max 10 menit' ,
    aliases : [],
    category: 'Utility',
    example: '{prefix}ytmp3 [url]',
    async  execute(client, message, args){
      try{
      let query = args.join(' ');
      if(!query) return message.reply('Masukkan link youtube! \n\nProtip : !ytsr [judul lagu]')
       if (query.startsWith('https')) query = query.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)[1];
    let url = `https://www.youtube.com/watch?v=${query}`
      
        ytdl.getInfo(url)
        .then((info)=>{
       ytdl(url, {filter: 'audioonly', format: 'mp3'}).pipe(fs.createWriteStream(`./public/${info.videoDetails.videoId}.mp3`))  

      //Duration get
       var hrs = ~~(info.videoDetails.lengthSeconds / 3600);
       var mins = ~~((info.videoDetails.lengthSeconds% 3600) / 60);
       var secs = ~~info.videoDetails.lengthSeconds % 60;
       var ret = "";
       if (hrs > 0) {
          ret +=(hrs < 10 ? "0" : "") + hrs + ":" + (mins < 10 ? "0" : "");
            }
          ret += (mins < 10 ?"0" : "") + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
        
        message.reply([{
        type:"audio",
        originalContentUrl: `https://tamaline.tama0612.repl.co/img/${info.videoDetails.videoId}.mp3`,
        duration:Number(info.videoDetails.lengthSeconds*1000)
      },
      {
        type:'text',
        text: `🎧 Now playing ${info.videoDetails.title}\n[00:00/${ret}]

*Use LINE for Windows and headset for best experience`
      }])
          //console.log(info.videoDetails)
        })

      }catch(error){
        message.reply("Telah terjadi error, biasanya terjadi jika url bukan video youtube, kalau kamu yakin ini video youtube, silahkan coba lagi.\n\n"+error)
        console.log(error)
      }
      
     

  }
}