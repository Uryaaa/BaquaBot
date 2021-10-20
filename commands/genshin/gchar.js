const genshin = require("genshin-db");
module.exports = {
  name: "gichar",
  description: "Genshin Impact character data",
  aliases: [],
  category: "Genshin",
  example: "{prefix}gichar [name]",
  async execute(client, message, args) {
    let query = args.join(" ");
    let result = genshin.characters(query);
    message.reply([
      {
        type: "text",
        text: `Name : ${result.name}
Title : ${result.title}
Description : ${result.description}
Rarity : ${result.rarity}
Element : ${result.element}
Weapon type : ${result.weapontype}
Substat: ${result.substat}
===========================
Gender: ${result.gender} (${result.body})
Association : ${result.association}
Region : ${result.region}
Affilation : ${result.affilation || "None"} 
Birthday : ${result.birthday}
Constellation : ${result.constellation}
===========================
Voice Actors
English : ${result.cv.english}
Chinese : ${result.cv.chinese}
Japanese : ${result.cv.japanese}
Korean : ${result.cv.korean}`,
      },
      {
        type: "image",
        originalContentUrl: result.images.card || result.images.cover1,
        previewImageUrl: result.images.card || result.images.cover1,
      },
    ]);
    //console.log(genshin.characters(query).costs)
  },
};
