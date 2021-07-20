const axios = require('axios')
module.exports = {
    name: 'pat',
    description: 'Send pat gif',
    aliases : [],
    category: 'Neko',
    example: '{prefix}pat',
  async  execute(client, message, args){
    axios.get("https://nekos.life/api/v2/img/pat")
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