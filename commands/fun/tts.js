const axios = require('axios')
const googleapi = require("google-tts-api")
const fs = require("fs")
module.exports = {
    name: 'tts',
    description: 'text to speech',
    aliases : [],
    category: 'Fun',
    example: '{prefix}command [] ? <>',
    async  execute(client, message, args){
      let tts = args.join(" ")
      if(tts.length === 0) return message.reply("Masukkan text untuk dijadikan audio")
      if(tts.length > 256) return message.reply("Tidak boleh lebih dari 256 karakter!")
googleapi.getAudioBase64(tts, { lang: 'id', slow: false, })
.then((base64) =>{
    const buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(`./public/${tts.replace(/\s/g, "_")}.mp3`, buffer, { encoding: 'base64' });

    message.reply({
      type:'audio',
      originalContentUrl:`https://tamaline.tama0612.repl.co/img/${tts.replace(/\s/g, "_")}.mp3`,
      duration:240000
    })
})

  }
}