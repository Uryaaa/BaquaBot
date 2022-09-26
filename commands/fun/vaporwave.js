module.exports = {
  name: "vaporwave",
  description: "vaporwavefied text",
  aliases: [],
  category: "Fun",
  example: "{prefix}vaporwave [text]",
  execute(client, message, args) {
    if (!args[0])
      return message.reply({
        type: "text",
        text: "Argumen input tidak terdeteksi",
      });
    const vaporwavefied = args
      .toString()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        return code >= 33 && code <= 126
          ? String.fromCharCode(code - 33 + 65281)
          : char;
      })
      .join("")
      .replace(/，/g, "  ");
    message.reply({
      type: "text",
      text: `${vaporwavefied}`,
    });
  },
};
