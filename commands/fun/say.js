module.exports = {
    name: 'say',
    description: 'Bot mengulangi apa yang kamu tulis ',
    aliases : ['echo'],
    category: 'Fun',
    example: '{prefix}say [teks]',
    async  execute(client, message, args){
      let echo = args.join(' ');
      if(!echo) return message.reply(`Say something, I'm giving up on you
I'll be the one, if you want me to
Anywhere, I would've followed you
Say something, I'm giving up on you~`)
message.reply(echo)

  }
}