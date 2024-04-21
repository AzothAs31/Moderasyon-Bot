const slenzydb = require('croxydb');
const ms = require('ms')
const moment = require("moment");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new EmbedBuilder()
    .setTitle("Kredi Kart Oluşturucu")
    .setDescription("Aşağıdaki butondan kredi kartı oluşturabilirsin!")
    .setColor("#ff0000")
    const row = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setEmoji("<a:pepe_credit:963752229041487882> ")
.setStyle(ButtonStyle.Danger)
.setCustomId("oluştur")
)
message.channel.send({embeds: [embed], components: [row]})


}
exports.conf = {
  aliases: ["hesap-oluştur","kredi-kartı"],
  permLevel: 0
};

exports.help = {
  name: 'hesap-oluştur'
};