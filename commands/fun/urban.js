const urban = require('urban-dictionary')
module.exports = {
    name: 'urban',
    description: 'Top 3 urban dictionary Definitions and Examples',
    aliases : ['ub'],
    category: 'Fun',
    example: '{prefix}urban [query]',
    execute(client, message, args){
      if(!args[0]) return message.reply({
        type:'text',
        text: 'Argumen input tidak terdeteksi'
      })
      urban.define(`${args}`).then(result=>{
        message.reply([
          {type:'text', text: `Definition\n${result[0].definition}\n\nExample\n${result[0].example}`},
          {type:'text', text: `Definition\n${result[1].definition}\n\nExample\n${result[1].example}`},
          {type:'text', text: `Definition\n${result[2].definition}\n\nExample\n${result[2].example}`},
        ])
      })
    }
}