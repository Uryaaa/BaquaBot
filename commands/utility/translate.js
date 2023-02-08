const translate = require("@vitalets/google-translate-api")
module.exports = {
    name: 'translate',
    description: 'translate language to language',
    aliases : ['tl'],
    category: 'Utility',
    example: '{prefix}translate [language] [text]',
  async  execute(client, message, args){

    let [text1, text0] = args.join(" ").split("|")
    if(!text1) return message.reply({
      type:'text',
      text: 'Argumen input tidak terdeteksi'
    })

      if(!text0) return message.reply({
        type:'text',
        text: 'Bahasa tidak valid'
      })
       const result = await translate(text1, {to: text0})

          message.reply({
            type:"text",
            text:`Input : ${text1}\n\nOutput : ${result.text}\n\nCek kode bahasa yang bisa dipake : https://github.com/shikar/NODE_GOOGLE_TRANSLATE/blob/master/languages.js`
          })
    }
}