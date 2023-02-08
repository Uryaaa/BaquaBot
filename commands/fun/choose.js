module.exports = {
  name: "choose",
  description: "Nyuruh bot milih buat kamu",
  aliases: ["decide", "pilih", "pick"],
  category: "Fun",
  example: "{prefix}choose [text;text;text ...]",
  async execute(client, message, args) {
    let optionString = args.join(" ")
    let options = optionString.split(";");
    if (options.length <2) return message.reply(`Dunno man, pake commandnya yang bener`)
    let answers = options[Math.floor(Math.random() * options.length)]
   console.log(options)
    message.reply(`🤔 Aku memilih : ${answers}`);
  },
};
