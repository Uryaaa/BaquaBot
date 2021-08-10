const moment = require("moment");
module.exports = {
  name: "time",
  category: "Utility",
  description: "Waktu sekarang dalam wita",
  aliases: ["jam", "clock", "waktu"],
  example: "{prefix}time",
  execute(client, message, args) {
    moment.locale("id");
    let time = moment()
      .utcOffset(+8)
      .format("dddd, MMMM Do YYYY, H:mm:ss a ");
    message.reply({ type: "text", text: `${time}` });
  },
};
