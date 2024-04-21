const {EmbedBuilder} = require("discord.js");

exports.run = async (client, message, args) => {

message.channel.send({content: `Anlık olarak pingim; **"${client.ws.ping}ms"**`});

};
exports.conf = {
  aliases: ["ping","ms"]
};

exports.help = {
  name: "ping"
};