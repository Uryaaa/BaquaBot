const YouTube = require("youtube-sr").default
const axios = require('axios')
module.exports = {
    name: 'ytsr',
    description: 'Cari video di youtube (First result)',
    aliases : ['youtube-search', 'yt'],
    category: 'Utility',
    example: '{prefix}ytsr [query]',
    async  execute(client, message, args){
      let query = args.join(' ');
      if(!query) return message.reply("Masukkan query buat dicari!")

      YouTube.search(query, {limit: 3, safeSearch:false})
      .then((res)=>{
        message.reply(`https://www.youtube.com/watch?v=${res[0].id}`)
        
      })
      .catch((err)=>{
        console.log(err);
        message.reply("Telah terjadi error "+err)
      })
  }
}