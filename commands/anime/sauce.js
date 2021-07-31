const axios = require('axios')
const db = require("quick.db")

module.exports = {
    name: 'sauce',
    description: 'Search artwork original source by url',
    aliases : ['saucenao'],
    category: 'Anime',
    example: '{prefix}sauce [https://www.example.com/image.jpg]',
    async  execute(client, message, args){
      let saucenao = process.env.sauces;
      let imageurl = args[0];
      if(imageurl.startsWith('https')){
        
         axios.get(`https://saucenao.com/search.php?db=999&output_type=2&testmode=1&numres=5&api_key=${saucenao}&url=${imageurl}`)
         .then((res) => {
           if(res.length === 0) return message.reply('No results')
           let sauce = res.data.results;
           //console.log(sauce)
          message.reply([
            {
              type:'text',
              text:`First result similarity : ${sauce[0].header.similarity}%

Title : ${sauce[0].data.title || "Failed to fetch title"} 
Source : ${sauce[0].data.source}

Other with lower similarity :
| ${sauce[1].data.ext_urls[0] || 'none found'}

`


            },
          ])

           //console.log(res.data.results)
         })
         .catch((error) => {
           message.reply('Telah terjadi error\n\n'+error)
         })

      }else{
        message.reply("Url harus berawal https!")
      }

  }
}