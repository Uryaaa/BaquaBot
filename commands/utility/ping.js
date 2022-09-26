module.exports = {
  name: "ping",
  description: "Check bot ping pong! 🏓",
  aliases: ["pong"],
  category: "Utility",
  example: "{prefix}ping",
  async execute(client, message, args) {
    message.reply(
      `Pong 🏓  server respond time - ${Date.now() - message.timestamp / 2}ms`
    );
  },
};
