module.exports = {
    name: 'test',
    description: '',
    aliases : [],
    category: '',
    example: '{prefix}command [] ? <>',
    async  execute(client, message, args){
      const blacklist = ["!", "?", "."];
      let text = args.join(" ")
      if(text.startsWith('https')) text = text.match(/^.*(?:(?:nhentai\.net\/g\/))|(?:([0-9]))/)
      console.log(text)



  }
}