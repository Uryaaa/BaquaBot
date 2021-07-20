const mockingCase = require('@strdr4605/mockingcase')
module.exports = {
    name: 'mock',
    description: 'Mock that mock this',
    aliases : ['sb'],
    category: 'Fun',
    example: '{prefix}mock [text]',
    execute(client, message, args){
      if(!args[0]) return message.reply({
        type:'text',
        text: 'Argumen input tidak terdeteksi'
      })
      let mock = mockingCase(args.join(' '),{firstUpper: false, random: true})
      message.reply([
        {type:'text', text:mock},
        {type:'image', originalContentUrl:'https://raw.githubusercontent.com/strdr4605/mockingcase/master/mOcKiNgsPoNgEbOb.png', previewImageUrl:'https://raw.githubusercontent.com/strdr4605/mockingcase/master/mOcKiNgsPoNgEbOb.png'}
      ])
    }
}