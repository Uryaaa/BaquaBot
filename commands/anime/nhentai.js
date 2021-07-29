const moment = require("moment");
require('moment-duration-format');
const {API} = require('nhentai-api');
const api = new API();
module.exports = {
    name: 'nhentai',
    description: 'Doujin info dari nhentai 👀, bukan download',
    aliases : ['nh', 'finddoujin', 'doujin'],
    category: 'Anime',
    example: '{prefix}nhentai [id]',
    async  execute(client, message, args){
      if(!args[0]) return message.reply("Input tidak terdeteksi")
      const id = args[0];
      if(isNaN(id)) return message.reply('Input nhentai ID saja 👀')

      const book = await api.getBook(id).catch(()=>null)
      const {title: {english, japanese, pretty},
      tags, page, uploaded, cover} = book

      message.reply([
        {
          type:'text',
          text:`Title english : ${book.title.english}

Japanese title : ${book.title.japanese}

Tags : ${book.tags.map(t => t.name).sort().join(", ")}

Pages : ${book.pages.length}

Uploaded on : ${moment(book.uploaded).format('dddd Do MMM YYYY')}

Link : https://nhentai.net/g/${id}`



        }
      ])
      console.log(api.getImageURL(cover))
  }
}