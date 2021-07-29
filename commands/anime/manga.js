const axios = require('axios')
module.exports = {
    name: 'manga',
    description: 'Informasi manga/manhua/light novel via MAL',
    aliases : [],
    category: 'Anime',
    example: '{prefix}manga [query]',
    async  execute(client, message, args){
       let searchString = args.join("%20")
       if(searchString.length === 0) return message.reply("Masukkan query!")
       axios.get('https://api.jikan.moe/v3/search/manga?q='+searchString)
       .then((res)=>{
         let b = res.data.results[0].mal_id
         axios.get('https://api.jikan.moe/v3/manga/'+b)
         .then((a)=>{
           message.reply([
             {
               type:'image',
               originalContentUrl:a.data.image_url,
               previewImageUrl:a.data.image_url,
             },
             {
               type:'text',
               text: `Title : ${a.data.title}
               
Synopsis : ${a.data.synopsis}

Type : ${a.data.type}

Volumes : ${a.data.volumes}

Chapters : ${a.data.chapters}

Status : ${a.data.status}

Published : ${a.data.published.string}

Genres : ${a.data.genres.map(i => i.name).join(", ")}

Authors : ${a.data.authors.map(a => a.name).join(" | ")}

Serializations : ${a.data.serializations.map(s => s.name).join(", ")}

Score : ${a.data.score}

============
See more : ${a.data.url}`
             }
           ])
         })         
       })
  }
}