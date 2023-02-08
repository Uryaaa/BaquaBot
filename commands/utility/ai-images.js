const { Configuration, OpenAIApi } = require("openai");
module.exports = {
    name: 'prompt',
    description: 'Bikin gambar ukuran 1024x1024 pake OpenAI',
    aliases : [],
    category: 'Utility',
    example: '{prefix}prompt [prompt]',
    async execute(client, message, args){
        let prompt = args.join(" ")
        if(prompt.length === 0) return message.reply("Masukkan prompt !")
        const configuration = new Configuration({
            apiKey:process.env.openai,
          });
          const openai = new OpenAIApi(configuration);
          const generateImage =  (options) => {
            return new Promise((resolve, reject) => {
              try {
                const response =  openai.createImage(options)
                resolve(response);
              } catch (error) {
                reject(error);
              }
            });
          };
          
          generateImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          })
          .then(response => {
            console.log(response.data.data[0].url)
              message.reply({
                type:"image",
                originalContentUrl:response.data.data[0].url.toString(),
                previewImageUrl:response.data.data[0].url.toString(),         
              })
          })
          .catch(error => {
            console.log(error);
          });
  }
}