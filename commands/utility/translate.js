const translate = require("@vitalets/google-translate-api")
module.exports = {
    name: 'translate',
    description: 'translate language to language',
    aliases : ['tl'],
    category: 'Utility',
    example: '{prefix}translate [language] [text]',
  async  execute(client, message, args){
    let language = args[0];
    let text = args.splice(1).join(" ")
      if(!language) return message.reply({
        type:'text',
        text: 'Bahasa tidak valid'
      })
      if(!text) return message.reply({
        type:'text',
        text: 'Argumen input tidak terdeteksi'
      })
       const result = await translate(text, {to: language})

          message.reply({
            type:"text",
            text:`Input : ${text}\n\nOutput : ${result.text}\n\nFull language check: nanti`
          })
    }
}