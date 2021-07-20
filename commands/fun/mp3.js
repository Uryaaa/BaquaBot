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
      let query = args.join(' ');
      if(!query) return message.reply('Masukkan link youtube! \n\nProtip : !ytsr [judul lagu]')
       if (query.startsWith('https')) query = query.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)[1];
    let url = `https://www.youtube.com/watch?v=${query}`
    ytdl(url, {filter: 'audioonly', format: 'mp3'}).pipe(fs.createWriteStream(`./public/${message.source.userId}.mp3`))
      
   let data = await axios.get(`https://tama0612.repl.co/api/info/${query}`); data = data.data;
        message.reply([{
        type:"audio",
        originalContentUrl: `https://tamaline.tama0612.repl.co/img/${message.source.userId}.mp3`,
        duration:Number(data.info.lengthSeconds*1000)
      },
      {
        type:'text',
        text: 'Tunggu 5 detik sebelum play (bug server)'
      }])
     

  }
}