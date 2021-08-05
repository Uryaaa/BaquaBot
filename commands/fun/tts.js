const axios = require('axios')
const googleapi = require("google-tts-api")
const fs = require("fs")
const { getAudioDurationInSeconds } = require('get-audio-duration');
module.exports = {
    name: 'tts',
    description: 'text to speech',
    aliases : [],
    category: 'Fun',
    example: '{prefix}tts [text]',
    async  execute(client, message, args){
      
       function getRandomFileName() {
        var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
        var random = ("" + Math.random()).substring(2, 8); 
        var random_number = timestamp+random;  
        return random_number;
      }
    let filename = getRandomFileName();

      let tts = args.join(" ")
      if(tts.length === 0) return message.reply("Masukkan text untuk dijadikan audio")
      if(tts.length > 512) return message.reply("Tidak boleh lebih dari 512 karakter!")
googleapi.getAudioBase64(tts, { lang: 'id', slow: false, })
.then((base64) =>{
    const buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(`./public/tts/${filename}.mp3`, buffer, { encoding: 'base64' });

    getAudioDurationInSeconds(`./public/tts/${filename}.mp3`).then((duration) => {
      message.reply({
      type:'audio',
      originalContentUrl:`https://tamaline.tama0612.repl.co/img/tts/${filename}.mp3`,
      duration:Number(duration*1000)
    })
  
});

})

  }
}