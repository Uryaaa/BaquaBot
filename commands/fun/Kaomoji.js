const moji = require("../../json/kaomoji.json")
module.exports = {
    name: 'kaomoji',
    description: 'Send random kaomoji',
    aliases : [],
    category: 'Fun',
    example: '{prefix}kaomoji',
    async  execute(client, message, args){
        let kaomoji = moji.kaomoji[Math.floor((Math.random() * moji.kaomoji.length))];
        message.reply(kaomoji)

  }
}