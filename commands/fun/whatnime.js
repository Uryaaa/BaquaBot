const axios = require("axios")

module.exports = {
    name: 'nani',
    description: 'Anime screenshot recognizer',
    aliases : ['whatnime'],
    category: 'Utility',
    example: '{prefix}nani [https://www.example.com/img.jpg]',
    async  execute(client, message, args){
      let imageurl = args[0];
      if(!imageurl) return message.reply("Masukkan url screenshot anime")
      if(imageurl.startsWith('https')){
        axios.get(`https://api.trace.moe/search?anilistInfo&cutBorders&url=${imageurl}`)
        .then((res)=>{

                let anilist = res.data.result[0].anilist
                let anime = res.data.result[0];
                let similarcheck;
                if (anime.similarity < 0.85){
                  similarcheck = 'Gambar ini memiliki kemiripan dibawah 85%, ini mungkin bukan yang kamu cari'
                }else{
                  similarcheck = 'Saya menemukan anime yang mirip dengan gambar yang dimaksud'
                }
                var hrs = ~~(anime.from / 3600);
                var mins = ~~((anime.from% 3600) / 60);
                var secs = ~~anime.from % 60;
                var ret = "";
                if (hrs > 0) {
                    ret +=(hrs < 10 ? "0" : "") + hrs + ":" + (mins < 10 ? "0" : "");
                }
                ret += (mins < 10 ?"0" : "") + mins + ":" + (secs < 10 ? "0" : "");
                ret += "" + secs;

                message.reply([
                  {
                    type:'text',
                    text:`${similarcheck}\n\nTitle: ${anilist.title.native}
Romaji title: ${anilist.title.romaji}
English title: ${anilist.title.english || 'None'}
Synonyms: ${anilist.synonyms.map(i => i).join(", ")|| "None"}

Anilist link: https://anilist.co/anime/${anilist.id}
MyAnimeList link: https://myanimelist.net/anime/${anilist.idMal}

Episode: ${anime.episode}
Timestamp: ${ret}
Similarity: ${(anime.similarity*100).toFixed(2)}%
`
                  },
                  {
                    type:'image',
                    originalContentUrl:anime.image,
                    previewImageUrl:anime.image,
                  }
                ])
        })
        .catch((error)=>{
          message.reply("Telah  terjadi error "+error)
        })
      }else{
        return message.reply("Link harus berawalan https")
      }
  }
}