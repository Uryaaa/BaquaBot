const { HAnimeAPI } = require('hanime');
const api = new HAnimeAPI()
const moment = require('moment')
module.exports = {
    name: 'hanime',
    description: 'Cari anime hentai di hanime.tv, bukan download',
    aliases : ['hs', 'hentaisearch'],
    category: 'Anime',
    example: '{prefix}hs [title] <Episode number>',
    async  execute(client, message, args){
      const query = args.join(" ");
      if(!query) return message.reply('Input tidak terdeteksi 👀');

      const res = await api.search(query);
      if(!res.hits) return message.reply(`Tidak ada ditemukan hentai dengan query ${query}`)

      message.reply([
        {
          type:'image',
          originalContentUrl:res.videos[0].cover_url,
          previewImageUrl:res.videos[0].cover_url
        },
        {
          type:'text',
          text:`Title : ${res.videos[0].name}
          
Brand : ${res.videos[0].brand}          

tags : ${res.videos[0].tags.sort().map(x => x).join(", ")}

Released : ${moment(new Date(res.videos[0].released_at *1000)).format('dddd, do MMMM YYYY')}

Rank : ${res.videos[0].monthly_rank}

Downloads : ${res.videos[0].downloads}

Likes : ${res.videos[0].likes}

Views : ${res.videos[0].views}

Description : ${res.videos[0].description.replace(/\<\/?(p|br)\>/gi, '')}

▶ Watch ${res.videos[0].is_censored ? 'CENSORED' : 'UNCENSORED'} on https://hanime.tv/videos/hentai/${res.videos[0].slug}`
        }
      ])


  }
}