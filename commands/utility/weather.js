const axios = require("axios");
const cuaca = require("weather-js");
module.exports = {
  name: "cuaca",
  description: "Menampilkan kondisi cuaca",
  aliases: ["weather"],
  category: "Utility",
  example: "{prefix}cuaca [Lokasi]",
  async execute(client, message, args) {
    let query = args.join(" ");
    if (!query) return message.reply("Masukkan lokasi");
    cuaca.find({ search: query, degreeType: "C" }, function (err, result) {
      if (result.length === 0) return message.reply("Location not found!");
      var current = result[0].current;
      var location = result[0].location;
      if (err) return message.reply("Lokasi tidak valid");

      message.reply(`☀Weather for ${current.observationpoint}
${current.skytext}

Timezone
UTC${location.timezone}

Degree Type
${location.degreetype}

Temperature
${current.temperature} Degrees

Feels Like
${current.feelslike}

Winds
${current.winddisplay}

Humidity
${current.humidity}%`);
    });
  },
};
