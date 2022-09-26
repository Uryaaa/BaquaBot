const fetch = require("node-fetch")
module.exports = {
    name: 'en-wiki',
    description: 'Search on wiki',
    aliases : ['enw'],
    category: 'Utility',
    example: '{prefix}en-wiki [query]',
  async  execute(client, message, args){
      if(!args[0]) return message.reply({
        type:'text',
        text: 'Argumen input tidak terdeteksi'
      })
      const body = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
        ).then(res => res.json().catch(() => {}));
        if(!body) return message.reply({
          type:'text',
          text:"❌ Page not found | Bahasa Indonesia wiki? !id-wiki"
        })
        if (body.title && body.title === "Not found.") return message.reply({
          type:'text',
          text:"❌ Page not found | Bahasa Indonesia wiki? !id-wiki"
        })
      message.reply([
        {type:"text", text:`🌐 ${body.title}\n\n${body.extract}\n\n More info: https://en.wikipedia.org/wiki/${args.join("_")}`},
        
      ])
    }
}