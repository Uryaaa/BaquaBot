const axios = require('axios')

module.exports = {
    name: 'cry',
    description: 'Send crying gif',
    aliases : [],
    category: 'Neko',
    example: '{prefix}cry',
    async  execute(client, message, args){
     await axios.get("https://rra.ram.moe/i/r?type=cry")
      .then((res)=>{
      
        message.reply({
          type:'image',
          originalContentUrl:`https://cdn.ram.moe/${res.data.path.replace("/i/", "")}`,
          previewImageUrl:`https://cdn.ram.moe/${res.data.path.replace("/i/", "")}`
        })
      })
      .catch((err)=>{
        message.reply("Telah terjadi error\n\n"+err)
      })
  }
}