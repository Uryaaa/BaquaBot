const axios = require('axios')
module.exports = {
    name: 'anime',
    description: 'Informasi anime via MAL',
    aliases : ['nime'],
    category: 'Anime',
    example: '{prefix}anime [query]',
    async  execute(client, message, args){
         let searchString = args.join("%20")
         if(searchString.length === 0) return message.reply("Masukkan query!")
        axios.get('https://api.jikan.moe/v3/search/anime?q='+searchString)
        .then((res)=>{
          let b = res.data.results[0].mal_id;
             axios.get('https://api.jikan.moe/v3/anime/'+b)
            .then((a)=>{
             // console.log(a)
              message.reply([
                {
                  type:'image',
                  originalContentUrl:a.data.image_url,
                  previewImageUrl:a.data.image_url,
                },
                {
                  type:"text",
                  text:`Title : ${a.data.title}
                  
Synopsis : ${a.data.synopsis}

Type : ${a.data.type}

Episodes : ${a.data.episodes}

Status : ${a.data.status}

Aired : ${a.data.aired.string}

Studios : ${a.data.studios.map(i => i.name).join(', ')}

Source : ${a.data.source}

Genres : ${a.data.genres.map(j => j.name).join(", ")}

Duration : ${a.data.duration}

Rating : ${a.data.rating}

Score : ${a.data.score}

============
See more : ${a.data.url}`
                }
              ])
            })
        })

  }
}