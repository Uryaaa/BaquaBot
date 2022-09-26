module.exports = {
  name: "pekofy",
  description: "Pekofy your text peko!",
  aliases: ["peko", "pekora"],
  category: "Fun",
  example: "{prefix}peko [argumen? OR argumen! OR argumen.]",
  async execute(client, message, args) {
    const text = args.join(" ");
    if (!text) return message.reply("Argumen tidak terdeteksi peko!");

    let en_punctuation_list = [".", "?", "!", "\n"];
    let jp_punctuation_list = ["。", "？", "！", "」", "・"];
    const punctuation_list = en_punctuation_list.concat(jp_punctuation_list);
    const en_keyword = " peko";

    /* pattern looks incomprehensible, but it just matches links, and any punctuation at the end (plus parenthesis) */
    let link_pattern =
      "https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]*\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)";
    /* pattern matches any punctuation not in a link */
    const punctuation_pattern = new RegExp(
      `(?<!(${link_pattern}))([${punctuation_list.join("")}]+)`,
      "g"
    );
    var new_text = text;
    /* offset to account for adding keywords */
    let offset = 0;

    let match;
    while ((match = punctuation_pattern.exec(text)) !== null) {
      let i = match.index + offset;
      let last_word = /\w+/g.exec(
        new_text.slice(0, i).split("").reverse().join("")
      );

      let j;
      try {
        j = i - last_word.index;
      } catch (TypeError) {
        continue;
      }

      new_text = [new_text.slice(0, j), en_keyword, new_text.slice(j)].join("");

      offset += en_keyword.length;
    }
    console.log(new_text);
    if (text != new_text) {
      message.reply(new_text);
    }
  },
};
