module.exports = (client, message) => {
  try {
    let prefix = process.env.prefix;
    if (message.message.type !== "text" || message.type !== "message") return;
    if (
      message.source.type !== "group" &&
      message.source.userId !== process.env.dev_id
    )
      return;
    if (!message.message.text.startsWith(prefix)) return;

    const args = message.message.text.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const cmd =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    try {
      if (cmd) cmd.execute(client, message, args);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
