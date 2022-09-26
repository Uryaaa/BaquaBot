module.exports = {
    name: 'saran',
    description: 'Beri saran atau laporkan bug terkait ⚓ BaquaBot pada pengembang',
    aliases : ['report','suggest', 'bug'],
    category: 'Utility',
    example: '{prefix}saran [text]',
    async  execute(client, message, args){
      let saran = args.join(" ");
      if(!saran) return message.reply("Input tidak terdeteksi")
      if(message.source.type !== 'group' && message.type !== 'text') return message.reply("Hanya berfungsi di group")
      let userId = message.source.userId;
      client.getUserProfile(userId)
      .then((profile)=>{
        client.push(process.env.dev_id,`Dari ${profile.displayName}\n\n${saran}`)
        message.reply("Pesanmu telah berhasil terkirim!")
        
      })

  }
}