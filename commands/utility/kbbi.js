const axios = require('axios')
module.exports = {
    name: 'kbbi',
    description: 'Cari arti kata yang dimaksud di kbbi',
    aliases : ['kamus'],
    category: 'Utility',
    example: '{prefix}kbbi [kata]',
    async  execute(client, message, args){
      let query = args.join(" ")
      if (!query) return message.reply('Input kata tidak terdeteksi!, masukkan kata untuk dicari') 
      axios.get(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${query}`)
      .then((res)=>{
        if(!res.data) return message.reply(`Tidak ditemukan entri "${query}"`)
        message.reply(`📚 ${res.data.lema.replace(/[1-9]/g, '')}\n\n${res.data.arti.map(i => i).join('\n\n')}\n=================\nSee: https://kbbi.kemdikbud.go.id/entri/${query.toLowerCase()}`)
      })
      .catch((err)=>{
        message.reply('Telah terjadi error '+err)
      })
  }
}