const cheerio = require("cheerio"); 
const request = require("request");

module.exports = {
    name: 'eval',
    category: 'Utility',
    description: 'Evaluate code',
    aliases: [],
    example: '{prefix}eval [code]',
async	execute(client, message, args) {
if(message.source.userId !== 'U99c0ea8d934ca13dd30cb6497f6bf1d3') return message.reply("Command ini hanya bisa dipake dev saja") 
   
     try {
       
        let codeIn = args.join(' ');    
        let code = eval(codeIn);
    
        if(!codeIn) return;
        if (codeIn.includes('process.env.TOKEN')) {
            code = "Nonono";
        } else {
            code = eval(code);
        }
        
        if (typeof code !== 'string') code = require('util').inspect(code, {depth: 0});
        
        await message.reply({type:"text", text:`${code}`});

    } catch (err) {
        return await message.reply({
          type:"text",
          text: `something went wrong ${err}`
        });
    }

}
    }

