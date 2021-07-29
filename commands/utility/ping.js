
module.exports = {
    name: 'ping',
    description: 'Check bot ping pong! 🏓',
    aliases : [],
    category: 'Utility',
    example: '{prefix}ping',
    async  execute(client, message, args){
      message.reply(`Pong 🏓 - ${Date.now() - message.timestamp}ms`)

  }
}