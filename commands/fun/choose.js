module.exports = {
  name: "choose",
  description: "Choose something",
  aliases: ["decide", "pilih"],
  category: "Fun",
  example: "{prefix}choose [text;text;text ...;]",
  async execute(client, message, args) {
    let chooseString = message.message.text
      .split(" ")
      .splice(1)
      .join(" ")
      .trim();
    if (chooseString === "") return message.reply("🤔 Aku memilih.. tidak ada");
    if (chooseString.endsWith(";")) {
      chooseString = chooseString.substring(0, chooseString.length - 1);
    } else if (!chooseString.endsWith(";"))
      return message.reply("end your choice with ;");
    let msgSplit = chooseString.split(";");
    for (let i = 0; i < msgSplit.length; i++) {
      msgSplit[i] = msgSplit[i].trim();
    }
    if (msgSplit.length < 2) return message.reply("Two choice please");
    let result = msgSplit[Math.floor(Math.random() * msgSplit.length)];

    message.reply("🤔 Aku memilih... " + result);
  },
};
