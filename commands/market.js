const Discord = require('discord.js')


exports.run = async (client, message, args) => {
  
 const embed = new Discord.EmbedBuilder()
.setTitle("A101")
.addFields({ name: '> Cips', value: `15 TL`, inline: true})
.addFields({ name: '> Hamburger', value: `95 TL`, inline: true})
.addFields({ name: '> İsrail Malı Cola Cola ', value: `20 TL`, inline: true})
.addFields({ name: '> Bilgisayar', value: `14500 TL`, inline: true})
.addFields({ name: '> Pasaport', value: `Ülkeden Kaçamazsın.`, inline: true})
.addFields({ name: '> Mülteci', value: `1 TL`, inline: true})
.setColor("#ff0000")
message.channel.send({embeds: [embed]})
  
}
exports.conf = {

    aliases: ["a101","market"],
    permLevel: 0
}

exports.help = {
    name: 'market'
}