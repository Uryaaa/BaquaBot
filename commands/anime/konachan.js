const axios = require('axios')

module.exports = {
    name: 'hololive',
    description: 'Hololive random reddit post',
    aliases : [],
    category: 'Anime',
    example: '{prefix}hololive',
    async  execute(client, message, args){
      axios.get(`https://www.reddit.com/r/hololive/random.json`)
      .then((results) => {
      //console.log(results.data[0].data.children[0].data)
      let memetype = results.data[0].data.children[0].data
        if(memetype.url.endsWith('jpg') || memetype.url.endsWith('png') || memetype.url.endsWith('gif')) {
          message.reply([
            {
              type:'text',
              text: `${memetype.title} submitted by ${memetype.author}\n\nLink to post :  https://www.reddit.com${memetype.permalink}\nContent : ${memetype.url}`
            },
         {
          type:'image',
          originalContentUrl:memetype.url,
          previewImageUrl:memetype.url
        }
        ])
        } 
        
        else{
          if(memetype.is_video){
            message.reply([
              {
                type:'video',
                originalContentUrl:memetype.media.reddit_video.scrubber_media_url
              },
              {
                type:'text',
                text: `${memetype.title} submitted by ${memetype.author}\n\nLink to post :  https://www.reddit.com${memetype.permalink}\nContent : ${memetype.url}`
              }
            ])
          }
          message.reply({
            type:'text',
            text:`Can't fetch the content! \n\n${memetype.title} submitted by ${memetype.author}\n\nLink to post : https://www.reddit.com${memetype.permalink}\nContent :${memetype.url}`
          })
        }
    
      })
      .catch((err)=>{
        message.reply("Telah terjadi error\n\n"+err)
      })



  }
}