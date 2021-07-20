const axios = require('axios')
module.exports = {
    name: 'gecg',
    description: 'Send gecg (genetically engineered cat girl) gif/jpg',
    aliases : [],
    category: 'Neko',
    example: '{prefix}gecg',
  async  execute(client, message, args){
    axios.get("https://nekos.life/api/v2/img/gecg")
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