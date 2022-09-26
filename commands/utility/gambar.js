const axios = require("axios")
module.exports = {
    name: 'image',
    description: 'Cari gambar di google',
    aliases : ["gi", "gambar", "pic"],
    category: 'Utility',
    example: '{prefix}image <query>',
    async  execute(client, message, args){
      let query = args.join(" ")
      axios.get(`https://mangadlself.tama0612.repl.co/api/image/${query}`)
      .then((res) => {
        //console.log(res.data.search[0])
       images = res.data.search;
      let result = images[Math.floor(Math.random()* images.length)]
        message.reply({
         type: "image",
         originalContentUrl:result,
         previewImageUrl:result
        })
      })
    .catch((e) => {
     message.reply("Telah terjadi error\n\n"+e)
    }) 

    
  }
}
