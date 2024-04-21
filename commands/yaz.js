const { red } = require("../Global/configs/emojis.json")

  exports.run = async(client, message, args) => {
    if(!args[0]) return message.react(red)
    message.delete({timeout: 100});
    message.channel.send(args.join(' '));
  },
exports.conf = {
    aliases: ["yaz","text"]
}
exports.help = {
    name: "yaz"
}

  