const axios = require('axios')
module.exports = {
    name: 'baka',
    description: 'Send baka gif',
    aliases : [],
    category: 'Neko',
    example: '{prefix}baka',
  async  execute(client, message, args){
    axios.get("https://nekos.life/api/v2/img/smug")
    .then(async(res)=>{
      let image = await res.data.url;
      message.reply({
        type:'image',
        originalContentUrl:image,
        previewImageUrl:image,
      })
      
    })
    .catch((error)=>{
      message.reply("Telah terjadi error "+error)
      console.log(error)
    })
  }
}