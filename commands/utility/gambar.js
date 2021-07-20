const cheerio = require("cheerio"); 
const request = require("request");

module.exports = {
    name: 'image',
    category: 'Utility',
    description: 'Cari gambar di google',
    aliases: ["gi", "gambar"],
    example: '{prefix}image [query]',
	execute(client, message, args) {
        var parts = message.message.text.split(" ")
        image(message, parts);
     function image(message, parts){
       var search = parts.slice(1).join(" ");
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; RedMi Note 5 Build/RB3N5C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36"
            }
        };
        request(options, function(error, response, responseBody) {
            if (error) {
               
                return;
            }
            $ = cheerio.load(responseBody);
            
            var links = $(".image a.link"); 
            
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
          
            if (!urls.length) {
               message.reply({type: "text", text:"no matching result"})
                return;
            }
     
            // Send result
           let hasil =  urls[Math.floor(Math.random()* urls.length)]
           message.reply({
             type: 'image',
             originalContentUrl: hasil,
             previewImageUrl: hasil
           })
        });
        
     }  
    }}
