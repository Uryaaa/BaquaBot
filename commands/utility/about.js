const { version, dependencies } = require("../../package.json");
const moment = require("moment");

module.exports = {
  name: "about",
  description: "Bot status dll",
  aliases: ["status"],
  category: "Utility",
  example: "{prefix}about",
  async execute(client, message, args) {
    message.reply({
      type: "text",
      text: `⚓ BaquaBot v${version} 
=====BOT=====
👑 Owner : Tama-chan
💭 Prefix : ${process.env.prefix}
🤖 Command : ${client.commands.size}
⌚ Uptime : ${moment(process.uptime() * 1000).format("HH:mm:ss")}
🏓 Ping : ${Date.now() - message.timestamp}
=====SYSTEM=====
🖥 Platform : ${process.platform}
🖥 Arch : ${process.arch}
💾 Memory : ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(
        process.memoryUsage().heapUsed /
        1024 /
        1024
      ).toFixed(2)} MB Heap\''
🧠 NodeJS : ${process.version}
⚓ Source code : https://github.com/Uryaaa/BaquaBot
`,
    });
  },
};
