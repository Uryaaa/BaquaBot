const axios = require('axios')

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
           let sauce = res.data.results[0];
           console.log(sauce)
          message.reply([
            {
              type:'text',
              text:`Similarity: ${sauce.header.similarity}%

Title: ${sauce.data.title || "-"}

by: ${sauce.data.member_name || sauce.data.creator || "-"}
${(sauce.data.eng_name) ? "Eng title: " + sauce.data.eng_name : ""}
${(sauce.data.jp_name) ? "Jp title: " + sauce.data.jp_name : ""}
${(sauce.data.source) ? "Source:\n" + sauce.data.source : ""} 
===========================
${(sauce.data.ext_urls) ? "External urls:\n- "+ sauce.data.ext_urls.map((i) => i).join("\n\n - ") : ""}`
            },
          ])

           //console.log(res.data.results)
         })
         .catch((error) => {
           message.reply('Telah terjadi error\n\n'+error)
         })

      }else{
        message.reply("Url harus berawal https!", "a")
      }

  }
}
