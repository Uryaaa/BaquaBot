const { evaluate } = require("mathjs");
module.exports = {
  name: "math",
  description: 'Simple math command, no dont expect "log(10000, 10)"',
  aliases: ["hitung", "evaluate"],
  category: "Utility",
  example: "{prefix}math[ekspresi]\n\n !math det([-1, 2; 3, 1]) :v",
  async execute(client, message, args) {
    let query = args.join(" ");
    if (!query)
      return message.reply("Masukkan ekspresi matematika\n\nContoh: 1+1");
    try {
      let res = evaluate(query);
      message.reply(res.toString());
    } catch (error) {
      message.reply("Telah terjadi error " + error);
    }
  },
};
