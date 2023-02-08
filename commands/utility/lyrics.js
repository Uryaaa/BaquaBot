const Genius = require("genius-lyrics");
const gclient = new Genius.Client(process.env.genius);
const {textTruncate} = require("../../util/string")
module.exports = {
    name: 'lyrics',
    description: 'Mencari lirik lagu (kadang nyasar ke book hehe)',
    aliases : ['lirik'],
    category: 'Utility',
    example: '{prefix}lirik [Artist - Judul lagu]',
    async  execute(client, message, args){
    let lyrics = args.join(" ")
    if(lyrics.length === 0) return message.reply("Masukkan nama artis atau penyanyinya atau keduanya")
    
    const searches = await gclient.songs.search(lyrics);
    const firstSong = searches[0];
    try {
        let res = textTruncate(await firstSong.lyrics(), 4900) || "not found";
        var title = await firstSong.title;
        let author = await firstSong.artist.name
        let icon = await firstSong.image; 
        
        message.reply([
            {
                type: "image",
                originalContentUrl:icon,
                previewImageUrl:icon
            },
            {
                type:"text",
                text:`${author} - ${title}
                
    ${ await res}`
            }
        ])  
    } catch (error) {
    message.reply("Telah terjadi error :" +error) 
    console.log(error)  
    }
  
  }
}