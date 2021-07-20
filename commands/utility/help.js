
module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Menampilkan help panel',
    category: 'Utility',
    example: '{prefix}help <command name>',
    execute(client, message, args) {
      if(!args[0]){
        const utility = client.commands.filter(x=> x.category == 'Utility').map((x) => '[' + x.name + ']').join(", ");
        const fun = client.commands.filter(x=> x.category == 'Fun').map((x) => '[' + x.name + ']').join(", ");
        const neko = client.commands.filter(x=> x.category == 'Neko').map((x) => '[' + x.name + ']').join(", ");

    


        message.reply({
          type:'text',
          text:`Tamabot help panel: semua command yang ada di panel ini munggunakan "!" sebagai trigger, untuk informasi lengkap tentang command gunakan ${process.env.prefix}help [commandName]\n\n🎊Fun\n${fun}\n\n🐱Neko\n${neko}\n\n📁Utility\n${utility}\n\n🤖Bot support\nLINE: Aldi0905 | https://line.me/ti/p/~@tmu7203x`
        })
      }else{
        try {
         const command = client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
        if(!command) return message.reply('command tidak ada')
        message.reply({
          type:"text",
          text:`❓ Panel informasi command ❓\n\nKeterangan: input wajib ditandai dengan [ ], sedangkan opsional ditandai dengan < >\n\n⚙Command: ${command.name}\n\n⚡Aliases: ${command.aliases.length < 1 ? 'None' : command.aliases.join(', ')}\n\n📝Desc: ${command.description}\n\n✅Example: ${command.example.replace('{prefix}', process.env.prefix)}`
        });
        }catch (error) {
          message.reply("Command mungkin tidak tersedia atau error")
          console.log(error)
        }

      }  
    }
}