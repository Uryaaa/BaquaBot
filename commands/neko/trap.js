const axios = require("axios")

module.exports = {
    name: 'trap',
    description: 'Send you a trap gif ewww',
    aliases : [],
    category: 'Neko',
    example: '{prefix}trap',
    async  execute(client, message, args){
      const url = encodeURI("https://g.tenor.com/v1/random?q=anime%20traps&key=LIVDSRZULELA&limit=8")
      axios.get(url)
      .then((res) => {
        console.log(res.data.results[0].media[0].mediumgif.url)
        message.reply({
          type:"image",
          originalContentUrl:res.data.results[0].media[0].mediumgif.url,
          previewImageUrl:res.data.results[0].media[0].mediumgif.url
        })
      })
      .catch((err) => {
        message.reply("Telah terjadi error\n\n"+err)
      })
  }
}