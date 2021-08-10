module.exports = {
  name: "ask",
  description: "Ask me a question",
  aliases: ["apakah", "nanya"],
  category: "Fun",
  example: "{prefix}apakah [text]",
  execute(client, message, args) {
    const answer = [
      "Iya",
      "Tidak",
      "Sudah pasti tidak",
      "Ntahlah",
      "Meragukan",
      "Mungkin",
      "BIG NO",
      "BIG YES",
      "Bentar, coba tanya lagi",
      "Kamu nanya ke bot gitu?",
      "Sangat meragukan",
      "Saya mendukung",
      "Tentu saja",
      "Pasti donk",
      "I Approb",
      "I Disapprob",
      "はい\n\n- YAGOO",
      "Sou desune..",
    ];
    if (!args[0]) {
      return message.reply({
        type: "text",
        text: "wut?",
      });
    } else {
      let answers = answer[Math.floor(Math.random() * answer.length)];
      message.reply({
        type: "text",
        text: `${answers}`,
      });
    }
  },
};
