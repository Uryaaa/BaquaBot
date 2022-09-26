const fetch = require("node-fetch")
module.exports = {
    name: 'id-wiki',
    description: 'Cari di wiki',
    aliases : ['idw'],
    category: 'Utility',
    example: '{prefix}id-wiki [query]',
  async  execute(client, message, args){
      if(!args[0]) return message.reply({
        type:'text',
        text: 'Argumen input tidak terdeteksi'
      })
      const body = await fetch(
        `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
        ).then(res => res.json().catch(() => {}));
        if(!body) return message.reply({
          type:'text',
          text:"❌ Halaman tidak ditemukan! | English wiki? !en-wiki"
        })
        if (body.title && body.title === "Not found.") return message.reply({
          type:'text',
          text:"❌ Halaman tidak ditemukan! | English wiki? !en-wiki"
        })
      message.reply([
        {type:"text", text:`🌐 ${body.title}\n\n${body.extract}\n\n Selengkapnya: https://id.wikipedia.org/wiki/${args.join("_")}`},
     
      ])
    }
}